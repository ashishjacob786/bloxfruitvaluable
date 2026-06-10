import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Blox Fruit Value",
  description: "Securely connect your Roblox account to start trading.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
