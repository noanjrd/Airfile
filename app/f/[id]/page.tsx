"use client"

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { base64ToBlob } from '../../../utils/base64ToBlob'


export default function FilePage() {
    const params = useParams();
    const id = params.id as String;
    const [image, setImage] = useState<File | null>(null)
    const [textoutput, setTextoutput] = useState("")

    const getFile = async () => {
        try {
            const response = await fetch('../api/get', {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ id: id })
            })
            const data = await response.json()
            if (data.type == "text") {
                setTextoutput(data.text)
            }
            else if (data.type == "file") {
                const blob = base64ToBlob(data.fileData)
                const file = new File([blob], data.filename, {
                    type: blob.type || "application/octet-stream"
                })
                setImage(file)
            }
            else {
                console.log("Type not found")
            }
        }
        catch (err: any) {
            console.error({ error: err.message })
        }
    }
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <button className="w-50 h-20 rounded-lg bg-black text-white" onClick={getFile} >Download file</button>
                {image && (
                    <div>
                        <img src={URL.createObjectURL(image)} className="w-full h-full" />
                    </div>
                )}
                {textoutput && (
                    <div>
                        <p className="text-black">Voici ton message : {textoutput}</p>
                    </div>
                )

                }
            </div>

        </>
    )
}