import { ClientShell } from "@/components/providers/ClientShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageEnter } from "@/components/ui/PageEnter";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <ClientShell>
      <Navbar />
      <PageEnter>
        <main>{children}</main>
      </PageEnter>
      <Footer />
    </ClientShell>
  );
}
