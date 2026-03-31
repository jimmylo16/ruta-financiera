'use client';

import { useEffect } from 'react';
import { Profile, Answers } from '@/types/quiz';

const riskBadge: Record<string, { label: string; className: string }> = {
  bajo: { label: 'Riesgo Bajo', className: 'bg-green-100 text-green-800' },
  medio: { label: 'Riesgo Medio', className: 'bg-yellow-100 text-yellow-800' },
  alto: { label: 'Riesgo Alto', className: 'bg-red-100 text-red-800' },
  'sin-historial': { label: 'Sin Historial', className: 'bg-gray-100 text-gray-600' },
};

interface ResultCardProps {
  profile: Profile;
  answers: Answers;
  score: number;
  onRestart: () => void;
}

export function ResultCard({ profile, answers, score, onRestart }: ResultCardProps) {
  useEffect(() => {
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizType: 'tarjetas', answers, profileTitle: profile.title, score }),
    }).catch(() => {
      // Silently fail — no interrumpir la UX si el guardado falla
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const badge = riskBadge[profile.riskLevel];

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden animate-in fade-in duration-300">
      {/* Top accent bar */}
      <div className="h-2" style={{ backgroundColor: profile.accentColor }} />

      <div className="px-8 py-8 text-center">
        <div className="text-5xl mb-3">{profile.icon}</div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${badge.className}`}
        >
          {badge.label}
        </span>
        <h2 className="text-2xl font-bold mb-3" style={{ color: profile.accentColor }}>
          {profile.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          {profile.description}
        </p>
      </div>

      {/* Recommendations */}
      <div className="px-8 pb-8">
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: `${profile.accentColor}10` }}
        >
          <h3 className="font-semibold text-gray-800 text-sm mb-3">
            Recomendaciones para ti
          </h3>
          <ul className="space-y-2.5">
            {profile.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                <span className="font-bold mt-0.5" style={{ color: profile.accentColor }}>
                  →
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Restart */}
      <div className="px-8 pb-8 text-center">
        <button
          type="button"
          onClick={onRestart}
          className="px-6 py-2 rounded-full text-sm font-semibold border-2 transition-all"
          style={{
            borderColor: profile.accentColor,
            color: profile.accentColor,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = profile.accentColor;
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = profile.accentColor;
          }}
        >
          Volver a empezar
        </button>
      </div>
    </div>
  );
}
