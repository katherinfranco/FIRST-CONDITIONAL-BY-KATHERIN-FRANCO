import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  Lock, 
  Unlock, 
  KeyRound, 
  GraduationCap, 
  UserCheck, 
  HelpCircle, 
  Copy, 
  Check, 
  Printer, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Flame, 
  X,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { SentenceHabit, MatchedPairRecord, IncorrectAttemptRecord } from '../types';
import { speakEnglish } from '../utils/audio';
import { SparkyAvatar } from './SparkyAvatar';

interface MatchingResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  score: number;
  formattedTime: string;
  highestStreak: number;
  mistakes: number;
  correctMatches: MatchedPairRecord[];
  incorrectAttempts: IncorrectAttemptRecord[];
  allSentences: SentenceHabit[];
  initialTab?: 'student' | 'teacher';
}

export const MatchingResultsModal: React.FC<MatchingResultsModalProps> = ({
  isOpen,
  onClose,
  onPlayAgain,
  score,
  formattedTime,
  highestStreak,
  mistakes,
  correctMatches,
  incorrectAttempts,
  allSentences,
  initialTab = 'student',
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>(initialTab);
  
  // Teacher verification state
  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState<boolean>(false);
  const [teacherPin, setTeacherPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalAttempts = correctMatches.length + mistakes;
  const accuracyPercent = totalAttempts > 0 
    ? Math.round((correctMatches.length / totalAttempts) * 100) 
    : 100;

  const handleUnlockTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = teacherPin.trim().toLowerCase();
    // Allow '1234', 'docente', 'teacher' as valid pins
    if (cleanPin === '1234' || cleanPin === 'docente' || cleanPin === 'teacher') {
      setIsTeacherUnlocked(true);
      setPinError(null);
      setTeacherPin('');
    } else {
      setPinError('PIN incorrecto. Usa el PIN predeterminado: 1234');
    }
  };

  const handleCopyKey = () => {
    const keyText = allSentences.map((s) => (
      `${s.id}. [Habit: ${s.habitTitle}]\n` +
      `   If-Clause (Condition): ${s.conditionClause}, (Verb: ${s.conditionVerb})\n` +
      `   Main Clause (Result): ${s.resultClause}. (Verb: ${s.resultVerb})\n` +
      `   Full Sentence: "${s.fullSentence}"\n`
    )).join('\n');

    navigator.clipboard.writeText(
      `--- CLAVE MAESTRA DE RESPUESTAS (SOLO DOCENTE) ---\n` +
      `Actividad: Habits Matching Game (First Conditional - 10 Oraciones)\n\n` +
      keyText
    ).then(() => {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2500);
    }).catch(() => {
      // Fallback
    });
  };

  const handlePrintKey = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <div className="flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3.5">
              <SparkyAvatar size="sm" mood="excited" className="shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Juego Completado • 10/10 Parejas
                  </span>
                  <span className="text-xs text-slate-300 hidden sm:inline">First Conditional</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                  Revisión y Resultados del Matching Game
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dual Tabs: Estudiante vs Docente */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Resultados del Estudiante</span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                {correctMatches.length}/10
              </span>
            </button>

            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'teacher'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-[1.02]'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {isTeacherUnlocked ? (
                <Unlock className="w-4 h-4 text-amber-900" />
              ) : (
                <Lock className="w-4 h-4 text-amber-300" />
              )}
              <span>Clave del Docente (Solo Docente)</span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-amber-200 text-amber-950">
                {isTeacherUnlocked ? 'Desbloqueada' : 'Protegida'}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">

          {/* ======================================================== */}
          {/* TAB 1: RESULTADOS DEL ESTUDIANTE                         */}
          {/* ======================================================== */}
          {activeTab === 'student' && (
            <div className="space-y-6">
              
              {/* Scorecard summary banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
                <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Puntaje Final</span>
                  </div>
                  <div className="text-xl font-black text-indigo-700 font-mono mt-0.5">{score} pts</div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase">
                    <Clock className="w-3.5 h-3.5 text-purple-500" />
                    <span>Tiempo Total</span>
                  </div>
                  <div className="text-xl font-black text-slate-800 font-mono mt-0.5">{formattedTime}</div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>Racha Máxima</span>
                  </div>
                  <div className="text-xl font-black text-amber-600 font-mono mt-0.5">{highestStreak}x</div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Precisión</span>
                  </div>
                  <div className="text-xl font-black text-emerald-600 font-mono mt-0.5">{accuracyPercent}%</div>
                </div>
              </div>

              {/* SECCIÓN 1: PAREJAS EMPAREJADAS CORRECTAMENTE */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        Parejas que Emparejaste Correctamente
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Completaste exitosamente las {correctMatches.length} oraciones condicionales sobre hábitos de estudio.
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 self-start sm:self-auto">
                    {correctMatches.length} de 10 Acertadas
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {correctMatches.map((pair, index) => (
                    <div 
                      key={`correct-${pair.sentenceId}-${index}`}
                      className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 hover:border-emerald-300 transition-all shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2 py-0.5 rounded-md border border-emerald-300/80">
                            {pair.habitTitle}
                          </span>
                        </div>

                        <button
                          onClick={() => speakEnglish(pair.fullSentence)}
                          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300/90 flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
                          title="Escuchar pronunciación completa"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Escuchar en Inglés</span>
                        </button>
                      </div>

                      {/* The paired clauses breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 my-2">
                        <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 shadow-2xs">
                          <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>If-Clause (Condición)</span>
                          </div>
                          <div className="text-sm font-bold text-slate-800 mt-1">
                            {pair.conditionText}
                          </div>
                          <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                            Verbo en Present Simple: <strong className="underline">{pair.conditionVerb}</strong>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-indigo-200/80 shadow-2xs">
                          <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <span>Main Clause (Resultado)</span>
                          </div>
                          <div className="text-sm font-bold text-slate-800 mt-1">
                            {pair.resultText}
                          </div>
                          <div className="text-[11px] text-indigo-700 font-medium mt-0.5">
                            Resultado futuro: <strong className="underline">{pair.resultVerb}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Full Sentence & Insight */}
                      <div className="pt-2 border-t border-emerald-200/60 mt-2 text-xs">
                        <p className="text-slate-800 font-semibold italic">
                          &quot;{pair.fullSentence}&quot;
                        </p>
                        <p className="text-slate-600 mt-1">
                          💡 <strong>Hábito clave:</strong> {pair.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECCIÓN 2: PAREJAS INCORRECTAS Y SUS COMBINACIONES CORRECTAS */}
              <div className="space-y-3 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black">
                      <XCircle className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        Parejas Incorrectas y sus Combinaciones Correctas
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Revisa los intentos que no coincidieron para comprender la relación de causa y efecto correcta.
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${
                    incorrectAttempts.length === 0
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border-rose-300'
                  }`}>
                    {incorrectAttempts.length === 0 ? '0 Errores (¡Perfecto!)' : `${incorrectAttempts.length} Intentos Incorrectos`}
                  </span>
                </div>

                {incorrectAttempts.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-300 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <Sparkles className="w-6 h-6 text-amber-200 animate-pulse" />
                    </div>
                    <h4 className="text-lg font-extrabold text-emerald-950">
                      ¡Desempeño Impecable! Cero Parejas Incorrectas
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto font-medium">
                      Emparejaste cada condición con su resultado correcto en el primer intento. Demostraste un dominio total de la lógica de causa y efecto del Primer Condicional.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3.5">
                    {incorrectAttempts.map((attempt, idx) => (
                      <div 
                        key={attempt.id || `mistake-${idx}`}
                        className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 border-2 border-rose-200 hover:border-rose-300 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-rose-200 text-rose-950 border border-rose-300">
                              Error #{idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-700">
                              Hábito: {attempt.targetHabitTitle}
                            </span>
                          </div>
                          <span className="text-[11px] text-rose-700 font-semibold bg-rose-100 px-2 py-0.5 rounded-full">
                            Clausulas incompatibles
                          </span>
                        </div>

                        {/* Comparación visual: Lo que intentaste VS Lo correcto */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          
                          {/* Lo que intentaste */}
                          <div className="p-3 rounded-xl bg-white border border-rose-300 shadow-2xs space-y-1.5">
                            <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 uppercase tracking-wider">
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              <span>Tu intento incorrecto:</span>
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-700 bg-rose-50/80 p-2 rounded-lg border border-rose-100">
                              <span className="text-slate-900 font-bold">{attempt.conditionText}</span>{' '}
                              <span className="text-rose-700 font-bold underline decoration-wavy">{attempt.chosenResultText}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug">
                              Esta consecuencia no es el resultado lógico directo de esa condición de estudio.
                            </p>
                          </div>

                          {/* La combinación correcta */}
                          <div className="p-3 rounded-xl bg-white border border-emerald-300 shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase tracking-wider">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Combinación correcta:</span>
                              </div>
                              <button
                                onClick={() => speakEnglish(attempt.correctFullSentence)}
                                className="p-1 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                                title="Escuchar oración correcta"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-900 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                              <span className="text-slate-900 font-bold">{attempt.conditionText}</span>{' '}
                              <span className="text-emerald-700 font-extrabold">{attempt.correctResultText}</span>
                            </div>
                            <p className="text-[11px] text-emerald-800 font-medium leading-snug">
                              &quot;{attempt.correctFullSentence}&quot;
                            </p>
                          </div>

                        </div>

                        {/* Clarificación de dónde pertenecía el resultado que eligió */}
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-amber-900">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>¿A qué condición pertenecía el resultado que elegiste?</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            El resultado <strong className="text-amber-900">&quot;{attempt.chosenResultText}&quot;</strong> le corresponde en realidad a la condición:{' '}
                            <strong className="text-indigo-900">&quot;{attempt.actualConditionForResultText},&quot;</strong>.
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: CLAVE DE RESPUESTAS (SOLO PARA EL DOCENTE)        */}
          {/* ======================================================== */}
          {activeTab === 'teacher' && (
            <div className="space-y-6">

              {/* Si no está desbloqueada por el docente */}
              {!isTeacherUnlocked ? (
                <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-50/90 via-orange-50/70 to-amber-100/60 border-2 border-amber-300 text-center space-y-5 shadow-md">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Lock className="w-8 h-8 text-amber-100" />
                  </div>

                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-200 text-amber-950 border border-amber-300">
                      Acceso Exclusivo para Docentes
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Clave de Respuestas Protegida
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Esta sección contiene la clave maestra oficial de respuestas y la guía pedagógica de evaluación de las 10 oraciones. Ingresa el PIN docente para desbloquearla.
                    </p>
                  </div>

                  <form onSubmit={handleUnlockTeacher} className="space-y-3 pt-2">
                    <div>
                      <label htmlFor="teacher-pin" className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                        PIN de Acceso Docente:
                      </label>
                      <div className="relative">
                        <input
                          id="teacher-pin"
                          type="password"
                          value={teacherPin}
                          onChange={(e) => {
                            setTeacherPin(e.target.value);
                            setPinError(null);
                          }}
                          placeholder="Ingresa PIN (predeterminado: 1234)"
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 bg-white text-slate-900 font-mono text-center tracking-widest text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-inner"
                          autoFocus
                        />
                        <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                      </div>
                    </div>

                    {pinError && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold justify-center bg-rose-50 p-2 rounded-lg border border-rose-200">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{pinError}</span>
                      </div>
                    )}

                    <div className="text-[11px] text-slate-500 bg-white/80 p-2 rounded-xl border border-amber-200/60">
                      💡 <strong>Pista para evaluación / demo:</strong> El PIN por defecto es <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-bold">1234</code>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                    >
                      <Unlock className="w-4 h-4 text-slate-950" />
                      <span>Desbloquear Clave Docente</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* Clave Docente DESBLOQUEADA */
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Banner de Verificación Docente y Herramientas */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/20 border-2 border-amber-400/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-300 text-slate-950">
                            Modo Docente Activo
                          </span>
                          <span className="text-xs text-amber-950 font-bold">Clave Maestra Oficial</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                          Guía y Clave de Respuestas para el Docente
                        </h3>
                      </div>
                    </div>

                    {/* Teacher Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleCopyKey}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                        title="Copiar las 10 oraciones al portapapeles"
                      >
                        {copiedKey ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-600" />
                            <span>Copiar Clave</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handlePrintKey}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                        title="Imprimir clave"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" />
                        <span>Imprimir</span>
                      </button>

                      <button
                        onClick={() => setIsTeacherUnlocked(false)}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                        title="Volver a bloquear para proteger la clave"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Bloquear</span>
                      </button>
                    </div>
                  </div>

                  {/* Resumen Pedagógico del Estudiante para el Docente */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Rúbrica de Rendimiento del Estudiante en esta Sesión:</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Aciertos:</span>
                        <strong className="text-emerald-700 text-sm">{correctMatches.length} de 10 (100% completado)</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Intentos Fallidos:</span>
                        <strong className="text-rose-700 text-sm">{mistakes} fallos registrados</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Tasa de Acierto:</span>
                        <strong className="text-indigo-700 text-sm">{accuracyPercent}%</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Tiempo de Resolución:</span>
                        <strong className="text-purple-700 text-sm">{formattedTime}</strong>
                      </div>
                    </div>
                  </div>

                  {/* LAS 10 ORACIONES CANÓNICAS NUMERADAS CON SU ANÁLISIS GRAMATICAL */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                          Clave Maestra: Las 10 Oraciones Oficiales
                        </h4>
                        <p className="text-xs text-slate-500">
                          Estructura: If + Present Simple, will + Base Verb (con puntuación canónica: comas en condición, puntos/interrogación en resultado).
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                        10 Oraciones
                      </span>
                    </div>

                    <div className="space-y-3">
                      {allSentences.map((sentence) => (
                        <div 
                          key={`teacher-key-${sentence.id}`}
                          className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-indigo-300 transition-all shadow-2xs space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg bg-indigo-900 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                                {sentence.id}
                              </span>
                              <div>
                                <span className="text-xs font-black text-slate-900">
                                  {sentence.habitTitle}
                                </span>
                                <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                                  Categoría: {sentence.category}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => speakEnglish(sentence.fullSentence)}
                              className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-xl transition-all border border-indigo-200/60 cursor-pointer"
                              title="Reproducir pronunciación oficial"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Las dos cláusulas separadas */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                              <div className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                                1. Cláusula Condición (If-Clause) [con coma]
                              </div>
                              <div className="text-xs sm:text-sm font-bold text-emerald-950 mt-0.5">
                                {sentence.conditionClause},
                              </div>
                              <div className="text-[11px] text-emerald-700 mt-1">
                                Verbo: <span className="font-mono font-bold bg-white px-1.5 py-0.2 rounded border border-emerald-200">{sentence.conditionVerb}</span> (Present Simple)
                              </div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200">
                              <div className="text-[10px] font-black uppercase text-indigo-800 tracking-wider">
                                2. Cláusula Principal (Main Clause) [con punto / ?]
                              </div>
                              <div className="text-xs sm:text-sm font-bold text-indigo-950 mt-0.5">
                                {sentence.resultClause.endsWith('.') || sentence.resultClause.endsWith('?')
                                  ? sentence.resultClause
                                  : `${sentence.resultClause}.`}
                              </div>
                              <div className="text-[11px] text-indigo-700 mt-1">
                                Verbo: <span className="font-mono font-bold bg-white px-1.5 py-0.2 rounded border border-indigo-200">{sentence.resultVerb}</span> (Future form)
                              </div>
                            </div>
                          </div>

                          {/* Oración Completa y Nota Pedagógica */}
                          <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                            <div className="text-slate-900 font-bold">
                              Oración Completa:{' '}
                              <span className="font-semibold text-slate-800 italic">
                                &quot;{sentence.fullSentence}&quot;
                              </span>
                            </div>
                            <div className="text-slate-600">
                              🎯 <strong>Objetivo de aprendizaje:</strong> {sentence.explanation}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>¿Deseas intentar una nueva ronda para mejorar tiempo y racha?</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Cerrar y Ver Tablero
            </button>

            <button
              onClick={() => {
                onPlayAgain();
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar de Nuevo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
