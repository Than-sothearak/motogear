import localFont from "next/font/local";

export const myFont = localFont({
  src: [
    {
      path: '../public/fonts/BalapDemoRegular.ttf',
      weight: '900',
      style: 'normal',
    },

     {
      path: '../public/fonts/HighSwiftPersonalUse.ttf',
      weight: '900',
      style: 'normal',
    },

  ],
})