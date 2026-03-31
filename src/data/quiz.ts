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
          'Gustos / viajes',
          'Avances en efectivo',
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
      {
        id: 'paga_total',
        text: '¿Pagas el total cada mes?',
        type: 'select',
        options: ['Siempre', 'A veces', 'Nunca'],
      },
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
    id: 'saludable',
    title: 'Buen manejo',
    icon: '🟢',
    description:
      'El manejo de la tarjeta es adecuado y refleja un uso responsable del crédito. Se evidencia control en los pagos, planificación y conocimiento del producto financiero.',
    riskLevel: 'bajo',
    accentColor: '#048451',
    implications: [
      'Permite evitar costos innecesarios',
      'Mejora el historial crediticio',
      'Facilita el acceso a mejores productos financieros',
    ],
    recommendations: [
      {
        title: 'Mantener los hábitos actuales',
        items: [
          'Continuar pagando el total de la obligación',
          'Evitar el uso innecesario del crédito',
        ],
      },
      {
        title: 'Aprovechar beneficios financieros',
        items: [
          'Utilizar programas de puntos, millas o devoluciones',
          'Evaluar mejores condiciones con la entidad financiera',
        ],
      },
      {
        title: 'Planificar el uso del crédito',
        items: [
          'Usar la tarjeta como medio de pago, no como extensión del ingreso',
          'Definir límites personales de gasto',
        ],
      },
      {
        title: 'Evaluar oportunidades de crecimiento',
        items: [
          'Analizar opciones de ahorro o inversión',
          'Utilizar el buen historial para acceder a mejores condiciones',
        ],
      },
    ],
  },
  {
    id: 'cuidado',
    title: 'Uso mejorable',
    icon: '🟡',
    description:
      'El manejo de la tarjeta es adecuado en algunos aspectos, pero presenta oportunidades de mejora. El uso ocasional del crédito sin una estrategia clara puede generar, en el tiempo, dificultades financieras.',
    riskLevel: 'medio',
    accentColor: '#c89a00',
    implications: [
      'El uso frecuente de cuotas largas incrementa el valor total pagado',
      'La falta de control puede llevar a sobreendeudamiento',
      'No conocer las condiciones del crédito limita la toma de decisiones',
    ],
    recommendations: [
      {
        title: 'Mejorar la planificación del uso',
        items: [
          'Utilizar la tarjeta solo para gastos necesarios o planificados',
          'Evitar financiar compras a largo plazo sin necesidad',
        ],
      },
      {
        title: 'Optimizar los pagos',
        items: [
          'Intentar pagar el total o un valor superior al mínimo',
          'Reducir progresivamente el número de cuotas',
        ],
      },
      {
        title: 'Fortalecer el control financiero',
        items: [
          'Llevar un registro mensual de gastos',
          'Revisar periódicamente los extractos',
        ],
      },
      {
        title: 'Conocer el producto financiero',
        items: [
          'Identificar la tasa de interés',
          'Revisar costos adicionales (cuotas de manejo, seguros, etc.)',
        ],
      },
    ],
  },
  {
    id: 'alerta',
    title: 'Alto riesgo financiero',
    icon: '🔴',
    description:
      'El uso actual de la tarjeta presenta señales de riesgo financiero. Prácticas como pagar solo el mínimo, utilizar avances en efectivo o presentar retrasos en los pagos generan acumulación de intereses y aumentan el nivel de endeudamiento. En este escenario, el crédito deja de ser una herramienta útil y se convierte en una obligación costosa que puede afectar la estabilidad financiera.',
    riskLevel: 'alto',
    accentColor: '#dc2626',
    implications: [
      'Los intereses se acumulan sobre saldos no pagados',
      'El pago mínimo prolonga la deuda en el tiempo',
      'Los avances en efectivo tienen costos más altos',
      'Los retrasos afectan el historial crediticio',
    ],
    recommendations: [
      {
        title: 'Priorizar el pago de la deuda',
        items: [
          'Pagar más del valor mínimo mensual',
          'En lo posible, cubrir el total facturado',
        ],
      },
      {
        title: 'Evitar nuevos costos financieros',
        items: [
          'Suspender avances en efectivo',
          'Reducir compras a crédito mientras se estabiliza la situación',
        ],
      },
      {
        title: 'Organizar las finanzas personales',
        items: [
          'Registrar ingresos y gastos mensuales',
          'Identificar gastos que se pueden reducir',
        ],
      },
      {
        title: 'Establecer un plan de ajuste',
        items: [
          'Definir un monto fijo mensual para reducir la deuda',
          'Establecer fechas claras de pago',
        ],
      },
    ],
  },
  {
    id: 'sin-tarjeta',
    title: 'Sin tarjeta de crédito',
    icon: '🟣',
    description:
      'Actualmente no se cuenta con tarjeta de crédito, lo cual representa una oportunidad para adquirir este producto con una base adecuada de conocimiento y hábitos financieros.',
    riskLevel: 'sin-historial',
    accentColor: '#7c3aed',
    implications: [
      'El uso inadecuado del crédito puede generar deudas innecesarias',
      'Contar con información previa permite tomar mejores decisiones',
      'Un buen inicio facilita un historial crediticio positivo',
    ],
    recommendations: [
      {
        title: 'Comprender el funcionamiento del crédito',
        items: [
          'Conocer conceptos básicos: tasa de interés, fecha de corte, pago mínimo',
          'Entender los costos asociados',
        ],
      },
      {
        title: 'Evaluar la capacidad de pago',
        items: [
          'Analizar ingresos y gastos mensuales',
          'Definir cuánto se podría pagar sin afectar el presupuesto',
        ],
      },
      {
        title: 'Definir un propósito de uso',
        items: [
          'Establecer para qué se utilizará la tarjeta',
        ],
      },
      {
        title: 'Iniciar con hábitos responsables',
        items: [
          'Evitar compras impulsivas',
          'Planificar los pagos desde el inicio',
        ],
      },
    ],
  },
];

export function getVisibleSections(answers: Answers): Section[] {
  if (answers['tiene_tarjeta'] === false) {
    return [sections[0]]; // Sin tarjeta → solo PERFIL, resultado inmediato
  }
  return sections; // Con tarjeta → PERFIL + HÁBITOS + CONTROL
}

export function calculateScore(answers: Answers): number {
  if (answers['tiene_tarjeta'] !== true) return 0;
  let score = 0;

  // uso_principal
  const uso = answers['uso_principal'];
  if (uso === 'Compras del día a día') score += 1;
  else if (uso === 'Emergencias') score += 1;
  else if (uso === 'Gustos / viajes') score += 2;
  else if (uso === 'Avances en efectivo') score += 3;

  // paga_total (select)
  const pagaTotal = answers['paga_total'];
  if (pagaTotal === 'A veces') score += 2;
  else if (pagaTotal === 'Nunca') score += 4;

  // paga_minimo
  if (answers['paga_minimo'] === true) score += 3;

  // avances
  if (answers['avances'] === true) score += 3;

  // atrasado
  if (answers['atrasado'] === true) score += 4;

  // sabe_interes
  if (answers['sabe_interes'] === false) score += 2;

  // control_gastos
  if (answers['control_gastos'] === false) score += 3;

  // compra_sin_poder
  if (answers['compra_sin_poder'] === true) score += 3;

  return score;
}

export function calculateProfile(answers: Answers): Profile {
  if (answers['tiene_tarjeta'] !== true) {
    return profiles.find((p) => p.id === 'sin-tarjeta')!;
  }
  const score = calculateScore(answers);
  if (score <= 6) return profiles.find((p) => p.id === 'saludable')!;
  if (score <= 14) return profiles.find((p) => p.id === 'cuidado')!;
  return profiles.find((p) => p.id === 'alerta')!;
}
