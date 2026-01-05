"use client"
import { signIn } from '@/auth';
import { authenticate } from '@/lib/actions';
import { LoginButton } from '@telegram-auth/react';
import React, { useActionState } from 'react'

function TelegramAuthButton({useSearchParams}) {
      const searchParams = useSearchParams();
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
      const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
      );
  return (
     <form action={formAction} className='flex flex-col items-center gap-2 justify-center'>
          <p>Or login with</p>
          <LoginButton
            botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}
            onAuthCallback={async (data) => {
            signIn("telegram-login", {
                telegramData: JSON.stringify(data),
                callbackUrl: "/dashboard",
              });
            }}

          />
        </form>
  )
}

export default TelegramAuthButton