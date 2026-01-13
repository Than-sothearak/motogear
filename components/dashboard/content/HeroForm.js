"use client";
import React, { useActionState, useState } from "react";
import ChooseFile from "../ChooseFile";
import { createHeroContent, updateHeroContent } from "@/actions/content";
import { BiTrash } from "react-icons/bi";

export const HeroForm = ({ data, id }) => {
  const [files, setFiles] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setIsEditing(false);
    setFormData((prev) => ({
      ...prev,
      removeVideo: "",
      videoUrl: data?.videoUrl,
    }));
  };

  const [formData, setFormData] = useState({
    title: data?.title || "",
    subtitle: data?.subtitle || "",
    btnText: data?.btnText || "",
    btnLink: data?.btnLink || "",
    videoUrl: data?.videoUrl || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const updateHeroContentById = updateHeroContent.bind(null, id);
  const [state, action, isPending] = useActionState(
    !id ? createHeroContent : updateHeroContentById,
    undefined
  );

  const handleRemoveVideo = (url) => {
    setFormData((prev) => ({
      ...prev,
      removeVideo: url,
      videoUrl: "",
    }));
  };

  return (
    <div className="container m-auto p-4 justify-center bg-primary rounded-lg space-y-3 max-h-full">
      <form action={action} className="space-y-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Hero Section</h1>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="border text-primarytext px-4 py-2 rounded hover:bg-tertiary hover:text-primary"
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}

            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end ">
                <button
                  type="submit"
                  disabled={isPending}
                  className={` w-full text-primary bg-tertiary hover:bg-tertiary/80 rounded  px-4 py-2 ${
                    isPending ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                 {isPending ? 'Saving...' :  'Save change'}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full space-y-2">
            <div className="space-y-2 text-sm w-full">
              <div className="flex gap-2">
                <label className="text-primarytext">Hero title</label>
                {state?.errors?.title && (
                  <p className=" text-red-600">{state.errors.title}</p>
                )}
              </div>
              <input
                type="text"
                name="title"
                value={formData.title}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Hero title"
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>

            <div className="space-y-2 text-sm w-full">
              <div className="flex gap-2">
                <label className="text-primarytext">Hero subtitle</label>
                {state?.errors?.subtitle && (
                  <p className=" text-red-600">{state.errors.subtitle}</p>
                )}
              </div>
              <input
                type="text"
                name="subtitle"
                value={formData?.subtitle}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Hero subtitle"
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>

            <div className="space-y-2 text-sm w-full">
              <div className="flex gap-2">
                <label className="text-primarytext">Button title</label>
                {state?.errors?.btnText && (
                  <p className=" text-red-600">{state.errors.btnText}</p>
                )}
              </div>
              <input
                type="text"
                name="btnText"
                value={formData.btnText}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Button title"
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>

            <div className="space-y-2 text-sm w-full">
              <div className="flex gap-2 items-center">
                <label className="text-primarytext">Button link</label>
                {state?.errors?.btnLink && (
                  <p className=" text-red-600">{state.errors.btnLink}</p>
                )}
              </div>

              <input
                type="text"
                name="btnLink"
                onChange={handleChange}
                value={formData.btnLink}
                disabled={!isEditing}
                placeholder="Button link"
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
          </div>
          <div className="w-full">
            <input
              name="removeVideo"
              defaultValue={formData?.removeVideo}
              className="w-full hidden"
            />
            <label className="font-medium">Files</label>
            {formData.videoUrl ? (
              <div className="relative w-full gap-2 p-2 group">
                <video
                  src={formData?.videoUrl}
                  className="w-full h-full rounded-md object-cover"
                  controls
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(formData?.videoUrl)}
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
                )}
              </div>
            ) : (
              <div>
                <ChooseFile files={files} setFiles={setFiles} />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
