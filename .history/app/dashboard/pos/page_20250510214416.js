import { getProduct } from "@/actions/prodoucts";
import { auth } from "@/auth";
import PosCard from "@/components/PosCard";


const posPage = async () => {
  const session = await auth();

  const {products} = JSON.parse(JSON.stringify(await getProduct()));

  return (
    <div className="flex gap-2 max-sm:flex-col">
   <PosCard />
    </div>
  );
};

export default posPage;
