"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    // Redirect to NextAuth Roblox provider
    await signIn("roblox", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-100 dark:bg-white/5 p-10 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-blue-500/20 blur-[100px] z-0 rounded-full" />
        
        <div className="relative z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Link your Roblox account to access community features and trading hubs.
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-gray-900 dark:text-white bg-[#000000] hover:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all shadow-lg overflow-hidden border-gray-200 dark:border-white/20"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  {/* Mock Roblox Logo */}
                  <path d="M4.5 12L12 4.5L19.5 12L12 19.5L4.5 12ZM10.5 12L12 10.5L13.5 12L12 13.5L10.5 12Z" />
                </svg>
              )}
              {loading ? "Authenticating..." : "Sign in with Roblox"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-200 text-center">
            🔒 <strong>Secure Login:</strong> You will be redirected to the official Roblox.com website. We never see, ask for, or store your password.
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By logging in, you agree to our <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a>.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
