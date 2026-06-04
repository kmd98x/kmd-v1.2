"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import projectsData from "@/data/projects.json";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { EffectCoverflow } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/effect-coverflow';

gsap.registerPlugin(ScrollTrigger, SplitText);

import Title from "../global/Title";
import Image from "next/image";

export default function Projects() {
    const section = useRef<HTMLDivElement>(null);
    const initialSlide = 2;
    const [currentSlide, setCurrentSlide] = useState(initialSlide);

    const handleSlideChange = (swiper: SwiperInstance) => {
        setCurrentSlide(swiper.realIndex);
    };

    const syncSlideOverlays = (swiper: SwiperInstance) => {
        swiper.slides.forEach((slideEl) => {
            const overlay = slideEl.querySelector<HTMLElement>(".slide-dim");
            if (!overlay) return;

            const progress = (slideEl as HTMLElement & { progress?: number }).progress ?? 1;
            const isCentered = Math.abs(progress) < 0.15;
            overlay.classList.toggle("opacity-0", isCentered);
            overlay.classList.toggle("opacity-100", !isCentered);
        });
    };

    const handleSwiperReady = (swiper: SwiperInstance) => {
        handleSlideChange(swiper);
        syncSlideOverlays(swiper);
    };

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

            {projectsData.map((project, index) => (
                <div key={project.title} data-id={index} className={`${currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-1000 ease-in-out absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                    <h3 className="project-title font-alegreya-sans text-4xl text-center">{project.title}</h3>
                    <p className="project-excerpt font-alegreya-sans text-center max-w-[60ch] mx-auto text-[clamp(1rem,1.5vw+1rem,1.75rem)]">{project.excerpt}</p>
                </div>
            ))}

            <span className="project-cursor pointer-events-none absolute z-20 flex h-32 w-32 items-center justify-center rounded-full bg-black/50 text-white">
                Bekijk project
            </span>

            <Swiper
                className="projects-swiper w-full overflow-hidden"
                effect="coverflow"
                centeredSlides
                slidesPerView="auto"
                watchSlidesProgress
                grabCursor
                initialSlide={initialSlide}
                onSwiper={handleSwiperReady}
                onProgress={syncSlideOverlays}
                onSlideChange={(swiper) => {
                    handleSlideChange(swiper);
                    syncSlideOverlays(swiper);
                }}
                onSlideChangeTransitionEnd={(swiper) => {
                    handleSlideChange(swiper);
                    syncSlideOverlays(swiper);
                }}
                freeMode
                modules={[EffectCoverflow]}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 80,
                    depth: 350,
                    modifier: 1,
                    slideShadows: false,
                }}
            >
                {projectsData.map((project) => (
                    <SwiperSlide key={project.title} className="relative mt-48 !w-[412px] shrink-0">
                        <div className="relative">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={1000}
                                height={1000}
                                className="relative z-0 h-auto w-auto"
                            />
                            <div
                                className="slide-dim pointer-events-none absolute inset-0 z-10 bg-black/50 opacity-100 transition-opacity duration-1000 ease-in-out"
                                aria-hidden
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
