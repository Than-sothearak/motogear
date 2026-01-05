import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, default: "" },
    dateOfBirth: Date,
    address: { type: String, required: true },
    gender: { type: String, required: true },
    note: String,
    status: { type: String, default: "active" },
    imageUrl: String,
    telegramChatId: String,
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: { type: Boolean, default: false },
    loginCount: { type: Number, default: 0 },
    lastLogin: Date,
    lastIP: String,
    location: { type: String, default: "" },
    lastSeen: Date,
    lastUserAgent: String,
    deviceType: { type: String, default: "Desktop" },
    deviceModel: String,
    osName: String,
    browserName: String,
  },
  { timestamps: true }
);

export const User =
  mongoose.models?.User || model("User", userSchema);
  
