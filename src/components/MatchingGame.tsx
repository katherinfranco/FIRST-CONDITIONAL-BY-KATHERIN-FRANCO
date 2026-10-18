import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Flame, 
  Lightbulb, 
  Volume2, 
  ArrowRight, 
  Layers, 
  Shuffle, 
  HelpCircle,
  Award,
  Lock
} from 'lucide-react';
import { STUDY_HABIT_SENTENCES } from '../data/firstConditionalData';
import { SentenceHabit, GameCard, MatchedPairRecord, IncorrectAttemptRecord } from '../types';
import { sound, speakEnglish } from '../utils/audio';
import { SparkyAvatar } from './SparkyAvatar';
import { MatchingResultsModal } from './MatchingResultsModal';
import habitMatchingImg from '../assets/images/habit_matching_game_1791616993577.jpg';

export const MatchingGame: React.FC = () => {
  const [conditions, setConditions] = useState<GameCard[]>([]);
  const [results, setResults] = useState<GameCard[]>([]);
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [matchesCount, setMatchesCount] = useState<number>(0);

  // Student attempts & records for results review
  const [correctMatches, setCorrectMatches] = useState<MatchedPairRecord[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState<IncorrectAttemptRecord[]>([]);

  // Results & Teacher modal
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>(false);
  const [resultsModalTab, setResultsModalTab] = useState<'student' | 'teacher'>('student');

  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'hint' | null;
    sentence?: SentenceHabit;
    message: string;
  }>({
    type: null,
    message: ''
  });

  // Mismatch error animation tracker
  const [shakingConditionId, setShakingConditionId] = useState<string | null>(null);
  const [shakingResultId, setShakingResultId] = useState<string | null>(null);

  // Initialize and shuffle cards
  const initGame = useCallback(() => {
    // Left column: Conditions (First Part) - with comma
    const condCards: GameCard[] = STUDY_HABIT_SENTENCES.map((s): GameCard => {
      const trimmed = s.conditionClause.trim();
      const textWithComma = trimmed.endsWith(',') ? trimmed : `${trimmed},`;
      return {
        id: `cond-${s.id}`,
        sentenceId: s.id,
        type: 'condition' as const,
        text: textWithComma,
        isMatched: false,
        isSelected: false,
      };
    }).sort(() => Math.random() - 0.5);

    // Right column: Results (Second Part) - with period where appropriate (preserves '?' for questions)
    const resCards: GameCard[] = STUDY_HABIT_SENTENCES.map((s): GameCard => {
      const trimmed = s.resultClause.trim();
      const textWithPeriod = trimmed.endsWith('?')
        ? trimmed
        : trimmed.endsWith('.')
        ? trimmed
        : `${trimmed}.`;
      return {
        id: `res-${s.id}`,
        sentenceId: s.id,
        type: 'result' as const,
        text: textWithPeriod,
        isMatched: false,
        isSelected: false,
      };
    }).sort(() => Math.random() - 0.5);

    setConditions(condCards);
    setResults(resCards);
    setSelectedConditionId(null);
    setSelectedResultId(null);
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setMistakes(0);
    setMatchesCount(0);
    setSeconds(0);
    setIsTimerRunning(true);
    setIsGameOver(false);
    setCorrectMatches([]);
    setIncorrectAttempts([]);
    setIsResultsModalOpen(false);
    setResultsModalTab('student');
    setFeedback({
      type: null,
      message: 'Select an If-Clause on the left, then select its matching Result on the right!'
    });
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Game timer
  useEffect(() => {
    let interval: number;
    if (isTimerRunning && !isGameOver) {
      interval = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isGameOver]);

  // Format time mm:ss
  const formattedTime = useMemo(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [seconds]);

  // Check game completion
  useEffect(() => {
    if (matchesCount === 10 && !isGameOver) {
      setIsGameOver(true);
      setIsTimerRunning(false);
      sound.playWin();

      // Confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      } catch {
        // Fallback
      }

      // Automatically show results modal for the student with review of correct & incorrect pairs
      setTimeout(() => {
        setResultsModalTab('student');
        setIsResultsModalOpen(true);
      }, 700);
    }
  }, [matchesCount, isGameOver]);

  // Handle card selection & matching logic
  const handleSelectCondition = (card: GameCard) => {
    if (card.isMatched || isGameOver) return;
    sound.playSelect();
    setSelectedConditionId(card.id);

    // If a result is already selected, verify match immediately
    if (selectedResultId) {
      const resultCard = results.find((r) => r.id === selectedResultId);
      if (resultCard) {
        verifyMatch(card, resultCard);
      }
    }
  };

  const handleSelectResult = (card: GameCard) => {
    if (card.isMatched || isGameOver) return;
    sound.playSelect();
    setSelectedResultId(card.id);

    // If a condition is already selected, verify match immediately
    if (selectedConditionId) {
      const condCard = conditions.find((c) => c.id === selectedConditionId);
      if (condCard) {
        verifyMatch(condCard, card);
      }
    }
  };

  const verifyMatch = (condCard: GameCard, resCard: GameCard) => {
    const sentenceData = STUDY_HABIT_SENTENCES.find((s) => s.id === condCard.sentenceId)!;

    if (condCard.sentenceId === resCard.sentenceId) {
      // MATCH SUCCESS
      sound.playSuccess();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);

      const earnedPoints = 100 + (newStreak * 25);
      setScore((prev) => prev + earnedPoints);
      setMatchesCount((prev) => prev + 1);

      // Record student's correctly matched pair
      const matchedRecord: MatchedPairRecord = {
        sentenceId: sentenceData.id,
        conditionText: condCard.text,
        resultText: resCard.text,
        fullSentence: sentenceData.fullSentence,
        habitTitle: sentenceData.habitTitle,
        explanation: sentenceData.explanation,
        conditionVerb: sentenceData.conditionVerb,
        resultVerb: sentenceData.resultVerb,
      };
      setCorrectMatches((prev) => [...prev, matchedRecord]);

      // Mark cards as matched
      setConditions((prev) =>
        prev.map((c) => (c.id === condCard.id ? { ...c, isMatched: true } : c))
      );
      setResults((prev) =>
        prev.map((r) => (r.id === resCard.id ? { ...r, isMatched: true } : r))
      );

      setSelectedConditionId(null);
      setSelectedResultId(null);

      setFeedback({
        type: 'success',
        sentence: sentenceData,
        message: `+${earnedPoints} pts! Correct match: ${sentenceData.habitTitle}`
      });
    } else {
      // MATCH FAILED
      sound.playError();
      setStreak(0);
      setMistakes((m) => m + 1);
      setScore((s) => Math.max(0, s - 15));

      // Record student's mistaken pair and its correct combination
      const actualSentenceForResult = STUDY_HABIT_SENTENCES.find((s) => s.id === resCard.sentenceId)!;
      const trimmedTargetResult = sentenceData.resultClause.trim();
      const formattedTargetResult = trimmedTargetResult.endsWith('?')
        ? trimmedTargetResult
        : trimmedTargetResult.endsWith('.')
        ? trimmedTargetResult
        : `${trimmedTargetResult}.`;

      const mistakeRecord: IncorrectAttemptRecord = {
        id: `mistake-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        conditionText: condCard.text,
        chosenResultText: resCard.text,
        targetSentenceId: sentenceData.id,
        targetHabitTitle: sentenceData.habitTitle,
        correctResultText: formattedTargetResult,
        correctFullSentence: sentenceData.fullSentence,
        actualSentenceForResultId: actualSentenceForResult.id,
        actualConditionForResultText: actualSentenceForResult.conditionClause,
        actualFullSentenceForResult: actualSentenceForResult.fullSentence,
        timestamp: Date.now(),
      };
      setIncorrectAttempts((prev) => [...prev, mistakeRecord]);

      // Trigger shake animation
      setShakingConditionId(condCard.id);
      setShakingResultId(resCard.id);
      setTimeout(() => {
        setShakingConditionId(null);
        setShakingResultId(null);
      }, 500);

      setSelectedConditionId(null);
      setSelectedResultId(null);

      setFeedback({
        type: 'error',
        message: 'These two clauses do not match! Review the condition and think about its direct outcome.'
      });
    }
  };

  // Provide a smart hint
  const handleGiveHint = () => {
    if (isGameOver) return;
    const unmatchedConditions = conditions.filter((c) => !c.isMatched);
    if (unmatchedConditions.length === 0) return;

    const targetCond = unmatchedConditions[0];
    const targetSentence = STUDY_HABIT_SENTENCES.find((s) => s.id === targetCond.sentenceId)!;

    setSelectedConditionId(targetCond.id);
    setSelectedResultId(null);
    setScore((s) => Math.max(0, s - 10)); // small hint penalty

    setFeedback({
      type: 'hint',
      sentence: targetSentence,
      message: `Hint for habit "${targetSentence.habitTitle}": Look for a consequence about ${targetSentence.explanation.slice(0, 45)}...`
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Game Dashboard Header */}
      <div className="rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs" style={{ backgroundColor: '#ffb3b3' }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative shrink-0 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/95 shadow-md ring-2 ring-emerald-600/40 bg-white">
                <img 
                  src={habitMatchingImg} 
                  alt="Study habits illustration: Daily schedule, vocabulary practice and English journaling" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs border border-white tracking-wider">
                HABITS
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1" style={{ fontSize: '20px' }}>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                  10 Habit Pairs Challenge
                </span>
                <span className="text-slate-500" style={{ fontSize: '18px', fontWeight: 'bold' }}>First Conditional Practice</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight italic animate-h2-motion" style={{ fontStyle: 'italic', fontSize: '38px', color: '#136500' }}>
                Habits Matching Game
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl" style={{ fontSize: '17px' }}>
                Match each <strong className="text-emerald-700">If-clause (Condition)</strong> with its logical <strong className="text-indigo-700">Main clause (Consequence)</strong>.
              </p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Score */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white shadow-xs">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Score</div>
                <div className="text-base font-black font-mono leading-none">{score}</div>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
              <Flame className="w-4 h-4 text-amber-100 animate-pulse" />
              <div>
                <div className="text-[10px] text-amber-100 uppercase tracking-wider font-semibold">Streak</div>
                <div className="text-base font-black font-mono leading-none">{streak}x</div>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-[10px] text-emerald-700 uppercase tracking-wider font-semibold">Matched</div>
                <div className="text-base font-black font-mono leading-none">{matchesCount}/10</div>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 shadow-xs">
              <Timer className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-[10px] text-purple-700 uppercase tracking-wider font-semibold">Time</div>
                <div className="text-base font-black font-mono leading-none">{formattedTime}</div>
              </div>
            </div>

            {/* Action Buttons in Bright Colors */}
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <button
                onClick={() => {
                  setResultsModalTab('teacher');
                  setIsResultsModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-400/25 active:scale-95 cursor-pointer flex items-center gap-1.5"
                title="Acceso exclusivo para el docente: Ver clave de respuestas"
              >
                <Lock className="w-3.5 h-3.5 text-slate-950" />
                <span>Clave Docente</span>
              </button>

              <button
                onClick={handleGiveHint}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
                title="Get a hint (-10 points)"
              >
                <Lightbulb className="w-4 h-4 text-amber-100" />
                <span className="hidden sm:inline">Hint</span>
              </button>

              <button
                onClick={initGame}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-sky-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
                title="Reset game"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

          </div>

        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mt-5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(matchesCount / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Sparky Cheer & Challenge Card */}
      <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-300 text-slate-800 shadow-sm">
        <SparkyAvatar size="sm" mood="excited" className="shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Sparky's Challenge 🦊
            </span>
            <span className="text-xs font-bold text-slate-600">Connect All 10 Pairs!</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            You've got this! Click an <strong>&quot;If-Clause&quot;</strong> condition on the left column, then find its logical <strong>&quot;will&quot;</strong> result on the right column. Don't worry if you miss a match—mistakes help you learn! Click the <em>Hint</em> button if you need a clue.
          </p>
        </div>
      </div>

      {/* Real-time Dynamic Feedback Banner */}
      {feedback.message && (
        <div className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : feedback.type === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : feedback.type === 'hint'
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}>
          <div className="flex items-start sm:items-center gap-3">
            {feedback.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />}
            {feedback.type === 'error' && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 sm:mt-0" />}
            {feedback.type === 'hint' && <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />}
            {!feedback.type && <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5 sm:mt-0" />}

            <div>
              <div className="text-xs sm:text-sm font-bold">{feedback.message}</div>
              {feedback.sentence && (
                <div className="text-xs mt-1 text-slate-700 italic">
                  "{feedback.sentence.fullSentence}"
                </div>
              )}
            </div>
          </div>

          {feedback.sentence && (
            <button
              onClick={() => speakEnglish(feedback.sentence!.fullSentence)}
              className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Volume2 className="w-5 h-5 text-amber-200" />
              <span>Listen Aloud</span>
            </button>
          )}
        </div>
      )}

      {/* Two-Column Matching Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN: CONDITIONS (If-Clauses) */}
        <div className="rounded-3xl p-4 sm:p-6 border border-slate-200/80 space-y-3" style={{ backgroundColor: '#b9e0f4' }}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                If-Clauses (Conditions)
              </h3>
            </div>
            <span className="text-xs text-emerald-800 font-semibold bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Present Simple
            </span>
          </div>

          <p className="text-slate-500 pb-2" style={{ fontSize: '15px', fontWeight: 'bold' }}>
            Click an If-Clause to select it:
          </p>

          <div className="space-y-2.5">
            {conditions.map((card) => {
              const isSelected = selectedConditionId === card.id;
              const isShaking = shakingConditionId === card.id;

              return (
                <button
                  key={card.id}
                  disabled={card.isMatched}
                  onClick={() => handleSelectCondition(card)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    card.isMatched
                      ? 'bg-emerald-50/50 border-emerald-300/60 text-slate-400 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400/30 text-emerald-950 scale-[1.01]'
                      : isShaking
                      ? 'bg-rose-50 border-rose-400 text-rose-950 animate-bounce'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-emerald-300 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-emerald-700">
                        {card.isMatched ? '✓ Matched Condition' : 'Condition Clause'}
                      </div>
                      <div className="text-sm sm:text-base font-semibold leading-snug">
                        {card.text}
                      </div>
                    </div>

                    <div className="shrink-0 mt-0.5">
                      {card.isMatched ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS (Main Clauses) */}
        <div className="rounded-3xl p-4 sm:p-6 border border-slate-200/80 space-y-3" style={{ backgroundColor: '#bbe4ff' }}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Main Clauses (Results)
              </h3>
            </div>
            <span className="text-xs text-indigo-800 font-semibold bg-indigo-100 px-2.5 py-0.5 rounded-full">
              will + Base Verb
            </span>
          </div>

          <p className="text-slate-500 pb-2" style={{ fontSize: '15px', fontWeight: 'bold' }}>
            Click the matching consequence for the selected condition:
          </p>

          <div className="space-y-2.5">
            {results.map((card) => {
              const isSelected = selectedResultId === card.id;
              const isShaking = shakingResultId === card.id;

              return (
                <button
                  key={card.id}
                  disabled={card.isMatched}
                  onClick={() => handleSelectResult(card)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    card.isMatched
                      ? 'bg-indigo-50/50 border-indigo-300/60 text-slate-400 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-indigo-50 border-indigo-500 shadow-md ring-2 ring-indigo-400/30 text-indigo-950 scale-[1.01]'
                      : isShaking
                      ? 'bg-rose-50 border-rose-400 text-rose-950 animate-bounce'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-indigo-300 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-indigo-700">
                        {card.isMatched ? '✓ Matched Consequence' : 'Result Clause'}
                      </div>
                      <div className="text-sm sm:text-base font-semibold leading-snug">
                        {card.text}
                      </div>
                    </div>

                    <div className="shrink-0 mt-0.5">
                      {card.isMatched ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Persistent Completed Game Bottom Banner */}
      {isGameOver && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border-2 border-emerald-400/40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <Trophy className="w-7 h-7 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/20 text-emerald-100">
                  ¡Reto Completado!
                </span>
                <span className="text-xs text-emerald-100 font-semibold">10 de 10 parejas</span>
              </div>
              <div className="text-base sm:text-lg font-black mt-0.5">
                ¡Felicidades! Has completado todas las oraciones del Primer Condicional
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => {
                setResultsModalTab('student');
                setIsResultsModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-950 font-black text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ver Parejas y Correcciones</span>
            </button>

            <button
              onClick={() => {
                setResultsModalTab('teacher');
                setIsResultsModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>Clave del Docente</span>
            </button>

            <button
              onClick={initGame}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar de Nuevo</span>
            </button>
          </div>
        </div>
      )}

      {/* COMPREHENSIVE RESULTS & TEACHER KEY MODAL */}
      <MatchingResultsModal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        onPlayAgain={initGame}
        score={score}
        formattedTime={formattedTime}
        highestStreak={highestStreak}
        mistakes={mistakes}
        correctMatches={correctMatches}
        incorrectAttempts={incorrectAttempts}
        allSentences={STUDY_HABIT_SENTENCES}
        initialTab={resultsModalTab}
      />

    </div>
  );
};
