import React from 'react';
import { Mic, ScanFace, Timer, CheckCheck, GitMerge, ArrowRight, ShieldCheck } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const techCards = [
    {
      icon: <Mic className="text-cyan-400" size={24} />,
      title: "ANALISIS POLA SUARA (VOICE ANALYSIS)",
      subtitle: "Kanal Akustik & Vokal",
      desc: "Menganalisis simulasi pola vokal, modulasi frekuensi mikro, variasi amplitudo, dan getaran nada yang kerap berkorelasi dengan tingkat ketegangan psikologis subjek."
    },
    {
      icon: <ScanFace className="text-blue-400" size={24} />,
      title: "RESPON WAJAH (FACIAL RESPONSE)",
      subtitle: "Kanal Mikro-Ekspresi",
      desc: "Melacak simulasi dinamika ekspresi mikro bawah sadar, tingkat kedipan mata (blink rate), serta dilatasi pupil sesaat setelah menerima pertanyaan provokatif."
    },
    {
      icon: <Timer className="text-indigo-400" size={24} />,
      title: "LATENSI RESPON (RESPONSE LATENCY)",
      subtitle: "Beban Kognitif (Cognitive Load)",
      desc: "Mengukur simulasi waktu jeda milidetik antara akhir kalimat interogator dan respon pertama subjek guna mendeteksi beban kognitif dalam merekayasa skenario narasi."
    },
    {
      icon: <CheckCheck className="text-teal-400" size={24} />,
      title: "KONSISTENSI JAWABAN (ANSWER CONSISTENCY)",
      subtitle: "Validasi Lintas Pernyataan",
      desc: "Memeriksa simulasi koherensi logis antar jawaban dari pertanyaan beruntun untuk mendeteksi retakan naratif atau penyangkalan yang bertolak belakang."
    },
    {
      icon: <GitMerge className="text-purple-400" size={24} />,
      title: "POLA PERILAKU TERPADU (BEHAVIORAL PATTERN)",
      subtitle: "Matriks Fisiologis Agregat",
      desc: "Mengintegrasikan seluruh aliran sinyal independen ke dalam model probabilitas terpadu untuk menghasilkan estimasi diskrepansi respon secara objektif."
    }
  ];

  return (
    <section id="tech" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 sm:px-8 py-12 scroll-mt-16">
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-cyan/25 bg-cyber-cyan/5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
            <span className="text-[11px] font-mono text-cyber-cyan tracking-widest uppercase">Arsitektur & Metodologi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-mono text-ink-primary tracking-tight neon-text-cyan mb-3">
            BAGAIMANA TRUTH-X MEMBACA SINYAL?
          </h2>
          <p className="text-sm text-ink-secondary font-sans max-w-xl mx-auto leading-relaxed">
            Lima kanal sinyal perilaku independen diukur secara paralel dan diintegrasikan menjadi satu skor probabilitas.
          </p>
        </div>

        {/* Signal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {techCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl bg-panel-bg border border-border-subtle hover:border-cyber-cyan/30 transition-all group ${
                idx === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/60 border border-border-subtle flex items-center justify-center font-mono text-xs text-ink-muted font-bold">
                    0{idx + 1}
                  </div>
                  <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                    {card.icon}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-ink-muted border border-border-subtle px-2 py-0.5 rounded uppercase tracking-widest">
                  {card.subtitle}
                </span>
              </div>
              <h3 className="text-sm font-bold font-mono text-ink-primary tracking-wide mb-1.5">
                {card.title}
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed font-sans">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pipeline Bar */}
        <div className="p-4 rounded-xl bg-panel-bg border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-ink-muted uppercase tracking-widest">Pipeline Analisis:</span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
            {['1. Akustik', '2. Wajah', '3. Latensi', '4. Semantik'].map((s, i) => (
              <React.Fragment key={i}>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-border-subtle text-ink-secondary">{s}</span>
                <span className="text-cyber-cyan">→</span>
              </React.Fragment>
            ))}
            <span className="px-3 py-1 rounded bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan font-bold neon-text-cyan">
              Skor Probabilitas (0–100%)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

