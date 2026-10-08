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
import { GraduationCap, BookOpen, Gamepad2, ArrowLeftRight, BookmarkCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('grammar');
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" style={{ backgroundColor: '#dcfbba' }}>
        {activeTab === 'grammar' && (
          <GrammarGuide 
            onStartGame={() => setActiveTab('game')} 
            onGoToOrderLab={() => setActiveTab('inverter')} 
          />
        )}

        {activeTab === 'game' && <MatchingGame />}

        {activeTab === 'inverter' && <OrderInverterLab />}

        {activeTab === 'habits' && <HabitsLibrary />}
      </main>

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsInstructionsOpen(false);
        }}
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
              onClick={() => setActiveTab('grammar')} 
              className="hover:text-indigo-600 transition-colors cursor-pointer"
              style={{ fontWeight: 'bold', color: '#2a478c' }}
            >
              Grammar Theory
            </button>
            <button 
              onClick={() => setActiveTab('game')} 
              className="hover:text-indigo-600 transition-colors cursor-pointer"
              style={{ fontWeight: 'bold', color: '#014d01' }}
            >
              Matching Game
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
              onClick={() => setIsInstructionsOpen(true)} 
              className="hover:text-indigo-600 transition-colors cursor-pointer text-indigo-600"
              style={{ fontWeight: 'bold' }}
            >
              How to Use
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
