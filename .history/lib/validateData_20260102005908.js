export const validatedData = () => {
    const newErrors = {};

  if (!formData.brandName.trim()) newErrors.brandName = "Brand Name is required";
  if (!formData.productName.trim()) newErrors.productName = "Product Name is required";
  if (!formData.slug.trim()) newErrors.slug = "Slug is required";
  if (!formData.category) newErrors.category = "Please select a category";
  if (formData.basePrice <= 0) newErrors.basePrice = "Base Price must be greater than 0";

  // Example: check variant fields
  variantData.variants.forEach((v, idx) => {
    if (!v.size) newErrors[`variant-${idx}-size`] = "Size is required";
    if (!v.color) newErrors[`variant-${idx}-color`] = "Color is required";
  });

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0; // returns true if no errors
}