import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';

const testimonials = [
  {
    quote: "Shrey's process was hugely beneficial in defining our brand and business goals. The subsequent designs helped us demonstrate our position as a credible leader in the industry. We're incredibly happy with the results.",
    name: 'Craig MacAlpine',
    role: 'Founder of Expert Insights',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    quote: "Shrey delivered sleek, user-friendly product and website designs that perfectly captured our brand. The final result looks amazing, functions flawlessly, and exceeded our expectations. Highly recommend!",
    name: 'Tony Pao',
    role: 'Co-Founder of SocialLead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    quote: "Shrey is really the best designer you can get. He pays attention to details, acts professionally, and asks insightful questions that ultimately lead to outstanding designs that match the ethos of the brand.",
    name: 'Jonathan Clavet-Grenier',
    role: 'CEO of RevolutionAI',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face'
  },
  {
    quote: "The branding workshop was a concise and valuable way to refine our brand. Shrey simplified complex ideas into clear, visually appealing designs, and we were thrilled with the outcome.",
    name: 'Zach van Driel',
    role: 'Co-Founder of Miri Marketing',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
  },
  {
    quote: "Shrey consistently delivers top-quality work and guided our team on brand implementation. His strategy workshop was engaging and results-driven, and his process was seamless and flexible throughout.",
    name: 'Gabriela Gocheva',
    role: 'CEO of Autism Spectrum Reach',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    quote: "Shrey's brand workshop was remarkably enjoyable and exactly what we needed. The result was a clearly defined strategic direction and a brand identity, and website that positioned us as a leading productivity platform.",
    name: 'Malte Scholz',
    role: 'Founder of airfocus',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face'
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Cards fade up with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-black py-32"
    >
      <div className="px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-caption text-white/40">TESTIMONIALS</span>
          <h2 className="text-heading font-bold mt-4">What Clients Say</h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="testimonial-card"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-black/20 mb-6" />

              {/* Quote text */}
              <p className="text-lg text-black/80 leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-black">{testimonial.name}</p>
                  <p className="text-sm text-black/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
