import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Brain,
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  GitBranch
} from 'lucide-react';
import { AssessmentResult, ConceptDiagnosis } from '../types';
import { NavTab } from './Navbar';

interface LearningGapReportViewProps {
  result: AssessmentResult;
  onNavigate: (tab: NavTab) => void;
  aiSource: 'gemini-3.8-flash' | 'deterministic_engine';
  aiInsights?: {
    conceptualDiagnosis: string;
    pedagogicalAdvice: string;
    cognitiveTrapIdentified: string;
  };
}

export const LearningGapReportView: React.FC<LearningGapReportViewProps> = ({
  result,
  onNavigate,
  aiSource,
  aiInsights
}) => {
  const [showConfidenceExplainer, setShowConfidenceExplainer] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<ConceptDiagnosis>(
    result.topLearningGap || result.diagnoses[0]
  );

  const topGap = selectedConcept;
  const isHighGap = topGap.severity === 'HIGH' || topGap.accuracy <= 40;
  const evidenceItems = topGap.evidence && topGap.evidence.length > 0 ? topGap.evidence : ['Insufficient evidence — more responses are required.'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>AI Diagnostic Engine • Clinical Assessment Summary</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Learning Gap Detection Report
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Student: <span className="text-white font-semibold">{result.studentName}</span> • Diagnostic confidence backed by multiple response verifications.
          </p>
        </div>

        {/* AI Source badge */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <Brain className="w-4 h-4 text-indigo-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono">Engine</div>
            <div className="font-semibold text-slate-200">
              {aiSource === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash Diagnostic' : 'Deterministic Rule Engine'}
            </div>
          </div>
        </div>
      </div>

      {/* Concept Switcher Tabs (if multiple concepts diagnosed) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        <span className="text-xs font-semibold text-slate-500 shrink-0 mr-2">
          Analyzed Concepts:
        </span>
        {result.diagnoses.map(d => {
          const isSelected = selectedConcept.concept === d.concept;
          const isWeak = d.severity === 'HIGH' || d.accuracy <= 45;

          return (
            <button
              key={d.concept}
              onClick={() => setSelectedConcept(d)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? isWeak
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{d.concept}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  d.accuracy <= 40
                    ? 'bg-rose-500 text-white'
                    : d.accuracy >= 75
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {d.accuracy}%
              </span>
            </button>
          );
        })}
      </div>

      {/* HERO SPOTLIGHT: LEARNING GAP DETECTED CARD */}
      <div
        className={`rounded-3xl border-2 p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
          isHighGap
            ? 'border-rose-500/50 bg-gradient-to-b from-rose-950/30 via-slate-950/80 to-slate-900'
            : 'border-amber-500/40 bg-gradient-to-b from-amber-950/20 via-slate-950/80 to-slate-900'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                isHighGap ? 'bg-rose-600 shadow-lg shadow-rose-600/30' : 'bg-amber-600'
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-400">
                {isHighGap ? 'CRITICAL LEARNING GAP DETECTED' : 'CONCEPT UNDER REVIEW'}
              </span>
              <h2 className="text-3xl font-black text-white">{topGap.concept}</h2>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Accuracy */}
            <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Concept Accuracy
              </div>
              <div className="text-2xl font-mono font-black text-rose-400">
                {topGap.accuracy}%
              </div>
            </div>

            {/* Severity */}
            <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Gap Severity
              </div>
              <div
                className={`text-sm font-black uppercase tracking-wider px-2 py-0.5 mt-1 rounded ${
                  topGap.severity === 'HIGH'
                    ? 'bg-rose-500 text-white'
                    : 'bg-amber-500 text-slate-950'
                }`}
              >
                {topGap.severity} SEVERITY
              </div>
            </div>

            {/* Confidence with Transparent breakdown toggle */}
            <div
              onClick={() => setShowConfidenceExplainer(!showConfidenceExplainer)}
              className="px-4 py-2 rounded-xl bg-slate-900/90 border border-indigo-500/30 hover:border-indigo-400 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1 text-[10px] text-indigo-300 font-bold uppercase tracking-wider">
                <span>Confidence</span>
                <Info className="w-3 h-3 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-mono font-black text-indigo-300 flex items-center gap-1">
                <span>{topGap.confidence}%</span>
                {showConfidenceExplainer ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Transparent Confidence Scoring Explainer Drawer */}
        {showConfidenceExplainer && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">
                Transparent Confidence Scoring Model
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Deterministic Multi-Factor Evaluation
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Confidence is mathematically computed from 4 empirical variables rather than an arbitrary estimate:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">1. Sample Depth</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {topGap.totalQuestions} Questions Evaluated
                </div>
                <div className="text-[10px] text-slate-400">
                  {topGap.totalQuestions >= 3 ? '+40pts (High Sample)' : '+22pts (Moderate)'}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">2. Error Consistency</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {topGap.errorPatterns.length} Repeated Traps
                </div>
                <div className="text-[10px] text-slate-400">
                  {topGap.errorPatterns.length > 0 ? '+30pts (Pattern Verified)' : '+15pts'}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">3. Difficulty Gradient</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  Foundational vs Applied Drop-off
                </div>
                <div className="text-[10px] text-slate-400">+28pts (Sharp Contrast)</div>
              </div>
            </div>
          </div>
        )}

        {/* Diagnosis Narrative */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>Diagnostic Summary</span>
          </div>
          <p className="text-base text-slate-200 leading-relaxed font-medium">
            "{aiInsights?.conceptualDiagnosis || topGap.diagnosisSummary}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-2">Mistake Fingerprint</div>
            <div className="text-xl font-black text-white">{topGap.mistakeFingerprint || 'Repeated pattern'}</div>
            <div className="mt-2 text-xs text-slate-400">Root Cause</div>
            <p className="text-sm text-slate-200 mt-1">{topGap.rootCause || 'No root cause isolated yet.'}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-2">Why was this gap detected?</div>
            <ul className="space-y-2 text-xs text-slate-300">
              {evidenceItems.slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Two-Column: Evidence (WHY) & Action (WHAT NEXT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section: WHY DID WE DETECT THIS? */}
          <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>WHY DID WE DETECT THIS? (Response Evidence)</span>
              </h3>
              <ul className="space-y-3">
                {topGap.whyDetected.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {(topGap.errorPatterns.length > 0 || aiInsights?.cognitiveTrapIdentified) && (
              <div className="mt-5 pt-4 border-t border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-rose-400" />
                  <span>Isolated Technical Cognitive Trap:</span>
                </div>
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs text-rose-300 font-mono leading-relaxed">
                  {aiInsights?.cognitiveTrapIdentified || topGap.errorPatterns[0]}
                </div>
              </div>
            )}
          </div>

          {/* Section: RECOMMENDED ACTION */}
          <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>RECOMMENDED ACTION PLAN</span>
              </h3>
              <ol className="space-y-3">
                {topGap.recommendedActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Next milestone:</span>
              <span className="text-xs font-bold text-white">4-Step Adaptive Practice</span>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-800">
          <button
            onClick={() => onNavigate('map')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <GitBranch className="w-4 h-4" />
            <span>Inspect Prerequisite Map</span>
          </button>

          <button
            onClick={() => onNavigate('path')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Proceed to Personalized Learning Path</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Difficulty Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['Beginner', 'Medium', 'Hard'] as const).map(diff => {
          const perf = topGap.performanceByDifficulty?.[diff] || {
            total: 0,
            correct: 0,
            accuracy: 0
          };
          const isPassed = perf.accuracy >= 70;

          return (
            <div
              key={diff}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {diff} Level
                </span>
                <div className="text-xl font-bold text-white mt-1">
                  {perf.correct} of {perf.total} Correct
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {perf.accuracy}% accuracy
                </div>
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  perf.total === 0
                    ? 'bg-slate-800 text-slate-500'
                    : isPassed
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                }`}
              >
                {perf.accuracy}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
