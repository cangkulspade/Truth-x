import { useState, useCallback, useRef } from 'react';
import { 
  AnalysisStage, 
  AnalysisResult, 
  PresetType, 
  LogEntry 
} from '../types/analysis';
import { calculateSimulationResult } from '../services/simulationEngine';
import { soundFx } from '../services/soundEffects';

export function useAnalysis() {
  const [stage, setStage] = useState<AnalysisStage>('IDLE');
  const [selectedPreset, setSelectedPreset] = useState<PresetType>('SUSPICIOUS');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      timestamp: new Date().toTimeString().split(' ')[0],
      message: 'SISTEM TRUTH-X STANDBY // SENSOR FISIOLOGIS AKTIF',
      level: 'info'
    }
  ]);
  const [subjectDetected, setSubjectDetected] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const timeoutRefs = useRef<number[]>([]);

  const addLog = useCallback((message: string, level: LogEntry['level'] = 'info') => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [
      { id: `${Date.now()}-${Math.random()}`, timestamp, message, level },
      ...prev.slice(0, 19) // keep recent 20 logs
    ]);
  }, []);

  const toggleSound = useCallback(() => {
    const next = soundFx.toggle();
    setSoundEnabled(next);
  }, []);

  const resetAnalysis = useCallback(() => {
    timeoutRefs.current.forEach(id => clearTimeout(id));
    timeoutRefs.current = [];
    setStage('IDLE');
    setResult(null);
    addLog('STATUS SISTEM DIRESET KE MODE SIAGA', 'info');
  }, [addLog]);

  const startAnalysis = useCallback((overridePreset?: PresetType) => {
    if (stage !== 'IDLE' && stage !== 'COMPLETE') return;

    const presetToUse = overridePreset || selectedPreset;
    
    // Clear any pending timeouts
    timeoutRefs.current.forEach(id => clearTimeout(id));
    timeoutRefs.current = [];

    setResult(null);
    setStage('STAGE_1');
    soundFx.playBeep(440, 0.1);
    addLog('MEMULAI PROTOKOL ANALISIS PERILAKU...', 'scan');

    // Stage 1: Initializing
    const t1 = window.setTimeout(() => {
      setStage('STAGE_2');
      soundFx.playScanTone();
      addLog('POLA SUARA ........ MEMINDAI FREKUENSI & GETARAN VOKAL', 'scan');
    }, 600);

    // Stage 2: Facial Response
    const t2 = window.setTimeout(() => {
      setStage('STAGE_3');
      soundFx.playScanTone();
      addLog('RESPON WAJAH ...... MEMINDAI MIKRO-EKSPRESI & KEDIPAN MATA', 'scan');
    }, 1200);

    // Stage 3: Response Latency
    const t3 = window.setTimeout(() => {
      setStage('STAGE_4');
      soundFx.playScanTone();
      addLog('LATENSI RESPON ..... MENGUKUR JEDA KOGNITIF', 'scan');
    }, 1800);

    // Stage 4: Behavioral Pattern
    const t4 = window.setTimeout(() => {
      setStage('STAGE_5');
      soundFx.playScanTone();
      addLog('POLA PERILAKU ..... MENCOCOKKAN TREN KINESIK', 'scan');
    }, 2400);

    // Stage 5: Cross check consistency
    const t5 = window.setTimeout(() => {
      setStage('STAGE_6');
      soundFx.playScanTone();
      addLog('KONSISTENSI JAWABAN ... VERIFIKASI SILANG JAWABAN SUBJEK', 'scan');
    }, 3000);

    // Stage 6: Confidence model
    const t6 = window.setTimeout(() => {
      setStage('STAGE_7');
      soundFx.playBeep(750, 0.15, 'triangle');
      addLog('MODEL KEPERCAYAAN ...... MENGHITUNG PROBABILITAS DECEPTION', 'warning');
    }, 3600);

    // Stage 7: Complete and Reveal Result
    const t7 = window.setTimeout(() => {
      const simulatedResult = calculateSimulationResult();
      setResult(simulatedResult);
      setStage('COMPLETE');

      if (simulatedResult.classification === 'HIGH') {
        soundFx.playAlert();
        addLog(`ANALISIS SELESAI // INDIKASI: ${simulatedResult.probability}% (TINGGI)`, 'warning');
      } else if (simulatedResult.classification === 'LOW') {
        soundFx.playSuccess();
        addLog(`ANALISIS SELESAI // INDIKASI: ${simulatedResult.probability}% (RENDAH)`, 'success');
      } else {
        soundFx.playBeep(520, 0.2);
        addLog(`ANALISIS SELESAI // INDIKASI: ${simulatedResult.probability}% (SEDANG)`, 'info');
      }
    }, 4200);

    timeoutRefs.current = [t1, t2, t3, t4, t5, t6, t7];
  }, [stage, selectedPreset, addLog]);

  return {
    stage,
    selectedPreset,
    setSelectedPreset,
    result,
    logs,
    subjectDetected,
    setSubjectDetected,
    soundEnabled,
    toggleSound,
    startAnalysis,
    resetAnalysis,
    addLog
  };
}
