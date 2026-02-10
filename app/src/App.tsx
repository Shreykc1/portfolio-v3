import { useEffect, useRef } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Services from './sections/Services';
import Process from './sections/Process';
import About from './sections/About';
import Testimonials from './sections/Testimonials';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import './App.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const skewRef = useRef(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP ticker for Lenis
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Momentum skew effect
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      const targetSkew = velocity * 0.02;
      skewRef.current += (targetSkew - skewRef.current) * 0.1;

      const skewContainer = document.querySelector('.skew-container');
      if (skewContainer) {
        gsap.set(skewContainer, {
          skewY: skewRef.current,
          force3D: true
        });
      }
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      <div className="skew-container">
        <main className="relative bg-black text-white overflow-hidden">
          <Hero />
          <Work />
          <Services />
          <Process />
          <About />
          <Testimonials />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
