"use client";

import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-yellow-500/30">

            {/* Background Double Gradient (Yellow TL / Blue BR) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Base sombre */}
                <div className="absolute inset-0 bg-[#0a0a0c]" />

                {/* Gradient Jaune (Haut Gauche) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.08),_transparent_40%)]" />

                {/* Gradient Bleu (Bas Droite) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(234,179,8,0.08),_transparent_40%)]" />
            </div>

            <div className="relative z-10 max-w-lg w-full text-center space-y-8">

                <div className="mx-auto w-24 h-24 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center animate-in zoom-in-50 duration-700 fade-in shadow-2xl shadow-yellow-500/5">
                    <FileQuestion className="w-10 h-10 text-yellow-400 opacity-80" strokeWidth={1.5} />
                </div>

                <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-700 fade-in delay-150 fill-mode-backwards">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                        404
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                        Ce chunk n&apos;a pas chargé.
                    </h2>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                        La page que vous cherchez a peut-être été déplacée, supprimée, ou n&apos;a jamais existé dans cette dimension.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-in slide-in-from-bottom-5 duration-700 fade-in delay-300 fill-mode-backwards">
                    <Link
                        href="/"
                        className="group w-full sm:w-auto px-6 py-3 bg-yellow-400 md:hover:bg-yellow-300 text-black font-bold rounded-xl transition-all md:hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        <span>Retour à l&apos;accueil</span>
                    </Link>
                    <button
                        onClick={() => globalThis.history.back()}
                        className="group w-full sm:w-auto px-6 py-3 bg-white/5 md:hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all md:hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} className="transition-transform md:group-hover:-translate-x-1" />
                        <span>Retour</span>
                    </button>
                </div>

                <div className="pt-8 animate-in fade-in duration-1000 delay-500">
                    <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
                        Error_Code: WORLD_BORDER_REACHED
                    </p>
                </div>
            </div>
        </div>
    );
}
