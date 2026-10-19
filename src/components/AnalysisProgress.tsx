import React from 'react';
import { AnalysisStage } from '../types/analysis';
import { Activity, Radio, Cpu, CheckCircle } from 'lucide-react';

interface AnalysisProgressProps {
  stage: AnalysisStage;
}

const STAGES_CONFIG = [
  { id: 'STAGE_1', label: 'INISIALISASI SISTEM...', sub: 'Kalibrasi sensor dasar' },
  { id: 'STAGE_2', label: 'POLA SUARA', sub: 'Pemindaian spektrum akustik' },
  { id: 'STAGE_3', label: 'RESPON WAJAH', sub: 'Pelacakan mikro-ekspresi & pupil' },
  { id: 'STAGE_4', label: 'LATENSI RESPON', sub: 'Pengukuran jeda kognitif' },
  { id: 'STAGE_5', label: 'POLA PERILAKU', sub: 'Pencocokan profil kinesik' },
  { id: 'STAGE_6', label: 'KONSISTENSI JAWABAN', sub: 'Validasi silang semantik' },
  { id: 'STAGE_7', label: 'MODEL KEPERCAYAAN', sub: 'Kalkulasi agregat probabilitas' },
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ stage }) => {
  const isIdle = stage === 'IDLE';
  const isComplete = stage === 'COMPLETE';

  const getStageIndex = () => {
    if (isIdle) return -1;
    if (isComplete) return STAGES_CONFIG.length;
    return STAGES_CONFIG.findIndex(s => s.id === stage);
  };

  const currentIndex = getStageIndex();
  const progressPercent = isIdle 
    ? 0 
    : isComplete 
    ? 100 
    : Math.round(((currentIndex + 1) / STAGES_CONFIG.length) * 100);

  return (
    <div className="rounded-xl bg-canvas border border-border-subtle p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium tracking-wide uppercase text-ink-primary">
            Siklus Pemrosesan Sinyal
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-ink-muted">Tahapan:</span>
          <span className={`font-medium ${
            isComplete ? 'text-emerald-400' : isIdle ? 'text-ink-muted' : 'text-ink-primary'
          }`}>
            {isIdle ? 'Siaga' : isComplete ? 'Selesai' : `Fase 0${currentIndex + 1}/07`}
          </span>
          <span className="text-ink-primary font-semibold ml-1">({progressPercent}%)</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-1.5 rounded-full bg-background overflow-hidden border border-border-subtle mb-3">
        <div 
          className="h-full bg-ink-primary transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 7 Sequence Stage Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
        {STAGES_CONFIG.map((s, idx) => {
          const isPassed = currentIndex > idx || isComplete;
          const isCurrent = currentIndex === idx;

          return (
            <div
              key={s.id}
              className={`p-2 rounded border text-left transition-colors ${
                isCurrent
                  ? 'bg-subtle border-ink-secondary'
                  : isPassed
                  ? 'bg-background border-border-subtle text-ink-secondary'
                  : 'bg-background border-border-subtle/50 opacity-40 text-ink-muted'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                <span className={isCurrent ? 'text-white font-semibold' : 'text-ink-muted'}>
                  0{idx + 1}
                </span>
                {isPassed && (
                  <CheckCircle size={10} className="text-emerald-400" />
                )}
              </div>
              <div className={`text-[10px] font-sans font-medium truncate ${
                isCurrent ? 'text-white' : 'text-ink-secondary'
              }`}>
                {s.label}
              </div>
              <div className="text-[9px] font-sans text-ink-muted truncate">
                {s.sub}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
