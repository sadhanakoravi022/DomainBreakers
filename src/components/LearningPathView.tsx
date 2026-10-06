import React from 'react';
import {
  Route,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { LearningPathStep, ConceptDiagnosis } from '../types';
import { NavTab } from './Navbar';

interface LearningPathViewProps {
  learningPath: LearningPathStep[];
  topGap: ConceptDiagnosis | null;
  onNavigate: (tab: NavTab) => void;
  onStartPractice: () => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  learningPath,
  topGap,
  onNavigate,
  onStartPractice
}) => {
  const targetConcept = topGap?.concept || 'Quadratic Equations';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Route className="w-4 h-4" />
            <span>Targeted Remediation Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Your Personalized Learning Path
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Specially synthesized for <strong className="text-white">{targetConcept}</strong> to close identified sign and substitution traps.
          </p>
        </div>

        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Zap className="w-4 h-4" />
          <span>Launch Adaptive Practice</span>
        </button>
      </div>

      {/* Path Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl">
            04
          </div>
          <div>
            <div className="text-xs font-mono text-indigo-300 uppercase tracking-wider">
              Remediation Sequence
            </div>
            <div className="text-lg font-bold text-white">
              Estimated Completion: ~40 Minutes
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Targeting +49% improvement</span>
        </div>
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-4 relative">
        {learningPath.map((step, idx) => (
          <div
            key={step.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 font-mono font-black text-sm flex items-center justify-center shrink-0">
                0{step.stepNumber}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-base text-white">{step.title}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                    {step.type.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{step.estimatedMinutes}m</span>
              </div>

              {idx === 0 ? (
                <button
                  onClick={onStartPractice}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  <span>Start Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onStartPractice}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>Preview</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
