"use client"; // Must be client component

import { LoginButton } from "@telegram-auth/react";
import { signIn } from "next-auth/react";

export default function TelegramLogin() {
  return (
    <div className="flex justify-center">
      <LoginButton
        botUsername={'sdsd'}
        onAuthCallback={async (user) => {
          await signIn("telegram", {
            telegramData: JSON.stringify(user),
            callbackUrl: "/dashboard",
          });
        }}
      />
    </div>
  );
}
