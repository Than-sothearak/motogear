"use client";
import { BiTrash, BiUpload } from "react-icons/bi";

// Accept images, onChange, and onRemove as props
export default function ChooseImageFile({ images = [], onChange, onRemove }) {

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newFileArray = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        // Pass the combined existing and new images back to the parent
        onChange([...images, ...newFileArray]);
    };

    return (
        <div className="w-full">
            <label className="font-medium">Variant Images</label>
            <div className="flex flex-col items-center justify-start gap-4">
                
                {/* Upload Box: Only show if needed or keep it visible */}
                <div className="w-full flex justify-center items-center gap-4 flex-col border-dashed border-gray-300 mt-2 rounded-md border-2 p-6">
                    <BiUpload size={24} />
                    <div className="text-center">
                        <p className="text-sm font-light text-slate-400">JPEG, PNG (Max 1MB)</p>
                    </div>
                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                        Choose Image
                        <input
                            type="file"
                            accept="image/*"
                            multiple // Allow multiple for the variant
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Preview Grid */}
                {images.length > 0 && (
                    <div className="flex flex-wrap gap-4 p-4 border rounded-md w-full bg-gray-50">
                        {images.map((fileData, index) => (
                            <div key={index} className="w-24 h-24 relative group">
                                <img
                                    src={fileData.preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-md border"
                                />
                                <button
                                    type="button"
                                    onClick={() => onRemove(index)} // Trigger parent removal
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                                >
                                    <BiTrash className="text-white" size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}