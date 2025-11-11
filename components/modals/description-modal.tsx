import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useBusiness } from "@/context/business";
import { Brain, Loader2Icon, Send } from "lucide-react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(()=> import('react-quill'),{ssr : false});
import 'react-quill/dist/quill.snow.css';

const DescriptionModal = () => {
  const {openDescriptionModal,setOpenDescriptionModal,business,setBusiness,generateBusinessDescription,generateDescriptionLoading} = useBusiness();

  return (
    <Dialog open={openDescriptionModal} onOpenChange={setOpenDescriptionModal}>
      <DialogContent className="md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Descripcion del Negocio</DialogTitle>
          <DialogDescription>
           Hacer cambios en la descripcion de tu negocio aqui
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <ReactQuill 
            theme="snow" 
            onChange={e => setBusiness({...business,description: e})}
            value={business.description}
            />
        </div>
        <DialogFooter>
          
              <div className='flex justify-between items-center w-full'>
                   <Button 
                   variant="destructive"
                      onClick={generateBusinessDescription} 
                      type='submit'
                      className='my-5 '
                      disabled = {
                         !business?.name || 
                         !business?.category ||
                          generateDescriptionLoading
                         }
                      >
                     {generateDescriptionLoading? <Loader2Icon className='animate-spin mr-2'/> : <Brain className='mr-2'/>} Generar Descripcion
                    </Button>
                    <Button 
                     type="submit"
                     className="my-5"
                     onClick={()=> setOpenDescriptionModal(false)}
                     disabled={
                      !business?.name ||
                      !business?.category ||
                      !business?.address ||
                       generateDescriptionLoading
                     }
                     >
                      Cerrar
                    </Button>
                  
                   </div>
                  
                 
                
        </DialogFooter>
      </DialogContent>
    </Dialog>


  )
  
}

export default DescriptionModal;