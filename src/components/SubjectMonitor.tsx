import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, RefreshCw, Volume2, ShieldAlert } from 'lucide-react';
import { AnalysisStage } from '../types/analysis';

interface SubjectMonitorProps {
  stage: AnalysisStage;
  probability?: number;
  isWebcamActive: boolean;
  onToggleWebcam: () => void;
  isMicActive: boolean;
  onToggleMic: () => void;
}

export const SubjectMonitor: React.FC<SubjectMonitorProps> = ({
  stage,
  probability,
  isWebcamActive,
  onToggleWebcam,
  isMicActive,
  onToggleMic
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const isScanning = stage !== 'IDLE' && stage !== 'COMPLETE';
  const isComplete = stage === 'COMPLETE';
  const isHighRisk = isComplete && (probability || 0) >= 66;

  // Handle Real Webcam Stream
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    if (isWebcamActive) {
      setCameraError(null);
      navigator.mediaDevices?.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 } } })
        .then((stream) => {
          activeStream = stream;
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
        })
        .catch((err) => {
          console.warn("Kamera tidak tersedia:", err);
          setCameraError("Kamera tidak dapat diakses (izin ditolak atau tidak ada webcam). Menampilkan simulasi visual.");
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isWebcamActive]);

  // Handle Real Microphone Waveform Analyser
  useEffect(() => {
    let micStream: MediaStream | null = null;

    if (isMicActive) {
      navigator.mediaDevices?.getUserMedia({ audio: true })
        .then((stream) => {
          micStream = stream;
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const audioCtx = new AudioContextClass();
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          audioCtxRef.current = audioCtx;
          analyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const drawWaveform = () => {
            if (!analyserRef.current || !canvasRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);

            // Compute average volume level
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((avg / 255) * 100 * 2.5)));

            // Draw wave bars on canvas
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              const barWidth = (canvas.width / dataArray.length) * 1.5;
              let x = 0;

              for (let i = 0; i < dataArray.length; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;
                ctx.fillStyle = isHighRisk 
                  ? '#ff2a5f' 
                  : isScanning 
                  ? '#00f2fe' 
                  : '#38bdf8';
                ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
                x += barWidth + 1;
              }
            }

            animFrameRef.current = requestAnimationFrame(drawWaveform);
          };

          drawWaveform();
        })
        .catch((err) => {
          console.warn("Mikrofon tidak dapat diakses:", err);
        });
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setAudioLevel(0);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (micStream) micStream.getTracks().forEach(t => t.stop());
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, [isMicActive, isScanning, isHighRisk]);

  return (
    <div className="rounded-xl bg-panel-bg border border-border-subtle p-4 flex flex-col justify-between h-full neon-border-cyan">
      
      {/* Top Header & Toggle Hardware Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-3.5 border-b border-border-subtle gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan flex items-center justify-center shrink-0">
            <Camera size={15} />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-ink-primary">
              Sensor Kamera Optik
            </h3>
            <p className="text-[11px] font-mono text-ink-muted">
              {isWebcamActive ? 'Aliran webcam laptop terhubung' : 'Representasi visual lokal'}
            </p>
          </div>
        </div>

        {/* Action Controls for Real Camera & Mic */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onToggleWebcam}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold tracking-widest uppercase transition-all cursor-pointer text-center ${
              isWebcamActive
                ? 'bg-cyber-cyan text-background border-cyber-cyan'
                : 'bg-transparent border-border-subtle text-ink-secondary hover:border-cyber-cyan/40 hover:text-cyber-cyan'
            }`}
          >
            {isWebcamActive ? 'Kamera Aktif' : 'Gunakan Kamera'}
          </button>

          <button
            onClick={onToggleMic}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold tracking-widest uppercase transition-all cursor-pointer text-center ${
              isMicActive
                ? 'bg-cyber-cyan text-background border-cyber-cyan'
                : 'bg-transparent border-border-subtle text-ink-secondary hover:border-cyber-cyan/40 hover:text-cyber-cyan'
            }`}
          >
            {isMicActive ? 'Mikrofon Aktif' : 'Gunakan Mikrofon'}
          </button>
        </div>
      </div>

      {/* Main Video Screen */}
      <div className="relative w-full aspect-video rounded-lg bg-black/60 border border-border-subtle overflow-hidden flex items-center justify-center">
        
        {/* Real Webcam Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 ${
            isWebcamActive && !cameraError ? 'opacity-90 block' : 'hidden'
          }`}
        />

        {/* Biometric Target Box Overlay on Webcam */}
        {isWebcamActive && !cameraError && (
          <div className={`absolute w-44 h-52 rounded border pointer-events-none z-20 flex flex-col justify-between p-2 transition-colors ${
            isHighRisk 
              ? 'border-red-500 bg-red-500/10' 
              : isScanning 
              ? 'border-amber-400 bg-amber-400/5' 
              : 'border-slate-400/40'
          }`}>
            <span className="text-[10px] font-mono text-white bg-black/80 px-1.5 py-0.5 self-start rounded">
              {isHighRisk ? 'DISREPANSI DETEKSI' : 'KONTUR WAJAH'}
            </span>
            <span className="text-[10px] font-mono text-ink-muted bg-black/80 px-1.5 py-0.5 self-end rounded">
              {isScanning ? 'Mengukur fiksasi tatapan...' : 'Kalibrasi normal'}
            </span>
          </div>
        )}

        {/* Clean Silhouette Placeholder if Webcam is OFF */}
        {(!isWebcamActive || cameraError) && (
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            <div className={`transition-colors duration-300 ${isHighRisk ? 'text-red-500' : isScanning ? 'text-amber-400' : 'text-ink-muted'}`}>
              <svg width="100" height="110" viewBox="0 0 200 220" fill="none" className="mx-auto">
                <circle cx="100" cy="80" r="55" stroke="currentColor" strokeWidth="1.5" />
                <path d="M40 200C40 155 70 140 100 140C130 140 160 155 160 200" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-xs text-ink-secondary mt-3 max-w-xs font-sans">
              {cameraError ? cameraError : 'Kamera fisik dinonaktifkan. Anda dapat mengaktifkannya untuk verifikasi langsung.'}
            </p>
          </div>
        )}

        {/* Live Status Label */}
        <div className="absolute top-2.5 left-2.5 z-20 text-[10px] font-mono text-ink-secondary bg-black/70 px-2 py-0.5 rounded border border-border-subtle">
          Sinyal Visual: <span className="text-white font-medium">{isScanning ? 'Sedang Diproses' : isHighRisk ? 'Anomali' : 'Siap'}</span>
        </div>
      </div>

      {/* Audio Waveform Section */}
      <div className="mt-4 pt-3.5 border-t border-border-subtle">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Volume2 size={13} className="text-cyber-cyan" />
            <span className="text-[11px] font-mono text-ink-secondary uppercase tracking-widest">
              Spektrum Akustik
            </span>
          </div>
          <span className="text-[11px] font-mono text-ink-muted">
            {isMicActive ? `Amplitudo: ${audioLevel}%` : 'Sinyal Sintetis'}
          </span>
        </div>

        {/* Canvas for Live Audio Waveform */}
        <div className="w-full h-10 bg-black/40 rounded border border-border-subtle p-1 flex items-center justify-center overflow-hidden">
          {isMicActive ? (
            <canvas ref={canvasRef} width={400} height={32} className="w-full h-full" />
          ) : (
            <div className="flex items-end justify-center gap-1.5 h-full w-full py-1">
              {[15, 30, 45, 20, 60, 40, 75, 25, 55, 30, 20, 50, 65, 25, 40, 15].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-sm transition-all duration-200 ${
                    isScanning ? 'bg-amber-400/80' : 'bg-slate-700'
                  }`}
                  style={{ height: isScanning ? `${Math.max(15, (h * (i % 2 === 0 ? 0.9 : 1.1)) % 100)}%` : '15%' }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
