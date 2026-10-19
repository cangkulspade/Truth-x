import React from 'react';
import { Shield, Cpu, Activity, Terminal, Globe, ChevronUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop?: () => void;
  onNavigateSection?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigateSection }) => {
  const scrollTo = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-panel-bg/95 border-t border-border-subtle mt-20 font-mono text-ink-secondary overflow-hidden">
      {/* Decorative gradient glow at top of footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-cyber-cyan/5 blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan neon-border-cyan">
                <Terminal size={16} />
              </div>
              <span className="text-xl font-bold tracking-widest text-ink-primary uppercase neon-text-cyan">
                TRUTH-X
              </span>
            </div>

            <p className="text-xs text-ink-muted leading-relaxed font-sans max-w-sm">
              Sistem simulasi analisis integritas multimodal berkecepatan tinggi. Membaca mikro-sinyal akustik, dinamika ekspresi wajah, latensi kognitif, dan koherensi pernyataan secara simultan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-ink-primary uppercase tracking-widest">
              Navigasi
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-cyber-cyan transition-colors text-left cursor-pointer"
                >
                  Beranda Sistem
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('demo')}
                  className="hover:text-cyber-cyan transition-colors text-left cursor-pointer"
                >
                  Workbench Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('tech')}
                  className="hover:text-cyber-cyan transition-colors text-left cursor-pointer"
                >
                  Arsitektur & Sinyal
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('disclaimer')}
                  className="hover:text-cyber-cyan transition-colors text-left cursor-pointer"
                >
                  Batasan & Regulasi
                </button>
              </li>
            </ul>
          </div>

          {/* Sinyal Kanal Parameter */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-ink-primary uppercase tracking-widest">
              Modalitas Sinyal
            </div>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li className="flex items-center gap-1.5">
                <span className="text-cyber-cyan">▸</span> Spektrum Akustik Vokal
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-cyber-cyan">▸</span> Mikro-Ekspresi Wajah
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-cyber-cyan">▸</span> Latensi Kognitif (ms)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-cyber-cyan">▸</span> Validasi Lintas Logika
              </li>
            </ul>
          </div>

          {/* Compliance & Security Badge */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-ink-primary uppercase tracking-widest">
              Keamanan & Data
            </div>
            <div className="p-3 rounded-lg border border-border-subtle bg-background/50 text-[11px] text-ink-muted leading-relaxed font-sans">
              Pemrosesan stream kamera dan audio bersifat zero-cloud retention. Seluruh simulasi inferensi dieksekusi secara lokal pada browser klien.
            </div>
          </div>

        </div>

        {/* Disclaimer Warning Box */}
        <div id="disclaimer" className="p-4 rounded-xl border border-cyber-amber/30 bg-cyber-amber/5 mb-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-cyber-amber font-bold text-xs uppercase tracking-wider shrink-0">
              [PEMBERITAHUAN ETIKA & HUKUM]
            </div>
            <p className="text-[11px] font-sans text-ink-secondary leading-relaxed">
              TRUTH-X dirancang murni untuk riset interaksi manusia-komputer, edukasi, dan simulasi teknologi investigatif. Skor probabilitas dan deteksi diskrepansi dihasilkan lewat model simulasi perilaku matematis dan tidak dapat dijadikan pengganti pembuktian hukum, tes poligraf yudisial, maupun diagnosa psikologis klinis resmi.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ink-muted">
          <div>
            © {new Date().getFullYear()} TRUTH-X Multi-Signal Detection Lab. Hak cipta dilindungi.
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-ink-muted">Simulasi Kognitif & Interogasi v2.4</span>
            {onScrollToTop && (
              <button
                onClick={onScrollToTop}
                className="flex items-center gap-1 px-2.5 py-1 rounded border border-border-subtle hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-all cursor-pointer"
                title="Kembali ke atas"
              >
                <ChevronUp size={13} />
                <span>ATAS</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
