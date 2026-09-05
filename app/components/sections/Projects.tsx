"use client";

import { useEffect, useRef, useState } from "react";
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
import { Project } from "@/types/project";
import ProjectDetailsModal from "../ProjectDetailsModal";
import Close from "../icons/Close";


export default function Projects() {
    const section = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperInstance | null>(null);

    const initialSlide = 2;
    const [currentSlide, setCurrentSlide] = useState(initialSlide);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (isModalOpen) {
            modalRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    }, [isModalOpen]);

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
        swiperRef.current = swiper;

        handleSlideChange(swiper);
        syncSlideOverlays(swiper);
    };

    const handleProjectSlideClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    useGSAP(() => {
        gsap.fromTo(".section-title", {
            opacity: 0,
            y: -30,
        }, {
            opacity: 0.5,
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
            type: 'lines',
            mask: 'lines',
            linesClass: 'project-title-line',
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    scrollTrigger: {
                        trigger: section.current,
                        start: "-60% top",
                        end: "-30% top",
                        scrub: true,
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
                        end: "-30% top",
                        scrub: true,
                    },
                    y: 50,
                    duration: 2,
                    stagger: 0.1,
                });
            }
        });

        gsap.from('.swiper-slide', {
            scrollTrigger: {
                trigger: section.current,
                start: "-30% top",
                end: "-20% top",
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 10,
            duration: 1,
            stagger: 0.3,
            ease: "power2.inOut",
        })
    }, { scope: section });

    return (
        <section ref={section} className='h-[90vh] min-h-220 w-screen relative' id="projecten">
            <div
                className={`fixed top-0 left-0 w-full h-full bg-black/90 z-50 transition-opacity duration-700 ease-in-out ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsModalOpen(false)}
            ></div>

            <div
                className={`fixed h-[calc(100vh-80px)] w-screen bg-[#0C0C0C] overflow-y-auto z-50 transition-all duration-700 ease-in-out outline-0 ${isModalOpen ? 'top-20' : 'top-full'}`}
                ref={modalRef}
                tabIndex={-1}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        setIsModalOpen(false);
                    }
                }}
            >

                <button className={`fixed top-32 right-8 z-50 cursor-pointer transition duration-700 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsModalOpen(false)}>
                    <Close />
                </button>

                {selectedProject && <ProjectDetailsModal project={selectedProject} />}
            </div>

            <Title className="section-title absolute top-0 left-0 mt-[-8vh] md:mt-[-20vh]">Mijn projecten</Title>

            {projectsData.map((project, index) => (
                <div key={project.title} data-id={index} className={`${currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-1000 ease-in-out absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full`}>
                    <h3 className="project-title font-alegreya-sans-sc text-4xl max-sm:text-2xl text-center mb-4">{project.title}</h3>
                    <p className="project-excerpt font-alegreya-sans text-center w-full md:max-w-[70ch] mx-auto text-[clamp(0.875rem,5.172vw-0.224rem,1.5rem)]!">{project.excerpt}</p>
                </div>
            ))}

            <Swiper
                className="projects-swiper w-full overflow-x-hidden"
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
                    stretch: -20,
                    depth: 350,
                    modifier: 1,
                    slideShadows: false,
                }}
            >
                {projectsData.map((project) => (
                    <SwiperSlide
                        key={project.title}
                        className="relative mt-58 md:mt-50 w-62.5! md:w-103! shrink-0"

                        onClick={() => handleProjectSlideClick(project as Project)}
                    >
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
                                aria-hidden="true"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
