"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { Download, Linkedin, Mail, GraduationCap, Briefcase, Code2, Sparkles, Terminal } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const styles = `
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
    }
    .animate-float {
        animation: float 6s ease-in-out infinite;
        will-change: transform;
    }

    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .hero-animate-1 { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
    .hero-animate-2 { animation: fadeUp 0.8s ease-out 0.1s forwards; opacity: 0; }
    .hero-animate-3 { animation: fadeUp 0.8s ease-out 0.2s forwards; opacity: 0; }
    .hero-animate-4 { animation: fadeUp 0.8s ease-out 0.3s forwards; opacity: 0; }
`;

const viewportConfig = { once: true, amount: 0.2 };

const SKILLS = [
    { category: "Confirmé", tech: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Git/GitHub"] },
    { category: "Intermédiaire", tech: ["Python", "C", "Java", "PHP", "SQL"] },
    { category: "En cours", tech: ["Rust", "Godot", "GraphQL"] }
];

interface ProjectType {
    title: string;
    date: string;
    desc: string;
    tech: string[];
    color: string;
    icon: React.ReactNode;
}

const PROJECTS: ProjectType[] = [
    { 
        title: "Application Pokédex & Team Builder", 
        date: "Janv - Fév 2026", 
        desc: "Constructeur d'équipes en temps réel exploitant les données massives de la PokéAPI. Architecture robuste et optimisation des requêtes pour un affichage sans latence.",
        tech: ["TypeScript", "Rust", "GraphQL", "REST"],
        color: "rgba(59, 130, 246, 0.15)",
        icon: <Code2 className="w-6 h-6" />
    },
    { 
        title: "SoulMask (Game Jam)", 
        date: "Février 2026", 
        desc: "Développement d'un prototype fonctionnel de jeu vidéo et optimisation du gameplay en 48h.",
        tech: ["Godot", "GDScript"],
        color: "rgba(16, 185, 129, 0.15)",
        icon: <Terminal className="w-6 h-6" />
    },
    { 
        title: "Hackathon 'Sport & Data'", 
        date: "Décembre 2025", 
        desc: "Développement d'une application de suivi santé pour le DFCO Féminin. Architecture sécurisée et démonstration devant la direction du club (Meilleure note).",
        tech: ["React", "API", "Data"],
        color: "rgba(244, 63, 94, 0.15)",
        icon: <Sparkles className="w-6 h-6" />
    }
];

function LazySection({ children, minHeight = "500px" }: { children: React.ReactNode, minHeight?: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ minHeight: isVisible ? "auto" : minHeight }} className={isVisible ? "animate-in fade-in duration-700" : ""}>
            {isVisible ? children : null}
        </div>
    );
}

export default function Portfolio() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    const getScrollAnimation = (delay = 0) => {
        if (isMobile) return { initial: { opacity: 1 }, whileInView: { opacity: 1 } };
        return {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: viewportConfig,
            transition: { duration: 0.5, delay, ease: "easeOut" }
        };
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className="text-white relative selection:bg-yellow-500/30 font-sans min-h-screen bg-[#050505]">
                <style>{styles}</style>

                <div className="fixed inset-0 pointer-events-none z-0">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-yellow-500/5 blur-[120px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-40 pb-20 md:pb-32 pt-20">

                    <section id="accueil" className="text-center flex flex-col items-center relative min-h-[70vh] justify-center pt-20">
                        <div className="hero-animate-1 mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs md:text-sm font-bold text-yellow-400 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            RECHERCHE ALTERNANCE DÉVELOPPEUR FULL STACK - SEPTEMBRE 2026 (DIJON)
                        </div>

                        <h1 className="hero-animate-2 text-5xl md:text-8xl font-extrabold tracking-tight mb-6 text-balance leading-[1.1]">
                            Adam <br />
                            <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-500 bg-clip-text text-transparent">Valsan</span>
                        </h1>

                        <p className="hero-animate-3 max-w-3xl text-lg md:text-2xl text-white/60 mb-10 leading-relaxed font-medium text-balance italic">
                            &quot;Le confort de l&apos;utilisateur est pour moi essentiel. Je développe avec une grande rigueur technique pour offrir une expérience simple, évidente et maîtrisée à l&apos;écran.&quot;
                        </p>

                        <div className="hero-animate-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <a href="mailto:adam.valsan3@gmail.com" className="group px-8 py-4 bg-yellow-400 text-black rounded-2xl font-bold transition-all md:hover:scale-105 shadow-[0_0_30px_-5px_rgba(250,204,21,0.3)] flex items-center justify-center gap-3">
                                <Mail className="w-5 h-5 transition-transform md:group-hover:-translate-y-1" />
                                <span>Me Contacter</span>
                            </a>
                            <a href="/Adam_Valsan_CV.pdf" target="_blank" className="group px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold transition-all md:hover:bg-white/10 flex items-center justify-center gap-3">
                                <Download className="w-5 h-5" />
                                <span>Télécharger mon CV</span>
                            </a>
                        </div>
                        
                         <div className="hero-animate-4 mt-12 flex gap-6">
                            <a href="https://www.linkedin.com/in/adam-valsan-6b908a386/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                                <Linkedin size={28} />
                            </a>
                        </div>
                    </section>

                    <LazySection minHeight="400px">
                        <section id="skills" className="pt-20">
                            <div className="text-center mb-16">
                                <m.h2 {...getScrollAnimation()} className="text-3xl md:text-5xl font-bold mb-4 text-white">Stack Technique</m.h2>
                                <m.p {...getScrollAnimation()} className="text-white/50 text-lg">Les outils que j&apos;utilise pour donner vie aux projets.</m.p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {SKILLS.map((skillGroup, idx) => (
                                    <m.div 
                                        key={skillGroup.category} 
                                        {...getScrollAnimation(idx * 0.1)} 
                                        className="bg-[#0A0A0C] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors"
                                    >
                                        <h3 className="text-xl font-bold text-yellow-400 mb-6 uppercase tracking-wider text-sm">{skillGroup.category}</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {skillGroup.tech.map(tech => (
                                                <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/80">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </m.div>
                                ))}
                            </div>
                        </section>
                    </LazySection>

                    <LazySection minHeight="600px">
                        <section id="projects" className="pt-20">
                             <div className="flex items-center justify-between mb-12">
                                <m.h2 {...getScrollAnimation()} className="text-3xl md:text-5xl font-bold text-white flex items-center gap-4">
                                    <Briefcase className="text-yellow-400" size={36} />
                                    Projets Phares
                                </m.h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {PROJECTS.map((project, idx) => (
                                    <ProjectCard key={project.title} project={project} delay={idx * 0.1} isMobile={isMobile} />
                                ))}
                                
                                <m.div 
                                    {...getScrollAnimation(0.3)}
                                    className="bg-[#0A0A0C] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="text-white/30 mb-4"><Code2 size={24}/></div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Générateur SVG en C</h3>
                                        <p className="text-white/50 text-sm mb-4">Projet Académique - Octobre 2025</p>
                                        <p className="text-white/70">Génération de formes géométriques (logique métier, listes chaînées, pointeurs, rendu SVG).</p>
                                    </div>
                                    <div className="mt-6 flex gap-2">
                                        <span className="text-xs font-bold text-white/40 bg-white/5 px-3 py-1 rounded-lg">C</span>
                                    </div>
                                </m.div>
                            </div>
                        </section>
                    </LazySection>

                    <LazySection minHeight="400px">
                        <section id="education" className="max-w-4xl mx-auto pt-20">
                            <m.div {...getScrollAnimation()} className="text-center mb-16">
                                <GraduationCap className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
                                <h2 className="text-3xl md:text-5xl font-bold text-white">Parcours</h2>
                            </m.div>

                            <div className="space-y-6">
                                <TimelineItem 
                                    year="2025 - Actuel"
                                    title="Bachelor Développement FullStack"
                                    school="Coda Informatique, Dijon"
                                    isCurrent={true}
                                />
                                <TimelineItem 
                                    year="Précédemment"
                                    title="Licence Économie (1ère année)"
                                    school="Université de Bourgogne"
                                />
                            </div>
                        </section>
                    </LazySection>

                </div>
            </div>
        </LazyMotion>
    );
}

function ProjectCard({ project, delay, isMobile }: { project: ProjectType, delay: number, isMobile: boolean }) {
    const viewportConfig = { once: true, amount: 0.2 };
    
    return (
        <m.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, delay }}
            className="group relative border border-white/5 bg-[#0A0A0C] overflow-hidden rounded-[2rem] p-8 transition-all hover:border-white/10"
        >
            <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at top right, ${project.color}, transparent 60%)` }} />
            
            <div className="relative h-full flex flex-col z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/70">
                        {project.icon}
                    </div>
                    <span className="text-xs font-bold tracking-wider text-yellow-400 uppercase bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                        {project.date}
                    </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">{project.title}</h3>
                <p className="text-white/60 mb-8 flex-grow leading-relaxed">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t: string) => (
                        <span key={t} className="px-3 py-1 text-xs font-bold text-white/50 bg-white/5 border border-white/10 rounded-lg">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </m.div>
    );
}

function TimelineItem({ year, title, school, isCurrent = false }: { year: string, title: string, school: string, isCurrent?: boolean }) {
    return (
        <m.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 md:gap-8 items-start relative"
        >
            <div className="absolute left-[11px] md:left-[15px] top-8 bottom-[-24px] w-px bg-white/10" />
            
            <div className={`relative z-10 w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-[#050505] flex-shrink-0 mt-1 ${isCurrent ? 'bg-yellow-400' : 'bg-white/20'}`} />
            
            <div className="bg-[#0A0A0C] border border-white/5 p-6 md:p-8 rounded-3xl w-full hover:border-white/10 transition-colors">
                <span className={`text-sm font-bold tracking-widest uppercase mb-2 block ${isCurrent ? 'text-yellow-400' : 'text-white/40'}`}>
                    {year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{title}</h3>
                <p className="text-white/60">{school}</p>
            </div>
        </m.div>
    );
}