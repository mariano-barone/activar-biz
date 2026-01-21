// Tipos principales para el MVP de Activar Business

export type CompanyType = 'startup' | 'pyme' | 'corporacion';

export type Industry = 
  | 'tecnologia'
  | 'comercio'
  | 'servicios'
  | 'manufactura'
  | 'salud'
  | 'educacion'
  | 'fintech'
  | 'otros';

export type EmploymentType = 
  | 'monotributistas'
  | 'relacion_dependencia'
  | 'mixto'
  | 'sin_empleados';

export type Revenue = 
  | 'menos_1m'
  | '1m_5m'
  | '5m_20m'
  | '20m_50m'
  | 'mas_50m';

export interface ChatbotQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'boolean';
  options?: ChatbotOption[];
  required: boolean;
  order: number;
}

export interface ChatbotOption {
  id: string;
  text: string;
  value: string;
}

export interface ChatbotAnswer {
  questionId: string;
  value: string | string[];
  timestamp: Date;
}

export interface AssessmentData {
  companyType: CompanyType;
  industry: Industry;
  employeeCount: number;
  employmentType: EmploymentType;
  hasPhysicalOffice: boolean;
  handlesPersonalData: boolean;
  usesProprieterarySoftware: boolean;
  revenue: Revenue;
  hasInvestors: boolean;
  hasInternationalOperations: boolean;
  answers: ChatbotAnswer[];
}

export type CoveragePriority = 'obligatorio' | 'recomendado' | 'opcional';

export type CoverageType = 
  | 'responsabilidad_civil'
  | 'art'
  | 'cyber_risk'
  | 'errores_omisiones'
  | 'dno'
  | 'integral_comercio';

export interface Coverage {
  id: CoverageType;
  name: string;
  description: string;
  priority: CoveragePriority;
  monthlyPriceRange: {
    min: number;
    max: number;
  };
  annualPriceRange: {
    min: number;
    max: number;
  };
  features: string[];
  reasons?: string[];
}

export interface RiskAssessment {
  companyData: AssessmentData;
  recommendedCoverages: Coverage[];
  riskScore: number;
  riskFactors: string[];
}

export interface Quote {
  coverageId: CoverageType;
  monthlyPrice: number;
  annualPrice: number;
  discount?: number;
  validUntil: Date;
  features: string[];
}

export interface ContractDemo {
  id: string;
  companyName: string;
  coverages: Coverage[];
  totalMonthly: number;
  totalAnnual: number;
  createdAt: Date;
  certificateUrl?: string;
}

export interface AdminConfig {
  insuranceBrand: string;
  priceMultipliers: Record<CoverageType, number>;
  marketingCopy: Record<string, string>;
  featureFlags: Record<string, boolean>;
}