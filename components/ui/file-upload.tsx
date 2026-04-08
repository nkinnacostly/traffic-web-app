"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { uploadFile, validateFile } from "@/lib/services/upload/upload.service";
import { FiUpload, FiX, FiCheck } from "react-icons/fi";
import Image from "next/image";

interface FileUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSizeMB?: number;
  preview?: boolean;
}

export default function FileUpload({
  label,
  value,
  onChange,
  accept = "image/*",
  maxSizeMB = 5,
  preview = true,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(file, { maxSizeMB });
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      return;
    }

    setError("");
    setIsUploading(true);

    // Show preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      // Upload file and get URL
      const uploadedUrl = await uploadFile(file);
      onChange(uploadedUrl);
      setPreviewUrl(uploadedUrl);
    } catch (err: any) {
      setError(err.message || "Failed to upload file");
      setPreviewUrl("");
      onChange("");
    } finally {
      setIsUploading(false);
      // Clean up object URL
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleRemove = () => {
    setPreviewUrl("");
    onChange("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex items-start gap-4">
        {/* Preview Area */}
        {preview && previewUrl && (
          <div className="relative w-20 h-20 border-2 border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <FiX size={12} />
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div className="flex-1 space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              isUploading
                ? "border-blue-400 bg-blue-50"
                : error
                  ? "border-red-400 bg-red-50"
                  : previewUrl
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />

            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-blue-600">Uploading...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-2">
                <FiX className="text-red-500" size={24} />
                <p className="text-sm text-red-600">{error}</p>
                <p className="text-xs text-gray-500">Click to try again</p>
              </div>
            ) : previewUrl ? (
              <div className="flex flex-col items-center gap-2">
                <FiCheck className="text-green-500" size={24} />
                <p className="text-sm text-green-600">Upload successful!</p>
                <p className="text-xs text-gray-500">Click to replace</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <FiUpload className="text-gray-400" size={24} />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to {maxSizeMB}MB
                </p>
              </div>
            )}
          </div>

          {/* URL Display (for debugging/reference) */}
          {previewUrl && !isUploading && (
            <p className="text-xs text-gray-500 truncate" title={previewUrl}>
              {previewUrl}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
