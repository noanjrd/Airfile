"use client"

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
                    <div key={i} className="bg-gray-200 w-full gap-4 h-full border rounded-lg flex flex-col items-center justify-center">
                        <img src="/fileicon.png"
                            className="w-4 h-5 lg:w-7 lg:h-9" />
                        <p className="text-black text-center truncate w-9/12 text-xs lg:text-base">{file.name}</p>

                    </div>
                )
            }
        }
        i++;
    }
    return (
        <div className="relative grid grid-cols-2 grid-rows-2 w-60 xl:w-90 xl:h-90 h-60 gap-3 border p-3 border-gray-700 rounded-2xl bg-gray-100">
            {gridItems}
            {
                files.length > 4 && (

                    <div className="absolute  left-22 xl:left-37 -bottom-4  bg-[#277DFF] w-15 h-6 rounded-4xl flex items-center justify-center"><p className="text-center text-xs">+{files.length - 4} more</p></div>
                )
            }
            </div>
    )
}