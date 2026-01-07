"use client"
import { useRef } from "react";

export default function FeaturedProducts() {

      const scrollRef = useRef(null);

  const scroll = (direction) => {
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
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured Products
          </h2>
          <a
            href="/shop"
            className="text-sm font-semibold uppercase hover:underline"
          >
            View All
          </a>
        </div>

        {/* Products */}
       <div className="overflow-x-auto">
         <div className="flex gap-6  min-w-max">
          {[1, 2, 3, 4, 5,6,7,8, 9].map((item) => (
            <div
              key={item}
              className="group min-w-[260px]  rounded-md hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="relative h-56 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gray-300" />
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 uppercase">
                  New
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold group-hover:underline">
                  Pro Off-Road Helmet
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Helmets
                </p>

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
       </div>

            <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 z-10 bg-white p-2 shadow"
      >
        ◀
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 z-10 bg-white p-2 shadow"
      >
        ▶
      </button>
      </div>
    </section>
  );
}
