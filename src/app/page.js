import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Specialized from '@/components/Specialized';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AOSWrapper from '@/components/AOSWrapper';

export default function Home() {
  return (
    <AOSWrapper>
      <div className="min-h-screen bg-black overflow-x-hidden w-full max-w-full">
        <Navbar />
        <Hero />
        <Specialized />
        <About />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </AOSWrapper>
  );
}

