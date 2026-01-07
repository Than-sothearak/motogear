import Image from 'next/image'
import React from 'react'

const products = [
  {
    _id: "695a88018839594ba3246b66",
    brandName: "ls2",
    productName: "LS2 Challenger Carbon Full Face Helmet",
    slug: "ls2-challenger-carbon",
    description: "Premium carbon fiber full-face helmet for high-speed riding.",
    basePrice: 420,
    discount: 10,
    imageUrls: [
      "https://images.unsplash.com/photo-1598300053652-04d6c90f0c3c",
      "https://images.unsplash.com/photo-1605719125065-3dd9e3b3f6d4",
      "https://images.unsplash.com/photo-1625231334168-35067f8853ed"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "M", color: "Black", stock: 8, price: 420, sku: "LS2-CH-M-BK" },
      { size: "L", color: "Black", stock: 5, price: 420, sku: "LS2-CH-L-BK" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b67",
    brandName: "shoei",
    productName: "Shoei RF-1400 Full Face Helmet",
    slug: "shoei-rf-1400",
    description: "High-performance road helmet with advanced ventilation.",
    basePrice: 650,
    discount: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      "https://images.unsplash.com/photo-1520975922284-9f8fbb8a6d44"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "M", color: "White", stock: 6, price: 650, sku: "SH-RF-M-WH" },
      { size: "L", color: "White", stock: 4, price: 650, sku: "SH-RF-L-WH" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b68",
    brandName: "agv",
    productName: "AGV K1 S Full Face Helmet",
    slug: "agv-k1-s",
    description: "Sport helmet inspired by MotoGP technology.",
    basePrice: 280,
    discount: 0,
    imageUrls: [
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65",
      "https://images.unsplash.com/photo-1610394213361-0c8baf2c9e2b"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "S", color: "Red", stock: 10, price: 280, sku: "AGV-K1-S-RD" },
      { size: "M", color: "Red", stock: 7, price: 280, sku: "AGV-K1-M-RD" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b69",
    brandName: "arai",
    productName: "Arai RX-7V Racing Helmet",
    slug: "arai-rx-7v",
    description: "Top-tier racing helmet with maximum safety and comfort.",
    basePrice: 780,
    discount: 15,
    imageUrls: [
      "https://images.unsplash.com/photo-1609630875251-80b38cba9f03",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "M", color: "Black", stock: 3, price: 780, sku: "AR-RX-M-BK" },
      { size: "L", color: "Black", stock: 2, price: 780, sku: "AR-RX-L-BK" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b70",
    brandName: "bell",
    productName: "Bell Qualifier DLX MIPS Helmet",
    slug: "bell-qualifier-dlx",
    description: "Affordable helmet with MIPS protection system.",
    basePrice: 240,
    discount: 0,
    imageUrls: [
      "https://images.unsplash.com/photo-1615738123349-5a9b6b2dff7e"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "M", color: "Matte Black", stock: 9, price: 240, sku: "BL-QL-M-MB" },
      { size: "L", color: "Matte Black", stock: 6, price: 240, sku: "BL-QL-L-MB" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b71",
    brandName: "ls2",
    productName: "LS2 Advant X Modular Helmet",
    slug: "ls2-advant-x",
    description: "Modular helmet ideal for touring and city riding.",
    basePrice: 330,
    discount: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a",
      "https://images.unsplash.com/photo-1600788907416-456578634209"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "M", color: "Gray", stock: 5, price: 330, sku: "LS2-AX-M-GR" },
      { size: "L", color: "Gray", stock: 4, price: 330, sku: "LS2-AX-L-GR" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b72",
    brandName: "hjc",
    productName: "HJC i70 Full Face Helmet",
    slug: "hjc-i70",
    description: "Lightweight helmet with modern aggressive design.",
    basePrice: 260,
    discount: 0,
    imageUrls: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
      "https://images.unsplash.com/photo-1601933470096-0e34634ffcde"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "S", color: "Blue", stock: 6, price: 260, sku: "HJC-I70-S-BL" },
      { size: "M", color: "Blue", stock: 5, price: 260, sku: "HJC-I70-M-BL" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b73",
    brandName: "nolan",
    productName: "Nolan N87 Plus Helmet",
    slug: "nolan-n87-plus",
    description: "Comfort-oriented helmet with wide field of vision.",
    basePrice: 310,
    discount: 8,
    imageUrls: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "M", color: "Silver", stock: 4, price: 310, sku: "NL-N87-M-SL" },
      { size: "L", color: "Silver", stock: 3, price: 310, sku: "NL-N87-L-SL" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b74",
    brandName: "mt",
    productName: "MT Thunder 4 SV Helmet",
    slug: "mt-thunder-4",
    description: "Entry-level helmet with sun visor and sporty look.",
    basePrice: 150,
    discount: 0,
    imageUrls: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "M", color: "Black", stock: 12, price: 150, sku: "MT-T4-M-BK" },
      { size: "L", color: "Black", stock: 10, price: 150, sku: "MT-T4-L-BK" }
    ],
    status: "active"
  },
  {
    _id: "695a88018839594ba3246b75",
    brandName: "scorpion",
    productName: "Scorpion EXO-R1 Air Helmet",
    slug: "scorpion-exo-r1",
    description: "Race-ready helmet with AirFit cheek pad system.",
    basePrice: 520,
    discount: 12,
    imageUrls: [
      "https://images.unsplash.com/photo-1600267185393-e158a98703de",
      "https://images.unsplash.com/photo-1625231334168-35067f8853ed"
    ],
    category: "6954ef97d2f965e2125bdda3",
    variants: [
      { size: "M", color: "Carbon", stock: 3, price: 520, sku: "SC-R1-M-CB" },
      { size: "L", color: "Carbon", stock: 2, price: 520, sku: "SC-R1-L-CB" }
    ],
    status: "active"
  }
]

const oneCatPage = async ({ params }) => {
  const { slug } = await params
  return (
    <div className='w-full bg-primary mx-auto h-full flex gap-10 flex-col'>
      <div className='container mx-auto mt-10 space-y-10 bg-primary px-2'>
        <div>
          <h1 className='font-bold text-3xl uppercase'>Products (home page): {slug}</h1>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-14">
          {products.map(item => (
            <div key={item._id} className='space-y-4'>
              <div

                className="relative w-full h-40 sm:h-56 md:h-64 lg:h-96 group transition cursor-pointer overflow-hidden rounded-sm"
              >
                <Image
                  src={item.imageUrls[0]}
                  alt={item.productName}
                  fill
                  className="object-center object-cover z-0 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw,
               (max-width: 1024px) 33vw,
               25vw"
                />

              </div>
              <div className='flex justify-between max-md:flex-wrap gap-2'>
                <div>
                  <p className='text-xs w-full overflow-clip whitespace-pre-wrap '>{item.productName} {item.brandName}</p>
                  <h1 className='font-black text-xl'>${item.basePrice} USD</h1>
                </div>
                <button className='bg-tertiary text-primary px-4 py-2 rounded-sm hover:bg-tertiary/80 whitespace-nowrap'>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default oneCatPage