export interface SentenceHabit {
  id: number;
  fullSentence: string;
  conditionClause: string; // e.g. "If you organize your study schedule"
  conditionVerb: string; // e.g. "organize"
  resultClause: string; // e.g. "you will have more time to practice English"
  resultVerb: string; // e.g. "will have"
  invertedSentence: string; // "You will have more time to practice English if you organize your study schedule."
  habitTitle: string; // e.g. "Time Management"
  explanation: string; // Pedagogical explanation of cause and effect
  category: 'planning' | 'writing' | 'media' | 'mindset' | 'practice' | 'goals' | 'vocabulary' | 'curiosity' | 'immersion' | 'balance';
}

export interface GrammarStructure {
  type: 'affirmative' | 'negative' | 'interrogative';
  title: string;
  formula: string;
  formulaParts: {
    ifClause: string;
    comma: string;
    mainClause: string;
  };
  explanation: string;
  examples: {
    ifPart: string;
    mainPart: string;
    fullSentence: string;
    verbHighlights: {
      presentSimple: string;
      futureForm: string;
    };
    habitContext: string;
  }[];
}

export interface ModalException {
  modal: 'can' | 'must' | 'should';
  meaning: string;
  nuance: string;
  formula: string;
  example: {
    ifPart: string;
    mainPart: string;
    fullSentence: string;
    modalUsed: string;
    explanation: string;
  };
}

export interface GameCard {
  id: string; // unique card id
  sentenceId: number;
  type: 'condition' | 'result';
  text: string;
  isMatched: boolean;
  isSelected: boolean;
}

export interface MatchFeedback {
  success: boolean;
  title: string;
  message: string;
  sentence?: SentenceHabit;
}

export interface MatchedPairRecord {
  sentenceId: number;
  conditionText: string;
  resultText: string;
  fullSentence: string;
  habitTitle: string;
  explanation: string;
  conditionVerb: string;
  resultVerb: string;
}

export interface IncorrectAttemptRecord {
  id: string;
  conditionText: string;
  chosenResultText: string;
  targetSentenceId: number;
  targetHabitTitle: string;
  correctResultText: string;
  correctFullSentence: string;
  actualSentenceForResultId: number;
  actualConditionForResultText: string;
  actualFullSentenceForResult: string;
  timestamp: number;
}
