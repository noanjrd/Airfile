"use client"

interface PreviewFileProps {
    files: File[];
}

export function PreviewFile({ files }: PreviewFileProps) {
    let i = 0
    const gridItems = []
    let reach = 4
    if (files.length <=3)
    {
        reach = 2 
    }
    while (i < reach) {
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
                        className={`w-full object-cover rounded-lg ${reach === 2 ? 'h-25 xl:h-40' : 'h-25 xl:h-40'}`}
                        onLoad={(e) => {
                            setTimeout(() => {
                                URL.revokeObjectURL((e.target as HTMLImageElement).src);
                            }, 1000);
                        }} />
                )
            }
            else {
                gridItems.push(
                    <div key={i} className={`bg-gray-200/40 w-full gap-4 ${reach === 2 ? 'h-25 xl:h-40' : 'h-25 xl:h-40'} rounded-lg flex flex-col items-center justify-center`}>
                        <img src="/fileicon.png"
                            className="w-4 h-5 xl:w-7 xl:h-9" />
                        <p className="text-black text-center truncate w-9/12 text-xs xl:text-base">{file.name}</p>

                    </div>
                )
            }
        }
        i++;
    }
    return (
        <div className={`relative grid ${reach === 2  ? ' grid-cols-2 grid-rows-1 w-60 xl:w-90 ' : ' grid-cols-2 grid-rows-2 w-60 xl:w-90 '}}   gap-3 border-2 p-3 border-[#b4b4b4] rounded-2xl bg-[#F4F4F4]/50`}>
            {gridItems}
            {
                files.length > reach && (
                    <div className="absolute  left-22 xl:left-37 -bottom-4  bg-[#277DFF] w-15 h-6 rounded-4xl flex items-center justify-center"><p className="text-center text-xs">+{files.length - reach} more</p></div>
                )
            }
            </div>
    )
}