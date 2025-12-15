"use client"

interface PreviewFileHomeProps {
    files: File[];
}

export function PreviewFileHome({ files }: PreviewFileHomeProps) {
    let i = 0
    const gridItems = []
    let reach = files.length
    while (i < reach) {
        const file = files[i]
        if (file) {
            console.log(`File ${i}:`, {
                name: file.name,
                type: file.type,
                size: file.size,
                isImage: file.type.startsWith('image/')
            });
            {

            }
            gridItems.push(
                <div key={i} className=" w-50 lg:w-100 gap-2 h-6 lg:h-10 flex flex-row items-center justify-center">
                    <img src="/fileicon.png"
                            className="w-3 h-4 lg:w-4 lg:h-5 ml-0.5 " />

                    <p className="text-black text-left truncate w-full text-[10px] lg:text-sm ">{file.name}</p>

                </div>
            )
        }
        i++;
    }
    return (
        <div className={`mt-3 ml-5 relative grid  grid-rows-${reach} w-55 lg:w-150  `}>
            <div>
            {gridItems}
            </div>
        </div>
    )
}