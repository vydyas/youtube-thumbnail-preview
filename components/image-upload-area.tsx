"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadAreaProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export function ImageUploadArea({
  onFileSelect,
  disabled,
}: ImageUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`p-6 border-2 border-dashed rounded-lg ${
        isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
      } transition-colors duration-300 ease-in-out`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-purple-500" />
        </div>
        <p className="text-sm text-gray-600 text-center">
          Click below or drag & drop thumbnails to start
        </p>
        <div className="flex space-x-4">
          <Button
            onClick={() => document.getElementById("fileInput")?.click()}
            disabled={disabled}
          >
            Select am image from your computer
          </Button>
        </div>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileInput}
          accept="image/*"
        />
      </div>
    </div>
  );
}
