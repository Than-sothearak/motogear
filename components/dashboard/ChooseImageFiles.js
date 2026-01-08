"use client";
import { BiTrash, BiUpload, BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function ChooseImageFiles({ files, setFiles }) {

  const updateInputFiles = (updatedFiles) => {
    const newFileList = new DataTransfer();
    updatedFiles.forEach((fileData) => newFileList.items.add(fileData.file));
    const input = document.getElementById("fileInput");
    if (input) input.files = newFileList.files;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileArray = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const newFiles = [...files, ...fileArray];
    setFiles(newFiles);
    updateInputFiles(newFiles); // Keep input in sync
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    updateInputFiles(updatedFiles);
  };

  // --- NEW SWAP LOGIC ---
  const moveImage = (index, direction) => {
    const newIndex = direction === "left" ? index - 1 : index + 1;
    
    // Boundary check
    if (newIndex < 0 || newIndex >= files.length) return;

    const updatedFiles = [...files];
    // Swap the elements
    [updatedFiles[index], updatedFiles[newIndex]] = [updatedFiles[newIndex], updatedFiles[index]];
    
    setFiles(updatedFiles);
    updateInputFiles(updatedFiles); // Crucial for useActionState order
  };

  return (
    <div className="mt-10">
       <label className="font-bold text-md">Image upload</label>
      <div className="flex flex-col-reverse h-full items-center justify-start gap-4">
        {/* Upload Area */}
        <div className="w-full h-full flex justify-center items-center gap-8 flex-col border-dashed border-secondary mt-2 rounded-md border-2 p-8">
          <BiUpload size={28} />
          <div className="text-center w-full">
            <h1 className="font-bold text-lg">Choose a file to upload</h1>
            <p className="font-light text-slate-400">JPEG, PNG, PDG, and JPG, file 1MB limited</p>
          </div>
          <label htmlFor="fileInput" className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Choose Image
          </label>
          <input id="fileInput" type="file" name="images" onChange={handleFileChange} multiple className="hidden" accept="image/*" />
        </div>

        {/* Preview Area */}
        {files.length > 0 && (
          <div className="flex flex-wrap justify-start gap-4 border-dashed border-secondary mt-2 rounded-md border-2 p-4 w-full">
            {files.map((fileData, index) => (
              <div key={fileData.preview} className="w-40 h-40 rounded-md relative group border border-secondary overflow-hidden">
                <img src={fileData.preview} alt="Preview" className="w-full h-full object-cover group-hover:opacity-30 transition" />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  {/* Move Left */}
                  <button 
                    type="button"
                    onClick={() => moveImage(index, "left")}
                    disabled={index === 0}
                    className={`p-1 bg-black/50 rounded-full text-white hover:bg-black ${index === 0 && 'hidden'}`}
                  >
                    <BiChevronLeft size={24} />
                  </button>

                  {/* Delete */}
                  <button type="button" onClick={() => handleRemoveFile(index)} className="p-2 bg-red-600/70 rounded-full text-white hover:bg-red-700">
                    <BiTrash size={20} />
                  </button>

                  {/* Move Right */}
                  <button 
                    type="button" 
                    onClick={() => moveImage(index, "right")}
                    disabled={index === files.length - 1}
                    className={`p-1 bg-black/50 rounded-full text-white hover:bg-black ${index === files.length - 1 && 'hidden'}`}
                  >
                    <BiChevronRight size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}