"use client"
import { LoginButton } from '@telegram-auth/react';
import React, { useActionState, useRef } from 'react'
import { authenticate } from '@/lib/actions';

function TelegramAuthButton() {
  const formRef = useRef(null); // Reference to the form

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
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