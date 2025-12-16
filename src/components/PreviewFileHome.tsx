"use client"


import { motion, AnimatePresence } from "framer-motion";

interface PreviewFileHomeProps {
    files: File[];
}

export function PreviewFileHome({ files }: PreviewFileHomeProps) {

    return (
        <div className="mt-2 ml-3 relative w-55 lg:w-150">
       <AnimatePresence>
        {
            files.map((file, i) => (
                <motion.div 
                key={i}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className=" w-50 lg:w-100 gap-2 h-6 lg:h-8 flex flex-row items-center justify-center"
                        >
                    
                    <img src="/fileicon.png"
                            className="w-3 h-4 lg:w-4 lg:h-5 ml-0.5 " />
                            <p className="text-black text-left truncate w-full text-[10px] lg:text-sm ">{file.name}</p>
                    
                </motion.div >
            ))
        }
        </AnimatePresence> 
        </div>
    )
}