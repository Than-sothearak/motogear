// lib/actions.js
"use server";
import { signIn } from "@/auth"; // Points to your NextAuth config
import { AuthError } from "next-auth";
import { getUser } from "@/auth"; // Import from your auth.js
import { verifyPassword } from "@/lib/isVerifyPassword";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { User } from "@/models/User";
import {UAParser} from "ua-parser-js";
import { mongoDb } from "@/utils/connectDB";

export async function authenticate(prevState, formData) {

  // const telegramData = {data}
  const action = formData.get('action')
  if (action) {
    try {
      // 1. MUST use "telegram-login" to match your Provider ID in auth.ts
      // 2. MUST use key name "telegramData" to match authorize(credentials)
      await signIn(action, { 
        redirect: false
      });
    redirect("/dashboard");
    } catch (error) {
      if (error instanceof AuthError) return "Login failed.";
      throw error; // Required for Next.js redirects to work!
    }
  } else {
     const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) return "Missing credentials.";

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("host");
  const getIp = ip.split(",")[0].trim();
  const userAgent = headersList.get("user-agent") || "unknown";

  // Parse device info
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  try {
    await mongoDb()
    // Check if email exists first
    const user = await getUser(email);
    if (!user) {
      return "Email not found.";
    }

    // Verify password manually
    const passwordsMatch = await verifyPassword(password, user.password);
    if (!passwordsMatch) {
      return "Incorrect password.";
    }

    // Check if account Deactivated
    if (!user.isAdmin && user.status === "deactivated") {
      return "Your account has been deactivated!";
    }

  const res = await fetch(`http://ip-api.com/json/${getIp}`);
  const location = await res.json();

    // If email and password are valid, proceed with signIn
    await signIn("credentials", { email, password, redirect: false });
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLogin: new Date(),
          lastIP: getIp,
          location: `${location.city}, ${location.region}, ${location.country}`,
          lastUserAgent: userAgent,
          deviceType: device.type || "Desktop",
          deviceModel: device.model || "Desktop",
          osName: os.name || "",
          browserName: browser.name || "",
        },
        $inc: { loginCount: 1 },
      }
    );
    console.log("User authenticated successfully");
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Something went wrong with credentials."; // Fallback (shouldn’t hit often)
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  }

  
}