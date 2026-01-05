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
			botUsername={botUsername}
			onAuthCallback={(data) => {
				signIn("telegram-login", { callbackUrl: "/" });
			}}
		/>
    </Suspense>
  );
}
