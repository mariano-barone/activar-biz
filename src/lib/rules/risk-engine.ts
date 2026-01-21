import { AssessmentData, Coverage, CoverageType, CoveragePriority, RiskAssessment } from '@/types';

// Datos base de coberturas
const baseCoverages: Record<CoverageType, Omit<Coverage, 'priority' | 'reasons'>> = {
  responsabilidad_civil: {
    id: 'responsabilidad_civil',
    name: 'Responsabilidad Civil General',
    description: 'Protege contra daños a terceros por tu actividad comercial',
    monthlyPriceRange: { min: 15000, max: 45000 },
    annualPriceRange: { min: 150000, max: 450000 },
    features: [
      'Daños a terceros',
      'Responsabilidad por productos',
      'Responsabilidad profesional básica',
      'Cobertura en el territorio nacional'
    ]
  },
  art: {
    id: 'art',
    name: 'ART (Aseguradora de Riesgos del Trabajo)',
    description: 'Obligatorio para empresas con empleados en relación de dependencia',
    monthlyPriceRange: { min: 25000, max: 80000 },
    annualPriceRange: { min: 300000, max: 960000 },
    features: [
      'Accidentes laborales',
      'Enfermedades profesionales',
      'Prestaciones médicas',
      'Prestaciones dinerarias',
      'Rehabilitación'
    ]
  },
  cyber_risk: {
    id: 'cyber_risk',
    name: 'Cyber Risk',
    description: 'Protección contra riesgos cibernéticos y manejo de datos',
    monthlyPriceRange: { min: 20000, max: 60000 },
    annualPriceRange: { min: 200000, max: 600000 },
    features: [
      'Violación de datos personales',
      'Ataques cibernéticos',
      'Pérdida de información',
      'Costos de notificación',
      'Gastos de recuperación'
    ]
  },
  errores_omisiones: {
    id: 'errores_omisiones',
    name: 'Errores y Omisiones (E&O)',
    description: 'Protege contra errores profesionales y fallas en servicios',
    monthlyPriceRange: { min: 18000, max: 55000 },
    annualPriceRange: { min: 180000, max: 550000 },
    features: [
      'Errores profesionales',
      'Omisiones en el servicio',
      'Fallas de software',
      'Gastos de defensa legal',
      'Daños económicos'
    ]
  },
  dno: {
    id: 'dno',
    name: 'D&O (Directores y Oficiales)',
    description: 'Protege a directores y oficiales de la empresa',
    monthlyPriceRange: { min: 30000, max: 90000 },
    annualPriceRange: { min: 350000, max: 1080000 },
    features: [
      'Responsabilidad de directores',
      'Decisiones empresariales',
      'Protección patrimonial personal',
      'Gastos legales',
      'Cobertura internacional'
    ]
  },
  integral_comercio: {
    id: 'integral_comercio',
    name: 'Integral de Comercio',
    description: 'Protección integral para oficinas y establecimientos comerciales',
    monthlyPriceRange: { min: 12000, max: 40000 },
    annualPriceRange: { min: 120000, max: 400000 },
    features: [
      'Incendio y explosión',
      'Robo y hurto',
      'Daños por agua',
      'Responsabilidad civil',
      'Pérdida de beneficios'
    ]
  }
};

// Reglas de negocio determinísticas
class RiskEngine {
  private assessmentData: AssessmentData;

  constructor(assessmentData: AssessmentData) {
    this.assessmentData = assessmentData;
  }

  // Regla principal: determinar coberturas requeridas
  getRequiredCoverages(): Array<{ coverage: Coverage; reasons: string[] }> {
    const results: Array<{ coverage: Coverage; reasons: string[] }> = [];

    // Regla 1: ART obligatorio si tiene empleados en relación de dependencia
    if (this.hasEmployeesInDependency()) {
      results.push({
        coverage: this.createCoverage('art', 'obligatorio'),
        reasons: ['Obligatorio por ley para empleados en relación de dependencia']
      });
    }

    // Regla 2: RC + Integral si tiene oficina física
    if (this.assessmentData.hasPhysicalOffice) {
      results.push({
        coverage: this.createCoverage('responsabilidad_civil', 'recomendado'),
        reasons: ['Oficina física requiere protección contra daños a terceros']
      });
      
      results.push({
        coverage: this.createCoverage('integral_comercio', 'recomendado'),
        reasons: ['Establecimiento físico necesita protección integral']
      });
    }

    // Regla 3: Cyber Risk si maneja datos personales
    if (this.assessmentData.handlesPersonalData) {
      results.push({
        coverage: this.createCoverage('cyber_risk', 'recomendado'),
        reasons: ['Manejo de datos personales requiere protección cibernética']
      });
    }

    // Regla 4: E&O si desarrolla software propio
    if (this.assessmentData.usesProprieterarySoftware) {
      results.push({
        coverage: this.createCoverage('errores_omisiones', 'recomendado'),
        reasons: ['Desarrollo de software requiere cobertura por errores profesionales']
      });
    }

    // Regla 5: D&O si tiene inversores o board
    if (this.assessmentData.hasInvestors) {
      results.push({
        coverage: this.createCoverage('dno', 'recomendado'),
        reasons: ['Presencia de inversores requiere protección de directores y oficiales']
      });
    }

    // Regla 6: Coberturas adicionales para tech/fintech
    if (this.isTechCompany()) {
      if (!results.some(r => r.coverage.id === 'cyber_risk')) {
        results.push({
          coverage: this.createCoverage('cyber_risk', 'recomendado'),
          reasons: ['Empresas tecnológicas necesitan protección cibernética']
        });
      }
      
      if (!results.some(r => r.coverage.id === 'errores_omisiones')) {
        results.push({
          coverage: this.createCoverage('errores_omisiones', 'opcional'),
          reasons: ['Recomendado para empresas tecnológicas']
        });
      }
    }

    return results;
  }

  // Calcular score de riesgo (1-10)
  calculateRiskScore(): number {
    let score = 5; // Base neutral

    // Factores que aumentan el riesgo
    if (this.assessmentData.hasPhysicalOffice) score += 1;
    if (this.assessmentData.handlesPersonalData) score += 1.5;
    if (this.assessmentData.usesProprieterarySoftware) score += 1;
    if (this.assessmentData.hasInternationalOperations) score += 1.5;
    if (this.assessmentData.employeeCount > 10) score += 1;
    if (this.assessmentData.employeeCount > 50) score += 1;
    if (this.isHighRevenueCompany()) score += 1;

    return Math.min(Math.max(score, 1), 10);
  }

  // Identificar factores de riesgo
  getRiskFactors(): string[] {
    const factors: string[] = [];

    if (this.assessmentData.hasPhysicalOffice) {
      factors.push('Establecimiento físico expuesto a riesgos');
    }

    if (this.assessmentData.handlesPersonalData) {
      factors.push('Manejo de datos personales (riesgo cibernético)');
    }

    if (this.assessmentData.usesProprieterarySoftware) {
      factors.push('Desarrollo de software (riesgo de errores profesionales)');
    }

    if (this.assessmentData.hasInternationalOperations) {
      factors.push('Operaciones internacionales (mayor exposición)');
    }

    if (this.assessmentData.employeeCount > 10) {
      factors.push('Plantilla de empleados significativa');
    }

    if (this.hasEmployeesInDependency()) {
      factors.push('Empleados en relación de dependencia (ART obligatorio)');
    }

    if (this.assessmentData.hasInvestors) {
      factors.push('Estructura de inversores (responsabilidad directorial)');
    }

    return factors;
  }

  // Generar assessment completo
  generateRiskAssessment(): RiskAssessment {
    const coverageResults = this.getRequiredCoverages();
    const recommendedCoverages = coverageResults.map(result => ({
      ...result.coverage,
      reasons: result.reasons
    }));

    return {
      companyData: this.assessmentData,
      recommendedCoverages,
      riskScore: this.calculateRiskScore(),
      riskFactors: this.getRiskFactors()
    };
  }

  // Métodos auxiliares privados
  private hasEmployeesInDependency(): boolean {
    return this.assessmentData.employmentType === 'relacion_dependencia' || 
           this.assessmentData.employmentType === 'mixto';
  }

  private isTechCompany(): boolean {
    return this.assessmentData.industry === 'tecnologia' || 
           this.assessmentData.industry === 'fintech';
  }

  private isHighRevenueCompany(): boolean {
    return this.assessmentData.revenue === '20m_50m' || 
           this.assessmentData.revenue === 'mas_50m';
  }

  private createCoverage(type: CoverageType, priority: CoveragePriority): Coverage {
    const base = baseCoverages[type];
    return {
      ...base,
      priority,
      reasons: [] // Se añadirán en el nivel superior
    };
  }
}

// API pública del motor de reglas
export function assessRisk(assessmentData: AssessmentData): RiskAssessment {
  const engine = new RiskEngine(assessmentData);
  return engine.generateRiskAssessment();
}

export function getCoverageById(id: CoverageType): Coverage | null {
  const base = baseCoverages[id];
  if (!base) return null;
  
  return {
    ...base,
    priority: 'opcional', // Default priority
    reasons: []
  };
}

export function getAllCoverages(): Coverage[] {
  return Object.values(baseCoverages).map(base => ({
    ...base,
    priority: 'opcional' as CoveragePriority,
    reasons: []
  }));
}

export { baseCoverages };