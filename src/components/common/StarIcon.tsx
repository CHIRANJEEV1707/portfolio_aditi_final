import { cn } from "@/lib/utils";

const StarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-6 h-6", className)}
    >
      <path d="M12 2l2.54 7.76h8.12l-6.57 4.78 2.54 7.76L12 17.52l-6.63 4.78 2.54-7.76-6.57-4.78h8.12z" />
    </svg>
  );
};

export default StarIcon;
