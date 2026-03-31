'use client';

import { useState } from 'react';
import { Quiz } from './Quiz';
import { InvestmentsQuiz } from './InvestmentsQuiz';

type ActiveQuiz = 'cards' | 'investments' | null;

export function HomePage() {
  const [active, setActive] = useState<ActiveQuiz>(null);

  if (active === 'cards') return <Quiz onBack={() => setActive(null)} />;
  if (active === 'investments') return <InvestmentsQuiz onBack={() => setActive(null)} />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Brand header */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-1.5 mb-4">
          <div className="h-7 w-2.5 rounded-sm bg-[#FFD050]" />
          <div className="h-7 w-2.5 rounded-sm bg-[#048451]" />
          <span className="ml-2 text-lg font-bold text-gray-800 tracking-tight">Seguros Bolívar</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Mi Ruta Financiera</h1>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          Selecciona el cuestionario que deseas realizar para recibir tu perfil y recomendaciones personalizadas
        </p>
      </div>

      {/* Quiz cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tarjetas de Crédito */}
        <div className="rounded-2xl border-2 border-green-200 bg-green-50 overflow-hidden flex flex-col">
          <div className="bg-green-100 border-b border-green-200 px-6 py-4">
            <div className="text-3xl mb-1">💳</div>
            <h2 className="text-base font-bold text-[#048451]">Tarjetas de Crédito</h2>
          </div>
          <div className="px-6 py-4 flex-1">
            <p className="text-sm text-gray-600 leading-relaxed">
              Evalúa tus hábitos de uso y descubre cómo mejorar tu relación con el crédito.
              Obtén recomendaciones según tu perfil financiero.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['3 secciones', '9 preguntas', '~3 min'].map((tag) => (
                <span key={tag} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={() => setActive('cards')}
              className="w-full py-2.5 rounded-full bg-[#048451] text-white text-sm font-semibold hover:bg-[#036b42] transition-colors shadow-sm"
            >
              Empezar →
            </button>
          </div>
        </div>

        {/* Inversiones */}
        <div className="rounded-2xl border-2 border-purple-200 bg-purple-50 overflow-hidden flex flex-col">
          <div className="bg-purple-100 border-b border-purple-200 px-6 py-4">
            <div className="text-3xl mb-1">📈</div>
            <h2 className="text-base font-bold text-purple-700">Inversiones</h2>
          </div>
          <div className="px-6 py-4 flex-1">
            <p className="text-sm text-gray-600 leading-relaxed">
              Descubre si estás listo para invertir. Analizamos tu base financiera,
              conocimiento y comportamiento para entregarte una estrategia clara.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['4 bloques', '11 preguntas', '~4 min'].map((tag) => (
                <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={() => setActive('investments')}
              className="w-full py-2.5 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors shadow-sm"
            >
              Empezar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
