import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Activar Business - Seguros Inteligentes para Startups",
  description: "Diagnostica los riesgos de tu empresa y obtén recomendaciones de seguros personalizadas en menos de 5 minutos.",
  keywords: ["seguros", "startups", "pymes", "argentina", "insurtech", "riesgos empresariales"],
  authors: [{ name: "Activar Business" }],
  creator: "Activar Business",
  publisher: "Activar Business",
  metadataBase: new URL('https://activar-business-mvp.vercel.app'),
  openGraph: {
    title: 'Activar Business - Seguros Inteligentes para Startups',
    description: 'Demo MVP: Assessment de riesgos empresariales y recomendaciones de seguros para startups argentinas',
    url: 'https://activar-business-mvp.vercel.app',
    siteName: 'Activar Business',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Activar Business - Seguros para Startups',
    description: 'Assessment de riesgos empresariales en 5 minutos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
