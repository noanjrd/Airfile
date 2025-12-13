"use client"

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { base64ToBlob } from '@/utils/base64ToBlob'
import { copytoClipboard } from "@/utils/copytoClipboard";
import { PreviewFile } from "@/components/PreviewFile";
import { getMimeType } from "@/utils/getMimeType";

// faire une popup notif qui apparait quand le lien est copie ou que le telechargement demarre
export default function FilePage() {
    const params = useParams();
    const [typeinput, setTypeinput] = useState("")
    const id = params.id as String;
    const [image, setImage] = useState<File | null>(null)
    const [filesoutput, setFilesoutput] = useState<File[]>([])
    const [textoutput, setTextoutput] = useState("")

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
                <p className="text-black text-6xl mt-10 text-center">Here are your files!</p>
                {filesoutput.length > 0 && (
                    <div>
                        {/* // <div className="mt-20 grid grid-cols-2 grid-rows-2 w-100 h-100 gap-3 border p-3 border-[#3E8BFF]/90 rounded-2xl bg-[#3E8BFF]/10"> */}
                        <PreviewFile files={filesoutput} />
                        </div>
                )}
                {textoutput && (
                    <div className="relative w-200 h-50 border-2 border-gray-500 bg-gray-50 rounded-xl mt-20 p-2">
                        <p className="text-black">{textoutput}</p>
                        {/* <button className="w-18 h-7 text-sm bg-black text-white rounded-4xl absolute bottom-1 right-1">Copy</button> */}
                    </div>
                )

                }
                {typeinput === "file" && (
                    <div>
                        <button className="w-40 h-15 rounded-full bg-[#277DFF] text-lg text-white mt-10" onClick={getFile} >Download all</button>
                    </div>
                )
                }
                {typeinput === "text" && (
                    <div>
                        <button className="w-40 h-15 rounded-full bg-[#277DFF] text-lg text-white mt-10" onClick={() => copytoClipboard(textoutput)} >Copy text</button>
                    </div>
                )
                }
                <p className="text-black bottom-2 absolute">The files uploaded on this platform are not verified.</p>
            </div>

        </>
    )
}