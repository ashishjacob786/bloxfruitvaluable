import Link from "next/link";
import { ArrowRight, TrendingUp, Calculator, ShieldCheck, Users } from "lucide-react";

const faqs = [
  {
    q: "What makes Blox Fruit Valuable the most accurate value list?",
    a: "Blox Fruit Valuable is designed to be the ultimate companion for Blox Fruits players. Unlike outdated static lists, our platform uses real-time market data to determine the true trading value of fruits, gamepasses, scrolls, and exclusive items. We constantly monitor community trades to ensure our values are the most accurate on the internet."
  },
  {
    q: "How often are the trading values updated on BloxFruitValuable.com?",
    a: "Our values are updated live! The Blox Fruits trading market changes rapidly with every game update or new awakening. Blox Fruit Valuable tracks these market shifts in real-time, adjusting the \"Value\" and \"Demand\" metrics instantly so you never take an \"L\" (Loss) on a trade."
  },
  {
    q: "What do the \"Value\" (e.g., 14.58B) and \"Demand\" (10/10) numbers mean?",
    a: "On Blox Fruit Valuable, the 'Value' represents the current economic worth of an item in the trading community (often measured in Millions or Billions). The 'Demand' score shows how actively players are searching for that item. A fruit with a 10/10 demand means it is highly sought after, making it incredibly easy to trade—often resulting in massive overpays!"
  },
  {
    q: "How do I use the Blox Fruit Valuable Calculator?",
    a: "Our built-in Blox Fruit Valuable Calculator takes the guesswork out of trading. Simply select the fruits or gamepasses you are offering, and add the items the other player is offering. Our calculator will instantly compare the real-time values and tell you if the trade is a \"W\" (Win), \"F\" (Fair), or \"L\" (Loss)."
  },
  {
    q: "Does Blox Fruit Valuable track Limiteds and Exclusive items?",
    a: "Yes, absolutely! We don't just track standard fruits. Our platform has dedicated sections for Gamepasses and highly sought-after Limiteds (like the Galaxy Empyrean Kitsune or Crimson Kitsune). You can use our category filters or the search bar to find exactly what you need."
  },
  {
    q: "What does the 'Trend' indicator show on the item cards?",
    a: "The Trend indicator (the small green or red arrows) on Blox Fruit Valuable helps you predict the market. An upward green trend means an item is gaining popularity and its trading value is rising. This is crucial information for traders looking to hold onto items as investments!"
  },
  {
    q: "How can I find good trades using the Trading Hub?",
    a: "The Trading Hub on BloxFruitValuable.com connects you directly with a massive community of active players. Once you check an item's worth on our value list, you can head over to the Trading Hub or our Community section to post your offers, find specific fruits, and negotiate deals safely."
  },
  {
    q: "Is Blox Fruit Valuable completely free to use?",
    a: "Yes! Our mission is to protect the Blox Fruits community from bad trades and scams. Access to the real-time value list, the trading calculator, and our community features is completely free for all players."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden flex flex-col items-center text-center">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400 font-bold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            #1 Most Accurate Trading Hub
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 dark:text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] tracking-tighter leading-tight">
            Blox Fruit <span className="text-blue-500">Valuable</span> <span className="text-2xl md:text-4xl text-gray-600 dark:text-gray-400 font-bold ml-2 hidden sm:inline-block">| BloxFruitValuable.com</span>
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed">
            Welcome to the ultimate trading companion for Blox Fruits. Stop guessing your trades and start winning. We track live market demands to bring you the most accurate values on the internet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/values-list" className="bg-blue-600 hover:bg-blue-500 text-gray-900 dark:text-white font-black py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 w-full sm:w-auto text-lg">
              View Values List <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/calculator" className="bg-[#1a1a24] hover:bg-[#2a2a35] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all w-full sm:w-auto text-lg">
              <Calculator className="w-5 h-5" /> Trade Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 p-8 rounded-3xl hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Live Market Trends</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Our system actively monitors the community to update values instantly. If a fruit gets an awakening and spikes in demand, you'll be the first to know.</p>
          </div>
          <div className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 p-8 rounded-3xl hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Scam Protection</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Never take an "L" again. Use our Trade Calculator to objectively measure if an offer is a Massive Win, Fair, or a terrible Loss before you hit accept.</p>
          </div>
          <div className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Active Community</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Post trade ads in our secure Trading Hub or join the live chat. We restrict spam by requiring official Roblox logins, ensuring a safe trading environment.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Everything you need to know about Blox Fruit Valuable.</p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 hover:bg-[#12121a] transition-colors">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-4">
                <span className="text-blue-500 font-black">{index + 1}.</span> 
                {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed md:pl-9">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-3xl p-12 max-w-4xl mx-auto backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">Ready to make smarter trades?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">Join thousands of players who use BloxFruitValuable.com daily.</p>
          <Link href="/values-list" className="bg-white text-blue-950 hover:bg-gray-200 font-black py-4 px-10 rounded-xl transition-all shadow-xl hover:scale-105 inline-block text-lg">
            Explore The Value List
          </Link>
        </div>
      </section>
      
    </div>
  );
}
