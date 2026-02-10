import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AiOutlineSpotify } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";

const tags = ['SON', 'GAMER', 'DEVELOPER', 'DESIGNER', 'COOL KID'];
const features = ['Awwwards', 'Lapa Ninja', 'Land Book', 'Flux Academy'];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(imageRef.current,
        { y: 100 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Tags stagger animation
      const tagElements = tagsRef.current?.querySelectorAll('.tag-item');
      if (tagElements) {
        gsap.fromTo(tagElements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tagsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Bio text reveal
      gsap.fromTo('.bio-text',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bio-text',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Features fade in
      gsap.fromTo('.feature-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-list',
            start: 'top 85%',
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
      id="about"
      className="relative bg-black py-32"
    >
      <div className="px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Image */}
          <div className="relative">
            <div
              ref={imageRef}
              className="aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src="/images/me.jpg"
                alt="Shrey Chandpa"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60 mb-1">Shrey Chandpa</p>
                  <p className="text-lg font-medium">@shreykc</p>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/neezdutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={30}/>
                  </a>
                  <a
                    href="https://open.spotify.com/user/vf6lfrdwpzqwinjvxjpdlv5rr?si=5d1ab50297774fd1"
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Spotify"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineSpotify size={30}/>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="lg:pt-12">
            {/* Tags */}
            <div ref={tagsRef} className="flex flex-wrap gap-3 mb-12">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag-item tag"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bio */}
            <div className="bio-text space-y-6 mb-16">
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                I'm a 21-year-old developer and designer from Mumbai, India. I've been
                building websites and apps since I was 18, and I'm passionate about creating
                beautiful, user-friendly digital experiences.
              </p>
            </div>

            {/* Beyond Design section */}
            <div className="mb-16">
              <h3 className="text-caption text-white/40 mb-4">BEYOND DESIGN</h3>
              <h4 className="text-2xl font-semibold mb-4">
                What makes me, me
              </h4>
              <p className="text-body text-white/70 leading-relaxed">
                When I'm not designing, I'm playing games with my homies, on fun dates with my girlfriend, or exploring new
                places or always eating anything ( I know it doesn't look as such ).
              </p>
            </div>

            {/* Featured in */}
            <div>
              <h3 className="text-caption text-white/40 mb-6">WANT TO GET FEATURED IN</h3>
              <div className="features-list flex flex-wrap gap-4">
                {features.map((feature, index) => (
                  <span
                    key={index}
                    className="feature-item text-sm font-medium text-white/70"
                  >
                    {feature}
                    {index < features.length - 1 && (
                      <span className="ml-4 text-white/30">&</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
