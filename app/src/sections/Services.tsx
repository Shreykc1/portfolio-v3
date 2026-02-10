import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const services = [
  {
    id: '01',
    title: 'STRATEGY',
    description: 'Clear, actionable plans to align business vision with long-term goals and measurable success.',
  },
  {
    id: '02',
    title: 'BRAND IDENTITY',
    description: 'Memorable designs that capture the essence of your brand and connect with your audience.',
  },
  {
    id: '03',
    title: 'WEB DESIGN',
    description: 'Beautiful, user-friendly websites that create seamless experiences and elevate your business.',
  },
  {
    id: '04',
    title: 'WEB DEVELOPMENT',
    description: 'Clean, performant code that brings designs to life with smooth interactions.',
  },
  {
    id: '05',
    title: 'WEB APPS',
    description: 'Scalable web applications built with modern technologies and best practices.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo('.service-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-black py-32"
    >
      <div className="px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-caption text-white/40">SERVICES</span>
        </div>

        {/* Services list */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-item border-t border-white/15 py-8 lg:py-12 cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-hover
            >
              <div className="flex items-start justify-between gap-8">
                {/* Title */}
                <div className="flex-1">
                  <h3
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-transform duration-500"
                    style={{
                      transform: hoveredIndex === index ? 'translateX(20px)' : 'translateX(0)',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description - expands on hover */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: hoveredIndex === index ? '100px' : '0',
                      opacity: hoveredIndex === index ? 1 : 0,
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <p className="text-body text-white/60 mt-4 max-w-xl">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Index and arrow */}
                <div className="flex items-center gap-8">
                  <span className="text-caption text-white/40">({service.id})</span>
                  <div
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500"
                    style={{
                      backgroundColor: hoveredIndex === index ? 'white' : 'transparent',
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <ArrowRight
                      className="w-5 h-5 transition-all duration-500"
                      style={{
                        color: hoveredIndex === index ? 'black' : 'white',
                        transform: hoveredIndex === index ? 'translateX(2px)' : 'translateX(0)',
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/15" />
        </div>
      </div>
    </section>
  );
}
