import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false)
    });

    // Logo animation
    tl.fromTo(logoRef.current,
      { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
    )
      .to(logoRef.current,
        { scale: 0.9, opacity: 0, duration: 0.4, delay: 0.3, ease: 'power2.in' }
      )
      // Curtain wipe up
      .to(screenRef.current,
        { yPercent: -100, duration: 0.8, ease: 'expo.inOut' },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={screenRef}
      className="loading-screen"
    >
      <div
        ref={logoRef}
        className="text-white text-6xl font-bold tracking-tighter"
      >
        SC
      </div>
    </div>
  );
}
