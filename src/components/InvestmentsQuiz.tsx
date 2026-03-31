'use client';

import { useState } from 'react';
import { InvAnswers } from '@/types/investments';
import { UserInfo } from '@/types/common';
import { invBlocks, calculateInvScore, calculateInvProfile } from '@/data/investments';
import { InvBlockCard } from './InvBlock';
import { InvResultCard } from './InvResultCard';
import { ProgressBar } from './ProgressBar';

interface InvestmentsQuizProps {
  onBack: () => void;
  userInfo: UserInfo;
}

export function InvestmentsQuiz({ onBack, userInfo }: InvestmentsQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<InvAnswers>({});

  const showResult = currentStep === invBlocks.length;
  const isLastBlock = currentStep === invBlocks.length - 1;

  const handleChange = (questionId: string, label: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: label }));
  };

  const handleNext = () => setCurrentStep((s) => s + 1);
  const handleBack = () => {
    if (currentStep === 0) onBack();
    else setCurrentStep((s) => s - 1);
  };
  const handleRestart = () => {
    onBack();
  };

  const score = showResult ? calculateInvScore(answers) : 0;
  const profile = showResult ? calculateInvProfile(score) : null;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8 print:hidden">
        <div className="flex justify-center items-center gap-1.5 mb-4">
          <div className="h-7 w-2.5 rounded-sm bg-[#FFD050]" />
          <div className="h-7 w-2.5 rounded-sm bg-[#048451]" />
          <span className="ml-2 text-lg font-bold text-gray-800 tracking-tight">Seguros Bolívar</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-1">📈 Perfil de Inversiones</h1>
        <p className="text-sm text-gray-500">
          Responda las siguientes preguntas para conocer su nivel de aptitud para invertir
        </p>
      </div>

      {!showResult && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={invBlocks.length}
          labels={invBlocks.map((b) => `${b.icon} ${b.title}`)}
        />
      )}

      {!showResult && (
        <InvBlockCard
          key={invBlocks[currentStep].id}
          block={invBlocks[currentStep]}
          answers={answers}
          onChange={handleChange}
          onNext={handleNext}
          onBack={handleBack}
          isLast={isLastBlock}
        />
      )}

      {showResult && profile && (
        <InvResultCard
          profile={profile}
          score={score}
          answers={answers}
          userInfo={userInfo}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
