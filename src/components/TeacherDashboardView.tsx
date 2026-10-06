import React, { useState, useEffect } from 'react';
import {
  Users,
  AlertOctagon,
  TrendingUp,
  BarChart2,
  ChevronRight,
  ShieldAlert,
  Info,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { getTeacherDataForDomain, ClassroomConceptGap } from '../data/teacherData';
import { DomainId } from '../types';
import { NavTab } from './Navbar';

interface TeacherDashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  activeDomain?: DomainId;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  onNavigate,
  activeDomain = 'python'
}) => {
  const currentData = getTeacherDataForDomain(activeDomain);
  const [selectedGap, setSelectedGap] = useState<ClassroomConceptGap>(
    currentData.conceptGaps[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const data = getTeacherDataForDomain(activeDomain);
    setSelectedGap(data.conceptGaps[0]);
  }, [activeDomain]);

  const teacherData = getTeacherDataForDomain(activeDomain);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Teacher Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Classroom Analytics & Cohort Diagnostics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Teacher Diagnostic Hub
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {teacherData.className} • Aggregated from real-time student responses
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Switch to Student View
          </button>
        </div>
      </div>

      {/* Cohort KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Total Enrolled
          </div>
          <div className="text-3xl font-black text-white">{teacherData.totalStudents}</div>
          <div className="text-xs text-slate-400 mt-1">Active in technical cohort</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Class Mean Accuracy
          </div>
          <div className="text-3xl font-black text-indigo-400">
            {teacherData.averageScore}%
          </div>
          <div className="text-xs text-slate-400 mt-1">Across domain modules</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Students With Gaps
          </div>
          <div className="text-3xl font-black text-rose-400">
            {teacherData.studentsWithLearningGaps}
          </div>
          <div className="text-xs text-rose-400 mt-1">Flagged for targeted remediation</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Completion Rate
          </div>
          <div className="text-3xl font-black text-emerald-400">
            {teacherData.assessmentCompletionRate}%
          </div>
          <div className="text-xs text-slate-400 mt-1">Diagnostic submissions logged</div>
        </div>
      </div>

      {/* Main Two-Column Layout: Concept Gaps List & Concept Detail Drilldown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 cols): Concept Gaps Table */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-white">Class Learning Gaps</h2>
              <p className="text-xs text-slate-400">Click a concept to inspect affected students</p>
            </div>
            <span className="text-xs font-mono text-slate-500">{teacherData.conceptGaps.length} Tracked</span>
          </div>

          <div className="space-y-3">
            {teacherData.conceptGaps.map(gap => {
              const isSelected = selectedGap.id === gap.id;
              const isHigh = gap.severity === 'HIGH';

              return (
                <div
                  key={gap.id}
                  onClick={() => setSelectedGap(gap)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white">{gap.concept}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                        isHigh
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : gap.severity === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {gap.severity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {gap.affectedCount} of {gap.totalStudents} Students Affected
                    </span>
                    <span className="font-mono font-bold text-white">
                      {gap.affectedPercentage}% of Class
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isHigh ? 'bg-rose-500' : gap.severity === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${gap.affectedPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Concept Deep Dive & Affected Students */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Cohort Intervention Profile
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5">{selectedGap.concept}</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Class Accuracy</span>
                <span className="text-xl font-mono font-bold text-rose-400">
                  {selectedGap.averageAccuracy}%
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Confidence</span>
                <span className="text-xl font-mono font-bold text-indigo-300">
                  {selectedGap.confidence}%
                </span>
              </div>
            </div>
          </div>

          {/* Common Error Patterns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Isolated Cognitive Traps Across Students</span>
            </h4>
            <div className="space-y-2">
              {selectedGap.commonErrorPatterns.map((pattern, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{pattern}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Classroom Intervention */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Recommended Lesson Intervention
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedGap.recommendedIntervention}
            </p>
          </div>

          {/* Affected Student Roster */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Flagged Students ({selectedGap.affectedStudents.length} of {selectedGap.affectedCount})
              </h4>
              <span className="text-[11px] text-slate-500">Live Roster</span>
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800 bg-slate-950">
              {selectedGap.affectedStudents.map(student => (
                <div
                  key={student.name}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-900/60 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-white">{student.name}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          student.gapSeverity === 'HIGH'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {student.gapSeverity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {student.specificStruggle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                    <span className="text-slate-400">{student.lastAttempt}</span>
                    <span className="font-bold text-rose-400">{student.accuracy}% Acc</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
