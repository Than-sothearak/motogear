import { mongoDb } from "@/utils/connectDB";
import mongoose from "mongoose";
import { Category } from "@/models/Categories";
import CategoryForm from "@/components/CategoryForm";
import { getCategories } from "@/actions/categories";
await mongoDb();

export default async function SingleCategoryPage(props) {
  const params = await props.params;
  const id = await params.id;

  await new Promise((resolve) => setTimeout(resolve, 1000));
 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <p className="text-red-500">Invalid Category ID!</p>;
  }
  const fecthCategories = await getCategories();
  const categories = JSON.parse(JSON.stringify(fecthCategories))
  const category = await Category.findOne({_id: id}).lean();

  if (!category) {
    return <p className="text-red-500">Category not found!</p>;
  }

  return (
    <div className="p-4 bg-primary rounded-md mt-4">
      <CategoryForm categories={categories} catId={id} catData={JSON.parse(JSON.stringify(category))} />
    </div>
  );
}
