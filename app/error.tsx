"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ServerCrash, RefreshCw, MessageSquareWarning, Home } from "lucide-react";

export default function Errors({
                                  error,
                                  reset,
                              }: Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
}>) {
    const errorSent = useRef(false);

    useEffect(() => {
        console.error("🚨 Erreur locale :", error);

        const logErrorSecurely = async () => {
            if (errorSent.current) return;

            // --- SYSTÈME ANTI-SPAM PERSISTANT ---
            const lastErrorSent = localStorage.getItem("last_error_digest");
            const lastErrorTime = localStorage.getItem("last_error_time");
            const now = Date.now();

            // On ne renvoie pas si c'est le même ID et que ça date de moins de 5 minutes
            if (lastErrorSent === error.digest && lastErrorTime && (now - Number.parseInt(lastErrorTime)) < 300000) {
                console.warn("⚠️ Erreur déjà signalée récemment, envoi annulé.");
                return;
            }

            errorSent.current = true;

            try {
                const response = await fetch("/api/log-error", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: error.message,
                        digest: error.digest,
                        path: globalThis.location.pathname,
                    }),
                });

                // Si l'envoi réussit, on enregistre l'erreur pour le prochain coup
                if (response.ok && error.digest) {
                    localStorage.setItem("last_error_digest", error.digest);
                    localStorage.setItem("last_error_time", now.toString());
                }
            } catch (err) {
                console.warn("Impossible de contacter l'API de log", err);
            }
        };

        // On garde ta condition de test/prod
        if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
            logErrorSecurely();
        }
    }, [error]);

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-red-500/30">

            {/* --- NOUVEAU FOND GRADIENT (Similaire à la 404, mais thème 'Alerte') --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Base sombre */}
                <div className="absolute inset-0 bg-[#0a0a0c]" />

                {/* Gradient Rouge (Haut Gauche) — Alerte */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.08),_transparent_40%)]" />

                {/* Gradient Orange (Bas Droite) — Danger */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(234,88,12,0.08),_transparent_40%)]" />
            </div>

            <div className="relative z-10 max-w-md w-full text-center space-y-8">

                {/* --- LOGO AVEC PULSE (Conservé) --- */}
                <div className="relative mx-auto w-24 h-24 group">
                    {/* Effet de "ping" rouge */}
                    <div className="absolute inset-0 bg-red-500/20 rounded-3xl animate-ping opacity-20 duration-1000" />
                    {/* Effet de lueur fixe */}
                    <div className="absolute inset-0 bg-red-500/10 rounded-3xl blur-xl" />

                    <div className="relative bg-[#0a0a0c]/80 backdrop-blur-xl border border-red-500/20 rounded-3xl w-full h-full flex items-center justify-center shadow-2xl shadow-red-900/20 ring-1 ring-white/5">
                        <ServerCrash className="w-10 h-10 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" strokeWidth={1.5} />
                    </div>
                </div>

                <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-700 fade-in delay-100 fill-mode-backwards">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tight">
                        Erreur Critique
                    </h1>
                    <p className="text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                        Une erreur inattendue a fait planter le serveur. Le rapport d&apos;incident a été sécurisé et transmis aux développeurs.
                    </p>

                    {error.digest && (
                        <div className="inline-block px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 font-mono text-[10px] text-red-400 select-all tracking-wider">
                            ID: {error.digest}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-700 fade-in delay-200 fill-mode-backwards">
                    <button
                        onClick={() => reset()}
                        className="w-full px-6 py-4 bg-yellow-400 text-black font-bold rounded-xl transition-all md:hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(250,204,21,0.3)] md:hover:shadow-[0_0_30px_-5px_rgba(250,204,21,0.5)]"
                    >
                        <RefreshCw size={18} className="animate-in spin-in-180 duration-700" />
                        <span>Réessayer</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href="/"
                            className="px-4 py-3 bg-white/5 border border-white/10 md:hover:bg-white/10 md:hover:border-white/20 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 group"
                        >
                            <Home size={16} className="text-white/50 group-hover:text-white transition-colors" />
                            Accueil
                        </Link>

                        {/* --- BOUTON SUPPORT (Conservé & Amélioré) --- */}
                        <a
                            href="https://discord.gg/v7Ttq79hP5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 bg-[#5865F2]/10 border border-[#5865F2]/20 md:hover:bg-[#5865F2]/20 md:hover:border-[#5865F2]/40 text-[#5865F2] font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 group"
                        >
                            <MessageSquareWarning size={16} className="group-hover:animate-bounce" />
                            Support
                        </a>
                    </div>
                </div>

                {/* Petit footer technique pour le style */}
                <div className="pt-8 opacity-20 text-[10px] font-mono tracking-[0.3em] uppercase animate-in fade-in duration-1000 delay-500">
                    System_Failure :: 500
                </div>
            </div>
        </div>
    );
}
