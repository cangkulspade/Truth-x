import React from 'react';
import { Headphones, ShieldAlert, Check, X } from 'lucide-react';

interface HeadsetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const HeadsetModal: React.FC<HeadsetModalProps> = ({ isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-panel-bg border border-cyber-cyan/50 rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(0,242,254,0.2)] font-sans z-10 neon-border-cyan animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close icon */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink-primary p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan mx-auto mb-4 neon-border-cyan">
          <Headphones size={28} className="animate-pulse" />
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-[11px] font-mono font-semibold text-cyber-cyan uppercase tracking-widest mb-2">
            <span>KONFIRMASI PERANGKAT</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-mono text-ink-primary uppercase tracking-wide">
            Perangkat Kepala Terpasang?
          </h3>
        </div>

        {/* Description Body */}
        <div className="bg-black/40 border border-border-subtle rounded-xl p-4 mb-6 text-center space-y-2">
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Pastikan <span className="text-cyber-cyan font-semibold">perangkat kepala</span> sudah terpasang dengan baik pada subjek sebelum pengujian dimulai.
          </p>
          <p className="text-[11px] text-ink-muted leading-relaxed">
            Perangkat kepala diperlukan untuk kalibrasi isolasi suara akustik dan stimulasi frekuensi respon subjek secara optimal.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border-subtle text-ink-muted hover:text-ink-primary hover:border-border-subtle/80 font-mono text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
          >
            Belum Terpasang
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-cyber-cyan text-slate-950 font-mono text-xs font-bold tracking-widest uppercase hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)] cursor-pointer"
          >
            <Check size={16} className="stroke-[3]" />
            <span>Sudah Terpasang</span>
          </button>
        </div>

      </div>
    </div>
  );
};
