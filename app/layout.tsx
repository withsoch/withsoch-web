import type { Metadata } from "next";
import { Wix_Madefor_Text } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/content";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

// Single site-wide font — matches the real withsoch.com Webflow build.
// 400/500 cover body/heading weight; 600/700 cover existing font-semibold /
// font-bold usage (Button, Nav, comparison table, etc.) that used to ride on
// Inter's weights.
const wixMadeforText = Wix_Madefor_Text({
  variable: "--font-wix-madefor-text",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${wixMadeforText.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-white">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}