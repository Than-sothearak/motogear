export const runtime = "nodejs"; // MUST be at the top
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { mongoDb } from "@/utils/connectDB";
import { z } from "zod";
import { verifyPassword } from "@/lib/isVerifyPassword";
import { authConfig } from "./authConfig";
import { User } from "./models/User";

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
            const user = {
              _id: userData.id.toString(),
              email: userData.id.toString(),
              username: [userData.first_name, userData.last_name || ""].join(" "),
              imageUrl: userData.photo_url,
              isAdmin: false
            };
console.log(user)
            try {
              await User.create({
                uername: user.username,
                isAdmin: user.isAdmin,
                imageUrl: user.imageUrl,
                telegramChatId: user._id.toString()
              });
            } catch {
              console.log(
                "Something went wrong while creating the user."
              );
            }
       return user
          }
          return null;
        } catch (error) {
          console.error("Telegram auth failed:", error);
          return null;
        }
      },
    }),

  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.username = user.username;
        token.imageUrl = user.imageUrl;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        token._id = user._id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id,
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