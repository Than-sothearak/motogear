import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { z } from "zod";
import { verifyPassword } from "@/lib/isVerifyPassword";
import { authConfig } from "./authConfig";
import { AuthDataValidator } from "@telegram-auth/server";


export async function getUser({ email, telegramChatId }) {
  await mongoDb(); // ensure DB connection

  try {
    const query = {
      $or: []
    };
    if (email) query.$or.push({ email });
    if (telegramChatId) query.$or.push({ telegramChatId });

    if (query.$or.length === 0) return null;

    const user = await User.findOne(query);

    return user ?? null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}


const telegramValidator = new AuthDataValidator({
  botToken: process.env.TELEGRAM_BOT_TOKEN
});

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

        const telegramData = JSON.parse(credentials.telegramData);

        try {
          // ✅ Verify Telegram data
          const data = objectToAuthDataMap(telegramData);
          const tgUser = await telegramValidator.validate(data);

          if (tgUser.id && tgUser.first_name) {
					const returned = {
						id: tgUser.id.toString(),
						email:tgUser.id.toString(),
						name: [tgUser.first_name, user.last_name || ""].join(" "),
						image: tgUser.photo_url,
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