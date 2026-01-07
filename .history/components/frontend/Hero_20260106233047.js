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
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const slideCount = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Reset logic (the magic ✨)
  useEffect(() => {
    if (index === slideCount) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 1000); // match transition duration
    } else {
      setAnimate(true);
    }
  }, [index, slideCount]);

  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className={`flex h-full ${
          animate ? "transition-transform duration-1000 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {/* Original slides + FIRST slide duplicated */}
        {[...slides, slides[0]].map((slide, i) => (
          <div key={i} className="relative min-w-full h-screen">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  {slide.subtitle}
                </p>
                <button className="bg-tertiary hover:tertiary/80 px-8 py-4 text-primary font-semibold uppercase rounded-md">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;