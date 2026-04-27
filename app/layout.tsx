import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MB Compras — Bazar & Regalos",
  description:
    "Bazar y regalos con envío a domicilio en CABA. Entregas viernes y sábados en Flores.",
  generator: "MB Compras",
  metadataBase: new URL("https://mb-compras.vercel.app"),

  keywords: [
    "bazar caba",
    "regalos buenos aires",
    "envíos flores",
    "compras online argentina",
  ],

  // 🔵 OPEN GRAPH (WhatsApp / Facebook)
  openGraph: {
    title: "MB Compras — Bazar & Regalos",
    description:
      "Bazar y regalos con envío a domicilio en CABA. Entregas viernes y sábados en Flores.",
    url: "https://mb-compras.vercel.app",
    siteName: "MB Compras",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "MB Compras",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  // 🔵 TWITTER
  twitter: {
    card: "summary_large_image",
    title: "MB Compras — Bazar & Regalos",
    description:
      "Bazar y regalos con envío a domicilio en CABA.",
    images: ["/preview.jpg"],
  },

  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },

  manifest: "/manifest.json",
  themeColor: "#4A0606",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MB Compras",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" translate="no">
      <head>
        {/* 🔥 MANIFEST */}
        <link rel="manifest" href="/manifest.json" />

        {/* 🔥 THEME */}
        <meta name="theme-color" content="#4A0606" />

        {/* 🔥 APPLE */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="MB Compras"
        />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* 🔥 GOOGLE SEARCH CONSOLE */}
        <meta
          name="google-site-verification"
          content="c43EWcKPaKQuTZ0w9M0U0iLPzJEgoEQmVTxKVhzfn8I"
        />

        {/* 🔥 GOOGLE ANALYTICS */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-734LT3L0QY"
          strategy="afterInteractive"
        />
        <Script id="gtag-mb-compras">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-734LT3L0QY');
          `}
        </Script>
      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}