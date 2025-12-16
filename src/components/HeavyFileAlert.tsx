"use client"


import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface HeavyFileAlertProps {
    isDisplayed: boolean,
    onClose: () => void
}
export function HeavyFileAlert({ isDisplayed, onClose }: HeavyFileAlertProps) {
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
                className=" fixed flex flex-col justify-center  bg-[#ffeaea] border-2 border-[#ff5555] w-65 lg:w-80 h-12 lg:h-15 z-50 bottom-4 lg:bottom-2  lg:right-2 rounded-lg ">
                <img src="/warningicon.png" className="absolute w-5 h-5 ml-2.5 top-2 "/>
                <p className="ml-9 text-left text-black text-sm lg:text-base">Heavy file</p>
                <p className="ml-9 text-left text-[#7c7c7c] text-xs lg:text-sm">Maximum size authorized : 100MB</p>
            </motion.div>)}
        </AnimatePresence>
    )
}