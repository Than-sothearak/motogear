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
            src={`https://cdn.pixabay.com/photo/2016/09/17/11/33/quad-1675908_1280.jpg/`} className="object-cover z-10"/>
           
          </div>
        ))}
      </div>
    </section>
  );
}
