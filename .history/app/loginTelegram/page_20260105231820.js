"use client"; // Must be client component

import { LoginButton } from "@telegram-auth/react";
import { signIn } from "next-auth/react";

export default function TelegramLogin() {
  return (
    <div className="flex justify-center">
      <LoginButton
        botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}
        onAuthCallback={async (data) => {
          await signIn("telegram", {
            telegramData: JSON.stringify(data),
            callbackUrl: "/dashboard",
          });
        }}
      />
    </div>
  );
}
