'use client';

import { InvBlock as InvBlockType, InvAnswers } from '@/types/investments';
import { InvQuestionRow } from './InvQuestionRow';

const colorMap = {
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  title: 'text-[#048451]', header: 'bg-green-100' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', title: 'text-yellow-700', header: 'bg-yellow-100' },
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   title: 'text-blue-700',  header: 'bg-blue-100' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', title: 'text-purple-700',header: 'bg-purple-100' },
};

interface InvBlockProps {
  block: InvBlockType;
  answers: InvAnswers;
  onChange: (questionId: string, label: string) => void;
  onNext: () => void;
  onBack?: () => void;
  isLast: boolean;
}

export function InvBlockCard({ block, answers, onChange, onNext, onBack, isLast }: InvBlockProps) {
  const colors = colorMap[block.color];
  const isComplete = block.questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} overflow-hidden animate-in fade-in duration-300`}>
      <div className={`${colors.header} px-6 py-4 border-b ${colors.border}`}>
        <h2 className={`text-base font-bold ${colors.title} tracking-wide`}>
          {block.icon} {block.number}. {block.title}
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">Máximo: {block.maxScore} puntos</p>
      </div>

      <div className="px-6 pb-2 pt-1">
        {block.questions.map((q) => (
          <InvQuestionRow
            key={q.id}
            question={q}
            answers={answers}
            blockColor={block.color}
            onChange={onChange}
          />
        ))}
      </div>

      <div className="flex justify-between items-center px-6 py-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            ← Anterior
          </button>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!isComplete}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            isComplete
              ? 'bg-[#048451] text-white hover:bg-[#036b42] shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLast ? 'Ver mi resultado →' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}
