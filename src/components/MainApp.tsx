'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { LandingPage } from '@/components/landing/LandingPageNew';
import { ChatbotInterface } from '@/components/chatbot/ChatbotInterfaceNew';
import { RiskMap } from '@/components/results/RiskMap';
import { assessRisk } from '@/lib/rules/risk-engine';
import { AssessmentData, ChatbotAnswer, CompanyType, Industry, EmploymentType, Revenue } from '@/types';

export function MainApp() {
  const {
    currentStep,
    answers,
    riskAssessment,
    setCurrentStep,
    setRiskAssessment,
    updateAssessmentData
  } = useAppStore();

  const [isProcessing, setIsProcessing] = useState(false);

  // Ensure page starts at the top
  useEffect(() => {
    if (currentStep === 'landing') {
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  const handleStartAssessment = (initialMessage?: string) => {
    // Si hay un mensaje inicial, podríamos guardarlo en el store para contexto
    if (initialMessage) {
      console.log('Initial message:', initialMessage);
      // Aquí podrías guardar el mensaje inicial para usar en el chatbot
    }
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = async () => {
    setIsProcessing(true);
    
    try {
      // Convertir respuestas en datos de assessment
      const assessmentData = convertAnswersToAssessmentData(answers);
      updateAssessmentData(assessmentData);
      
      // Ejecutar motor de reglas
      const assessment = assessRisk(assessmentData);
      setRiskAssessment(assessment);
      
      // Ir a resultados
      setCurrentStep('results');
    } catch (error) {
      console.error('Error processing assessment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinueToQuotes = () => {
    setCurrentStep('quotes');
  };

  const convertAnswersToAssessmentData = (answers: ChatbotAnswer[]): AssessmentData => {
    const getAnswerValue = (questionId: string): string => {
      const answer = answers.find(a => a.questionId === questionId);
      return answer?.value as string || '';
    };

    return {
      companyType: getAnswerValue('company_type') as CompanyType || 'startup',
      industry: getAnswerValue('industry') as Industry || 'tecnologia',
      employeeCount: parseInt(getAnswerValue('employee_count')) || 0,
      employmentType: getAnswerValue('employment_type') as EmploymentType || 'sin_empleados',
      hasPhysicalOffice: getAnswerValue('physical_office') === 'true',
      handlesPersonalData: getAnswerValue('personal_data') === 'true',
      usesProprieterarySoftware: getAnswerValue('proprietary_software') === 'true',
      revenue: getAnswerValue('revenue') as Revenue || 'menos_1m',
      hasInvestors: getAnswerValue('investors') === 'true',
      hasInternationalOperations: getAnswerValue('international_operations') === 'true',
      answers: answers
    };
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Analizando tu empresa</h2>
          <p className="text-muted-foreground">Procesando respuestas y generando recomendaciones...</p>
        </div>
      </div>
    );
  }

  switch (currentStep) {
    case 'landing':
      return <LandingPage onStartAssessment={handleStartAssessment} />;
    
    case 'assessment':
      return <ChatbotInterface onComplete={handleAssessmentComplete} />;
    
    case 'results':
      return riskAssessment ? (
        <ChatbotInterface 
          onComplete={handleContinueToQuotes}
          riskAssessment={riskAssessment}
          showResults={true}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p>Error: No se pudo generar el assessment</p>
        </div>
      );
    
    case 'quotes':
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Cotizaciones</h2>
            <p className="text-muted-foreground mb-4">Esta sección se implementará en la próxima iteración</p>
            <button 
              onClick={() => setCurrentStep('landing')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    
    default:
      return <LandingPage onStartAssessment={handleStartAssessment} />;
  }
}