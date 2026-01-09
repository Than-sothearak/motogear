import { getCategories } from "@/actions/categories";
import { auth } from "@/auth";
import Footer from "@/components/frontend/Footer";
import Navbar from "@/components/frontend/Navbar";

export default async function Layout({ children }) {

    const session = await auth();
  if (!session) {

  }
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
    <>
      <Navbar session={session} categories={JSON.parse(JSON.stringify(menuData))} />
      <main>{children}</main>
       <Footer session={session} />
    </>
  )
}