
import { cn } from "@/lib/utils";

const SquiggleIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-20 h-5", className)}
    >
      <path d="M2 10 C 12 2, 22 18, 32 10 S 52 2, 62 10 S 72 18, 78 10" />
    </svg>
  );
};

export default SquiggleIcon;
