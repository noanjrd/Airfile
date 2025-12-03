"use client"; // <--- Add this line

import Image from "next/image";
import { eventNames } from "process";
import React, { useState } from "react";


export default function Home() {

  const [fileinput, setFileinput] = useState<File | null>(null)
  const [linktofile, setLinktofile] = useState('')
  // function chargeFile()

  // /**
  //  * @param {React.ChangeEvent<HTMLInputElement>} e
  //  */
  const changeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let files = []
    
    let fileinput = e.target.files?.[0]
    if (fileinput)
    {
      setFileinput(fileinput)
    }
    // console.log(file?.name)
    // console.log(file?.size)

  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <input type="file" className="border border-black text-black" onChange={changeFileInput} />

        <button className="border bg-black rounded w-40 h-20 text-white text-lg" >Upload</button>
        <p className="text-black text-lg">{fileinput?.name}</p>
      </div>
    </>
  );
}
