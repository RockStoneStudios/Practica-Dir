"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {Input} from '@/components/ui/input';
import Link from "next/link";

interface FilteredListProps{
    icon : ReactNode;
    title : string;
    data : string[];
}

export default function FilteredList({icon : Icon,title,data} : FilteredListProps){
   const [searchTerm,setSearchTerm] = useState("");

   const filteredData = data.filter((item)=> item.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return (
    <div>
         <div className="flex justify-between">
             <h2 className="flex items-center text-lg mb-4">{Icon} 
            <span className="ml-1">
              {title}    
            </span>
            </h2>
            <input type="search" placeholder={`Filtrar ${title.toLowerCase()}...`} 
             className="mb-4 p-2 border-0 bg-transparent focus:outline-none"
             value={searchTerm}
             onChange={(e)=> setSearchTerm(e.target.value)}
            />
         </div>

          <div className="max-h-60 overflow-y-auto flex flex-wrap gap-2">
                 {filteredData.length > 0 ? (
                    filteredData.map((item,index)=>(
                       <Link
                            href={`/search?query=${encodeURIComponent(String(item))}`}
                            key={index}
                            >
                            <Button variant="secondary" size="sm">
                            {item}
                            </Button>
                        </Link>
                    ))

                 ) : <p>No hay Resultados</p>}
          </div>
    </div>
  )
}
