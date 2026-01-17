"use client"
import { LoginButton } from '@telegram-auth/react';
import React, { useActionState, useRef } from 'react'
import { authenticate } from '@/lib/actions';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

function LoginButton() {
  const formRef = useRef(null); // Reference to the form

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  if (isPending) {
    return <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  }
  return (
    <form
      ref={formRef}
      action={formAction}
      className='flex flex-col items-center gap-2 justify-center'
    >
      <p>Or login with</p>

      <button
        type='submit'
        name='action'
        value="google"
        onClick={() => signIn("google")}
        className="w-full border flex items-center justify-center gap-2 py-2 rounded mb-2"
      >
        <FaGoogle /> Continue with Google
      </button>


      {/* 1. Hidden input to hold the Telegram JSON */}
      <input type="hidden" name="action" id="telegramDataInput" />
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
    </form>
  )
}

export default LoginButton;