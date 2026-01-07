"use client";

import { myFont } from "@/lib/myFont";
import React from "react";

const HeroVideo = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/offroad.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 🔥 Fixed Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div>
          <h1 className={`text-8xl text-white mb-4 ${myFont.className}`}>
            Conquer Every Terrain
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Premium Off-Road Motorcycle Gear
          </p>
          <button className="bg-tertiary hover:bg-tertiary/80 px-4 py-1 rounded-full text-2xl text-primary font-semibold uppercase">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
