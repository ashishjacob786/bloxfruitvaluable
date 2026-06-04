import React from "react";
import Link from "next/link";
import { ArrowLeft, Target, Users, Zap, Shield, HelpCircle, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about the mission and team behind BloxFruitValuable.com",
  alternates: {
    canonical: "https://www.bloxfruitvaluable.com/about",
  },
  openGraph: {
    title: "About Us | BloxFruitValuable",
    description: "Learn about the mission and team behind BloxFruitValuable.com",
    url: "https://www.bloxfruitvaluable.com/about",
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container px-4 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition text-sm font-bold mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">About Us</h1>
            <p className="text-xl text-blue-400 font-medium">
              Welcome to Blox Fruit Valuable (bloxfruitvaluable.com)—the most trusted, real-time trading companion for the Blox Fruits community.
            </p>
          </div>

          <div className="space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            
            <section className="relative">
              <div className="absolute -left-4 md:-left-8 top-0 text-blue-500/20">
                <Target className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-400" /> Our Mission
                </h2>
                <p className="mb-4">
                  Trading in Blox Fruits is incredibly exciting, but it can also be frustrating. Between outdated static value lists, market manipulation, and the constant fear of taking an "L" (Loss) on a trade, players needed a reliable source of truth.
                </p>
                <p>
                  That's exactly why Blox Fruit Valuable was created. Our mission is simple: to <strong className="text-gray-900 dark:text-white">protect the Blox Fruits community from bad trades and scams</strong> by providing the fastest, most accurate, and most user-friendly trading tools on the internet.
                </p>
              </div>
            </section>

            <section className="relative bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 rounded-3xl">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" /> Who We Are
              </h2>
              <p className="mb-4">
                We aren't just another generic gaming blog. Blox Fruit Valuable is built by a passionate team of professional developers and digital tool creators who understand both modern web technology and the complex economy of Blox Fruits.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6 mb-4">
                <div className="bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 p-4 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center font-bold text-blue-400">AJ</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Ashish Jacob</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lead Developer & Data Analyst</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 p-4 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center font-bold text-purple-400">TR</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">TradeReview Team</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Market Value Experts</p>
                  </div>
                </div>
              </div>
              <p>
                We love building high-performance, scalable platforms. By leveraging modern tech, we ensure that our site doesn't just look good, but performs flawlessly—whether you are quickly checking a fruit's value on your phone mid-trade or chatting with other players on your desktop.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 text-center">What Sets Us Apart?</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-gray-200 dark:border-white/10 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" /> Real-Time Data, Not Guesswork
                  </h3>
                  <p className="text-sm">Unlike older platforms that update their lists once a month, our values and demand metrics are constantly adjusted based on active community trends, game updates, and real market shifts.</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-gray-200 dark:border-white/10 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-emerald-400" /> The Ultimate Trading Hub
                  </h3>
                  <p className="text-sm">We don't just give you the numbers. With our integrated Community Chat, you can securely connect, negotiate, and plan trades with other active players.</p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-gray-200 dark:border-white/10 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" /> Security First
                  </h3>
                  <p className="text-sm">We care about your safety. By using official Roblox authentication for our community features, we ensure that you can interact with verified players without ever compromising your password or account security.</p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-gray-200 dark:border-white/10 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-pink-400" /> 100% Free Tools
                  </h3>
                  <p className="text-sm">From our advanced Trade Calculator to our live value lists for Fruits, Gamepasses, and Limiteds, everything on our platform is completely free to use.</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-3xl p-8 text-center mt-12">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Join the Community</h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Blox Fruit Valuable is more than just a website; it's a growing community of smart traders. We are constantly updating our platform, adding new features, and squashing bugs to give you the best experience possible.
              </p>
              
              <div className="mb-8">
                <p className="text-gray-900 dark:text-white font-medium">If you have suggestions, spot a bug, or just want to say hi, we'd love to hear from you!</p>
                <div className="mt-4 inline-block bg-white dark:bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-gray-200 dark:border-white/10">
                  <span className="text-gray-600 dark:text-gray-400 mr-2">Email:</span>
                  <a href="mailto:admin@bloxfruitvaluable.com" className="text-gray-900 dark:text-white font-bold hover:text-blue-400 transition">admin@bloxfruitvaluable.com</a>
                </div>
              </div>
              
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Trade smart, stay safe, and secure those W's!
              </p>
              <p className="mt-4 font-medium text-gray-600 dark:text-gray-400">
                — The Blox Fruit Valuable Team
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
