"use client";
import { useState } from "react";

export default function ChooseImageFile() {
  const [files, setFiles] = useState([] || null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileArray = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Preview image URL
    }));
    setFiles((prevFiles) => [...prevFiles, ...fileArray]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    const newFileList = new DataTransfer();
    updatedFiles.forEach((fileData) => newFileList.items.add(fileData.file));
    document.getElementById("fileInput").files = newFileList.files;

  };

  return (
    <div className="">
       <label className="block font-medium">Image</label>
      <div className={`${files.length <= 0 ? 'h-52' : ''} border-2  flex flex-col items-center justify-between gap-4 border-dashed border-slate-600 p-4 mt-2 rounded-md`}>
      <div className="w-full float-none">
       
       <input
         id="fileInput"
         onChange={handleFileChange}
         multiple
         name="image"
         type="file"
         className="w-full p-2 rounded-md border-none bg-secondary text-xs focus:ring-0 focus:outline-none"
       />
     </div>
     {files.length <= 0 && <h1 className="text-slate-300 text-md">Upload image</h1>}
     <div className="grid grid-cols-3 gap-2 mt-4 mb-2">
       {files.map((fileData, index) => (
         <div key={index} className="relative">
           {fileData.file.type.startsWith("image/") ? (
             <img
               src={fileData.preview}
               alt="Preview"
               className="w-full h-auto rounded-md"
             />
           ) : (
             <p className="text-xs">{fileData.file.name}</p>
           )}
           <button
             type="button"
             className="absolute top-1 right-1 bg-red-500 text-primarytext text-xs px-2 py-1 rounded"
             onClick={() => handleRemoveFile(index)}
           >
             X
           </button>
         </div>
       ))}
     </div>
      </div>
    </div>
  );
}
