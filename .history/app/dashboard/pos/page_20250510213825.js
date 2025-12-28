import { getProduct } from "@/actions/prodoucts";
import { auth } from "@/auth";
import SearchComponent from "@/components/SearchComponent";
import Image from "next/image";

const posPage = async () => {
  const session = await auth();

  const {products} = JSON.parse(JSON.stringify(await getProduct()));

  return (
    <div className="flex gap-2 max-sm:flex-col">
      <div className="w-full p-4 bg-primary mt-4 rounded-lg">
        <button className="p-4 bg-red-500 fixed w-96right-0 left-0">Order list</button>
      <div className="flex justify-between items-center mb-4">
        <h1 className="max-xl:w-full max-md:text-sm text-xl font-bold text-primarytext">Point of Sale</h1>
        <SearchComponent
          placeHolder="Search product..."
          linkPage="/dashboard/pos"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between border"
          >
            <div className="flex flex-col items-center">
           
              {product?.imageUrls?.[0] ? <Image
              width={500}
              height={500}
                src={product?.imageUrls[0]}
                alt={product.productName}
                className="w-24 h-24 object-cover mb-2"
              />:  <Image
              width={500}
              height={500}
                src={'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                alt={product.productName}
                className="w-24 h-24 object-cover mb-2"
              />}
            
              <h2 className="text-sm text-center font-semibold truncate w-full max-w-[200px]">
                {product.productName}
              </h2> 
              <p className="text-gray-600 text-sm font-bold text-center">Price: ${product.price}</p>
              <p className="text-gray-600 text-sm text-center">Stock: {product.stock}</p>
            </div>

            <button className="mt-3 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-800">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    <div className="w-1/2 max-lg:w-full p-4 bg-primary mt-4 rounded-lg">
    <h1 className="text-xl font-bold text-primarytext">Order list</h1>
    </div>
    </div>
  );
};

export default posPage;
