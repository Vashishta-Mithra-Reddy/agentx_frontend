import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AgentX | Sub Agent Dashboard",
  description: "Your AgentX Sub Agent dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header role="subagent"/>
      <main>{children}</main>
    </div>
  );
}
