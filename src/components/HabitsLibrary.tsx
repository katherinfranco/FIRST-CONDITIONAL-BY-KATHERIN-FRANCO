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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800">
              <BookmarkCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Complete Habits Reference</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              10 Effective English Learner Habits
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSentences.map((habit) => {
          const isInverted = Boolean(invertedMap[habit.id]);

          return (
            <div
              key={habit.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-indigo-300 transition-all shadow-xs flex flex-col justify-between space-y-4"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                    #{habit.id}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{habit.habitTitle}</h3>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      Category: {habit.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakEnglish(isInverted ? habit.invertedSentence : habit.fullSentence)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 transition-colors cursor-pointer"
                    title="Listen aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleInverted(habit.id)}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      isInverted 
                        ? 'bg-violet-600 text-white border-violet-700' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                    title="Invert clause order"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span className="text-[10px] hidden sm:inline">Flip</span>
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
                      {habit.resultClause}.
                    </span>
                  </p>
                ) : (
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-900">
                    <span className="text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-200 capitalize">
                      {habit.resultClause.charAt(0).toUpperCase() + habit.resultClause.slice(1)}
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 ml-1">
                      {habit.conditionClause.toLowerCase()}.
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
