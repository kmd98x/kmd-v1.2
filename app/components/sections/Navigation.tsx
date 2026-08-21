'use client'

import Link from 'next/link'
import Logo from '../navigation/Logo'
import Hamburger from '../navigation/Hamburger'
import { useEffect, useState } from 'react'

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
export default function Navigation() {

    const [showLogo, setShowLogo] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setShowLogo(window.scrollY > 467)
        window.addEventListener('scroll', onScroll)
        onScroll()

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isMenuOpen])

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string, offset = 96) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const section = document.getElementById(sectionId);
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY - offset;
        gsap.to(window, {
            scrollTo: { y: top },
            duration: 3,
            ease: "power1.inOut",
        });
    };

    const links = [
        { href: '#over-mij', id: 'over-mij', offset: 96, label: 'Over mij' },
        { href: '#projecten', id: 'projecten', offset: 192, label: 'Projecten' },
        { href: '#contact', id: 'contact', offset: 96, label: 'Contact' },
    ]

    return (
        <header className="flex items-center justify-between fixed w-full px-6 sm:px-8 py-6 left-1/2 -translate-x-1/2 z-50">
            <Link
                href="#home"
                className={`inline-block z-50 transition-opacity ${showLogo ? 'opacity-100 max-sm:opacity-0 y-0' : 'opacity-0 -y-10'}`}
                onClick={(e) => scrollToSection(e, 'home')}
            >
                <Logo />
            </Link>

            <nav className={`site-navigation hidden md:flex gap-8 items-center`}>
                {links.map((link) => (
                    <Link key={link.id} href={link.href} className='hover:scale-105 transition-all duration-300' onClick={(e) => scrollToSection(e, link.id, link.offset)}>{link.label}</Link>
                ))}
            </nav>

            <div className="md:hidden">
                <Hamburger isOpen={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} />
            </div>

            <nav
                className={`site-navigation-mobile md:hidden fixed inset-0 h-dvh w-screen bg-background flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {links.map((link) => (
                    <Link key={link.id} href={link.href} className='text-2xl hover:scale-105 transition-all duration-300' onClick={(e) => scrollToSection(e, link.id, link.offset)}>{link.label}</Link>
                ))}
            </nav>
        </header>
    )
}
