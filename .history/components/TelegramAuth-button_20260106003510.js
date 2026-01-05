"use client"
import { signIn } from 'next-auth/react'; // Use client-side signIn
import { LoginButton } from '@telegram-auth/react';
import React, { useActionState, useRef } from 'react'

function TelegramAuthButton() {

  const formRef = useRef(null); // Reference to the form

// Change your useActionState function to this:
const [errorMessage, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    const telegramData = formData.get("telegramData");

    if (telegramData) {
      // 1. Log will appear in your SERVER TERMINAL
      console.log("Server received data:", telegramData);

      try {
        // 2. We use the server-side signIn (imported from @/auth)
        // This will trigger your authorize() function in auth.ts
        // await signIn("telegram-login", {
        //   telegramData,
        //   redirectTo: "/dashboard",
        // });
      } catch (error) {
        // If it's a redirect error, we must re-throw it (Next.js internal behavior)
        if (error.type === "NavigationError") throw error;
        return "Authentication failed.";
      }
    }
  },
  undefined
);
  return (
    <form 
      ref={formRef} 
      action={formAction} 
      className='flex flex-col items-center gap-2 justify-center'
    >
      <p>Or login with</p>
      
      {/* 1. Hidden input to hold the Telegram JSON */}
      <input type="hidden" name="telegramData" id="telegramDataInput" />

      <LoginButton
        botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}
        onAuthCallback={async (data) => {
          // 2. When Telegram responds, put data in the hidden input
          const input = document.getElementById("telegramDataInput");
          input.value = JSON.stringify(data);
          
          // 3. Manually request the form to submit via the action
          formRef.current.requestSubmit();
        }}
      />
      
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      {isPending && <p>Logging you in...</p>}
    </form>
  )
}

export default TelegramAuthButton;