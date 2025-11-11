import React from "react";
import { motion } from "framer-motion";

export default function Loader({ text = "Loading...", size = 48, fullScreen = false }) {
    const loader = (
        <div className="flex flex-col items-center justify-center gap-3">
            <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
                <div
                    className="w-12 h-12 border-4 border-transparent border-t-[#00bcd4] rounded-full shadow-[0_0_15px_#00bcd4]"
                    style={{ width: size, height: size }}
                />
            </motion.div>
            <motion.p
                className="text-gray-300 text-sm tracking-wide font-medium mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            >
                {text}
            </motion.p>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-9999">
                {loader}
            </div>
        );
    }

    return loader;
};
