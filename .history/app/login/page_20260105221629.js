'use client';

import { signIn } from '@/auth';
import LoginForm from '@/components/auth/LoginForm';
import { LoginButton } from '@telegram-auth/react';
import React, { Suspense } from 'react';


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginForm />
      <LoginButton
        botUsername={process.env.BOT_USERNAME}
       onAuthCallback={(data) => {
				signIn("telegram-login", { callbackUrl: "/" });
			}}
        buttonSize="large" // "large" | "medium" | "small"
        cornerRadius={5} // 0 - 20
        showAvatar={true} // true | false
        lang="en"
      />
    </Suspense>
  );
}
