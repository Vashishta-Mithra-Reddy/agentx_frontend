"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { motion } from "framer-motion";
import { toast } from 'sonner';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      const fileExtension = uploadedFile.name.split('.').pop();

      if (['csv', 'xlsx', 'xls'].includes(fileExtension || '')) {
        setFile(uploadedFile);
        setMessage(`Selected file: ${uploadedFile.name}`);
        setError('');
      } else {
        setFile(null);
        setMessage('');
        setError('Invalid file type. Only CSV, XLSX, and XLS files are allowed.');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      setMessage(response.data.message);
      toast.success(response.data.message);
      setError('');
      setFile(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'File upload failed.');
      setMessage('');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0, filter: "blur(5px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="px-12 pt-12 pb-6 rounded-xl w-full max-w-md bg-background border-1 border-foreground/20 font-outfit h-fit z-0"
    >
      <h2 className="text-3xl mb-12 text-center">Upload Tasks</h2>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-foreground/30 rounded-xl p-8 text-center cursor-pointer hover:border-foreground/50 transition-colors duration-300"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-foreground/70">Drop the files here ...</p>
        ) : (
          <p className="text-foreground/70">Drag 'n' drop a CSV or XLSX file here, or click to select one</p>
        )}
      </div>
      {file && <p className="mt-4 text-center text-foreground/80">{message}</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="mt-6 w-full bg-foreground/80 hover:bg-foreground text-lg text-primary-foreground font-bold py-2 px-6 rounded-xl cursor-pointer focus:outline-none focus:shadow-outline transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          "Upload File"
        )}
      </button>
    </motion.div>
  );
};

export default FileUpload;