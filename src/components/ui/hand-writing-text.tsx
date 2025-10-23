"use client";

import { motion } from "framer-motion";
interface HandWrittenTitleProps {
    title?: string;
    subtitle?: React.ReactNode;
}

function HandWrittenTitle({
    title = "Hand Written",
    subtitle,
}: HandWrittenTitleProps) {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto py-12">
            <div className="absolute inset-0">
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1700 500"
                    initial="hidden"
                    animate="visible"
                    className="w-full h-full"
                >
                    <title>KokonutUI</title>
                    <motion.path
                        d="M 1650,0 C 1850,190 1750,420 1100,390 C 450,360 50,420 50,240 C 50,60 500,-80 1000,-10 C 1500,60 1650,60 1650,60"
                        fill="none"
                        strokeWidth="12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={draw}
                        className="text-primary/50"
                    />
                </motion.svg>
            </div>
            <div className="relative text-center z-10 flex flex-col items-center justify-center">
                <motion.h1
                    className="font-headline text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.div
                        className="mt-4 text-lg md:text-xl lg:text-2xl text-muted-foreground font-body max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        {subtitle}
                    </motion.div>
                )}
            </div>
        </div>
    );
}


export { HandWrittenTitle }
