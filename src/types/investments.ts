export interface InvOption {
  label: string;
  score: number;
}

export interface InvQuestion {
  id: string;
  text: string;
  options: InvOption[];
}

export interface InvBlock {
  id: string;
  number: number;
  title: string;
  icon: string;
  color: 'green' | 'yellow' | 'blue' | 'purple';
  questions: InvQuestion[];
  maxScore: number;
}

export interface InvRecommendationSection {
  title: string;
  items: string[];
}

export interface InvProfile {
  id: string;
  range: [number, number];
  rangeLabel: string;
  title: string;
  icon: string;
  accentColor: string;
  interpretation: string;
  implications: string[];
  recommendations: InvRecommendationSection[];
  conclusion: string;
}

export type InvAnswers = Record<string, string>; // questionId -> selected label
