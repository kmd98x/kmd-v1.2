import HamburgerBar from './HamburgerBar'

export default function Hamburger({onClick, isOpen}: {onClick: () => void, isOpen: boolean}) {
    return (
        <div className="flex flex-col gap-3 relative z-50 cursor-pointer" onClick={onClick}>
            <HamburgerBar className={`${isOpen ? 'rotate-45 translate-y-4' : ''} transition-all duration-300`} />
            <HamburgerBar className={`${isOpen ? 'opacity-0' : 'opacity-100'} transition-all duration-300`} />
            <HamburgerBar className={`${isOpen ? '-rotate-45 -translate-y-3.5' : ''} transition-all duration-300`} />
        </div>
    )
}
