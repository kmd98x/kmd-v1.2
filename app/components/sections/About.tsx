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
		const mm = gsap.matchMedia();

		// Shorter pin duration for the title on small screens so it ends faster
		mm.add(
			{
				isSmall: "(max-width: 768px)",
				isLarge: "(min-width: 769px)",
			},
			(context) => {
				const { isSmall } = context.conditions as { isSmall: boolean };
				const pinEnd = isSmall ? "40% center" : "50% center";

				// Fade in — stop when the pin starts so opacity is not fought later
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

				// Pin wrapper (not the title); fade out in the last part of the pin scroll
				gsap.timeline({
					scrollTrigger: {
						trigger: section.current,
						start: "-50% top",
						end: pinEnd,
						pin: ".title-pin-wrap",
						scrub: true,
						anticipatePin: 1,
					},
				}).to(".section-title", { opacity: 0.5, y: 0, ease: "none", duration: 0.45 })
			}
		);

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
		<section ref={section} className="relative h-[80vh] min-h-220 w-screen" id="over-mij">
			<div className="title-pin-wrap w-full">
				<Title className="section-title mt-[-10vh]">Over mij</Title>
			</div>

			<p className="about-text text-[clamp(0.875rem,5.172vw-0.224rem,1.5rem)]! font-alegreya-sans absolute top-32 sm:top-40 left-1/2 -translate-x-1/2 mt-[10vh] w-[88%] sm:w-[80%] max-w-[65ch]">
				Ik ben Martina Doekharan, 4ᵉ jaars student Communication and Multimedia Design aan de Hogeschool van Amsterdam. Ik ben geïnteresseerd in visual design en alles wat daarbij komt kijken: van typografie en compositie tot kleur en visuele hiërarchie. Op dit moment loop ik stage bij Savvy, waar ik veel leer door mee te werken aan echte projecten. Daar merk ik steeds meer hoeveel ik het leuk vind om ideeën visueel te vertalen en te kijken hoe een ontwerp sterker kan worden. Voor mijn afstuderen ben ik op zoek naar een plek waar ik dit verder kan ontdekken, mijn skills kan inzetten en vooral veel kan leren in de praktijk.
			</p>
		</section>
	)
}
