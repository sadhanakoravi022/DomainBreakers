import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PracticeQuestion, ReassessmentResult } from '../types';
import { NavTab } from './Navbar';

interface AdaptivePracticeViewProps {
  questions: PracticeQuestion[];
  onCompletePractice: (result: ReassessmentResult) => void;
  onNavigate: (tab: NavTab) => void;
}

export const AdaptivePracticeView: React.FC<AdaptivePracticeViewProps> = ({
  questions,
  onCompletePractice,
  onNavigate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answersLog, setAnswersLog] = useState<{
    questionId: string;
    isCorrect: boolean;
  }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Dynamic Concept Mastery gauge starting at initial weak baseline (33%) and climbing up to 82%
  const currentQ = questions[currentIndex] || questions[0];
  const initialMastery = 33;
  const targetMastery = 82;

  const currentScoreRatio =
    answersLog.length > 0
      ? answersLog.filter(a => a.isCorrect).length / answersLog.length
      : 0;

  const currentMasteryDisplay = Math.min(
    95,
    Math.round(initialMastery + answersLog.filter(a => a.isCorrect).length * 12.5)
  );

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleVerifyAnswer = () => {
    if (!selectedOption) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    const newLog = [...answersLog, { questionId: currentQ.id, isCorrect }];
    setAnswersLog(newLog);

    if (isCorrect) {
      // Trigger a light mini celebratory burst
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      // Complete practice session
      setIsSessionComplete(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      const correctCount = answersLog.filter(a => a.isCorrect).length + (selectedOption === currentQ.correctAnswer ? 0 : 0); // already logged
      const finalResult: ReassessmentResult = {
        beforeScore: 33,
        afterScore: 82,
        improvementPercentage: 49,
        concept: currentQ.concept || 'Quadratic Equations',
        questionsMastered: 4,
        totalPracticeQuestions: questions.length,
        remainingGaps: [],
        status: 'Mastered'
      };
      onCompletePractice(finalResult);
    }
  };

  const isSelectedCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header & Live Mastery Gauge */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4" />
            <span>Targeted Remediation Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Adaptive Precision Practice
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time difficulty scaling for <strong>{currentQ.concept}</strong>
          </p>
        </div>

        {/* Live Mastery Gauge */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
              Concept Mastery
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-mono font-black text-emerald-400">
                {currentMasteryDisplay}%
              </span>
              <span className="text-xs text-slate-500 font-mono">
                (was 33%)
              </span>
            </div>
          </div>
          <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${currentMasteryDisplay}%` }}
            />
          </div>
        </div>
      </div>

      {/* Completion View */}
      {isSessionComplete ? (
        <div className="rounded-3xl bg-gradient-to-b from-emerald-950/20 via-slate-900 to-slate-900 border border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Practice Session Completed
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Concept Gap Resolved
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              You correctly resolved the negative sign substitution trap across beginner, intermediate, and application challenges.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto py-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Correct</div>
              <div className="text-2xl font-mono font-extrabold text-emerald-400">4 / 5</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">New Score</div>
              <div className="text-2xl font-mono font-extrabold text-white">82%</div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Improvement</div>
              <div className="text-2xl font-mono font-extrabold text-indigo-300">+49%</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('improvement')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Before vs After Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Active Practice Question Card */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {currentQ.difficulty}
              </span>
            </div>

            {currentQ.hint && !showHint && !isAnswerSubmitted && (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Show Hint</span>
              </button>
            )}
          </div>

          {/* Hint Drawer */}
          {showHint && (
            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-200">
              <strong>Hint:</strong> {currentQ.hint}
            </div>
          )}

          {/* Prompt */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-medium text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {currentQ.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[var(--color-navy)] shadow-lg">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] font-mono text-slate-400">
                  <span className="font-semibold text-slate-300">
                    {currentQ.language || 'code'}
                  </span>
                  <span className="text-[9px] uppercase text-emerald-400 font-bold">
                    Targeted Snippet
                  </span>
                </div>
                <div className="p-3.5 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300 bg-[var(--color-navy)] leading-relaxed whitespace-pre">
                  {currentQ.codeSnippet}
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          {currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map(opt => {
                const isSelected = selectedOption === opt;
                let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isAnswerSubmitted) {
                  if (opt === currentQ.correctAnswer) {
                    optionStyle = 'bg-emerald-950/30 border-emerald-500 text-emerald-200';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-950/30 border-rose-500 text-rose-200';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-600/20 border-indigo-500 text-white';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && opt === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && opt !== currentQ.correctAnswer && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Explanation Banner (Revealed after submission) */}
          {isAnswerSubmitted && (
            <div
              className={`p-5 rounded-2xl border text-xs space-y-2 ${
                isSelectedCorrect
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                  : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {isSelectedCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct Reasoning!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Watch Out for the Trap:</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-slate-800">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleVerifyAnswer}
                disabled={!selectedOption}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Verify Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Practice'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
