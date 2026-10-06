import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  RotateCcw,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';
import { ReassessmentResult, DomainId } from '../types';
import { NavTab } from './Navbar';

interface BeforeAfterComparisonViewProps {
  reassessmentResult: ReassessmentResult | null;
  onNavigate: (tab: NavTab) => void;
  onRetakeAssessment: () => void;
  activeDomain?: DomainId;
}

export const BeforeAfterComparisonView: React.FC<BeforeAfterComparisonViewProps> = ({
  reassessmentResult,
  onNavigate,
  onRetakeAssessment,
  activeDomain = 'python'
}) => {
  const fallbackConcept =
    activeDomain === 'python'
      ? 'Object References & Mutability'
      : activeDomain === 'javascript'
      ? 'Async Event Loop & Microtasks'
      : 'Quadratic Equations';

  const data: ReassessmentResult = reassessmentResult || {
    beforeScore: 28,
    afterScore: 85,
    improvementPercentage: 57,
    concept: fallbackConcept,
    questionsMastered: 4,
    totalPracticeQuestions: 5,
    remainingGaps: [],
    status: 'Mastered'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Remediation Outcome • DU-01 Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Before vs. After Personalized Learning
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Measurable proof that targeting root misconceptions closes learning gaps faster than generic quiz retakes.
        </p>
      </div>

      {/* Hero Improvement Delta Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-900/40 via-violet-900/30 to-emerald-950/40 border border-emerald-500/30 p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
          Mastery Delta Verified
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-8 my-4">
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase font-mono block">Initial</span>
            <span className="text-4xl sm:text-6xl font-black font-mono text-rose-400">
              {data.beforeScore}%
            </span>
          </div>

          <div className="flex flex-col items-center">
            <ArrowRight className="w-8 h-8 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-300 mt-1">
              +{data.improvementPercentage}%
            </span>
          </div>

          <div className="text-left">
            <span className="text-xs text-slate-400 uppercase font-mono block">Remediated</span>
            <span className="text-4xl sm:text-6xl font-black font-mono text-emerald-400">
              {data.afterScore}%
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2">
          Successfully turned a <strong className="text-rose-400">HIGH SEVERITY</strong> learning gap into <strong className="text-emerald-400">VERIFIED CONCEPT MASTERY</strong>.
        </p>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BEFORE CARD */}
        <div className="rounded-2xl border-2 border-rose-500/30 bg-rose-950/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Initial Diagnostic Assessment
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-500 text-white uppercase">
                HIGH GAP
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">{data.concept}</h3>
            <div className="text-4xl font-mono font-black text-rose-400 mb-4">
              {data.beforeScore}% Accuracy
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Substituted -7 directly into numerator instead of -(-7) = +7</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Confused vertex peak time (-b/2a) with ground root impact</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Dropped negative branch in square root property problems</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <strong>Diagnosis:</strong> Conceptual understanding intact; application collapsed under formula sign inversions.
          </div>
        </div>

        {/* AFTER CARD */}
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl shadow-emerald-900/10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Post-Adaptive Remediation
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500 text-slate-950 uppercase">
                IMPROVED
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">{data.concept}</h3>
            <div className="text-4xl font-mono font-black text-emerald-400 mb-4">
              {data.afterScore}% Accuracy
            </div>

            <div className="space-y-2.5 text-xs text-slate-200">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Correctly handles double negatives using bracket template</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Distinguishes projectile roots (h=0) from vertex heights</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Solved 4 of 5 targeted application questions with zero sign traps</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <strong>Status:</strong> Misconception successfully resolved. Ready for advanced polynomial systems.
          </div>
        </div>
      </div>

      {/* Outcome Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Score Delta
          </div>
          <div className="text-2xl font-mono font-black text-indigo-300 mt-1">
            +{data.improvementPercentage}%
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Problems Mastered
          </div>
          <div className="text-2xl font-mono font-black text-emerald-400 mt-1">
            {data.questionsMastered} / {data.totalPracticeQuestions}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Critical Gaps Remaining
          </div>
          <div className="text-2xl font-mono font-black text-white mt-1">
            0
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Curriculum Status
          </div>
          <div className="text-sm font-black uppercase text-emerald-400 mt-2">
            CONSOLIDATED
          </div>
        </div>
      </div>

      {/* Bottom CTA Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          Return to Student Dashboard
        </button>

        <button
          onClick={() => onNavigate('teacher')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
        >
          Inspect Classroom Teacher View
        </button>
      </div>
    </div>
  );
};
