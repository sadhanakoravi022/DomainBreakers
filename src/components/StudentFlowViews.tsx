import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import {
  AssessmentResult,
  DomainId,
  PracticeQuestion,
  ReassessmentResult,
  StudentLanguage
} from '../types';
import { NavTab } from './Navbar';
import { getDomainConfig } from '../data/technicalDomains';

const copy: Record<StudentLanguage, Record<string, string>> = {
  en: {
    welcome: 'Hi, Student 👋',
    tagline: 'Find the gap. Practice the right concept. Improve.',
    status: 'Your Learning Status',
    mastery: 'Overall Mastery',
    gaps: 'Learning Gaps',
    practice: 'Practice Completed',
    mainGap: 'Your Main Learning Gap',
    fix: 'Fix This Gap',
    continue: 'Continue Learning',
    assess: 'Take Assessment',
    sample: 'See a sample result',
    result: 'Your Result',
    score: 'Overall Score',
    foundGap: 'We found 1 important learning gap',
    noGap: 'Take an assessment to find out what to work on next.',
    notEnough: 'Not enough evidence yet.',
    gapTitle: 'My Learning Gap',
    struggling: "What you're struggling with",
    simple: 'Simple explanation',
    evidence: 'Evidence',
    next: 'What should you do?',
    startPractice: 'Start Practice',
    fixHeader: 'Fix Your Gap',
    practiceIntro: 'These questions are selected based on your mistakes.',
    ready: 'Ready for a Quick Check?',
    reassess: 'Take Reassessment',
    progress: 'Your Progress',
    improving: "You're improving!",
    needPractice: "You're still struggling with this concept. Let's practice it once more.",
    confidence: 'Confidence',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    conceptMastery: 'Concept mastery',
    noGapPattern: 'Your answers do not show a repeated mistake pattern.',
    why: 'Why?',
    noWrongPattern: 'Your answers do not show a repeated mistake pattern.',
    question: 'Question',
    correct: 'Correct',
    incorrect: 'Not quite',
    previous: 'Previous',
    nextQuestion: 'Next',
    check: 'Check Answer',
    answerPlaceholder: 'Type your answer...',
    correctExplanation: 'Your answer matches the expected idea.',
    incorrectExplanation: 'Review the example above, then try the key step again.',
    teacher: 'Class Overview',
    students: 'Students',
    average: 'Average Mastery',
    studentsHelp: 'Students Needing Help',
    commonGaps: 'Most Common Learning Gaps',
    commonMistake: 'Common Mistake'
  },
  hi: {
    welcome: 'नमस्ते, विद्यार्थी 👋',
    tagline: 'कठिनाई पहचानें। सही अवधारणा का अभ्यास करें। बेहतर बनें।',
    status: 'आपकी सीखने की स्थिति',
    mastery: 'कुल महारत',
    gaps: 'सीखने की कठिनाइयाँ',
    practice: 'पूरा किया अभ्यास',
    mainGap: 'आपकी मुख्य सीखने की कठिनाई',
    fix: 'इस कठिनाई को सुधारें',
    continue: 'सीखना जारी रखें',
    assess: 'मूल्यांकन करें',
    sample: 'नमूना परिणाम देखें',
    result: 'आपका परिणाम',
    score: 'कुल स्कोर',
    foundGap: 'सीखने की एक महत्वपूर्ण कठिनाई मिली',
    noGap: 'अगला कदम जानने के लिए मूल्यांकन करें।',
    notEnough: 'अभी पर्याप्त प्रमाण नहीं हैं।',
    gapTitle: 'मेरी सीखने की कठिनाई',
    struggling: 'आपको किसमें कठिनाई हो रही है',
    simple: 'सरल व्याख्या',
    evidence: 'प्रमाण',
    next: 'अब क्या करें?',
    startPractice: 'अभ्यास शुरू करें',
    fixHeader: 'अपनी कठिनाई सुधारें',
    practiceIntro: 'ये प्रश्न आपकी गलतियों के आधार पर चुने गए हैं।',
    ready: 'क्या आप एक त्वरित जाँच के लिए तैयार हैं?',
    reassess: 'पुनर्मूल्यांकन करें',
    progress: 'आपकी प्रगति',
    improving: 'आप बेहतर कर रहे हैं!',
    needPractice: 'इस विषय में अभी और अभ्यास की ज़रूरत है।',
    confidence: 'विश्वास',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
    conceptMastery: 'अवधारणा पर महारत',
    noGapPattern: 'आपके उत्तरों में बार-बार होने वाली गलती नहीं दिखी।',
    why: 'क्यों?',
    noWrongPattern: 'आपके उत्तरों में बार-बार होने वाली गलती नहीं दिखी।',
    question: 'प्रश्न',
    correct: 'सही',
    incorrect: 'फिर से कोशिश करें',
    previous: 'पिछला',
    nextQuestion: 'अगला',
    check: 'उत्तर जाँचें',
    answerPlaceholder: 'अपना उत्तर लिखें...',
    correctExplanation: 'आपका उत्तर सही अवधारणा से मेल खाता है।',
    incorrectExplanation: 'ऊपर दिया उदाहरण देखें और मुख्य चरण फिर से आज़माएँ।',
    teacher: 'कक्षा का सारांश',
    students: 'विद्यार्थी',
    average: 'औसत महारत',
    studentsHelp: 'मदद की ज़रूरत वाले विद्यार्थी',
    commonGaps: 'आम सीखने की कठिनाइयाँ',
    commonMistake: 'आम गलती'
  },
  mr: {
    welcome: 'नमस्कार, विद्यार्थी 👋',
    tagline: 'अडचण ओळखा. योग्य संकल्पनेचा सराव करा. प्रगती करा.',
    status: 'तुमची शिकण्याची स्थिती',
    mastery: 'एकूण प्रभुत्व',
    gaps: 'शिकण्यातील अडचणी',
    practice: 'पूर्ण केलेला सराव',
    mainGap: 'तुमची मुख्य शिकण्याची अडचण',
    fix: 'ही अडचण सोडवा',
    continue: 'शिकणे सुरू ठेवा',
    assess: 'मूल्यांकन सुरू करा',
    sample: 'नमुना निकाल पहा',
    result: 'तुमचा निकाल',
    score: 'एकूण गुण',
    foundGap: 'शिकण्यातील एक महत्त्वाची अडचण आढळली',
    noGap: 'पुढे काय शिकायचे हे समजण्यासाठी मूल्यांकन करा.',
    notEnough: 'अजून पुरेसा पुरावा नाही.',
    gapTitle: 'माझी शिकण्यातील अडचण',
    struggling: 'तुम्हाला कशात अडचण येते',
    simple: 'सोपे स्पष्टीकरण',
    evidence: 'पुरावा',
    next: 'आता काय करावे?',
    startPractice: 'सराव सुरू करा',
    fixHeader: 'अडचण सोडवा',
    practiceIntro: 'हे प्रश्न तुमच्या चुकांनुसार निवडले आहेत.',
    ready: 'लहान चाचणीसाठी तयार आहात?',
    reassess: 'पुन्हा मूल्यांकन करा',
    progress: 'तुमची प्रगती',
    improving: 'तुमची प्रगती होत आहे!',
    needPractice: 'या संकल्पनेसाठी अजून थोडा सराव करूया.',
    confidence: 'विश्वास',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कमी',
    conceptMastery: 'संकल्पनेवरील प्रभुत्व',
    noGapPattern: 'तुमच्या उत्तरांत वारंवार होणारी चूक दिसली नाही.',
    why: 'का?',
    noWrongPattern: 'तुमच्या उत्तरांत वारंवार होणारी चूक दिसली नाही.',
    question: 'प्रश्न',
    correct: 'बरोबर',
    incorrect: 'पुन्हा प्रयत्न करा',
    previous: 'मागील',
    nextQuestion: 'पुढील',
    check: 'उत्तर तपासा',
    answerPlaceholder: 'तुमचे उत्तर लिहा...',
    correctExplanation: 'तुमचे उत्तर योग्य संकल्पनेशी जुळते.',
    incorrectExplanation: 'वरील उदाहरण पाहा आणि मुख्य पायरी पुन्हा सोडवा.',
    teacher: 'वर्गाचा आढावा',
    students: 'विद्यार्थी',
    average: 'सरासरी प्रभुत्व',
    studentsHelp: 'मदतीची गरज असलेले विद्यार्थी',
    commonGaps: 'सामान्य शिकण्याच्या अडचणी',
    commonMistake: 'सामान्य चूक'
  }
};

const getMistakeLabel = (fingerprint: string, language: StudentLanguage) => {
  const labels: Record<string, Record<StudentLanguage, string>> = {
    'Concept Problem': { en: 'Concept Problem', hi: 'अवधारणा की समस्या', mr: 'संकल्पनेची अडचण' },
    'Formula Problem': { en: 'Formula Problem', hi: 'सूत्र की समस्या', mr: 'सूत्राची अडचण' },
    'Calculation Mistake': { en: 'Calculation Mistake', hi: 'गणना की गलती', mr: 'गणनेतील चूक' },
    'Application Problem': { en: 'Application Problem', hi: 'लागू करने में समस्या', mr: 'उपयोजनातील अडचण' },
    'Partially Understood': { en: 'Partially Understood', hi: 'आंशिक समझ', mr: 'अंशतः समजले' }
  };
  return labels[fingerprint]?.[language] || labels['Partially Understood'][language];
};

const gapCopy = (concept: string, fingerprint: string, language: StudentLanguage) => {
  if (/object references|mutability/i.test(concept)) {
    if (language === 'hi') return 'कुछ उत्तरों में साझा object और उसकी copy के बीच का अंतर स्पष्ट नहीं है।';
    if (language === 'mr') return 'काही उत्तरांमध्ये shared object आणि त्याच्या copy मधील फरक स्पष्ट नाही.';
    return 'Some answers mix up a shared object and a separate copy of it.';
  }
  if (/event loop|microtask/i.test(concept)) {
    if (language === 'hi') return 'कुछ उत्तरों में यह गड़बड़ी दिखी कि queued काम किस क्रम में चलता है।';
    if (language === 'mr') return 'queued कामे कोणत्या क्रमाने चालतात याबाबत काही उत्तरांमध्ये गोंधळ दिसतो.';
    return 'Some answers mix up the order in which queued tasks run.';
  }
  if (language === 'hi' && /quadratic/i.test(concept)) {
    return fingerprint === 'Formula Problem'
      ? 'आपको पता है कि कौन-सा सूत्र इस्तेमाल करना है, लेकिन कभी-कभी मान गलत जगह रखे जाते हैं।'
      : 'इस अवधारणा को समझने के लिए कुछ और उत्तरों की ज़रूरत है।';
  }
  if (language === 'mr' && /quadratic/i.test(concept)) {
    return fingerprint === 'Formula Problem'
      ? 'कोणते सूत्र वापरायचे हे तुम्हाला माहीत आहे, पण कधी कधी मूल्ये चुकीच्या जागी ठेवली जातात.'
      : 'ही संकल्पना समजण्यासाठी आणखी उत्तरांची गरज आहे.';
  }
  if (/quadratic/i.test(concept) && fingerprint === 'Formula Problem') {
    return 'You know which formula to use, but sometimes the values are placed incorrectly.';
  }
  if (fingerprint === 'Formula Problem') return 'You understand the idea, but applying the formula is causing repeated mistakes.';
  return 'Your answers show a repeated difficulty with this concept. Practice it step by step.';
};

const nextStepCopy = (mistake: string, language: StudentLanguage) => {
  const steps: Record<string, Record<StudentLanguage, string>> = {
    'Concept Problem': {
      en: 'Review the main idea, then try a few simple examples.',
      hi: 'मुख्य विचार को दोहराएँ, फिर कुछ आसान उदाहरण हल करें।',
      mr: 'मुख्य कल्पना पुन्हा समजून घ्या आणि काही सोपी उदाहरणे सोडवा.'
    },
    'Formula Problem': {
      en: 'Practice placing values into the formula before solving.',
      hi: 'हल करने से पहले सूत्र में मान रखना अभ्यास करें।',
      mr: 'उत्तर काढण्यापूर्वी सूत्रात मूल्ये बसवण्याचा सराव करा.'
    },
    'Calculation Mistake': {
      en: 'Check each calculation one step at a time.',
      hi: 'हर गणना को एक-एक चरण में जाँचें।',
      mr: 'प्रत्येक गणना एकेक पायरीने तपासा.'
    },
    'Application Problem': {
      en: 'Work through small examples before trying a full problem.',
      hi: 'पूरा प्रश्न हल करने से पहले छोटे उदाहरणों का अभ्यास करें।',
      mr: 'पूर्ण प्रश्न सोडवण्यापूर्वी छोटी उदाहरणे सोडवा.'
    },
    'Partially Understood': {
      en: 'Review the main idea, then practice a few similar questions.',
      hi: 'मुख्य विचार दोहराएँ और फिर इसी तरह के कुछ प्रश्न हल करें।',
      mr: 'मुख्य कल्पना पुन्हा समजून घेऊन अशाच काही प्रश्नांचा सराव करा.'
    }
  };
  return steps[mistake]?.[language] || steps['Partially Understood'][language];
};

const answersMatch = (answer: string, expected: string) => {
  const normalize = (value: string) => value.trim().toLowerCase().replace(/\s*,\s*/g, ',').replace(/\s+/g, ' ');
  return normalize(answer) === normalize(expected);
};

interface StudentViewProps {
  result: AssessmentResult | null;
  reassessmentResult?: ReassessmentResult | null;
  activeDomain: DomainId;
  studentLanguage: StudentLanguage;
  onNavigate: (tab: NavTab) => void;
  onStartAssessment: () => void;
  onLoadSample?: () => void;
  practiceCompleted?: number;
}

export const StudentHomeView: React.FC<StudentViewProps> = ({
  result,
  activeDomain,
  studentLanguage,
  onNavigate,
  onStartAssessment,
  onLoadSample,
  practiceCompleted = 0
}) => {
  const t = copy[studentLanguage];
  const gap = result?.topLearningGap;
  const gapCount = result?.diagnoses.filter(item => item.isWeakConcept).length || 0;
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <div>
          <p className="text-sm font-medium text-indigo-300">{getDomainConfig(activeDomain).label} learning</p>
          <h1 className="mt-1 text-3xl font-bold text-white">{t.welcome}</h1>
          <p className="mt-2 text-slate-400">{t.tagline}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-white">{t.status}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            [t.mastery, `${result?.overallScore ?? 0}%`],
            [t.gaps, `${gapCount}`],
            [t.practice, `${practiceCompleted}`]
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-slate-900 p-6">
        <h2 className="text-sm font-semibold text-amber-300">{t.mainGap}</h2>
        {gap ? (
          <>
            <h3 className="mt-2 text-2xl font-bold text-white">{gap.concept}</h3>
            <p className="mt-2 max-w-2xl text-slate-300">{gapCopy(gap.concept, gap.mistakeFingerprint, studentLanguage)}</p>
            <button onClick={() => onNavigate('report')} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500">
              {t.fix}<ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <p className="mt-2 text-slate-300">{result ? t.notEnough : t.noGap}</p>
            <button onClick={onStartAssessment} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500">
              {t.assess}<ArrowRight className="h-4 w-4" />
            </button>
            {!result && onLoadSample && <button onClick={onLoadSample} className="mt-5 inline-flex items-center rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition-colors hover:border-slate-500">{t.sample}</button>}
          </>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">{t.continue}</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button onClick={gap ? () => onNavigate('practice') : onStartAssessment} className="flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-left text-slate-200 hover:border-indigo-400">
            <span>{gap ? `${t.startPractice}: ${gap.concept}` : t.assess}</span><ArrowRight className="h-4 w-4 shrink-0" />
          </button>
          {result && <button onClick={() => onNavigate('progress')} className="flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-left text-slate-200 hover:border-indigo-400">
            <span>{t.progress}</span><ArrowRight className="h-4 w-4 shrink-0" />
          </button>}
        </div>
      </div>
    </section>
  );
};

export const MyLearningGapView: React.FC<Pick<StudentViewProps, 'result' | 'studentLanguage' | 'onNavigate' | 'onStartAssessment' | 'activeDomain'>> = ({
  result,
  studentLanguage,
  onNavigate,
  onStartAssessment,
  activeDomain
}) => {
  const gap = result?.topLearningGap;
  const labels = {
    en: {
      performance: 'Concept Performance',
      detected: 'Learning Gap Detected',
      primary: 'Primary Weakness',
      confidence: 'Confidence',
      severity: 'Severity',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      observed: 'Observed Issues',
      recommended: 'Recommended Action',
      insufficient: 'Insufficient evidence to confidently identify a learning gap.',
      insufficientHint: 'Answer more questions in this domain to build a reliable result.',
      startPractice: 'Start Recommended Practice',
      progress: 'View My Progress',
      noIssues: 'No repeated mistakes were observed in your answers.',
      completed: 'correct'
    },
    hi: {
      performance: 'अवधारणा का प्रदर्शन',
      detected: 'सीखने की कठिनाई मिली',
      primary: 'मुख्य कमजोरी',
      confidence: 'विश्वास',
      severity: 'स्तर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      observed: 'देखी गई समस्याएँ',
      recommended: 'सुझाया गया कदम',
      insufficient: 'सीखने की कठिनाई पहचानने के लिए पर्याप्त प्रमाण नहीं हैं।',
      insufficientHint: 'विश्वसनीय परिणाम के लिए इस विषय में और प्रश्नों के उत्तर दें।',
      startPractice: 'सुझाया गया अभ्यास शुरू करें',
      progress: 'मेरी प्रगति देखें',
      noIssues: 'आपके उत्तरों में बार-बार होने वाली गलती नहीं दिखी।',
      completed: 'सही'
    },
    mr: {
      performance: 'संकल्पनेची कामगिरी',
      detected: 'शिकण्यातील अडचण आढळली',
      primary: 'मुख्य कमजोरी',
      confidence: 'विश्वास',
      severity: 'तीव्रता',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कमी',
      observed: 'आढळलेल्या समस्या',
      recommended: 'शिफारस केलेली कृती',
      insufficient: 'शिकण्यातील अडचण खात्रीने ओळखण्यासाठी पुरेसा पुरावा नाही.',
      insufficientHint: 'विश्वासार्ह निकालासाठी या विषयातील आणखी प्रश्नांची उत्तरे द्या.',
      startPractice: 'शिफारस केलेला सराव सुरू करा',
      progress: 'माझी प्रगती पहा',
      noIssues: 'तुमच्या उत्तरांमध्ये वारंवार होणारी चूक दिसली नाही.',
      completed: 'बरोबर'
    }
  }[studentLanguage];
  const domainName = getDomainConfig(activeDomain).label;
  const answerRecords = result?.questionResults || [];
  const distinctConcepts = new Set(answerRecords.map(answer => answer.concept));
  const performanceRows = answerRecords.length > 0
    ? (() => {
        const groups = new Map<string, { total: number; correct: number }>();
        for (const answer of answerRecords) {
          const label = distinctConcepts.size > 1 ? answer.concept : answer.topic;
          const current = groups.get(label) || { total: 0, correct: 0 };
          current.total += 1;
          current.correct += answer.isCorrect ? 1 : 0;
          groups.set(label, current);
        }
        return [...groups.entries()].map(([label, score]) => ({
          label,
          ...score,
          accuracy: Math.round((score.correct / score.total) * 100)
        }));
      })()
    : (result?.diagnoses || []).map(diagnosis => ({
        label: diagnosis.concept,
        total: diagnosis.totalQuestions,
        correct: diagnosis.correctAnswers,
        accuracy: diagnosis.accuracy
      })).filter(diagnosis => diagnosis.total > 0);

  const formatObservedIssue = (evidence: string, topic: string, isPartial = false) => {
    const normalized = evidence.toLowerCase();
    if (/sign|negative|minus/.test(normalized)) return 'Sign errors during calculation';
    if (/formula|substitut|coefficient/.test(normalized)) return 'Incorrect formula application';
    if (/root|factor/.test(normalized)) return 'Difficulty identifying or calculating roots';
    if (/mutable|immutable|reference|shared object/.test(normalized)) return 'Confuses shared and copied objects';
    if (/join/.test(normalized)) return 'Difficulty applying JOIN conditions';
    if (/revers|call stack order|return order/.test(normalized)) return 'Misunderstands the order of recursive results';
    if (/base case|base condition|stopping condition|termination/.test(normalized)) return 'Misidentifies the recursion stopping condition';
    if (isPartial) return `Partial understanding of ${topic}`;
    return `Difficulty with ${topic}`;
  };
  const observedIssues = gap
    ? [...new Set([
        ...answerRecords
          .filter(answer => !answer.isCorrect && answer.concept === gap.concept && answer.observedIssue)
          .map(answer => formatObservedIssue(
            answer.observedIssue!,
            distinctConcepts.size > 1 ? answer.concept : answer.topic,
            answer.result === 'partial'
          )),
        ...(answerRecords.length ? [] : gap.errorPatterns.map(pattern => formatObservedIssue(pattern, gap.topic)))
      ])].slice(0, 3)
    : [];
  const weakAnswer = answerRecords.find(answer =>
    !answer.isCorrect && gap?.concept === answer.concept
  );
  const weakTopic = weakAnswer
    ? distinctConcepts.size > 1 ? weakAnswer.concept : weakAnswer.topic
    : gap?.concept || domainName;
  const recommendedActions = gap
    ? [
        `Review the key ideas behind ${gap.concept}.`,
        `Practice ${weakTopic} with worked examples.`,
        `Complete 5 beginner ${gap.concept} questions.`,
        'Attempt an adaptive assessment.'
      ]
    : [
        `Review the concepts with the lowest scores in ${domainName}.`,
        'Complete a few beginner questions in this domain.',
        'Retake the assessment to collect more evidence.'
      ];
  const confidenceLabel = gap
    ? gap.confidence >= 75 ? labels.high : gap.confidence >= 50 ? labels.medium : labels.low
    : labels.low;

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
      <header className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
        <h1 className="mt-2 text-2xl font-bold uppercase tracking-wide text-white">{domainName} Assessment</h1>
        {result && <p className="mt-2 text-sm text-slate-400">{result.correctCount} / {result.totalQuestions} questions correct</p>}
      </header>
      {!result ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-300">{copy[studentLanguage].noGap}</p>
          <button onClick={onStartAssessment} className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">{copy[studentLanguage].assess}</button>
        </div>
      ) : (
        <>
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white">{labels.performance}</h2>
            {performanceRows.length ? (
              <ul className="mt-5 divide-y divide-slate-800">
                {performanceRows.map(row => (
                  <li key={row.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="truncate text-slate-200">{row.label}</span>
                        <span className="shrink-0 font-semibold text-white">{row.accuracy}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${row.accuracy}%` }} />
                      </div>
                    </div>
                    <span className="w-20 shrink-0 text-right text-xs text-slate-500">{row.correct}/{row.total} {labels.completed}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="mt-3 text-sm text-slate-400">{labels.insufficientHint}</p>}
          </section>

          <section className="space-y-6 rounded-2xl border border-amber-500/30 bg-slate-900 p-6 sm:p-8">
            <div className="border-b border-slate-800 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">{labels.detected}</p>
              {gap ? (
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{labels.primary}</p>
                    <h2 className="mt-1 text-2xl font-bold text-white">{gap.concept}</h2>
                    <p className="mt-1 text-sm text-slate-300">{gapCopy(gap.concept, gap.mistakeFingerprint, studentLanguage)}</p>
                  </div>
                  <div className="flex gap-5 text-sm">
                    <div><p className="text-slate-500">{labels.confidence}</p><p className="mt-1 font-semibold text-white">{confidenceLabel}</p></div>
                    <div><p className="text-slate-500">{labels.severity}</p><p className="mt-1 font-semibold text-white">{gap.severity[0] + gap.severity.slice(1).toLowerCase()}</p></div>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-300">{labels.insufficient}</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-white">{labels.observed}</h3>
              {observedIssues.length ? (
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {observedIssues.map(issue => <li key={issue} className="flex gap-2"><span className="text-amber-300">•</span><span>{issue}</span></li>)}
                </ul>
              ) : <p className="mt-2 text-sm text-slate-400">{labels.noIssues}</p>}
            </div>

            <div>
              <h3 className="font-semibold text-white">{labels.recommended}</h3>
              <ol className="mt-3 space-y-2 text-sm text-slate-300">
                {recommendedActions.map((action, index) => <li key={action} className="flex gap-3"><span className="font-semibold text-indigo-300">{index + 1}.</span><span>{action}</span></li>)}
              </ol>
            </div>
          </section>

          <div className="flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row">
            <button
              onClick={() => onNavigate('practice')}
              disabled={!gap}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {labels.startPractice}<ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('progress')}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:border-slate-500"
            >
              {labels.progress}<ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

interface PracticeViewProps {
  questions: PracticeQuestion[];
  reassessmentQuestions: PracticeQuestion[];
  beforeScore: number;
  language: StudentLanguage;
  domainName: string;
  onCompletePractice: (result: ReassessmentResult) => void;
  onPracticeCompleted: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const SimplePracticeView: React.FC<PracticeViewProps> = ({
  questions,
  reassessmentQuestions,
  beforeScore,
  language,
  domainName,
  onCompletePractice,
  onPracticeCompleted,
  onNavigate
}) => {
  const t = copy[language];
  const [phase, setPhase] = useState<'practice' | 'ready' | 'reassessment' | 'done'>('practice');
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(0);
  const [reassessmentCorrect, setReassessmentCorrect] = useState(0);
  const [countedPractice, setCountedPractice] = useState(false);
  const activeQuestions = phase === 'reassessment' ? reassessmentQuestions : questions;
  const current = activeQuestions[index];
  const correct = current ? answersMatch(answer, current.correctAnswer) : false;

  const next = () => {
    if (phase === 'practice') {
      if (correct) setPracticeCorrect(count => count + 1);
      if (index < activeQuestions.length - 1) {
        setIndex(value => value + 1);
        setAnswer('');
        setChecked(false);
        return;
      }
      if (!countedPractice) {
        onPracticeCompleted();
        setCountedPractice(true);
      }
      setPhase('ready');
      return;
    }

    const finalCorrect = reassessmentCorrect + (correct ? 1 : 0);
    if (index < activeQuestions.length - 1) {
      if (correct) setReassessmentCorrect(count => count + 1);
      setIndex(value => value + 1);
      setAnswer('');
      setChecked(false);
      return;
    }
    if (correct) setReassessmentCorrect(count => count + 1);
    const afterScore = activeQuestions.length ? Math.round((finalCorrect / activeQuestions.length) * 100) : beforeScore;
    onCompletePractice({
      beforeScore,
      afterScore,
      improvementPercentage: afterScore - beforeScore,
      concept: current?.concept || 'Learning concept',
      questionsMastered: finalCorrect,
      totalPracticeQuestions: activeQuestions.length,
      remainingGaps: finalCorrect < activeQuestions.length ? [current?.concept || 'Learning concept'] : [],
      status: afterScore >= 75 ? 'Mastered' : afterScore > beforeScore ? 'Significant Improvement' : 'Needs Further Review'
    });
    setPhase('done');
  };

  if (!current && phase !== 'ready' && phase !== 'done') {
    return <section className="mx-auto w-full max-w-5xl px-4 py-8"><p className="text-slate-300">{t.noGap}</p><button onClick={() => onNavigate('report')} className="mt-4 rounded-xl bg-indigo-600 px-5 py-3 text-white">{t.gapTitle}</button></section>;
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-5 px-4 py-8">
      <h1 className="text-3xl font-bold text-white">{domainName} · {t.fixHeader}</h1>
      <p className="text-slate-400">{t.practiceIntro}</p>
      {phase === 'ready' ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">{t.ready}</h2>
          <p className="mt-2 text-slate-300">{practiceCorrect} / {questions.length} practice questions correct.</p>
          <button onClick={() => { setIndex(0); setAnswer(''); setChecked(false); setReassessmentCorrect(0); setPhase('reassessment'); }} className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">{t.reassess}<ArrowRight className="ml-2 inline h-4 w-4" /></button>
        </div>
      ) : phase === 'done' ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">{t.progress}</h2>
          <p className="mt-2 text-slate-300">{reassessmentCorrect} / {reassessmentQuestions.length} quick-check answers were correct.</p>
          <button onClick={() => onNavigate('progress')} className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">{t.progress}<ArrowRight className="ml-2 inline h-4 w-4" /></button>
        </div>
      ) : current ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <p className="text-sm font-medium text-indigo-300">{phase === 'practice' ? 'Practice' : t.reassess} · {t.question} {index + 1} / {activeQuestions.length}</p>
          <h2 className="mt-4 text-xl font-semibold leading-relaxed text-white">{current.question}</h2>
          {current.codeSnippet && <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-emerald-200"><code>{current.codeSnippet}</code></pre>}
          <div className="mt-5 space-y-3">
            {current.options?.length ? current.options.map(option => (
              <button key={option} disabled={checked} onClick={() => setAnswer(option)} className={`w-full rounded-xl border p-4 text-left text-slate-200 ${answer === option ? 'border-indigo-400 bg-indigo-950/50' : 'border-slate-700 bg-slate-950'}`}>{option}</button>
            )) : <input value={answer} onChange={event => setAnswer(event.target.value)} disabled={checked} placeholder={t.answerPlaceholder} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white" />}
          </div>
          {checked && <div className={`mt-5 rounded-xl p-4 ${correct ? 'bg-emerald-950/50 text-emerald-200' : 'bg-amber-950/40 text-amber-100'}`}>
            <p className="flex items-center gap-2 font-semibold">{correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}{correct ? t.correct : t.incorrect}</p>
            <p className="mt-1 text-sm">{language === 'en' ? current.explanation : correct ? t.correctExplanation : t.incorrectExplanation}</p>
          </div>}
          <div className="mt-6 flex justify-end">
            {!checked ? <button disabled={!answer.trim()} onClick={() => setChecked(true)} className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white disabled:opacity-40">{t.check}</button> : <button onClick={next} className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">{index + 1 < activeQuestions.length ? t.nextQuestion : phase === 'practice' ? t.ready : t.progress}<ArrowRight className="ml-2 inline h-4 w-4" /></button>}
          </div>
        </div>
      ) : null}
    </section>
  );
};

interface DomainScore {
  id: DomainId;
  label: string;
  score: number;
}

export const SimpleProgressView: React.FC<Pick<StudentViewProps, 'result' | 'reassessmentResult' | 'studentLanguage' | 'onStartAssessment'> & {
  domainProgress: DomainScore[];
  activeDomain: DomainId;
}> = ({
  result,
  reassessmentResult,
  studentLanguage,
  onStartAssessment,
  domainProgress,
  activeDomain
}) => {
  const t = copy[studentLanguage];
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
      <h1 className="text-3xl font-bold text-white">{t.progress}</h1>
      {!result ? <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><p className="text-slate-300">{t.noGap}</p><button onClick={onStartAssessment} className="mt-4 rounded-xl bg-indigo-600 px-5 py-3 text-white">{t.assess}</button></div> : <>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">{t.mastery}</p><p className="mt-1 text-4xl font-bold text-white">{result.overallScore}%</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">{t.conceptMastery} · {getDomainConfig(activeDomain).label}</h2>
          <div className="space-y-4">{result.diagnoses.filter(item => item.totalQuestions > 0).map(item => <div key={item.concept}>
            <div className="mb-1 flex justify-between gap-3 text-sm"><span className="text-slate-200">{item.concept}</span><span className="text-slate-400">{item.accuracy}%</span></div>
            <div className="h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-indigo-500" style={{ width: `${item.accuracy}%` }} /></div>
          </div>)}</div>
        </div>
        {domainProgress.length > 0 && <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Progress by domain</h2>
          <div className="space-y-4">{domainProgress.map(domain => <div key={domain.id}>
            <div className="mb-1 flex justify-between gap-3 text-sm"><span className="text-slate-200">{domain.label}</span><span className="text-slate-400">{domain.score}%</span></div>
            <div className="h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${domain.score}%` }} /></div>
          </div>)}</div>
        </div>}
        {reassessmentResult && <div className={`rounded-2xl border p-6 ${reassessmentResult.afterScore > reassessmentResult.beforeScore ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-amber-500/30 bg-amber-950/20'}`}>
          <h2 className="text-xl font-semibold text-white">{reassessmentResult.afterScore > reassessmentResult.beforeScore ? `🎉 ${t.improving}` : t.needPractice}</h2>
          <p className="mt-2 text-slate-200">{reassessmentResult.concept}: {reassessmentResult.beforeScore}% → {reassessmentResult.afterScore}%</p>
        </div>}
      </>}
    </section>
  );
};

export const SimpleTeacherView: React.FC<Pick<StudentViewProps, 'studentLanguage'>> = ({ studentLanguage }) => {
  const t = copy[studentLanguage];
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
      <h1 className="text-3xl font-bold text-white">{t.teacher}</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        {[[t.students, '40'], [t.average, '68%'], [t.studentsHelp, '8']].map(([label, value]) => <div key={label} className="rounded-xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-bold text-white">{value}</p></div>)}
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="font-semibold text-white">{t.commonGaps}</h2>
        <ol className="mt-4 space-y-3 text-slate-200"><li>1. Quadratic Formula — 12 students</li><li>2. Functions — 8 students</li><li>3. Algebra — 6 students</li></ol>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="font-semibold text-white">{t.commonMistake}</h2><p className="mt-2 text-slate-300">Students understand the formula but struggle to apply it.</p></div>
    </section>
  );
};
