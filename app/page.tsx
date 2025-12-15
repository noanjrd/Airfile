"use client";

import { link } from "fs";
import Image from "next/image";
import { eventNames } from "process";
import React, { useState, useEffect } from "react";
import QRCodeComponent from "@/components/QRCodeComponent";
import { copytoClipboard } from "../utils/copytoClipboard"
import { PreviewFileHome } from "@/components/PreviewFileHome";
import { HeavyFileAlert } from "@/components/HeavyFileAlert";
import { UploadedAlert } from "@/components/UploadedAlert";



export default function Home() {

    const [fileinput, setFileinput] = useState<File[]>([])
    const [textinput, setTextinput] = useState("")
    const [linktofile, setLinktofile] = useState("")
    const [filepathvalue, setFilepathvalue] = useState("")
    const [uploaded, setUploaded] = useState(false)
    const [HeavyAlert, setHeavyAlert] = useState(false)
    const [inputtype, setInputtype] = useState("text")
    const MAX_FILE_SIZE = 100 * 1024 * 1024;

    useEffect(() => {
        console.log("link", linktofile);
    }, [linktofile]);
    useEffect(() => {
        console.log("path", filepathvalue);
    }, [filepathvalue]);

    const changeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // let files = []

        const fileinput = Array.from(e.target.files || [])
        const oversizedFiles = fileinput.filter(file => file.size > MAX_FILE_SIZE)
        if (oversizedFiles.length > 0)
        {
            setHeavyAlert(true)
            return 
        }
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
            const oversizedFiles = fileinput.filter(file => file.size > MAX_FILE_SIZE)
            if (oversizedFiles.length > 0) {
                console.log("Certains fichiers sont trop volumineux")
                return
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
                setUploaded(true)
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
                setUploaded(true)
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
            <div className="flex flex-col w-full h-full items-center justify-center bg-white border font-sans">
                <UploadedAlert isDisplayed={uploaded} onClose={() => setUploaded(false)} />
                <HeavyFileAlert isDisplayed={HeavyAlert} onClose={() => setHeavyAlert(false)} />
                <p className="mt-8 text-black text-xl lg:text-3xl text-center">Upload whatever you want here!</p>
                <div className="mt-13  w-55 lg:w-150 flex flex-row ">
                    <div onClick={changeTypeInput}
                        className={`flex items-center justify-center bg-[#F4F4F4] ${inputtype === "text" ? "border-[#b4b4b4] z-3" : "border-[#e2e2e2] z-1"} border-[#6d6d6d] -mb-0.5  border-t-2 border-l-2 border-r-2  rounded-t-xl w-13 h-6 lg:h-8 lg:w-18 `}>
                        <img src="/texticon.png" className="w-3 h-3 lg:w-4 lg:h-4" />
                    </div>
                    <div onClick={changeTypeInput}
                        className={`flex items-center justify-center bg-[#F4F4F4] ${inputtype === "file" ? "border-[#b4b4b4] z-3" : "border-[#e2e2e2] z-1"} -mb-0.5  border-t-2 border-l-2 border-r-2  rounded-t-xl w-13 h-6 lg:h-8 lg:w-18`}>
                        <img src="/uploadicon.png" className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    </div>
                </div>
                {inputtype === "text" && (
                    <div className=" flex w-full justify-center z-2">
                        <textarea placeholder="Type your text here"
                            className="  focus:outline-none  w-55 h-30 lg:w-150 lg:h-50 border-2 text-xs lg:text-base rounded-b-xl rounded-tr-xl border-[#b4b4b4] bg-[#F4F4F4] text-black px-2 py-2" onChange={changeTextinput}></textarea>
                    </div>
                )}
                {inputtype === "file" && (
                    <div className="flex w-full h-full justify-center z-2 ">
                        <div className="relative w-55 h-30 lg:w-150 lg:h-50 rounded-b-xl rounded-tr-xl bg-[#F4F4F4] border-2 border-[#b4b4b4]  ">
                            <input type="file" required multiple className="opacity-0 absolute w-full h-full   text-xs rounded-b-xl  text-black " onChange={changeFileInput} /> {/*Ici pas de () a la focntion donc c est uen reference a la focntion */}
                            <p className="mt-10 lg:mt-18 text-black text-center text-xs lg:text-base">Click the button below to upload</p>
                            <p className="mt-1 text-[#525252] text-center text-[10px] lg:">Max. File Size: 100MB</p>

                        </div>
                    </div>
                )

                }
                {inputtype === "file" && (
                    <PreviewFileHome files={fileinput} />
                )
                }
                <button className="mt-8 border bg-black rounded-full cursor-pointer w-28 lg:w-40 h-11 lg:h-15 text-white text-base lg:text-lg hover:bg-black/80" onClick={PushContent}>Upload</button> {/* Ici pareil */}
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
