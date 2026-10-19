import React, { useEffect, useState } from 'react';

interface ProbabilityGaugeProps {
  value: number; // 0 to 100
  classification: 'LOW' | 'MEDIUM' | 'HIGH';
  size?: number;
  animate?: boolean;
}

export const ProbabilityGauge: React.FC<ProbabilityGaugeProps> = ({
  value,
  classification,
  size = 240,
  animate = true
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (value - start) * easeOut);
      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [value, animate]);

  // SVG parameters
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc length (240 degrees gauge instead of full circle for futuristic automotive/cyber look)
  const angle = 240;
  const totalOffset = circumference * (1 - angle / 360);
  const strokeDashoffset = circumference - (angle / 360) * circumference * (displayValue / 100);

  // Color selection based on probability/classification
  let strokeColor = '#94a3b8'; // neutral slate
  let textColor = 'text-white';

  if (classification === 'HIGH' || displayValue >= 66) {
    strokeColor = '#ef4444'; // clean red
    textColor = 'text-red-400';
  } else if (classification === 'MEDIUM' || displayValue >= 36) {
    strokeColor = '#f59e0b'; // clean amber
    textColor = 'text-amber-400';
  } else {
    strokeColor = '#10b981'; // clean emerald
    textColor = 'text-emerald-400';
  }

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-[210deg]"
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e2433"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference * (angle / 360)} ${circumference}`}
          strokeLinecap="round"
        />

        {/* Dynamic Animated Value Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset + totalOffset}
          strokeLinecap="round"
          className="transition-all duration-75"
        />
      </svg>

      {/* Center Readout Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-mono tracking-wider text-ink-muted uppercase">
          Skor Disrepansi
        </span>
        <div className="flex items-baseline justify-center">
          <span className={`text-4xl sm:text-5xl font-mono font-semibold tracking-tight ${textColor}`}>
            {displayValue}
          </span>
          <span className="text-lg font-mono text-ink-muted ml-0.5">%</span>
        </div>
        <div className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${
          classification === 'HIGH'
            ? 'bg-red-500/10 border-red-500/30 text-red-400'
            : classification === 'MEDIUM'
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        }`}>
          {classification === 'HIGH' ? 'Indikasi Tinggi' : classification === 'MEDIUM' ? 'Variasi Terdeteksi' : 'Pola Konsisten'}
        </div>
      </div>
    </div>
  );
};
