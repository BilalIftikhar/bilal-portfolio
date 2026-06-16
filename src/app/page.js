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
      <main className="bg-night overflow-x-hidden">
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
