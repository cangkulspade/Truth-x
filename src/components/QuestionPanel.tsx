import React, { useState } from 'react';
import { Play, Sparkles, Plus, Edit3, MessageSquare, Mic, Camera } from 'lucide-react';
import { QuestionItem, AnalysisStage } from '../types/analysis';
import { PRESET_QUESTIONS } from '../data/questions';

interface QuestionPanelProps {
  currentQuestion: QuestionItem;
  onSelectQuestion: (question: QuestionItem) => void;
  onAskSubject: () => void;
  stage: AnalysisStage;
  isWebcamActive?: boolean;
  isMicActive?: boolean;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  currentQuestion,
  onSelectQuestion,
  onAskSubject,
  stage,
  isWebcamActive = false,
  isMicActive = false
}) => {
  const [customText, setCustomText] = useState<string>(currentQuestion.text);
  const isAnalyzing = stage !== 'IDLE' && stage !== 'COMPLETE';

  // Handle typing custom question
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setCustomText(newText);
    onSelectQuestion({
      id: Date.now(),
      text: newText,
      category: 'Pertanyaan Kustom'
    });
  };

  // Quick select a suggestion
  const handleSelectPresetQuestion = (q: QuestionItem) => {
    setCustomText(q.text);
    onSelectQuestion(q);
  };

  return (
    <div className="rounded-xl bg-panel-bg border border-border-subtle p-4 flex flex-col justify-between h-full neon-border-cyan">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-ink-primary">
              Stimulus Pertanyaan Subjek
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cyber-cyan bg-cyber-cyan/10 px-2.5 py-0.5 rounded border border-cyber-cyan/20">
            Input Bebas
          </span>
        </div>

        {/* Custom Question Text Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-mono font-semibold text-ink-secondary uppercase tracking-widest flex items-center gap-1.5">
              <Edit3 size={12} className="text-cyber-cyan" />
              Ketik Pertanyaan Uji:
            </label>
            <span className="text-[10px] font-mono text-ink-muted">
              {customText.length} karakter
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={customText}
              disabled={isAnalyzing}
              onChange={handleTextChange}
              placeholder="Tuliskan pertanyaan bebas apa saja untuk subjek di sini..."
              className="w-full bg-black/50 border border-cyber-cyan/30 rounded-lg p-3 text-sm font-sans text-ink-primary placeholder-ink-muted focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30 resize-none transition-all disabled:opacity-50"
            />
          </div>
          <p className="text-[11px] font-mono text-ink-muted mt-1.5 leading-relaxed">
            Subjek akan merespon secara verbal di depan mikrofon & kamera saat pengujian berlangsung.
          </p>
        </div>

        {/* Fast Question Suggestions / Inspirasi Pertanyaan */}
        <div>
          <label className="block text-[11px] font-mono font-semibold text-ink-secondary uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <MessageSquare size={12} className="text-cyber-cyan" />
            Contoh / Inspirasi Pertanyaan Cepat:
          </label>
          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
            {PRESET_QUESTIONS.map((q) => {
              const isSelected = currentQuestion.text === q.text;
              return (
                <button
                  key={q.id}
                  type="button"
                  disabled={isAnalyzing}
                  onClick={() => handleSelectPresetQuestion(q)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-sans transition-all border cursor-pointer disabled:cursor-not-allowed ${
                    isSelected
                      ? 'bg-cyber-cyan/10 border-cyber-cyan/40 text-cyber-cyan font-medium'
                      : 'bg-black/30 border-border-subtle/70 text-ink-secondary hover:text-ink-primary hover:border-border-subtle'
                  }`}
                >
                  <span className="line-clamp-1 font-mono text-[11px]">
                    <span className="text-cyber-cyan font-mono mr-1.5 font-bold">#{q.id}</span>
                    {q.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Biometric Sensor Ready State Indicator */}
        <div className="p-3 rounded-lg bg-black/40 border border-border-subtle">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-2">
            Status Sensor Deteksi Otomatis:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className={`p-2 rounded border flex items-center gap-2 ${
              isWebcamActive 
                ? 'bg-cyber-green/10 border-cyber-green/30 text-cyber-green' 
                : 'bg-black/20 border-border-subtle text-ink-secondary'
            }`}>
              <Camera size={13} />
              <div className="truncate">
                <div className="text-[10px] text-ink-muted uppercase">Optik Wajah</div>
                <div className="font-semibold">{isWebcamActive ? 'Kamera Live' : 'Sintesis Visual'}</div>
              </div>
            </div>

            <div className={`p-2 rounded border flex items-center gap-2 ${
              isMicActive 
                ? 'bg-cyber-green/10 border-cyber-green/30 text-cyber-green' 
                : 'bg-black/20 border-border-subtle text-ink-secondary'
            }`}>
              <Mic size={13} />
              <div className="truncate">
                <div className="text-[10px] text-ink-muted uppercase">Akustik Suara</div>
                <div className="font-semibold">{isMicActive ? 'Mikrofon Live' : 'Sintesis Audio'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="pt-4 mt-3 border-t border-border-subtle">
        <button
          disabled={isAnalyzing || !customText.trim()}
          onClick={onAskSubject}
          className={`w-full py-3.5 rounded-lg font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isAnalyzing || !customText.trim()
              ? 'bg-border-subtle text-ink-muted cursor-not-allowed border border-border-subtle'
              : 'bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/20 hover:border-cyber-cyan/60 neon-border-cyan shadow-lg shadow-cyber-cyan/5'
          }`}
        >
          <Play size={14} className="fill-current" />
          <span>{isAnalyzing ? 'MEMPROSES SINYAL SENSOR...' : 'JALANKAN PENGUJIAN'}</span>
        </button>
      </div>
    </div>
  );
};

