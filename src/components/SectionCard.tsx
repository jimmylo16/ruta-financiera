'use client';

import { Section, Answers } from '@/types/quiz';
import { QuestionRow } from './QuestionRow';

const colorMap = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    title: 'text-[#048451]',
    headerBg: 'bg-green-100',
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    title: 'text-yellow-700',
    headerBg: 'bg-yellow-100',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'text-blue-700',
    headerBg: 'bg-blue-100',
  },
};

interface SectionCardProps {
  section: Section;
  answers: Answers;
  onChange: (questionId: string, value: boolean | string) => void;
  onNext: () => void;
  onBack?: () => void;
  isLast: boolean;
}

export function SectionCard({
  section,
  answers,
  onChange,
  onNext,
  onBack,
  isLast,
}: SectionCardProps) {
  const colors = colorMap[section.color];

  const visibleQuestions = section.questions.filter((q) => {
    if (!q.conditionalOn) return true;
    return answers[q.conditionalOn.questionId] === q.conditionalOn.value;
  });

  const isComplete = visibleQuestions.every((q) => answers[q.id] !== undefined);

  const hasYesNoQuestions = visibleQuestions.some((q) => q.type === 'yes-no');

  return (
    <div
      className={`rounded-2xl border-2 ${colors.border} ${colors.bg} overflow-hidden animate-in fade-in duration-300`}
    >
      {/* Section header */}
      <div className={`${colors.headerBg} px-6 py-4 border-b ${colors.border}`}>
        <h2 className={`text-base font-bold ${colors.title} tracking-wide`}>
          {section.icon} {section.number}. {section.title}
        </h2>
      </div>

      {/* Column headers (only if there are yes/no questions) */}
      {hasYesNoQuestions && (
        <div className="flex justify-end gap-0 px-6 pt-3 pb-1">
          <span className="w-14 text-center text-xs font-semibold text-gray-400">SI</span>
          <span className="w-14 text-center text-xs font-semibold text-gray-400 ml-2">NO</span>
        </div>
      )}

      {/* Questions */}
      <div className="px-6 pb-2">
        {visibleQuestions.map((q) => (
          <QuestionRow key={q.id} question={q} answers={answers} onChange={onChange} />
        ))}
      </div>

      {/* Navigation */}
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
              ? 'bg-[#048451] text-white hover:bg-[#036b42] shadow-sm hover:shadow'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLast ? 'Ver mi perfil →' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}
