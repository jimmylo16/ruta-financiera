'use client';

import { Question, Answers } from '@/types/quiz';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface QuestionRowProps {
  question: Question;
  answers: Answers;
  onChange: (questionId: string, value: boolean | string) => void;
}

export function QuestionRow({ question, answers, onChange }: QuestionRowProps) {
  const value = answers[question.id];

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-sm text-gray-700 flex-1 leading-snug">{question.text}</span>

      {question.type === 'yes-no' && (
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onChange(question.id, true)}
            className={`w-14 py-1.5 rounded-full text-xs font-semibold transition-all ${
              value === true
                ? 'bg-[#048451] text-white shadow-sm'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            SI
          </button>
          <button
            type="button"
            onClick={() => onChange(question.id, false)}
            className={`w-14 py-1.5 rounded-full text-xs font-semibold transition-all ${
              value === false
                ? 'bg-gray-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            NO
          </button>
        </div>
      )}

      {question.type === 'select' && (
        <Select
          value={typeof value === 'string' ? value : ''}
          onValueChange={(v) => onChange(question.id, v)}
        >
          <SelectTrigger className="w-52 text-xs">
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map((opt) => (
              <SelectItem key={opt} value={opt} className="text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
