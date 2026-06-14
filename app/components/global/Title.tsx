import { twMerge } from "tailwind-merge";

export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h2
            className={twMerge(
                "inline-block w-full text-center font-montez text-[clamp(2.5rem,18vw+0.5rem,15rem)] text-secondary",
                className
            )}
        >
            {children}
        </h2>
    )
}
