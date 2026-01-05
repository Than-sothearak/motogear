"use client"
import { signIn } from '@/auth';
import { LoginButton } from '@telegram-auth/react';
import React from 'react'

const telegramPage = () => {

    
    return (
        <div>telegramPage
            <LoginButton
                botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME}
                onAuthCallback={(data) => {
                    signIn("telegram-login", { callbackUrl: "/" }, data);
                }}
                buttonSize="large" // "large" | "medium" | "small"
                cornerRadius={5} // 0 - 20
                showAvatar={true} // true | false
                lang="en"
            />
        </div>
    )
}

export default telegramPage