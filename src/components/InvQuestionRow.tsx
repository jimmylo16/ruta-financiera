'use client';

import { InvQuestion, InvAnswers } from '@/types/investments';

const colorSelected: Record<string, string> = {
  green: 'bg-[#048451] text-white',
  yellow: 'bg-[#c89a00] text-white',
  blue: 'bg-blue-600 text-white',
  purple: 'bg-purple-600 text-white',
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
  const selectedClass = colorSelected[blockColor] ?? colorSelected.green;

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-sm text-gray-700 flex-1 leading-snug">{question.text}</span>
      <div className="flex gap-2 shrink-0">
        {question.options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(question.id, opt.label)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              selected === opt.label
                ? `${selectedClass} shadow-sm`
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
