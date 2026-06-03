import { twMerge } from "tailwind-merge";

export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h2
            className={twMerge(
                "inline-block w-full text-center font-montez text-[15rem] text-secondary",
                className
            )}
        >
            {children}
        </h2>
    )
}
