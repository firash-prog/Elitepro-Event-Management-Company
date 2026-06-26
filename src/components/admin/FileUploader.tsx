import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  section: string;
  onUploadSuccess: (path: string) => void;
  currentPath?: string;
  label: string;
  accept?: string;
}

export default function FileUploader({ section, onUploadSuccess, currentPath, label, accept }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('section', section);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        onUploadSuccess(data.path);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => setDragActive(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-[0.6rem] uppercase tracking-widest text-brand-teal font-medium">{label}</p>
      
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative aspect-video rounded border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center ${
          dragActive ? 'border-brand-teal bg-brand-teal/5' : 'border-white/10 bg-white/5'
        }`}
      >
        {currentPath ? (
          <div className="absolute inset-0 group">
            {accept?.includes('video') ? (
              <video src={currentPath} className="w-full h-full object-cover rounded" />
            ) : (
              <img src={currentPath} className="w-full h-full object-cover rounded" />
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => onUploadSuccess('')}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <Upload className={`mb-4 ${uploading ? 'animate-pulse text-brand-teal' : 'text-white/20'}`} size={32} />
            <p className="text-white/40 text-xs tracking-wider uppercase mb-2">
              {uploading ? "Uploading..." : "Drag & Drop or Click to Upload"}
            </p>
            <input 
              type="file" 
              accept={accept}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={uploading}
            />
          </>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center rounded">
            <Loader2 className="animate-spin text-brand-teal" size={32} />
          </div>
        )}
      </div>
    </div>
  );
}
