import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const { loginWithRedirect, isLoading } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [manualLoading, setManualLoading] = useState(false);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualLoading(true);
    // Mimic API delay
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        // Ideally redirect here
      } else {
        alert(`Login failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setManualLoading(false);
    }
  };

  const handleSocialLogin = (connection: string) => {
    loginWithRedirect({
      authorizationParams: { connection }
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F3F4F6]">
        <Loader2 className="h-10 w-10 animate-spin text-[#059669]" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F3F4F6] flex items-center justify-center p-4">

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#059669]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#F97316]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden p-8 md:p-10">

          <div className="text-center mb-10">
            {/* Logo Placeholder - You might want to replace this with a real img tag if you have a logo */}
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[#059669] to-[#047857] shadow-lg mb-6 text-white">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2937] tracking-tight">Welcome Back</h1>
            <p className="text-[#6B7280] mt-3 text-sm font-medium">Please sign in to continue</p>
          </div>

          {/* Social Logins */}
          <div className="space-y-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin('google-oauth2')}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-[#1F2937] font-semibold py-3.5 px-6 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin('apple')}
              className="w-full flex items-center justify-center gap-3 bg-black text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-200"
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.36-.16-.7-.28-1.04-.37-.8-.19-1.57-.14-2.18.23l-.11.07c-1.12.75-2.21.72-3.15.22-.09-.05-.18-.09-.27-.15-2.6-1.54-4.2-6.52-1.68-10.84 1.25-2.15 3.51-3.51 5.92-3.56.09 0 .18 0 .28 0 1.25.04 2.22.42 2.9.8.54.29 1 .53 1.34.53s.8-.24 1.34-.53c.89-.47 2.15-.81 3.6-.66 1.48.16 2.76.77 3.73 1.76-.11.07-.46.29-1.39.84-2.11 1.24-2.5 4.38-.93 6.94 0 .01.01.01.01.02.5.81 1.08 1.4 1.58 1.75l.13.09c-.48 1.37-1.15 2.45-1.95 3.34-.23.25-.46.48-.69.7l-.36.4zm-4.78-18.7c.05 2.22-1.77 4.2-3.9 4.34-.05-.14-.09-.27-.14-.41-.5-1.51-.12-3.14 1.01-4.26 1.15-1.14 2.87-1.37 3.03.33z" />
              </svg>
              <span>Continue with Apple</span>
            </motion.button>
          </div>

          <div className="relative flex py-2 items-center mb-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">or sign in with email</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleManualLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1F2937] mb-2" htmlFor="email">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] transition-all outline-none placeholder:text-gray-400 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-[#1F2937]" htmlFor="password">Password</label>
                <a href="#" className="text-sm font-semibold text-[#059669] hover:text-[#047857] transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] transition-all outline-none placeholder:text-gray-400 font-medium"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={manualLoading}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-3.5 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.23)] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {manualLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#6B7280] text-sm">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-[#059669] hover:text-[#047857] transition-colors">
                Create an account
              </a>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;
