import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  HelpCircle, 
  Sparkles, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { STUDY_HABIT_SENTENCES } from '../data/firstConditionalData';
import { sound, speakEnglish } from '../utils/audio';
import { SparkyAvatar } from './SparkyAvatar';

export const OrderInverterLab: React.FC = () => {
  const [selectedSentenceId, setSelectedSentenceId] = useState<number>(1);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  // Mini quiz state for the comma rule
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizAnswerFeedback, setQuizAnswerFeedback] = useState<{
    status: 'correct' | 'wrong' | null;
    message: string;
  }>({ status: null, message: '' });

  const activeSentence = STUDY_HABIT_SENTENCES.find((s) => s.id === selectedSentenceId)!;

  // Mini comma quiz prompts
  const commaQuizQuestions = [
    {
      clauseA: "If you practice English speaking with a partner",
      clauseB: "you will build natural confidence",
      ifAtStart: true,
      needsComma: true,
      correctSentence: "If you practice English speaking with a partner, you will build natural confidence.",
      explanation: "Since the sentence begins with the conditional 'If-clause', a comma is REQUIRED before the main clause."
    },
    {
      clauseA: "You will achieve great fluency",
      clauseB: "if you dedicate thirty minutes every day",
      ifAtStart: false,
      needsComma: false,
      correctSentence: "You will achieve great fluency if you dedicate thirty minutes every day.",
      explanation: "Since the main clause comes first and 'if' is in the middle, DO NOT use a comma."
    },
    {
      clauseA: "If you don't review your grammar notes",
      clauseB: "you won't remember the exceptions",
      ifAtStart: true,
      needsComma: true,
      correctSentence: "If you don't review your grammar notes, you won't remember the exceptions.",
      explanation: "The If-clause begins the sentence, so you MUST separate it with a comma."
    },
    {
      clauseA: "You can ask the teacher for help",
      clauseB: "if you do not understand a pronunciation rule",
      ifAtStart: false,
      needsComma: false,
      correctSentence: "You can ask the teacher for help if you do not understand a pronunciation rule.",
      explanation: "When 'if' acts as the connective conjunction in the middle, no comma is needed."
    }
  ];

  const currentQuiz = commaQuizQuestions[quizIndex];

  const handleQuizAnswer = (userSaidNeedsComma: boolean) => {
    if (userSaidNeedsComma === currentQuiz.needsComma) {
      sound.playSuccess();
      setQuizAnswerFeedback({
        status: 'correct',
        message: `Spot on! ${currentQuiz.explanation}`
      });
    } else {
      sound.playError();
      setQuizAnswerFeedback({
        status: 'wrong',
        message: `Not quite! ${currentQuiz.explanation}`
      });
    }
  };

  const nextQuizQuestion = () => {
    setQuizIndex((prev) => (prev + 1) % commaQuizQuestions.length);
    setQuizAnswerFeedback({ status: null, message: '' });
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs" style={{ backgroundColor: '#8ee3ef' }}>
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-100 text-violet-800">
            <ArrowLeftRight className="w-3.5 h-3.5 text-violet-600" />
            <span>Interactive Punctuation Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight italic animate-h2-motion" style={{ color: '#760963', fontStyle: 'italic' }}>
            Clause Order & The Comma Rule
          </h2>
          <p className="leading-relaxed" style={{ fontSize: '15px', color: '#2e025b' }}>
            In English, you can switch the position of the clauses freely without changing the underlying meaning. However, <strong>the punctuation rule changes strictly</strong> depending on which clause begins the sentence!
          </p>
        </div>
      </div>

      {/* Sparky Mascot Guide Card */}
      <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-2 border-orange-300 text-slate-800 shadow-sm">
        <SparkyAvatar size="sm" mood="thinking" className="shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-orange-800 bg-orange-200/70 px-2.5 py-0.5 rounded-full border border-orange-300">
              Sparky's Tip 🦊
            </span>
            <span className="text-xs font-bold text-slate-500">The Comma Rule</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            Pay close attention to this golden rule! <strong>If you begin the sentence with &quot;If...&quot;, you MUST always put a comma (,)</strong> before the second clause. But if you place the result clause first (e.g., <em>&quot;You will pass if you study&quot;</em>), <strong>the comma disappears completely!</strong> Click the <em>&quot;Invert Clause Order&quot;</em> button below to see it live.
          </p>
        </div>
      </div>

      {/* Main Interactive Inverter Station */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Sentence Picker */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Select one of the 10 English Study Habit Sentences:
          </label>
          <select
            value={selectedSentenceId}
            onChange={(e) => {
              setSelectedSentenceId(Number(e.target.value));
              setIsReversed(false);
            }}
            className="w-full sm:max-w-xl p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {STUDY_HABIT_SENTENCES.map((s) => (
              <option key={s.id} value={s.id}>
                Habit #{s.id}: {s.habitTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Live Transformation Canvas in Light Theme */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-pink-50/70 text-slate-900 rounded-3xl p-6 sm:p-10 border-2 border-purple-200 shadow-lg space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-200/80 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-700 font-bold">Current Order:</span>
              <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mt-1">
                {isReversed ? (
                  <>
                    <span className="text-sky-700">Main Clause (Result)</span>
                    <span className="text-slate-400">+</span>
                    <span className="text-emerald-700">If-Clause (Condition)</span>
                  </>
                ) : (
                  <>
                    <span className="text-emerald-700">If-Clause (Condition)</span>
                    <span className="text-violet-700 font-black">, [Comma]</span>
                    <span className="text-slate-400">+</span>
                    <span className="text-sky-700">Main Clause (Result)</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                sound.playSelect();
                setIsReversed(!isReversed);
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-fuchsia-500/25 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Invert Clause Order</span>
            </button>
          </div>

          {/* Visual Sentence Block with Light Pastel Cards */}
          <div className="p-6 sm:p-8 bg-white/90 rounded-2xl border-2 border-purple-100 flex flex-wrap items-center justify-center gap-3 text-center shadow-xs">
            {!isReversed ? (
              // Standard Order: If-Clause, Main Clause
              <>
                <span className="px-4 py-3 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 font-bold text-base sm:text-lg shadow-sm">
                  {activeSentence.conditionClause}
                </span>

                <span className="px-3.5 py-2 rounded-xl bg-violet-600 text-white font-black text-xl shadow-md ring-2 ring-violet-300 animate-pulse">
                  ,
                </span>

                <span className="px-4 py-3 rounded-xl bg-sky-50 border-2 border-sky-400 text-sky-950 font-bold text-base sm:text-lg shadow-sm">
                  {activeSentence.resultClause.endsWith('?') ? activeSentence.resultClause : `${activeSentence.resultClause}.`}
                </span>
              </>
            ) : (
              // Inverted Order: Main Clause + If-Clause (No Comma)
              <>
                <span className="px-4 py-3 rounded-xl bg-sky-50 border-2 border-sky-400 text-sky-950 font-bold text-base sm:text-lg shadow-sm capitalize">
                  {activeSentence.resultClause.charAt(0).toUpperCase() + activeSentence.resultClause.slice(1).replace(/\?$/, '')}
                </span>

                <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-mono font-bold line-through decoration-rose-500 decoration-2">
                  No Comma!
                </span>

                <span className="px-4 py-3 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 font-bold text-base sm:text-lg shadow-sm">
                  {activeSentence.conditionClause.toLowerCase()}{activeSentence.resultClause.endsWith('?') ? '?' : '.'}
                </span>
              </>
            )}
          </div>

          {/* Read Aloud & Explanation Bar with Large Audio Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-700 flex items-start gap-2 max-w-xl font-medium">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                {!isReversed ? (
                  <strong>Notice the comma:</strong>
                ) : (
                  <strong>Notice the absence of the comma:</strong>
                )}{' '}
                {!isReversed 
                  ? 'Because "If" is at the start of the sentence, English requires a comma between the condition and result clauses.'
                  : 'Because the main clause comes first and "if" links the two clauses in the middle, a comma is NOT used!'}
              </span>
            </div>

            <button
              onClick={() => speakEnglish(!isReversed ? activeSentence.fullSentence : activeSentence.invertedSentence)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-teal-500/25 active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Volume2 className="w-5 h-5 text-amber-200" />
              <span>Listen Sentence</span>
            </button>
          </div>

        </div>

      </div>

      {/* Mini Interactive Comma Rule Quiz */}
      <div className="bg-gradient-to-br from-indigo-50/60 to-violet-50/60 rounded-3xl p-6 sm:p-8 border border-indigo-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Interactive Comma Check Quiz (Question {quizIndex + 1}/{commaQuizQuestions.length})
            </h3>
          </div>
          <button
            onClick={nextQuizQuestion}
            className="p-2 px-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Next Question</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="text-xs font-semibold uppercase text-slate-400">Does this sentence need a comma?</div>
          
          <div className="text-base sm:text-lg font-semibold text-slate-800 p-4 bg-slate-50 rounded-xl border border-slate-200/80 font-mono">
            <span>"{currentQuiz.clauseA}"</span>
            <span className="text-amber-600 font-bold mx-2">[ ? ]</span>
            <span>"{currentQuiz.clauseB}."</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleQuizAnswer(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25 active:scale-95 cursor-pointer"
            >
              Yes, it needs a comma ( , )
            </button>

            <button
              onClick={() => handleQuizAnswer(false)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 active:scale-95 cursor-pointer"
            >
              No comma needed
            </button>
          </div>

          {quizAnswerFeedback.status && (
            <div className={`p-4 rounded-xl text-xs font-semibold flex items-start gap-2.5 ${
              quizAnswerFeedback.status === 'correct'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}>
              {quizAnswerFeedback.status === 'correct' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div>{quizAnswerFeedback.message}</div>
                <div className="mt-1 font-mono text-slate-700 font-normal">
                  Full correct sentence: "{currentQuiz.correctSentence}"
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
