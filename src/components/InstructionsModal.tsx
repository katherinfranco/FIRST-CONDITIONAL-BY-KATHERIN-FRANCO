import React from 'react';
import { X, BookOpen, Gamepad2, ArrowLeftRight, BookmarkCheck, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

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
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-teal-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">How to Use This Learning App</h2>
              <p className="text-sm text-indigo-100">Step-by-step instructions to master the First Conditional</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-700">
          
          {/* Welcome Banner */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-sm text-teal-900">
              <span className="font-semibold">Welcome to First Conditional Master!</span> This application is designed to help you understand real future conditions through 10 proven study habits of effective English learners.
            </div>
          </div>

          {/* Step-by-Step Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Step 1 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-indigo-700 font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>1. Explore the Grammar Guide</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Start with the <strong>Grammar Guide</strong> tab to discover how the First Conditional works. Study the two clauses (<em>If-clause</em> in Present Simple & <em>Main clause</em> with <em>will</em>), the 3 structural forms (Affirmative, Negative, Interrogative), modal variations (<em>can, must, may, might</em>), and the 5 golden punctuation rules.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-emerald-700 font-semibold">
                <Gamepad2 className="w-4 h-4" />
                <span>2. Play the 10-Sentence Matching Game</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Test your skills in the <strong>Matching Game</strong>. You will see 10 conditions (If-clauses) on the left and 10 results (Main clauses) on the right. Click a condition card, then click its logical habit consequence. Build streaks for multipliers, avoid mistakes, and win the Master badge!
              </p>
            </div>

            {/* Step 3 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-violet-700 font-semibold">
                <ArrowLeftRight className="w-4 h-4" />
                <span>3. Practice the Comma Rule (Order Lab)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visit the <strong>Clause Order Lab</strong> to interactively reverse the order of any sentence. Watch how the comma is required when the <em>If-clause</em> begins the sentence, but disappears when the <em>Main clause</em> comes first.
              </p>
            </div>

            {/* Step 4 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-amber-700 font-semibold">
                <BookmarkCheck className="w-4 h-4" />
                <span>4. Reference the 10 Study Habits</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                In the <strong>10 Study Habits Library</strong>, review each authentic sentence with color-coded grammar parts, detailed learning strategies, and native pronunciation audio buttons.
              </p>
            </div>

          </div>

          {/* Interactive Tools Guide */}
          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Key Features & Tips</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span><strong>Listen Aloud:</strong> Tap any speaker icon throughout the app to hear accurate American English pronunciation via your browser's speech engine.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span><strong>Color Code:</strong> Emerald indicates the <strong>If-Clause / Present Simple</strong>. Indigo indicates the <strong>Main Clause / Future (will + verb)</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                <span><strong>Modals:</strong> Amber highlights modal substitutes (<em>can, must, may, might</em>) used instead of <em>will</em>.</span>
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
