import { Roboto } from "next/font/google";
import "./globals.css";
export const dynamic = 'force-dynamic'

const geistSans = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});



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

      <html lang="en">
        <body
          className={`${geistSans.variable} antialiased bg-primary`}
        >
          {children}
        </body>
      </html>
  
  );
}
