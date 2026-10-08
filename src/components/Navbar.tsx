import React from 'react';
import { BookOpen, Gamepad2, ArrowLeftRight, BookmarkCheck, HelpCircle, GraduationCap } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenInstructions: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenInstructions }) => {
  const tabs = [
    { 
      id: 'grammar', 
      label: 'Grammar Guide', 
      icon: BookOpen, 
      activeClass: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 border-indigo-600',
      inactiveClass: 'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 border-indigo-200'
    },
    { 
      id: 'game', 
      label: 'Matching Game', 
      icon: Gamepad2, 
      activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 border-emerald-600',
      inactiveClass: 'bg-emerald-50/80 text-emerald-700 hover:bg-emerald-100 border-emerald-200'
    },
    { 
      id: 'inverter', 
      label: 'Clause Order Lab', 
      icon: ArrowLeftRight, 
      activeClass: 'bg-purple-600 text-white shadow-md shadow-purple-500/20 border-purple-600',
      inactiveClass: 'bg-purple-50/80 text-purple-700 hover:bg-purple-100 border-purple-200'
    },
    { 
      id: 'habits', 
      label: 'Habits Library', 
      icon: BookmarkCheck, 
      activeClass: 'bg-amber-600 text-white shadow-md shadow-amber-500/20 border-amber-600',
      inactiveClass: 'bg-amber-50/80 text-amber-700 hover:bg-amber-100 border-amber-200'
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & App Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onSelectTab('grammar')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                  First Conditional
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 border border-purple-200 rounded-full">
                  Study Habits Edition
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  style={idx === 0 ? { borderColor: '#fff2f2' } : undefined}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 ${
                    isActive ? tab.activeClass : tab.inactiveClass
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Instructions Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenInstructions}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 active:scale-95 rounded-xl transition-all cursor-pointer shadow-md shadow-rose-500/25"
              title="How to use the app"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Instructions</span>
              <span className="sm:hidden">Guide</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center gap-1.5 pb-3 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors border ${
                  isActive ? tab.activeClass : tab.inactiveClass
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
