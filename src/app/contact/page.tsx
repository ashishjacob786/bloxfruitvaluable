import React from "react";
import Link from "next/link";
import { ArrowLeft, Bug, TrendingUp, Briefcase, Mail, MessageCircle, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the BloxFruitValuable team for support, bug reports, and business inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | BloxFruitValuable",
    description: "Get in touch with the BloxFruitValuable team for support, bug reports, and business inquiries.",
    url: "https://www.bloxfruitvaluable.com/contact",
  },
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container px-4 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition text-sm font-bold mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Contact Us</h1>
            <p className="text-xl text-blue-400 font-medium max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question about a specific fruit's value, found a bug on the website, or want to discuss a business partnership, the Blox Fruit Valuable team is always here to help.
            </p>
          </div>

          <div className="space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            
            <section>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 text-center">How Can We Help You?</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-b from-red-900/20 to-transparent border border-red-500/20 p-6 rounded-2xl">
                  <div className="bg-red-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Bug className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Bug Reports & Technical Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If you are experiencing issues logging in with Roblox, using the Trade Calculator, or chatting in the Community Hub, please let us know. The more details you provide (like screenshots or device info), the faster we can squash the bug!
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-emerald-900/20 to-transparent border border-emerald-500/20 p-6 rounded-2xl">
                  <div className="bg-emerald-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Value Suggestions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Do you think a specific fruit or gamepass value is outdated? The Blox Fruits market moves fast! Drop us a message with your reasoning, and our team will analyze the community trends to see if an update is needed.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-purple-900/20 to-transparent border border-purple-500/20 p-6 rounded-2xl">
                  <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Business & Advertising</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    For sponsorship opportunities, AdSense queries, or other business-related inquiries, please reach out to us directly via email. We are always open to collaborating with creators and brands that benefit the Blox Fruits community.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Mail className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Mail className="w-8 h-8 text-blue-400" /> Get In Touch
                </h2>
                <p className="mb-6 max-w-2xl">
                  The fastest way to reach our admin and support team is via email. We aim to respond to all genuine inquiries within 24 to 48 hours.
                </p>
                
                <div className="mb-8 inline-flex items-center gap-4 bg-white dark:bg-black/60 border border-gray-200 dark:border-white/10 px-6 py-4 rounded-2xl">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider">Email Us</p>
                    <a href="mailto:admin@bloxfruitvaluable.com" className="text-xl md:text-2xl font-black text-gray-900 dark:text-white hover:text-blue-400 transition">
                      admin@bloxfruitvaluable.com
                    </a>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-xl p-4 flex gap-4 items-start max-w-2xl">
                  <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                  <p className="text-sm text-yellow-200/80">
                    <strong className="text-yellow-400">Note:</strong> Please do not share your personal Roblox passwords or sensitive account details with us via email. Our team will never ask for your password.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-3xl p-8 text-center mt-12">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Join the Community</h2>
              <p className="mb-8 max-w-2xl mx-auto">
                Don't want to wait for an email reply? The best place to get quick help, ask trading questions, or hang out with other players is right here in our Community Hub. Log in using your Roblox account to start chatting instantly!
              </p>
              
              <Link href="/trading" className="inline-block bg-blue-600 hover:bg-blue-500 text-gray-900 dark:text-white font-bold text-lg px-8 py-4 rounded-full transition shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1">
                Go to Community Hub
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
