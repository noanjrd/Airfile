"use client"

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { base64ToBlob } from '@/utils/base64ToBlob'
import { copytoClipboard } from "@/utils/copytoClipboard";
import { PreviewFile } from "@/components/PreviewFile";
import { getMimeType } from "@/utils/getMimeType";
import { PopupToShare } from "@/components/PopupToShare";

// faire une popup notif qui apparait quand le lien est copie ou que le telechargement demarre
export default function FilePage() {
    const params = useParams();
    const [typeinput, setTypeinput] = useState("")
    const id = params.id as String;
    const [image, setImage] = useState<File | null>(null)
    const [filesoutput, setFilesoutput] = useState<File[]>([])
    const [textoutput, setTextoutput] = useState("")
    const [popupstate, setPopupstate] = useState(false)

    useEffect(() => {
        getFile();
    }, [])
    const getFile = async () => {
        try {
            const response = await fetch('../api/get', {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ id: id })
            })
            const data = await response.json()
            if (data.type == "text") {
                setTypeinput("text")
                setTextoutput(data.text)
            }
            else if (data.type == "file") {

                console.log("bo")
                setTypeinput("file")
                const tempfiles = []
                for (const file of data.files) {
                    console.log(file.filename)
                    const blob = base64ToBlob(file.fileData)

                    const filetemp = new File([blob], file.filename, {
                        type: getMimeType(file.filename),
                    })
                    tempfiles.push(filetemp)
                }
                setFilesoutput(tempfiles)
            }
            else {
                console.log("Type not found 2")
                console.log(data.sucess)
            }
        }
        catch (err: any) {
            console.log('hey')
            console.error({ error: err.message })
        }
    }
    return (
        <>
            <div className="relative w-full min-h-screen  flex flex-col items-center">

                <PopupToShare isOpen={popupstate} onClose={() => setPopupstate(false)} shareUrl={"http://localhost:3000/f/" + id} />


                <p className="text-black xl:text-5xl text-3xl mt-10 sm:mt-5 lg:mt-10 text-center font-medium">{typeinput == "file" ? "Here are your files!" : "Here is your text!"}</p>
                {filesoutput.length > 0 && (
                    <div className="mt-10 sm:mt-5 lg:mt-10">
                        {/* // <div className="mt-20 grid grid-cols-2 grid-rows-2 w-100 h-100 gap-3 border p-3 border-[#3E8BFF]/90 rounded-2xl bg-[#3E8BFF]/10"> */}
                        <PreviewFile files={filesoutput} />
                    </div>
                )}
                {textoutput && (
                    <div className="relative mt-13 xl:mt-20  w-70 sm:w-100 h-30  lg:w-150 lg:h-50 border-2 border-gray-500 bg-gray-50 rounded-xl  p-2">
                        <p className="text-black text-sm xl:text-base overflow-hidden text-ellipsis h-25 lg:h-45">{textoutput}</p>
                        {/* <button className="w-18 h-7 text-sm bg-black text-white rounded-4xl absolute bottom-1 right-1">Copy</button> */}
                    </div>
                )

                }
                {typeinput === "file" && (
                    <div className="mt-15 sm:mt-10 lg:mt-10">
                        <button className="cursor-pointer w-27 h-9 lg:w-35 lg:h-10 rounded-full bg-black hover:opacity-80  text-sm lg:text-base text-white" onClick={getFile} >Download all</button>
                    </div>
                )
                }
                {typeinput === "text" && (
                    <div className="mt-5 sm:mt-2 lg:mt-5">
                        <button className="cursor-pointer w-27 h-1 sm:w-25 sm:h-10 lg:w-35 lg:h-13 rounded-full bg-black hover:bg-black/80 text-sm lg:text-lg text-white" onClick={() => copytoClipboard(textoutput)} >Copy text</button>
                    </div>
                )
                }
                <div className="flex flex-row gap-1 mt-1 hover:opacity-80 cursor-pointer" onClick={() => setPopupstate(true)}>
                    <p className="text-black lg:text-sm text-xs">Forward</p>
                    <img src="/forwardicon.png" className="lg:w-[13px] lg:h-2.5 w-2.5 h-2 mt-1" />
                </div>
                <p className="text-black bottom-2 absolute text-xs lg:text-sm">The files uploaded on this platform are not verified.</p>

            </div>

        </>
    )
}