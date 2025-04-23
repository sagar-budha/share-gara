
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useFiles } from "../context/FilesContext";
import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";
import { File, Download, AlertTriangle } from "lucide-react";
import { bytesToSize } from "../lib/utils";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

export default function SharePage() {
  const { shareId } = useParams<{ shareId: string }>();
  const { files } = useFiles();
  const [sharedFile, setSharedFile] = useState<{
    file: any;
    expired: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Give files context a moment to load
    const timer = setTimeout(() => {
      const file = files.find(f => f.shareId === shareId);
      
      if (file) {
        const expired = file.expiresAt ? new Date() > new Date(file.expiresAt) : false;
        setSharedFile({ file, expired });
      } else {
        setSharedFile(null);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [files, shareId]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Loading Shared File - FileShare</title>
        </Helmet>
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
            <p className="mt-2 text-gray-500">Please wait while we fetch the file.</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!shareId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Invalid Share Link - FileShare</title>
        </Helmet>
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
        <Helmet>
          <title>File Not Found - FileShare</title>
        </Helmet>
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full px-4">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>File not found</AlertTitle>
              <AlertDescription>
                This file may have been deleted or the link is invalid.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <Button asChild className="mt-4">
                <Link to="/">Go back home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (sharedFile.expired) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Link Expired - FileShare</title>
        </Helmet>
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full px-4">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Link expired</AlertTitle>
              <AlertDescription>
                This share link has expired and is no longer valid.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <Button asChild className="mt-4">
                <Link to="/">Go back home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Check if the file URL is valid
  const isFileValid = sharedFile.file && sharedFile.file.url;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{sharedFile.file.name} - FileShare</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-center">
              {isFileValid && sharedFile.file.type.includes('image') ? (
                <img 
                  src={sharedFile.file.url} 
                  alt={sharedFile.file.name} 
                  className="w-32 h-32 object-cover rounded"
                  onError={(e) => {
                    // If image fails to load, show file icon instead
                    e.currentTarget.style.display = 'none';
                    document.getElementById('file-icon-fallback')?.style.removeProperty('display');
                  }}
                />
              ) : (
                <div 
                  id="file-icon-fallback" 
                  className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded"
                >
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
              {isFileValid ? (
                <Button 
                  className="w-full flex items-center justify-center" 
                  asChild
                >
                  <a href={sharedFile.file.url} download={sharedFile.file.name}>
                    <Download className="mr-2 h-4 w-4" />
                    Download File
                  </a>
                </Button>
              ) : (
                <Button 
                  className="w-full flex items-center justify-center"
                  variant="secondary"
                  disabled
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  File Unavailable
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
