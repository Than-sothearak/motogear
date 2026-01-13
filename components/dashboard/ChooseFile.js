"use client";
import Image from "next/image";
import { BiTrash, BiUpload } from "react-icons/bi";
import { FaFile } from "react-icons/fa";

export default function ChooseFile({ files, setFiles }) {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileArray = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Preview URL
    }));
     setFiles((prevFiles = []) => [...prevFiles, ...fileArray]);
  };

const handleRemoveFile = (index) => {
  setFiles((prevFiles = []) => {
    const updatedFiles = prevFiles.filter((_, i) => i !== index);

    const newFileList = new DataTransfer();
    updatedFiles.forEach((fileData) => newFileList.items.add(fileData.file));

    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.files = newFileList.files;

    return updatedFiles;
  });
};

  return (
    <div className="w-full">
      <div>
     

   {files?.length > 0 && (
        <div className="overflow-y-scroll flex flex-wrap justify-start gap-4 border-dashed border-secondary mt-2 rounded-md border-2 p-4 w-full">
          {files.map((fileData, index) => (
            <div key={index} className="w-full rounded-md relative group border">
              {/* IMAGE PREVIEW */}
              {fileData.file.type.startsWith("image/") && (
                <div className="w-full border flex flex-col items-center gap-2 border-secondary rounded-sm p-2">
                  <div className="w-full h-32 relative">
                    <Image
                      src={fileData.preview}
                      alt="Preview"
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <p className="truncate text-xs">{fileData.file.name}</p>
                </div>
              )}

              {/* VIDEO PREVIEW */}
              {fileData.file.type.startsWith("video/") && (
                <div className="w-full gap-2 p-2">
                  <video
                    src={fileData.preview}
                    className="w-full h-full rounded-md object-cover"
                    controls
                  />
                  <p className="truncate text-xs">{fileData.file.name}</p>
                </div>
              )}

              {/* OTHER FILE TYPES */}
              {!fileData.file.type.startsWith("image/") &&
                !fileData.file.type.startsWith("video/") && (
                  <div className="text-xs p-3 flex items-center gap-2">
                    <FaFile size={18} />
                    <p className="truncate">{fileData.file.name}</p>
                  </div>
                )}

              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute flex justify-center items-center top-1/2 right-1/2 text-slate-200
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  transform  -translate-y-1/2"
              >
                <BiTrash
                  className="duration-300 rounded-full p-2 w-9 h-9
                    transform hover:scale-125 scale-100 bg-tertiary text-primary opacity-50 hover:opacity-90 hover:text-primary"
                  size={20}
                />
              </button>
            </div>
          ))}
        </div>
      )}

        <div className={`flex flex-col h-full items-center justify-start gap-4`}>
          <div className="w-full h-full flex justify-center items-center gap-8 flex-col border-dashed border-secondary mt-2 rounded-md border-2 p-8">
            <BiUpload size={28} />
            <div className="text-center w-full">
              <h1 className="font-bold text-lg">Choose a file to upload</h1>
              <p className="font-light text-slate-400">Video or Image file (max 5MB)</p>
            </div>
            <div className="flex justify-center w-full">
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-tertiary text-primary px-6 py-3 rounded-lg hover:bg-secondary transition duration-200"
              >
                Choose File
              </label>
              <input
                id="fileInput"
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full hidden"
                accept="image/*,video/*"
              />
            </div>
          </div>
        </div>
   
      </div>

   
    </div>
  );
}
