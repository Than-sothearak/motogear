import Image from "next/image";

// components/home/Categories.jsx
const categories = ["Helmets", "Apparel", "Gloves", "Accessories", "Tires"];

export default function Categories() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Shop Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 container mx-auto transition-all duration-500 ease-in-out">
        {categories.map((cat) => (
  <div
    key={cat}
    // 1. Added 'group' and 'overflow-hidden'
    className="group relative h-80 transition cursor-pointer overflow-hidden rounded-lg"
  >
    <Image 
      fill
      alt={cat}
      src={`https://images.unsplash.com/photo-1660337294765-2a20770826aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} 
      // 2. Added 'group-hover:scale-110' and transition classes
      className="object-center object-cover z-0 transition-transform duration-500 group-hover:scale-110"
    />
    
    {/* Optional: Dark overlay to make text pop on hover */}
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20 
      font-bold text-2xl transition-transform duration-500 
      /* 3. Added 'group-hover:scale-125' to make text bigger */
      group-hover:scale-125">
      {cat}
    </h1>
  </div>
))}
      </div>
    </section>
  );
}
