import { InvBlock, InvProfile, InvAnswers } from '@/types/investments';

export const invBlocks: InvBlock[] = [
  {
    id: 'base',
    number: 1,
    title: 'BASE FINANCIERA',
    icon: '🟢',
    color: 'green',
    maxScore: 6,
    questions: [
      {
        id: 'fondo_emergencia',
        text: '¿Tiene fondo de emergencia?',
        options: [
          { label: 'Sí', score: 2 },
          { label: 'No', score: 0 },
        ],
      },
      {
        id: 'depende_credito',
        text: '¿Depende del crédito para vivir?',
        options: [
          { label: 'No', score: 2 },
          { label: 'Sí', score: 0 },
        ],
      },
      {
        id: 'puede_ahorrar',
        text: '¿Puede ahorrar cada mes?',
        options: [
          { label: 'Sí', score: 2 },
          { label: 'Parcialmente', score: 1 },
          { label: 'No', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'conocimiento',
    number: 2,
    title: 'CONOCIMIENTO',
    icon: '🟡',
    color: 'yellow',
    maxScore: 6,
    questions: [
      {
        id: 'sabe_invertir',
        text: '¿Sabe qué es invertir?',
        options: [
          { label: 'Sí', score: 2 },
          { label: 'No', score: 0 },
        ],
      },
      {
        id: 'conoce_productos',
        text: '¿Conoce productos financieros?',
        options: [
          { label: 'Sí', score: 2 },
          { label: 'No', score: 0 },
        ],
      },
      {
        id: 'conoce_rentabilidad',
        text: '¿Conoce la rentabilidad de su dinero?',
        options: [
          { label: 'Sí', score: 2 },
          { label: 'No', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'comportamiento',
    number: 3,
    title: 'COMPORTAMIENTO',
    icon: '🔵',
    color: 'blue',
    maxScore: 6,
    questions: [
      {
        id: 'metas_claras',
        text: '¿Tiene metas claras?',
        options: [
          { label: 'Sí', score: 2 },
          { label: 'No', score: 0 },
        ],
      },
      {
        id: 'invertir_futuro',
        text: '¿Invertiría para el futuro?',
        options: [
          { label: 'Sí', score: 2 },
          { label: 'No', score: 0 },
        ],
      },
      {
        id: 'miedo_invertir',
        text: '¿Le da miedo invertir?',
        options: [
          { label: 'No', score: 2 },
          { label: 'Sí', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'capacidad',
    number: 4,
    title: 'CAPACIDAD REAL',
    icon: '🟣',
    color: 'purple',
    maxScore: 4,
    questions: [
      {
        id: 'puede_invertir_mensual',
        text: '¿Puede invertir mensualmente?',
        options: [
          { label: 'Sí', score: 2 },
          { label: 'No', score: 0 },
        ],
      },
      {
        id: 'tiene_deudas',
        text: '¿Tiene deudas actualmente?',
        options: [
          { label: 'No', score: 2 },
          { label: 'Sí', score: 0 },
        ],
      },
    ],
  },
];

export const invProfiles: InvProfile[] = [
  {
    id: 'not-ready',
    range: [0, 8],
    rangeLabel: '0 – 8 puntos',
    title: 'No Apto para Invertir',
    icon: '🔴',
    accentColor: '#dc2626',
    interpretation:
      'El perfil actual no cuenta con las condiciones financieras mínimas para iniciar un proceso de inversión. Se identifican debilidades en liquidez, endeudamiento y/o estructura financiera.',
    implications: [
      'Alto riesgo de descapitalización',
      'Posible uso inadecuado de productos de inversión',
      'Prioridad en estabilidad, no en rentabilidad',
    ],
    recommendations: [
      {
        title: '1. Construcción de base financiera',
        items: [
          'Crear un fondo de emergencia (3 a 6 meses de gastos)',
          'Reducir dependencia del crédito',
        ],
      },
      {
        title: '2. Control de flujo de dinero',
        items: [
          'Establecer presupuesto mensual',
          'Identificar fugas de gasto',
        ],
      },
      {
        title: '3. Eliminación de deuda costosa',
        items: [
          'Priorizar deudas con altas tasas',
          'Evitar adquirir nuevas obligaciones',
        ],
      },
      {
        title: '4. Educación financiera básica',
        items: [
          'Comprender conceptos de riesgo, liquidez y rentabilidad',
        ],
      },
    ],
    conclusion:
      'La inversión no depende únicamente del dinero disponible, sino de la estructura financiera, el conocimiento y la disciplina. Un proceso adecuado inicia con bases sólidas, continúa con decisiones informadas y se consolida con una estrategia clara en el tiempo.',
  },
  {
    id: 'developing',
    range: [9, 16],
    rangeLabel: '9 – 16 puntos',
    title: 'Perfil en Desarrollo',
    icon: '🟡',
    accentColor: '#c89a00',
    interpretation:
      'El cliente cuenta con bases iniciales, pero aún presenta oportunidades de mejora en conocimiento, disciplina o capacidad financiera.',
    implications: [
      'Puede invertir, pero con riesgo de decisiones ineficientes',
      'Falta de estrategia clara de inversión',
      'Potencial de crecimiento con acompañamiento',
    ],
    recommendations: [
      {
        title: '1. Inversión progresiva',
        items: [
          'Iniciar con montos bajos',
          'Priorizar productos conservadores (ej. CDT, fondos de bajo riesgo)',
        ],
      },
      {
        title: '2. Definición de objetivos',
        items: [
          'Establecer metas específicas (tiempo, monto, propósito)',
        ],
      },
      {
        title: '3. Fortalecimiento del conocimiento',
        items: [
          'Entender diferencia entre ahorro e inversión',
          'Conocer el comportamiento del mercado',
        ],
      },
      {
        title: '4. Automatización del ahorro/inversión',
        items: ['Programar aportes mensuales'],
      },
    ],
    conclusion: '',
  },
  {
    id: 'ready',
    range: [17, 22],
    rangeLabel: '17 – 22 puntos',
    title: 'Perfil Apto para Invertir',
    icon: '🟢',
    accentColor: '#048451',
    interpretation:
      'El cliente presenta condiciones adecuadas para estructurar una estrategia de inversión. Cuenta con estabilidad financiera, objetivos definidos y capacidad de asumir decisiones informadas.',
    implications: [
      'Capacidad de generar crecimiento patrimonial',
      'Posibilidad de diversificar inversiones',
      'Mayor aprovechamiento de productos financieros',
    ],
    recommendations: [
      {
        title: '1. Diversificación',
        items: [
          'Distribuir recursos en diferentes instrumentos (renta fija, fondos, etc.)',
        ],
      },
      {
        title: '2. Optimización del portafolio',
        items: [
          'Ajustar inversiones según horizonte de tiempo y perfil de riesgo',
        ],
      },
      {
        title: '3. Planeación financiera',
        items: [
          'Integrar inversión con metas de vida (retiro, vivienda, educación)',
        ],
      },
      {
        title: '4. Seguimiento periódico',
        items: ['Revisar desempeño y hacer ajustes estratégicos'],
      },
    ],
    conclusion: '',
  },
];

export function calculateInvScore(answers: InvAnswers): number {
  let total = 0;
  for (const block of invBlocks) {
    for (const question of block.questions) {
      const selected = answers[question.id];
      if (selected !== undefined) {
        const option = question.options.find((o) => o.label === selected);
        if (option) total += option.score;
      }
    }
  }
  return total;
}

export function calculateInvProfile(score: number): InvProfile {
  if (score <= 8) return invProfiles.find((p) => p.id === 'not-ready')!;
  if (score <= 16) return invProfiles.find((p) => p.id === 'developing')!;
  return invProfiles.find((p) => p.id === 'ready')!;
}
