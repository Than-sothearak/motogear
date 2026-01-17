import LoginForm from '@/components/auth/LoginForm';
import TelegramAuthButton from '@/components/TelegramAuth-button';
import React, { Suspense } from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div>
        <Suspense fallback={<div>Loading login page...</div>}>
      <LoginForm />
    </Suspense>

          <button
          onClick={() => signIn("google")}
          className="w-full border flex items-center justify-center gap-2 py-2 rounded mb-2"
        >
          <FaGoogle /> Continue with Google
        </button>
       <TelegramAuthButton />
    </div>

  );
}
