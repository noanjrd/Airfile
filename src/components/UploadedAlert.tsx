"use client"



import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface UploadedAlertProps {
    isDisplayed: boolean,
    onClose: () => void
}
export function UploadedAlert({ isDisplayed, onClose }: UploadedAlertProps) {
    useEffect(() => {
        if (isDisplayed) {
            const timer = setTimeout(() => {
                onClose()
            },2000)
            return () => clearTimeout(timer)
        }
    }, [isDisplayed, onClose])
    return (
        <AnimatePresence>
            {isDisplayed && (<motion.div
                key="overlay"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className=" fixed flex flex-col justify-center  bg-[#e0ecff] border-2 border-[#277DFF] w-65 lg:w-80 h-12 lg:h-15 z-50 bottom-4 lg:bottom-2  lg:right-2 rounded-lg ">
                <img src="/checkicon.png" className="absolute w-4 h-4 ml-2.5 top-2.5 "/>
                <p className="ml-8 text-left text-black text-sm lg:text-base">Content uploaded</p>
                <p className="ml-8 text-left text-[#7c7c7c] text-xs lg:text-sm">The content has been uploaded.</p>
            </motion.div>)}
        </AnimatePresence>
    )
}