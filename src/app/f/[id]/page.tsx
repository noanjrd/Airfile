"use client"

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { base64ToBlob } from '@/utils/base64ToBlob'
import { copytoClipboard } from "@/utils/copytoClipboard";
import { PreviewFile } from "@/components/PreviewFile";
import { getMimeType } from "@/utils/getMimeType";
import { PopupToShare } from "@/components/PopupToShare";
import { downloadFiles } from "@/utils/downloadFiles";
import { CopiedAlert } from "@/components/CopiedAlert";
import { CopiedAlertText } from "@/components/CopiedAlertText";
import Link from "next/link";

// faire une popup notif qui apparait quand le lien est copie ou que le telechargement demarre
export default function FilePage() {
    const params = useParams();
    const [typeinput, setTypeinput] = useState("")
    const id = params.id as String;
    const [image, setImage] = useState<File | null>(null)
    const [filesoutput, setFilesoutput] = useState<File[]>([])
    const [textoutput, setTextoutput] = useState("")
    const [popupstate, setPopupstate] = useState(false)
    const [alertCopied, setAlertCopied] = useState(false)
    const [alertCopiedText, setAlertCopiedText] = useState(false)

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
                window.location.href = "/404"
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
                <Link href="/" className="fixed left-4 top-3 cursor-pointer hover:opacity-70">
                    <img src="/homeicon.png" className="w-4.5 h-5 lg:w-6 lg:h-6" alt="Home" />
                </Link>

                <PopupToShare triggerCopy={() => setAlertCopied(true)} isOpen={popupstate} onClose={() => setPopupstate(false)} shareUrl={`${process.env.NEXT_PUBLIC_URL_SITE || 'http://localhost:3000/'}` + "/f/" + id} />
                <CopiedAlert isDisplayed={alertCopied} onClose={() => setAlertCopied(false)} />
                    <CopiedAlertText isDisplayed={alertCopiedText} onClose={() => setAlertCopiedText(false)} />
                {typeinput.length > 1 && (
                    <>
                        <p className="text-black xl:text-5xl text-3xl mt-10 sm:mt-5 lg:mt-10 text-center font-medium">{typeinput == "file" ? "Here are your files!" : "Here is your text!"}</p>
                        {filesoutput.length > 0 && (
                            <div className="mt-10 sm:mt-5 lg:mt-10">
                                {/* // <div className="mt-20 grid grid-cols-2 grid-rows-2 w-100 h-100 gap-3 border p-3 border-[#3E8BFF]/90 rounded-2xl bg-[#3E8BFF]/10"> */}
                                <PreviewFile files={filesoutput} />
                            </div>
                        )}
                        {textoutput && (
                            <div className="relative mt-13 xl:mt-20  w-70 sm:w-100 h-30  lg:w-150 lg:h-50 border-2 border-gray-500 bg-[#F4F4F4]/50 rounded-xl  p-2">
                                <p className="text-black text-sm xl:text-base overflow-hidden text-ellipsis h-25 lg:h-45">{textoutput}</p>
                                {/* <button className="w-18 h-7 text-sm bg-black text-white rounded-4xl absolute bottom-1 right-1">Copy</button> */}
                            </div>
                        )

                        }
                        {typeinput === "file" && (
                            <div className="mt-15 sm:mt-10 lg:mt-10">
                                <button className="cursor-pointer w-27 h-9 lg:w-35 lg:h-10 rounded-full bg-black hover:opacity-80  text-sm lg:text-base text-white" onClick={() => downloadFiles(filesoutput)} >Download all</button>
                            </div>
                        )
                        }
                        {typeinput === "text" && (
                            <div className="mt-5 sm:mt-2 lg:mt-5">
                                <button className="cursor-pointer w-27 h-10 sm:w-25 sm:h-10 lg:w-35 lg:h-13 rounded-full bg-black hover:bg-black/80 text-sm lg:text-lg text-white" onClick={() => { copytoClipboard(textoutput); setAlertCopiedText(true) }} >Copy text</button>
                            </div>
                        )
                        }
                        <div className="flex flex-row gap-1 mt-1 hover:opacity-80 cursor-pointer" onClick={() => setPopupstate(true)}>
                            <p className="text-black lg:text-sm text-xs">Forward</p>
                            <img src="/forwardicon.png" className="lg:w-[13px] lg:h-2.5 w-2.5 h-2 mt-1" />
                        </div>
                    </>
                )}
                {typeinput.length < 1 && (
                    <>
                        <button disabled className="fixed top-1/2 border-3 border-[#277DFF] bg-neutral-primary-soft rounded-xl cursor-pointer w-50 lg:w-60 h-11 lg:h-15 text-black text-sm lg:text-base flex items-center justify-center    " >
                            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading your content...</button>
                    </>
                )}

                <p className="text-gray-500 bottom-3 absolute text-xs lg:text-sm">The files uploaded on this platform are not verified.</p>
            </div>

        </>
    )
}