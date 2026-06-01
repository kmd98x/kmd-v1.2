"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";


gsap.registerPlugin(ScrollTrigger, SplitText);

import Title from "../global/Title";

export default function Projects() {
    const section = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(".section-title", {
            opacity: 0,
            y: -30,
        }, {
            opacity: 0.4,
            y: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section.current,
                start: "-75% top",
                end: "-50% top",
                scrub: true,
            },
        });

        SplitText.create('.project-title', {
            type: 'chars',
            mask: 'chars',
            charsClass: 'project-title-char',
            onSplit: (self) => {
                return gsap.from(self.chars, {
                    scrollTrigger: {
                        trigger: section.current,
                        start: "-60% top",
                        markers: true,
                    },
                    y: 50,
                    duration: 1,
                    stagger: 0.1,
                });
            }
        });

        SplitText.create('.project-excerpt', {
            type: 'lines',
            mask: 'lines',
            linesClass: 'project-excerpt-line',
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    scrollTrigger: {
                        trigger: section.current,
                        start: "-60% top",
                        markers: true,
                    },
                    y: 50,
                    duration: .15,
                    stagger: 0.1,
                });
            }
        });
    }, { scope: section });

    return (
        <section ref={section} className='h-screen w-screen'>
            <Title className="section-title">Mijn projecten</Title>
            <h3 className="project-title font-alegreya-sans text-4xl text-center">EU Tribe</h3>
            <p className="project-excerpt font-alegreya-sans text-lg text-center max-w-[60ch] mx-auto">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem ex maxime quidem distinctio excepturi, ratione quas! Tenetur sequi suscipit, dolore, dolorem alias animi nesciunt magnam molestias ut aliquam, sunt ducimus!</p>
        </section>
    )
}
