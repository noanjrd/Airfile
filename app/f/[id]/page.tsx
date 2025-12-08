"use client"


import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
// import { Blob } from "buffer";

//dJE DOIS FAIRE TT LES TRY ET VERIFICATIONS

export default function FilePage() {
    const params = useParams();
    const id = params.id as String;
    const [image, setImage] = useState<File | null>(null)

    const getFile = async () => {
        try {
            const response = await fetch('../api/get', {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ id: id })
            })
            const blob = await response.blob()
            const headercontent = response.headers.get('Content-Disposition')
            // console.log(filename)
            const filename = headercontent?.split('"')[1]
            console.log(filename)

            if (filename) {
                const file = new File([blob], filename, {
                    type: blob.type || "application/octet-stream"
                })
                setImage(file)

            }
        }
        catch (err:any)
        {
            console.error({error : err.message})
        }

        // const url = window.URL.createObjectURL(blob);
        // window.open(url, '_blank');
        // setImage()
        // console.log(data)
    }
    // const 
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <button className="w-50 h-20 rounded-lg bg-black text-white" onClick={getFile} >Download file</button>
                {image && (
                    <div>
                        <img src={URL.createObjectURL(image)} className="w-full h-full" />
                    </div>
                )

                }
            </div>

        </>
    )
}