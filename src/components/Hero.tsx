import React from 'react';
import { Activity, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
  onExploreTech: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartAnalysis,
  onExploreTech,
}) => {
  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-12">
      
      {/* Warm Ambient Radial Glow as in reference image */}
      <div className="absolute right-[-10%] top-[10%] w-[650px] h-[650px] bg-gradient-to-tr from-amber-400/20 via-orange-400/25 to-transparent rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-orange-300/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Typography, Eyebrow & Dual Pill CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-sans text-slate-700">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="font-medium">Asisten Analisis Perilaku Cerdas</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-bold tracking-tight text-slate-900 font-sans leading-[1.08]">
            Deteksi akurasi respon dengan <span className="relative inline-block text-slate-900">
              analisis
              <span className="text-orange-500 ml-1.5 font-normal">✦</span>
            </span> sinyal multimodal.
          </h1>

          {/* Subtitle Description */}
          <p className="max-w-xl text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Bukan sekadar kuesioner konvensional. Sistem cerdas yang mengukur modulasi vokal, mikro-ekspresi wajah, dan jeda kognitif untuk memberikan estimasi diskrepansi objektif.
          </p>

          {/* Dual Action Buttons matching reference */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Uji Sekarang</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">→</span>
            </button>

            <button
              onClick={onExploreTech}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium text-sm transition-all shadow-xs cursor-pointer"
            >
              <span>Eksplorasi Metodologi</span>
              <span className="text-orange-500 text-xs">✦</span>
            </button>
          </div>

          {/* Social Proof / Context Bar */}
          <div className="pt-8 border-t border-slate-200/70 flex items-center gap-8 text-xs font-sans text-slate-400">
            <span className="font-semibold text-slate-500 tracking-wide">METRIK TERUJI:</span>
            <div className="flex items-center gap-6 text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">● Sensor Optik</span>
              <span className="flex items-center gap-1.5 font-medium">● Analisis Audio</span>
              <span className="flex items-center gap-1.5 font-medium">● Waktu Jeda</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Clean Dashboard Card matching user image */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Main Elevated Glass Card */}
          <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-7 border border-white/80 shadow-[0_20px_50px_rgba(249,115,22,0.12),0_4px_16px_rgba(0,0,0,0.04)] relative z-10 transition-all hover:scale-[1.01]">
            
            {/* Card Header with Score */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-sans font-medium text-slate-500">
                  Tingkat Konsistensi Sinyal
                </span>
                <div className="text-5xl font-bold font-sans tracking-tight text-slate-900 mt-1">
                  88%
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-semibold">
                Sinyal Koheren
              </div>
            </div>

            {/* 4 Interactive Column Bars like the reference image */}
            <div className="grid grid-cols-4 gap-3 my-6 items-end h-36 pt-4 border-b border-slate-100 pb-3">
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400">66%</span>
                <div className="w-full h-[66%] bg-slate-100 rounded-xl"></div>
                <span className="text-[11px] font-sans text-slate-500">Akustik</span>
              </div>

              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400">81%</span>
                <div className="w-full h-[81%] bg-slate-100 rounded-xl"></div>
                <span className="text-[11px] font-sans text-slate-500">Wajah</span>
              </div>

              {/* Highlighted Orange Active Bar matching image */}
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-orange-600 font-bold">92%</span>
                <div className="w-full h-[92%] bg-gradient-to-t from-orange-600 to-amber-400 rounded-xl shadow-md shadow-orange-500/25"></div>
                <span className="text-[11px] font-sans font-bold text-slate-900">Agregat</span>
              </div>

              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400">74%</span>
                <div className="w-full h-[74%] bg-slate-100 rounded-xl"></div>
                <span className="text-[11px] font-sans text-slate-500">Latensi</span>
              </div>
            </div>

            {/* Bottom floating button indicator */}
            <div className="flex items-center justify-between pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium">
                <Activity size={13} className="text-orange-400" />
                <span>Pemantauan Langsung</span>
              </div>

              <span className="text-xs font-sans text-slate-400">
                120 FPS // Presisi
              </span>
            </div>

            {/* Floating Tag Badges like "Data & Analytics" in reference */}
            <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-sm">
              Model Probabilitas
            </div>

            <div className="absolute -bottom-3 -left-3 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-sm">
              Webcam Optik
            </div>

          </div>

          {/* Subtext description below card */}
          <div className="absolute -bottom-10 inset-x-0 text-center">
            <p className="text-xs text-slate-400 font-sans">
              Visualisasi metrik komprehensif tanpa perangkat keras medis rumit
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
