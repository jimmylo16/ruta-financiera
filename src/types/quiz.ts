export type QuestionType = 'yes-no' | 'select';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  conditionalOn?: {
    questionId: string;
    value: boolean | string;
  };
}

export interface Section {
  id: string;
  title: string;
  color: 'green' | 'yellow' | 'blue';
  icon: string;
  number: number;
  questions: Question[];
}

export type RiskLevel = 'bajo' | 'medio' | 'alto' | 'sin-historial';

export interface Profile {
  id: string;
  title: string;
  icon: string;
  description: string;
  riskLevel: RiskLevel;
  recommendations: string[];
  accentColor: string;
}

export type Answers = Record<string, boolean | string>;
