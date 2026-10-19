import React from 'react';
import { AnalysisResult } from '../types/analysis';
import { ProbabilityGauge } from './ProbabilityGauge';
import { ShieldAlert, AlertTriangle, CheckCircle, RotateCcw, Share2, Sparkles, Activity, FileText } from 'lucide-react';

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
  onRunAgain: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onReset,
  onRunAgain
}) => {
  const isHigh = result.classification === 'HIGH';
  const isLow = result.classification === 'LOW';

  const getSignalBadge = (level: string) => {
    switch (level) {
      case 'Suspicious':
      case 'Unusual':
      case 'Low':
      case 'Inconsistent':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Elevated':
      case 'Mixed':
      case 'Uncertain':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Normal':
      case 'Stable':
      case 'High':
      case 'Consistent':
      default:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const translateSignalLevel = (level: string) => {
    switch (level) {
      case 'Suspicious': return 'Inkonsisten';
      case 'Unusual': return 'Tidak Wajar';
      case 'Low': return 'Rendah';
      case 'Inconsistent': return 'Inkonsisten';
      case 'Elevated': return 'Elevasi Ketegangan';
      case 'Mixed': return 'Fluktuatif';
      case 'Uncertain': return 'Ragu-ragu';
      case 'Normal': return 'Normal';
      case 'Stable': return 'Stabil';
      case 'High': return 'Tinggi (Koheren)';
      case 'Consistent': return 'Konsisten';
      default: return level;
    }
  };

  return (
    <div className="rounded-xl bg-canvas border border-border-strong p-6 transition-all duration-300">
      {/* Top Banner Alert */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-border-subtle gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-subtle border border-border-subtle flex items-center justify-center text-ink-primary">
            {isHigh ? <ShieldAlert size={18} className="text-red-400" /> : isLow ? <CheckCircle size={18} className="text-emerald-400" /> : <AlertTriangle size={18} className="text-amber-400" />}
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-ink-muted">
              Evaluasi Sinyal Fisiologis
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight font-sans">
              {isHigh 
                ? 'Terdeteksi Diskrepansi Perilaku Signifikan' 
                : isLow 
                ? 'Pola Respon Konsisten dengan Basis Data Normal' 
                : 'Variasi Sinyal Campuran (Hasil Tidak Konklusif)'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
          <span>Tingkat Kepastian:</span>
          <span className="px-2 py-0.5 rounded bg-subtle border border-border-subtle text-ink-primary font-medium">
            {result.confidence}
          </span>
        </div>
      </div>

      {/* Main Grid: Gauge Left + 5 Signal Breakdown Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-center">
        
        {/* Left Column: Radial Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded bg-background border border-border-subtle">
          <ProbabilityGauge
            value={result.probability}
            classification={result.classification}
            size={220}
          />
          <p className="text-[11px] font-mono text-ink-muted text-center mt-3">
            Stempel Waktu: {result.timestamp} WIB (Agregasi 5 Kanal)
          </p>
        </div>

        {/* Right Column: 5 Behavioral Signals Breakdown */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-ink-muted border-b border-border-subtle pb-1.5">
            <span>Matriks Sinyal</span>
            <span>Klasifikasi</span>
          </div>

          {/* 1. Voice Pattern */}
          <div className="flex items-center justify-between p-2.5 rounded bg-background border border-border-subtle">
            <div>
              <div className="text-xs font-mono font-medium text-white">Akustik Vokal (Voice Pattern)</div>
              <div className="text-[11px] text-ink-muted">Modulasi mikrotremor frekuensi dasar</div>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getSignalBadge(result.signals.voicePattern)}`}>
              {translateSignalLevel(result.signals.voicePattern)}
            </span>
          </div>

          {/* 2. Facial Response */}
          <div className="flex items-center justify-between p-2.5 rounded bg-background border border-border-subtle">
            <div>
              <div className="text-xs font-mono font-medium text-white">Respon Wajah (Facial Response)</div>
              <div className="text-[11px] text-ink-muted">Kedipan mata dan kontraksi otot mikro</div>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getSignalBadge(result.signals.facialResponse)}`}>
              {translateSignalLevel(result.signals.facialResponse)}
            </span>
          </div>

          {/* 3. Response Latency */}
          <div className="flex items-center justify-between p-2.5 rounded bg-background border border-border-subtle">
            <div>
              <div className="text-xs font-mono font-medium text-white">Latensi Respon (Cognitive Load)</div>
              <div className="text-[11px] text-ink-muted">Jeda waktu kognitif sebelum menjawab</div>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getSignalBadge(result.signals.responseLatency)}`}>
              {translateSignalLevel(result.signals.responseLatency)}
            </span>
          </div>

          {/* 4. Answer Consistency */}
          <div className="flex items-center justify-between p-2.5 rounded bg-background border border-border-subtle">
            <div>
              <div className="text-xs font-mono font-medium text-white">Konsistensi Konteks (Semantic Check)</div>
              <div className="text-[11px] text-ink-muted">Koherensi logika silang pernyataan</div>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getSignalBadge(result.signals.answerConsistency)}`}>
              {translateSignalLevel(result.signals.answerConsistency)}
            </span>
          </div>

          {/* 5. Behavioral Pattern */}
          <div className="flex items-center justify-between p-2.5 rounded bg-background border border-border-subtle">
            <div>
              <div className="text-xs font-mono font-medium text-white">Pola Perilaku (Behavioral Pattern)</div>
              <div className="text-[11px] text-ink-muted">Stabilitas gestur dan postural tubuh</div>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${getSignalBadge(result.signals.behavioralPattern)}`}>
              {translateSignalLevel(result.signals.behavioralPattern)}
            </span>
          </div>

        </div>

      </div>

      {/* Summary Narrative */}
      <div className="p-3.5 rounded bg-background border border-border-subtle mb-4">
        <div className="flex items-center gap-1.5 text-ink-muted text-xs font-mono uppercase mb-1">
          <FileText size={13} />
          <span>Catatan Diagnostik Algoritma:</span>
        </div>
        <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-subtle">
        <span className="text-xs text-ink-muted font-sans">
          Hasil ini merupakan estimasi terkomputasi lokal dan bukan bukti yudisial.
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 hover:bg-cyber-cyan/20 hover:border-cyber-cyan/60 text-xs font-mono font-semibold tracking-wider uppercase text-cyber-cyan transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>Reset Pengujian</span>
          </button>
        </div>
      </div>
    </div>
  );
};
