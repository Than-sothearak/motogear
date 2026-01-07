import localFont from "next/font/local";

export const myFont = localFont({
  src: [
    {
      path: '../public/fonts/BalapDemoRegular.ttf',
      weight: '900',
      size: '100',
      style: 'normal',
    },

  ],
})