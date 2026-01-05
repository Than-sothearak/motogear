'use client';

import LoginForm from '@/components/auth/LoginForm';
import { LoginButton } from '@telegram-auth/react';
import { signIn } from 'next-auth/react';
import React, { Suspense } from 'react';


export default function LoginPage() {
  return (
  
      <Suspense fallback={<div>Loading login page...</div>}>
      <LoginForm />

    </Suspense>

  );
}
