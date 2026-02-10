import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  {
    id: '01',
    title: 'GAM',
    description: 'GAM is a consortium of physicians creating novel metrics of healthcare quality.',
    industry: 'Healthcare',
    year: '©2024',
    deliverables: ['WEB DESIGN', 'BRAND IDENTITY', 'PRODUCT DESIGN', 'BRAND STRATEGY'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop',
    link: '#'
  },
  {
    id: '02',
    title: 'Pharsalus',
    description: 'Pharsalus Capital invests in companies and protocols that expand cryptocurrency access in emerging markets, promoting financial inclusion and property rights.',
    industry: 'WEB3',
    year: '©2024',
    deliverables: ['WEB DESIGN', 'INVESTOR DECK', 'BRAND IDENTITY', 'FRAMER DEVELOPMENT'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&h=900&fit=crop',
    link: '#'
  },
  {
    id: '03',
    title: 'TheSystemsBoss',
    description: 'Helping companies boost productivity, profit, and build industry-leading teams through strategic growth systems.',
    industry: 'AI Automation',
    year: '©2025',
    deliverables: ['WEB DESIGN', 'BRAND IDENTITY', 'BRAND STRATEGY', 'FRAMER DEVELOPMENT'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop',
    link: '#'
  },
  {
    id: '04',
    title: 'Expert Insights',
    description: 'Expert Insights is a cybersecurity research platform providing expert reviews, buyer\'s guides, and industry insights to help businesses find the best security solutions.',
    industry: 'Cybersecurity',
    year: '©2024',
    deliverables: ['WEB DESIGN', 'BRAND IDENTITY', 'PRODUCT DESIGN', 'BRAND STRATEGY'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&h=900&fit=crop',
    link: '#'
  }
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Animate each project card on scroll
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Entrance animation
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Image parallax
        const img = card.querySelector('.project-image');
        if (img) {
          gsap.to(img, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }

        // Stacking effect for previous cards
        if (index > 0) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'top 20%',
            scrub: true,
            onUpdate: (self: { progress: number }) => {
              const prevCard = cardsRef.current[index - 1];
              if (prevCard) {
                gsap.set(prevCard, {
                  scale: 1 - self.progress * 0.05,
                  filter: `brightness(${1 - self.progress * 0.5})`
                });
              }
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-black py-20"
    >
      <div className="px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-caption text-white/40">SELECTED WORK</span>
        </div>

        {/* Project cards */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="work-card relative"
            >
              {/* Project image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl img-hover mb-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* View project button */}
                <a
                  href={project.link}
                  className="absolute bottom-6 right-6 flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  data-cursor-hover
                >
                  VIEW PROJECT
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Project info */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Title and index */}
                <div className="lg:col-span-6 flex items-start justify-between">
                  <h2 className="text-subheading font-bold">{project.title}</h2>
                  <span className="text-caption text-white/40">({project.id})</span>
                </div>

                {/* Description */}
                <div className="lg:col-span-3">
                  <p className="text-body text-white/70">{project.description}</p>
                </div>

                {/* Metadata */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Industry</span>
                    <span className="text-white/70">{project.industry}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Published</span>
                    <span className="text-white/70">{project.year}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-white/40 text-sm block mb-2">Deliverables</span>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((item, i) => (
                        <span
                          key={i}
                          className="text-xs text-white/60 tracking-wider"
                        >
                          {item}{i < project.deliverables.length - 1 && ','}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
