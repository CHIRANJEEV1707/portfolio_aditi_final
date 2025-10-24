"use client";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}


export const AnimatedInput = ({
  label,
  className = "",
  value,
  ...props
}: AnimatedInputProps) => {

  return (
    <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
      <Label htmlFor={props.name}>{label}</Label>
      <Input value={value} {...props} />
    </div>
  );
};
