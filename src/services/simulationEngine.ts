import { 
  AnalysisResult, 
  PresetType, 
  ProbabilityClassification,
  AnalysisScores,
  BehavioralSignals
} from '../types/analysis';
import { DEMO_PRESETS } from '../data/presets';

export function calculateSimulationResult(): AnalysisResult {
  // Fair distribution:
  // ~40% Kejujuran/Wajar (Hijau: 10% - 34%)
  // ~30% Moderat/Variasi Normal (Kuning/Netral: 38% - 62%)
  // ~30% Inkonsistensi/Deception (Merah: 68% - 94%)
  const dice = Math.random();
  let probability: number;
  let classification: ProbabilityClassification;
  let summary: string;

  let signals: BehavioralSignals;

  if (dice < 0.40) {
    // HIJAU (JUJUR / WAJAR)
    probability = Math.floor(12 + Math.random() * 23); // 12% - 34%
    classification = 'LOW';
    summary = 'Pola respon akustik vokal dan ekspresi mikro wajah selaras stabil dengan garis dasar normal. Tidak terdeteksi anomali fisiologis.';
    signals = {
      voicePattern: 'Normal',
      facialResponse: 'Consistent',
      responseLatency: 'Normal',
      answerConsistency: 'High',
      behavioralPattern: 'Stable'
    };
  } else if (dice < 0.70) {
    // KUNING / NETRAL (MODERAT)
    probability = Math.floor(38 + Math.random() * 25); // 38% - 62%
    classification = 'MEDIUM';
    summary = 'Sinyal menunjukkan fluktuasi ketegangan ringan atau keraguan responsif. Hasil berada pada rentang batas netral.';
    signals = {
      voicePattern: 'Elevated',
      facialResponse: 'Mixed',
      responseLatency: 'Elevated',
      answerConsistency: 'Consistent',
      behavioralPattern: 'Normal'
    };
  } else {
    // MERAH (INKONSISTENSI TINGGI)
    probability = Math.floor(68 + Math.random() * 26); // 68% - 93%
    classification = 'HIGH';
    summary = 'INKONSISTENSI FISIOLOGIS TERDETEKSI. Terjadi deviasi signifikan pada modulasi vokal akustik serta mikrotremor tatapan wajah.';
    signals = {
      voicePattern: 'Suspicious',
      facialResponse: 'Unusual',
      responseLatency: 'Inconsistent',
      answerConsistency: 'Low',
      behavioralPattern: 'Inconsistent'
    };
  }

  // Generate realistic component scores around probability
  const clamp = (val: number) => Math.max(8, Math.min(96, Math.round(val)));
  const jitter = () => (Math.random() * 14 - 7);

  const scores: AnalysisScores = {
    voiceScore: clamp(probability + jitter()),
    facialScore: clamp(probability + jitter()),
    responseLatencyScore: clamp(probability + jitter()),
    answerConsistencyScore: clamp(probability + jitter()),
    behaviorScore: clamp(probability + jitter()),
  };

  const date = new Date();
  const timestamp = date.toTimeString().split(' ')[0];

  return {
    probability,
    classification,
    confidence: probability >= 75 || probability <= 28 ? 'TINGGI' : 'SEDANG',
    summary,
    signals,
    scores,
    timestamp
  };
}
