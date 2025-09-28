import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: (fileId: string) => void;
  files: UploadedFile[];
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: Record<string, string[]>;
  className?: string;
}

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

export default function FileUpload({
  onFileSelect,
  onFileRemove,
  files,
  maxFiles = 5,
  maxSize = 10,
  accept = {
    'application/pdf': ['.pdf'],
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'text/*': ['.txt', '.md'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  className = ''
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      if (files.length >= maxFiles) {
        return;
      }
      
      if (file.size > maxSize * 1024 * 1024) {
        return;
      }
      
      onFileSelect(file);
    });
  }, [files.length, maxFiles, maxSize, onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    maxSize: maxSize * 1024 * 1024,
    disabled: files.length >= maxFiles
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return '🖼️';
    } else if (file.type === 'application/pdf') {
      return '📄';
    } else if (file.type.startsWith('text/')) {
      return '📝';
    } else if (file.type.includes('word') || file.type.includes('document')) {
      return '📋';
    } else {
      return '📁';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <Card
        {...getRootProps()}
        className={`cursor-pointer transition-all duration-200 ${
          isDragActive || dragActive
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
            : 'border-dashed border-2 border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500'
        } ${files.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <CardContent className="p-8">
          <input {...getInputProps()} />
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {isDragActive ? 'Отпустите файлы здесь' : 'Перетащите файлы сюда'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              или <span className="text-purple-600 dark:text-purple-400 font-medium">нажмите для выбора</span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Максимум {maxFiles} файлов, до {maxSize}MB каждый
            </p>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              Поддерживаемые форматы: PDF, изображения, документы, текст
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Загруженные файлы ({files.length}/{maxFiles})
          </h4>
          {files.map((file) => (
            <div
              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
            >
              <div className="text-2xl">{getFileIcon(file.file)}</div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                  {file.file.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {formatFileSize(file.file.size)}
                </p>
                
                {file.status === 'uploading' && file.progress !== undefined && (
                  <div className="mt-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                      <div
                        className="bg-purple-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {file.progress}% загружено
                    </p>
                  </div>
                )}
                
                {file.status === 'error' && file.error && (
                  <p className="text-xs text-red-500 mt-1">{file.error}</p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {file.status === 'success' && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {file.status === 'error' && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onFileRemove(file.id)}
                  className="h-8 w-8 p-0 text-slate-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
