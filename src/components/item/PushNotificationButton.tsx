"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { registerServiceWorker, requestNotificationPermission } from "@/lib/pushNotifications";

export default function PushNotificationButton({ itemName }: { itemName: string }) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      setSubscribed(true);
    }
    // Register SW early
    registerServiceWorker();
  }, []);

  const handleSubscribe = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setSubscribed(true);
      // In a real app, you would send the push subscription object to your backend here
      // to subscribe them specifically to this item's value changes.
      
      // Send a test local notification for demonstration
      if (navigator.serviceWorker.controller) {
         navigator.serviceWorker.ready.then(registration => {
             registration.showNotification(`Subscribed to ${itemName}`, {
                 body: `We will alert you when ${itemName}'s value changes!`,
                 icon: '/favicon.ico',
                 badge: '/favicon.ico',
              });
         });
      }
    }
  };

  return (
    <button 
      onClick={handleSubscribe}
      disabled={subscribed}
      className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
        subscribed 
          ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
          : 'bg-blue-600 text-gray-900 dark:text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
      }`}
    >
      <Bell className="w-5 h-5" />
      {subscribed ? "Subscribed to Alerts" : "Get Value Alerts"}
    </button>
  );
}
