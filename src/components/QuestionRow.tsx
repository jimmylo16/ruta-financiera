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
        <div className="flex shrink-0 rounded-full border border-gray-200 overflow-hidden">
          <button
            type="button"
            onClick={() => onChange(question.id, true)}
            className={`w-14 py-1.5 text-xs font-semibold transition-all ${
              value === true
                ? 'bg-[#048451] text-white'
                : 'bg-white text-gray-400 hover:bg-gray-50'
            }`}
          >
            Sí
          </button>
          <button
            type="button"
            onClick={() => onChange(question.id, false)}
            className={`w-14 py-1.5 text-xs font-semibold transition-all border-l border-gray-200 ${
              value === false
                ? 'bg-gray-700 text-white'
                : 'bg-white text-gray-400 hover:bg-gray-50'
            }`}
          >
            No
          </button>
        </div>
      )}

      {question.type === 'select' && (
        <Select
          value={typeof value === 'string' ? value : ''}
          onValueChange={(v) => v && onChange(question.id, v)}
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
