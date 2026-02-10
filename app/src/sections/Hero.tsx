import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Initial reveal animation
      const tl = gsap.timeline({ delay: 1.8 });

      // Grid lines draw animation
      tl.fromTo(gridRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 1, ease: 'power3.out' },
        0
      );

      // Name characters fly in
      tl.fromTo('.name-char',
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: 'expo.out'
        },
        0.2
      );

      // Tagline
      if (taglineRef.current) {
        tl.fromTo(taglineRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.8
        );
      }

      // Gradient wave
      if (gradientRef.current) {
        tl.fromTo(gradientRef.current,
          { y: 200, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          0.4
        );
      }

      // Scroll parallax animations
      if (nameRef.current) {
        gsap.to(nameRef.current, {
          y: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameChars = 'SHREY'.split('');
  const nameChars2 = 'CHANDPA'.split('');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Grid lines */}
      <div
        ref={gridRef}
        className="grid-lines"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Large name typography */}
        <div className="flex-1 flex flex-col items-center justify-center pt-20">
          <div ref={nameRef} className="relative">
            {/* First line */}
            <div className="text-display  text-white max-sm:mr-32 text-center flex justify-center gap-2 tracking-tightest lg:gap-0">
              {nameChars.map((char, i) => (
                <span key={i} className="name-char inline-block max-sm:text-7xl ">
                  {char}
                </span>
              ))}
            </div>


            {/* Second line */}
            <div className="text-display  text-white text-center flex justify-center gap-2 tracking-tightest lg:gap-0 mt-2">
              {nameChars2.map((char, i) => (
                <span key={i} className="name-char inline-block max-sm:text-7xl">
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section with tagline and meta */}
        <div className="relative z-20 pb-8">
          {/* Tagline */}
          <div
            ref={taglineRef}
            className="px-6 lg:px-12 mb-8"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-hl leading-tight max-w-4xl">
              Crafting Digital <em className="font-gli text-4xl md:text-6xl lg:text-7xl">Designs</em> that
              <br />
              Elevate SaaS & AI Innovators
            </h1>
          </div>

          {/* Bottom meta row */}
          <div className="flex items-center justify-between px-6 lg:px-12 text-xs tracking-widest text-white/60">
            <span>©{new Date().getFullYear()}</span>
            <span>BASED IN MUMBAI</span>
            <span>CREATIVE DEVELOPER</span>
          </div>

          {/* Client logos */}
          <div className="flex items-center justify-center gap-8 lg:gap-16 mt-8 px-6">
            <span className="text-sm font-medium text-white/40 tracking-wider">GAM</span>
            <span className="text-sm font-medium text-white/40 tracking-wider">THESYSTEMSBOSS</span>
            <span className="text-sm font-medium text-white/40 tracking-wider">PHARSALUS</span>
            <span className="text-sm font-medium text-white/40 tracking-wider hidden sm:inline">EXPERT INSIGHTS</span>
          </div>
        </div>

        {/* Orange gradient wave */}
        <div
          ref={gradientRef}
          className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 120% 100% at 50% 100%, #FF4D00 0%, #FF6B00 30%, #FF8533 60%, transparent 100%)',
            filter: 'blur(60px)',
            opacity: 0.9
          }}
        />
      </div>
    </section>
  );
}
