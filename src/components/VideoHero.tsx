export default function VideoHero() {
  return (
    <section className="hero-video">
      <video 
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
        <div className="hero-video__line" />
        <h1 className="hero-video__title">
          TURNKEY CORPORATE EVENT MANAGEMENT<br />
          & EXHIBITION PRODUCTION ACROSS<br />
          KSA & UAE
        </h1>
        <p className="hero-video__subtitle">
          End-to-end event design, physical fabrication, technical logistics, 
          and on-site operations serving Riyadh, Jeddah, Dammam, and Dubai.
        </p>
        <a 
          href="#rfq-engine" 
          className="hero-video__cta"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('rfq-engine')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          LAUNCH INTERACTIVE RFQ ENGINE
        </a>
      </div>
      
      <div className="hero-video__scroll">
        <span>SCROLL</span>
        <div className="hero-video__chevron" />
      </div>
    </section>
  );
}
