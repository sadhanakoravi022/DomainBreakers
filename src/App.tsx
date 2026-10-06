import React, { useState, useEffect, useMemo } from 'react';
import type { User } from '@supabase/supabase-js';
import { Navbar, NavTab } from './components/Navbar';
import { AuthView } from './components/AuthView';
import { AssessmentView } from './components/AssessmentView';
import { AnalysisLoadingModal } from './components/AnalysisLoadingModal';
import {
  MyLearningGapView,
  SimplePracticeView,
  SimpleProgressView,
  SimpleTeacherView,
  StudentHomeView
} from './components/StudentFlowViews';
import { AssessmentResult, PracticeQuestion, ReassessmentResult, StudentResponse, DomainId, Question, StudentLanguage } from './types';
import { AIService } from './services/aiService';
import { supabaseClient } from './services/supabaseClient';
import { getDomainConfig, getQuestionsForDomain, TECHNICAL_DOMAINS } from './data/technicalDomains';

interface SavedDomainProgress {
  assessmentResult: AssessmentResult;
  reassessmentResult: ReassessmentResult | null;
  practiceCompleted: number;
}

type DomainProgress = Partial<Record<DomainId, SavedDomainProgress>>;

const readDomainProgress = (userId: string): DomainProgress => {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(`domainbreakers-progress:${userId}`) || '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed as DomainProgress;
  } catch {
    return {};
  }
};

const isDomainId = (value: string | null): value is DomainId =>
  TECHNICAL_DOMAINS.some(domain => domain.id === value);

export default function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [activeDomain, setActiveDomain] = useState<DomainId>(() => {
    const stored = window.localStorage.getItem('domainbreakers-domain');
    return isDomainId(stored) ? stored : 'python';
  });
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [reassessmentResult, setReassessmentResult] = useState<ReassessmentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pendingAssessment, setPendingAssessment] = useState<{
    domain: DomainId;
    questions: Question[];
    responses: StudentResponse[];
  } | null>(null);
  const [domainProgress, setDomainProgress] = useState<DomainProgress>({});
  const [studentLanguage, setStudentLanguage] = useState<StudentLanguage>(() => {
    const stored = window.localStorage.getItem('domainbreakers-language');
    return stored === 'hi' || stored === 'mr' ? stored : 'en';
  });
  const [aiSource, setAiSource] = useState<'gemini-3.8-flash' | 'deterministic_engine'>('gemini-3.8-flash');

  useEffect(() => {
    if (!supabaseClient) {
      setAuthReady(true);
      return;
    }

    let previousUserId: string | null = null;
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      const nextUserId = nextUser?.id ?? null;

      if (nextUserId !== previousUserId) {
        setDomainProgress(nextUser ? readDomainProgress(nextUser.id) : {});
        setAssessmentResult(null);
        setReassessmentResult(null);
        setPendingAssessment(null);
        setIsAnalyzing(false);
        setCurrentTab('dashboard');
      }

      previousUserId = nextUserId;
      setAuthUser(nextUser);
      setAuthError(null);
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const currentQuestions = useMemo(() => getQuestionsForDomain(activeDomain), [activeDomain]);
  const activeProgress = domainProgress[activeDomain];

  useEffect(() => {
    window.localStorage.setItem('domainbreakers-language', studentLanguage);
  }, [studentLanguage]);

  useEffect(() => {
    window.localStorage.setItem('domainbreakers-domain', activeDomain);
  }, [activeDomain]);

  useEffect(() => {
    if (authUser) {
      window.localStorage.setItem(`domainbreakers-progress:${authUser.id}`, JSON.stringify(domainProgress));
    }
  }, [authUser, domainProgress]);

  const handleSignOut = async () => {
    if (!supabaseClient) return;

    const { error } = await supabaseClient.auth.signOut();
    if (error) setAuthError(error.message);
  };

  const handleSelectDomain = (domain: DomainId) => {
    setActiveDomain(domain);
    setAssessmentResult(domainProgress[domain]?.assessmentResult || null);
    setReassessmentResult(domainProgress[domain]?.reassessmentResult || null);
    setPendingAssessment(null);
    setIsAnalyzing(false);
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAssessment = () => {
    setCurrentTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadGoldenDemo = () => {
    const responses = currentQuestions.map((question, index) => {
      const wrongOption = question.options?.find(option => option.id !== question.correctAnswer);
      const isCorrect = index === 0;
      return {
        questionId: question.id,
        selectedAnswer: isCorrect ? question.correctAnswer : wrongOption?.id || '',
        isCorrect,
        identifiedMisconception: !isCorrect ? question.misconceptionMap?.[wrongOption?.id || ''] : undefined
      };
    });
    setIsAnalyzing(true);
    setPendingAssessment({ domain: activeDomain, questions: currentQuestions, responses });
  };

  const handleSubmitAssessment = (responses: StudentResponse[]) => {
    setIsAnalyzing(true);
    setPendingAssessment({ domain: activeDomain, questions: currentQuestions, responses });
  };

  const handleAnalysisComplete = async () => {
    const pending = pendingAssessment;
    if (!pending || pending.domain !== activeDomain) {
      setIsAnalyzing(false);
      setPendingAssessment(null);
      return;
    }

    const aiRes = await AIService.analyzeAssessment(pending.questions, pending.responses);
    setAssessmentResult(aiRes.result);
    setAiSource(aiRes.source);
    setDomainProgress(previous => ({
      ...previous,
      [pending.domain]: {
        assessmentResult: aiRes.result,
        reassessmentResult: previous[pending.domain]?.reassessmentResult || null,
        practiceCompleted: previous[pending.domain]?.practiceCompleted || 0
      }
    }));
    setIsAnalyzing(false);
    setPendingAssessment(null);
    setCurrentTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePractice = (result: ReassessmentResult) => {
    setReassessmentResult(result);
    setDomainProgress(previous => {
      const resultForDomain = previous[activeDomain]?.assessmentResult || assessmentResult;
      if (!resultForDomain) return previous;
      return {
        ...previous,
        [activeDomain]: {
          assessmentResult: resultForDomain,
          reassessmentResult: result,
          practiceCompleted: previous[activeDomain]?.practiceCompleted || 0
        }
      };
    });
    setCurrentTab('progress');
  };

  const handleRetakeAssessment = () => {
    setCurrentTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedAssessmentResult = assessmentResult || activeProgress?.assessmentResult || null;
  const selectedReassessmentResult = reassessmentResult || activeProgress?.reassessmentResult || null;
  const targetConcept = selectedAssessmentResult?.topLearningGap?.concept;
  const targetPractice = selectedAssessmentResult?.adaptivePractice
    .filter(question => question.concept === targetConcept)
    .slice(0, 3) || [];
  const originalQuickCheck: PracticeQuestion[] = targetConcept
    ? currentQuestions
      .filter(question => question.concept === targetConcept)
      .slice(0, 5)
      .map(question => ({
        id: `recheck-${question.id}`,
        question: question.question,
        codeSnippet: question.codeSnippet,
        language: question.language,
        options: question.options?.map(option => option.text),
        correctAnswer: question.options?.find(option => option.id === question.correctAnswer)?.text || question.correctAnswer,
        concept: question.concept,
        difficulty: question.difficulty === 'Beginner' ? 'Beginner' : question.difficulty === 'Medium' ? 'Intermediate' : 'Application',
        explanation: question.explanation
      }))
    : [];
  const supplementalQuickCheck = selectedAssessmentResult?.adaptivePractice
    .filter(question => question.concept === targetConcept)
    .slice(3, 6 - originalQuickCheck.length) || [];
  const quickCheck = [...originalQuickCheck, ...supplementalQuickCheck].slice(0, 5);

  if (!authReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-soft-white)] px-4">
        <p role="status" className="text-sm font-medium text-slate-400">Checking your sign-in…</p>
      </main>
    );
  }

  if (!authUser) {
    return <AuthView client={supabaseClient} />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-soft-white)] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={navigateTo}
        hasAssessmentData={!!selectedAssessmentResult}
        onLoadGoldenDemo={handleLoadGoldenDemo}
        aiSource={aiSource}
        activeDomain={activeDomain}
        onSelectDomain={handleSelectDomain}
        studentLanguage={studentLanguage}
        onLanguageChange={setStudentLanguage}
        userEmail={authUser.email || 'Signed in'}
        onSignOut={() => { void handleSignOut().catch(error => setAuthError(error instanceof Error ? error.message : 'Unable to sign out.')); }}
        accountError={authError}
      />

      {/* Main View Port */}
      <main className="flex-1 pb-8">
        {currentTab === 'dashboard' && (
          <StudentHomeView
            result={selectedAssessmentResult}
            reassessmentResult={selectedReassessmentResult}
            onNavigate={navigateTo}
            onStartAssessment={handleStartAssessment}
            onLoadSample={handleLoadGoldenDemo}
            activeDomain={activeDomain}
            studentLanguage={studentLanguage}
            practiceCompleted={activeProgress?.practiceCompleted || 0}
          />
        )}

        {currentTab === 'assessment' && (
          <AssessmentView
            key={activeDomain}
            questions={currentQuestions}
            onSubmitAssessment={handleSubmitAssessment}
            studentLanguage={studentLanguage}
            domainName={getDomainConfig(activeDomain).label}
          />
        )}

        {currentTab === 'report' && (
          <MyLearningGapView
            result={selectedAssessmentResult}
            studentLanguage={studentLanguage}
            onNavigate={navigateTo}
            onStartAssessment={handleStartAssessment}
            activeDomain={activeDomain}
          />
        )}

        {currentTab === 'practice' && (
          <SimplePracticeView
            questions={targetPractice}
            reassessmentQuestions={quickCheck}
            beforeScore={selectedAssessmentResult?.topLearningGap?.accuracy || 0}
            language={studentLanguage}
            domainName={getDomainConfig(activeDomain).label}
            onCompletePractice={handleCompletePractice}
            onPracticeCompleted={() => setDomainProgress(previous => {
              const resultForDomain = previous[activeDomain]?.assessmentResult || selectedAssessmentResult;
              if (!resultForDomain) return previous;
              return {
                ...previous,
                [activeDomain]: {
                  assessmentResult: resultForDomain,
                  reassessmentResult: previous[activeDomain]?.reassessmentResult || null,
                  practiceCompleted: (previous[activeDomain]?.practiceCompleted || 0) + 1
                }
              }
            })}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'improvement' || currentTab === 'progress' ? (
          <SimpleProgressView
            result={selectedAssessmentResult}
            reassessmentResult={selectedReassessmentResult}
            studentLanguage={studentLanguage}
            onStartAssessment={handleRetakeAssessment}
            activeDomain={activeDomain}
            domainProgress={TECHNICAL_DOMAINS.flatMap(domain => {
              const saved = domainProgress[domain.id];
              return saved ? [{
                id: domain.id,
                label: domain.label,
                score: saved.reassessmentResult?.afterScore ?? saved.assessmentResult.overallScore
              }] : [];
            })}
          />
        ) : null}

        {currentTab === 'teacher' && (
          <SimpleTeacherView studentLanguage={studentLanguage} />
        )}
      </main>

      {/* AI Analysis Radar Modal */}
      <AnalysisLoadingModal
        isOpen={isAnalyzing}
        onComplete={handleAnalysisComplete}
      />

    </div>
  );
}
