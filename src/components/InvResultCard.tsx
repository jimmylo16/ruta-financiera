'use client';

import { useEffect } from 'react';
import { InvProfile, InvAnswers } from '@/types/investments';

interface InvResultCardProps {
  profile: InvProfile;
  score: number;
  answers: InvAnswers;
  onRestart: () => void;
}

export function InvResultCard({ profile, score, answers, onRestart }: InvResultCardProps) {
  const pct = Math.round((score / 22) * 100);

  useEffect(() => {
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizType: 'inversiones',
        answers,
        profileTitle: profile.title,
        score,
      }),
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden animate-in fade-in duration-300">
      <div className="h-2" style={{ backgroundColor: profile.accentColor }} />

      {/* Header */}
      <div className="px-8 py-7 text-center border-b border-gray-100">
        <div className="text-5xl mb-3">{profile.icon}</div>
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 text-white"
          style={{ backgroundColor: profile.accentColor }}
        >
          {profile.rangeLabel}
        </span>
        <h2 className="text-2xl font-bold mb-1" style={{ color: profile.accentColor }}>
          {profile.title}
        </h2>

        {/* Score bar */}
        <div className="mt-4 max-w-xs mx-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Puntaje total</span>
            <span className="font-semibold" style={{ color: profile.accentColor }}>
              {score} / 22
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, backgroundColor: profile.accentColor }}
            />
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Interpretation */}
        <div className="rounded-xl p-4" style={{ backgroundColor: `${profile.accentColor}10` }}>
          <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: profile.accentColor }}>
            Interpretación técnica
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{profile.interpretation}</p>
        </div>

        {/* Implications */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide mb-2 text-gray-500">
            Implicaciones
          </h3>
          <ul className="space-y-1.5">
            {profile.implications.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span style={{ color: profile.accentColor }} className="font-bold mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide mb-3 text-gray-500">
            Recomendaciones
          </h3>
          <div className="space-y-3">
            {profile.recommendations.map((section, i) => (
              <div key={i} className="rounded-lg border border-gray-100 p-3">
                <p className="text-xs font-semibold text-gray-700 mb-1.5">{section.title}</p>
                <ul className="space-y-1">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-xs text-gray-600 flex gap-1.5">
                      <span style={{ color: profile.accentColor }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        {profile.conclusion && (
          <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
            <h3 className="text-xs font-bold uppercase tracking-wide mb-2 text-gray-500">
              Conclusión estratégica
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed italic">{profile.conclusion}</p>
          </div>
        )}
      </div>

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
          style={{ borderColor: profile.accentColor, color: profile.accentColor }}
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
