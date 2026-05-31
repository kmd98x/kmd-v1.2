"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
	const section = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		gsap.to('.section-title', {
			scrollTrigger: {
				trigger: section.current,
				start: "-75% top",
				end: "bottom center",
				scrub: true,
			},
			opacity: 0.4,
			duration: 1,
		});

		gsap.to('.section-title', {
			scrollTrigger: {
				trigger: section.current,
				start: "-50% top",
				pin: '.section-title',
				end: "bottom center",
				scrub: true,
			},
		});

		SplitText.create('.about-text', {
			type: 'words',
			maks: 'words',
			onSplit: (self) => {
				return gsap.from(self.words, {
					scrollTrigger: {
						trigger: section.current,
						start: "-50% top",
						end: "center center",
						scrub: true,
						markers: true,
					},
					autoAlpha: 0,
					duration: 1,
					stagger: 0.1,
				})
			}
		})
	}, { scope: section });

	return (
		<section ref={section} className='h-screen w-screen relative'>
			<h2 className="section-title text-[15rem] font-montez text-secondary text-center mt-[-320px] inline-block w-full opacity-0">
				Over mij
			</h2>

			<p className="about-text text-[clamp(1rem,1.5vw+1rem,2rem)] md:max-w-[60ch] min-[1440px]:max-w-[64ch] max-md:pr-8 font-alegreya-sans absolute top-40 left-1/2 -translate-x-1/2">
				Ik ben Martina Doekharan, 3ᵉ jaars student Communication and Multimedia Design aan de Hogeschool van Amsterdam en ben afkomstig uit Suriname. Mijn focus ligt op visual design. Het creëren van digitale producten die niet alleen functioneel zijn, maar ook visueel overtuigen en gebruikers raken. Momenteel volg ik mijn 2e minor Visual Interface Design, waar ik mijn vaardigheden in compositie, typografie en visuele hiërarchie verder ontwikkel. Het mooiste vind ik wanneer design niet alleen goed werkt, maar ook impact maakt. Daar wil ik me tijdens mijn stage op richten.
			</p>
		</section>
	)
}
