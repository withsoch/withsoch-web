import type { Metadata } from "next";
import { Wix_Madefor_Text } from "next/font/google";
import "./globals.css";
import { jsonLd, SITE_URL as SEO_SITE_URL } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

// Single site-wide font - matches the real withsoch.com Webflow build.
// 400/500 cover body/heading weight; 600/700 cover existing font-semibold /
// font-bold usage (Button, Nav, comparison table, etc.).
// Italic is loaded because the family has true italics - without it the
// browser synthesises a slanted upright, which reads as noticeably cheaper
// on the contact headline, case-study pull-quotes and blog blockquotes.
// Note: this family ships 400-800 only. There is no 300, so `font-light`
// silently resolves to 400 - use `font-normal` and mean it.
const wixMadeforText = Wix_Madefor_Text({
  variable: "--font-wix-madefor-text",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Who the site is, for search engines and AI answer engines. */
const SITE_ENTITY = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Soch",
  url: SEO_SITE_URL,
  description: "AI automation partners for businesses. We build and deploy automation systems across operations, products, and outreach, and run AI training for firms.",
  logo: `${SEO_SITE_URL}/logos/soch-logo-removebg-preview.png`,
  sameAs: Object.values(SITE.social),
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO_SITE_URL),
  title: {
    default: "Soch | AI Automation",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(SITE_ENTITY) }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}