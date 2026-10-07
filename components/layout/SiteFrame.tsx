import { ClientShell } from "@/components/providers/ClientShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageEnter } from "@/components/ui/PageEnter";
import { Aurora } from "@/components/ui/Aurora";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <ClientShell>
      <Aurora />
      <Navbar />
      <PageEnter>
        <main>{children}</main>
      </PageEnter>
      <Footer />
    </ClientShell>
  );
}
