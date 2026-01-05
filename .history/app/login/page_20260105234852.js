'use client';

import LoginForm from '@/components/auth/LoginForm';
import { LoginButton } from '@telegram-auth/react';
import { signIn } from 'next-auth/react';
import React, { Suspense } from 'react';


export default function LoginPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading login page...</div>}>
      <LoginForm />

    </Suspense>

    <LoginButton
            botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}
            onAuthCallback={async (data) => {
              await signIn("telegram-Id", {
                telegramData: JSON.stringify(data),
                callbackUrl: "/dashboard",
              });
            }}
          />
    </div>
  );
}
