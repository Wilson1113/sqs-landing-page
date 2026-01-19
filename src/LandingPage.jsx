import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Target, Layers, Shield, Terminal, ArrowRight, Activity, Globe, Lock, Cpu, Database, ChevronRight, Zap, Play, Search, Bell, Settings, Wallet } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// --- Components ---

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#02040a] text-white overflow-hidden selection:bg-cyan-500/30 font-sans">
            <Navbar />
            <Hero />
            <PainPointMarquee />
            <FeatureBentoGrid />
            <TechFlex />
            <Pricing />
            <Footer />
        </div>
    );
};

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#02040a]/50 backdrop-blur-md border-b border-white/5"
        >
            <div className="flex items-center gap-3 group cursor-pointer">
                {/* Quant Cube Logo */}
                <div className="w-8 h-8 relative transform-style-3d group-hover:rotate-[360deg] transition-transform duration-700">
                    <div className="absolute inset-0 border-2 border-cyan-500 rounded bg-cyan-500/20" />
                    <div className="absolute inset-0 border-2 border-white/50 rounded rotate-45 scale-75" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">SQS</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#tech" className="hover:text-white transition-colors">Technology</a>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    BETA FULL
                </div>
            </div>
        </motion.nav>
    );
};

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [0, -10]);

    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    }

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative min-h-[120vh] flex flex-col items-center pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
            {/* Dynamic Cyber Grid Background */}
            <div className="absolute inset-0 pointer-events-none perspective-1000">
                {/* Deep Space Starfield */}
                <StarField density={150} />

                {/* Vertical Data Rain */}
                <RainLines />

                {/* Moving Grid Floor (Bottom) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-50 animate-[grid-move_20s_linear_infinite]" />

                {/* Moving Grid Ceiling (Top - Mirror) */}
                <div className="absolute inset-x-0 top-0 h-[40vh] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-30 animate-[grid-move_30s_linear_infinite]" />


                <ShootingStars />
                <ParticleField mouseX={mouseX} mouseY={mouseY} />

                <div className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-[aurora-1_10s_infinite_alternate]" />
                <div className="absolute top-[-10%] right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen animate-[aurora-2_12s_infinite_alternate]" />
            </div>

            <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto space-y-8 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:border-cyan-500/30 transition-colors"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-xs font-medium tracking-wide text-cyan-100/80 uppercase">Now Accepting Alpha Applicants</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-none"
                >
                    Dominate the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-600 animate-pulse-glow">
                        <ScrambleText text="Mempool." className="" />
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
                >
                    The first local-hosted Java trading terminal for Solana. <br className="hidden md:block" />
                    <span className="text-gray-300">Execute faster than the block building time.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href="#pricing">
                        <MagneticButton className="px-8 py-4 bg-[#fff] text-black font-bold rounded-lg hover:bg-cyan-50 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            JOIN WHITELIST <ArrowRight className="w-4 h-4" />
                        </MagneticButton>
                    </a>
                </motion.div>
            </motion.div>

            {/* 3D Dashboard Container */}
            <motion.div
                style={{ rotateX }}
                initial={{ opacity: 0, y: 100, rotateX: 30 }}
                animate={{ opacity: 1, y: 0, rotateX: 10 }}
                transition={{ duration: 1.2, delay: 0.5, type: "spring", bounce: 0.2 }}
                className="w-full max-w-7xl perspective-1000"
            >
                <DashboardUI />
            </motion.div>
        </section>
    );
};

// --- Recreated Dashboard UI based on User Screenshot ---
const DashboardUI = () => {
    return (
        <div className="relative w-full aspect-[16/10] bg-[#030610] rounded-xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden transform-style-3d group">
            {/* Header */}
            <div className="h-14 border-b border-white/5 bg-[#050914] flex items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg">
                        <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center text-black text-xs">S</div>
                        SQS TERMINAL
                    </div>
                    <div className="hidden md:flex gap-1">
                        {['Dashboard', 'Wallet Manager', 'Bundler', 'Copy Trade', 'Settings'].map((item, i) => (
                            <div key={item} className={`px-4 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors ${i === 0 ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-500 hover:text-gray-300'}`}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        RPC: 12ms
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        JITO: CONNECTED
                    </div>
                    <button className="bg-white text-black px-3 py-1.5 rounded font-bold hover:bg-gray-200 transition-colors">
                        CONNECT WALLET
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="p-6 grid grid-cols-12 gap-6 h-[calc(100%-3.5rem)]">
                {/* Top Row: Stats Cards */}
                <div className="col-span-12 grid grid-cols-4 gap-6 h-[120px]">
                    <StatCard title="NET LIQUIDITY" value="145.2 SOL" subValue="≈ $21,450.00" />
                    <StatCard title="REALIZED PNL" value="+12.4 SOL" subValue="All-time realization" valueColor="text-green-500" />
                    <StatCard title="UNREALIZED PNL" value="+42.8 SOL" subValue="Active Positions" valueColor="text-green-500" badge="+15.2%" />
                    <StatCard title="WIN RATE" value="68.4%" subValue="142 Trades" chart />
                </div>

                {/* Middle Row: Chart & Asset Allocation */}
                <div className="col-span-8 bg-[#050914] border border-white/5 rounded-lg p-6 relative group/chart">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Performance History
                        </h3>
                        <div className="flex bg-white/5 rounded p-0.5">
                            {['24H', '7D', '30D'].map((t, i) => (
                                <div key={t} className={`px-3 py-1 rounded text-[10px] font-mono cursor-pointer ${i === 0 ? 'bg-white/10 text-white' : 'text-gray-500'}`}>{t}</div>
                            ))}
                        </div>
                    </div>
                    {/* SVG Chart Line */}
                    <div className="relative h-48 w-full mt-8">
                        <svg className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,150 C50,140 100,100 150,100 C200,100 250,120 300,110 C350,100 400,60 450,50 C500,40 550,45 600,30 C650,15 700,20 750,10"
                                fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke"
                                className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                            <path d="M0,150 C50,140 100,100 150,100 C200,100 250,120 300,110 C350,100 400,60 450,50 C500,40 550,45 600,30 C650,15 700,20 750,10 V200 H0 Z"
                                fill="url(#gradient)" className="opacity-50" />
                        </svg>
                    </div>
                </div>

                <div className="col-span-4 bg-[#050914] border border-white/5 rounded-lg p-6 relative">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-6 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Asset Allocation
                    </h3>
                    <div className="flex flex-col items-center justify-center h-48">
                        <div className="relative w-32 h-32 rounded-full border-8 border-cyan-500/20 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-8 border-cyan-500 border-t-transparent border-l-transparent rotate-45" />
                            <div className="text-center">
                                <div className="text-xl font-bold">6</div>
                                <div className="text-[10px] text-gray-500">POS</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-mono">
                        <div className="flex justify-between text-gray-400"><span>SOL</span> <span className="text-white">145.2</span></div>
                        <div className="flex justify-between text-gray-400"><span>POPCAT</span> <span className="text-white">15.5</span></div>
                        <div className="flex justify-between text-gray-400"><span>PYTH</span> <span className="text-white">9.5</span></div>
                        <div className="flex justify-between text-gray-400"><span>JUP</span> <span className="text-white">8.4</span></div>
                    </div>
                </div>

                {/* Bottom Row: Logs */}
                <div className="col-span-12 bg-[#050914] border border-white/5 rounded-lg p-4 font-mono text-[10px] h-[150px] overflow-hidden relative">
                    <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                        <span className="text-gray-500">GLOBAL LOGS</span>
                        <span className="text-cyan-500 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" /> LIVE</span>
                    </div>
                    <div className="space-y-1.5 text-gray-400">
                        <div className="flex gap-4">
                            <span className="text-gray-600">[05:29:45]</span>
                            <span className="text-cyan-500 w-12">SYSTEM</span>
                            <span>Initializing core SQS modules...</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-gray-600">[05:29:45]</span>
                            <span className="text-green-500 w-12">GRPC</span>
                            <span>Connected to Yellowstone endpoint (Region: us-east-1)</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-gray-600">[05:29:45]</span>
                            <span className="text-yellow-500 w-12">DB</span>
                            <span>H2 database mounted: /secure/wallets.db</span>
                        </div>
                        <div className="flex gap-4 opacity-50">
                            <span className="text-gray-600">[05:29:46]</span>
                            <span className="text-purple-500 w-12">JITO</span>
                            <span>Bundle tip floor: 0.00005 SOL</span>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#050914] to-transparent" />
                </div>
            </div>

            {/* Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent pointer-events-none mix-blend-overlay" />
        </div>
    );
};

const StatCard = ({ title, value, subValue, valueColor = "text-white", badge, chart }) => (
    <div className="bg-[#050914] border border-white/5 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors">
        <div className="text-[10px] font-bold text-gray-500 uppercase flex justify-between">
            {title}
            {badge && <span className="bg-green-500/10 text-green-500 px-1.5 rounded">{badge}</span>}
        </div>
        <div>
            <div className={`text-2xl font-bold ${valueColor} mb-1 group-hover:scale-105 transition-transform origin-left`}>{value}</div>
            <div className="text-[10px] text-gray-500">{subValue}</div>
        </div>
        {/* Simple visual flourish for charts */}
        {chart && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" style={{ animationDuration: '3s' }} />
        )}
    </div>
);


const PainPointMarquee = () => {
    return (
        <div className="py-12 bg-[#02040a] border-y border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-transparent to-[#02040a] z-10 pointer-events-none" />
            <div className="flex whitespace-nowrap gap-16 animated-marquee">
                <MarqueeContent />
                <MarqueeContent />
            </div>
        </div>
    );
};

const MarqueeContent = () => (
    <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex gap-16 items-center"
    >
        {[
            { text: "FAILED LAUNCH", color: "text-red-500" },
            { text: "SANDWICH ATTACK", color: "text-orange-500" },
            { text: "RPC LAG", color: "text-red-500" },
            { text: "RUG PULLED", color: "text-red-500" },
            { text: "HIGH GAS", color: "text-orange-500" },
            { text: "SLOW EXECUTION", color: "text-red-500" },
        ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
                <span className={`font-mono text-xl font-bold ${item.color} opacity-80`}>{item.text}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            </div>
        ))}
    </motion.div>
);

const FeatureBentoGrid = () => {
    return (
        <section id="features" className="py-32 px-4 relative max-w-7xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="text-center mb-20 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything you need to <span className="text-cyan-500">win</span>.</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Built for the trader who refuses to lose to a Python script.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {/* Large Card */}
                <SpotlightCard className="md:col-span-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-8 h-full flex flex-col justify-between relative z-10">
                        <div>
                            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Atomic Copy-Trading</h3>
                            <p className="text-gray-400 max-w-md">Our Java-based gRPC monitoring detects target transactions in the mempool and executes your copy trade within the same block. Beats Python competitors by ~200ms.</p>
                        </div>
                        <div className="w-full h-32 bg-black/20 rounded-lg border border-white/5 overflow-hidden relative">
                            {/* Abstract Visualization of "Speed" */}
                            <div className="absolute inset-0 flex items-center justify-center gap-1">
                                <div className="w-20 h-1 bg-cyan-500 animate-[beam_1s_infinite]" />
                                <div className="w-20 h-1 bg-cyan-500/50 animate-[beam_1.2s_infinite]" />
                                <div className="w-20 h-1 bg-cyan-500/20 animate-[beam_1.5s_infinite]" />
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Tall Card */}
                <SpotlightCard className="md:row-span-2 relative overflow-hidden">
                    <div className="p-8 h-full flex flex-col relative z-10">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Jito Bundles</h3>
                        <p className="text-gray-400 mb-8">Deploy, Add Liquidity, and Buy in a single transaction bundle.</p>

                        <div className="flex-1 bg-[#050914] rounded-lg border border-white/5 p-4 space-y-3 font-mono text-[10px]">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full" />
                                    <div className="w-8 h-1.5 bg-white/10 rounded-full" />
                                </div>
                            ))}
                            <div className="mt-4 text-center text-green-500 font-bold border-t border-white/10 pt-4">
                                BUNDLE SECURE
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Standard Card */}
                <SpotlightCard className="relative overflow-hidden">
                    <div className="p-8 h-full flex flex-col justify-center relative z-10">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-4">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Local-First Security</h3>
                        <p className="text-gray-400 text-sm">Private keys are AES-256 encrypted on your machine. We never see your keys.</p>
                    </div>
                </SpotlightCard>

                {/* Standard Card */}
                <SpotlightCard className="relative overflow-hidden">
                    <div className="p-8 h-full flex flex-col justify-center relative z-10">
                        <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No API Rate Limits</h3>
                        <p className="text-gray-400 text-sm">Direct connection to Yellowstone gRPC. Stream unlimited data without throttling.</p>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
};

// --- Reusable Spotlight Card ---
const SpotlightCard = ({ children, className = "" }) => {
    return (
        <div className={cn("relative h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors hover:bg-white/10", className)}>
            {/* Spotlight Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:animate-shine" />
            </div>
            {children}
        </div>
    );
};

const TechFlex = () => {
    return (
        <section id="tech" className="py-32 bg-[#010205] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-8 mb-12 lg:mb-0">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Built on <span className="text-orange-500">Enterprise Java</span>. <br />
                        Powered by <span className="text-blue-500">Virtual Threads</span>.
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Node.js is single-threaded. Python is interpreted. SQS runs on the JVM with Project Loom virtual threads, allowing for concurrent monitoring of thousands of wallets with near-zero overhead.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Latency', value: '< 15ms', color: 'text-green-500' },
                            { label: 'Throughput', value: '50k TPS', color: 'text-cyan-500' },
                            { label: 'Uptime', value: '99.99%', color: 'text-blue-500' },
                            { label: 'Garbage Collection', value: 'ZGC', color: 'text-orange-500' },
                        ].map((stat) => (
                            <div key={stat.label} className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
                                <div className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    {/* Decorative Elements */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20" />

                    {/* Terminal Window */}
                    <div className="relative rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
                        <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#111]">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="ml-4 text-xs text-gray-500 font-mono">sqs-engine — java — 85x24</div>
                        </div>
                        <div className="p-6 font-mono text-xs md:text-sm h-[300px] overflow-hidden">
                            <TypewriterLog />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TypewriterLog = () => {
    // Simulated log stream
    const [logs, setLogs] = useState([
        { time: "10:42:01.042", level: "INFO", msg: "Jito Client Connected (Latency: 12ms)", color: "text-blue-400" },
        { time: "10:42:01.045", level: "INFO", msg: "Mempool Scanner Active...", color: "text-blue-400" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = generateRandomLog();
            setLogs(prev => [...prev.slice(-8), newLog]);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-3">
            {logs.map((log, i) => (
                <div key={i} className="flex gap-3 animate-slide-in items-center">
                    <span className="text-gray-600 shrink-0">{log.time}</span>
                    <span className={`font-bold shrink-0 w-20 ${log.level === 'WARN' ? 'text-yellow-500' : log.level === 'EXEC' ? 'text-purple-500' : log.level === 'SUCCESS' ? 'text-green-500' : 'text-blue-500'}`}>[{log.level}]</span>
                    <span className="text-gray-300 min-w-0 truncate">{log.msg}</span>
                </div>
            ))}
            <div className="animate-pulse text-cyan-500">_</div>
        </div>
    );
};

const generateRandomLog = () => {
    const types = [
        { level: 'INFO', msg: `Scanning block ${Math.floor(Math.random() * 1000000)}...`, color: 'text-blue-400' },
        { level: 'WARN', msg: `Detected Snipe Target: ${Math.random().toString(36).substring(7)}`, color: 'text-yellow-400' },
        { level: 'EXEC', msg: 'Building Bundle (Buy + Tip)...', color: 'text-purple-400' },
        { level: 'SUCCESS', msg: `Bundle landed in slot ${Math.floor(Math.random() * 100)}`, color: 'text-green-400' },
    ];
    return {
        time: new Date().toISOString().split('T')[1].slice(0, 12),
        ...types[Math.floor(Math.random() * types.length)]
    };
};


const Pricing = () => {
    return (
        <section id="pricing" className="py-32 relative overflow-hidden">
            <div className="max-w-md mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Limited Alpha Release</h2>
                    <p className="text-gray-400">Join the waitlist. Only 500 spots available.</p>
                </div>

                <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500 to-blue-600 relative group">
                    <div className="bg-[#0b0c15] rounded-[22px] p-8 h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <div className="w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl" />
                        </div>

                        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-wider mb-6 border border-cyan-500/20">
                            EARLY ACCESS
                        </div>

                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-gray-500 line-through text-lg">2 SOL</span>
                        </div>
                        <div className="text-5xl font-bold text-white mb-8 tracking-tight">
                            0 SOL <span className="text-lg font-normal text-gray-400 tracking-normal">(Deposit)</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            {[
                                'Lifetime License Opportunity',
                                'Discord "Whale" Channel',
                                'Direct Dev Support',
                                'Voting Rights on Features'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                                        <span className="text-cyan-400 text-xs">✓</span>
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSc6MhZsZo9fhZl1g9T-9LsUvaiEJCgHLuVF5kuB7uyB4y0QwQ/viewform?usp=publish-editor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center"
                        >
                            <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                APPLY FOR ACCESS
                            </button>
                        </a>
                        <p className="mt-4 text-center text-xs text-gray-500">
                            *Deposit is refundable after 30 days of inactivity.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-sm bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Solana Quant Suite.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
        </div>
    </footer>
);

// --- Small Helper for Magnetic Buttons ---
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.2; // Strength
        const y = (clientY - (top + height / 2)) * 0.2;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.button>
    );
};


// --- Particle Field Component ---
const ParticleField = ({ mouseX, mouseY }) => {
    // Generate random particles
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 20 + 10,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((p) => {
                // Parallax logic would go here, simplified for performance
                return (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-cyan-500/30"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                );
            })}
        </div>
    );
};

// --- Scramble Text Component ---
const ScrambleText = ({ text, className }) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    useEffect(() => {
        let interval;
        let iteration = 0;

        const scramble = () => {
            clearInterval(interval);
            interval = setInterval(() => {
                setDisplay(prev =>
                    text.split("").map((letter, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("")
                );

                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        };

        // Trigger on mount and hover
        scramble();
        // Set up infinite loop every few seconds
        const loop = setInterval(() => {
            iteration = 0;
            scramble();
        }, 5000);

        return () => {
            clearInterval(interval);
            clearInterval(loop);
        };
    }, [text]);

    return <span className={className}>{display}</span>;
};


// --- Shooting Stars Component ---
const ShootingStars = () => {
    const [meteorStyles, setMeteorStyles] = useState([]);

    useEffect(() => {
        const styles = [...new Array(10)].map(() => ({
            top: Math.floor(Math.random() * -200) + 'px', // Start above/outside
            left: Math.floor(Math.random() * 100) + '%',
            animationDelay: Math.random() * 10 + 0.2 + 's',
            animationDuration: Math.floor(Math.random() * 4 + 2) + 's',
        }));
        setMeteorStyles(styles);
    }, []);

    return (
        <div className="absolute inset-x-0 top-0 h-[50vh] overflow-hidden pointer-events-none">
            {meteorStyles.map((style, idx) => (
                <span
                    key={idx}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-[meteor_3s_linear_infinite] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
                    style={style}
                >
                    <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[100px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
                </span>
            ))}
        </div>
    );
};

// --- StarField Component ---
const StarField = ({ density = 100 }) => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const newStars = Array.from({ length: density }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            blinkDuration: Math.random() * 5 + 2,
        }));
        setStars(newStars);
    }, [density]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        opacity: star.opacity,
                        animation: `pulse-glow ${star.blinkDuration}s infinite alternate`,
                    }}
                />
            ))}
        </div>
    );
};

// --- RainLines Component (Digital Rain) ---
const RainLines = () => {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent w-[1px] h-[30vh]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}%`,
                        animation: `float-slow ${Math.random() * 5 + 3}s linear infinite`,
                        animationDelay: `-${Math.random() * 5}s`
                    }}
                />
            ))}
        </div>
    );
};

export default LandingPage;
