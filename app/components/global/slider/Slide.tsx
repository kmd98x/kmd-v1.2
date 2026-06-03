"use client";

export default function Slide({ children, key: slideKey }: { children: React.ReactNode, key?: number }) {
    return (
        <div key={slideKey}>
            {children}
        </div>
    )
}
