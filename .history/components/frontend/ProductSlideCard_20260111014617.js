"use client";
import { useRef } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductSlideCard({ category }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const cardWidth = scrollRef.current.children[0].offsetWidth + 24; // 24 = gap-6 in Tailwind
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className=" bg-primary">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-black">{category.name}</h2>
          <Link
            href={`categories/${category.slug}`}
            className="text-sm font-semibold uppercase hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Scrollable Products */}
        <div
          ref={scrollRef} // ✅ ref on scrollable container
          className="overflow-x-auto flex gap-6 scroll-smooth no-scrollbar pb-4"
        >
          {category.products &&
            category.products.map((item) => <ProductCard key={item._id} {...item} />)}
        </div>

        {/* Buttons Below Products */}
      {category.products.length > 5 && 
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={() => scroll("left")}
            className="rounded  transition"
          >
            <MdArrowBack size={28} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded   transition"
          >
            <MdArrowForward size={28} />
          </button>
        </div>}
      </div>
    </section>
  );
}
