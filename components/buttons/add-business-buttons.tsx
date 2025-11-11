'use client';
import { MenubarMenu, MenubarTrigger } from '@radix-ui/react-menubar'
import { Plus } from 'lucide-react'
import { useBusiness } from '@/context/business'
import {useRouter} from 'next/navigation';

const AddBusinessButton = () => {
   const {setBusiness,initialState} = useBusiness();
   const router = useRouter();

    const handleClick = () => {
       setBusiness(initialState);
       router.push("/business/add");
    }
  return (
      <MenubarMenu >
            <MenubarTrigger className='text-base font-normal'>
                                 
                <span onClick={handleClick} className='flex items-center cursor-pointer mr-2' >
                <Plus size={16} className='mr-1'/>
                <span className='text-sm'>Agregar </span>
                </span>
                                 
          </MenubarTrigger>
                         
     </MenubarMenu>
  )
}

export default AddBusinessButton