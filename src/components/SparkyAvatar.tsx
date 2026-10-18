import React from 'react';

interface SparkyAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'talking' | 'excited' | 'thinking' | 'waving';
  className?: string;
  isSpeaking?: boolean;
}

export const SparkyAvatar: React.FC<SparkyAvatarProps> = ({
  size = 'md',
  mood = 'happy',
  className = '',
  isSpeaking = false,
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }[size];

  return (
    <div className={`relative inline-block select-none shrink-0 ${sizeClasses} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-md transition-transform duration-300 ${
          isSpeaking ? 'animate-bounce' : 'hover:scale-105'
        }`}
      >
        <defs>
          {/* Fur Gradients */}
          <linearGradient id="foxFur" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="foxFurLight" x1="30" y1="40" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FFF7ED" />
          </linearGradient>

          {/* Ear Inner Gradient */}
          <linearGradient id="earInner" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#FDA4AF" />
          </linearGradient>

          {/* Scholar Cap Gradient */}
          <linearGradient id="scholarCap" x1="20" y1="10" x2="100" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>

          {/* Gold Sparkle */}
          <linearGradient id="goldTassel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>

          {/* Glasses Gradient */}
          <linearGradient id="glassesFrame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Aura / Halo */}
        <circle cx="60" cy="62" r="50" fill="#FFEDD5" opacity="0.4" />

        {/* Left Ear */}
        <path
          d="M 28 48 L 18 16 C 18 16 38 22 44 38 Z"
          fill="url(#foxFur)"
          stroke="#C2410C"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M 27 42 L 23 22 C 23 22 36 26 40 36 Z"
          fill="url(#earInner)"
        />

        {/* Right Ear */}
        <path
          d="M 92 48 L 102 16 C 102 16 82 22 76 38 Z"
          fill="url(#foxFur)"
          stroke="#C2410C"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M 93 42 L 97 22 C 97 22 84 26 80 36 Z"
          fill="url(#earInner)"
        />

        {/* Head Base */}
        <path
          d="M 24 64 C 20 84 38 104 60 104 C 82 104 100 84 96 64 C 94 44 78 36 60 36 C 42 36 26 44 24 64 Z"
          fill="url(#foxFur)"
          stroke="#C2410C"
          strokeWidth="2.5"
        />

        {/* White Cheeks & Muzzle */}
        <path
          d="M 28 66 C 24 78 36 96 60 98 C 84 96 96 78 92 66 C 84 68 76 72 60 72 C 44 72 36 68 28 66 Z"
          fill="url(#foxFurLight)"
        />
        <path
          d="M 46 72 C 50 68 70 68 74 72 C 78 80 68 94 60 94 C 52 94 42 80 46 72 Z"
          fill="#FFF"
        />

        {/* Rosy Cheeks */}
        <ellipse cx="34" cy="74" rx="6" ry="4" fill="#F43F5E" opacity="0.45" />
        <ellipse cx="86" cy="74" rx="6" ry="4" fill="#F43F5E" opacity="0.45" />

        {/* Eyes */}
        {mood === 'excited' ? (
          // Star/Wink eyes
          <>
            <path d="M 40 59 Q 47 52 54 59" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 66 59 Q 73 52 80 59" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          // Big lively eyes
          <>
            <ellipse cx="46" cy="58" rx="6.5" ry="7.5" fill="#0F172A" />
            <circle cx="48" cy="55.5" r="2.8" fill="#FFF" />
            <circle cx="44" cy="61" r="1.3" fill="#FFF" />

            <ellipse cx="74" cy="58" rx="6.5" ry="7.5" fill="#0F172A" />
            <circle cx="76" cy="55.5" r="2.8" fill="#FFF" />
            <circle cx="72" cy="61" r="1.3" fill="#FFF" />
          </>
        )}

        {/* Glasses (Scholar Look) */}
        <g stroke="url(#glassesFrame)" strokeWidth="2.5" fill="none">
          <circle cx="46" cy="58" r="10.5" />
          <circle cx="74" cy="58" r="10.5" />
          <path d="M 56.5 58 Q 60 56 63.5 58" strokeWidth="2.5" />
          {/* Glass shine */}
          <path d="M 42 51 L 49 53" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 70 51 L 77 53" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Nose */}
        <path
          d="M 56 73 C 58 71 62 71 64 73 C 65 75 60 78 60 78 C 60 78 55 75 56 73 Z"
          fill="#0F172A"
        />

        {/* Mouth */}
        {isSpeaking || mood === 'talking' ? (
          <path
            d="M 54 81 Q 60 90 66 81 Z"
            fill="#E11D48"
            stroke="#0F172A"
            strokeWidth="1.8"
          />
        ) : (
          <path
            d="M 53 79 Q 60 85 67 79"
            stroke="#0F172A"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Scholar Graduation Cap */}
        <g id="cap">
          {/* Base band */}
          <ellipse cx="60" cy="34" rx="20" ry="6" fill="#1E1B4B" />
          {/* Diamond top plate */}
          <polygon
            points="60,18 90,27 60,36 30,27"
            fill="url(#scholarCap)"
            stroke="#6366F1"
            strokeWidth="1.5"
          />
          {/* Cap button */}
          <circle cx="60" cy="27" r="3" fill="url(#goldTassel)" />
          {/* Tassel cord and ribbon */}
          <path
            d="M 60 27 Q 76 30 80 40 L 82 46"
            stroke="url(#goldTassel)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="82" cy="47" r="2.2" fill="#F59E0B" />
        </g>

        {/* Little Paws holding a notepad/badge */}
        <g id="paws">
          <ellipse cx="38" cy="98" rx="7" ry="5" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.8" />
          <ellipse cx="82" cy="98" rx="7" ry="5" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.8" />
          {/* Paw pads */}
          <circle cx="38" cy="97" r="2" fill="#FDBA74" />
          <circle cx="82" cy="97" r="2" fill="#FDBA74" />
        </g>

        {/* Floating Sparkle stars */}
        <path
          d="M 14 36 L 16 31 L 21 29 L 16 27 L 14 22 L 12 27 L 7 29 L 12 31 Z"
          fill="#FDE047"
          opacity="0.9"
        />
        <path
          d="M 104 36 L 106 31 L 111 29 L 106 27 L 104 22 L 102 27 L 97 29 L 102 31 Z"
          fill="#FDE047"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};
