
'use client';
import { BusinessState } from "@/utils/types/business";
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin,Phone,Mail,Globe,Clock,ShieldCheck, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useBusiness } from "@/context/business";
import DescriptionModal from "@/components/modals/description-modal";
import { useUser } from "@clerk/nextjs";


const PreviewCard= ({business}: {business : BusinessState}) => {
 
  const {openDescriptionModal,setOpenDescriptionModal,isEditPage,loading,isDashboardPage, togglePublished,deleteBusiness} = useBusiness();

  const {user} = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <Card className="w-full max-w-2xl mx-auto" style={{height : "354px"}}>
       <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <div className="w-16 h-16 relative overflow-hidden rounded-md">
             {
                business?.logo ? (
                    <Image
                      src={business?.logo}
                      alt={business?.name}
                      layout="fill"
                      objectFit="cover"
                    />
                ) : 
                 (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No logo</span>
                    </div>
                 )
             }
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-1">
               {business?.name || "Nombre Negocio"} 
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-1">
                {business?.category || "Categoria"} 
            </p>
          </div>
       </CardHeader>
       <CardContent>

     
         <DescriptionModal />

        <div
         onClick={()=> !isDashboardPage && setOpenDescriptionModal(!openDescriptionModal)}
         className="text-sm mb-4 line-clamp-3">
        {business?.description ? (
            <div dangerouslySetInnerHTML={{ __html: business.description }} />
            ) : (
            "AI powered business description goes here..."
            )}

        </div>
         <div className="space-y-2">
            <InfoItem icon={MapPin} text={business?.address || "Direccion"} />
            <InfoItem icon={Phone} text={business?.phone || "Numero telefonico"}/>
            <InfoItem icon={Mail} text={business?.email || "Email"} />
            <InfoItem icon={Globe} text={business?.website || "Website"} />
            <InfoItem icon={Clock} text={business?.hours || "Abierto - Cerrado"} />
            
        </div>
         
          <div className="flex justify-end items-center space-x-2 text-xs text-gray-500">
             <div onClick={isEditPage ? togglePublished : undefined} className="flex cursor-pointer">
                  {loading && <Loader2Icon size={14}  className="animate-spin mr-1"/>}
                  {business?.published ? <span className="text-green-500">Publicado </span> : <span className="text-red-600"> No Publicado </span> }
             </div>

             {isAdmin && (
               <div onClick={()=> {
                 const answer = confirm("Estas seguro que quieres borrarlo!");
                 if(answer){
                  deleteBusiness();
                 }
               }} className="flex cursor-pointer">

               {loading && <Loader2Icon size={14} className="animated-spin mr-1"/>}  <span className="text-red-500">Borrar</span>
           
               </div>
             )}
          </div>

         
       </CardContent>
         
      
    </Card>
  )
}

        function InfoItem({ icon: Icon, text }: { icon: any, text: string }) {
            return (
                <div className="flex items-center text-sm">
                    <Icon className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0"/>
                    <span className="line-clamp-1">{text}</span>
                </div>
            );
        }

export default PreviewCard;