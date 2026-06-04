import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for BloxFruitValuable.com",
  alternates: {
    canonical: "https://www.bloxfruitvaluable.com/terms",
  },
  openGraph: {
    title: "Terms of Service | BloxFruitValuable",
    description: "Terms of Service for BloxFruitValuable.com",
    url: "https://www.bloxfruitvaluable.com/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container px-4 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition text-sm font-bold mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Terms of Service</h1>
          <p className="text-blue-400 font-bold mb-10">Effective Date: May 29, 2026</p>

          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            <section>
              <p>
                Welcome to Blox Fruit Valuable (accessible at bloxfruitvaluable.com). These Terms of Service ("Terms") govern your access to and use of our website, real-time value lists, calculators, and community chat features.
              </p>
              <p className="mt-4">
                By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Description of Service and Disclaimer of Affiliation</h2>
              <p className="mb-4">
                Blox Fruit Valuable is an independent, community-driven platform designed to provide estimated trading values, tools, and a community hub for players of the Roblox game "Blox Fruits."
              </p>
              <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 text-sm text-red-200">
                <strong className="text-red-400">Disclaimer:</strong> Blox Fruit Valuable is a third-party service. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Roblox Corporation, Gamer Robot Inc. (the creators of Blox Fruits), or any of their subsidiaries or affiliates. All Roblox and Blox Fruits names, marks, emblems, and images are registered trademarks of their respective owners.
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. User Accounts and Roblox Authentication</h2>
              <p className="mb-4">To access certain features of our platform (such as the community chat and trading hub), you may be required to log in using Roblox OAuth.</p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li>You are solely responsible for maintaining the confidentiality of your Roblox account.</li>
                <li>We use official Roblox authentication and <strong className="text-gray-200">do not ask for, nor do we store, your Roblox account password</strong>.</li>
                <li>We reserve the right to suspend or terminate your access to Blox Fruit Valuable at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Conduct and Community Chat Rules</h2>
              <p className="mb-4">Our community features allow users to chat, negotiate trades, and interact. By using these features, you agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li>Post or transmit any content that is illegal, abusive, harassing, toxic, or otherwise objectionable.</li>
                <li>Use the platform to scam, deceive, or defraud other players.</li>
                <li>Promote or engage in <strong className="text-gray-200">"Cross-Trading"</strong> (trading in-game items for real money, Robux, or items in other games), as this violates official Roblox Terms of Service.</li>
                <li>Spam the chat or post malicious links.</li>
              </ul>
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-200 mt-6">
                <strong>Note:</strong> All community chat messages are stored securely in our database. We reserve the right to monitor chat logs and permanently ban users who violate these rules.
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Accuracy of Trading Values</h2>
              <p className="mb-4">The values and demand ratings displayed on Blox Fruit Valuable are estimates based on real-time community trends, market analysis, and user feedback.</p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li>These values are meant to serve as a guide, not a guarantee.</li>
                <li>The Blox Fruits trading market is highly volatile. <strong className="text-gray-200">We are not responsible for any in-game trading losses, bad deals ("L's"), or disputes between players</strong> that occur as a result of using our value list or calculator. All trades are made at your own risk.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Advertisements and Third-Party Links</h2>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li>Our website uses third-party advertising services (such as Google AdSense) and may contain sponsored links or links to third-party websites that are not owned or controlled by Blox Fruit Valuable.</li>
                <li>We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</li>
                <li>Your interactions with advertisers found on our platform are solely between you and the advertiser.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
              <p>
                Excluding the assets and trademarks owned by Roblox Corporation and Gamer Robot Inc., the original design, code, calculators, UI layout, and text on this website are the intellectual property of Blox Fruit Valuable. You may not copy, modify, distribute, or reproduce our proprietary code or design without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall Blox Fruit Valuable, its admin, or its developers be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of data, loss of in-game items, or other intangible losses, resulting from your access to or use of, or inability to access or use, the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Changes to These Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will indicate the date of the latest revision at the top of this page. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-400">Email:</span> admin@bloxfruitvaluable.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
