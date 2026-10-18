import React from 'react';

export type EducationalIconType = 
  | 'book' 
  | 'notebook' 
  | 'pencil' 
  | 'abc' 
  | 'lightbulb' 
  | 'star' 
  | 'clock' 
  | 'headphones' 
  | 'speechBubble' 
  | 'puzzle' 
  | 'rocket';

interface FloatingIconConfig {
  id: string;
  type: EducationalIconType;
  top: string;
  side: 'left' | 'right';
  horizontalOffsetClass: string;
  sizeClass: string;
  animClass: string;
  delay: string;
  initialRotate: string;
  hideOnMobile?: boolean;
}

// Curated minimal icons for Grammar Guide (6 icons well spaced out to prevent visual overload)
const GRAMMAR_GUIDE_ICONS: FloatingIconConfig[] = [
  {
    id: 'gram-book',
    type: 'book',
    top: '5%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-2',
    sizeClass: 'w-9 h-9 sm:w-10 sm:h-10',
    animClass: 'animate-float-icon-4',
    delay: '0.5s',
    initialRotate: '12deg'
  },
  {
    id: 'gram-lightbulb',
    type: 'lightbulb',
    top: '22%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-2',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    animClass: 'animate-float-icon-1',
    delay: '1.4s',
    initialRotate: '-10deg'
  },
  {
    id: 'gram-pencil',
    type: 'pencil',
    top: '40%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-2',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    animClass: 'animate-float-icon-5',
    delay: '2.0s',
    initialRotate: '18deg'
  },
  {
    id: 'gram-abc',
    type: 'abc',
    top: '60%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-2',
    sizeClass: 'w-8 h-8 sm:w-10 sm:h-10',
    animClass: 'animate-float-icon-2',
    delay: '0.8s',
    initialRotate: '8deg'
  },
  {
    id: 'gram-puzzle',
    type: 'puzzle',
    top: '78%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-2',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    animClass: 'animate-float-icon-6',
    delay: '1.6s',
    initialRotate: '-14deg'
  },
  {
    id: 'gram-star',
    type: 'star',
    top: '94%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-1',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    animClass: 'animate-float-icon-3',
    delay: '1.1s',
    initialRotate: '15deg'
  }
];

// Curated minimal icons for Clause Order Lab (5 icons only, ample spacing)
const CLAUSE_ORDER_ICONS: FloatingIconConfig[] = [
  {
    id: 'co-speech',
    type: 'speechBubble',
    top: '7%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-2',
    sizeClass: 'w-9 h-9 sm:w-10 sm:h-10',
    animClass: 'animate-float-icon-2',
    delay: '0.4s',
    initialRotate: '-8deg'
  },
  {
    id: 'co-pencil',
    type: 'pencil',
    top: '24%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-2',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    animClass: 'animate-float-icon-5',
    delay: '1.2s',
    initialRotate: '18deg'
  },
  {
    id: 'co-puzzle',
    type: 'puzzle',
    top: '48%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-1 xl:-left-2',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    animClass: 'animate-float-icon-1',
    delay: '2.1s',
    initialRotate: '12deg'
  },
  {
    id: 'co-clock',
    type: 'clock',
    top: '72%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-2',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    animClass: 'animate-float-icon-4',
    delay: '0.8s',
    initialRotate: '-10deg'
  },
  {
    id: 'co-star',
    type: 'star',
    top: '90%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-1',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    animClass: 'animate-float-icon-3',
    delay: '1.7s',
    initialRotate: '14deg'
  }
];

// Curated minimal icons for Habits Library (5 icons only, ample spacing)
const HABITS_LIBRARY_ICONS: FloatingIconConfig[] = [
  {
    id: 'hab-book',
    type: 'book',
    top: '6%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-2',
    sizeClass: 'w-9 h-9 sm:w-10 sm:h-10',
    animClass: 'animate-float-icon-4',
    delay: '0.6s',
    initialRotate: '12deg'
  },
  {
    id: 'hab-lightbulb',
    type: 'lightbulb',
    top: '28%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-2',
    sizeClass: 'w-9 h-9 sm:w-10 sm:h-10',
    animClass: 'animate-float-icon-6',
    delay: '1.5s',
    initialRotate: '-12deg'
  },
  {
    id: 'hab-notebook',
    type: 'notebook',
    top: '52%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-2',
    sizeClass: 'w-9 h-9 sm:w-10 sm:h-10',
    animClass: 'animate-float-icon-3',
    delay: '2.4s',
    initialRotate: '-15deg'
  },
  {
    id: 'hab-headphones',
    type: 'headphones',
    top: '75%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-2',
    sizeClass: 'w-9 h-9 sm:w-10 sm:h-10',
    animClass: 'animate-float-icon-1',
    delay: '0.9s',
    initialRotate: '10deg'
  },
  {
    id: 'hab-star',
    type: 'star',
    top: '92%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-1',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    animClass: 'animate-float-icon-2',
    delay: '1.8s',
    initialRotate: '15deg'
  }
];

// Curated minimal icons for Matching Game (5 icons only, ample spacing)
const MATCHING_GAME_ICONS: FloatingIconConfig[] = [
  {
    id: 'game-rocket',
    type: 'rocket',
    top: '6%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-3',
    sizeClass: 'w-9 h-9 sm:w-11 sm:h-11',
    animClass: 'animate-float-icon-1',
    delay: '0.3s',
    initialRotate: '25deg'
  },
  {
    id: 'game-puzzle',
    type: 'puzzle',
    top: '27%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-2',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    animClass: 'animate-float-icon-2',
    delay: '1.4s',
    initialRotate: '14deg'
  },
  {
    id: 'game-abc',
    type: 'abc',
    top: '52%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-2',
    sizeClass: 'w-8 h-8 sm:w-10 sm:h-10',
    animClass: 'animate-float-icon-4',
    delay: '2.2s',
    initialRotate: '-10deg'
  },
  {
    id: 'game-headphones',
    type: 'headphones',
    top: '74%',
    side: 'left',
    horizontalOffsetClass: 'left-2 sm:left-3 lg:left-2 xl:-left-2',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    animClass: 'animate-float-icon-3',
    delay: '0.7s',
    initialRotate: '8deg'
  },
  {
    id: 'game-star',
    type: 'star',
    top: '91%',
    side: 'right',
    horizontalOffsetClass: 'right-2 sm:right-3 lg:right-2 xl:-right-1',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    animClass: 'animate-float-icon-5',
    delay: '1.9s',
    initialRotate: '12deg'
  }
];

interface FloatingBackgroundIconsProps {
  activeTab: string;
}

export interface BoxFlankIconsProps {
  leftIcon: EducationalIconType;
  rightIcon: EducationalIconType;
  leftAnimClass?: string;
  rightAnimClass?: string;
  leftDelay?: string;
  rightDelay?: string;
  leftRotate?: string;
  rightRotate?: string;
  leftTop?: string;
  rightTop?: string;
  sizeClass?: string;
}

export const BoxFlankIcons: React.FC<BoxFlankIconsProps> = ({
  leftIcon,
  rightIcon,
  leftAnimClass = 'animate-float-icon-1',
  rightAnimClass = 'animate-float-icon-2',
  leftDelay = '0.3s',
  rightDelay = '1.2s',
  leftRotate = '-10deg',
  rightRotate = '12deg',
  leftTop = '22%',
  rightTop = '62%',
  sizeClass = 'w-8 h-8 sm:w-9 sm:h-9'
}) => {
  return (
    <>
      {/* Left Icon flanking the box */}
      <div 
        className={`absolute -left-3 sm:-left-5 lg:-left-6 xl:-left-7 ${sizeClass} ${leftAnimClass} pointer-events-none select-none z-20 opacity-85 filter drop-shadow-md`}
        style={{
          top: leftTop,
          animationDelay: leftDelay
        }}
        aria-hidden="true"
      >
        <div 
          className="w-full h-full transform transition-transform duration-300"
          style={{ transform: `rotate(${leftRotate})` }}
        >
          <EducationalIconRenderer type={leftIcon} />
        </div>
      </div>

      {/* Right Icon flanking the box */}
      <div 
        className={`absolute -right-3 sm:-right-5 lg:-right-6 xl:-right-7 ${sizeClass} ${rightAnimClass} pointer-events-none select-none z-20 opacity-85 filter drop-shadow-md`}
        style={{
          top: rightTop,
          animationDelay: rightDelay
        }}
        aria-hidden="true"
      >
        <div 
          className="w-full h-full transform transition-transform duration-300"
          style={{ transform: `rotate(${rightRotate})` }}
        >
          <EducationalIconRenderer type={rightIcon} />
        </div>
      </div>
    </>
  );
};

export const FloatingBackgroundIcons: React.FC<FloatingBackgroundIconsProps> = ({ activeTab }) => {
  let iconsList: FloatingIconConfig[] = [];

  if (activeTab === 'inverter') {
    iconsList = CLAUSE_ORDER_ICONS;
  } else if (activeTab === 'habits') {
    iconsList = HABITS_LIBRARY_ICONS;
  } else if (activeTab === 'game') {
    iconsList = MATCHING_GAME_ICONS;
  } else {
    // For grammar tab, icons are placed exactly around each content box via BoxFlankIcons
    return null;
  }

  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none overflow-visible z-0" 
      aria-hidden="true"
    >
      {iconsList.map((icon) => (
        <div
          key={icon.id}
          className={`absolute ${icon.horizontalOffsetClass} ${icon.sizeClass} ${icon.animClass} ${
            icon.hideOnMobile ? 'hidden sm:block' : 'block'
          } opacity-85 transition-opacity duration-300 filter drop-shadow-md`}
          style={{
            top: icon.top,
            animationDelay: icon.delay
          }}
        >
          <div 
            className="w-full h-full transform transition-transform duration-300"
            style={{ transform: `rotate(${icon.initialRotate})` }}
          >
            <EducationalIconRenderer type={icon.type} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const EducationalIconRenderer: React.FC<{ type: EducationalIconType }> = ({ type }) => {
  switch (type) {
    case 'book':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M6 10C12 8 20 10 24 13C28 10 36 8 42 10V38C36 36 28 38 24 41C20 38 12 36 6 38V10Z" fill="#3B82F6" />
          <path d="M8 12C13 10 19 12 23 14V39C19 37 13 35 8 37V12Z" fill="#EFF6FF" />
          <path d="M40 12C35 10 29 12 25 14V39C29 37 35 35 40 37V12Z" fill="#DBEAFE" />
          <path d="M22 14V28L25 25L28 28V14" fill="#F59E0B" />
          <line x1="11" y1="18" x2="20" y2="19" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="24" x2="20" y2="25" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="19" x2="37" y2="18" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="25" x2="37" y2="24" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'notebook':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <rect x="12" y="6" width="28" height="36" rx="4" fill="#10B981" />
          <rect x="16" y="8" width="22" height="32" rx="2" fill="#ECFDF5" />
          <circle cx="12" cy="12" r="2.5" fill="#047857" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="12" cy="20" r="2.5" fill="#047857" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="12" cy="28" r="2.5" fill="#047857" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="12" cy="36" r="2.5" fill="#047857" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="19" y1="15" x2="33" y2="15" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="19" y1="21" x2="33" y2="21" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="19" y1="27" x2="33" y2="27" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="31" cy="33" r="3.5" fill="#F59E0B" />
        </svg>
      );

    case 'pencil':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <g transform="rotate(-35 24 24)">
            <rect x="20" y="6" width="8" height="7" rx="2" fill="#F43F5E" />
            <rect x="20" y="13" width="8" height="4" fill="#CBD5E1" />
            <rect x="20" y="17" width="8" height="20" fill="#FBBF24" />
            <line x1="24" y1="17" x2="24" y2="37" stroke="#D97706" strokeWidth="1" />
            <polygon points="20,37 28,37 24,44" fill="#FDE68A" />
            <polygon points="22.5,41.5 25.5,41.5 24,44" fill="#1E293B" />
          </g>
        </svg>
      );

    case 'abc':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <rect x="5" y="12" width="18" height="18" rx="4" fill="#EC4899" />
          <text x="14" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">A</text>
          <rect x="25" y="6" width="18" height="18" rx="4" fill="#8B5CF6" />
          <text x="34" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">B</text>
          <rect x="16" y="24" width="18" height="18" rx="4" fill="#06B6D4" />
          <text x="25" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">C</text>
        </svg>
      );

    case 'lightbulb':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M24 4V8M10 13L13 16M38 13L35 16M6 24H10M38 24H42" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M24 10C17.4 10 12 15.4 12 22C12 26.2 14.1 29.8 17.5 32V35C17.5 35.8 18.2 36.5 19 36.5H29C29.8 36.5 30.5 35.8 30.5 35V32C33.9 29.8 36 26.2 36 22C36 15.4 30.6 10 24 10Z" fill="#FBBF24" />
          <circle cx="21" cy="18" r="2" fill="#FEF08A" />
          <path d="M20 22L22 18L26 18L28 22" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="20" y="37" width="8" height="3" rx="1.5" fill="#94A3B8" />
          <path d="M22 40H26C26 41.5 25 43 24 43C23 43 22 41.5 22 40Z" fill="#64748B" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M24 4L29.5 16.5L43 18.2L33 27.5L35.8 41L24 34.3L12.2 41L15 27.5L5 18.2L18.5 16.5L24 4Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M24 9L27.5 17.5L36.5 18.8L30 25L31.8 33.5L24 29" fill="#FEF08A" opacity="0.75" />
          <circle cx="21" cy="22" r="1.5" fill="#78350F" />
          <circle cx="27" cy="22" r="1.5" fill="#78350F" />
          <path d="M22 26C23 27 25 27 26 26" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'clock':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <circle cx="24" cy="24" r="18" fill="#0EA5E9" />
          <circle cx="24" cy="24" r="14" fill="#F0F9FF" />
          <circle cx="24" cy="24" r="2" fill="#0369A1" />
          <line x1="24" y1="24" x2="24" y2="15" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="24" x2="31" y2="24" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="12" r="1" fill="#BAE6FD" />
          <circle cx="36" cy="24" r="1" fill="#BAE6FD" />
          <circle cx="24" cy="36" r="1" fill="#BAE6FD" />
          <circle cx="12" cy="24" r="1" fill="#BAE6FD" />
        </svg>
      );

    case 'headphones':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M10 24C10 16 16.5 10 24 10C31.5 10 38 16 38 24" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
          <path d="M17 12C19 11 21.5 10.5 24 10.5C26.5 10.5 29 11 31 12" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
          <rect x="7" y="22" width="7" height="15" rx="3.5" fill="#4F46E5" />
          <rect x="11" y="24" width="4" height="11" rx="2" fill="#818CF8" />
          <rect x="34" y="22" width="7" height="15" rx="3.5" fill="#4F46E5" />
          <rect x="33" y="24" width="4" height="11" rx="2" fill="#818CF8" />
          <circle cx="24" cy="28" r="2" fill="#C7D2FE" />
        </svg>
      );

    case 'speechBubble':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M8 12C8 8.7 10.7 6 14 6H34C37.3 6 40 8.7 40 12V26C40 29.3 37.3 32 34 32H18L10 39V32H14C10.7 32 8 29.3 8 26V12Z" fill="#10B981" />
          <text x="24" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">If...?</text>
        </svg>
      );

    case 'puzzle':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M14 10H21C21 7.8 22.3 6 24 6C25.7 6 27 7.8 27 10H34C36.2 10 38 11.8 38 14V21C40.2 21 42 22.3 42 24C42 25.7 40.2 27 38 27V34C38 36.2 36.2 38 34 38H27C27 35.8 25.7 34 24 34C22.3 34 21 35.8 21 38H14C11.8 38 10 36.2 10 34V27C12.2 27 14 25.7 14 24C14 22.3 12.2 21 10 21V14C10 11.8 11.8 10 14 10Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M16 13H21C21.8 11.5 22.8 10 24 10" stroke="#FDBA74" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'rocket':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <g transform="rotate(25 24 24)">
            <path d="M21 36L24 43L27 36C27 38 25.5 40 24 40C22.5 40 21 38 21 36Z" fill="#F59E0B" />
            <path d="M22.5 36L24 40L25.5 36Z" fill="#EF4444" />
            <path d="M24 6C18 14 17 26 17 34H31C31 26 30 14 24 6Z" fill="#EC4899" />
            <path d="M24 6C21.5 10 20 14 19 18H29C28 14 26.5 10 24 6Z" fill="#BE185D" />
            <circle cx="24" cy="22" r="3.5" fill="#E0F2FE" stroke="#BE185D" strokeWidth="1.5" />
            <path d="M17 28L11 35L17 34Z" fill="#9333EA" />
            <path d="M31 28L37 35L31 34Z" fill="#9333EA" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};
