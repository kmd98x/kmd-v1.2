import HamburgerBar from './HamburgerBar'

export default function Hamburger({onClick, isOpen}: {onClick: () => void, isOpen: boolean}) {
    return (
        <div className="flex flex-col gap-2 opacity-95 -mt-5 w-6 items-end relative z-50 cursor-pointer" onClick={onClick}>
            <HamburgerBar className={`${isOpen ? 'rotate-45 translate-y-4' : ''} w-full h-px transition-all duration-300`} />
            <HamburgerBar className={`${isOpen ? 'opacity-0' : 'opacity-100'} w-4 h-px transition-all duration-300`} />
            <HamburgerBar className={`${isOpen ? '-rotate-45 -translate-y-3.5' : ''} w-full h-px transition-all duration-300`} />
        </div>
    )
}
