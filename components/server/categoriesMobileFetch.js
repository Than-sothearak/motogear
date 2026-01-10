import { getCategories } from '@/actions/categories';
import React from 'react'
import CategoryNavList from '../frontend/CategoryNavList';
import MobileNavbar from '../frontend/MobileNavbar';

export const CategoriesMobileFetch = async () => {
    const categories = await getCategories();
    const menuData = {};
    categories.forEach((cat) => {
        if (!cat.parentCategory) {
            //Find all Parent category
            menuData[cat.name] = [];
        }
    });

    categories.forEach((cat) => {
        if (cat.parentCategory) {
            // Find parent name
            const parent = categories.find((p) => p._id.toString() === cat.parentCategory.toString());
            if (parent) {
                menuData[parent.name].push({
                    name: cat.name,
                    slug: cat.slug,
                });
            }
        }
    });
  
  return (
    <div>
        <MobileNavbar menuData={JSON.parse(JSON.stringify(menuData))}/>
    </div>
  )
}
