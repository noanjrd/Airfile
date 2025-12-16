"use state"

import QRCodeComponent from "./QRCodeComponent"
import { copytoClipboard } from "@/utils/copytoClipboard";
import { motion, AnimatePresence } from "framer-motion";
import { CopiedAlert } from "./CopiedAlert";


interface PopupToShareProps {
    isOpen: boolean;
    onClose: () => void
    shareUrl: string
    triggerCopy : () => void 
}

export function PopupToShare({ isOpen, onClose, shareUrl, triggerCopy }: PopupToShareProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-45 flex items-center justify-center backdrop-blur-[2px] bg-black/30"
                >
                    <motion.div
                        key="box"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut"
                        }}
                        className="w-60 h-80 bg-white rounded-2xl shadow-2xl flex flex-col mt-5 items-center"
                    >
                        <p className="mt-10 text-center text-black text-xs">{shareUrl}</p>
                        <div className="mt-1 border-4 rounded-xl w-40 h-40 flex justify-center items-center border-blue-600">
                            <QRCodeComponent text={shareUrl} width={130} height={130} />
                        </div>

                        <img
                            src="/linkicon.png"
                            className="cursor-pointer mt-3 w-6 h-6 hover:opacity-50"
                            onClick={() => {copytoClipboard(shareUrl); triggerCopy()}}
                        />

                        <p
                            className="mt-5 text-black text-lg hover:opacity-50 cursor-pointer"
                            onClick={onClose}
                        >
                            Close
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}