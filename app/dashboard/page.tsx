'use client';
import { useBusiness } from "@/context/business";
import PreviewCard from "@/components/nav/business/preview/preview-card";
import  Link  from 'next/link';
import SkeletonCard from "@/components/cards/skeleton-card";

const Dashboard = () => {
  const {businesses} = useBusiness();

  if(!businesses?.length){
    return(
       <div>
         <p className="text-center my-5">Loading ...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
          </div>
       </div>
    )
  }

  return (
    <div className='p-10'>
        <h1 className='text-2xl font-bold mb-5 text-center'>Dashboard</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            businesses.map((business,index)=>(
              <Link key={index} href={`/dashboard/business/edit/${business._id}`}>
                 <div className="transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                   <PreviewCard business={business} />
                  </div>
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export default Dashboard