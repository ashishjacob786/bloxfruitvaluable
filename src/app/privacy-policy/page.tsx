import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for BloxFruitValuable.com",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | BloxFruitValuable",
    description: "Privacy Policy for BloxFruitValuable.com",
    url: "https://www.bloxfruitvaluable.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container px-4 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition text-sm font-bold mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-blue-400 font-bold mb-10">Effective Date: May 29, 2026</p>

          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            <section>
              <p>
                Welcome to Blox Fruit Valuable (accessible at bloxfruitvaluable.com). Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, log in via Roblox, use our community chat, and interact with our services.
              </p>
              <p className="mt-4">
                By using Blox Fruit Valuable, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect a few different types of information to provide and improve our service to you:</p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li><strong className="text-gray-200">Information from Roblox (OAuth):</strong> When you choose to log in to our platform using your Roblox account, we use Roblox's official authentication system. We collect basic public profile information, such as your Roblox Username, User ID, and Avatar/Profile Picture.</li>
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-200 my-2">
                  <strong>Note:</strong> We NEVER have access to, nor do we store, your Roblox password.
                </div>
                <li><strong className="text-gray-200">User-Generated Content:</strong> If you participate in our community features, such as the public or private chat, we collect the messages you send, the timestamps, and the recipient information. This chat data is securely stored in our backend database (Supabase).</li>
                <li><strong className="text-gray-200">Log and Usage Data:</strong> Like most websites, we automatically collect information that your browser sends whenever you visit our site. This may include your IP address, browser type, device information, pages visited, time and date of visit, and other diagnostic data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for various purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>To create and manage your account via Roblox authentication.</li>
                <li>To enable community features, allowing you to chat and trade with other users safely.</li>
                <li>To provide and maintain the website's functionality (e.g., real-time value updates and calculators).</li>
                <li>To display relevant advertisements, including Google AdSense, third-party ads, and sponsored links.</li>
                <li>To monitor the usage of our website and fix technical issues or bugs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Cookies and Advertising (Google AdSense & Third Parties)</h2>
              <p className="mb-4">We use cookies and similar tracking technologies to track activity on our website and hold certain information.</p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li><strong className="text-gray-200">Google AdSense & Third-Party Ads:</strong> We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use cookies (like the Google DoubleClick cookie) to serve ads based on your prior visits to our website or other websites on the internet.</li>
                <li><strong className="text-gray-200">Sponsored Links:</strong> We may occasionally feature sponsored links or affiliate content.</li>
                <li><strong className="text-gray-200">Opt-Out:</strong> Users may opt out of personalized advertising by visiting Google's Ads Settings. You can also instruct your browser to refuse all cookies, though some parts of our site may not function properly without them.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. How We Share Your Data</h2>
              <p className="mb-4">We do not sell your personal data to third parties. We may share your information only in the following situations:</p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li><strong className="text-gray-200">Service Providers:</strong> We use third-party services like Supabase for secure database hosting, user management, and storing community chat logs. These providers have access to your data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</li>
                <li><strong className="text-gray-200">Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Security</h2>
              <p>
                The security of your data is important to us. We utilize industry-standard security measures, including secure backend infrastructure (Supabase) and encrypted connections (HTTPS/SSL), to protect your personal information and chat logs. However, remember that no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Children's Privacy (COPPA Compliance)</h2>
              <p>
                Because Blox Fruits is a game popular among younger audiences, we are committed to protecting children's privacy. We do not knowingly collect personally identifiable information from anyone under the age of 13 without parental consent. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us. If we become aware that we have collected personal data from anyone under the age of 13 without verification of parental consent, we take steps to remove that information from our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy, your data, or if you wish to request the deletion of your account and associated chat data, please contact us at:
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
