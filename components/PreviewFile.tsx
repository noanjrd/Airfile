"use client"

import fileicon from "@/public/fileicon.png"

interface PreviewFileProps {
    files: File[];
}

export function PreviewFile({ files }: PreviewFileProps) {
    let i = 0
    const gridItems = []
    while (i < 4) {
        const file = files[i]
        if (file) {
            console.log(`File ${i}:`, {
                name: file.name,
                type: file.type,
                size: file.size,
                isImage: file.type.startsWith('image/')
            });
            if (file.type.startsWith('image/')) {
                gridItems.push(
                    <img key={i} src={URL.createObjectURL(file)}
                        className="w-full h-full object-cover rounded-lg"
                        onLoad={(e) => {
                            // Nettoyer l'URL après chargement
                            setTimeout(() => {
                                URL.revokeObjectURL((e.target as HTMLImageElement).src);
                            }, 1000);
                        }} />
                )
            }
            else {
                gridItems.push(
                    <div key={i} className="bg-white/50 w-full gap-4 h-full border rounded-lg flex flex-col items-center justify-center">
                        <img src="/fileicon.png"
                            className="w-7 h-9" />
                        <p className="text-black">{file.name}</p>

                    </div>
                )
            }
        }
        i++;
    }
    return (
        <div className="relative mt-20 grid grid-cols-2 grid-rows-2 w-100 h-100 gap-3 border p-3 border-[#3E8BFF]/90 rounded-2xl bg-[#3E8BFF]/10">
            {gridItems}
            {
                files.length > 4 && (

                    <div className="absolute left-37 -bottom-4 bg-[#277DFF] w-25 h-10 rounded-4xl flex items-center justify-center"><p className="text-center">+{files.length - 4} more</p></div>
                )
            }
            </div>
    )
}