import Image from "next/image";

// components/home/Categories.jsx
const categories = ["Helmets", "Apparel", "Gloves", "Accessories", "Tires"];

export default function Categories() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Shop Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 container mx-auto px-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-gray-100 h-40 flex items-center justify-center font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            <Image 
            fill
            alt="image"
            src={`https://pixabay.com/photos/quad-cross-motocross-enduro-atv-1675908/`} className="object-cover z-10"/>
           
          </div>
        ))}
      </div>
    </section>
  );
}
