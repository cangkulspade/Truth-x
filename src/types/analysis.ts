export type PresetType = 'HONEST' | 'UNCERTAIN' | 'SUSPICIOUS';

export type SignalLevel = 'Normal' | 'Stable' | 'Suspicious' | 'Elevated' | 'Unusual' | 'High' | 'Mixed' | 'Low' | 'Consistent' | 'Inconsistent' | 'Uncertain';

export interface BehavioralSignals {
  voicePattern: SignalLevel;
  facialResponse: SignalLevel;
  responseLatency: SignalLevel;
  answerConsistency: SignalLevel;
  behavioralPattern: SignalLevel;
}

export interface AnalysisScores {
  voiceScore: number;
  facialScore: number;
  responseLatencyScore: number;
  answerConsistencyScore: number;
  behaviorScore: number;
}

export type ProbabilityClassification = 'LOW' | 'MEDIUM' | 'HIGH';

export interface AnalysisResult {
  probability: number;
  classification: ProbabilityClassification;
  confidence: 'TINGGI' | 'SEDANG' | 'RENDAH';
  summary: string;
  signals: BehavioralSignals;
  scores: AnalysisScores;
  timestamp: string;
}

export interface PresetConfig {
  id: PresetType;
  label: string;
  targetProbability: number;
  classification: ProbabilityClassification;
  description: string;
  signals: BehavioralSignals;
}

export interface QuestionItem {
  id: number;
  text: string;
  category: string;
}

export type AnalysisStage = 
  | 'IDLE'
  | 'STAGE_1' // Inisialisasi
  | 'STAGE_2' // Pola Suara
  | 'STAGE_3' // Respon Wajah
  | 'STAGE_4' // Latensi Respon
  | 'STAGE_5' // Pola Perilaku
  | 'STAGE_6' // Konsistensi Jawaban
  | 'STAGE_7' // Model Kepercayaan
  | 'COMPLETE';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  level: 'info' | 'warning' | 'scan' | 'success';
}
