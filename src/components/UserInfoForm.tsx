'use client';

import { useState } from 'react';
import { UserInfo } from '@/types/common';

interface UserInfoFormProps {
  quizLabel: string;
  accentColor: string;
  onSubmit: (info: UserInfo) => void;
  onBack: () => void;
}

export function UserInfoForm({ quizLabel, accentColor, onSubmit, onBack }: UserInfoFormProps) {
  const [email, setEmail] = useState('');
  const [nit, setNit] = useState('');
  const [errors, setErrors] = useState<{ email?: string; nit?: string }>({});

  const validate = () => {
    const next: { email?: string; nit?: string } = {};
    if (!email.trim()) {
      next.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Ingresa un correo válido';
    }
    if (!nit.trim()) {
      next.nit = 'El NIT es requerido';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ email: email.trim(), nit: nit.trim() });
    }
  };

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden animate-in fade-in duration-300">
      <div className="h-2" style={{ backgroundColor: accentColor }} />

      <div className="px-8 py-7 text-center border-b border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: accentColor }}>
          {quizLabel}
        </p>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Antes de empezar</h2>
        <p className="text-sm text-gray-500">
          Ingresa tu información para personalizar y guardar tu resultado
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="px-8 py-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@empresa.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 ${
                errors.email
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* NIT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              NIT de la empresa
            </label>
            <input
              type="text"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              placeholder="900123456-1"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 ${
                errors.nit
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
              }`}
            />
            {errors.nit && (
              <p className="mt-1 text-xs text-red-500">{errors.nit}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center px-8 pb-8">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            ← Volver
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            Continuar →
          </button>
        </div>
      </form>
    </div>
  );
}
