'use client';

import { useEffect } from 'react';
import { Profile, Answers } from '@/types/quiz';
import { UserInfo } from '@/types/common';

const riskBadge: Record<string, { label: string; className: string }> = {
  bajo: { label: 'SALUDABLE', className: 'bg-green-100 text-green-800' },
  medio: { label: 'CUIDADO', className: 'bg-yellow-100 text-yellow-800' },
  alto: { label: 'ALERTA', className: 'bg-red-100 text-red-800' },
  'sin-historial': { label: 'SIN TARJETA', className: 'bg-purple-100 text-purple-700' },
};

interface ResultCardProps {
  profile: Profile;
  answers: Answers;
  score: number;
  userInfo: UserInfo;
  onRestart: () => void;
}

export function ResultCard({ profile, answers, score, userInfo, onRestart }: ResultCardProps) {
  useEffect(() => {
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizType: 'tarjetas', answers, profileTitle: profile.title, score, userInfo }),
    }).catch(() => {
      // Silently fail — no interrumpir la UX si el guardado falla
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const badge = riskBadge[profile.riskLevel];
  const hasCard = profile.riskLevel !== 'sin-historial';

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden animate-in fade-in duration-300">
      {/* Top accent bar */}
      <div className="h-2" style={{ backgroundColor: profile.accentColor }} />

      {/* Header */}
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
        {hasCard && (
          <p className="text-sm font-semibold mb-1" style={{ color: profile.accentColor }}>
            Puntaje: {score} / 25
          </p>
        )}
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
          {profile.description}
        </p>
      </div>

      {/* Por qué es importante */}
      <div className="px-8 pb-6">
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: `${profile.accentColor}10` }}
        >
          <h3 className="font-semibold text-gray-800 text-sm mb-3">
            Por qué es importante
          </h3>
          <ul className="space-y-2">
            {profile.implications.map((imp, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                <span className="font-bold mt-0.5" style={{ color: profile.accentColor }}>•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="px-8 pb-8">
        <h3 className="font-semibold text-gray-800 text-sm mb-4">
          Acciones recomendadas
        </h3>
        <div className="space-y-4">
          {profile.recommendations.map((section, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-gray-800 mb-1.5">
                <span
                  className="inline-block w-5 h-5 rounded-full text-white text-xs font-bold text-center leading-5 mr-2"
                  style={{ backgroundColor: profile.accentColor }}
                >
                  {i + 1}
                </span>
                {section.title}
              </p>
              <ul className="space-y-1 pl-7">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-sm text-gray-600">
                    <span style={{ color: profile.accentColor }}>–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-8 pb-8 flex flex-col items-center gap-3 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: profile.accentColor }}
        >
          Descargar PDF
        </button>
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
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
