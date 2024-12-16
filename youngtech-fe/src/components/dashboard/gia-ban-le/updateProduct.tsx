"use client";
import React, { useState, useRef, DragEvent, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { File, Trash2, Upload } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/utils/cn";

// ModernSimpleInput component
const ModernSimpleInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      className={cn(
        "flex h-10 !w-[100%] rounded-xl border px-3 py-2 text-sm ring-0 focus:ring-0 transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "border-neutral-400/20 bg-transparent dark:bg-neutral-800 text-white/50 dark:hover:bg-neutral-800/50",
        "placeholder:text-neutral-400 focus-visible:border-neutral-400/50",
        "file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm",
        className
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
);
ModernSimpleInput.displayName = "Modern Simple Input";

// FileDropzone component
interface FileWithPreview extends File {
  preview: string;
}

const FileDropzone = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles = fileList.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (fileToDelete: FileWithPreview) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
    URL.revokeObjectURL(fileToDelete.preview);
  };

  return (
    <div className="h-60 w-full m-auto">
      <motion.div
        className={`relative size-full cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-500/5"
            : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          accept="image/*,application/pdf"
          className="hidden"
          multiple={true}
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
          ref={fileInputRef}
          type="file"
        />
        <AnimatePresence>
          {isDragActive ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className=" pointer-events-none select-none"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Upload className="pointer-events-none mx-auto size-8 select-none text-blue-500" />
              <p className="pointer-events-none mt-2 select-none text-blue-500 text-sm">Drop files here...</p>
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              initial={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Upload className="mx-auto size-8 text-orange-600 dark:text-neutral-500" />
              <p className="mt-6 text-balance font-medium text-white/50 text-[1.2rem] tracking-tighter dark:text-neutral-500">
                Thả hình ảnh của bạn ở đây, <span className="text-orange-600 font-bold">hoặc nhấp để duyệt</span>
              </p>
              <span className="text-[0.7rem] mt-3 text-white/50">Khuyến nghị 1600 x 1200 (4:3). Tệp PNG, JPG và GIF được phép</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 space-y-2"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
          >
            {files.map((file) => (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center rounded-lg bg-neutral-400/10 p-1"
                exit={{ opacity: 0, x: 20 }}
                initial={{ opacity: 0, x: -20 }}
                key={file.name}
              >
                {file.type.startsWith("image/") ? (
                  <img alt={file.name} className="mr-2 size-10 rounded object-cover" src={file.preview} />
                ) : (
                  <File className="mr-2 size-10 text-neutral-500" />
                )}
                <span className="flex-1 truncate text-neutral-600 text-xs tracking-tighter dark:text-neutral-400">
                  {file.name}
                </span>
                <Trash2
                  className="mr-2 size-5 cursor-pointer text-red-500 transition-colors hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFile(file);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ProductForm component
const ProductForm = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceOrigin, setPriceOrigin] = useState("");
  const [priceSale, setPriceSale] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="space-y-6">
      {/* Input Category */}
      <div className="input-category flex flex-col gap-2">
        <label className="block text-sm font-medium text-white/50 mb-2">Loại sản phẩm</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn loại sản phẩm" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ti vi</SelectLabel>
              <SelectItem value="Tủ lạnh">Tủ lạnh</SelectItem>
              <SelectItem value="Máy tính">Máy tính</SelectItem>
              <SelectItem value="Điện thoại">Điện thoại</SelectItem>
              <SelectItem value="Máy điều hòa">Máy điều hòa</SelectItem>
              <SelectItem value="Bàn là">Bàn là</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Input Name */}
      <div className="input-name flex flex-col gap-2">
        <label className="block text-sm font-medium text-white/50 mb-2">Tên sản phẩm</label>
        <ModernSimpleInput
          className="w-72"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên sản phẩm..."
          type="text"
          value={name}
        />
      </div>

      {/* Input Price */}
      <div className="input-price flex flex-col gap-2">
        <label className="block text-sm font-medium text-white/50 mb-2">Giá bán ra</label>
        <ModernSimpleInput
          className="w-72"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Nhập giá bán..."
          type="text"
          value={price}
        />
      </div>

      {/* Input Price Origin */}
      <div className="input-price-origin flex flex-col gap-2">
        <label className="block text-sm font-medium text-white/50 mb-2">Giá gốc sản phẩm</label>
        <ModernSimpleInput
          className="w-72"
          onChange={(e) => setPriceOrigin(e.target.value)}
          placeholder="Nhập giá gốc..."
          type="text"
          value={priceOrigin}
        />
      </div>

      {/* Input Price Sale */}
      <div className="input-price-sale flex flex-col gap-2">
        <label className="block text-sm font-medium text-white/50 mb-2">Giá Sale</label>
        <ModernSimpleInput
          className="w-72"
          onChange={(e) => setPriceSale(e.target.value)}
          placeholder="Nhập giá Sale..."
          type="text"
          value={priceSale}
        />
      </div>

      {/* Input Date */}
      <div className="input-date flex flex-col gap-2">
        <label className="block text-sm font-medium text-white/50 mb-2">Ngày sửa</label>
        <ModernSimpleInput
          className="w-72"
          onChange={(e) => setDate(e.target.value)}
          placeholder="Nhập ngày sửa..."
          type="text"
          value={date}
        />
      </div>

      {/* FileDropzone */}
      <FileDropzone />
    </div>
  );
};

export default ProductForm;
