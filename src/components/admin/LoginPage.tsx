import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { LogIn, Mail, Lock, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'google' | 'email'>('google');
  
  // Email/Password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkAdminStatus = async (user: any) => {
    // Check whitelist first
    if (user.email === 'firash@eliteproeventsksa.com') return true;
    
    // Then check Firestore
    try {
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      return adminDoc.exists();
    } catch (err) {
      console.error("Firestore check failed:", err);
      return false;
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const isAuthorized = await checkAdminStatus(result.user);
      
      if (!isAuthorized) {
        await auth.signOut();
        setError("Access denied. You are not authorized to access the admin panel.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.code === 'auth/popup-closed-by-user' ? null : (err.message || "An error occurred during login."));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const isAuthorized = await checkAdminStatus(result.user);

      if (!isAuthorized) {
        await auth.signOut();
        setError("Access denied. This account does not have admin privileges.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError("Authentication failed. Please try again.");
      }
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[0.65rem] tracking-wider uppercase leading-relaxed"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {loginMethod === 'google' ? (
              <motion.div
                key="google-pane"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-4 bg-white text-black font-medium uppercase tracking-[0.2em] text-[0.7rem] hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <Chrome size={16} />
                  {loading ? "Authenticating..." : "Sign in with Google"}
                </button>
                
                <div className="flex items-center gap-4 py-2">
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <span className="text-[0.6rem] text-white/30 uppercase tracking-widest">or</span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                <button
                  onClick={() => setLoginMethod('email')}
                  className="text-[0.65rem] text-brand-teal uppercase tracking-[0.2em] hover:text-white transition-colors"
                >
                  Use Credentials
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="email-pane"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleEmailLogin}
                className="space-y-6 text-left"
              >
                <div className="space-y-2">
                  <label className="text-[0.6rem] text-white/40 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-4 text-white text-xs outline-none focus:border-brand-teal transition-all"
                      placeholder="admin@elitepro.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[0.6rem] text-white/40 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-4 text-white text-xs outline-none focus:border-brand-teal transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-brand-teal text-black font-medium uppercase tracking-[0.2em] text-[0.7rem] hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                >
                  <LogIn size={16} />
                  {loading ? "Verifying..." : "Login to Dashboard"}
                </button>

                <button
                  type="button"
                  onClick={() => setLoginMethod('google')}
                  className="w-full text-center text-[0.6rem] text-white/30 uppercase tracking-widest mt-4 hover:text-white transition-colors"
                >
                  Back to Google Sign-in
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-12 text-white/30 text-[0.6rem] uppercase tracking-widest leading-relaxed">
          Authorized personnel only.<br />All access is logged and monitored.
        </p>
      </motion.div>
    </div>
  );
}
