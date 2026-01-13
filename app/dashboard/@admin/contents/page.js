import { auth } from "@/auth";
import { HeroForm } from "@/components/dashboard/content/HeroForm";
import { Content } from "@/models/Content";
import React from "react";

const contentPage = async ({ pageName, searchParams }) => {

  const session = await auth();
  if (!session || !session.user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
      </div>
    );
  }

  const { query } = await searchParams;
  const { status } = await searchParams
  
  const result = await Content.findOne();
  const data = JSON.parse(JSON.stringify(result))
  if (!data) {
    return <div>
      <HeroForm />
    </div>
  }
  return (
   <div>
     <HeroForm data={data.hero} id={data._id}/>
   </div>
  );
};

export default contentPage;
