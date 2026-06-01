export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h2 className={`${className} inline-block w-full text-center font-montez text-[15rem] text-secondary`}>
            {children}
        </h2>
    )
}
