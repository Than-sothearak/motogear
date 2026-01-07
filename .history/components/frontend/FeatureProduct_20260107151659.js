export default function FeaturedProducts() {
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
        <div className="flex overflow-x-auto gap-10">
          {[1, 2, 3, 4, 5,6,7,8, 9].map((item) => (
            <div
              key={item}
              className="group w-80 border rounded-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="relative  h-56 bg-gray-100 overflow-hidden">
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
    </section>
  );
}
