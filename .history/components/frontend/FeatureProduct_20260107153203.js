"use client";
import { useRef } from "react";

export default function FeaturedProducts() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <a
            href="/shop"
            className="text-sm font-semibold uppercase hover:underline"
          >
            View All
          </a>
        </div>

        {/* Scroll buttons + scrollable container */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded z-10"
          >
            ◀
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef} // ✅ attach ref ONLY here
            className="overflow-x-auto flex gap-6 scroll-smooth no-scrollbar"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div
                key={item}
                className="min-w-[260px] flex-shrink-0 rounded-md hover:shadow-lg transition"
              >
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-300" />
                  <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 uppercase">
                    New
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:underline">
                    Pro Off-Road Helmet
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Helmets</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold">$249</span>
                    <button className="text-sm font-semibold uppercase hover:underline">
                      Shop
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded z-10"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
