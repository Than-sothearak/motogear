// components/frontend/CategoriesFetch.js
import { getCategories } from '@/actions/categories';
import React from 'react';
import { CategoryNavList } from '../frontend/CategoryNavList';

export const CategoriesFetch = async () => {
  // fetch categories from DB
  const { categories } = await getCategories();

  // convert Mongoose docs to plain objects
  const plainCategories = categories.map(cat => ({
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    parentCategory: cat.parentCategory?.toString() || null,
    properties: cat.properties,
    createdAt: cat.createdAt?.toISOString(),
    updatedAt: cat.updatedAt?.toISOString(),
  }));

  // Build menuData for dropdown
  const menuData = {};
  plainCategories.forEach(cat => {
    if (!cat.parentCategory) menuData[cat.name] = [];
  });
  plainCategories.forEach(cat => {
    if (cat.parentCategory) {
      const parent = plainCategories.find(p => p._id === cat.parentCategory);
      if (parent) menuData[parent.name].push({
        name: cat.name,
        slug: cat.slug,
      });
    }
  });

  // Pass to Client Component (safe now)
  return <CategoryNavList menuData={menuData} />;
};
