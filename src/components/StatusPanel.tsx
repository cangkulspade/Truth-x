import React from 'react';
import { Terminal, Shield, AlertCircle, Cpu, Wifi } from 'lucide-react';
import { LogEntry } from '../types/analysis';

interface StatusPanelProps {
  logs: LogEntry[];
  stage: string;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ logs, stage }) => {
  return (
    <div className="rounded-xl bg-canvas border border-border-subtle p-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-ink-muted" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-ink-primary">
            Log Diagnostik Sistem
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-ink-muted">
          <span>Koneksi Lokal: Stabil</span>
          <span className="hidden sm:inline">20 Entri Terakhir</span>
        </div>
      </div>

      {/* Terminal log entries */}
      <div className="space-y-1 max-h-32 overflow-y-auto pr-1 text-[11px] leading-relaxed">
        {logs.map((log) => {
          let textClass = 'text-ink-secondary';
          let prefix = 'info';

          if (log.level === 'warning') {
            textClass = 'text-red-400';
            prefix = 'warn';
          } else if (log.level === 'scan') {
            textClass = 'text-ink-primary';
            prefix = 'proc';
          } else if (log.level === 'success') {
            textClass = 'text-emerald-400';
            prefix = 'eval';
          }

          return (
            <div key={log.id} className="flex items-start gap-2 py-0.5">
              <span className="text-ink-muted select-none text-[10px] whitespace-nowrap">{log.timestamp}</span>
              <span className={`select-none text-[10px] uppercase font-mono px-1 rounded bg-background border border-border-subtle ${
                log.level === 'warning' ? 'text-red-400 border-red-500/20' : 'text-ink-muted'
              }`}>{prefix}</span>
              <span className={`break-words ${textClass}`}>{log.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
