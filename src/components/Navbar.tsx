import React from 'react';
import { BookOpen, Gamepad2, ArrowLeftRight, BookmarkCheck, HelpCircle, GraduationCap } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenInstructions: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenInstructions }) => {
  const tabs = [
    { id: 'grammar', label: 'Grammar Guide', icon: BookOpen, badge: 'Theory & Rules' },
    { id: 'game', label: 'Matching Game', icon: Gamepad2, badge: '10 Habit Pairs' },
    { id: 'inverter', label: 'Clause Order Lab', icon: ArrowLeftRight, badge: 'Comma Rule' },
    { id: 'habits', label: 'Habits Library', icon: BookmarkCheck, badge: 'All 10 Sentences' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & App Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onSelectTab('grammar')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800 bg-clip-text text-transparent">
                  First Conditional
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-full">
                  Study Habits Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Master real conditions & effective learner habits</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Instructions Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenInstructions}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:scale-95 border border-slate-200/80 rounded-xl transition-all cursor-pointer shadow-xs"
              title="How to use the app"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Instructions</span>
              <span className="sm:hidden">Guide</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
