import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface FirebaseContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  isAdmin: false,
  loading: true,
});

export const useFirebase = () => useContext(FirebaseContext);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Check if user is in the admins collection
        try {
          // Add a timeout or check if we are in a valid state
          const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
          setIsAdmin(adminDoc.exists() || currentUser.email === 'firash@eliteproeventsksa.com');
        } catch (error: any) {
          console.error("Error checking admin status:", error);
          // Fallback to email whitelist if Firestore check fails (e.g. offline/unavailable)
          const isWhitelisted = currentUser.email === 'firash@eliteproeventsksa.com';
          setIsAdmin(isWhitelisted);
          
          if (error.code === 'unavailable') {
            console.warn("Firestore unavailable - operating in degraded mode");
          }
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
}
