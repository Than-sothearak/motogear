import Link from "next/link";
import React from "react";

const ButtonShopNow = ({ link, title }) => {
  return (
    <div className="z-20 container m-auto px-4 py-8 flex justify-center">
      <Link
        href={`/${link}`}
        className="
          bg-black
          px-6 py-2
          rounded-full
          text-3xl
          text-primary
          font-semibold
          uppercase
          transition-all
          duration-300
          ease-out
          hover:scale-105
          hover:bg-black/70
          active:scale-95
          shadow-lg
          hover:shadow-2xl
        "
      >
        {title}
      </Link>
    </div>
  );
};

export default ButtonShopNow;
