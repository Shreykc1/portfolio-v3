import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const stats = [
  { value: '5+', label: 'Happy Clients' },
  { value: '10x', label: 'Increased revenue by' },
  { value: '784%', label: 'Increased website traffic by' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Word reveal animation for heading
      const words = headingRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(words,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Paragraph reveal
      gsap.fromTo('.process-paragraph',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-paragraph',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(statItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = 'Strategy comes first.'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32"
    >
      <div className="px-6 lg:px-12">
        {/* Section label */}
        <div className="mb-8">
          <span className="text-caption text-white/40">PROCESS</span>
        </div>

        {/* Main heading with word reveal */}
        <h2 ref={headingRef} className="text-heading font-bold mb-12 overflow-hidden">
          {headingWords.map((word, i) => (
            <span key={i} className="word-wrapper mr-4">
              <span className="word inline-block">{word}</span>
            </span>
          ))}
        </h2>

        {/* Process description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          <div className="process-paragraph">
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              We start with a brand discovery survey and workshop to define your mission,
              brand keywords, and market positioning. We analyse competitors, target audiences,
              and business goals, mapping out the site structure and product user flow to create
              a solid foundation.
            </p>
          </div>
          <div className="process-paragraph">
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Next I design your visual identity, including your logo, typography, color palette
              and graphics. Then I roll out that identity across your website, product and marketing
              materials to ensure a seamless, cohesive brand presence.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              Finally, we launch. I build your website in React or Next JS
              for a seamless rollout. Every detail is refined to ensure your brand, website and product
              are ready to make an impact.
            </p>
          </div>
        </div>

        {/* Client outcomes stats */}
        <div ref={statsRef} className="border-t border-white/15 pt-16">
          <span className="text-caption text-white/40 block mb-12">CLIENT OUTCOMES</span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value text-white mb-4">{stat.value}</div>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
