"use client"
import { signIn } from '@/auth';
import { LoginButton } from '@telegram-auth/react';
import React from 'react'

const telegramPage = () => {

    
    return (
        <div>telegramPage
{process.env.PUBLIC_TELEGRAM_BOT_USERNAME}
            <LoginButton
                botUsername={process.env.NEXT_TELEGRAM_BOT_USERNAME}
                onAuthCallback={() => {
                    signIn("telegram-login", { callbackUrl: "/" });
                }}
            />
        </div>
    )
}

export default telegramPage