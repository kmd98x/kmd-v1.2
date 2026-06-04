import Header from "./components/sections/Header";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Footer from "./components/sections/Footer";

export default function Home() {
	return (
		<main>
			<Header />
			<About />
			<Projects />
			<Footer />
		</main>
	);
}
