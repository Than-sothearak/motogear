"use client";

import { myFont } from "@/lib/myFont";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ButtonShopNow from "./ButtonShopNow";

const slides = [
  {
    image: "/images/m-12.png",
    title: "Conquer Every Terrain",
    subtitle: "Premium Off-Road Motorcycle Gear",
  },
  {
    image: "/images/m-11.png",
    title: "Ride Beyond Limits",
    subtitle: "Built for Adventure & Dirt Trails",
  },
  {
    image: "/images/m-12.png",
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
    <section className="relative h-full overflow-hidden">
     {/* 🔥 FIXED OVERLAY (NOT SLIDING) */}
<div className="absolute inset-0 flex items-center justify-center text-center px-4">
  <div>
    {/* h1 Behind Image */}
    <h1 className={`lg:text-8xl text-4xl font-extrabold text-primarytext mb-4 uppercase z-0 absolute top-16 right-0 w-full ${myFont.className}`}>
      {slides[0].title}
    </h1>

    {/* Subtitle + Button On Top */}
  <div className="absolute w-full right-0 bottom-10">
      <p className="text-lg md:text-xl text-primarytext mb-8 relative z-20">
      {slides[0].subtitle}
    </p>
    <div className="relative z-20">
      <ButtonShopNow link='categories/motobike'title='buy now'/>
    </div>
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
        className="z-10 object-scale-down object-center"
        priority={i === 0}
      />

    </div>
  ))}
</div>

    </section>
  );
};

export default Hero;