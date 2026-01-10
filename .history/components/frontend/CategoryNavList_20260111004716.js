// "use client"
// import Link from 'next/link'
// import React, { useState } from 'react'

// export const CategoryNavList = ({categories}) => {

//         const [activeMenu, setActiveMenu] = useState(null);
//      const [isOpen, setIsOpen] = useState(false);

//   function handleClick() {
//     setIsOpen((prev) => !prev);
//   }

//     return (
//         <nav className="flex gap-8 h-full max-lg:hidden max-lg:order-3">
//             {Object.keys(categories).map((item) => (
//                 <div
//                     key={item}
//                     className="uppercase h-14 flex items-center hover:border-b-black hover:border-b  hover:cursor-pointer"
//                     onMouseEnter={() => setActiveMenu(item)}
//                     onMouseLeave={() => setActiveMenu(null)}
//                 >
//                     <Link href={`/categories/${item.toLowerCase()}`}>{item}</Link>
//                     {/* DROPDOWN */}
//                     {activeMenu === item && (
//                         <div className="absolute left-0 top-full w-full  " onMouseEnter={() => setActiveMenu(item)}
//                             onMouseLeave={() => setActiveMenu(null)}>
//                             <div className="bg-primary shadow-xl px-4">
//                                 <ul className="flex gap-4 justify-center">
//                                     {categories[item].map(({ name, slug }) => (
//                                         <Link
//                                             href={`/categories/${item.toLowerCase()}?cat=${slug}`}
//                                             key={name}
//                                             className="flex flex-col items-center gap-3 px-6 py-6 cursor-pointer hover:bg-tertiary/80
//                           hover:text-primary  transition text-primarytext"
//                                         >

//                                             <span>{name}</span>
//                                         </Link>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </nav>
//     )
// }

// export default CategoryNavList;