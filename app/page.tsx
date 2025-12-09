"use client";

import { link } from "fs";
import Image from "next/image";
import { eventNames } from "process";
import React, { useState, useEffect } from "react";
import QRCodeComponent from "@/components/QRCodeComponent";
import {copytoClipboard} from "../utils/copytoClipboard"



export default function Home() {

  const [fileinput, setFileinput] = useState<File | null>(null)
  const [linktofile, setLinktofile] = useState("")
  const [filepathvalue, setFilepathvalue] = useState("")


  // const fetchData = async () => {
  //   const res = await fetch("api/get")
  //   const data = await res.json();
  //   console.log(data)
  // };

  useEffect(() => {
    console.log("link", linktofile);
  }, [linktofile]);
  useEffect(() => {
    console.log("path", filepathvalue);
  }, [filepathvalue]);

  const changeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let files = []

    let fileinput = e.target.files?.[0]
    if (fileinput) {
      setFileinput(fileinput)
    }
    console.log(fileinput?.name)
    // fetchData()

  }


  async function PushFiles() {
    if (!fileinput) {
      console.log("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", fileinput);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    const link = data.link;
    setLinktofile(link)
    return ;
  }



  
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        
        <input type="file" className="border border-black text-black" onChange={changeFileInput} /> {/*Ici pas de () a la focntion donc c est uen reference a la focntion */}

        <button className="border bg-black rounded w-40 h-20 text-white text-lg" onClick={PushFiles}>Upload</button> {/* Ici pareil */}
        <p className="text-black text-lg">{fileinput?.name}</p>
        { linktofile && (
          <div><p className="text-black text-lg"><br/>Link to send : https://site.com/f/{linktofile}</p>
          <QRCodeComponent text={"https://site.com/f/" + linktofile} />
          <button className="text-white bg-black rounded-lg w-30 h-20" onClick={() => copytoClipboard("http://localhost:3000/f/" + linktofile)}>Copier</button> {/* Ici on fait une focntion flechee pour que elle soit execute au click , elle reagit au changememtnd e la varable linktofile*/}
          </div>
          
        )}
        
          
      </div>
    </>
  );
}
