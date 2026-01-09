import { getAllCategoryBySlug} from '@/actions/categories'
import ProductBox from '@/components/frontend/ProductBox'
import { Product } from '@/models/Product'

const OneCatPage = async ({ params, searchParams }) => {
  const { slug } = params
  const selectedCat = searchParams?.cat || 'all'

  const { parent, childCategories } = await getAllCategoryBySlug(slug)

  if (!parent) {
    return <div>Category not found</div>
  }

  const categoryIds =
    selectedCat === 'all'
      ? [parent._id, ...childCategories.map(c => c._id)]
      : [selectedCat]

  const products = await Product.find({
    category: { $in: categoryIds },
  })
    .populate('category')
    .sort({ createdAt: -1 })
    .lean()

  return (
    <div className="w-full bg-primary">
      <div className="container mx-auto mt-10 space-y-10 px-2">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl uppercase">
            Products: {parent.category}
          </h1>

          {/* FILTER */}
          <form>
            <select
              name="cat"
              defaultValue={selectedCat}
              className="border py-2 px-4"
              onChange={(e) => e.target.form.submit()}
            >
              <option value="all">All</option>
              {childCategories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
          {products.map(item => (
            <ProductBox key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OneCatPage
