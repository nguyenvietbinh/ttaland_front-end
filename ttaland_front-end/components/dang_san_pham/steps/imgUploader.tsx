import React, { useRef, useState } from 'react';

type Props = {
  onImagesSelected?: (files: File[]) => void;
};

const ImageUploader: React.FC<Props> = ({ onImagesSelected }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const imageFiles = Array.from(fileList).filter(file =>
      file.type.startsWith('image/')
    );

    const newPreviews = imageFiles.map(file => URL.createObjectURL(file));
    setFiles(prev => [...prev, ...imageFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviews]);
    onImagesSelected?.([...files, ...imageFiles]);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previewUrls];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setPreviewUrls(newPreviews);
    onImagesSelected?.(newFiles);
  };


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-gray-400 p-6 rounded-md text-center cursor-pointer shadow-lg"
      onClick={handleClick}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="text-gray-600">📁 Kéo và thả ảnh vào đây hoặc nhấn để chọn từ thư viện (ít nhất 3 ảnh)</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={e => handleFiles(e.target.files)}
      />

      {/* Xem trước ảnh */}
      <div className="flex flex-wrap justify-center mt-4 gap-4">
        {previewUrls.map((url, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <img
              src={url}
              alt={`preview-${idx}`}
              className="w-full h-full object-cover rounded shadow"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(idx);
              }}
              className="absolute -top-2 -right-2 bg-white border border-gray-300 text-red-500 font-bold text-2xl cursor-pointer rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-100"
              title="Xóa ảnh"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
