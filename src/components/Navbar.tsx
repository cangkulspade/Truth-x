import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Play } from 'lucide-react';

export type PageType = 'home' | 'demo' | 'tech';

interface NavbarProps {
  onStartAnalysis: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS: { id: string; label: string }[] = [
  { id: 'home', label: 'Beranda' },
  { id: 'demo', label: 'Demo' },
  { id: 'tech', label: 'Teknologi' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onStartAnalysis,
  soundEnabled,
  onToggleSound,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 border-b border-border-subtle bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* Brand */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleMobileNav('home')}
        >
          <span className="text-xl font-bold tracking-widest text-ink-primary font-mono uppercase neon-text-cyan flicker">
            TRUTH-X
          </span>
        </div>

        {/* Desktop / Tablet Navigation */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border border-border-subtle bg-panel-bg">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-widest uppercase transition-all cursor-pointer ${
                activeSection === link.id
                  ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/40 shadow-[0_0_10px_rgba(0,242,254,0.15)]'
                  : 'text-ink-muted hover:text-ink-secondary'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Audio aktif' : 'Audio nonaktif'}
            className="p-2 rounded-lg border border-border-subtle bg-panel-bg text-ink-secondary hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all cursor-pointer"
            aria-label="Toggle Audio"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => { onNavigate('demo'); onStartAnalysis(); }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono font-semibold tracking-widest uppercase hover:bg-cyber-cyan/20 hover:border-cyber-cyan/60 transition-all cursor-pointer neon-border-cyan"
          >
            MULAI UJI
          </button>

          {/* Mobile hamburger toggle button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 md:hidden rounded-lg border border-border-subtle bg-panel-bg text-ink-secondary hover:text-cyber-cyan transition-colors cursor-pointer"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-panel-bg/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-2xl">
          <div className="grid grid-cols-3 gap-2 pb-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleMobileNav(link.id)}
                className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold tracking-wider uppercase text-center border transition-all ${
                  activeSection === link.id
                    ? 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/40'
                    : 'bg-black/30 border-border-subtle text-ink-muted hover:text-ink-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              handleMobileNav('demo');
              onStartAnalysis();
            }}
            className="w-full py-2.5 rounded-lg bg-cyber-cyan text-slate-950 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
          >
            <Play size={13} className="fill-current" />
            <span>Mulai Uji Sekarang</span>
          </button>
        </div>
      )}
    </header>
  );
};


