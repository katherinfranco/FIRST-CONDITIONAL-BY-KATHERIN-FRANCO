import React from 'react';
import { X, BookOpen, Gamepad2, ArrowLeftRight, BookmarkCheck, Volume2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SparkyAvatar } from './SparkyAvatar';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose, onNavigateTab }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Centered 3D Animated Title & Spanish Student Subtitle */}
        <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-6 sm:p-8 text-white flex flex-col items-center justify-center text-center overflow-hidden shadow-md">
          {/* Close button in top-right corner */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* English Title Badge: Student Instruction Manual */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/25 border border-amber-300/50 text-amber-200 text-xs sm:text-sm font-extrabold tracking-wide uppercase mb-3 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Student Instruction Manual</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>

          {/* Large Centered 3D Moving Title: How to Use This Learning App */}
          <div className="py-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight animate-float-3d select-none">
              <span className="text-3d-title drop-shadow-lg" style={{ fontSize: '41px' }}>How to Use </span>
              <span className="text-3d-highlight drop-shadow-lg" style={{ fontSize: '41px' }}>This Learning App</span>
            </h2>
          </div>

          {/* Subtitle: Step-by-step instructions to master the First Conditional */}
          <p className="mt-2 text-sm sm:text-base font-medium text-indigo-100 max-w-xl">
            Step-by-step instructions to master the First Conditional
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-700" style={{ backgroundColor: '#069ca2' }}>
          
          {/* Welcome Mascot Banner with Sparky */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-sm">
            <SparkyAvatar size="md" mood="excited" className="shrink-0" />
            <div className="space-y-1 text-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
                  Welcome from Sparky 🦊
                </span>
                <span className="text-xs font-bold text-slate-500">Your Official Mascot & Guide</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                Hello, future English master! I'm <strong>Sparky the Fox</strong>, your learning guide. I've prepared this interactive roadmap with 4 key activities to help you master the <strong>First Conditional</strong> in a practical and fun way. Follow these steps and use the quick buttons below to jump directly to each section!
              </p>
            </div>
          </div>

          {/* Step-by-Step Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Step 1: Grammar Guide */}
            <div className="border border-slate-200 rounded-xl p-4 transition-colors flex flex-col justify-between" style={{ backgroundColor: '#ffff67' }}>
              <div>
                <div className="flex items-center gap-2 mb-2 text-indigo-700 font-semibold">
                  <BookOpen className="w-4 h-4" style={{ fontSize: '18px', width: '18px', height: '18px' }} />
                  <span style={{ fontSize: '18px' }}>1. Explore the Grammar Guide</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed" style={{ fontSize: '14px', color: '#9a0101' }}>
                  Start with the <strong>Grammar Guide</strong> tab to discover how the First Conditional works. Study the two clauses (<em>If-clause</em> in Present Simple & <em>Main clause</em> with <em>will</em>), the 3 structural forms (Affirmative, Negative, Interrogative), modal variations (<em>can, must, should</em>), and the 5 golden punctuation rules.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10">
                <button
                  onClick={() => onNavigateTab('grammar')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore the Grammar Guide</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
              </div>
            </div>

            {/* Step 2: Clause Order (Order Lab) */}
            <div className="border border-slate-200 rounded-xl p-4 transition-colors flex flex-col justify-between" style={{ backgroundColor: '#8eff76' }}>
              <div>
                <div className="flex items-center gap-2 mb-2 text-violet-700 font-semibold">
                  <ArrowLeftRight className="w-4 h-4" style={{ height: '21px', width: '18.5px' }} />
                  <span style={{ fontSize: '18px' }}>2. Practice the Comma Rule (Order Lab)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed" style={{ fontSize: '14px', color: '#2e0012' }}>
                  Visit the <strong>Clause Order Lab</strong> to interactively reverse the order of any sentence. Watch how the comma is required when the <em>If-clause</em> begins the sentence, but disappears when the <em>Main clause</em> comes first.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10">
                <button
                  onClick={() => onNavigateTab('inverter')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-800 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  <span>Practice the Comma Rule (Order Lab)</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
              </div>
            </div>

            {/* Step 3: Habits Reference */}
            <div className="border border-slate-200 rounded-xl p-4 transition-colors flex flex-col justify-between" style={{ backgroundColor: '#969aff' }}>
              <div>
                <div className="flex items-center gap-2 mb-2 text-amber-700 font-semibold">
                  <BookmarkCheck className="w-4 h-4" style={{ height: '15px' }} />
                  <span style={{ fontSize: '18px' }}>3. Reference the 10 Study Habits</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed" style={{ fontSize: '14px', color: '#0a180a' }}>
                  In the <strong>10 Study Habits Library</strong>, review each authentic sentence with color-coded grammar parts, detailed learning strategies, and native pronunciation audio buttons.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10">
                <button
                  onClick={() => onNavigateTab('habits')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Reference the 10 Study Habits</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
              </div>
            </div>

            {/* Step 4: Matching Game */}
            <div className="border border-slate-200 rounded-xl p-4 transition-colors flex flex-col justify-between" style={{ backgroundColor: '#f3c3f3' }}>
              <div>
                <div className="flex items-center gap-2 mb-2 text-emerald-700 font-semibold">
                  <Gamepad2 className="w-4 h-4" style={{ width: '18.4375px', height: '20px', fontWeight: 'bold' }} />
                  <span style={{ fontSize: '18px' }}>4. Play the 10-Sentence Matching Game</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed" style={{ fontSize: '14px', color: '#000d1b' }}>
                  Test your skills in the <strong>Matching Game</strong>. You will see 10 conditions (If-clauses) on the left and 10 results (Main clauses) on the right. Click a condition card, then click its logical habit consequence. At the end, students can review all correctly matched pairs as well as any incorrect attempts with their proper combinations, while teachers can unlock the full Answer Key with their PIN!
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10">
                <button
                  onClick={() => onNavigateTab('game')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Play 10-Sentence Matching Game</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Tools Guide */}
          <div className="border-t border-slate-100 pt-5" style={{ fontSize: '19px' }}>
            <h3 
              className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3"
              style={{ fontSize: '18px', textAlign: 'center', color: '#87414a', fontWeight: 'bold' }}
            >
              Key Features & Tips
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-indigo-600 shrink-0" style={{ width: '18px', height: '18px' }} />
                <span style={{ color: '#160d0d', fontSize: '14px' }}><strong>Listen Aloud:</strong> Tap any speaker icon throughout the app to hear accurate American English pronunciation via your browser's speech engine.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span style={{ color: '#1b2c18', fontSize: '14px' }}><strong>Color Code:</strong> Emerald indicates the <strong>If-Clause / Present Simple</strong>. Indigo indicates the <strong>Main Clause / Future (will + verb)</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                <span style={{ color: '#222307', fontSize: '14px' }}><strong>Modals:</strong> Amber highlights modal substitutes (<em>can, must, should</em>) used instead of <em>will</em>.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Tip: You can re-open this guide anytime via the "Instructions" button in the top navigation bar.
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateTab('game');
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Start Matching Game
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
