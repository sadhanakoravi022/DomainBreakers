import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Send,
} from 'lucide-react';
import { Question, StudentLanguage, StudentResponse } from '../types';
import { LearningEngine } from '../services/learningEngine';

interface AssessmentViewProps {
  questions: Question[];
  onSubmitAssessment: (responses: StudentResponse[]) => void;
  studentLanguage?: StudentLanguage;
  domainName: string;
}

const localizedStrings: Record<StudentLanguage, Record<string, string>> = {
  en: {
    title: 'Diagnostic Assessment',
    intro: 'Answer these questions honestly. DomainBreakers will identify where you need help.',
    prompt: 'Question',
    answer: 'Enter your answer',
    previous: 'Previous',
    next: 'Next',
    submit: 'Analyze My Answers',
    concept: 'Concept',
    answered: 'Answered',
    shortAnswerHint: 'Enter exact numerical answers or a concise explanation.'
  },
  hi: {
    title: 'नैदानिक मूल्यांकन',
    intro: 'ईमानदारी से उत्तर दें। DomainBreakers आपकी कठिनाई पहचानने में मदद करेगा।',
    prompt: 'प्रश्न',
    answer: 'अपना उत्तर दर्ज करें',
    previous: 'पिछला',
    next: 'अगला',
    submit: 'मेरे उत्तरों का विश्लेषण करें',
    concept: 'कॉनसेप्ट',
    answered: 'उत्तर दिए',
    shortAnswerHint: 'सटीक संख्यात्मक उत्तर या संक्षिप्त स्पष्टीकरण लिखें।'
  },
  mr: {
    title: 'निदानात्मक मूल्यांकन',
    intro: 'प्रामाणिकपणे उत्तरे द्या. DomainBreakers तुम्हाला कुठे मदत हवी ते ओळखेल.',
    prompt: 'प्रश्न',
    answer: 'तुमचे उत्तर लिहा',
    previous: 'मागील',
    next: 'पुढील',
    submit: 'माझ्या उत्तरांचे विश्लेषण करा',
    concept: 'संकल्पना',
    answered: 'उत्तरे दिली',
    shortAnswerHint: 'अचूक संख्यात्मक उत्तर किंवा संक्षिप्त स्पष्टीकरण लिहा.'
  }
};

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  questions,
  onSubmitAssessment,
  studentLanguage = 'en',
  domainName
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQ = questions[currentIndex];
  const t = localizedStrings[studentLanguage];
  const currentQuestionText = currentQ?.translations?.[studentLanguage]?.question ?? currentQ?.question ?? '';
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k]?.trim().length > 0).length;

  const handleSelectOption = (optionId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleShortAnswerChange = (val: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: val
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const compiledResponses: StudentResponse[] = questions.flatMap(q => {
      const selected = userAnswers[q.id]?.trim() || '';
      if (!selected) return [];

      let isCorrect = false;
      let mistakeType: string | undefined;
      let rootCause: string | undefined;
      let responseResult: StudentResponse['result'];
      let evidence: string[] | undefined;
      let confidence: number | undefined;

      if (q.type === 'MCQ') {
        isCorrect = selected.toLowerCase() === q.correctAnswer.toLowerCase();
        if (!isCorrect) {
          const mapped = q.misconceptionMap?.[selected];
          mistakeType = mapped ? 'Formula Misuse' : 'Incorrect Application';
          rootCause = mapped || 'The student selected a response pattern that does not align with the correct reasoning.';
          evidence = mapped ? [mapped] : ['The chosen answer does not match the expected reasoning path.'];
          confidence = 68;
          responseResult = 'incorrect';
        } else {
          responseResult = 'correct';
          confidence = 92;
        }
      } else {
        const evaluation = LearningEngine.evaluateShortAnswer(q, selected);
        isCorrect = evaluation.result === 'correct';
        mistakeType = evaluation.mistakeType;
        rootCause = evaluation.rootCause;
        responseResult = evaluation.result;
        evidence = evaluation.evidence;
        confidence = evaluation.confidence;
      }

      return [{
        questionId: q.id,
        selectedAnswer: selected,
        isCorrect,
        identifiedMisconception: !isCorrect ? q.misconceptionMap?.[selected] : undefined,
        result: responseResult,
        mistakeType,
        rootCause,
        evidence,
        confidence,
        language: studentLanguage
      }];
    });

    onSubmitAssessment(compiledResponses);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold text-white">{domainName} Assessment</h1>
        <p className="mt-2 text-slate-400">{t.intro}</p>
        <p className="mt-2 inline-flex rounded-lg border border-indigo-500/30 bg-indigo-950/30 px-3 py-2 text-sm text-indigo-200">
          Domain: {domainName} · These questions are based on your selected domain.
        </p>
      </div>
      {/* Assessment Header & Progress Bar */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                {t.prompt} {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-semibold text-slate-400">
                {answeredCount} {t.answered}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {t.concept}: {currentQ.concept}
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                currentQ.difficulty === 'Beginner'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : currentQ.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}
            >
              {currentQ.difficulty}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.prompt}
          </div>
          <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
            {currentQuestionText}
          </p>

          {/* Technical Code Snippet Display */}
          {currentQ.codeSnippet && (
            <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[var(--color-navy)] shadow-lg mt-3">
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-semibold text-slate-300">
                    {currentQ.language || 'code'}
                  </span>
                </div>
                <span className="text-[10px] uppercase text-indigo-400 font-bold">
                  Technical Snippet
                </span>
              </div>
              <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300 bg-[var(--color-navy)] leading-relaxed whitespace-pre selection:bg-indigo-600">
                {currentQ.codeSnippet}
              </div>
            </div>
          )}
        </div>

        {/* Question Input Type */}
        {currentQ.type === 'MCQ' && currentQ.options ? (
          <div className="space-y-3 pt-2">
            {currentQ.options.map(opt => {
              const isSelected = userAnswers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs uppercase ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-sm font-medium">{opt.text}</span>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-500'
                        : 'border-slate-700'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-slate-400">
              {t.answer}:
            </label>
            <input
              type="text"
              value={userAnswers[currentQ.id] || ''}
              onChange={e => handleShortAnswerChange(e.target.value)}
              placeholder={currentQ.translations?.[studentLanguage]?.placeholder || 'e.g. -1, 7'}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500">
              {t.shortAnswerHint}
            </p>
          </div>
        )}
      </div>

      {/* Navigation & Submission Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.previous}</span>
          </button>

          <button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>{t.next}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Submit Assessment */}
        {currentIndex === questions.length - 1 && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.submit}</span>
          </button>
        )}
      </div>
    </div>
  );
};
