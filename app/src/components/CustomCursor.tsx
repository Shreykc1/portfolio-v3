import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(checkTouch);
    if (checkTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(animate);
    };

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
