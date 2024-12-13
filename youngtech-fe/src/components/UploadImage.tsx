"use client";
import { useState } from 'react';
import Image from 'next/image';

interface UploadImageProps {
  handleGetArrayImage: (urls: { url: string; public_id: string }[]) => void; // Define the callback type
}

const UploadImage: React.FC<UploadImageProps> = ({ handleGetArrayImage }) => {
  const [images, setImages] = useState<File[]>([]);
  const [urls, setUrls] = useState<{ url: string; public_id: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // Convert FileList to an array
      setImages(filesArray);
    }
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert('Please select at least one file');
      return;
    }

    setLoading(true);

    try {
      // Convert files to base64
      const base64Files = await Promise.all(
        images.map(
          (image) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = (error) => reject(error);
            })
        )
      );

      // Send base64 files to the API
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: base64Files }),
      });

      const data = await response.json();
      if (response.ok) {
        const imageUrls = data.urls.map((item: { url: string }) => item.url); // Only extract URLs
        setUrls(imageUrls); 
        handleGetArrayImage(imageUrls);
      } else {
        console.error('Upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log('123', urls)

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload Images</h1>
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {urls.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Images:</h3>
          <ul className="grid grid-cols-3 md:grid-cols-2 gap-4">
            {urls.map((item, index) => (
              <li key={index} className="flex flex-col items-center">
                <Image
                  src={item.url}
                  alt={`Uploaded ${index}`}
                  width={150} // Set the width
                  height={150} // Set the height
                  className="object-cover rounded-md border border-gray-200 shadow-sm"
                />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm mt-2 underline"
                >
                  View Image
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
