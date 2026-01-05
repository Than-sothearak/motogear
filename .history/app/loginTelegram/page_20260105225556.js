"use client"
import { signIn } from '@/auth';
import { LoginButton } from '@telegram-auth/react';
import React from 'react'

const telegramPage = () => {
    return (
        <div>telegramPage

            <LoginButton
                botUsername={"wbc_notifications_bot"}
                onAuthCallback={() => {
                    signIn("telegram-login", { callbackUrl: "/" });
                }}
            />
        </div>
    )
}

export default telegramPage