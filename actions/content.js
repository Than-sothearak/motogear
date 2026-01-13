"use server"

import { auth } from "@/auth";
import { Content } from "@/models/Content";
import { mongoDb } from "@/utils/connectDB";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadImageFileToS3";
import { redirect } from "next/navigation";

export async function createHeroContent(prevState, formData) {
 await  mongoDb()
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied!");
  }

  if (!formData || typeof formData.get !== "function") {
    console.error("Invalid or missing formData:", formData);
    return { error: "No valid form data received" };
  }
  const title = formData.get("title");
  const subtitle = formData.get("subtitle");
  const btnText = formData.get("btnText");
  const btnLink = formData.get("btnLink")
  const  posterImage = formData.get("posterImage");
  const enabled = formData.get("enabled");
  const file = formData.get("file");

  let errors = {};

  if (!title || !subtitle || !btnText || !btnLink ) {
    if (!title) errors.title = "Title is required";
    if (!subtitle) errors.subtitle = "subtitle is required";
    if (!btnLink) errors.btnLink = "Link is required ex: /products";
    if (!btnText) errors.btnText = "Button is required";
    return { errors };
  }

  let videoUrl = "";
        if (file && file.size > 0) {
          videoUrl = await uploadFileToS3(file)
          console.log("Vdieo uploaded to S3:", videoUrl);
        } else {
          console.log("No Video provided");
        }

  const data = {
    title,
    subtitle,
    btnLink,
    btnText,
    videoUrl: videoUrl,
    posterImage,
    enabled,
  }
  await Content.create({hero: data});
  redirect('/dashboard/contents')
}

export async function updateHeroContent(id, prevState, formData) {
 await  mongoDb()
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied!");
  }
  
  if (id) {
    const content = await Content.findById({_id: id})
    if (!content) {
        return
    }
    if (!formData || typeof formData.get !== "function") {
    console.error("Invalid or missing formData:", formData);
    return { error: "No valid form data received" };
  }
  const title = formData.get("title");
  const subtitle = formData.get("subtitle");
  const btnText = formData.get("btnText");
  const btnLink = formData.get("btnLink")
  const  posterImage = formData.get("posterImage");
  const enabled = formData.get("enabled");
  const file = formData.get("file");
  const removeVideo = formData.get("removeVideo")

  let errors = {};

  if (!title || !subtitle || !btnText || !btnLink ) {
    if (!title) errors.title = "Title is required";
    if (!subtitle) errors.subtitle = "subtitle is required";
    if (!btnLink) errors.btnLink = "Link is required ex: /products";
    if (!btnText) errors.btnText = "Button is required";
    return { errors };
  }

  let videoUrl = content.hero.videoUrl
  
  if (removeVideo) {
    const key  = removeVideo.split("/").pop();
    if (key) {
       await deleteFileFromS3(key)
    }
    videoUrl= ""
  }
       if (file && file.size > 0) {
          videoUrl = await uploadFileToS3(file);
          console.log("Vdieo uploaded to S3:", videoUrl);
        } else {
          console.log("No Video provided");
        }      

content.hero = {
  title,
  subtitle,
  btnLink,
  btnText,
  videoUrl: videoUrl,
  posterImage,
  enabled,
};

await content.save();

  }
  redirect('/dashboard/contents')
}