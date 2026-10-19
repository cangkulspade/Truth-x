import React from 'react';
import { Briefcase, ShieldAlert, Headphones, GraduationCap, TrendingUp, Sparkles, ArrowDown } from 'lucide-react';

export const ProductVision: React.FC = () => {
  const visionCards = [
    {
      icon: <Briefcase className="text-cyan-400" size={24} />,
      title: "WAWANCARA KERJA & REKRUTMEN (INTERVIEWS)",
      desc: "Membantu tim HR dan pewawancara mengidentifikasi ketidaksesuaian respon saat kandidat memaparkan kredensial portofolio penting, tanpa berasumsi secara subjektif."
    },
    {
      icon: <ShieldAlert className="text-blue-400" size={24} />,
      title: "SKRINING KEAMANAN AWAL (SECURITY SCREENING)",
      desc: "Sebagai asisten verifikasi non-intrusif pada pos pemeriksaan awal, memberikan sinyal prioritas untuk investigasi manual yang lebih mendalam."
    },
    {
      icon: <Headphones className="text-teal-400" size={24} />,
      title: "LAYANAN PELANGGAN & INTEGRITAS (CUSTOMER SERVICE)",
      desc: "Mendeteksi eskalasi klaim atau laporan penipuan transaksi secara dini melalui sinyal stres dan pola vokal agen dan penelepon."
    },
    {
      icon: <GraduationCap className="text-indigo-400" size={24} />,
      title: "EDUKASI & PELATIHAN KOMUNIKASI (EDUCATION)",
      desc: "Laboratorium simulasi bagi mahasiswa hukum, psikologi, jurnalis, dan negosiator untuk melatih kepekaan membaca bahasa tubuh dan kinesik manusia."
    }
  ];

  return (
    <section id="vision" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col justify-center">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-sans font-semibold mb-3">
          <span>✦</span>
          <span>Domain Penerapan Nyata</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
          Mengapa Sinyal Perilaku Relevan?
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-sans leading-relaxed">
          Verifikasi non-intrusif membuka ruang pemahaman pola komunikasi secara objektif tanpa bias subjektif manusia.
        </p>
      </div>

      {/* 4 Application Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {visionCards.map((card, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-6 rounded-md bg-orange-50 border border-orange-200 text-orange-600 font-mono text-xs flex items-center justify-center font-bold">
                0{idx + 1}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide font-sans">
                {card.title}
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Value Proposition Thesis */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-2xs">
        <div className="mb-5 text-center sm:text-left">
          <span className="text-xs font-mono text-orange-600 font-semibold uppercase tracking-wider">
            Proposisi Nilai
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-sans mt-0.5">
            Menghubungkan Sinyal Fisiologis dengan Keputusan Objektif
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
            Menyaring anomali respon secara awal sebelum tindakan investigasi manual dilakukan.
          </p>
        </div>

        {/* 4 Steps Linear Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left font-sans">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] text-orange-600 uppercase font-mono font-bold">01 / Input</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Interaksi Naratif</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Stimulus pertanyaan terstruktur</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] text-orange-600 uppercase font-mono font-bold">02 / Sinyal</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Sensor Paralel</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Optik, audio, jeda latensi</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] text-orange-600 uppercase font-mono font-bold">03 / Model</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Inferensi Algoritma</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Pencocokan matriks deviasi</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] text-orange-600 uppercase font-mono font-bold">04 / Output</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Skor Probabilitas</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Metrik terukur 0-100%</p>
          </div>
        </div>

      </div>

    </section>
  );
};
