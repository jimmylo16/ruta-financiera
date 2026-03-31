'use client';

import { useState } from 'react';
import { Answers } from '@/types/quiz';
import { getVisibleSections, calculateProfile, calculateScore } from '@/data/quiz';
import { SectionCard } from './SectionCard';
import { ResultCard } from './ResultCard';
import { ProgressBar } from './ProgressBar';

export function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const visibleSections = getVisibleSections(answers);
  const showResult = currentStep === visibleSections.length;
  const isLastSection = currentStep === visibleSections.length - 1;

  const handleChange = (questionId: string, value: boolean | string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      // If user changes "tiene_tarjeta" to NO, clear card-related answers
      if (questionId === 'tiene_tarjeta' && value === false) {
        delete next['uso_principal'];
        delete next['paga_total'];
        delete next['paga_minimo'];
        delete next['avances'];
        delete next['atrasado'];
      }
      return next;
    });
  };

  const handleNext = () => setCurrentStep((s) => s + 1);
  const handleBack = () => setCurrentStep((s) => s - 1);
  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  const profile = showResult ? calculateProfile(answers) : null;
  const score = showResult ? calculateScore(answers) : 0;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        {/* Seguros Bolívar brand bar */}
        <div className="flex justify-center items-center gap-1.5 mb-4">
          <div className="h-7 w-2.5 rounded-sm bg-[#FFD050]" />
          <div className="h-7 w-2.5 rounded-sm bg-[#048451]" />
          <span className="ml-2 text-lg font-bold text-gray-800 tracking-tight">
            Seguros Bolívar
          </span>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-1">
          Mi Ruta Financiera
        </h1>
        <p className="text-sm text-gray-500">
          Responda las siguientes preguntas para conocer su nivel de riesgo y recibir
          recomendaciones personalizadas
        </p>
      </div>

      {/* Progress (only while answering) */}
      {!showResult && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={visibleSections.length}
          labels={visibleSections.map((s) => `${s.icon} ${s.title}`)}
        />
      )}

      {/* Section */}
      {!showResult && (
        <SectionCard
          key={visibleSections[currentStep].id}
          section={visibleSections[currentStep]}
          answers={answers}
          onChange={handleChange}
          onNext={handleNext}
          onBack={currentStep > 0 ? handleBack : undefined}
          isLast={isLastSection}
        />
      )}

      {/* Result */}
      {showResult && profile && (
        <ResultCard profile={profile} answers={answers} score={score} onRestart={handleRestart} />
      )}
    </div>
  );
}
