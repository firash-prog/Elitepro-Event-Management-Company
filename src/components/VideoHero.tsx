import { useEffect, useRef } from 'react';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              // Handle potential play() rejection (e.g. user hasn't interacted yet)
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="hero-video" style={{ zIndex: 0 }}>
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="auto"
        poster="/images/hero-poster.jpg"
        className="hero-video__bg"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      
      <div className="hero-video__overlay" />
      
      <div className="hero-video__content">
        <span className="hero-video__label">ELITE PRO EVENTS & ADVERTISING</span>
        <h1 className="hero-video__title">
          ARCHITECTS OF<br />LUXURY EXPERIENCES
        </h1>
        <p className="hero-video__subtitle">
          We engineer high-fidelity spatial events for forward-thinking brands.
        </p>
        <a 
          href="#showcases" 
          className="hero-video__cta"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('showcases')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          EXPLORE OUR WORK
        </a>
      </div>
      
      <div className="hero-video__scroll">
        <span>SCROLL</span>
      </div>
    </section>
  );
}
