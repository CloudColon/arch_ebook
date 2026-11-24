import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { DEMO } from "@/lib/demo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {DEMO && (
        <p className="border-b border-line bg-cream px-4 py-2 text-center text-xs text-ink-2">
          Demo site. Payments are simulated and nothing is charged.
        </p>
      )}
      <Nav />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
