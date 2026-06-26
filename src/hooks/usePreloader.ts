import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function usePreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function preloadAssets() {
      try {
        // 1. Fetch portfolio images from Firestore
        const portfolioSnap = await getDocs(collection(db, 'portfolio'));
        const imagesToPreload = portfolioSnap.docs
          .map(doc => doc.data().image_path)
          .filter(path => !!path);

        // 2. Add some static assets if needed
        const staticAssets = [
          '/videos/hero-video.mp4',
          '/images/hero-poster.jpg'
        ];

        const allAssets = [...new Set([...imagesToPreload, ...staticAssets])];
        const total = allAssets.length;
        let loadedCount = 0;

        if (total === 0) {
          setProgress(100);
          setIsLoaded(true);
          return;
        }

        const promises = allAssets.map(src => {
          return new Promise((resolve) => {
            if (src.endsWith('.mp4')) {
              const video = document.createElement('video');
              video.src = src;
              video.oncanplaythrough = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / total) * 100));
                resolve(true);
              };
              video.onerror = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / total) * 100));
                resolve(true); // Don't block on error
              };
            } else {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / total) * 100));
                resolve(true);
              };
              img.onerror = () => {
                loadedCount++;
                setProgress(Math.round((loadedCount / total) * 100));
                resolve(true);
              };
            }
          });
        });

        await Promise.all(promises);
        
        // Ensure at least a short delay for smooth transition
        setTimeout(() => {
          setProgress(100);
          setIsLoaded(true);
        }, 800);

      } catch (error) {
        console.error("Preload error:", error);
        setIsLoaded(true); // Fallback to let user in
      }
    }

    preloadAssets();
  }, []);

  return { progress, isLoaded };
}
