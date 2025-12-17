"use client";

import React, { useState, useEffect } from "react";
import QRCodeComponent from "@/components/QRCodeComponent";
import { copytoClipboard } from "../utils/copytoClipboard"
import { PreviewFileHome } from "@/components/PreviewFileHome";
import { HeavyFileAlert } from "@/components/HeavyFileAlert";
import { UploadedAlert } from "@/components/UploadedAlert";
import { CopiedAlert } from "@/components/CopiedAlert";


export default function Home() {

    const [fileinput, setFileinput] = useState<File[]>([])
    const [textinput, setTextinput] = useState("")
    const [linktofile, setLinktofile] = useState("")
    const [filepathvalue, setFilepathvalue] = useState("")
    const [uploaded, setUploaded] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadedAlert, setUploadedAlert] = useState(false)
    const [HeavyAlert, setHeavyAlert] = useState(false)
    const [CopiedAlertv, setCopiedAlertv] = useState(false)
    const [inputtype, setInputtype] = useState("text")
    const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_SIZE_FILES_BYTES) || 1024 * 1024;

    useEffect(() => {
        console.log("link", linktofile);
    }, [linktofile]);
    useEffect(() => {
        console.log("path", filepathvalue);
    }, [filepathvalue]);

    const changeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        const fileinput = Array.from(e.target.files || [])
        const oversizedFiles = fileinput.filter(file => file.size > MAX_FILE_SIZE)
        if (oversizedFiles.length > 0) {
            setHeavyAlert(true)
            e.target.value = ""
            return
        }
        if (fileinput) {
            setFileinput(fileinput)
        }
        console.log(fileinput.map(f => f.name))
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
                console.log("Some files are too heavy")
                setHeavyAlert(true)
                return
            }
            setUploading(true)
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
                setUploading(false)
                setUploadedAlert(true)
                setUploaded(true)

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
                setUploading(false)
                setLinktofile(data.link)
                setUploadedAlert(true)
                setUploaded(true)
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
            <div className="flex flex-col w-full min-h-screen items-center    font-sans">
                <UploadedAlert isDisplayed={uploadedAlert} onClose={() => setUploadedAlert(false)} />
                <HeavyFileAlert isDisplayed={HeavyAlert} onClose={() => setHeavyAlert(false)} />
                <CopiedAlert isDisplayed={CopiedAlertv} onClose={() => setCopiedAlertv(false)} />
                <img src="/homeicon.png" onClick={() => window.location.reload()} className="fixed left-4 w-4.5 h-5 lg:w-6 lg:h-6 top-3 cursor-pointer hover:opacity-70" />

                {uploaded === false && (
                    <>
                    <div>
                        <p className="mt-10 text-black text-3xl lg:text-4xl text-center font-semibold">Share anything,</p>
                        <p className=" text-[#277DFF] text-3xl lg:text-4xl text-center font-semibold">anywhere</p>

                    </div>
                        <p className="text-center text-sm text-gray-700 mt-2 px-5">Upload a file or paste text to get a shareable link and QR code in seconds.</p>
                        
                        <div className="mt-13  w-60 lg:w-150 flex flex-row ">
                            <div onClick={changeTypeInput}
                                className={`flex items-center justify-center bg-[#F4F4F4]/50 ${inputtype === "text" ? "border-[#b4b4b4] z-3" : "border-[#e2e2e2] z-1"} border-[#6d6d6d] -mb-0.5  border-t-2 border-l-2 border-r-2  rounded-t-xl w-13 h-6 lg:h-8 lg:w-18 `}>
                                <img src="/texticon.png" className="w-3 h-3 lg:w-4 lg:h-4" />
                            </div>
                            <div onClick={changeTypeInput}
                                className={`flex items-center justify-center bg-[#F4F4F4]/50 ${inputtype === "file" ? "border-[#b4b4b4] z-3" : "border-[#e2e2e2] z-1"} -mb-0.5  border-t-2 border-l-2 border-r-2  rounded-t-xl w-13 h-6 lg:h-8 lg:w-18`}>
                                <img src="/uploadicon.png" className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                            </div>
                        </div>
                        {inputtype === "text" && (
                            <div className=" flex w-full justify-center z-2">
                                <textarea placeholder="Type your text here"
                                    className="  focus:outline-none  w-60 h-30 lg:w-150 lg:h-50 border-2 text-xs lg:text-base rounded-b-xl rounded-tr-xl border-[#b4b4b4] bg-[#F4F4F4]/50 text-black px-2 py-2" onChange={changeTextinput}></textarea>
                            </div>
                        )}
                        {inputtype === "file" && (
                            <div className="flex w-full h-full justify-center z-2 ">
                                <div className="relative flex flex-col items-center w-60 h-30  lg:w-150 lg:h-50 rounded-b-xl rounded-tr-xl bg-[#F4F4F4]/50 border-2 border-[#b4b4b4]  ">
                                    <input type="file" required multiple className="z-10 opacity-0 absolute w-full h-full   text-xs rounded-b-xl  text-black cursor-cell" onChange={changeFileInput} /> {/*Ici pas de () a la focntion donc c est uen reference a la focntion */}
                                    <p className="mt-7  lg:mt-15 text-black text-center text-xs lg:text-base">Click the button below to upload</p>
                                    <p className="mt-1 text-[#525252] text-center text-[10px] lg:">Max. File Size: {process.env.NEXT_PUBLIC_MAX_SIZE_FILES}</p>
                                    <button className="mt-3 w-13 h-5 lg:h-7 lg:w-15  bg-[#277DFF] rounded-full text-xs lg:text-sm cursor-pointer hover:bg-[#277DFF]/80 " >Select</button>

                                </div>
                            </div>
                        )

                        }
                        {inputtype === "file" && (
                            <PreviewFileHome files={fileinput} />
                        )
                        }
                        <button disabled={uploading} className="mt-8 border bg-black rounded-full cursor-pointer w-30 lg:w-40 h-11 lg:h-15 text-white text-sm lg:text-lg hover:bg-black/80 flex items-center justify-center    " onClick={PushContent}>
                            {uploading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                'Upload'
                            )}</button>
                    </>
                )
                }
                {uploaded === true && (
                    <div className="flex flex-col justify-center items-center mt-8 px-2 w-full h-full">
                        <p className=" text-black text-2xl text-center   lg:text-3xl max-w-sm mx-auto  ">Ready to share!</p>
                        <p className="mt-8 text-black text-xs"><br />{process.env.NEXT_PUBLIC_URL_SITE}/f/{linktofile}</p>
                        <div className="border-4 rounded-2xl     border-[#277DFF] w-[180px] h-[180px] flex justify-center items-center">
                            <QRCodeComponent text={process.env.NEXT_PUBLIC_URL_SITE + "/f/" + linktofile} width={140} height={140} />
                        </div>
                        <button className="mt-3 text-white bg-black rounded-full cursor-pointer w-25 h-13 hover:bg-black/80" onClick={() => { copytoClipboard(process.env.NEXT_PUBLIC_URL_SITE + "/f/" + linktofile); setCopiedAlertv(true) }}>Copy</button>
                    </div>

                )}
                <p className="absolute bottom-3 text-gray-500 text-center text-sm">Files are shared securely. No account required.</p>
            </div>
        </>
    );
}
