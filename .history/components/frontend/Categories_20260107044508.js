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
            className="relative min-w-full h-screen transition cursor-pointer"
          >
            <Image 
           fill
            alt="image"
            src={`https://images.unsplash.com/photo-1660337294765-2a20770826aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/`} className="object-center object-contain z-10"/>
           
          </div>
        ))}
      </div>
    </section>
  );
}
