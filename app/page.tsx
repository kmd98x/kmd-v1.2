import Image from "next/image";
import Header from "./components/sections/Header";
import About from "./components/sections/About";

export default function Home() {
	return (
		<main>
			<Header />
			<About />
		</main>
	);
}
