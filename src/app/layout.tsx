import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { CartProvider } from "@/components/cart";
import { book, business } from "@/content/book";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: `${book.title} by ${book.author} | ${business.brand}`, template: `%s | ${business.brand}` },
  description: book.pitch,
  openGraph: { title: `${book.title}: ${book.subtitle}`, description: book.pitch, siteName: business.brand, type: "book" },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable} antialiased`}>
      <body className="min-h-[100dvh]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
