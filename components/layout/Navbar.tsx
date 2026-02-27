"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence, MotionConfig, LazyMotion, domAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, ChevronRight } from "lucide-react";

const links = [
    { href: "#accueil", label: "Accueil" },
    { href: "#skills", label: "Compétences" },
    { href: "#projects", label: "Projets" },
    { href: "#education", label: "Parcours" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    }, [isMobileMenuOpen]);

    return (
        <LazyMotion features={domAnimation}>
            <header className="sticky top-0 z-[100] w-full h-16 md:h-20 transition-all duration-300">
                <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 md:bg-[#050505]/40" />

                <div className="mx-auto max-w-7xl px-6 h-full flex items-center justify-between relative z-50">

                    {/* --- 1. LOGO ADAPTATIF --- */}
                    <Link href="#accueil" className="font-extrabold tracking-tight flex items-center gap-0.5 hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
                        <span className="text-xl md:text-2xl text-white">Adam</span>
                        <span className="text-xl md:text-2xl text-yellow-400">Valsan</span>
                    </Link>

                    {/* --- 2. NAVIGATION DESKTOP --- */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/10 backdrop-blur-md">
                        {links.map((link) => {
                            // On simule l'activité pour l'instant, tu pourras utiliser IntersectionObserver pour scroller
                            const isActive = pathname === link.href; 
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                                        isActive ? "text-yellow-400" : "text-white/50 hover:text-white"
                                    }`}
                                >
                                    {isActive && (
                                        <m.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 bg-white/10 rounded-full"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* --- 3. ACTIONS & BURGER --- */}
                    <div className="flex items-center gap-3">
                        <a
                            href="mailto:adam.valsan3@gmail.com"
                            className="hidden md:flex group h-10 items-center gap-2 rounded-xl bg-yellow-400 px-5 font-black text-[12px] uppercase tracking-wider text-black transition-all hover:bg-yellow-300 hover:scale-[1.02] active:scale-95"
                        >
                            <Mail size={16} className="transition-transform group-hover:-translate-y-0.5" />
                            Me Contacter
                        </a>

                        {/* --- BOUTON BURGER --- */}
                        <m.button
                            initial={false}
                            animate={isMobileMenuOpen ? "open" : "closed"}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white transition-all active:scale-90 z-[110]"
                            aria-label="Menu"
                        >
                            <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
                                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                                    <m.span
                                        style={{ position: "absolute", height: "2px", width: "20px", background: "currentColor", borderRadius: "99px" }}
                                        variants={{
                                            open: { top: "50%", rotate: 45, y: "-50%" },
                                            closed: { top: "25%", rotate: 0, y: "0%" }
                                        }}
                                    />
                                    <m.span
                                        style={{ position: "absolute", height: "2px", width: "20px", background: "currentColor", borderRadius: "99px", top: "50%", y: "-50%" }}
                                        variants={{
                                            open: { opacity: 0 },
                                            closed: { opacity: 1 }
                                        }}
                                    />
                                    <m.span
                                        style={{ position: "absolute", height: "2px", width: "20px", background: "currentColor", borderRadius: "99px" }}
                                        variants={{
                                            open: { top: "50%", rotate: -45, y: "-50%" },
                                            closed: { top: "75%", rotate: 0, y: "0%" }
                                        }}
                                    />
                                </div>
                            </MotionConfig>
                        </m.button>
                    </div>
                </div>
            </header>

            {/* --- MENU MOBILE --- */}
            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden fixed inset-0 top-16 bg-[#050505] z-[90] flex flex-col p-6 border-t border-white/5"
                    >
                        <nav className="space-y-2">
                            {links.map((link, i) => (
                                <m.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                            pathname === link.href
                                                ? "bg-yellow-400/10 border-yellow-400/20 text-yellow-400 font-bold"
                                                : "bg-white/[0.02] border-white/5 text-white/60"
                                        }`}
                                    >
                                        <span className="text-base tracking-tight">{link.label}</span>
                                        <ChevronRight size={18} className={pathname === link.href ? "opacity-100" : "opacity-20"} />
                                    </Link>
                                </m.div>
                            ))}
                        </nav>

                        <div className="mt-auto space-y-3 pb-6">
                            <a href="mailto:adam.valsan3@gmail.com" onClick={closeMobileMenu} className="flex w-full items-center justify-center gap-3 bg-yellow-400 text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm">
                                <Mail size={18} />
                                Me Contacter
                            </a>
                            <a href="/Adam_Valsan_CV.pdf" target="_blank" onClick={closeMobileMenu} className="flex w-full items-center justify-center gap-3 bg-white/5 text-white/70 py-4 rounded-xl font-bold text-sm border border-white/10 active:scale-95 transition-all">
                                Télécharger le CV
                            </a>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}