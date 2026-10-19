import React from 'react';
import { Play, ChevronRight, Shield, Mic, ScanFace, Activity, Timer } from 'lucide-react';

interface HeroCyberProps {
  onGoToDemo: () => void;
  onGoToTech: () => void;
}

export const HeroCyber: React.FC<HeroCyberProps> = ({ onGoToDemo, onGoToTech }) => {
  const signals = [
    { icon: <Mic size={14} />, label: 'Pola Suara', color: 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/5' },
    { icon: <ScanFace size={14} />, label: 'Respon Wajah', color: 'text-sky-400 border-sky-400/30 bg-sky-400/5' },
    { icon: <Timer size={14} />, label: 'Latensi Respon', color: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/5' },
    { icon: <Activity size={14} />, label: 'Pola Perilaku', color: 'text-cyber-green border-cyber-green/30 bg-cyber-green/5' },
    { icon: <Shield size={14} />, label: 'Konsistensi', color: 'text-cyber-amber border-cyber-amber/30 bg-cyber-amber/5' },
  ];

  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-8 py-8 overflow-hidden scroll-mt-16">

      {/* Animated grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-cyber-cyan/5 blur-[120px]" />
      </div>

      {/* Main headline */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-6 px-2">
        <h1 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tight leading-none text-ink-primary mb-2">
          TRUTH-X
        </h1>
        <div className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-bold font-mono text-ink-secondary mt-2 sm:mt-3 min-h-[2.5rem] flex flex-wrap items-center justify-center gap-2">
          <span>Mendeteksi</span>
          <span className="text-cyber-cyan neon-text-cyan">
            Kebohongan
          </span>
        </div>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-ink-secondary font-sans max-w-xl mx-auto leading-relaxed">
          Sistem simulasi yang membaca sinyal di balik setiap jawaban — suara, wajah, jeda, dan pola perilaku — secara serentak.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 mb-12">
        <button
          onClick={onGoToDemo}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/50 text-cyber-cyan font-mono font-bold text-sm tracking-widest uppercase hover:bg-cyber-cyan/20 hover:border-cyber-cyan transition-all cursor-pointer neon-border-cyan"
        >
          <Play size={16} className="fill-current" />
          Mulai Demo
        </button>

        <button
          onClick={onGoToTech}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border-subtle text-ink-secondary font-mono text-sm tracking-widest uppercase hover:border-cyber-cyan/30 hover:text-cyber-cyan transition-all cursor-pointer"
        >
          Teknologi
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Signal pills */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2">
        {signals.map((s, i) => (
          <div
            key={i}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono font-semibold tracking-widest uppercase ${s.color}`}
          >
            {s.icon}
            {s.label}
          </div>
        ))}
      </div>

      {/* Bottom scan line decoration */}
      <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center pointer-events-none">
        <div className="h-px w-64 bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
        <span className="mx-4 text-[10px] font-mono text-ink-muted tracking-widest uppercase">Scroll atau pilih menu</span>
        <div className="h-px w-64 bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
      </div>

    </section>
  );
};
