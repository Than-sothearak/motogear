"use client"
import { signIn } from '@/auth';
import { LoginButton } from '@telegram-auth/react';
import React from 'react'

const telegramPage = () => {

    
    return (
        <div>telegramPage
{process.env.TELEGRAM_BOT_USERNAM}
            <LoginButton
                botUsername={process.env.TELEGRAM_BOT_USERNAM}
                onAuthCallback={() => {
                    signIn("telegram-login", { callbackUrl: "/" });
                }}
            />
        </div>
    )
}

export default telegramPage