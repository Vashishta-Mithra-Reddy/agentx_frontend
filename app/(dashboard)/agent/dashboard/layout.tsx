import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AgentX | Agent Dashboard",
  description: "Your AgentX agent dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header role="agent" />
      <main>{children}</main>
    </div>
  );
}
