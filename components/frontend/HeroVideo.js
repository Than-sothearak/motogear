"use client";

import { myFont } from "@/lib/myFont";
import Link from "next/link";
import React from "react";

const HeroVideo = ({ hero }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={hero.videoUrl}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* 🔥 Fixed Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div>
          <h1
            className={`lg:text-8xl text-4xl text-white mb-4 uppercase  ${myFont.className}`}
          >
            {hero.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {hero.subtitle}
          </p>
          <Link
            href={hero.btnLink}
            className="bg-black hover:bg-black/60 px-4 py-1 rounded-full text-3xl text-primary font-semibold uppercase"
          >
            {hero.btnText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
