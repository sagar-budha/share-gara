
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { File as FileIcon, Share, Trash } from "lucide-react";
import { File } from "../../types";
import { bytesToSize } from "../../lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

interface FileCardProps {
  file: File;
  onShare: (id: string, expiresInDays: number) => Promise<string>;
  onDelete: (id: string) => void;
  view: "grid" | "list";
}

export function FileCard({ file, onShare, onDelete, view }: FileCardProps) {
  const [showShareDialog, setShowShareDialog] = React.useState(false);
  const [expiration, setExpiration] = React.useState("7");
  const [shareLink, setShareLink] = React.useState("");
  
  const handleShare = async () => {
    try {
      const link = await onShare(file.id, parseInt(expiration));
      setShareLink(link);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard",
    });
  };

  const getFileIcon = () => {
    if (file.type.includes("image")) {
      return <img src={file.url} alt={file.name} className="w-10 h-10 object-cover rounded" />;
    }
    return <FileIcon className="w-10 h-10 text-primary" />;
  };

  if (view === "list") {
    return (
      <div className="file-card flex items-center justify-between w-full py-3 px-4">
        <div className="flex items-center space-x-3">
          {getFileIcon()}
          <div>
            <h3 className="font-medium text-sm text-gray-800">{file.name}</h3>
            <p className="text-xs text-gray-500">
              {bytesToSize(file.size)} • {formatDistanceToNow(file.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {file.shared && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Shared
            </span>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(file.id)}
            className="p-2"
            aria-label="Delete file"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowShareDialog(true)}>
                Create Share Link
              </DropdownMenuItem>
              {/* Delete is now a direct button */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share "{file.name}"</DialogTitle>
              <DialogDescription>
                Create a link that allows anyone to download this file.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center gap-4 my-4">
              <div className="grid w-full items-center gap-1.5">
                <Select 
                  value={expiration} 
                  onValueChange={setExpiration}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Expires after" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleShare}>
                Generate Link
              </Button>
            </div>
            
            {shareLink && (
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Input 
                    value={shareLink} 
                    readOnly 
                    className="flex-1"
                  />
                  <Button onClick={copyToClipboard}>
                    Copy
                  </Button>
                </div>
              </div>
            )}
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="file-card">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {getFileIcon()}
            <div className="ml-2">
              <h3 className="font-medium text-sm text-gray-800 truncate max-w-[140px]">{file.name}</h3>
              <p className="text-xs text-gray-500">{bytesToSize(file.size)}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(file.id)}
              className="h-8 w-8 p-0"
              aria-label="Delete file"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Share className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowShareDialog(true)}>
                  Create Share Link
                </DropdownMenuItem>
                {/* Delete is now a direct button */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-xs text-gray-500 mt-2">
            {formatDistanceToNow(file.createdAt, { addSuffix: true })}
          </p>
          {file.shared && (
            <div className="mt-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Shared
              </span>
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share "{file.name}"</DialogTitle>
            <DialogDescription>
              Create a link that allows anyone to download this file.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-4 my-4">
            <div className="grid w-full items-center gap-1.5">
              <Select 
                value={expiration} 
                onValueChange={setExpiration}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Expires after" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleShare}>
              Generate Link
            </Button>
          </div>
          
          {shareLink && (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Input 
                  value={shareLink} 
                  readOnly 
                  className="flex-1"
                />
                <Button onClick={copyToClipboard}>
                  Copy
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
