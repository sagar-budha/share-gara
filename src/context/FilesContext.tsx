
import React, { createContext, useContext, useState, useEffect } from "react";
import { File, SortOption, ViewOption, FILE_SIZE_LIMIT } from "../types";
import { useAuth } from "./AuthContext";
import { toast } from "../components/ui/use-toast";

interface FilesContextType {
  files: File[];
  view: ViewOption;
  sortBy: SortOption;
  uploading: boolean;
  uploadProgress: number;
  setView: (view: ViewOption) => void;
  setSortBy: (sortBy: SortOption) => void;
  uploadFile: (file: globalThis.File) => Promise<void>;
  deleteFile: (id: string) => void;
  shareFile: (id: string, expiresInDays?: number) => Promise<string>;
  getShareLink: (shareId: string) => string;
  getFileById: (id: string) => File | undefined;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

// Mock initial files with working URLs
const mockFiles: File[] = [
  {
    id: "1",
    userId: "1",
    name: "document.pdf",
    size: 2500000,
    type: "application/pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2023-01-10"),
    shared: false
  },
  {
    id: "2",
    userId: "1",
    name: "image.jpg",
    size: 1500000,
    type: "image/jpeg",
    url: "https://via.placeholder.com/300",
    createdAt: new Date("2023-01-15"),
    shared: false
  }
];

export const FilesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [view, setView] = useState<ViewOption>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    // Load mock files if user is logged in
    if (user) {
      console.log("Loading files for user:", user.id);
      setFiles(mockFiles.filter(file => file.userId === user.id));
    } else {
      setFiles([]);
    }
  }, [user]);

  // Mock file upload functionality
  const uploadFile = async (file: globalThis.File) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload files",
        variant: "destructive"
      });
      return;
    }

    const fileSizeLimit = user.isPro ? FILE_SIZE_LIMIT.PRO : FILE_SIZE_LIMIT.FREE;
    
    if (file.size > fileSizeLimit) {
      toast({
        title: "File Too Large",
        description: user.isPro 
          ? "Files must be under 10GB" 
          : "Free users are limited to 200MB files. Upgrade to Pro for up to 10GB files.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 300);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setUploadProgress(100);

      // Create object URL for the file
      const fileURL = URL.createObjectURL(file);
      console.log("Created URL for file:", fileURL);

      // Create new file object
      const newFile: File = {
        id: `file_${Date.now()}`, // Ensure unique ID
        userId: user.id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileURL,
        createdAt: new Date(),
        shared: false
      };

      console.log("Adding new file to state:", newFile);
      setFiles(prev => [...prev, newFile]);
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error processing your file. Please try again."
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = (id: string) => {
    console.log("Deleting file with ID:", id);
    setFiles(prev => prev.filter(file => file.id !== id));
    
    toast({
      title: "File Deleted",
      description: "The file has been removed."
    });
  };

  const shareFile = async (id: string, expiresInDays = 7): Promise<string> => {
    const file = files.find(f => f.id === id);
    if (!file) {
      console.error("File not found:", id);
      throw new Error("File not found");
    }

    // Generate random share ID
    const shareId = Math.random().toString(36).substring(2, 15);
    
    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);
    
    console.log("Sharing file:", file.name, "with ID:", shareId, "expires:", expiresAt);
    
    // Update file with share info
    setFiles(prev => 
      prev.map(f => 
        f.id === id 
          ? { ...f, shareId, expiresAt, shared: true } 
          : f
      )
    );
    
    const shareLink = getShareLink(shareId);
    
    toast({
      title: "File Shared",
      description: `Share link created with ${expiresInDays} day${expiresInDays > 1 ? 's' : ''} expiration.`
    });
    
    return shareLink;
  };

  const getShareLink = (shareId: string) => {
    return `${window.location.origin}/share/${shareId}`;
  };

  const getFileById = (id: string) => {
    return files.find(file => file.id === id);
  };

  return (
    <FilesContext.Provider
      value={{
        files,
        view,
        sortBy,
        uploading,
        uploadProgress,
        setView,
        setSortBy,
        uploadFile,
        deleteFile,
        shareFile,
        getShareLink,
        getFileById
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FilesContext);
  if (context === undefined) {
    throw new Error("useFiles must be used within a FilesProvider");
  }
  return context;
};
