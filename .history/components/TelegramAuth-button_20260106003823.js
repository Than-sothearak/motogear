"use client"
import { signIn } from 'next-auth/react'; // Use client-side signIn
import { LoginButton } from '@telegram-auth/react';
import React, { useActionState, useRef } from 'react'

function TelegramAuthButton() {

  const formRef = useRef(null); // Reference to the form

const [errorMessage, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    const telegramData = formData.get("telegramData");
    
    // THIS LOGS TO YOUR VS CODE TERMINAL / CMD
    console.log("2. Server Action received data:", telegramData); 
    
    return prevState;
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
  console.log(data);
}}
      />
      
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      {isPending && <p>Logging you in...</p>}
    </form>
  )
}

export default TelegramAuthButton;