import React, { useState } from 'react';
import {
  Brain,
  LayoutDashboard,
  ClipboardCheck,
  AlertTriangle,
  GitBranch,
  Route,
  Zap,
  TrendingUp,
  Users,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Terminal
} from 'lucide-react';
import { DomainId, StudentLanguage } from '../types';
import { DOMAIN_GROUPS, getDomainConfig } from '../data/technicalDomains';

export type NavTab =
  | 'landing'
  | 'dashboard'
  | 'assessment'
  | 'report'
  | 'map'
  | 'path'
  | 'practice'
  | 'improvement'
  | 'progress'
  | 'teacher';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  hasAssessmentData: boolean;
  onLoadGoldenDemo: () => void;
  aiSource: 'gemini-3.8-flash' | 'deterministic_engine';
  activeDomain: DomainId;
  onSelectDomain: (domain: DomainId) => void;
  studentLanguage?: StudentLanguage;
  onLanguageChange?: (language: StudentLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  hasAssessmentData,
  onLoadGoldenDemo,
  aiSource,
  activeDomain,
  onSelectDomain,
  studentLanguage = 'en',
  onLanguageChange
}) => {
  const [showDomainMenu, setShowDomainMenu] = useState(false);
  const selectedDomain = getDomainConfig(activeDomain);

  const languageLabels: Record<StudentLanguage, string> = {
    en: 'English',
    hi: 'हिंदी',
    mr: 'मराठी'
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-white shadow-sm">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-600/70 to-transparent" />
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 py-3 sm:min-h-[4.5rem] sm:justify-start">
          {/* Logo & Domain Badge */}
          <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:gap-3">
            <div
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/15 ring-1 ring-slate-800 transition-all duration-300 group-hover:-translate-y-0.5">
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <Brain className="relative h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight text-white transition-colors group-hover:text-indigo-200">
                    DOMAIN<span className="text-indigo-400">BREAKERS</span>
                  </span>
                  <span className="rounded-md border border-indigo-400/25 bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                    DU-01
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400">
                  AI-Powered Learning Gap Detector
                </p>
              </div>
            </div>

            {/* Technical Domain Selector Dropdown */}
            <div className="relative">
              <button
                aria-expanded={showDomainMenu}
                aria-haspopup="menu"
                aria-label="Select technical domain"
                onClick={() => setShowDomainMenu(!showDomainMenu)}
                className="flex max-w-[10rem] items-center gap-1.5 rounded-xl border border-indigo-400/25 bg-gradient-to-b from-slate-800/90 to-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-100 shadow-lg shadow-black/10 transition-all hover:border-indigo-300/60 hover:shadow-indigo-950/40 sm:max-w-[14rem] lg:max-w-[18rem]"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="min-w-0 truncate">{selectedDomain.label}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase">
                  {selectedDomain.category}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>

              {showDomainMenu && (
                <div
                  role="menu"
                  aria-label="Select technical domain"
                  className="absolute left-0 z-50 mt-2 max-h-[min(70vh,34rem)] w-72 overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 py-2 shadow-2xl"
                >
                  <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Select Technical Domain
                  </div>
                  {DOMAIN_GROUPS.map(group => (
                    <section key={group.label} className="px-2 pt-2">
                      <h2 className="px-2 py-1.5 text-[11px] font-bold text-slate-400">
                        <span className="mr-2" aria-hidden="true">{group.icon}</span>
                        {group.label}
                      </h2>
                      <div className="space-y-0.5">
                        {group.domains.map(domain => {
                          const isSelected = activeDomain === domain.id;
                          return (
                            <button
                              key={domain.label}
                              type="button"
                              role="menuitem"
                              aria-current={isSelected ? 'true' : undefined}
                              onClick={() => {
                                onSelectDomain(domain.id);
                                setShowDomainMenu(false);
                              }}
                              className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                                isSelected
                                  ? 'bg-indigo-600/20 font-semibold text-indigo-300'
                                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              {domain.label}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </div>

            <div className="ml-1 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 px-2.5 py-1.5 text-xs font-semibold text-slate-200 shadow-lg shadow-black/10">
              <select
                aria-label="Language"
                value={studentLanguage}
                onChange={e => onLanguageChange?.(e.target.value as StudentLanguage)}
                className="bg-slate-900 text-white outline-none"
              >
                {Object.entries(languageLabels).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              onClick={() => onSelectTab('assessment')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'assessment'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              Assessment
            </button>

            <button
              onClick={() => onSelectTab('report')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'report'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Gap Report
              {hasAssessmentData && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'map'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              Dependency Map
            </button>

            <button
              onClick={() => onSelectTab('path')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'path'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              Learning Path
            </button>

            <button
              onClick={() => onSelectTab('practice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'practice'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Practice
            </button>

            <button
              onClick={() => onSelectTab('improvement')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'improvement'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Before/After
            </button>

            <button
              onClick={() => onSelectTab('teacher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentTab === 'teacher'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Teacher View
            </button>
          </nav>

          {/* Quick Demo CTA */}
          <div className="hidden">
            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-400">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>{aiSource === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash' : 'Diagnostic Engine'}</span>
            </div>

            <button
              onClick={onLoadGoldenDemo}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
              title="Loads the golden demo response pattern for judges"
            >
              <span>Golden Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="hidden">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'assessment', label: 'Assess', icon: ClipboardCheck },
            { id: 'report', label: 'Gaps', icon: AlertTriangle },
            { id: 'map', label: 'Map', icon: GitBranch },
            { id: 'path', label: 'Path', icon: Route },
            { id: 'practice', label: 'Practice', icon: Zap },
            { id: 'improvement', label: 'Results', icon: TrendingUp },
            { id: 'teacher', label: 'Teacher', icon: Users },
          ].map(item => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id as NavTab)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            );
          })}
        </div>

        <nav aria-label="Main navigation" className="grid w-full grid-cols-2 items-center justify-items-center gap-1.5 border-t border-slate-800 py-2.5 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center">
          {[
            { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
            { id: 'assessment', label: 'Assessment', icon: ClipboardCheck },
            { id: 'report', label: 'My Learning Gap', icon: AlertTriangle },
            { id: 'practice', label: 'Practice', icon: Zap },
            { id: 'progress', label: 'Progress', icon: TrendingUp },
            { id: 'teacher', label: 'Teacher', icon: Users }
          ].map(item => (
            (() => {
              const Icon = item.icon;
              const active = currentTab === item.id || (item.id === 'progress' && currentTab === 'improvement');
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id as NavTab)}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-xl border px-1.5 py-2 text-[11px] font-semibold transition-all duration-200 sm:gap-2 sm:px-3 sm:text-sm lg:shrink-0 lg:px-4 ${
                    active
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                      : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-slate-100'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-indigo-300'}`} />
                  {item.label}
                  {item.id === 'report' && hasAssessmentData && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-300/50" />}
                  {active && <span className="absolute inset-x-4 -bottom-[11px] h-0.5 rounded-full bg-emerald-600" />}
                </button>
              );
            })()
          ))}
        </nav>
      </div>
    </header>
  );
};
