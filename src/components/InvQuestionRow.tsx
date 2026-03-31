'use client';

import { InvQuestion, InvAnswers } from '@/types/investments';

const accentColor: Record<string, string> = {
  green: '#048451',
  yellow: '#c89a00',
  blue: '#2563eb',
  purple: '#7c3aed',
};

interface InvQuestionRowProps {
  question: InvQuestion;
  answers: InvAnswers;
  blockColor: string;
  onChange: (questionId: string, label: string) => void;
}

export function InvQuestionRow({
  question,
  answers,
  blockColor,
  onChange,
}: InvQuestionRowProps) {
  const selected = answers[question.id];
  const color = accentColor[blockColor] ?? accentColor.green;

  return (
    <div data-question={question.text} className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-sm text-gray-700 flex-1 leading-snug">{question.text}</span>
      <div className="flex shrink-0 rounded-full border border-gray-200 overflow-hidden">
        {question.options.map((opt, i) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(question.id, opt.label)}
            className={`px-4 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
              i > 0 ? 'border-l border-gray-200' : ''
            } ${
              selected !== opt.label ? 'bg-white text-gray-400 hover:bg-gray-50' : ''
            }`}
            style={selected === opt.label ? { backgroundColor: color, color: '#fff' } : {}}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
