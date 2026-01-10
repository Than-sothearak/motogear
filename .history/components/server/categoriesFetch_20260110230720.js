import { getCategories } from '@/actions/categories';
import React from 'react'
import { CategoryNavList } from '../frontend/CategoryNavList';

export const CategoriesFetch = async () => {

    const {categories} = await getCategories();
  
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
        {/* <CategoryNavList categories={JSON.parse(JSON.stringify(menuData))}/> */}
    </div>
  )
}
