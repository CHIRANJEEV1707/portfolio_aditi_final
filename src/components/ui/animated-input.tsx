"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  initial: {
    y: 0,
    color: "hsl(var(--foreground))",
  },
  animate: {
    y: "-120%",
    color: "hsl(var(--muted-foreground))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export const AnimatedInput = ({
  label,
  className = "",
  value,
  onFocus,
  onBlur,
  ...props
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || (value && String(value).length > 0);

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-foreground"
        variants={containerVariants}
        initial="initial"
        animate={showLabel ? "animate" : "initial"}
      >
        {label.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-sm"
            variants={letterVariants}
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      <input
        value={value}
        onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
        }}
        {...props}
        className="outline-none border-b-2 border-primary bg-transparent py-2 w-full text-base font-medium text-foreground placeholder-transparent"
      />
    </div>
  );
};
