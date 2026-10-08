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
      
      {/* Hero Visual Section (Changed to light theme, removed badge, 3D animated colorful title, colorful buttons) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-pink-50/90 text-slate-800 shadow-xl border-2 border-indigo-100/90">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 lg:p-12 border-2 rounded-3xl" 
          style={{ backgroundColor: '#fefe97', borderColor: '#3b0202', borderStyle: 'solid' }}
        >
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* 3D Animated Title without "in English" */}
            <div className="py-2" style={{ fontSize: '22px' }}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight animate-float-3d select-none">
                <span className="text-3d-title" style={{ fontSize: '45px', paddingLeft: '0px' }}>Master the </span>
                <span className="text-3d-highlight" style={{ fontSize: '45px' }}>First Conditional</span>
              </h1>
            </div>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
              Understand how to express <strong className="text-indigo-950 font-bold">real future possibilities</strong> and their logical consequences. Learn through the proven habits of fluent English learners, interactive visual breakdowns, and practical grammar rules.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartGame}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-extrabold shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
              >
                <span>Play 10-Habits Matching Game</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoToOrderLab}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white text-sm font-extrabold shadow-lg shadow-fuchsia-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Comma Rule Lab</span>
              </button>
            </div>

            {/* Quick Summary Badges in light pastel colors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-indigo-200/60 text-xs">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold shadow-2xs">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
                <span style={{ fontSize: '14px' }}><strong>If-Clause:</strong> Present Simple</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 font-semibold shadow-2xs">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0"></div>
                <span style={{ fontSize: '14px' }}><strong>Main Clause:</strong> will + Verb</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 font-semibold shadow-2xs">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></div>
                <span style={{ fontSize: '14px' }}><strong>Modals:</strong> can, must, may, might</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-300/50 shadow-xl group">
              <img 
                src={heroImg} 
                alt="Student practicing effective English study habits"
                className="w-full h-72 sm:h-80 object-cover object-center transform group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs text-white bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/60 flex items-center gap-2 font-medium">
                  <BookMarked className="w-4 h-4 text-amber-300" />
                  <span>Daily study habit consistency builds natural fluency</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: USES OF THE FIRST CONDITIONAL (Cards in light sky, mint, and purple) */}
      <section className="rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6" style={{ backgroundColor: '#f1e1e1' }}>
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold italic" style={{ color: '#760040', fontStyle: 'italic', fontSize: '28px' }}>1. Uses of the First Conditional</h2>
            <p className="text-xs sm:text-sm text-slate-500">When and why do we use this conditional structure?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Light Sky Blue */}
          <div className="bg-sky-50/80 p-5 rounded-2xl border-2 border-sky-200 text-sky-950 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
              <Zap className="w-4 h-4 text-sky-600" />
              <span>Real & Likely Future Possibilities</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We use the First Conditional to talk about things that have a <strong className="text-slate-900">very realistic chance of happening</strong> in the present or future. It is not an imaginary fantasy (which would be the Second Conditional).
            </p>
          </div>

          {/* Card 2: Light Emerald Green */}
          <div className="bg-emerald-50/80 p-5 rounded-2xl border-2 border-emerald-200 text-emerald-950 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Cause & Direct Consequence</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              It establishes an authentic cause-and-effect link: <strong className="text-slate-900">"If event X happens first, then consequence Y will follow."</strong> This makes it ideal for goal setting, study habits, and promises.
            </p>
          </div>

          {/* Card 3: Light Lavender Purple */}
          <div className="bg-purple-50/80 p-5 rounded-2xl border-2 border-purple-200 text-purple-950 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Predictions, Advice & Plans</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              It allows speakers to offer warnings, helpful student advice, strategic study plans, and predictions based on present actions and commitments.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE ANATOMY (Light theme with pastel green, blue, pink, and violet cards) */}
      <section className="rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6" style={{ backgroundColor: '#8cf28a' }}>
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 italic" style={{ color: '#00165f', fontStyle: 'italic', fontSize: '28px' }}>2. The Two Parts: If-Clause vs. Main Clause</h2>
            <p className="text-xs sm:text-sm text-slate-500">Every First Conditional sentence consists of two interdependent clauses</p>
          </div>
        </div>

        {/* Visual Anatomy Breakdown Diagram in Light Theme */}
        <div className="bg-gradient-to-br from-indigo-50/50 via-slate-50 to-purple-50/50 text-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 border-2 border-purple-200 shadow-md">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-purple-800">
            Interactive Sentence Anatomy
          </div>

          {/* Sample sentence rendered with distinct light pastel parts */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 text-center text-sm sm:text-base font-medium">
            <div className="w-full lg:w-auto p-4 rounded-xl border-2 border-emerald-400 bg-emerald-50 text-emerald-950 shadow-sm">
              <span className="block text-[11px] font-bold uppercase text-emerald-700 tracking-wider mb-1">
                Condition Clause (If-Clause)
              </span>
              <span className="text-base sm:text-lg font-bold text-emerald-950">
                If you <span className="underline decoration-emerald-600 decoration-2 underline-offset-4">organize</span> your study schedule
              </span>
              <span className="block text-xs text-emerald-700 mt-1">
                Tense: <strong>Present Simple</strong>
              </span>
            </div>

            <div className="px-3.5 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-white text-xs font-black uppercase tracking-wide shadow-md">
              , [Comma]
            </div>

            <div className="w-full lg:w-auto p-4 rounded-xl border-2 border-sky-400 bg-sky-50 text-sky-950 shadow-sm">
              <span className="block text-[11px] font-bold uppercase text-sky-700 tracking-wider mb-1">
                Result Clause (Main Clause)
              </span>
              <span className="text-base sm:text-lg font-bold text-sky-950">
                you <span className="underline decoration-sky-600 decoration-2 underline-offset-4">will have</span> more time to practice English.
              </span>
              <span className="block text-xs text-sky-700 mt-1">
                Structure: <strong>will + Base Verb (infinitive)</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-purple-200/80 text-xs">
            <div className="bg-pink-50 border-2 border-pink-200 p-4 rounded-xl text-pink-950">
              <h4 className="font-bold text-pink-800 flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-pink-600" />
                The If-Clause (The Condition)
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Describes the prerequisite or triggering event. Notice that even though the action is in the future, English grammar requires the <strong>Present Simple</strong> tense here.
              </p>
            </div>

            <div className="bg-violet-50 border-2 border-violet-200 p-4 rounded-xl text-violet-950">
              <h4 className="font-bold text-violet-800 flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-violet-600" />
                The Main Clause (The Result)
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Describes the probable outcome or consequence if that condition is satisfied. Uses <strong>will + base form</strong> (or a modal such as can, must, may, might).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STRUCTURES (Vibrant type tabs, larger sound buttons, light pastel example cards) */}
      <section className="rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6" style={{ backgroundColor: '#b4ffff' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold italic" style={{ color: '#5a0067', fontStyle: 'italic', fontSize: '27px' }}>3. Sentence Structures: Affirmative, Negative & Interrogative</h2>
              <p className="text-xs sm:text-sm text-slate-500">Formulas and 2 real study habit examples for each type</p>
            </div>
          </div>

          {/* Type Selector Tabs in Bright Distinct Colors */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1.5 border border-slate-200/60">
            <button
              onClick={() => setSelectedStructure('affirmative')}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedStructure === 'affirmative'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              Affirmative
            </button>
            <button
              onClick={() => setSelectedStructure('negative')}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedStructure === 'negative'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                  : 'bg-white text-rose-800 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              Negative
            </button>
            <button
              onClick={() => setSelectedStructure('interrogative')}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedStructure === 'interrogative'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                  : 'bg-white text-purple-800 hover:bg-purple-50 border border-purple-200'
              }`}
            >
              Interrogative
            </button>
          </div>
        </div>

        {/* Selected Structure Card */}
        <div className="space-y-6">
          {/* Formula Banner in light card */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 text-slate-800 p-5 sm:p-6 rounded-2xl border-2 border-purple-200 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                Official Formula: {currentStructureData.title}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {currentStructureData.explanation}
              </span>
            </div>

            <div className="p-3.5 bg-white/90 rounded-xl border border-purple-200 font-mono text-sm sm:text-base text-indigo-950 font-bold tracking-wide overflow-x-auto shadow-2xs">
              {currentStructureData.formula}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-700">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-semibold">
                {currentStructureData.formulaParts.ifClause}
              </span>
              <span className="px-2 py-1 rounded-lg bg-violet-100 text-violet-800 font-mono font-bold">
                {currentStructureData.formulaParts.comma}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 border border-sky-300 font-mono font-semibold">
                {currentStructureData.formulaParts.mainClause}
              </span>
            </div>
          </div>

          {/* 2 Study Habit Examples in Light Pink & Light Amber Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Two Effective Study Habit Examples ({currentStructureData.title}):
              </h3>
              <span className="text-xs text-slate-500 font-medium">Click the large audio button to listen</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStructureData.examples.map((example, idx) => {
                const cardColor = idx === 0 
                  ? 'bg-pink-50/80 border-pink-200 hover:border-pink-300' 
                  : 'bg-amber-50/80 border-amber-200 hover:border-amber-300';
                const badgeColor = idx === 0 ? 'bg-pink-100 text-pink-800' : 'bg-amber-100 text-amber-800';

                return (
                  <div 
                    key={idx}
                    className={`rounded-2xl p-5 border-2 ${cardColor} transition-all shadow-xs space-y-4`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                        Study Example #{idx + 1}
                      </span>
                      
                      {/* Enriched & Larger Sound Button */}
                      <button
                        onClick={() => speakEnglish(example.fullSentence)}
                        className="p-2.5 px-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                        title="Listen sentence pronunciation"
                      >
                        <Volume2 className="w-5 h-5 text-amber-200" />
                        <span>Listen</span>
                      </button>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      "{example.fullSentence}"
                    </p>

                    {/* Highlights breakdown */}
                    <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-700">Present Simple verb:</span>
                        <strong className="text-emerald-800 font-mono">{example.verbHighlights.presentSimple}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        <span className="text-slate-700">Future Form verb:</span>
                        <strong className="text-indigo-800 font-mono">{example.verbHighlights.futureForm}</strong>
                      </div>
                    </div>

                    <div className="bg-white/80 border border-slate-200/80 p-3 rounded-xl text-xs text-slate-800 flex items-start gap-2 shadow-2xs">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Habit Strategy:</strong> {example.habitContext}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: EXCEPTIONS - MODAL VERBS IN MAIN CLAUSE (Colorful modal buttons & light detail card) */}
      <section className="rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6" style={{ backgroundColor: '#f5c0ff' }}>
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 italic" style={{ color: '#001963', fontStyle: 'italic', fontSize: '27px' }}>4. Exceptions: Using Other Modals Instead of "Will"</h2>
            <p className="text-xs sm:text-sm text-slate-500" style={{ color: '#0b2143' }}>
              In the main clause, you can replace <strong>"will"</strong> with modal verbs like <strong>“can”, “must”, “may”</strong> and <strong>“might”</strong> to express ability, obligation, or degrees of possibility.
            </p>
          </div>
        </div>

        {/* Modal Buttons in 4 distinct vibrant colors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MODAL_EXCEPTIONS.map((item) => {
            const isActive = activeModal === item.modal;
            const colorStyles: Record<string, { active: string; inactive: string }> = {
              can: {
                active: 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/30 scale-[1.02]',
                inactive: 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border-emerald-200'
              },
              must: {
                active: 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/30 scale-[1.02]',
                inactive: 'bg-rose-50 text-rose-900 hover:bg-rose-100 border-rose-200'
              },
              may: {
                active: 'bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/30 scale-[1.02]',
                inactive: 'bg-sky-50 text-sky-900 hover:bg-sky-100 border-sky-200'
              },
              might: {
                active: 'bg-purple-600 text-white border-purple-700 shadow-md shadow-purple-500/30 scale-[1.02]',
                inactive: 'bg-purple-50 text-purple-900 hover:bg-purple-100 border-purple-200'
              }
            };

            const styles = colorStyles[item.modal];

            return (
              <button
                key={item.modal}
                onClick={() => setActiveModal(item.modal)}
                className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                  isActive ? styles.active : styles.inactive
                }`}
              >
                <div className="text-xl font-black uppercase font-mono tracking-wide">{item.modal}</div>
                <div className="text-xs mt-1 font-semibold truncate opacity-90">
                  {item.meaning.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Modal Card Detail in light pastel theme */}
        <div className="border-2 border-amber-200 rounded-2xl p-6 space-y-5 shadow-xs" style={{ backgroundColor: '#c1c1c1' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                Modal: {currentModalData.modal.toUpperCase()}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2" style={{ fontSize: '20px' }}>
                Expresses: {currentModalData.meaning}
              </h3>
            </div>
            <div className="p-3 bg-white border-2 border-amber-200 rounded-xl font-mono text-xs text-amber-950 font-bold shadow-2xs">
              {currentModalData.formula}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <strong className="text-slate-900">Nuance:</strong> {currentModalData.nuance}
          </p>

          <div className="bg-white rounded-xl p-5 border-2 border-amber-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Study Habit Example with "{currentModalData.modal}":
              </span>

              {/* Large Audio Button */}
              <button
                onClick={() => speakEnglish(currentModalData.example.fullSentence)}
                className="p-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                title="Listen example"
              >
                <Volume2 className="w-5 h-5 text-white" />
                <span>Listen</span>
              </button>
            </div>
            
            <p className="text-sm sm:text-base font-bold text-slate-900">
              "{currentModalData.example.fullSentence}"
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg font-mono font-semibold border border-emerald-200">
                If-clause: {currentModalData.example.ifPart}
              </span>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-900 rounded-lg font-mono font-semibold border border-amber-200">
                Modal Verb: {currentModalData.example.modalUsed}
              </span>
            </div>
            <p className="text-xs text-slate-600 italic pt-1">
              💡 {currentModalData.example.explanation}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE 5 GOLDEN RULES (Cards in light blue, green, purple, pink, and yellow) */}
      <section className="rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6" style={{ backgroundColor: '#a2aaf4' }}>
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 italic" style={{ color: '#143300', fontStyle: 'italic', fontSize: '28px' }}>5. Golden Rules of the First Conditional</h2>
            <p className="text-xs sm:text-sm text-slate-500" style={{ color: '#5f2059', fontWeight: 'bold' }}>Essential grammatical principles every English learner must memorize</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOLDEN_RULES.map((rule, idx) => {
            const ruleColorStyles = [
              'bg-blue-50/80 border-blue-200 text-blue-950',
              'bg-emerald-50/80 border-emerald-200 text-emerald-950',
              'bg-purple-50/80 border-purple-200 text-purple-950',
              'bg-pink-50/80 border-pink-200 text-pink-950',
              'bg-amber-50/80 border-amber-200 text-amber-950',
            ][idx % 5];

            const badgeColor = [
              'bg-blue-600',
              'bg-emerald-600',
              'bg-purple-600',
              'bg-pink-600',
              'bg-amber-600',
            ][idx % 5];

            return (
              <div 
                key={rule.id}
                className={`rounded-2xl p-5 border-2 ${ruleColorStyles} transition-all shadow-xs space-y-3`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full ${badgeColor} text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs`}>
                    {rule.id}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">{rule.title}</h3>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {rule.ruleDesc}
                </p>

                {rule.wrongExample && rule.rightExample && (
                  <div className="space-y-1.5 p-3 rounded-xl bg-white/90 border border-slate-200 text-xs font-mono shadow-2xs">
                    <div className="text-rose-600 flex items-center gap-1.5">
                      <span>{rule.wrongExample}</span>
                    </div>
                    <div className="text-emerald-700 flex items-center gap-1.5 font-bold">
                      <span>{rule.rightExample}</span>
                    </div>
                  </div>
                )}

                {rule.patternA && rule.patternB && (
                  <div className="space-y-1 p-3 rounded-xl bg-white/90 border border-slate-200 text-xs font-mono text-slate-800 shadow-2xs">
                    <div>{rule.patternA}</div>
                    <div>{rule.patternB}</div>
                  </div>
                )}

                {rule.withComma && rule.withoutComma && (
                  <div className="space-y-1.5 p-3 rounded-xl bg-white/90 border border-purple-200 text-xs shadow-2xs">
                    <div className="text-purple-900">
                      <span className="font-semibold">With Comma:</span> {rule.withComma}
                    </div>
                    <div className="text-purple-900">
                      <span className="font-semibold">Without Comma:</span> {rule.withoutComma}
                    </div>
                  </div>
                )}

                {rule.negPattern && rule.questPattern && (
                  <div className="space-y-1 p-3 rounded-xl bg-white/90 border border-slate-200 text-xs font-mono text-slate-800 shadow-2xs">
                    <div>• {rule.negPattern}</div>
                    <div>• {rule.questPattern}</div>
                  </div>
                )}

                <div className="text-[11px] text-slate-600 flex items-start gap-1.5 italic">
                  <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Tip: {rule.tip}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: Interactive Habit Practice Graphic Banner in LIGHT theme with colorful buttons */}
      <section className="border-2 border-teal-200/90 rounded-3xl p-6 sm:p-10 text-slate-900 overflow-hidden relative shadow-md" style={{ backgroundColor: '#00aaab' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4" style={{ fontFamily: 'system-ui', fontStyle: 'normal', fontWeight: 'bold' }}>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-300">
              Ready for Interactive Practice?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ borderColor: '#992222' }}>
              Test Yourself with the 10 Study Habits Matching Game!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Match 10 real student habits with their future English fluency outcomes. Strengthen your recognition of conditions and consequences while picking up actionable study techniques!
            </p>
            <div className="pt-2">
              <button
                onClick={onStartGame}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
              >
                <span>Launch Matching Challenge Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-2 border-teal-300/60 shadow-xl">
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
