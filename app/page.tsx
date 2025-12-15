"use client";

import { link } from "fs";
import Image from "next/image";
import { eventNames } from "process";
import React, { useState, useEffect } from "react";
import QRCodeComponent from "@/components/QRCodeComponent";
import { copytoClipboard } from "../utils/copytoClipboard"



export default function Home() {

  const [fileinput, setFileinput] = useState<File[]>([])
  const [textinput, setTextinput] = useState("")
  const [linktofile, setLinktofile] = useState("")
  const [filepathvalue, setFilepathvalue] = useState("")
  const [inputtype, setInputtype] = useState("file")

  useEffect(() => {
    console.log("link", linktofile);
  }, [linktofile]);
  useEffect(() => {
    console.log("path", filepathvalue);
  }, [filepathvalue]);

  const changeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let files = []

    const fileinput = Array.from(e.target.files || [])
    if (fileinput) {
      setFileinput(fileinput)
    }
    console.log(fileinput.map(f => f.name))
    // fetchData()

  }

  const changeTextinput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setTextinput(content)
    console.log({ text: textinput })
  }


  async function PushContent() {
    if (inputtype === "file" && fileinput.length >= 1) {
      if (!fileinput) {
        console.log("No file selected");
        return;
      }
      const formData = new FormData();
      formData.append("type", "file")
      fileinput.forEach((file) =>
        formData.append("files", file))

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (data.sucess == true) {
        setLinktofile(data.link)
      }
    }
    else if (inputtype === "text") {
      const formData = new FormData()
      formData.append("textinput", textinput)
      formData.append("type", "text")
      const res = await fetch('api/upload', {
        method: "POST",
        body: formData
      })

      const data = await res.json()
      if (data.sucess == true) {
        setLinktofile(data.link)
      }

    }
    return;
  }

  const changeTypeInput = () => {
    if (inputtype == "text") {
      setInputtype("file")
    }
    else {
      setInputtype("text")
    }
  }


  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <div><button className="text-white bg-black rounded-lg" onClick={changeTypeInput}>Change type</button> </div>
        {inputtype === "text" && (
          <div>
            <textarea className="w-200 h-50 border text-black px-2 py-2" onChange={changeTextinput}></textarea>
          </div>
        )
        }
        {inputtype === "file" && (
          <div>
            <input type="file" required multiple className="border border-black text-black" onChange={changeFileInput} /> {/*Ici pas de () a la focntion donc c est uen reference a la focntion */}
          </div>
        )
        }


        <button className="border bg-black rounded w-40 h-20 text-white text-lg" onClick={PushContent}>Upload</button> {/* Ici pareil */}
        <p className="text-black text-lg">{fileinput.map(f => f.name)}</p>
        {linktofile && (
          <div><p className="text-black text-lg"><br />Link to send : http://localhost:3000/f/{linktofile}</p>
            <QRCodeComponent text={"http://localhost:3000/f/" + linktofile} />
            <button className="text-white bg-black rounded-lg w-30 h-20" onClick={() => copytoClipboard("http://localhost:3000/f/" + linktofile)}>Copier</button> {/* Ici on fait une focntion flechee pour que elle soit execute au click , elle reagit au changememtnd e la varable linktofile*/}
          </div>

        )}


      </div>
    </>
  );
}
