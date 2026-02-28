import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/4biz_logo.png'; 

const Header = () => {
const [isOpen, setIsOpen] = useState(false);
const { scrollY } = useScroll();
const headerWidth = useTransform(scrollY, [0, 80], ['100%', '92%']);
const headerY = useTransform(scrollY, [0, 80], [0, 20]);
const borderRadius = useTransform(scrollY, [0, 80], ['0px', '100px']);
const headerHeight = useTransform(scrollY, [0, 80], ['80px', '70px']);
const backgroundColor = useTransform(scrollY, [0, 80], ['rgba(3, 3, 11, 0)', 'rgba(3, 3, 11, 0.95)']);

const navLinks = [
{ name: 'HOME', href: '#home' },
{ name: 'ABOUT', href: '#about' },
{ name: 'SERVICES', href: '#services' },
{ name: 'CONTACT', href: '#contact' },
{ name: 'BLOG', href: '#blog' },
];

return (
<>
<style>{`
@keyframes space-nebula {
0% { transform: scale(1) rotate(0deg); filter: blur(20px); opacity: 0.6; }
50% { transform: scale(1.5) rotate(180deg); filter: blur(30px); opacity: 0.9; }
100% { transform: scale(1) rotate(360deg); filter: blur(20px); opacity: 0.6; }
}
@keyframes star-core-pulse {
0%, 100% { transform: scale(1); opacity: 0.5; filter: brightness(1.5) blur(20px); }
50% { transform: scale(2.2); opacity: 1; filter: brightness(3) blur(40px); }
}
@keyframes header-beam {
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
}
.nebula-flare {
position: absolute;
inset: -20px;
border-radius: 50%;
mix-blend-mode: plus-lighter;
pointer-events: none;
animation: space-nebula 8s infinite linear;
}
`}</style>

<motion.header
style={{ width: headerWidth, y: headerY, borderRadius, height: headerHeight, backgroundColor, backdropFilter: 'blur(25px)' }}
className="fixed left-1/2 -translate-x-1/2 z-[100] border border-white/10 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ease-out shadow-[0_10px_50px_rgba(0,0,0,0.6)]"
>
<div className="relative flex items-center group cursor-pointer ml-4 md:ml-6">
<div className="absolute inset-0 z-0 scale-[2.2]">
<div className="absolute inset-0 bg-white/40 rounded-full animate-[star-core-pulse_3s_infinite_ease-in-out] blur-[25px]" />
<div className="nebula-flare bg-gradient-to-tr from-[#00f2ff] via-[#00f2ff]/30 to-transparent" />
<div className="nebula-flare bg-gradient-to-bl from-[#bf00ff] via-[#bf00ff]/30 to-transparent" style={{ animationDelay: '-4s', animationDuration: '6s' }} />
<div className="nebula-flare bg-gradient-to-br from-[#ff00d4] via-transparent to-transparent opacity-70" style={{ animationDelay: '-2s', animationDuration: '10s' }} />
<div className="absolute inset-[-30px] bg-cyan-500/20 blur-[60px] animate-pulse" />
</div>
<div className="relative z-10 py-1">
<img 
src={logo} 
alt="4Biz Logo" 
className="h-9 md:h-12 w-auto brightness-150 contrast-150 drop-shadow-[0_0_15px_rgba(0,242,255,0.9)] drop-shadow-[0_0_30px_rgba(191,0,255,0.6)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-[2deg]" 
/>
</div>
</div>

<nav className="hidden lg:flex items-center gap-8">
{navLinks.map((link) => (
<a key={link.name} href={link.href} className="text-[11px] uppercase tracking-[0.25em] font-black text-white hover:text-[#00f2ff] transition-all duration-300 relative group">
{link.name}
<span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4] transition-all duration-500 group-hover:w-full" />
</a>
))}
</nav>

<div className="flex items-center gap-6">
<button className="hidden sm:block group relative px-7 py-2.5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 bg-[#03030b] border border-white/10">
<div className="absolute inset-[-250%] animate-[header-beam_3.5s_linear_infinite] opacity-100 group-hover:opacity-0 transition-opacity">
<div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_120deg,#00f2ff_180deg,#bf00ff_240deg,#ff00d4_300deg,transparent_360deg)]" />
</div>
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#00f2ff] via-[#bf00ff] to-[#ff00d4]" />
<div className="absolute inset-[1.5px] bg-[#03030b] rounded-full z-0 transition-all group-hover:bg-transparent" />
<span className="relative z-10 text-white font-black tracking-widest text-[10px] uppercase">GET STARTED</span>
</button>

<button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center z-[110]">
<div className="flex flex-col gap-[6px] items-end">
<motion.span animate={isOpen ? { rotate: 45, y: 7.5, width: '22px' } : { rotate: 0, y: 0, width: '22px' }} className="h-[2px] bg-white block origin-center" />
<motion.span animate={isOpen ? { opacity: 0, x: 5 } : { opacity: 1, x: 0 }} className="w-4 h-[2px] bg-white block" />
<motion.span animate={isOpen ? { rotate: -45, y: -7.5, width: '22px' } : { rotate: 0, y: 0, width: '14px' }} className="h-[2px] bg-white block origin-center" />
</div>
</button>
</div>
</motion.header>

<AnimatePresence>
{isOpen && (
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[95] bg-[#03030b]/98 backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden">
<nav className="flex flex-col gap-10 text-center">
{navLinks.map((link, i) => (
<motion.a key={link.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} href={link.href} onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase tracking-widest text-white hover:text-[#00f2ff] transition-colors">{link.name}</motion.a>
))}
</nav>
</motion.div>
)}
</AnimatePresence>
</>
);
};

export default Header;