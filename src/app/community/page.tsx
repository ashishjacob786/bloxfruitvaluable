"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Send, LogIn, Hash, Smile, AlertCircle, Reply, X, Eye, Volume2, VolumeX } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';

interface Message {
  id: string;
  text: string;
  topic: string;
  user: {
    name: string;
    avatar: string;
    id: string;
  };
  timestamp: string;
  replyTo?: {
    id: string;
    name: string;
    text: string;
  };
  viewedBy?: string[];
}

const TOPICS = ["General", "Trading", "W-F-L", "Giveaways", "Admin Support"];

export default function CommunityPage() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activeTopic, setActiveTopic] = useState("General");
  const [loading, setLoading] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const viewQueueRef = useRef<Set<string>>(new Set());
  const [isMuted, setIsMuted] = useState(false);
  const prevMessagesLengthRef = useRef(0);
  const [firstUnreadId, setFirstUnreadId] = useState<string | null>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const firstUnreadRef = useRef<HTMLDivElement>(null);

  // Sound effects generator
  const playSound = (type: 'send' | 'receive') => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'send') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
      } else {
        // Receive (double pop)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      // Audio context might be blocked by browser policy, ignore quietly
    }
  };

  // Check auth
  useEffect(() => {
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => {
        if (data && data.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Poll messages
  useEffect(() => {
    const fetchMessages = () => {
      fetch(`/api/chat?topic=${activeTopic}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            // Check for new messages from OTHERS
            if (prevMessagesLengthRef.current > 0 && data.length > prevMessagesLengthRef.current) {
              const newMessages = data.slice(prevMessagesLengthRef.current);
              const hasExternalMessage = newMessages.some((m: Message) => !user || m.user.name !== (user.username || user.name));
              if (hasExternalMessage) {
                playSound('receive');
              }
            }
            prevMessagesLengthRef.current = data.length;
            
            // Set first unread message ID on initial load
            if (!initialScrollDone && user) {
              const unread = data.find((m: Message) => !m.viewedBy?.includes(user.id) && m.user.name !== (user.username || user.name));
              if (unread) setFirstUnreadId(unread.id);
            }
            
            setMessages(data);
          }
        })
        .catch(() => {});
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [activeTopic]);

  // Reset state on topic switch
  useEffect(() => {
    setInitialScrollDone(false);
    setFirstUnreadId(null);
  }, [activeTopic]);

  // Intersection Observer for real views
  useEffect(() => {
    if (!user) return; // Only track if logged in

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const msgId = entry.target.getAttribute('data-message-id');
          if (msgId) {
            viewQueueRef.current.add(msgId);
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.5 });

    const messageElements = document.querySelectorAll('[data-message-id]');
    messageElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [messages, user]);

  // Batch flush view queue every 3 seconds
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      if (viewQueueRef.current.size > 0) {
        const messageIds = Array.from(viewQueueRef.current);
        viewQueueRef.current.clear();
        
        fetch('/api/chat', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messageIds })
        }).catch(() => {});
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [user]);

  // Scroll handler
  useEffect(() => {
    if (messages.length > 0 && !initialScrollDone) {
      setTimeout(() => {
        if (firstUnreadId && firstUnreadRef.current) {
          firstUnreadRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        setInitialScrollDone(true);
      }, 100);
    } else if (initialScrollDone && messages.length > prevMessagesLengthRef.current) {
      // Auto scroll to bottom only if it's a new message and we already loaded
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, initialScrollDone, firstUnreadId]);
  
  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEmojiClick = (emojiObject: any) => {
    setInput(prevInput => prevInput + emojiObject.emoji);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    
    setErrorMsg("");
    const text = input.trim();
    
    // Quick frontend check (backend also checks)
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/gi;
    if (urlRegex.test(text)) {
      setErrorMsg("Links are strictly not allowed in the chat.");
      return;
    }

    setInput("");
    setShowEmoji(false);
    
    let targetTopic = activeTopic;
    if (text.toLowerCase().includes("@admin")) {
      targetTopic = "Admin Support";
      setActiveTopic("Admin Support");
    }
    
    // Optimistic UI update
    const optimisticMsg: Message = {
      id: Date.now().toString(),
      text,
      topic: targetTopic,
      user: {
        name: user.username || user.name || "Anonymous",
        avatar: user.avatarUrl || user.image || "/default-avatar.png",
        id: user.id || "unknown"
      },
      timestamp: new Date().toISOString(),
      replyTo: replyingTo ? { id: replyingTo.id, name: replyingTo.user.name, text: replyingTo.text } : undefined
    };
    setMessages(prev => [...prev, optimisticMsg]);
    setReplyingTo(null);
    playSound('send');
    prevMessagesLengthRef.current += 1; // Update ref to prevent 'receive' sound for our own message

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, topic: targetTopic, replyTo: optimisticMsg.replyTo })
    });
    
    if (!res.ok) {
      const data = await res.json();
      setErrorMsg(data.error || "Failed to send message.");
      // Rollback optimistic update
      setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
    }
  };

  if (loading) return <div className="min-h-[80vh] flex items-center justify-center"><div className="animate-pulse w-10 h-10 bg-blue-600 rounded-full" /></div>;

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          Real-Time <span className="text-blue-500">Community</span> <span className="text-xl text-gray-600 dark:text-gray-400 font-bold ml-2 hidden sm:inline-block">| BloxFruitValuable.com</span>
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Join a topic and chat with other players safely!</p>
        
        {/* SEO Text Expansion for Thin Content Issue */}
        <div className="max-w-3xl text-center px-4 md:px-0 mt-4 mb-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Welcome to the official <strong className="text-gray-900 dark:text-white">Blox Fruits Value Community Chat</strong>! Connect with thousands of other players to discuss real-time trading values, find the best fruit trades, and share your massive W/F/L wins. Whether you are a seasoned bounty hunter looking for permanent fruit trades or a new player figuring out the physical trading tier list, this is your home. 
            <br /><br />
            <strong className="text-gray-900 dark:text-white">Community Rules:</strong> No spamming, no begging, and no scam links. Keep discussions related to Blox Fruits trading values and gameplay. Our moderation team actively monitors the chat to ensure a safe environment for everyone. Click a topic below to join the conversation and master the Blox Fruits economy!
          </p>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex overflow-hidden backdrop-blur-md max-w-5xl mx-auto w-full relative">
        
        {/* Sidebar Topics */}
        <div className="w-48 bg-white dark:bg-black/40 border-r border-gray-200 dark:border-white/10 flex flex-col p-4 hidden md:flex">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Chat Topics</h2>
          <div className="flex flex-col gap-2">
            {TOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeTopic === topic 
                    ? "bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30 shadow-[0_0_10px_rgba(37,99,235,0.2)]" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-200"
                }`}
              >
                <Hash className="w-4 h-4" />
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Mobile Topic Header */}
          <div className="md:hidden p-3 bg-white dark:bg-black/40 border-b border-gray-200 dark:border-white/10 flex gap-2 overflow-x-auto">
            {TOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTopic === topic ? "bg-blue-600 text-gray-900 dark:text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]" : "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                }`}
              >
                #{topic}
              </button>
            ))}
          </div>

          <div className="p-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <Hash className="w-5 h-5 text-blue-500" />
              {activeTopic}
            </h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors"
                title={isMuted ? "Unmute Sounds" : "Mute Sounds"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
              </button>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Server
              </div>
            </div>
          </div>

          {/* Messages Window */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            {messages.length === 0 ? (
              <div className="m-auto text-gray-500 text-sm flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-2">
                  <Hash className="w-6 h-6 text-gray-600" />
                </div>
                Welcome to #{activeTopic}
                <span className="text-xs">Be the first to send a message!</span>
              </div>
            ) : (
              (() => {
                const groupedMessages: { [key: string]: Message[] } = {};
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                
                messages.forEach(msg => {
                  const msgDate = new Date(msg.timestamp);
                  let dateLabel = msgDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                  
                  if (msgDate.toDateString() === today.toDateString()) {
                    dateLabel = "Today";
                  } else if (msgDate.toDateString() === yesterday.toDateString()) {
                    dateLabel = "Yesterday";
                  }
                  
                  if (!groupedMessages[dateLabel]) {
                    groupedMessages[dateLabel] = [];
                  }
                  groupedMessages[dateLabel].push(msg);
                });

                return Object.entries(groupedMessages).map(([dateLabel, dateMsgs]) => (
                  <div key={dateLabel} className="flex flex-col gap-4">
                    <div className="flex justify-center my-2">
                      <span className="bg-white dark:bg-black/40 text-gray-600 dark:text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full border border-gray-200 dark:border-white/5 uppercase tracking-wider">
                        {dateLabel}
                      </span>
                    </div>
                    {dateMsgs.map(msg => {
                      const isMe = user && msg.user.name === (user.username || user.name);
                      const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      const views = msg.viewedBy ? msg.viewedBy.length : 1;
                      const isFirstUnread = msg.id === firstUnreadId;
                      
                      return (
                        <div key={msg.id} className="flex flex-col">
                          {isFirstUnread && (
                            <div ref={firstUnreadRef} className="flex items-center justify-center my-4 w-full relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full border-t border-blue-500/30"></div>
                              </div>
                              <span className="bg-[#1e1f22] text-blue-400 text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-lg border border-blue-500/20">
                                Unread Messages
                              </span>
                            </div>
                          )}
                          <div data-message-id={msg.id} className={`flex gap-3 group ${isMe ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-lg mt-auto mb-2">
                            {msg.user.avatar ? <img src={msg.user.avatar} alt={msg.user.name} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-900 dark:text-white">{msg.user.name.charAt(0)}</div>}
                          </div>
                          <div className={`flex flex-col max-w-[80%] relative ${isMe ? 'items-end' : 'items-start'}`}>
                            <div className={`flex items-center gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                              <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{msg.user.name}</span>
                              <span className="text-[9px] text-gray-600 flex items-center gap-1">
                                {time}
                                <span className="flex items-center gap-0.5 ml-1"><Eye className="w-2.5 h-2.5 text-gray-500" /> {views}</span>
                              </span>
                            </div>
                            
                            <div className={`flex items-center gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                              <div className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-lg relative break-all whitespace-pre-wrap overflow-hidden ${isMe ? 'bg-blue-600 text-gray-900 dark:text-white rounded-br-sm' : 'bg-[#2b2d31] text-gray-100 border border-gray-200 dark:border-white/5 rounded-bl-sm'}`}>
                                {msg.replyTo && (
                                  <div className="mb-2 bg-white dark:bg-black/20 border-l-2 border-gray-200 dark:border-white/50 pl-2 py-1 rounded text-[11px] opacity-80 overflow-hidden">
                                    <span className="font-bold text-blue-300 block">{msg.replyTo.name}</span>
                                    <span className="truncate block max-w-[200px]">{msg.replyTo.text}</span>
                                  </div>
                                )}
                                {msg.text}
                              </div>
                              
                              <button 
                                onClick={() => setReplyingTo(msg)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400"
                                title="Reply"
                              >
                                <Reply className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        </div>
                      );
                    })}
                  </div>
                ));
              })()
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-black/40 border-t border-gray-200 dark:border-white/10 relative">
            
            {replyingTo && (
              <div className="absolute bottom-full mb-1 left-4 right-4 bg-white dark:bg-black/80 border border-gray-200 dark:border-white/10 rounded-t-xl p-3 flex items-start justify-between backdrop-blur-md">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Reply className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-bold text-blue-400 block uppercase tracking-wider">Replying to {replyingTo.user.name}</span>
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate block max-w-xs">{replyingTo.text}</span>
                  </div>
                </div>
                <button onClick={() => setReplyingTo(null)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white p-1 bg-gray-100 dark:bg-white/5 rounded-full">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {errorMsg && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500/90 text-gray-900 dark:text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg animate-bounce">
                <AlertCircle className="w-3 h-3" />
                {errorMsg}
              </div>
            )}

            {!user ? (
              <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl text-center shadow-lg">
                <p className="text-gray-900 dark:text-white font-medium mb-4">You must be logged in to participate in the chat.</p>
                <Link href="/login?callbackUrl=/community" className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-gray-900 dark:text-white font-bold text-sm transition shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  Login to Chat
                </Link>
              </div>
            ) : (
              <form onSubmit={sendMessage} className="flex gap-2 relative items-end">
                <div className="flex-1 relative flex items-center">
                  
                  {/* Emoji Picker Popup */}
                  {showEmoji && (
                    <div ref={emojiRef} className="absolute bottom-full mb-2 left-0 z-50 shadow-2xl rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                      <EmojiPicker 
                        onEmojiClick={onEmojiClick} 
                        theme={"dark" as any}
                        searchDisabled={true}
                        width={300}
                        height={350}
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="absolute left-3 text-gray-600 dark:text-gray-400 hover:text-yellow-400 transition"
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  <input
                    type="text"
                    value={input}
                    onChange={e => { setInput(e.target.value); setErrorMsg(""); }}
                    placeholder={`Message #${activeTopic}...`}
                    maxLength={200}
                    className="w-full bg-[#383a40] border border-gray-200 dark:border-white/5 rounded-full pl-11 pr-12 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-1.5 p-1.5 aspect-square flex items-center justify-center rounded-full bg-blue-600 text-gray-900 dark:text-white disabled:opacity-50 disabled:bg-gray-200 dark:bg-white/10 hover:bg-blue-500 transition shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Structured Data for SEO: DiscussionForumPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DiscussionForumPosting",
            "headline": "Blox Fruits Community Chat & Live Discussions",
            "url": "https://www.bloxfruitvaluable.com/community",
            "description": "Join the active Blox Fruits community chat. Discuss W/F/L, organize giveaways, and get admin support.",
            "author": {
              "@type": "Organization",
              "name": "BloxFruitValuable"
            },
            "publisher": {
              "@type": "Organization",
              "name": "BloxFruitValuable"
            }
          })
        }}
      />
    </div>
  );
}
