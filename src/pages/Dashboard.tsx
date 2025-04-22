import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { FileUploader } from "../components/file-uploader";
import { FileCard } from "../components/ui/file-card";
import { useAuth } from "../context/AuthContext";
import { useFiles } from "../context/FilesContext";
import { Button } from "../components/ui/button";
import { SortOption, ViewOption, FILE_SIZE_LIMIT } from "../types";
import { bytesToSize } from "../lib/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const { 
    files, 
    view, 
    sortBy, 
    setView, 
    setSortBy, 
    deleteFile, 
    shareFile 
  } = useFiles();
  
  const [sortedFiles, setSortedFiles] = useState(files);
  
  useEffect(() => {
    let sorted = [...files];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === 'size') {
      sorted.sort((a, b) => b.size - a.size);
    }
    setSortedFiles(sorted);
  }, [files, sortBy]);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };
  
  const handleViewChange = (value: ViewOption) => {
    setView(value);
  };

  const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
  const maxStorage = user.isPro ? FILE_SIZE_LIMIT.PRO : FILE_SIZE_LIMIT.FREE;
  const storagePercentage = Math.min(Math.round((totalStorage / maxStorage) * 100), 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dashboard - FileShare</title>
      </Helmet>
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Your Files
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <span className="shadow-sm rounded-md">
                <Button
                  type="button"
                  variant={view === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleViewChange('grid')}
                  className="mr-2"
                >
                  Grid
                </Button>
                <Button
                  type="button"
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleViewChange('list')}
                >
                  List
                </Button>
              </span>
              
              <span className="ml-3">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                  <option value="size">Size</option>
                </select>
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900">Storage</h3>
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${storagePercentage}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          storagePercentage > 90 ? 'bg-red-500' : 'bg-primary'
                        }`}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>{bytesToSize(totalStorage)}</span>
                      <span>{bytesToSize(maxStorage)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    {user.isPro ? 'Pro plan' : 'Free plan'}
                  </p>
                  {!user.isPro && (
                    <Button
                      className="mt-4 w-full"
                      variant="outline"
                      asChild
                    >
                      <a href="/pricing">Upgrade to Pro</a>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <FileUploader />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {files.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <h3 className="text-lg font-medium text-gray-900">No files yet</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Upload your first file to get started.
                  </p>
                </div>
              ) : (
                <div className={view === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
                  {sortedFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      onShare={shareFile}
                      onDelete={deleteFile}
                      view={view}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
