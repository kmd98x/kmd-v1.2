"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger, SplitText);

import Title from "../global/Title";
import Slide from "../global/slider/Slide";
import Slider from "../global/slider/Slider";
import Image from "next/image";

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
                        start: "-55% top",
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
                        start: "-50% top",
                    },
                    y: 50,
                    duration: .15,
                    stagger: 0.1,
                });
            }
        });
    }, { scope: section });

    return (
        <section ref={section} className='h-screen w-screen relative'>
            <Title className="section-title absolute top-0 left-0 mt-[-16vh]">Mijn projecten</Title>

            <Slider>
                {projectsData.map((project, index) => (
                    <div key={index}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <h3 className="project-title font-alegreya-sans text-4xl text-center">{project.title}</h3>
                            <p className="project-excerpt font-alegreya-sans text-center max-w-[60ch] mx-auto text-[clamp(1rem,1.5vw+1rem,1.75rem)]">{project.excerpt}</p>
                        </div>

                        <Image src={project.image} alt={project.title} width={1000} height={1000} className="w-auto h-auto" />
                    </div>
                ))}
            </Slider>
        </section>
    )
}
