import React, { useState } from 'react';
import { 
  BookmarkCheck, 
  Volume2, 
  ArrowLeftRight, 
  Search, 
  Lightbulb, 
  CheckCircle2, 
  Sparkles,
  Layers
} from 'lucide-react';
import { STUDY_HABIT_SENTENCES } from '../data/firstConditionalData';
import { speakEnglish } from '../utils/audio';
import { SparkyAvatar } from './SparkyAvatar';

export const HabitsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [invertedMap, setInvertedMap] = useState<Record<number, boolean>>({});

  const toggleInverted = (id: number) => {
    setInvertedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredSentences = STUDY_HABIT_SENTENCES.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.fullSentence.toLowerCase().includes(q) ||
      s.habitTitle.toLowerCase().includes(q) ||
      s.explanation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 border shadow-xs" style={{ backgroundColor: '#b0bded', borderColor: '#0e0d0d' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800">
              <BookmarkCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Complete Habits Reference</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight italic animate-h2-motion" style={{ color: '#600505', fontStyle: 'italic' }}>
              10 Effective English Learner Habits
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#0059a7', fontWeight: 'bold' }}>
              Explore the exact 10 First Conditional sentences used in this course. Each card highlights the grammar structure, verb tenses, and provides the psychological learning reason behind each study habit.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search habits or words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{ backgroundColor: '#a8d9fe', color: '#0b0c0d', fontWeight: 'normal' }}
            />
          </div>
        </div>
      </div>

      {/* Sparky Guide Banner */}
      <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 border-2 border-amber-300 text-slate-800 shadow-sm">
        <SparkyAvatar size="sm" mood="happy" className="shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300">
              Habits Guide with Sparky 🦊
            </span>
            <span className="text-xs font-bold text-slate-600">Evidence-Based Learning</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            These 10 habits will transform your English! Each card contains an authentic First Conditional sentence, its grammatical breakdown, and the cognitive reasoning behind it. Click the audio button 🔊 to practice pronunciation, and use the swap button to practice reversing clause order.
          </p>
        </div>
      </div>

      {/* Cards List in Varied Light Pastel Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSentences.map((habit, idx) => {
          const isInverted = Boolean(invertedMap[habit.id]);

          // Cycle through clear light pastel colors: pink, purple, amber, sky, emerald
          const pastelPalettes = [
            { card: 'bg-pink-50/70 border-pink-200 hover:border-pink-300', num: 'bg-pink-600' },
            { card: 'bg-purple-50/70 border-purple-200 hover:border-purple-300', num: 'bg-purple-600' },
            { card: 'bg-amber-50/70 border-amber-200 hover:border-amber-300', num: 'bg-amber-600' },
            { card: 'bg-sky-50/70 border-sky-200 hover:border-sky-300', num: 'bg-sky-600' },
            { card: 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-300', num: 'bg-emerald-600' },
          ];
          const palette = pastelPalettes[idx % pastelPalettes.length];

          return (
            <div
              key={habit.id}
              className={`rounded-3xl p-6 border-2 ${palette.card} transition-all shadow-xs flex flex-col justify-between space-y-4`}
              style={idx === 4 ? { backgroundColor: '#b8f8dd' } : undefined}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`w-8 h-8 rounded-xl ${palette.num} text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs`}>
                    #{habit.id}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{habit.habitTitle}</h3>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      Category: {habit.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Large Prominent Audio Button */}
                  <button
                    onClick={() => speakEnglish(isInverted ? habit.invertedSentence : habit.fullSentence)}
                    className="p-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
                    title="Listen aloud"
                  >
                    <Volume2 className="w-5 h-5 text-amber-200" />
                    <span className="hidden sm:inline">Listen</span>
                  </button>

                  <button
                    onClick={() => toggleInverted(habit.id)}
                    className={`p-2.5 px-3 rounded-xl border-2 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                      isInverted 
                        ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20' 
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                    title="Invert clause order"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span className="text-[11px] hidden sm:inline">Flip</span>
                  </button>
                </div>
              </div>

              {/* Main Sentence with Visual Grammar Highlights */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Grammar Anatomy:</span>
                  <span className="text-[10px] font-mono text-indigo-700">
                    {isInverted ? 'Main Clause + If-Clause' : 'If-Clause + Comma + Main Clause'}
                  </span>
                </div>

                {!isInverted ? (
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-900">
                    <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
                      {habit.conditionClause}
                    </span>
                    <span className="text-violet-600 font-extrabold mx-0.5 text-lg">,</span>
                    <span className="text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-200 ml-1">
                      {habit.resultClause.endsWith('?') ? habit.resultClause : `${habit.resultClause}.`}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-900">
                    <span className="text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-200 capitalize">
                      {habit.resultClause.charAt(0).toUpperCase() + habit.resultClause.slice(1).replace(/\?$/, '')}
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 ml-1">
                      {habit.conditionClause.toLowerCase()}{habit.resultClause.endsWith('?') ? '?' : '.'}
                    </span>
                  </p>
                )}
              </div>

              {/* Tenses Pill Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">Condition Verb:</span>
                  <span className="font-mono font-bold text-emerald-950">{habit.conditionVerb}</span>
                  <span className="text-[10px] text-emerald-600 block">(Present Simple)</span>
                </div>

                <div className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100">
                  <span className="text-[10px] uppercase font-bold text-indigo-800 block">Result Verb:</span>
                  <span className="font-mono font-bold text-indigo-950">{habit.resultVerb}</span>
                  <span className="text-[10px] text-indigo-600 block">(will + Infinitive)</span>
                </div>
              </div>

              {/* Psychological Habit Explanation */}
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Why this study habit works:</span> {habit.explanation}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
