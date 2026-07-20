"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => 
        (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 5 * 1024 * 1024
      );
      
      // Limit to 5 files total
      const newFiles = [...files, ...validFiles].slice(0, 5);
      setFiles(newFiles);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <label className="block text-[13px] font-semibold text-zinc-900 mb-2">
        Lampirkan Foto Bukti
      </label>
      
      <input 
        type="file"
        name="evidence"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept="image/jpeg, image/png"
      />

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-zinc-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-zinc-50 hover:bg-zinc-100 hover:border-[#cc4224]/50 transition-colors cursor-pointer"
      >
        <UploadCloud className="w-6 h-6 text-zinc-400 mb-3" />
        <p className="text-[13px] font-semibold text-zinc-900 mb-1">Klik untuk mengunggah atau seret file ke sini</p>
        <p className="text-[11px] text-zinc-500">Maksimal 5 foto (JPG, PNG). Ukuran file max 5MB/foto.</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white border border-zinc-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-500">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <p className="text-[12px] font-semibold text-zinc-900 truncate">{file.name}</p>
                  <p className="text-[10px] text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
