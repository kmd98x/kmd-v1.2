"use client"

import Image from 'next/image'
import Envelope from '../icons/Envelope'
import LinkedIn from '../icons/LinkedIn'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Footer() {

    const sectionHeight = "";
    const footerRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const contactInfoRef = useRef(null);

    useGSAP(() => {
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 80%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 10,
            duration: 1,
            ease: 'power2.inOut'
        });

        gsap.from(imageRef.current, {
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
            },
            width: 0,
            duration: 4,
            ease: 'power2.out'
        })

        SplitText.create('.footer-text', {
            type: 'lines',
            mask: 'lines',
            linesClass: 'footer-text-line',
            duration: 2,
            ease: 'power2.out',
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 70%',
                        end: 'bottom top',
                        toggleActions: 'play none none reverse',
                    },
                    y: 40,
                    duration: 0.5,
                    stagger: 0.1,
                });
            }
        })

        gsap.from('.info-block', {
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 70%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 10,
            duration: 1,
            ease: 'power2.inOut',
            stagger: 0.1,
        })
    }, { scope: footerRef });

    const contactInfo = [
        {
            icon: <Envelope />,
            label: 'Email',
            href: 'mailto:kmd98x@hotmail.com',
            target: '_self',
            value: 'kmd98x@hotmail.com'
        },
        {
            icon: <LinkedIn />,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/kmd98/',
            target: '_blank',
            value: 'Martina Doekharan'
        }
    ]

    return (
        <footer className={`relative pt-24`} id="contact">
            <section ref={footerRef} className="h-auto relative w-screen">
                <div ref={imageRef} className={`h-56 w-full sm:h-120 md:h-158 md:w-225.5 absolute top-0 right-0`}>
                    <Image src="/footer-foto.png" alt="Logo" width={1102} height={812} className="w-full h-full object-cover" />
                </div>
                <section className="max-w-341 h-auto md:h-145 w-full mx-auto flex flex-col justify-center pt-64 sm:pt-80 md:pt-0 px-6 sm:px-0">
                    <h2 ref={titleRef} className='text-4xl sm:text-5xl md:text-7xl font-montez'>Neem contact op</h2>
                    <p ref={textRef} className='footer-text max-w-[70ch] text-base! sm:text-xl! md:text-2xl! font-alegreya-sans mt-6'>Zin om samen te werken of gewoon even hallo te zeggen? Stuur me dan gerust een bericht via onderstaand e-mailadres of LinkedIn.</p>
                    <div ref={contactInfoRef} className="flex flex-col sm:flex-row gap-6 sm:gap-20 mt-10 sm:items-center">
                        {contactInfo.map((item) => (
                            <div key={item.label} className='info-block flex gap-3 item-center'>
                                <div className="w-12 h-12 rounded-full bg-[#231F1C] flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <p className='font-alegreya-sans'>{item.label}</p>
                                    <a href={item.href} target={item.target} className='text-lg font-alegreya-sans'>{item.value}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <p className='max-w-341 mx-auto md:my-auto text-center max-sm:mb-5 max-sm:mt-10 ms:my-10'>&copy; 2026 Martina Doekharan</p>
                </section>
            </section>
        </footer>
    )
}
