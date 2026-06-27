import { useEffect, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState({
    video_path: '/videos/hero-video.mp4',
    poster_path: '/images/hero-poster.jpg',
    label: 'ELITE PRO EVENTS & ADVERTISING',
    title_line1: 'ARCHITECTS OF',
    title_line2: 'LUXURY EXPERIENCES',
    subtitle: 'We engineer high-fidelity spatial events for forward-thinking brands.',
    cta_text: 'EXPLORE OUR WORK',
    cta_link: '#showcases'
  });

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'settings', 'hero');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as any);
      }
    }
    fetchData();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <section className="hero-video" style={{ zIndex: 0 }}>
      <video 
        ref={videoRef}
        key={data.video_path} // Re-mount video when path changes
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="auto"
        poster={data.poster_path}
        className="hero-video__bg"
      >
        <source src={data.video_path} type="video/mp4" />
      </video>
      
      <div className="hero-video__overlay" />
      
      <div className="hero-video__content">
        <span className="hero-video__label">{data.label}</span>
        <h1 className="hero-video__title">
          {data.title_line1}<br />{data.title_line2}
        </h1>
        <p className="hero-video__subtitle">
          {data.subtitle}
        </p>
        <a 
          href={data.cta_link}
          className="hero-video__cta"
          onClick={(e) => {
            if (data.cta_link.startsWith('#')) {
              e.preventDefault();
              document.getElementById(data.cta_link.slice(1))?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {data.cta_text}
        </a>
      </div>
      
      <div className="hero-video__scroll">
        <span>SCROLL</span>
      </div>
    </section>
  );
}
