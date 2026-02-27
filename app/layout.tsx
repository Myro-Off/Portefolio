import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

export const viewport: Viewport = {
    themeColor: "#050505",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "Adam Valsan | Développeur Full Stack",
        template: "%s | Adam Valsan",
    },
    description: "Portfolio d'Adam Valsan, Développeur Full Stack. En recherche d'une alternance de 2 ans pour Septembre 2026 à Dijon.",
    openGraph: {
        title: "Adam Valsan | Développeur Full Stack",
        description: "Découvrez mon portfolio, mes projets et ma stack technique. En recherche d'alternance pour Septembre 2026 (Dijon).",
        url: "https://adam-valsan.vercel.app",
        siteName: "Portfolio Adam Valsan",
        images: [
            {
                url: "/assets/portfolio-bg.webp",
                width: 1200,
                height: 630,
                alt: "Aperçu du Portfolio d'Adam Valsan",
            },
        ],
        locale: "fr_FR",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "Adam Valsan | Développeur Full Stack",
        description: "Découvrez mon portfolio et mes projets. Recherche d'alternance Développeur Full Stack - Septembre 2026 (Dijon).",
        images: ["/assets/portfolio-bg.webp"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="dark scroll-smooth">
        <body className="min-h-screen bg-[#050505] text-white antialiased selection:bg-yellow-400/30">
            {children}

            <Analytics />
        </body>
        </html>
    );
}