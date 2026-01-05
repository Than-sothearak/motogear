"Use client"
import { signIn } from '@/auth';
import { LoginButton } from '@telegram-auth/react';
import React from 'react'

function TelegramAuthButton() {
  return (
     <div className='flex flex-col items-center gap-2 justify-center'>
          <p>Or login with</p>
          <LoginButton
            botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}
            onAuthCallback={(data) => {
              signIn("telegram-login", {
                telegramData: JSON.stringify(data),
                callbackUrl: "/dashboard",
              });
            }}

          />
        </div>
  )
}

export default TelegramAuthButton