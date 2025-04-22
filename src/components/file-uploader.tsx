
import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useFiles } from "../context/FilesContext";
import { useAuth } from "../context/AuthContext";
import { FILE_SIZE_LIMIT } from "../types";
import { bytesToSize } from "../lib/utils";
import { toast } from "./ui/use-toast";

export function FileUploader() {
  const { user } = useAuth();
  const { uploadFile, uploading, uploadProgress } = useFiles();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const maxSize = user?.isPro ? FILE_SIZE_LIMIT.PRO : FILE_SIZE_LIMIT.FREE;
  const maxSizeFormatted = user?.isPro ? "10GB" : "200MB";
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await processFile(file);
    }
  };
  
  const processFile = async (file: File) => {
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: `Files must be under ${maxSizeFormatted} for your plan.`,
        variant: "destructive"
      });
      return;
    }
    
    try {
      await uploadFile(file);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  return (
    <div className="w-full mb-8">
      <div
        className={`drag-drop-area ${dragActive ? "active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleChange}
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Drag & drop your file here
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            or click to browse (max size: {maxSizeFormatted})
          </p>
          <Button
            onClick={onButtonClick}
            disabled={uploading}
            className="mt-2"
          >
            Select File
          </Button>
        </div>
      </div>
      
      {uploading && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Uploading...</p>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-gray-500 text-right">{uploadProgress}%</p>
        </div>
      )}
    </div>
  );
}
