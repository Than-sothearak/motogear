import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

// Helper function to upload file to S3
export async function uploadFileToS3(file) {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      ACL: "public-read", // Remove this if you don't want public access
      Key: `${fileName}`,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    };

    await s3Client.send(new PutObjectCommand(params));
    return `https://${process.env.AWS_S3_BUCKET}.s3.ap-southeast-1.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

// Helper function to delete file from S3
export async function deleteFileFromS3(file) {
  try {
    console.log(`File deleted successfully from S3: uploads/${file}`);
    
    if (!file) {
      throw new Error("File key is required for deletion");
    }

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${file}`,
      })
    );

  } catch (error) {
    console.error("S3 Delete Error:", error);
    throw new Error("Failed to delete file from S3");
  }
}
