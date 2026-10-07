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
  Award
} from 'lucide-react';
import { STUDY_HABIT_SENTENCES } from '../data/firstConditionalData';
import { SentenceHabit, GameCard } from '../types';
import { sound, speakEnglish } from '../utils/audio';

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
    // Left column: Conditions
    const condCards: GameCard[] = STUDY_HABIT_SENTENCES.map((s): GameCard => ({
      id: `cond-${s.id}`,
      sentenceId: s.id,
      type: 'condition' as const,
      text: s.conditionClause,
      isMatched: false,
      isSelected: false,
    })).sort(() => Math.random() - 0.5);

    // Right column: Results
    const resCards: GameCard[] = STUDY_HABIT_SENTENCES.map((s): GameCard => ({
      id: `res-${s.id}`,
      sentenceId: s.id,
      type: 'result' as const,
      text: s.resultClause,
      isMatched: false,
      isSelected: false,
    })).sort(() => Math.random() - 0.5);

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
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                10 Habit Pairs Challenge
              </span>
              <span className="text-xs text-slate-500">First Conditional Practice</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Habits Matching Game
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Match each <strong className="text-emerald-700">If-clause (Condition)</strong> with its logical <strong className="text-indigo-700">Main clause (Consequence)</strong>.
            </p>
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
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <div>
                <div className="text-[10px] text-indigo-600 uppercase tracking-wider font-semibold">Matched</div>
                <div className="text-base font-black font-mono leading-none">{matchesCount}/10</div>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 shadow-xs">
              <Timer className="w-4 h-4 text-slate-500" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Time</div>
                <div className="text-base font-black font-mono leading-none">{formattedTime}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              <button
                onClick={handleGiveHint}
                className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                title="Get a hint (-10 points)"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Hint</span>
              </button>

              <button
                onClick={initGame}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
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

      {/* Real-time Dynamic Feedback Banner */}
      {feedback.message && (
        <div className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
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
              className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Listen</span>
            </button>
          )}
        </div>
      )}

      {/* Two-Column Matching Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN: CONDITIONS (If-Clauses) */}
        <div className="bg-slate-50/70 rounded-3xl p-4 sm:p-6 border border-slate-200/80 space-y-3">
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

          <p className="text-xs text-slate-500 pb-2">
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
        <div className="bg-slate-50/70 rounded-3xl p-4 sm:p-6 border border-slate-200/80 space-y-3">
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

          <p className="text-xs text-slate-500 pb-2">
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

      {/* GAME VICTORY MODAL */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-6 sm:p-8 text-center space-y-6">
            
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                All 10 Habit Pairs Mastered!
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Congratulations, Conditional Master!
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                You successfully connected all 10 First Conditional sentences and their effective study habits.
              </p>
            </div>

            {/* Final Game Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="p-2">
                <div className="text-xs text-slate-500 uppercase font-semibold">Final Score</div>
                <div className="text-xl font-black text-indigo-700 font-mono">{score}</div>
              </div>
              <div className="p-2">
                <div className="text-xs text-slate-500 uppercase font-semibold">Total Time</div>
                <div className="text-xl font-black text-slate-800 font-mono">{formattedTime}</div>
              </div>
              <div className="p-2">
                <div className="text-xs text-slate-500 uppercase font-semibold">Max Streak</div>
                <div className="text-xl font-black text-amber-600 font-mono">{highestStreak}x</div>
              </div>
              <div className="p-2">
                <div className="text-xs text-slate-500 uppercase font-semibold">Accuracy</div>
                <div className="text-xl font-black text-emerald-600 font-mono">
                  {Math.round((10 / (10 + mistakes)) * 100)}%
                </div>
              </div>
            </div>

            {/* Study Habit Key Lesson */}
            <div className="bg-indigo-50/70 border border-indigo-200/70 rounded-2xl p-4 text-xs text-indigo-950 text-left space-y-1">
              <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Effective English Habit Takeaway:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Consistency, real-world practice, and viewing mistakes as learning opportunities will accelerate your English fluency faster than pure theoretical cramming!
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={initGame}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again (Fresh Shuffle)</span>
              </button>

              <button
                onClick={() => setIsGameOver(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
              >
                Review Completed Board
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
