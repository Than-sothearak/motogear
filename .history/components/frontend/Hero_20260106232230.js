"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const slides = [
  {
    image: "/image-1.jpg",
    title: "Conquer Every Terrain",
    subtitle: "Premium Off-Road Motorcycle Gear",
  },
  {
    image: "/image-2.jpg",
    title: "Ride Beyond Limits",
    subtitle: "Built for Adventure & Dirt Trails",
  },
  {
    image: "/image-3.jpg",
    title: "Born for Off-Road",
    subtitle: "Gear Up. Ride Hard.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {slides[current].subtitle}
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 transition px-8 py-4 text-white font-semibold uppercase tracking-wide rounded-md">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
