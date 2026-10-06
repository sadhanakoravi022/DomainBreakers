import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  Layers,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';
import { getConceptTreeForDomain, ConceptNode } from '../data/conceptGraph';
import { DomainId } from '../types';
import { NavTab } from './Navbar';

interface ConceptDependencyMapProps {
  onNavigate: (tab: NavTab) => void;
  activeDomain?: DomainId;
}

export const ConceptDependencyMap: React.FC<ConceptDependencyMapProps> = ({
  onNavigate,
  activeDomain = 'python'
}) => {
  const currentTree = getConceptTreeForDomain(activeDomain);
  const [selectedNode, setSelectedNode] = useState<ConceptNode>(
    currentTree.subconcepts?.find(s => s.status === 'WEAK') || currentTree
  );

  useEffect(() => {
    const tree = getConceptTreeForDomain(activeDomain);
    setSelectedNode(tree.subconcepts?.find(s => s.status === 'WEAK') || tree);
  }, [activeDomain]);

  const renderBadge = (status: ConceptNode['status']) => {
    switch (status) {
      case 'STRONG':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            STRONG
          </span>
        );
      case 'MODERATE':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
            MODERATE
          </span>
        );
      case 'WEAK':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
            HIGH GAP
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            NEUTRAL
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <GitBranch className="w-4 h-4" />
            <span>Interactive Prerequisite Hierarchy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Concept Dependency & Causality Map
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Identifies upstream and downstream conceptual friction. Trace why failure at the quadratic level stems from sign conventions rather than linear isolation mechanics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Strong</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Moderate</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="text-slate-300">Learning Gap</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Tree on Left, Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Interactive Tree Diagram */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-8">
          {/* Root Domain Node */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSelectedNode(currentTree)}
              className={`p-4 rounded-2xl border transition-all text-center max-w-sm w-full cursor-pointer ${
                selectedNode.id === currentTree.id
                  ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Root Domain</span>
                {renderBadge(currentTree.status)}
              </div>
              <div className="text-lg font-bold text-white">{currentTree.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">Foundational Mastery: {currentTree.score}%</div>
            </button>

            {/* Downward Connector Pipe */}
            <div className="w-0.5 h-8 bg-slate-700 my-1" />
          </div>

          {/* Level 1 Subconcepts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {currentTree.subconcepts?.map((branch: ConceptNode) => {
              const isSelected = selectedNode.id === branch.id;
              const isWeak = branch.status === 'WEAK';

              return (
                <div key={branch.id} className="space-y-4">
                  <button
                    onClick={() => setSelectedNode(branch)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? isWeak
                          ? 'bg-rose-500/20 border-rose-500 ring-2 ring-rose-500/30'
                          : 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/30'
                        : isWeak
                        ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {branch.category}
                      </span>
                      {renderBadge(branch.status)}
                    </div>
                    <div className="text-base font-bold text-white leading-tight mb-1">
                      {branch.name}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      Score: {branch.score}%
                    </div>
                  </button>

                  {/* Level 2 Sub-skills */}
                  {branch.subconcepts && (
                    <div className="pl-3 border-l-2 border-slate-800 space-y-2.5">
                      {branch.subconcepts.map((sub: ConceptNode) => {
                        const isSubSelected = selectedNode.id === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedNode(sub)}
                            className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSubSelected
                                ? 'bg-indigo-600/30 border-indigo-400 text-white'
                                : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-semibold text-slate-200 truncate">
                                {sub.name}
                              </span>
                              {renderBadge(sub.status)}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400">
                              {sub.score}% mastery
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Node Inspector & Diagnostic Breakdown */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Concept Inspector
            </span>
            {renderBadge(selectedNode.status)}
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-indigo-400 tracking-wider">
              {selectedNode.category}
            </span>
            <h3 className="text-2xl font-black text-white mt-0.5">{selectedNode.name}</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {selectedNode.description}
            </p>
          </div>

          {/* Metric Bar */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Demonstrated Retention:</span>
              <span className="font-mono font-bold text-white text-sm">{selectedNode.score}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  selectedNode.score >= 75
                    ? 'bg-emerald-500'
                    : selectedNode.score >= 55
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${selectedNode.score}%` }}
              />
            </div>
          </div>

          {/* Prerequisites */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Prerequisite Dependencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedNode.prerequisites.length > 0 ? (
                selectedNode.prerequisites.map(p => (
                  <span
                    key={p}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    ↳ {p}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500">Root foundation (no prerequisites)</span>
              )}
            </div>
          </div>

          {/* Pedagogical Guidance */}
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              Pedagogical Advice
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedNode.learningAdvice}
            </p>
          </div>

          {/* Direct CTA */}
          <button
            onClick={() => onNavigate('path')}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Open Personalized Learning Path</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
