import { ChatbotQuestion, CompanyType, Industry, EmploymentType, Revenue } from '@/types';

export const chatbotQuestions: ChatbotQuestion[] = [
  {
    id: 'company_type',
    text: '¡Hola! Soy el asistente de Activar Business. Para comenzar, ¿cómo definirías tu empresa?',
    type: 'single',
    required: true,
    order: 1,
    options: [
      { id: 'startup', text: '🚀 Startup', value: 'startup' },
      { id: 'pyme', text: '🏢 PYME', value: 'pyme' },
      { id: 'corporacion', text: '🏛️ Corporación', value: 'corporacion' },
    ],
  },
  {
    id: 'industry',
    text: 'Perfecto. ¿A qué rubro se dedica principalmente tu empresa?',
    type: 'single',
    required: true,
    order: 2,
    options: [
      { id: 'tecnologia', text: '💻 Tecnología', value: 'tecnologia' },
      { id: 'fintech', text: '💳 Fintech', value: 'fintech' },
      { id: 'comercio', text: '🛒 Comercio', value: 'comercio' },
      { id: 'servicios', text: '🤝 Servicios', value: 'servicios' },
      { id: 'manufactura', text: '🏭 Manufactura', value: 'manufactura' },
      { id: 'salud', text: '⚕️ Salud', value: 'salud' },
      { id: 'educacion', text: '🎓 Educación', value: 'educacion' },
      { id: 'otros', text: '📋 Otros', value: 'otros' },
    ],
  },
  {
    id: 'employee_count',
    text: '¿Cuántos empleados tiene actualmente tu empresa?',
    type: 'single',
    required: true,
    order: 3,
    options: [
      { id: '0', text: '👤 Solo yo', value: '0' },
      { id: '1_5', text: '👥 1-5 personas', value: '3' },
      { id: '6_10', text: '👥 6-10 personas', value: '8' },
      { id: '11_25', text: '👥 11-25 personas', value: '18' },
      { id: '26_50', text: '👥 26-50 personas', value: '38' },
      { id: '51+', text: '👥 Más de 50', value: '75' },
    ],
  },
  {
    id: 'employment_type',
    text: '¿Qué tipo de relación laboral predomina en tu empresa?',
    type: 'single',
    required: true,
    order: 4,
    options: [
      { id: 'monotributistas', text: '📄 Solo monotributistas', value: 'monotributistas' },
      { id: 'relacion_dependencia', text: '💼 Relación de dependencia', value: 'relacion_dependencia' },
      { id: 'mixto', text: '🔄 Mixto (ambos)', value: 'mixto' },
      { id: 'sin_empleados', text: '❌ Sin empleados', value: 'sin_empleados' },
    ],
  },
  {
    id: 'physical_office',
    text: '¿Tu empresa tiene una oficina física o establecimiento comercial?',
    type: 'boolean',
    required: true,
    order: 5,
    options: [
      { id: 'yes', text: '✅ Sí, tenemos oficina física', value: 'true' },
      { id: 'no', text: '❌ No, trabajamos 100% remoto', value: 'false' },
    ],
  },
  {
    id: 'personal_data',
    text: '¿Tu empresa maneja o almacena datos personales de clientes?',
    type: 'boolean',
    required: true,
    order: 6,
    options: [
      { id: 'yes', text: '✅ Sí, manejamos datos personales', value: 'true' },
      { id: 'no', text: '❌ No manejamos datos personales', value: 'false' },
    ],
  },
  {
    id: 'proprietary_software',
    text: '¿Tu empresa desarrolla o usa software propio para sus operaciones?',
    type: 'boolean',
    required: true,
    order: 7,
    options: [
      { id: 'yes', text: '✅ Sí, desarrollamos/usamos software propio', value: 'true' },
      { id: 'no', text: '❌ No, solo usamos software estándar', value: 'false' },
    ],
  },
  {
    id: 'revenue',
    text: '¿Cuál es la facturación anual estimada de tu empresa?',
    type: 'single',
    required: true,
    order: 8,
    options: [
      { id: 'menos_1m', text: '💰 Menos de $1M', value: 'menos_1m' },
      { id: '1m_5m', text: '💰 $1M - $5M', value: '1m_5m' },
      { id: '5m_20m', text: '💰 $5M - $20M', value: '5m_20m' },
      { id: '20m_50m', text: '💰 $20M - $50M', value: '20m_50m' },
      { id: 'mas_50m', text: '💰 Más de $50M', value: 'mas_50m' },
    ],
  },
  {
    id: 'investors',
    text: '¿Tu empresa tiene inversores externos o un directorio/board?',
    type: 'boolean',
    required: true,
    order: 9,
    options: [
      { id: 'yes', text: '✅ Sí, tenemos inversores o board', value: 'true' },
      { id: 'no', text: '❌ No, es capital propio', value: 'false' },
    ],
  },
  {
    id: 'international_operations',
    text: 'Para terminar, ¿tu empresa tiene operaciones internacionales?',
    type: 'boolean',
    required: true,
    order: 10,
    options: [
      { id: 'yes', text: '🌍 Sí, operamos internacionalmente', value: 'true' },
      { id: 'no', text: '🇦🇷 No, solo operaciones locales', value: 'false' },
    ],
  },
];

// Helper functions
export function getQuestionById(id: string): ChatbotQuestion | undefined {
  return chatbotQuestions.find(q => q.id === id);
}

export function getQuestionByOrder(order: number): ChatbotQuestion | undefined {
  return chatbotQuestions.find(q => q.order === order);
}

export function getTotalQuestions(): number {
  return chatbotQuestions.length;
}

export function getNextQuestion(currentOrder: number): ChatbotQuestion | undefined {
  return chatbotQuestions.find(q => q.order === currentOrder + 1);
}

export function getPreviousQuestion(currentOrder: number): ChatbotQuestion | undefined {
  return chatbotQuestions.find(q => q.order === currentOrder - 1);
}

export function isLastQuestion(order: number): boolean {
  return order === Math.max(...chatbotQuestions.map(q => q.order));
}

export function getProgressPercentage(currentOrder: number): number {
  const total = getTotalQuestions();
  return Math.round((currentOrder / total) * 100);
}