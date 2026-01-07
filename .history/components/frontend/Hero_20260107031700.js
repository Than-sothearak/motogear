"use client";

import { myFont } from "@/lib/myFont";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/m-11.png",
    title: "Conquer Every Terrain",
    subtitle: "Premium Off-Road Motorcycle Gear",
  },
  {
    image: "/images/m-11.png",
    title: "Ride Beyond Limits",
    subtitle: "Built for Adventure & Dirt Trails",
  },
  {
    image: "/images/m-11.png",
    title: "Born for Off-Road",
    subtitle: "Gear Up. Ride Hard.",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const slideCount = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === slideCount) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 1000);
    } else {
      setAnimate(true);
    }
  }, [index, slideCount]);

  return (
    <section className="relative h-screen overflow-hidden">
     {/* 🔥 FIXED OVERLAY (NOT SLIDING) */}
<div className="absolute inset-0 flex items-center justify-center text-center px-4">
  <div>
    {/* h1 Behind Image */}
    <h1 className={`text-8xl font-extrabold text-primarytext mb-4 uppercase z-0 absolute top-16 right-0 w-full ${myFont.className}`}>
      {slides[0].title}
    </h1>

    {/* Subtitle + Button On Top */}
  <div className="absolute w-full right-0 bottom-10">
      <p className="text-lg md:text-xl text-primarytext mb-8 relative z-20">
      {slides[0].subtitle}
    </p>
    <button className="bg-tertiary hover:bg-tertiary/80 px-4 py-1 rounded-full text-2xl text-primary font-semibold uppercase hover:cursor-pointer relative z-20">
      Shop Now
    </button>
  </div>
  </div>
</div>

{/* SLIDER */}
<div
  className={`flex h-full ${animate ? "transition-transform duration-1000 ease-in-out" : ""}`}
  style={{
    transform: `translateX(-${index * 100}%)`,
  }}
>
  {[...slides, slides[0]].map((slide, i) => (
    <div key={i} className="relative min-w-full h-screen">
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="z-10 object-fill object-center"
        priority={i === 0}
      />
      {/* <div className="absolute inset-0 bg-black/50 z-20" /> */}
    </div>
  ))}
</div>

    </section>
  );
};

export default Hero;