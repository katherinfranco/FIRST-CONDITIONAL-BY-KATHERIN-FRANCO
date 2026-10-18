import React, { useState, useEffect } from 'react';
import { SparkyAvatar } from './SparkyAvatar';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  BookOpen, 
  Gamepad2, 
  ArrowLeftRight, 
  BookmarkCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  Lightbulb,
  Heart
} from 'lucide-react';
import { sound, speakMascot, stopSpeaking } from '../utils/audio';

interface MascotCompanionProps {
  activeTab: string;
  isInstructionsOpen: boolean;
  onSelectTab: (tab: string) => void;
  onOpenInstructions: () => void;
}

interface SectionGuide {
  title: string;
  badge: string;
  message: string;
  tip: string;
}

const SECTION_GUIDES: Record<string, SectionGuide> = {
  welcome: {
    title: "Hello! I'm Sparky, your Mascot & Guide 🦊",
    badge: "Official Welcome",
    message: "I'm so thrilled you're here! I will guide you through your entire journey to master the First Conditional. You will learn to express real future possibilities: 'If + Present Simple, will + Verb'. Click any section below to start our adventure!",
    tip: "Sparky Tip: The condition always uses Present Simple, never 'will' inside the 'if' clause!"
  },
  grammar: {
    title: "Grammar Guide with Sparky 📘",
    badge: "Theory & Structures",
    message: "In this section, you'll learn the exact formulas: affirmative, negative, and questions. You will also see modal exceptions like 'can', 'must', or 'should' and common mistakes to avoid. Click any example to listen to its pronunciation!",
    tip: "Sparky Tip: Remember: 'If it rains, I will stay home'. Never say 'If it will rain'!"
  },
  instructions: {
    title: "Student Instruction Manual 📖",
    badge: "Step-by-Step",
    message: "Here is your roadmap! I'll guide you through each station: 1. Read the instructions manual, 2. Study the theory in grammar guide, 3. Master the comma rule in the lab, 4. Review the 10 study habits, and 5. Win the 10-sentence matching challenge.",
    tip: "Sparky Tip: Every button in the manual transports you directly to the relevant activity."
  },
  inverter: {
    title: "Clause Order & Comma Lab 🔄",
    badge: "Comma Rule",
    message: "Welcome to my interactive lab! You can switch the clauses freely, but watch the punctuation! If you start with 'If...', you MUST add a comma (,). If the main clause is first, NO comma is used!",
    tip: "Sparky Tip: 'If you study, you will pass.' (with comma) vs 'You will pass if you study.' (no comma)."
  },
  habits: {
    title: "10 Habits of Effective Learners 💡",
    badge: "Real Habits",
    message: "Explore 10 proven habits of fluent English learners! Each habit is crafted in the First Conditional and includes psychological explanations and audio pronunciation.",
    tip: "Sparky Tip: Use the search box to filter habits and toggle the invert button to practice clause switching!"
  },
  game: {
    title: "Matching Game with Sparky! 🎮",
    badge: "Challenge & Practice",
    message: "Time to test your skills! Your mission is to connect each of the 10 'If' condition clauses with its correct result. At the end, you will see your full review of correctly matched pairs and corrections for any mistakes, plus the protected teacher answer key!",
    tip: "Sparky Tip: Mistakes help you learn! The end-game review shows you the exact matching combinations for any mismatched pairs."
  }
};

export const MascotCompanion: React.FC<MascotCompanionProps> = ({
  activeTab,
  isInstructionsOpen,
  onSelectTab,
  onOpenInstructions,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [mood, setMood] = useState<'happy' | 'talking' | 'excited' | 'thinking' | 'waving'>('happy');
  const [showHeart, setShowHeart] = useState<boolean>(false);

  // Determine current active section guide
  const currentKey = isInstructionsOpen 
    ? 'instructions' 
    : (SECTION_GUIDES[activeTab] ? activeTab : 'welcome');

  const currentGuide = SECTION_GUIDES[currentKey] || SECTION_GUIDES.welcome;

  // Change mood dynamically on section change
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
    setMood('waving');
    const timer = setTimeout(() => {
      setMood('happy');
    }, 1800);
    return () => clearTimeout(timer);
  }, [activeTab, isInstructionsOpen]);

  // Audio voice trigger in English
  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      setMood('happy');
    } else {
      sound.playSelect();
      const textToSpeak = currentGuide.message;
      setIsSpeaking(true);
      setMood('talking');
      speakMascot(
        textToSpeak,
        'en-US',
        () => {
          setIsSpeaking(true);
          setMood('talking');
        },
        () => {
          setIsSpeaking(false);
          setMood('happy');
        }
      );
    }
  };

  const handleSparkyClick = () => {
    sound.playSelect();
    setMood('excited');
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1200);
    setTimeout(() => setMood('happy'), 2000);
  };

  return (
    <aside 
      aria-label="Sparky Mascot Guide"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 transition-all duration-300 max-w-[calc(100vw-1.5rem)] sm:max-w-md"
    >
      {/* Collapsed Pill Floating Mode */}
      {!isExpanded ? (
        <button
          onClick={() => {
            sound.playSelect();
            setIsExpanded(true);
          }}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white"
        >
          <div className="relative">
            <SparkyAvatar size="xs" mood={mood} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full" />
          </div>
          <span className="tracking-wide">Sparky 🦊 Active Guide</span>
          <ChevronUp className="w-4 h-4 text-white/90 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      ) : (
        /* Full Floating Companion Card */
        <div className="relative rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border-2 border-orange-200 overflow-hidden text-slate-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-4 py-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                Official Mascot
              </span>
              <span className="font-bold text-sm tracking-tight flex items-center gap-1">
                Sparky 🦊
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-white">
                EN
              </span>

              {/* Minimize */}
              <button
                onClick={() => {
                  sound.playSelect();
                  stopSpeaking();
                  setIsSpeaking(false);
                  setIsExpanded(false);
                }}
                className="p-1 rounded-lg hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
                title="Minimize guide"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="p-4 space-y-3.5 max-h-[75vh] overflow-y-auto">
            
            {/* Sparky Character & Speech Bubble */}
            <div className="flex items-start gap-3">
              <div 
                className="relative cursor-pointer shrink-0 pt-1" 
                onClick={handleSparkyClick}
                title="Click Sparky to interact!"
              >
                <SparkyAvatar size="md" mood={mood} isSpeaking={isSpeaking} />
                {showHeart && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 animate-bounce text-pink-500">
                    <Heart className="w-5 h-5 fill-pink-500" />
                  </div>
                )}
                <span className="block text-center text-[10px] font-black text-orange-600 mt-0.5">
                  Sparky
                </span>
              </div>

              {/* Speech Bubble */}
              <div className="flex-1 bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3 relative shadow-xs">
                {/* Bubble notch */}
                <div className="absolute top-4 -left-2 w-3 h-3 bg-amber-50/80 border-l border-b border-amber-200/90 transform rotate-45" />

                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.2 rounded-full">
                    {currentGuide.badge}
                  </span>
                  
                  {/* Audio Listen Button */}
                  <button
                    onClick={handleToggleVoice}
                    className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-orange-100 hover:bg-orange-200 text-orange-800'
                    }`}
                    title="Listen to explanation in English"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3 h-3" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-orange-600" />
                        <span>Voice 🔊</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 font-medium">
                  {currentGuide.message}
                </p>

                {/* Pro tip snippet */}
                <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-900 bg-white/70 rounded-xl p-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{currentGuide.tip}</span>
                </div>
              </div>
            </div>

            {/* Quick Section Invitations from Sparky */}
            <div className="space-y-1.5 pt-1 border-t border-slate-100">
              <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Sparky invites you to explore:</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {/* 1. Instructions */}
                <button
                  onClick={() => {
                    sound.playSelect();
                    onOpenInstructions();
                  }}
                  className={`flex items-center gap-1.5 p-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-left ${
                    isInstructionsOpen
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-rose-50/70 hover:bg-rose-100 text-rose-800 border-rose-200'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">1. Instructions</span>
                </button>

                {/* 2. Grammar Guide */}
                <button
                  onClick={() => {
                    sound.playSelect();
                    onSelectTab('grammar');
                  }}
                  className={`flex items-center gap-1.5 p-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-left ${
                    activeTab === 'grammar' && !isInstructionsOpen
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-indigo-50/70 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">2. Grammar Guide</span>
                </button>

                {/* Comma Lab */}
                <button
                  onClick={() => {
                    sound.playSelect();
                    onSelectTab('inverter');
                  }}
                  className={`flex items-center gap-1.5 p-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-left ${
                    activeTab === 'inverter' && !isInstructionsOpen
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-purple-50/70 hover:bg-purple-100 text-purple-800 border-purple-200'
                  }`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">3. Comma Lab</span>
                </button>

                {/* Habits */}
                <button
                  onClick={() => {
                    sound.playSelect();
                    onSelectTab('habits');
                  }}
                  className={`flex items-center gap-1.5 p-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-left ${
                    activeTab === 'habits' && !isInstructionsOpen
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-amber-50/70 hover:bg-amber-100 text-amber-800 border-amber-200'
                  }`}
                >
                  <BookmarkCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">4. 10 Habits</span>
                </button>

                {/* Game - full width button */}
                <button
                  onClick={() => {
                    sound.playSelect();
                    onSelectTab('game');
                  }}
                  className={`col-span-2 flex items-center justify-center gap-1.5 p-2 rounded-xl text-[11px] font-black border transition-all cursor-pointer ${
                    activeTab === 'game' && !isInstructionsOpen
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>5. Play 10-Sentence Matching Game!</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </aside>
  );
};
