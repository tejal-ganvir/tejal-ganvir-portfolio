import { MotionConfig } from "framer-motion";
import { Background, CursorGlow } from "./components/Background";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About, Contact, Experience, Footer, Marquee, Services, Skills, Work } from "./components/Sections";

export default function App() {
  return (
    // reducedMotion="user": anyone who turns on "reduce motion" in their OS gets a calm, static page.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Background />
      <CursorGlow />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
