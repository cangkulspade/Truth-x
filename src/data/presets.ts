import { PresetConfig } from '../types/analysis';

export const DEMO_PRESETS: Record<string, PresetConfig> = {
  HONEST: {
    id: 'HONEST',
    label: 'JUJUR (HONEST)',
    targetProbability: 18,
    classification: 'LOW',
    description: 'Pola sinyal stabil tanpa anomali terdeteksi. Respon konsisten.',
    signals: {
      voicePattern: 'Normal',
      facialResponse: 'Stable',
      responseLatency: 'Normal',
      answerConsistency: 'High',
      behavioralPattern: 'Consistent'
    }
  },
  UNCERTAIN: {
    id: 'UNCERTAIN',
    label: 'RAGU-RAGU (UNCERTAIN)',
    targetProbability: 54,
    classification: 'MEDIUM',
    description: 'Terjadi fluktuasi minor pada modulasi suara dan latensi berpikir.',
    signals: {
      voicePattern: 'Mixed', // slight variation
      facialResponse: 'Elevated',
      responseLatency: 'Unusual', // moderate
      answerConsistency: 'Mixed',
      behavioralPattern: 'Uncertain'
    }
  },
  SUSPICIOUS: {
    id: 'SUSPICIOUS',
    label: 'MENCURIGAKAN (SUSPICIOUS)',
    targetProbability: 87,
    classification: 'HIGH',
    description: 'Terdeteksi diskrepansi tinggi antara respon wajah, vokal, dan latensi.',
    signals: {
      voicePattern: 'Suspicious',
      facialResponse: 'Elevated',
      responseLatency: 'Unusual',
      answerConsistency: 'Low',
      behavioralPattern: 'Inconsistent'
    }
  }
};
