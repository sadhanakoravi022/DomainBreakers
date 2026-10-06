import React from 'react';
import { Brain, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Brain className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                DOMAIN<span className="text-indigo-400">BREAKERS</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-md">
              Find the gap. Understand the mistake. Practice the right concept. Improve.
            </p>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span>Problem Statement DU-01</span>
            <span>•</span>
            <span>AI-Powered Learning Gap Detector</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recommendations based on your answers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
