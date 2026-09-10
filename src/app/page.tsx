import SmoothScroll from "@/components/SmoothScroll";
import Scene from "@/components/Scene";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative w-full text-white">
        <Scene />
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Achievements />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
