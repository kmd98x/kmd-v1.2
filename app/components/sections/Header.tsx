"use client";

import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
    const imageRef = useRef<HTMLImageElement>(null)
    const container = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.to('.hero-image', {
            opacity: 0,
            duration: 1,
            scale: 1.1,
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom center",
                pin: '.hero-pin',
                scrub: true,
                markers: true,
            },
        })
    }, {scope: container})

    return (
        <section ref={container} className='h-screen w-screen'>
            <div className="hero-pin h-screen w-screen flex items-center justify-center">
                <Image src="/hero-image.svg" className="hero-image" ref={imageRef} alt="Header" width={1000} height={1000} />
            </div>
        </section>
    )
}
