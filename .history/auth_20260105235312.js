export const runtime = "nodejs"; // MUST be at the top
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { mongoDb } from "@/utils/connectDB";
import { z } from "zod";
import { verifyPassword } from "@/lib/isVerifyPassword";
import { authConfig } from "./authConfig";
import { User } from "./models/User";
await mongoDb();
export async function getUser(email) {

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
      name: "Telegram",

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
          const user = await telegramValidator.validate(data);

          if (user.id && user.first_name) {
            const returned = {
              id: user.id.toString(),
              email: user.id.toString(),
              name: [user.first_name, user.last_name || ""].join(" "),
              image: user.photo_url,
            };

            try {
              await createUserOrUpdate(user);
            } catch {
              console.log(
                "Something went wrong while creating the user."
              );
            }

            return returned;
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
        token._id = user._id.toString();
      }

      return token;
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