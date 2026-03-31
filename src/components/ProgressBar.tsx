interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  const progressPct = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2 gap-1">
        {labels.map((label, i) => (
          <span
            key={i}
            className={`text-xs font-medium truncate flex-1 text-center transition-colors ${
              i <= currentStep ? 'text-[#048451]' : 'text-gray-300'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#048451] rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <p className="text-right text-xs text-gray-400 mt-1">
        Paso {currentStep + 1} de {totalSteps}
      </p>
    </div>
  );
}
