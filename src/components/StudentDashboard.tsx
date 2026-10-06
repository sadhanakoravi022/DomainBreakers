import React from 'react';
import {
  TrendingUp,
  AlertOctagon,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
  GitBranch,
  ShieldAlert,
  BarChart,
  HelpCircle
} from 'lucide-react';
import { AssessmentResult, DomainId, StudentLanguage } from '../types';
import { NavTab } from './Navbar';

interface StudentDashboardProps {
  assessmentResult: AssessmentResult | null;
  onNavigate: (tab: NavTab) => void;
  onStartAssessment: () => void;
  onLoadGoldenDemo: () => void;
  activeDomain: DomainId;
  onSelectDomain: (domain: DomainId) => void;
  studentLanguage?: StudentLanguage;
  onLanguageChange?: (language: StudentLanguage) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  assessmentResult,
  onNavigate,
  onStartAssessment,
  onLoadGoldenDemo,
  activeDomain,
  onSelectDomain,
  studentLanguage = 'en',
  onLanguageChange
}) => {
  // If no assessment has been taken yet, default to initial state with easy option to run assessment or load demo
  const overallScore = assessmentResult ? assessmentResult.overallScore : 72;
  const strongCount = assessmentResult
    ? assessmentResult.diagnoses.filter(d => d.accuracy >= 75).length
    : 2;
  const needsAttentionCount = assessmentResult
    ? assessmentResult.diagnoses.filter(d => d.accuracy < 70).length
    : 2;
  const topGap = assessmentResult?.topLearningGap || {
    concept: 'Quadratic Equations',
    accuracy: 35,
    severity: 'HIGH' as const,
    confidence: 87,
    diagnosisSummary: 'Student understands basic factoring but exhibits severe application difficulty during Quadratic Formula substitution with negative coefficients.'
  };

  const concepts = assessmentResult?.diagnoses || [
    {
      concept: 'Linear Equations',
      topic: 'Algebra',
      accuracy: 85,
      status: 'STRONG',
      color: 'emerald'
    },
    {
      concept: 'Algebra Foundations',
      topic: 'Algebra',
      accuracy: 72,
      status: 'GOOD',
      color: 'emerald'
    },
    {
      concept: 'Functions',
      topic: 'Algebra',
      accuracy: 68,
      status: 'MODERATE',
      color: 'amber'
    },
    {
      concept: 'Quadratic Equations',
      topic: 'Algebra',
      accuracy: 35,
      status: 'HIGH GAP',
      color: 'rose'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Student Learning Portal</span>
            <span>•</span>
            <span className="text-slate-400">Student: Alex Rivera</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, Alex.
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            DomainBreakers is actively tracking your technical concept dependencies.
            {assessmentResult
              ? ' Assessment results processed with response pattern analysis.'
              : ' Take the diagnostic assessment to verify your learning curve.'}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Student language:</span>
            <select
              value={studentLanguage}
              onChange={e => onLanguageChange?.(e.target.value as StudentLanguage)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-white"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          {/* Domain Track Selection Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Switch Track:
            </span>
            {[
              { id: 'python', label: '🐍 Python Core & Mutability' },
              { id: 'javascript', label: '⚡ JavaScript Async & Event Loop' },
              { id: 'algebra', label: '📐 Engineering Math' }
            ].map(track => (
              <button
                key={track.id}
                onClick={() => onSelectDomain(track.id as DomainId)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeDomain === track.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onStartAssessment}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Take Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {!assessmentResult && (
            <button
              onClick={onLoadGoldenDemo}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all cursor-pointer"
            >
              Load Demo Data
            </button>
          )}
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Score */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Overall Score</span>
            <BarChart className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white">{overallScore}%</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Across 4 core algebra concepts
          </p>
        </div>

        {/* Strong Concepts */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Strong Concepts</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">{strongCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">
            ≥ 75% accuracy demonstrated
          </p>
        </div>

        {/* Concepts Needing Attention */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Gaps Detected</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-rose-400">{needsAttentionCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">
            1 High Severity, 1 Moderate
          </p>
        </div>

        {/* Recent Improvement */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Target Improvement</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300">+49%</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Projected via adaptive practice
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout: Top Learning Gap & Concept Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3): Concept Mastery Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Concept Mastery Overview</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time cognitive retention per domain module
                </p>
              </div>
              <button
                onClick={() => onNavigate('map')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>View Dependency Map</span>
                <GitBranch className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {concepts.map((c: any) => {
                const acc = c.accuracy ?? 0;
                let statusLabel = 'GOOD';
                let badgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
                let barClass = 'bg-emerald-500';

                if (acc >= 80) {
                  statusLabel = 'STRONG';
                  badgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
                  barClass = 'bg-emerald-500';
                } else if (acc >= 60) {
                  statusLabel = 'MODERATE';
                  badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
                  barClass = 'bg-amber-500';
                } else {
                  statusLabel = 'HIGH GAP';
                  badgeClass = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
                  barClass = 'bg-rose-500';
                }

                return (
                  <div
                    key={c.concept}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{c.concept}</span>
                        {c.topic && (
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                            ({c.topic})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-slate-200">{acc}%</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeClass}`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${barClass}`}
                        style={{ width: `${acc}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('path')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 transition-all text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1">Personalized Path</h3>
              <p className="text-xs text-slate-400">Step-by-step remediation plan</p>
            </button>

            <button
              onClick={() => onNavigate('practice')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-all text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1">Adaptive Practice</h3>
              <p className="text-xs text-slate-400">Targeted drills for weak spots</p>
            </button>

            <button
              onClick={() => onNavigate('improvement')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 hover:bg-slate-850 transition-all text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1">Before vs After</h3>
              <p className="text-xs text-slate-400">Measure delta and mastery</p>
            </button>
          </div>
        </div>

        {/* Right Column (1/3): Top Learning Gap Spotlight Card */}
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-rose-500/40 bg-gradient-to-b from-rose-950/20 via-slate-900/90 to-slate-900 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Top Learning Gap
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white uppercase tracking-wider shadow-sm shadow-rose-500/30">
                HIGH SEVERITY
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">{topGap.concept}</h3>

            <div className="flex items-center gap-4 py-3 border-y border-rose-500/20 my-4">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Accuracy</div>
                <div className="text-xl font-mono font-extrabold text-rose-400">{topGap.accuracy}%</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Confidence</div>
                <div className="text-xl font-mono font-extrabold text-indigo-300">
                  {topGap.confidence || 87}%
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Root Cause</div>
                <div className="text-xs font-semibold text-slate-200">Formula Sign</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {topGap.diagnosisSummary}
            </p>

            <button
              onClick={() => onNavigate('report')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
            >
              <span>View Full Diagnosis & Evidence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recommended Next Action */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Recommended Next Action
            </h4>
            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30">
              <div className="text-sm font-semibold text-white mb-1">
                Revise Quadratic Formula Signs
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Target the double negative trap <code className="text-indigo-300 bg-slate-900 px-1 py-0.5 rounded">-(-7) = +7</code> with a 5-minute interactive drill.
              </p>
              <button
                onClick={() => onNavigate('practice')}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Practice Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
