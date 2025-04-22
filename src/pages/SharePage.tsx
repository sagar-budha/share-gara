
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFiles } from "../context/FilesContext";
import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";
import { File, Download } from "lucide-react";
import { bytesToSize } from "../lib/utils";

export default function SharePage() {
  const { shareId } = useParams<{ shareId: string }>();
  const { files } = useFiles();
  const [sharedFile, setSharedFile] = useState<{
    file: any;
    expired: boolean;
  } | null>(null);
  
  useEffect(() => {
    // Find the file with matching shareId
    const file = files.find(f => f.shareId === shareId);
    
    if (file) {
      // Check if the share link is expired
      const expired = file.expiresAt ? new Date() > new Date(file.expiresAt) : false;
      setSharedFile({ file, expired });
    } else {
      setSharedFile(null);
    }
  }, [files, shareId]);
  
  if (!shareId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Invalid share link</h1>
            <p className="mt-2 text-gray-500">This link is invalid or has expired.</p>
            <Button asChild className="mt-4">
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!sharedFile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">File not found</h1>
            <p className="mt-2 text-gray-500">This file may have been deleted or the link is invalid.</p>
            <Button asChild className="mt-4">
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (sharedFile.expired) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Link expired</h1>
            <p className="mt-2 text-gray-500">This share link has expired.</p>
            <Button asChild className="mt-4">
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-center">
              {sharedFile.file.type.includes('image') ? (
                <img 
                  src={sharedFile.file.url} 
                  alt={sharedFile.file.name} 
                  className="w-32 h-32 object-cover rounded"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded">
                  <File className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="mt-5 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {sharedFile.file.name}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {bytesToSize(sharedFile.file.size)} · Shared with you
                </p>
                {sharedFile.file.expiresAt && (
                  <p className="mt-1 text-sm text-gray-500">
                    Expires: {new Date(sharedFile.file.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full flex items-center justify-center" 
                asChild
              >
                <a href={sharedFile.file.url} download={sharedFile.file.name}>
                  <Download className="mr-2 h-4 w-4" />
                  Download File
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
