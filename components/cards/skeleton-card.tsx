import { Skeleton } from "../ui/skeleton"

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
       <Skeleton className="h-[175px] w-full rounded-xl"/>
       <div className="space-y-2">
        <Skeleton className="h-4 mx-1 w-[250px]"/>
        <Skeleton className="h-4 mx-1 w-[250px]"/>
        
       </div>
    </div>
  )
};

export default SkeletonCard