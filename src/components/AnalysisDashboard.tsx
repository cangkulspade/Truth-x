import React from 'react';
import { SubjectMonitor } from './SubjectMonitor';
import { QuestionPanel } from './QuestionPanel';
import { AnalysisProgress } from './AnalysisProgress';
import { ResultCard } from './ResultCard';
import { StatusPanel } from './StatusPanel';
import { QuestionItem, PresetType, AnalysisStage, AnalysisResult, LogEntry } from '../types/analysis';
import { Activity, ShieldCheck } from 'lucide-react';

interface AnalysisDashboardProps {
  stage: AnalysisStage;
  currentQuestion: QuestionItem;
  onSelectQuestion: (q: QuestionItem) => void;
  selectedPreset: PresetType;
  onSelectPreset: (p: PresetType) => void;
  onAskSubject: () => void;
  result: AnalysisResult | null;
  onReset: () => void;
  logs: LogEntry[];
  isWebcamActive: boolean;
  onToggleWebcam: () => void;
  isMicActive: boolean;
  onToggleMic: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  stage,
  currentQuestion,
  onSelectQuestion,
  selectedPreset,
  onSelectPreset,
  onAskSubject,
  result,
  onReset,
  logs,
  isWebcamActive,
  onToggleWebcam,
  isMicActive,
  onToggleMic
}) => {
  return (
    <section id="demo" className="max-w-7xl w-full mx-auto scroll-mt-20">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-border-subtle gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30" />
            <Activity size={15} className="text-cyber-cyan relative z-10" />
          </div>
          <div>
            <h2 className="text-base font-bold text-ink-primary tracking-widest font-mono uppercase neon-text-cyan">
              WORKBENCH ANALISIS
            </h2>
            <p className="text-[11px] font-mono text-ink-muted tracking-wider uppercase">
              Sensor Aktif · Kalibrasi Selesai · Siap Memindai
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
          <span className="text-[11px] font-mono text-cyber-green tracking-widest uppercase">SENSOR SIAGA</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="mb-6">
        <AnalysisProgress stage={stage} />
      </div>

      {/* Result when complete */}
      {stage === 'COMPLETE' && result && (
        <div className="mb-6">
          <ResultCard 
            result={result} 
            onReset={onReset} 
            onRunAgain={onAskSubject} 
          />
        </div>
      )}

      {/* Two-Column Layout: Left Cam/Mic + Right Question */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch mb-4">
        
        <div className="lg:col-span-6 flex flex-col">
          <SubjectMonitor 
            stage={stage} 
            probability={result?.probability}
            isWebcamActive={isWebcamActive}
            onToggleWebcam={onToggleWebcam}
            isMicActive={isMicActive}
            onToggleMic={onToggleMic}
          />
        </div>

        <div className="lg:col-span-6 flex flex-col">
          <QuestionPanel 
            currentQuestion={currentQuestion}
            onSelectQuestion={onSelectQuestion}
            onAskSubject={onAskSubject}
            stage={stage}
            isWebcamActive={isWebcamActive}
            isMicActive={isMicActive}
          />
        </div>

      </div>

      {/* System Log */}
      <div>
        <StatusPanel logs={logs} stage={stage} />
      </div>

    </section>
  );
};

