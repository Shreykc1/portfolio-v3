import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'SERVICES', href: '#services' },
  { label: 'ABOUT', href: '#about' },
  { label: 'TESTIMONIALS', href: '#testimonials' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {

    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: 'expo.out'
      }
    );
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight">SC</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="nav-link text-xs font-sans tracking-widest text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#connect"
            onClick={(e) => handleClick(e, '#footer')}
            className="px-6 py-2.5 bg-white text-black text-xs font-medium tracking-widest rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            CONNECT
          </a>
        </div>
      </div>
    </nav>
  );
}
