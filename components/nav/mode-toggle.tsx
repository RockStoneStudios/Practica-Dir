'use client';
import React, { useEffect, useState } from 'react'
import {Moon,Sun} from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';



export default function ModeToggle(){
    //state
    const [mounted,setMounted] = useState(false);
    const {theme,setTheme} = useTheme();

    useEffect(()=>{
      setMounted(true);
    },[]);

    if(!mounted) return null;
    return (
       
     <Button className='mr-2' variant="link" size="icon" onClick={()=> setTheme(theme === "dark" ?  "llight" : "dark")}>
        {theme === 'dark' ? <Sun size={19} /> : <Moon size={19}/>}
     </Button>
   
    )

}