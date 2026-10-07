import { GrammarStructure, ModalException, SentenceHabit } from '../types';

/**
 * The 10 authentic sentences specified in the prompt:
 * 1. If you organize your study schedule, you will have more time to practice English.
 * 2. If you write a short journal in English, you will improve your ability to express your ideas.
 * 3. If you watch videos in English with subtitles, you will learn how native speakers use everyday expressions.
 * 4. If you make mistakes while speaking English, you will learn from them and improve.
 * 5. If you participate actively in English activities, you will have more opportunities to practice.
 * 6. If you set realistic goals, you will be more motivated to continue learning English.
 * 7. If you use new vocabulary in different sentences, you will understand how to use it correctly.
 * 8. If you ask questions when you do not understand something, you will learn more effectively.
 * 9. If you use English outside the classroom, you will become more comfortable using it in real situations.
 * 10. If you balance grammar practice with speaking and listening activities, you will develop more complete language skills.
 */
export const STUDY_HABIT_SENTENCES: SentenceHabit[] = [
  {
    id: 1,
    fullSentence: "If you organize your study schedule, you will have more time to practice English.",
    conditionClause: "If you organize your study schedule",
    conditionVerb: "organize",
    resultClause: "you will have more time to practice English",
    resultVerb: "will have",
    invertedSentence: "You will have more time to practice English if you organize your study schedule.",
    habitTitle: "Study Schedule & Time Management",
    explanation: "Planning daily study blocks eliminates procrastination and creates consistent windows for speaking and listening.",
    category: "planning"
  },
  {
    id: 2,
    fullSentence: "If you write a short journal in English, you will improve your ability to express your ideas.",
    conditionClause: "If you write a short journal in English",
    conditionVerb: "write",
    resultClause: "you will improve your ability to express your ideas",
    resultVerb: "will improve",
    invertedSentence: "You will improve your ability to express your ideas if you write a short journal in English.",
    habitTitle: "Daily Journaling & Thought Expression",
    explanation: "Writing for just 5 minutes a day builds fluency in phrasing personal thoughts without translating in your head.",
    category: "writing"
  },
  {
    id: 3,
    fullSentence: "If you watch videos in English with subtitles, you will learn how native speakers use everyday expressions.",
    conditionClause: "If you watch videos in English with subtitles",
    conditionVerb: "watch",
    resultClause: "you will learn how native speakers use everyday expressions",
    resultVerb: "will learn",
    invertedSentence: "You will learn how native speakers use everyday expressions if you watch videos in English with subtitles.",
    habitTitle: "Media Immersion with Subtitles",
    explanation: "Connecting natural spoken cadence with visual text strengthens vocabulary acquisition and natural idiom recall.",
    category: "media"
  },
  {
    id: 4,
    fullSentence: "If you make mistakes while speaking English, you will learn from them and improve.",
    conditionClause: "If you make mistakes while speaking English",
    conditionVerb: "make",
    resultClause: "you will learn from them and improve",
    resultVerb: "will learn and improve",
    invertedSentence: "You will learn from them and improve if you make mistakes while speaking English.",
    habitTitle: "Growth Mindset & Embracing Errors",
    explanation: "Errors are not failures; they are the fastest feedback mechanism for neural language pathways to self-correct.",
    category: "mindset"
  },
  {
    id: 5,
    fullSentence: "If you participate actively in English activities, you will have more opportunities to practice.",
    conditionClause: "If you participate actively in English activities",
    conditionVerb: "participate",
    resultClause: "you will have more opportunities to practice",
    resultVerb: "will have",
    invertedSentence: "You will have more opportunities to practice if you participate actively in English activities.",
    habitTitle: "Active Engagement & Club Participation",
    explanation: "Passive listening only takes you so far; active spoken contribution multiplies your conversational mileage.",
    category: "practice"
  },
  {
    id: 6,
    fullSentence: "If you set realistic goals, you will be more motivated to continue learning English.",
    conditionClause: "If you set realistic goals",
    conditionVerb: "set",
    resultClause: "you will be more motivated to continue learning English",
    resultVerb: "will be",
    invertedSentence: "You will be more motivated to continue learning English if you set realistic goals.",
    habitTitle: "Realistic Milestone Setting",
    explanation: "Achievable micro-milestones trigger dopamine rewards and prevent study burnout across months of learning.",
    category: "goals"
  },
  {
    id: 7,
    fullSentence: "If you use new vocabulary in different sentences, you will understand how to use it correctly.",
    conditionClause: "If you use new vocabulary in different sentences",
    conditionVerb: "use",
    resultClause: "you will understand how to use it correctly",
    resultVerb: "will understand",
    invertedSentence: "You will understand how to use it correctly if you use new vocabulary in different sentences.",
    habitTitle: "Contextual Vocabulary Application",
    explanation: "Memorizing isolated word definitions rarely sticks; manipulating words inside novel contexts cements real mastery.",
    category: "vocabulary"
  },
  {
    id: 8,
    fullSentence: "If you ask questions when you do not understand something, you will learn more effectively.",
    conditionClause: "If you ask questions when you do not understand something",
    conditionVerb: "ask",
    resultClause: "you will learn more effectively",
    resultVerb: "will learn",
    invertedSentence: "You will learn more effectively if you ask questions when you do not understand something.",
    habitTitle: "Inquisitive Mindset & Clarification",
    explanation: "Clarifying doubts immediately stops misconceptions from solidifying into hard-to-break language habits.",
    category: "curiosity"
  },
  {
    id: 9,
    fullSentence: "If you use English outside the classroom, you will become more comfortable using it in real situations.",
    conditionClause: "If you use English outside the classroom",
    conditionVerb: "use",
    resultClause: "you will become more comfortable using it in real situations",
    resultVerb: "will become",
    invertedSentence: "You will become more comfortable using it in real situations if you use English outside the classroom.",
    habitTitle: "Real-World Contexts & Immersion",
    explanation: "Switching phone settings, speaking with international friends, and grocery shopping in English removes speaking anxiety.",
    category: "immersion"
  },
  {
    id: 10,
    fullSentence: "If you balance grammar practice with speaking and listening activities, you will develop more complete language skills.",
    conditionClause: "If you balance grammar practice with speaking and listening activities",
    conditionVerb: "balance",
    resultClause: "you will develop more complete language skills",
    resultVerb: "will develop",
    invertedSentence: "You will develop more complete language skills if you balance grammar practice with speaking and listening activities.",
    habitTitle: "Holistic Four-Skill Equilibrium",
    explanation: "A well-rounded learner blends analytical grammar comprehension with spontaneous auditory and vocal reflexes.",
    category: "balance"
  }
];

export const GRAMMAR_STRUCTURES: GrammarStructure[] = [
  {
    type: "affirmative",
    title: "Affirmative Structure",
    formula: "If + Subject + Present Simple, Subject + will + Base Verb",
    formulaParts: {
      ifClause: "If + Subject + Present Simple",
      comma: ",",
      mainClause: "Subject + will + Base Verb"
    },
    explanation: "Used to state a real condition and its definite probable positive outcome in the future.",
    examples: [
      {
        ifPart: "If you review your vocabulary flashcards every morning",
        mainPart: "you will remember new words much faster",
        fullSentence: "If you review your vocabulary flashcards every morning, you will remember new words much faster.",
        verbHighlights: {
          presentSimple: "review (Present Simple)",
          futureForm: "will remember (will + Base Verb)"
        },
        habitContext: "Spaced repetition flashcards build long-term lexical memory."
      },
      {
        ifPart: "If you listen to English podcasts during your workout",
        mainPart: "you will train your ear to understand natural conversational speed",
        fullSentence: "If you listen to English podcasts during your workout, you will train your ear to understand natural conversational speed.",
        verbHighlights: {
          presentSimple: "listen (Present Simple)",
          futureForm: "will train (will + Base Verb)"
        },
        habitContext: "Multitasking passive & active listening develops subconscious listening comprehension."
      }
    ]
  },
  {
    type: "negative",
    title: "Negative Structure",
    formula: "If + Subject + don't/doesn't + Verb, Subject + won't (will not) + Base Verb",
    formulaParts: {
      ifClause: "If + Subject + do not / does not + Base Verb",
      comma: ",",
      mainClause: "Subject + will not (won't) + Base Verb"
    },
    explanation: "The negative can appear in the if-clause (using don't/doesn't), in the main clause (using won't), or in both.",
    examples: [
      {
        ifPart: "If you do not practice speaking aloud regularly",
        mainPart: "you will not gain the speech fluency you desire",
        fullSentence: "If you do not practice speaking aloud regularly, you will not gain the speech fluency you desire.",
        verbHighlights: {
          presentSimple: "do not practice (Negative Present Simple)",
          futureForm: "will not gain / won't gain (Negative Future)"
        },
        habitContext: "Without regular vocalization, tongue muscle memory stays hesitant."
      },
      {
        ifPart: "If you don't take notes during your grammar lectures",
        mainPart: "you won't remember the subtle exceptions when writing essays",
        fullSentence: "If you don't take notes during your grammar lectures, you won't remember the subtle exceptions when writing essays.",
        verbHighlights: {
          presentSimple: "don't take (Contraction don't + Verb)",
          futureForm: "won't remember (Contraction won't + Verb)"
        },
        habitContext: "Active note-taking anchors complex structural rules in your mind."
      }
    ]
  },
  {
    type: "interrogative",
    title: "Interrogative Structure",
    formula: "Will + Subject + Base Verb + if + Subject + Present Simple? / Wh- + will + Subject + Verb...?",
    formulaParts: {
      ifClause: "if + Subject + Present Simple?",
      comma: "(no comma if 'if' is in the middle)",
      mainClause: "Will + Subject + Base Verb"
    },
    explanation: "In questions, the order of the subject and 'will' is inverted. We usually place the question form in the main clause.",
    examples: [
      {
        ifPart: "if you record your voice and listen back every week",
        mainPart: "Will you improve your English pronunciation",
        fullSentence: "Will you improve your English pronunciation if you record your voice and listen back every week?",
        verbHighlights: {
          presentSimple: "record (Present Simple)",
          futureForm: "Will you improve (Inversion: Will + Subject + Verb)"
        },
        habitContext: "Self-recording creates objective phonetic feedback."
      },
      {
        ifPart: "If you dedicate 20 minutes to English every single night",
        mainPart: "what level of fluency will you achieve by next year?",
        fullSentence: "If you dedicate 20 minutes to English every single night, what level of fluency will you achieve by next year?",
        verbHighlights: {
          presentSimple: "dedicate (Present Simple)",
          futureForm: "will you achieve (Wh- Question + will + Subject + Verb)"
        },
        habitContext: "Consistent daily increments yield exponential language results."
      }
    ]
  }
];

export const MODAL_EXCEPTIONS: ModalException[] = [
  {
    modal: "can",
    meaning: "Ability or Available Possibility",
    nuance: "Replaces 'will' to express that the student will have the ability or opportunity to do something, rather than a guaranteed certainty.",
    formula: "If + Present Simple, Subject + CAN + Base Verb",
    example: {
      ifPart: "If you download a dictionary application on your smartphone",
      mainPart: "you can check unfamiliar idioms instantly anywhere",
      fullSentence: "If you download a dictionary application on your smartphone, you can check unfamiliar idioms instantly anywhere.",
      modalUsed: "can check (expresses practical ability & opportunity)",
      explanation: "Having the tool enables the action anytime, anywhere."
    }
  },
  {
    modal: "must",
    meaning: "Strong Obligation, Absolute Necessity, or Urgent Advice",
    nuance: "Replaces 'will' when the condition demands a mandatory or crucial student action to succeed.",
    formula: "If + Present Simple, Subject + MUST + Base Verb",
    example: {
      ifPart: "If you prepare for an official IELTS or TOEFL examination",
      mainPart: "you must practice with realistic timed mock exams",
      fullSentence: "If you prepare for an official IELTS or TOEFL examination, you must practice with realistic timed mock exams.",
      modalUsed: "must practice (expresses essential obligation / requirement)",
      explanation: "Standardized tests require strict pacing, making timed practice obligatory."
    }
  },
  {
    modal: "may",
    meaning: "Formal Possibility or Polite Likelihood",
    nuance: "Replaces 'will' to indicate a 50% likelihood or formal probability that something good will happen.",
    formula: "If + Present Simple, Subject + MAY + Base Verb",
    example: {
      ifPart: "If you join an international language exchange community",
      mainPart: "you may find a dedicated study buddy with shared academic interests",
      fullSentence: "If you join an international language exchange community, you may find a dedicated study buddy with shared academic interests.",
      modalUsed: "may find (expresses formal possibility / probability)",
      explanation: "Finding a study partner is a plausible, favorable outcome."
    }
  },
  {
    modal: "might",
    meaning: "Slight Possibility or Remote Chance",
    nuance: "Replaces 'will' when the consequence is possible, but less certain than 'will' or 'may' (a tentative outcome).",
    formula: "If + Present Simple, Subject + MIGHT + Base Verb",
    example: {
      ifPart: "If you read advanced English classic literature",
      mainPart: "you might encounter poetic vocabulary that challenges your reading speed",
      fullSentence: "If you read advanced English classic literature, you might encounter poetic vocabulary that challenges your reading speed.",
      modalUsed: "might encounter (expresses slight, tentative possibility)",
      explanation: "Complex texts might present unusual or archaic vocabulary."
    }
  }
];

export const GOLDEN_RULES = [
  {
    id: 1,
    title: "Rule 1: Present Simple in the If-Clause",
    ruleDesc: "The condition clause ALWAYS uses the Present Simple tense. Never use 'will' inside the if-clause!",
    wrongExample: "If you will organize your study schedule... (Incorrect ❌)",
    rightExample: "If you organize your study schedule... (Correct ✅)",
    tip: "Even though the condition refers to future actions, English grammar strictly reserves 'will' for the main clause."
  },
  {
    id: 2,
    title: "Rule 2: 'Will' in the Main Clause",
    ruleDesc: "The main clause expresses the consequence or future result, using 'will + base verb' (infinitive without 'to').",
    wrongExample: "You have more time if you organize your schedule. (Lacks future conditional consequence ⚠️)",
    rightExample: "You will have more time to practice English. (Correct ✅)",
    tip: "The contraction ''ll' is frequently used in spoken English: 'you'll have', 'she'll pass'."
  },
  {
    id: 3,
    title: "Rule 3: Interchangeable Clause Order",
    ruleDesc: "The order of the clauses can be reversed without altering the core grammatical meaning.",
    patternA: "Pattern A: [If-Clause] + , + [Main Clause]",
    patternB: "Pattern B: [Main Clause] + [If-Clause] (No comma needed)",
    tip: "Both orders are 100% grammatically correct. Choose the order that best emphasizes your focus."
  },
  {
    id: 4,
    title: "Rule 4: The Comma Rule",
    ruleDesc: "When the sentence starts with the 'If-clause', place a comma before the main clause. When the main clause comes first, do NOT use a comma.",
    withComma: "If you write a short journal in English, you will improve your ideas. (Comma needed ✅)",
    withoutComma: "You will improve your ideas if you write a short journal in English. (No comma needed ✅)",
    tip: "Think of the conjunction 'if' as a bridge: when it sits in the middle, it connects both sides without needing a comma!"
  },
  {
    id: 5,
    title: "Rule 5: Negatives & Questions Construction",
    ruleDesc: "Add 'not' after 'will' in the main clause, or use the contraction 'won't'. For questions, invert the subject and 'will'.",
    negPattern: "Negative: won't + base verb / don't + base verb in if-clause",
    questPattern: "Question: Will + Subject + base verb + if + Present Simple?",
    tip: "Remember that 'won't' is the contracted form of 'will not', and 'don't/doesn't' is used in the Present Simple if-clause."
  }
];
