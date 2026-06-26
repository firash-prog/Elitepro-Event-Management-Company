/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bio from './components/Bio';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Lab from './components/Lab';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative selection:bg-brand-accent selection:text-brand-dark">
      <Preloader />
      <Navbar />
      <Hero />
      <Bio />
      <Services />
      <CaseStudies />
      <Lab />
      <Footer />
    </main>
  );
}
