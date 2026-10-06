import React from 'react';
import {
  Brain,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  GitMerge,
  Target,
  BarChart3,
  Layers,
  ShieldCheck,
  Play,
  Terminal,
  Code2,
  Binary,
  Cpu
} from 'lucide-react';
import { NavTab } from './Navbar';
import { DomainId } from '../types';

interface LandingPageProps {
  onStartAssessment: () => void;
  onViewDemo: () => void;
  onNavigate: (tab: NavTab) => void;
  activeDomain: DomainId;
  onSelectDomain: (domain: DomainId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onViewDemo,
  onNavigate,
  activeDomain,
  onSelectDomain
}) => {
  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 pt-6 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Problem Statement DU-01 • AI Learning Gap Detector</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          Break the gap.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200">
            Master the concept.
          </span>
        </h1>

        <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-6">
          "Don’t just find the wrong answer. Find the missing concept."
        </p>

        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mb-10 leading-relaxed">
          An AI-powered learning diagnosis platform that identifies the underlying concepts behind student mistakes and creates a personalized, adaptive path to mastery.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewDemo}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Play className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
            <span>View Golden Demo (Pre-analyzed)</span>
          </button>
        </div>

        {/* Micro-trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Transparent confidence scoring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Response-backed evidence generation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Adaptive remediation engine</span>
          </div>
        </div>

        {/* Technical Domain Selector Cards */}
        <div className="mt-12 text-left">
          <div className="text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Select Your Learning Domain
            </span>
            <p className="text-sm text-slate-300 font-semibold mt-1">
              Supports technical programming languages & STEM disciplines
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'python' as DomainId,
                name: 'Python Systems & Core',
                tag: 'TECHNICAL LANGUAGE',
                icon: Terminal,
                color: 'emerald',
                desc: 'Object references, mutable default argument traps, recursion call frames, and generator streams.'
              },
              {
                id: 'javascript' as DomainId,
                name: 'JavaScript & Async Runtimes',
                tag: 'TECHNICAL LANGUAGE',
                icon: Code2,
                color: 'amber',
                desc: 'Event Loop & microtask queue ordering, closure scope variables, and prototype inheritance.'
              },
              {
                id: 'algebra' as DomainId,
                name: 'Engineering Mathematics',
                tag: 'MATHEMATICS',
                icon: Binary,
                color: 'violet',
                desc: 'Polynomial factorization, quadratic formula sign mechanics, and function domains.'
              }
            ].map(track => {
              const isSelected = activeDomain === track.id;
              const Icon = track.icon;

              return (
                <div
                  key={track.id}
                  onClick={() => onSelectDomain(track.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {track.tag}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                    <h3 className="font-bold text-sm text-white">{track.name}</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {track.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual 5-Step Process */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            The Diagnostic Loop
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            How DomainBreakers Resolves Hidden Gaps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {[
            {
              step: '01',
              label: 'ASSESS',
              title: 'Multi-facet Testing',
              desc: 'Student answers curated problems spanning beginner, medium, and application difficulties.',
              color: 'from-blue-500/20 to-blue-600/5',
              border: 'border-blue-500/30',
              text: 'text-blue-400'
            },
            {
              step: '02',
              label: 'DIAGNOSE',
              title: 'Pattern Analysis',
              desc: 'Engine isolates error clusters: formula misuse, calculation slips, or conceptual disconnects.',
              color: 'from-violet-500/20 to-violet-600/5',
              border: 'border-violet-500/30',
              text: 'text-violet-400'
            },
            {
              step: '03',
              label: 'UNDERSTAND',
              title: 'Evidence & Reason',
              desc: 'Generates plain-English explanation citing exactly which responses caused the detection.',
              color: 'from-rose-500/20 to-rose-600/5',
              border: 'border-rose-500/30',
              text: 'text-rose-400'
            },
            {
              step: '04',
              label: 'PRACTICE',
              title: 'Adaptive Drills',
              desc: 'AI generates targeted fresh questions tailored strictly to the diagnosed misconception.',
              color: 'from-amber-500/20 to-amber-600/5',
              border: 'border-amber-500/30',
              text: 'text-amber-400'
            },
            {
              step: '05',
              label: 'IMPROVE',
              title: 'Before vs After',
              desc: 'Reassessment measures concrete delta (+49% improvement) and confirms concept mastery.',
              color: 'from-emerald-500/20 to-emerald-600/5',
              border: 'border-emerald-500/30',
              text: 'text-emerald-400'
            }
          ].map((item, idx) => (
            <div
              key={item.step}
              className={`relative rounded-2xl bg-gradient-to-b ${item.color} border ${item.border} p-5 flex flex-col justify-between transition-all hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold tracking-wider ${item.text}`}>
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-300">
                    {item.label}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              {idx < 4 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* The Fundamental Difference: Traditional vs DomainBreakers */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              The Fundamental Paradigm Shift
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Marks Don’t Teach. Concepts Do.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Traditional Systems */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <XCircle className="w-4 h-4" />
                  <span>Traditional Quiz Systems</span>
                </div>
                <div className="text-3xl font-black text-rose-400 mb-2">"Your score is 40%."</div>
                <p className="text-sm text-slate-300 mb-4">
                  Gives students an arbitrary number. Does not specify what failed, why it failed, or how to remedy the root misunderstanding.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-rose-500/20 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Treats all incorrect answers identically</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Leaves student guessing what went wrong</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Generates random re-quizzes without diagnosis</span>
                </div>
              </div>
            </div>

            {/* DomainBreakers */}
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/15 p-6 flex flex-col justify-between shadow-lg shadow-emerald-900/10">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>DomainBreakers Diagnostic</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  "You are struggling with Quadratic Formula application."
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  Pinpoints that you master basic factoring, but repeatedly drop negative signs when substituting into <span className="font-mono text-emerald-300">-(-b)</span>.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-emerald-500/20 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Isolates specific misconception: <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">-(-7) = -7</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Provides transparent 87% diagnostic confidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Builds a 4-step path targeting that exact trap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Concept Dependency Mapping</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Maps how foundational linear equations feed into quadratics and functions. Shows teachers and students the prerequisite chain causing friction.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Evidence-Backed Diagnoses</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Never declares a learning gap on an isolated fluke. Requires consistent difficulty drop-offs and repeated misconceptions before flagging severity.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">Measurable Before vs After</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Verifies remediation efficacy. Watch the student advance from 33% weak performance up to 82% verified mastery on newly generated problems.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/40 via-violet-900/30 to-slate-900 border border-indigo-500/30 p-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to test the diagnostic pipeline?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Take the 10-question assessment or load our golden demo dataset to see the complete learning gap detection flow in action.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Start 10-Question Assessment
            </button>
            <button
              onClick={onViewDemo}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
            >
              Load Hackathon Golden Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
