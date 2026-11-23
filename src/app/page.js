import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
// import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Credentials from '@/components/Credentials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import InteractiveDotGrid from '@/components/InteractiveDotGrid';

export default function Home() {
  return (
    <>
      <InteractiveDotGrid />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        {/* <Projects /> */}
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
