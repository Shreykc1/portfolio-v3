import { useEffect, useRef } from 'react';
import { ArrowUpRight, Linkedin, Instagram, Youtube } from 'lucide-react';
import gsap from 'gsap';

const footerLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Connect', href: '#connect' },
  { label: 'Privacy Policy', href: '#privacy-policy' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shreychandpa/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/neezdutz/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/channel/UClfcLZnNC1p-aL1_04A9nUg', label: 'YouTube' },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Footer reveal animation
      gsap.fromTo(sectionRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Marquee speed increase on hover
      const marquee = marqueeRef.current;
      if (marquee) {
        marquee.addEventListener('mouseenter', () => {
          gsap.to(marquee.querySelector('.marquee-content'), {
            duration: 10,
            ease: 'none'
          });
        });

        marquee.addEventListener('mouseleave', () => {
          gsap.to(marquee.querySelector('.marquee-content'), {
            duration: 20,
            ease: 'none'
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative bg-black pt-32 pb-8"
    >
      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="marquee mb-16 overflow-hidden"
      >
        <div className="marquee-content flex">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-[15vw] font-bold text-white/10 whitespace-nowrap mx-8"
            >
              LET'S CHAT
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mb-24">
        <a
          href="mailto:shrey.work.dev@gmail.com"
          className="btn-primary group"
          data-cursor-hover
        >
          Book Discovery Call
          <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>

      {/* Footer content */}
      <div className="px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/15">
          {/* Logo */}
          <div className="lg:col-span-4">
            <a href="#" className="inline-block">
              <span className="text-4xl font-bold tracking-tight">
                SHREY
                <br />
                CHANDPA
              </span>
            </a>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4">
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="nav-link text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
            <a
              href="mailto:shrey.work.dev@gmail.com"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              shrey.work.dev@gmail.com
            </a>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all"
                  aria-label={social.label}
                  data-cursor-hover
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-white/40">
            ©SC {new Date().getFullYear()}
          </p>
          <a
            href="#"
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
