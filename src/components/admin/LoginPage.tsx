import { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      // Check if this user is an admin
      const adminDoc = await getDoc(doc(db, 'admins', result.user.uid));
      
      if (!adminDoc.exists()) {
        await auth.signOut();
        setError("Access denied. You are not authorized to access the admin panel.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,175,150,0.05)_0%,transparent_100%)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-brand-dark/50 border border-brand-teal/10 p-12 text-center backdrop-blur-xl"
      >
        <h1 className="text-2xl font-sans font-light tracking-[0.3em] text-white uppercase mb-4">
          ELITEPRO
        </h1>
        <p className="text-brand-teal text-[0.7rem] font-medium uppercase tracking-[0.2em] mb-12">
          Admin Gateway
        </p>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs tracking-wider uppercase">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-brand-teal to-brand-teal-light text-black font-medium uppercase tracking-[0.2em] text-[0.7rem] hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? "Authenticating..." : "Sign in with Google"}
        </button>

        <p className="mt-12 text-white/30 text-[0.6rem] uppercase tracking-widest leading-relaxed">
          Authorized personnel only.<br />All access is logged and monitored.
        </p>
      </motion.div>
    </div>
  );
}
