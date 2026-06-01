"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Title from "../global/Title";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
	const section = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// Fade in — stop when the pin starts so opacity is not fought later
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

		// Pin wrapper (not the title); fade out in the last part of the pin scroll
		gsap.timeline({
				scrollTrigger: {
					trigger: section.current,
					start: "-50% top",
					end: "bottom center",
					pin: ".title-pin-wrap",
					scrub: true,
					anticipatePin: 1,
				},
			})
			.to(".section-title", { opacity: 0.4, y: 0, ease: "none", duration: 0.45 })
			.to(".section-title", { opacity: 0, y: -30, ease: "none", duration: 0.55 });

		SplitText.create(".about-text", {
			type: "words",
			mask: "words",
			onSplit: (self) => {
				return gsap.from(self.words, {
					scrollTrigger: {
						trigger: section.current,
						start: "-50% top",
						end: "center center",
						scrub: true,
					},
					autoAlpha: 0.02,
					duration: 1,
					stagger: 0.1,
				})
			}
		});
	}, { scope: section });

	return (
		<section ref={section} className="relative h-[80vh] w-screen">
			<div className="title-pin-wrap w-full">
				<Title className="section-title">Over mij</Title>
			</div>

			<p className="about-text text-[clamp(1rem,1.5vw+1rem,2rem)] md:max-w-[60ch] min-[1440px]:max-w-[64ch] max-md:pr-8 font-alegreya-sans absolute top-40 left-1/2 -translate-x-1/2 inline-block mt-[10vh]">
				Ik ben Martina Doekharan, 3ᵉ jaars student Communication and Multimedia Design aan de Hogeschool van Amsterdam en ben afkomstig uit Suriname. Mijn focus ligt op visual design. Het creëren van digitale producten die niet alleen functioneel zijn, maar ook visueel overtuigen en gebruikers raken. Momenteel volg ik mijn 2e minor Visual Interface Design, waar ik mijn vaardigheden in compositie, typografie en visuele hiërarchie verder ontwikkel. Het mooiste vind ik wanneer design niet alleen goed werkt, maar ook impact maakt. Daar wil ik me tijdens mijn stage op richten.
			</p>
		</section>
	)
}
