import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import AIExpertise from '@/components/sections/AIExpertise';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import MarqueeStrip from '@/components/ui/MarqueeStrip';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* overflow-x-clip, not -hidden: `hidden` makes this element a scroll
          container, which disables `position: sticky` for the pinned projects
          section nested inside it. */}
      <main className="bg-night overflow-x-clip">
        <Hero />
        <MarqueeStrip />
        <About />
        <Skills />
        <AIExpertise />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
