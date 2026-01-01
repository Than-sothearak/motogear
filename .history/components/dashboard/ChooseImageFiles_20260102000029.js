import { BiTrash, BiUpload } from "react-icons/bi";

export default function ChooseImageFile({ images, onChange, onRemove, inputId }) {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileArray = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    onChange([...images, ...fileArray]);
  };

  const handleRemove = (index) => {
    onRemove(index);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-full flex justify-center items-center gap-8 flex-col border-dashed border-secondary mt-2 rounded-md border-2 p-8">
        <div><BiUpload size={28} /></div>
        <div className="text-center w-full">
          <h1 className="font-bold text-lg">Choose a file to upload</h1>
          <p className="font-light text-slate-400">JPEG, PNG, PDF, and JPG, 1MB limit</p>
        </div>
        <div className="flex justify-center w-full">
          <label
            htmlFor={inputId} // use unique id
            className="cursor-pointer bg-blue-600 text-secondarytext px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Choose Image
          </label>
          <input
            id={inputId} // unique id
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className=""
          />
        </div>
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap justify-start gap-4 border-dashed border-secondary mt-2 rounded-md border-2 p-4 w-full">
          {images.map((img, index) => (
            <div key={index} className="w-40 h-40 relative group rounded-md overflow-hidden border">
              <img
                src={img.preview}
                alt="Preview"
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-10"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1/2 left-1/2 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2"
              >
                <BiTrash
                  size={20}
                  className="bg-black opacity-50 hover:opacity-90 rounded-full p-2 hover:text-primarytext"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
