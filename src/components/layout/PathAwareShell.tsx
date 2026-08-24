"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "@/components/widgets/WhatsAppFloat";
import { ChatWidget } from "@/components/widgets/ChatWidget";
import { CookieBanner } from "@/components/widgets/CookieBanner";

export function PathAwareShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = pathname?.startsWith("/cartao");

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
