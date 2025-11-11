import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNav from "@/components/nav/top-nav";
import { ThemeProvider } from "../context/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { BusinessProvider } from "@/context/business";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// ✅ SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://www.directoriosopetran.com"),
  title: "Directorio Sopetrán - Comercio Local",
  description:
    "Directorio digital para el comercio unido de Sopetrán. Encuentra negocios locales, servicios y promociones en tu municipio.",
  keywords: [
    "Sopetrán",
    "comercio local",
    "negocios",
    "directorio",
    "Antioquia",
    "turismo",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Directorio Sopetrán - Comercio Local",
    description: "Encuentra los mejores negocios y servicios en Sopetrán",
    type: "website",
    locale: "es_ES",
    url: "https://www.directoriosopetran.com",
    siteName: "Directorio Sopetrán",
    images: [
      {
        url: "https://www.directoriosopetran.com/images/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Directorio Sopetrán - Comercio Local",
      },
    ],
  },
  alternates: {
    canonical: "https://www.directoriosopetran.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="es" suppressHydrationWarning>
        <head>
          <link rel="canonical" href="https://www.directoriosopetran.com" />
          {/* ✅ Refuerzo manual (Next.js a veces lo ignora) */}
          <meta name="robots" content="index,follow" />
      
        
          <meta name="google-site-verification" content="tu-codigo-de-verificacion" />
        </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Fondo de página */}
            <div
              style={{ backgroundImage: 'url("/images/ia.jpg")' }}
              className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-20 transition-opacity duration-300"
            />

            <BusinessProvider>
              <header className="fixed top-0 left-0 right-0 z-50 opacity-90">
                <TopNav />
              </header>

              <main className="mt-20 md:mt-10 relative">{children}</main>
            </BusinessProvider>

            {/* ✅ Datos estructurados JSON-LD */}
            <Script
              id="structured-data"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "LocalBusiness",
                  "name": "Directorio Sopetrán",
                  "image":
                    "https://www.directoriosopetran.com/images/preview.jpg",
                  "description":
                    "Directorio digital para el comercio unido de Sopetrán, Antioquia.",
                  "url": "https://www.directoriosopetran.com",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Sopetrán",
                    "addressRegion": "Antioquia",
                    "addressCountry": "Colombia",
                  },
                }),
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
