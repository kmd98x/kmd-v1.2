'use client'

import Link from 'next/link'
import Logo from '../navigation/Logo'
import { useEffect, useState } from 'react'

export default function Navigation() {

    const [showLogo, setShowLogo] = useState(false)

    useEffect(() => {
        const onScroll = () => setShowLogo(window.scrollY > 467)
        window.addEventListener('scroll', onScroll)
        onScroll()

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault()
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } 
    }
    
    return (
        <header className="flex items-center justify-between fixed w-full px-8 py-6 left-1/2 -translate-x-1/2 z-50">
            <Link
                href="#home"
                className={`inline-block z-50 transition-opacity ${showLogo ? 'opacity-100 y-0' : 'opacity-0 -y-10'}`}
                onClick={(e) => scrollToSection(e, 'home')}
            >
                <Logo />
            </Link>

            <nav className={`site-navigation flex gap-4 items-center`}>
                <Link href="#over-mij" onClick={(e) => scrollToSection(e, 'over-mij')}>Over mij</Link>
                <Link href="#projecten" onClick={(e) => scrollToSection(e, 'projecten')}>Projecten</Link>
                <Link href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</Link>
            </nav>
        </header>
    )
}
