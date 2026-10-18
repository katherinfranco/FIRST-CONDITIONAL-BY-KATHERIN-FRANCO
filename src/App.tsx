/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GrammarGuide } from './components/GrammarGuide';
import { MatchingGame } from './components/MatchingGame';
import { OrderInverterLab } from './components/OrderInverterLab';
import { HabitsLibrary } from './components/HabitsLibrary';
import { InstructionsModal } from './components/InstructionsModal';
import { MascotCompanion } from './components/MascotCompanion';
import { FloatingBackgroundIcons } from './components/FloatingBackgroundIcons';
import { GraduationCap, BookOpen, Gamepad2, ArrowLeftRight, BookmarkCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('grammar');
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  const goToGrammarGuideUses = () => {
    if (activeTab !== 'grammar') {
      setActiveTab('grammar');
    }
    // Scroll directly to 1. Uses of the first conditional
    setTimeout(() => {
      const el = document.getElementById('uses-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const goToWelcome = () => {
    if (activeTab !== 'grammar') {
      setActiveTab('grammar');
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 40);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        onGoToGrammarGuide={goToGrammarGuideUses}
        onGoToWelcome={goToWelcome}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative" style={{ backgroundColor: '#dcfbba' }}>
        {/* Animated Floating Background Icons surrounding the explanation and practice boxes */}
        <FloatingBackgroundIcons activeTab={activeTab} />

        <div className="relative z-10">
          {activeTab === 'grammar' && (
            <GrammarGuide 
              onStartGame={() => setActiveTab('game')} 
              onGoToOrderLab={() => setActiveTab('inverter')} 
              onOpenInstructions={() => setIsInstructionsOpen(true)}
              onGoToHabits={() => setActiveTab('habits')}
            />
          )}

          {activeTab === 'game' && <MatchingGame />}

          {activeTab === 'inverter' && <OrderInverterLab />}

          {activeTab === 'habits' && <HabitsLibrary />}
        </div>
      </main>

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        onNavigateTab={(tab) => {
          if (tab === 'grammar') {
            goToGrammarGuideUses();
          } else {
            setActiveTab(tab);
          }
          setIsInstructionsOpen(false);
        }}
      />

      {/* Persistent Mascot Companion: Sparky */}
      <MascotCompanion
        activeTab={activeTab}
        isInstructionsOpen={isInstructionsOpen}
        onSelectTab={(tab) => {
          if (tab === 'grammar') {
            goToGrammarGuideUses();
          } else {
            setActiveTab(tab);
          }
          setIsInstructionsOpen(false);
        }}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-800" style={{ color: '#653d93', fontWeight: 'bold' }}>First Conditional Master</span>
            <span style={{ color: '#ff2828', fontWeight: 'bold' }}>— 10 Habits of Effective English Learners</span>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <button 
              onClick={goToWelcome} 
              className="hover:text-amber-600 transition-colors cursor-pointer text-amber-600 font-extrabold flex items-center gap-1"
            >
              <span>Welcome</span>
            </button>
            <button 
              onClick={() => setIsInstructionsOpen(true)} 
              className="hover:text-indigo-600 transition-colors cursor-pointer text-indigo-600"
              style={{ fontWeight: 'bold' }}
            >
              How to Use
            </button>
            <button 
              onClick={goToGrammarGuideUses} 
              className="hover:text-indigo-600 transition-colors cursor-pointer"
              style={{ fontWeight: 'bold', color: '#2a478c' }}
            >
              Grammar Theory
            </button>
            <button 
              onClick={() => setActiveTab('inverter')} 
              className="hover:text-indigo-600 transition-colors cursor-pointer"
              style={{ color: '#063d3b', fontWeight: 'bold' }}
            >
              Comma Lab
            </button>
            <button 
              onClick={() => setActiveTab('habits')} 
              className="hover:text-indigo-600 transition-colors cursor-pointer"
              style={{ fontWeight: 'bold', color: '#580a59' }}
            >
              Habits Library
            </button>
            <button 
              onClick={() => setActiveTab('game')} 
              className="hover:text-indigo-600 transition-colors cursor-pointer"
              style={{ fontWeight: 'bold', color: '#014d01' }}
            >
              Matching Game
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
