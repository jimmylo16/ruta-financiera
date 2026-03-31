import { Section, Profile, Answers } from '@/types/quiz';

export const sections: Section[] = [
  {
    id: 'perfil',
    title: 'PERFIL',
    color: 'green',
    icon: '🟢',
    number: 1,
    questions: [
      {
        id: 'tiene_tarjeta',
        text: '¿Tienes tarjeta de crédito?',
        type: 'yes-no',
      },
      {
        id: 'uso_principal',
        text: '¿Para qué la usas principalmente?',
        type: 'select',
        options: [
          'Compras del día a día',
          'Emergencias',
          'Acumular puntos / millas',
          'Viajes',
          'Otro',
        ],
        conditionalOn: { questionId: 'tiene_tarjeta', value: true },
      },
    ],
  },
  {
    id: 'habitos',
    title: 'HÁBITOS CLAVE',
    color: 'yellow',
    icon: '🟡',
    number: 2,
    questions: [
      { id: 'paga_total', text: '¿Pagas el total de la tarjeta cada mes?', type: 'yes-no' },
      { id: 'paga_minimo', text: '¿Pagas solo el mínimo?', type: 'yes-no' },
      { id: 'avances', text: '¿Has usado avances en efectivo?', type: 'yes-no' },
      { id: 'atrasado', text: '¿Te has atrasado en pagos?', type: 'yes-no' },
    ],
  },
  {
    id: 'control',
    title: 'CONTROL FINANCIERO',
    color: 'blue',
    icon: '🔵',
    number: 3,
    questions: [
      { id: 'sabe_interes', text: '¿Sabes cuánto pagas de interés?', type: 'yes-no' },
      { id: 'control_gastos', text: '¿Llevas control de tus gastos?', type: 'yes-no' },
      { id: 'compra_sin_poder', text: '¿Compras cosas que no puedes pagar inmediatamente?', type: 'yes-no' },
    ],
  },
];

export const profiles: Profile[] = [
  {
    id: 'responsible',
    title: 'Usuario Responsable',
    icon: '✅',
    description:
      'Tienes excelentes hábitos financieros. Usas el crédito de manera inteligente y mantienes un control claro de tus finanzas. ¡Sigue así!',
    riskLevel: 'bajo',
    accentColor: '#048451',
    recommendations: [
      'Considera invertir tus ahorros en fondos de bajo riesgo o CDTs para hacerlos crecer.',
      'Aprovecha al máximo los beneficios, puntos y millas de tu tarjeta.',
      'Mantén un fondo de emergencia equivalente a 3–6 meses de gastos.',
      'Explora productos de inversión con tu banco para diversificar.',
    ],
  },
  {
    id: 'improving',
    title: 'En Proceso de Mejora',
    icon: '📊',
    description:
      'Tienes buenas bases, pero hay hábitos que puedes ajustar para alcanzar una salud financiera óptima. ¡Estás más cerca de lo que crees!',
    riskLevel: 'medio',
    accentColor: '#c89a00',
    recommendations: [
      'Intenta pagar el saldo total de tu tarjeta cada mes para evitar intereses.',
      'Crea un presupuesto mensual y registra tus gastos en una app o libreta.',
      'Evita los avances en efectivo; sus tasas de interés son muy altas.',
      'Configura alertas automáticas para no olvidar las fechas de pago.',
    ],
  },
  {
    id: 'risk',
    title: 'Perfil de Riesgo',
    icon: '⚠️',
    description:
      'Algunos hábitos actuales pueden generar una deuda difícil de manejar. Es el momento ideal para tomar control antes de que crezca.',
    riskLevel: 'alto',
    accentColor: '#dc2626',
    recommendations: [
      'Prioriza pagar las deudas con mayor tasa de interés primero.',
      'Evita hacer nuevas compras a cuotas hasta estabilizar tu situación.',
      'Solicita una asesoría financiera gratuita con tu entidad bancaria.',
      'Elabora un plan de pagos claro con metas mensuales alcanzables.',
    ],
  },
  {
    id: 'no-card',
    title: 'Sin Historial de Crédito',
    icon: '🌱',
    description:
      'No tienes tarjeta de crédito. Es una excelente oportunidad para empezar a construir tu historial crediticio de forma responsable.',
    riskLevel: 'sin-historial',
    accentColor: '#048451',
    recommendations: [
      'Considera solicitar una tarjeta con cupo bajo para comenzar tu historial.',
      'Úsala solo para compras que puedas pagar completamente el mismo mes.',
      'Un buen historial crediticio abre puertas a mejores productos financieros.',
      'Lleva siempre un registro de tus gastos antes de adquirir cualquier crédito.',
    ],
  },
];

export function getVisibleSections(answers: Answers): Section[] {
  const hasCard = answers['tiene_tarjeta'] === true;
  if (!hasCard) {
    return [sections[0], sections[2]]; // PERFIL + CONTROL (sin HÁBITOS)
  }
  return sections;
}

export function calculateScore(answers: Answers): number {
  if (!answers['tiene_tarjeta']) return 0;
  let score = 0;
  if (answers['paga_total'] === true) score += 3;
  if (answers['sabe_interes'] === true) score += 2;
  if (answers['control_gastos'] === true) score += 2;
  if (answers['paga_minimo'] === true) score -= 2;
  if (answers['avances'] === true) score -= 2;
  if (answers['atrasado'] === true) score -= 3;
  if (answers['compra_sin_poder'] === true) score -= 2;
  return score;
}

export function calculateProfile(answers: Answers): Profile {
  if (!answers['tiene_tarjeta']) {
    return profiles.find((p) => p.id === 'no-card')!;
  }
  const score = calculateScore(answers);
  if (score >= 5) return profiles.find((p) => p.id === 'responsible')!;
  if (score >= 0) return profiles.find((p) => p.id === 'improving')!;
  return profiles.find((p) => p.id === 'risk')!;
}
