import React, { useState, useEffect, useRef } from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-4 sm:p-6 rounded-lg shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-[1.02] hover:-translate-y-3 ${className} ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'
      }`}
    >
      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Section;
