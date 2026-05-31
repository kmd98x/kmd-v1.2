'use client'

import Link from 'next/link'
import Logo from '../navigation/Logo'
import Hamburger from '../navigation/Hamburger'
import { useState } from 'react'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="flex items-center justify-between fixed w-full p-8 left-1/2 -translate-x-1/2 z-50">
            <Link href="/" className="inline-block z-50"><Logo /></Link>

            <Hamburger onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

            <nav className={`site-navigation fixed top-0 right-0 h-screen w-screen flex flex-col gap-10 items-center justify-center backdrop-blur-lg z-40 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
                <Link href="#home">Home</Link>
                <Link href="#over-mij">Over mij</Link>
                <Link href="#projecten">Projecten</Link>
                <Link href="#contact">Contact</Link>
            </nav>
        </header>
    )
}
