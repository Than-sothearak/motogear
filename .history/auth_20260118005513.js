export const runtime = "nodejs"; // MUST be at the top
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { mongoDb } from "@/utils/connectDB";
import { z } from "zod";
import { verifyPassword } from "@/lib/isVerifyPassword";
import { authConfig } from "./authConfig";
import { User } from "./models/User";
import Google from "next-auth/providers/google"

export async function getUser(email) {
  await mongoDb();
  try {
    const user = await User?.findOne({ email: email });
    return user ? user : null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({

  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await verifyPassword(password, user.password);
          if (passwordsMatch)
            return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
    Credentials({
      id: "telegram-login",
      name: "Telegram login",
      credentials: {
        telegramData: { type: "text" },
      },
      async authorize(credentials) {

        if (!credentials?.telegramData) return null;
        const { AuthDataValidator, objectToAuthDataMap } = await import(
          "@telegram-auth/server"
        );

        const telegramValidator = new AuthDataValidator({
          botToken: process.env.TELEGRAM_BOT_TOKEN,
        });
        const telegramData = JSON.parse(credentials.telegramData);
        try {
          // ✅ Verify Telegram data
          const data = objectToAuthDataMap(telegramData);
          const userData = await telegramValidator.validate(data);

          if (userData.id && userData.first_name) {
            const userObj = {
              _id: userData.id.toString(),
              email: userData.id.toString()+'@mail.com', // just a placeholder if schema requires email
              username: [userData.first_name, userData.last_name || ""].join(" "),
              imageUrl: userData.photo_url,
              isAdmin: false,
            };

            try {
              // Check if user already exists
              let user = await User.findOne({ telegramChatId: userData.id.toString() });

              if (!user) {
                user = await User.create({
                  username: userData.first_name || "Unknown",
                  email: userData.id.toString()+'@mail.com', // required by schema
                  address: "Not provided",       // required by schema
                  gender: "Not specified",       // required by schema
                  isAdmin: false,
                  imageUrl: userData.photo_url || "",
                  telegramChatId: userData.id.toString(),
                });
                console.log("User created successfully");
              } else {
                console.log("User already exists, skipping creation");
              }

              return userObj; // return user object for Auth.js session

            } catch (error) {
              console.error("Something went wrong while creating the user:", error);
              return null;
            }
          }
          return null;

        } catch (error) {
          console.error("Telegram auth failed:", error);
          return null;
        }
      },
    }),
 Google({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
})
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.username = user.username;
        token.imageUrl = user.imageUrl;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        token._id = user._id.toString();
      }

      return token;
    },

    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id.toString(),
          username: token.username,
          email: token.email,
          imageUrl: token.imageUrl,
          isAdmin: token.isAdmin,
        };

      }
      return session;
    },

    
  },
});