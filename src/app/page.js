import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/SkillCloud';
// import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Credentials from '@/components/Credentials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CursorTrails from '@/components/CursorTrails';
import CurveSwipe from '@/components/CurveSwipe';

export default function Home() {
  return (
    <>
      <CursorTrails />
      <CurveSwipe />
      <Navbar />
      <main>
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
