"use client";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { usePathname } from "next/navigation";

export function SplashCursorController() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    if(!isHomePage) {
        return null;
    }

    return <SplashCursor />;
}
