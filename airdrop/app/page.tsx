"use client"; // <--- Add this line

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [fileinput,setFileinput] = useState('')
  const [linktofile, setLinktofile] = useState('')
  // function chargeFile()
  

  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <input type="file"  className="border border-black text-black" onChange={e => setFileinput(e.target.value)}/>

      <button className="border bg-black rounded w-40 h-20 text-white text-lg "    >Upload</button>
      <p className="text-black text-lg">{fileinput}</p>
    </div>
    </>
  );  
}
