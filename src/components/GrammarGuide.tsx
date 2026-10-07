import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  ArrowRight, 
  HelpCircle, 
  Zap, 
  Lightbulb, 
  Info,
  ShieldAlert,
  Layers,
  Clock,
  BookMarked
} from 'lucide-react';
import { GRAMMAR_STRUCTURES, MODAL_EXCEPTIONS, GOLDEN_RULES } from '../data/firstConditionalData';
import { speakEnglish } from '../utils/audio';

import heroImg from '../assets/images/student_study_habits_1791337088765.jpg';
import practiceImg from '../assets/images/english_speaking_practice_1791337102193.jpg';

interface GrammarGuideProps {
  onStartGame: () => void;
  onGoToOrderLab: () => void;
}

export const GrammarGuide: React.FC<GrammarGuideProps> = ({ onStartGame, onGoToOrderLab }) => {
  const [selectedStructure, setSelectedStructure] = useState<'affirmative' | 'negative' | 'interrogative'>('affirmative');
  const [activeModal, setActiveModal] = useState<'can' | 'must' | 'may' | 'might'>('can');

  const currentStructureData = GRAMMAR_STRUCTURES.find((s) => s.type === selectedStructure)!;
  const currentModalData = MODAL_EXCEPTIONS.find((m) => m.modal === activeModal)!;

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Visual Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl border border-indigo-800/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 lg:p-12">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Real Conditions • Effective Habits</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight" style={{ color: '#ffffff' }}>
              Master the <span style={{ color: '#00ffc7' }}>First Conditional</span> in English
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Understand how to express <strong className="text-white">real future possibilities</strong> and their logical consequences. Learn through the proven habits of fluent English learners, interactive visual breakdowns, and practical grammar rules.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartGame}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
              >
                <span>Play 10-Habits Matching Game</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoToOrderLab}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-all cursor-pointer backdrop-blur-sm"
              >
                Explore Comma Rule Lab
              </button>
            </div>

            {/* Quick Summary Pill Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-indigo-800/60 text-xs text-indigo-200">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></div>
                <span><strong>If-Clause:</strong> Present Simple</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0"></div>
                <span><strong>Main Clause:</strong> will + Base Verb</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></div>
                <span><strong>Modals:</strong> can, must, may, might</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-400/30 shadow-2xl group">
              <img 
                src={heroImg} 
                alt="Student practicing effective English study habits"
                className="w-full h-72 sm:h-80 object-cover object-center transform group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs text-slate-200 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
                  <BookMarked className="w-3.5 h-3.5 text-amber-300" />
                  <span>Effective Study Habit: Daily consistency leads to spoken fluency</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: USES OF THE FIRST CONDITIONAL */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: '#2b0f1e' }}>1. Uses of the First Conditional</h2>
            <p className="text-xs sm:text-sm text-slate-500">When and why do we use this conditional structure?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-100 space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Real & Likely Future Possibilities</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We use the First Conditional to talk about things that have a <strong className="text-slate-800">very realistic chance of happening</strong> in the present or future. It is not an imaginary fantasy (which would be the Second Conditional).
            </p>
          </div>

          <div className="bg-gradient-to-b from-teal-50/60 to-white p-5 rounded-2xl border border-teal-100 space-y-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Cause & Direct Consequence</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              It establishes an authentic cause-and-effect link: <strong className="text-slate-800">"If event X happens first, then consequence Y will follow."</strong> This makes it ideal for goal setting, study habits, and promises.
            </p>
          </div>

          <div className="bg-gradient-to-b from-amber-50/60 to-white p-5 rounded-2xl border border-amber-100 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Predictions, Advice & Plans</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              It allows speakers to offer warnings, helpful student advice, strategic study plans, and predictions based on present actions and commitments.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE ANATOMY (PARTS: IF-CLAUSE & MAIN CLAUSE) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 italic" style={{ fontStyle: 'italic' }}>2. The Two Parts: If-Clause vs. Main Clause</h2>
            <p className="text-xs sm:text-sm text-slate-500">Every First Conditional sentence consists of two interdependent clauses</p>
          </div>
        </div>

        {/* Visual Anatomy Breakdown Diagram */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800 shadow-lg">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
            Interactive Sentence Anatomy
          </div>

          {/* Sample sentence rendered with distinct parts */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 text-center text-sm sm:text-base font-medium">
            <div className="w-full lg:w-auto p-4 rounded-xl border-2 border-emerald-500/60 text-emerald-200 shadow-md" style={{ backgroundColor: '#002c2c' }}>
              <span className="block text-[11px] font-bold uppercase text-emerald-400 tracking-wider mb-1">
                Condition Clause (If-Clause)
              </span>
              <span className="text-base sm:text-lg font-bold text-white">
                If you <span className="underline decoration-emerald-400 decoration-2 underline-offset-4">organize</span> your study schedule
              </span>
              <span className="block text-xs text-emerald-300/80 mt-1">
                Tense: <strong>Present Simple</strong>
              </span>
            </div>

            <div className="px-3 py-1 bg-violet-900/60 border border-violet-400/40 rounded-full text-violet-200 text-xs font-bold uppercase tracking-wide">
              , [Comma]
            </div>

            <div className="w-full lg:w-auto p-4 rounded-xl bg-indigo-950/80 border-2 border-indigo-500/60 text-indigo-200 shadow-md">
              <span className="block text-[11px] font-bold uppercase text-indigo-400 tracking-wider mb-1">
                Result Clause (Main Clause)
              </span>
              <span className="text-base sm:text-lg font-bold text-white">
                you <span className="underline decoration-indigo-400 decoration-2 underline-offset-4">will have</span> more time to practice English.
              </span>
              <span className="block text-xs text-indigo-300/80 mt-1">
                Structure: <strong>will + Base Verb (infinitive)</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="bg-emerald-950/30 border border-emerald-800/40 p-4 rounded-xl">
              <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                The If-Clause (The Condition)
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Describes the prerequisite or triggering event. Notice that even though the action is in the future, English grammar requires the <strong>Present Simple</strong> tense here.
              </p>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-800/40 p-4 rounded-xl">
              <h4 className="font-bold text-indigo-400 flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                The Main Clause (The Result)
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Describes the probable outcome or consequence if that condition is satisfied. Uses <strong>will + base form</strong> (or a modal such as can, must, may, might).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STRUCTURES (AFFIRMATIVE, NEGATIVE, INTERROGATIVE) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold italic" style={{ color: '#290f2b', fontStyle: 'italic' }}>3. Sentence Structures: Affirmative, Negative & Interrogative</h2>
              <p className="text-xs sm:text-sm text-slate-500">Formulas and 2 real study habit examples for each type</p>
            </div>
          </div>

          {/* Type Selector Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            {(['affirmative', 'negative', 'interrogative'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedStructure(type)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedStructure === type
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Structure Card */}
        <div className="space-y-6">
          {/* Formula Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 sm:p-6 rounded-2xl border border-indigo-900 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Official Formula: {currentStructureData.title}
              </span>
              <span className="text-xs text-slate-400">
                {currentStructureData.explanation}
              </span>
            </div>

            <div className="p-3.5 bg-black/40 rounded-xl border border-indigo-500/30 font-mono text-sm sm:text-base text-teal-300 font-semibold tracking-wide overflow-x-auto">
              {currentStructureData.formula}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-300">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                {currentStructureData.formulaParts.ifClause}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono">
                {currentStructureData.formulaParts.comma}
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                {currentStructureData.formulaParts.mainClause}
              </span>
            </div>
          </div>

          {/* 2 Study Habit Examples */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Two Effective Study Habit Examples ({currentStructureData.title}):
              </h3>
              <span className="text-xs text-slate-400">Click audio to listen</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStructureData.examples.map((example, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 transition-all shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                      Study Example #{idx + 1}
                    </span>
                    <button
                      onClick={() => speakEnglish(example.fullSentence)}
                      className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 transition-colors cursor-pointer"
                      title="Listen sentence pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    "{example.fullSentence}"
                  </p>

                  {/* Highlights breakdown */}
                  <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-slate-600">Present Simple verb:</span>
                      <strong className="text-emerald-700 font-mono">{example.verbHighlights.presentSimple}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <span className="text-slate-600">Future Form verb:</span>
                      <strong className="text-indigo-700 font-mono">{example.verbHighlights.futureForm}</strong>
                    </div>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Habit Strategy:</strong> {example.habitContext}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: EXCEPTIONS - MODAL VERBS IN MAIN CLAUSE */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 italic" style={{ fontStyle: 'italic' }}>4. Exceptions: Using Other Modals Instead of "Will"</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              In the main clause, you can replace <strong>"will"</strong> with modal verbs like <strong>“can”, “must”, “may”</strong> and <strong>“might”</strong> to express ability, obligation, or degrees of possibility.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {MODAL_EXCEPTIONS.map((item) => (
            <button
              key={item.modal}
              onClick={() => setActiveModal(item.modal)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                activeModal === item.modal
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="text-lg font-black uppercase font-mono tracking-wide">{item.modal}</div>
              <div className={`text-xs mt-1 truncate ${activeModal === item.modal ? 'text-amber-100' : 'text-slate-500'}`}>
                {item.meaning.split(',')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Modal Card Detail */}
        <div className="bg-gradient-to-br from-amber-50/50 via-white to-slate-50 border border-amber-200 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                Modal: {currentModalData.modal.toUpperCase()}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Expresses: {currentModalData.meaning}
              </h3>
            </div>
            <div className="p-2.5 bg-white border border-amber-200 rounded-xl font-mono text-xs text-amber-900 font-semibold shadow-xs">
              {currentModalData.formula}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Nuance:</strong> {currentModalData.nuance}
          </p>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                Study Habit Example with "{currentModalData.modal}":
              </span>
              <button
                onClick={() => speakEnglish(currentModalData.example.fullSentence)}
                className="p-1 rounded-md bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 transition-colors cursor-pointer"
                title="Listen example"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-900">
              "{currentModalData.example.fullSentence}"
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-mono border border-emerald-200">
                If-clause: {currentModalData.example.ifPart}
              </span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded font-mono border border-amber-200">
                Modal Verb: {currentModalData.example.modalUsed}
              </span>
            </div>
            <p className="text-xs text-slate-500 italic pt-1">
              💡 {currentModalData.example.explanation}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE 5 GOLDEN RULES OF FIRST CONDITIONAL */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 italic" style={{ fontStyle: 'italic' }}>5. Golden Rules of the First Conditional</h2>
            <p className="text-xs sm:text-sm text-slate-500">Essential grammatical principles every English learner must memorize</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOLDEN_RULES.map((rule) => (
            <div 
              key={rule.id}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 transition-all shadow-xs space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {rule.id}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{rule.title}</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {rule.ruleDesc}
              </p>

              {rule.wrongExample && rule.rightExample && (
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-100/80 text-xs font-mono">
                  <div className="text-rose-600 flex items-center gap-1.5">
                    <span>{rule.wrongExample}</span>
                  </div>
                  <div className="text-emerald-700 flex items-center gap-1.5 font-bold">
                    <span>{rule.rightExample}</span>
                  </div>
                </div>
              )}

              {rule.patternA && rule.patternB && (
                <div className="space-y-1 p-3 rounded-xl bg-slate-100/80 text-xs font-mono text-slate-700">
                  <div>{rule.patternA}</div>
                  <div>{rule.patternB}</div>
                </div>
              )}

              {rule.withComma && rule.withoutComma && (
                <div className="space-y-1.5 p-3 rounded-xl bg-violet-50/70 border border-violet-200/60 text-xs">
                  <div className="text-violet-900">
                    <span className="font-semibold">With Comma:</span> {rule.withComma}
                  </div>
                  <div className="text-violet-900">
                    <span className="font-semibold">Without Comma:</span> {rule.withoutComma}
                  </div>
                </div>
              )}

              {rule.negPattern && rule.questPattern && (
                <div className="space-y-1 p-3 rounded-xl bg-slate-100/80 text-xs font-mono text-slate-800">
                  <div>• {rule.negPattern}</div>
                  <div>• {rule.questPattern}</div>
                </div>
              )}

              <div className="text-[11px] text-slate-500 flex items-start gap-1.5 italic">
                <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>Tip: {rule.tip}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Habit Practice Graphic Banner */}
      <section className="rounded-3xl p-6 sm:p-10 text-white overflow-hidden relative shadow-lg" style={{ backgroundColor: '#000000' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-400/20 text-teal-300 border border-teal-400/30">
              Ready for Interactive Practice?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Test Yourself with the 10 Study Habits Matching Game!
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Match 10 real student habits with their future English fluency outcomes. Strengthen your recognition of conditions and consequences while picking up actionable study techniques!
            </p>
            <div className="pt-2">
              <button
                onClick={onStartGame}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Launch Matching Challenge Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-teal-500/30 shadow-xl">
              <img 
                src={practiceImg} 
                alt="Student practicing spoken English" 
                className="w-full h-48 sm:h-56 object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
