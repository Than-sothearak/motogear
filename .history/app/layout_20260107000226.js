import { Playfair, Roboto } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
export const dynamic = 'force-dynamic'

import { Geist } from 'next/font/google'

const BalapDemoRegular = localFont({
  src: './fonts/BalapDemoRegular',
})
const playfair = Playfair({
   weight: '800',
  subsets: ['latin'],
})
const geist = Geist({
  weight: '400',
  subsets: ['latin'],
})
 

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Next admin template",
  description: "Next admin template",
  icons: {
    icon: "/favicon.ico",                     // default
    apple: "/apple-touch-icon.png",
    android: "/android-chrome-192x192"
  },

};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};



export default function RootLayout({ children }) {
  return (

    <html lang="en" className={`${roboto.className} ${BalapDemoRegular.className} antialiased bg-primary`}>
      <body
      >
        {children}
      </body>
    </html>

  );
}
