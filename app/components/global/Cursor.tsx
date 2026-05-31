"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {

    const cursorRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const xTo = gsap.quickTo(cursor, "left", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "top", { duration: 0.7, ease: "power3.out" });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX - cursor.offsetWidth / 2);
            yTo(e.clientY - cursor.offsetHeight / 2);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            gsap.killTweensOf(cursor);
        };
    }, []);

    return (
        <span
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
        ></span>
    )
}
