"use client";

import { BusinessState } from "@/utils/types/business";
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const ReactQuill = dynamic(()=> import("react-quill"),{ssr : false})
import "react-quill/dist/quill.bubble.css";


interface DescriptionCardProps {
 description: string;
}

export const DescriptionCard = ({ description }:
DescriptionCardProps) => {
   const [mounted,setMounted] = useState(false);

    useEffect(()=>{
      setMounted(true);
    },[]);

    if(!mounted){
      return(
          <div
        
            className="text-sm mb-4 ">
            {description && (
                <div dangerouslySetInnerHTML={{ __html:description }} />
              )}
        </div>
      )
    }
  return (
      <div className="m-5 mb-10">
        <ReactQuill 
          value={description || ""}
        //   readOnly={true}
          theme="bubble"
         
        />

      </div>
  );
}

// {
//  business?.description && (
//  <DescriptionCard description={business?.description} excerpt={excerpt}
// />
//  );
// }

