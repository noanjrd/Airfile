"use client"; // <--- Add this line

import Image from "next/image";
import { eventNames } from "process";
import React, { useState, useEffect } from "react";
// import {POST} from "./api/posts"


function generateRandomString(length: number) {
  const choices: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@"
  let result = ""
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * choices.length)
    result += choices[randomIndex]
  }
  return result
}


// installer sqlite

export default function Home() {

  const [fileinput, setFileinput] = useState<File | null>(null)
  const [linktofile, setLinktofile] = useState("")
  const [filepathvalue, setFilepathvalue] = useState("")


    const fetchData = async () =>
    {
      const res = await fetch("api/get")
      const data = await res.json();
      console.log(data)
    };
    
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
      setLinktofile(generateRandomString(4))
      setFilepathvalue(generateRandomString(30))
    }
    console.log(fileinput?.name)
    fetchData()

  }
  async function PushFiles() {
    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filepath: filepathvalue,
        link: linktofile,
      }),
    });

    const data = await res.json();
    console.log(data);
  }


  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <input type="file" className="border border-black text-black" onChange={changeFileInput} />

        <button className="border bg-black rounded w-40 h-20 text-white text-lg" onClick={PushFiles}>Upload</button>
        <p className="text-black text-lg">{fileinput?.name}</p>
      </div>
    </>
  );
}
