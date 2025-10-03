import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AgentX | Admin Dashboard",
  description: "Your AgentX admin dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header role="admin"/>
      <main>{children}</main>
    </div>
  );
}
