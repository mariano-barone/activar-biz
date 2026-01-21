'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Bot, User, CheckCircle, ArrowLeft, Sparkles, Shield, AlertTriangle, TrendingUp, Calculator, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';
import { chatbotQuestions, getQuestionByOrder, getTotalQuestions, getProgressPercentage, isLastQuestion } from '@/data/questions';
import { ChatbotAnswer, Coverage, RiskAssessment, AssessmentData } from '@/types';
import { Navbar } from '@/components/ui/Navbar';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: Array<{ id: string; text: string; value: string }>;
  isTyping?: boolean;
  component?: 'results' | 'risk-summary' | 'coverages';
  data?: any;
}

interface ChatbotInterfaceProps {
  onComplete: () => void;
  riskAssessment?: any;
  showResults?: boolean;
}

export function ChatbotInterface({ onComplete, riskAssessment, showResults }: ChatbotInterfaceProps) {
  const {
    answers,
    addAnswer,
    setLoading,
    setCurrentStep
  } = useAppStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(getQuestionByOrder(1));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const totalQuestions = getTotalQuestions();
  const progress = getProgressPercentage(currentQuestionOrder);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize first question OR show results
  useEffect(() => {
    if (showResults && riskAssessment && messages.length === 0) {
      // Show results flow
      showResultsFlow(riskAssessment);
    } else if (!showResults && messages.length === 0 && currentQuestion) {
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'bot',
        content: '¡Hola! 👋 Soy el asistente de Activar Business. Te haré algunas preguntas para entender mejor tu empresa y recomendarte los seguros exactos que necesitas.',
        timestamp: new Date()
      };

      // Add first question immediately after welcome
      const firstQuestionMessage: ChatMessage = {
        id: currentQuestion.id,
        type: 'bot',
        content: currentQuestion.text,
        timestamp: new Date(),
        options: currentQuestion.options
      };

      setMessages([welcomeMessage, firstQuestionMessage]);
    }
  }, [showResults, riskAssessment]);

  const addBotQuestion = (question: any) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: question.id,
        type: 'bot',
        content: question.text,
        timestamp: new Date(),
        options: question.options
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const showResultsFlow = (assessment: RiskAssessment) => {
    // Welcome message for results
    const welcomeMessage: ChatMessage = {
      id: 'results-welcome',
      type: 'bot',
      content: '¡Excelente! He terminado el análisis de tu empresa. Aquí están los resultados detallados de tu evaluación de riesgos y nuestras recomendaciones personalizadas.',
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);

    // Add risk summary after delay
    setTimeout(() => {
      const riskSummaryMessage: ChatMessage = {
        id: 'risk-summary',
        type: 'bot',
        content: '',
        timestamp: new Date(),
        component: 'risk-summary',
        data: assessment
      };
      setMessages(prev => [...prev, riskSummaryMessage]);
    }, 1500);

    // Add coverages after another delay
    setTimeout(() => {
      const coveragesMessage: ChatMessage = {
        id: 'coverages',
        type: 'bot',
        content: '',
        timestamp: new Date(),
        component: 'coverages',
        data: assessment
      };
      setMessages(prev => [...prev, coveragesMessage]);
    }, 3000);

    // Add final message with action buttons
    setTimeout(() => {
      const finalMessage: ChatMessage = {
        id: 'results-final',
        type: 'bot',
        content: 'Con esta información puedes tomar decisiones informadas sobre los seguros que necesita tu empresa.',
        timestamp: new Date(),
        options: [
          { id: 'continue', text: '🎯 Continuar a cotizaciones', value: 'continue' },
          { id: 'restart', text: '🔄 Nueva evaluación', value: 'restart' }
        ]
      };
      setMessages(prev => [...prev, finalMessage]);
    }, 4500);
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: 'Bajo', color: 'text-green-500', bgColor: 'bg-green-500' };
    if (score <= 6) return { level: 'Medio', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    return { level: 'Alto', color: 'text-red-500', bgColor: 'bg-red-500' };
  };

  const handleQuoteClick = (coverageId: string) => {
    console.log('Quote requested for:', coverageId);
    // Aquí implementarías la lógica para mostrar cotización específica
  };

  const processAndShowResults = async () => {
    try {
      setIsTyping(true);
      
      // Convert answers to assessment data (same logic as MainApp)
      const assessmentData = convertAnswersToAssessmentData();
      
      // Import and run risk assessment
      const { assessRisk } = await import('@/lib/rules/risk-engine');
      const riskAssessment = assessRisk(assessmentData);
      
      setIsTyping(false);
      
      // Show results as chat messages
      setTimeout(() => {
        const analysisMessage: ChatMessage = {
          id: 'analysis-intro',
          type: 'bot',
          content: '¡Análisis completado! Aquí tienes los resultados detallados de la evaluación de riesgos de tu empresa:',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, analysisMessage]);
      }, 500);

      // Add risk summary after delay
      setTimeout(() => {
        const riskSummaryMessage: ChatMessage = {
          id: 'risk-summary',
          type: 'bot',
          content: '',
          timestamp: new Date(),
          component: 'risk-summary',
          data: riskAssessment
        };
        setMessages(prev => [...prev, riskSummaryMessage]);
      }, 1500);

      // Add coverages after another delay
      setTimeout(() => {
        const coveragesMessage: ChatMessage = {
          id: 'coverages',
          type: 'bot',
          content: '',
          timestamp: new Date(),
          component: 'coverages',
          data: riskAssessment
        };
        setMessages(prev => [...prev, coveragesMessage]);
      }, 3000);

      // Add final action message
      setTimeout(() => {
        const finalMessage: ChatMessage = {
          id: 'results-final',
          type: 'bot',
          content: 'Con esta información puedes tomar decisiones informadas sobre los seguros que necesita tu empresa.',
          timestamp: new Date(),
          options: [
            { id: 'continue', text: '🎯 Continuar a cotizaciones', value: 'continue' },
            { id: 'restart', text: '🔄 Nueva evaluación', value: 'restart' }
          ]
        };
        setMessages(prev => [...prev, finalMessage]);
      }, 4500);

    } catch (error) {
      console.error('Error processing results:', error);
      setIsTyping(false);
      
      const errorMessage: ChatMessage = {
        id: 'error',
        type: 'bot',
        content: 'Ha ocurrido un error procesando tu evaluación. Por favor, intenta nuevamente.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const convertAnswersToAssessmentData = () => {
    const getAnswerValue = (questionId: string): string => {
      const answer = answers.find(a => a.questionId === questionId);
      return answer?.value as string || '';
    };

    return {
      companyType: getAnswerValue('company_type') as any || 'startup',
      industry: getAnswerValue('industry') as any || 'tecnologia',
      employeeCount: parseInt(getAnswerValue('employee_count')) || 0,
      employmentType: getAnswerValue('employment_type') as any || 'sin_empleados',
      hasPhysicalOffice: getAnswerValue('physical_office') === 'true',
      handlesPersonalData: getAnswerValue('personal_data') === 'true',
      usesProprieterarySoftware: getAnswerValue('proprietary_software') === 'true',
      revenue: getAnswerValue('revenue') as any || 'menos_1m',
      hasInvestors: getAnswerValue('investors') === 'true',
      hasInternationalOperations: getAnswerValue('international_operations') === 'true',
      answers: answers
    };
  };

  const handleOptionSelect = async (option: { id: string; text: string; value: string }) => {
    // Handle results actions
    if (option.value === 'continue') {
      // Add user message
      const userMessage: ChatMessage = {
        id: `action-${option.id}`,
        type: 'user',
        content: option.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Add confirmation message
      setTimeout(() => {
        const confirmMessage: ChatMessage = {
          id: 'continue-confirm',
          type: 'bot',
          content: '¡Perfecto! Te redirigiré a la sección de cotizaciones donde podrás obtener precios detallados para los seguros que selecciones.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, confirmMessage]);
        
        setTimeout(() => {
          onComplete();
        }, 2000);
      }, 1000);
      return;
    }
    
    if (option.value === 'restart') {
      setLoading(true);
      setTimeout(() => {
        setCurrentStep('landing');
        setLoading(false);
      }, 1000);
      return;
    }

    // Regular question flow
    if (!currentQuestion) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `answer-${currentQuestion.id}`,
      type: 'user',
      content: option.text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Save answer
    const answer: ChatbotAnswer = {
      questionId: currentQuestion.id,
      value: option.value,
      timestamp: new Date()
    };

    addAnswer(answer);

    // Check if it's the last question
    console.log('Current question order:', currentQuestion.order, 'Total questions:', getTotalQuestions());
    if (currentQuestion.order === 10 || isLastQuestion(currentQuestion.order)) {
      // Add completion message
      setIsTyping(true);
      setTimeout(() => {
        const completionMessage: ChatMessage = {
          id: 'completion',
          type: 'bot',
          content: '¡Perfecto! 🎉 Ya tengo toda la información que necesito. Ahora voy a analizar tu empresa y generar tu mapa de riesgos personalizado con las recomendaciones de seguros.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, completionMessage]);
        setIsTyping(false);
        
        // Process and show results instead of calling onComplete
        setTimeout(() => {
          processAndShowResults();
        }, 2000);
      }, 1000);
    } else {
      // Move to next question
      const nextQuestionOrder = currentQuestionOrder + 1;
      const nextQ = getQuestionByOrder(nextQuestionOrder);
      
      if (nextQ) {
        setCurrentQuestionOrder(nextQuestionOrder);
        setCurrentQuestion(nextQ);
        
        setTimeout(() => {
          addBotQuestion(nextQ);
        }, 1500);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep('landing');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Progress Bar - Only show when not showing results */}
      {!showResults && (
        <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
                <span className="text-sm font-medium">
                  Pregunta {currentQuestionOrder} de {totalQuestions}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {progress}% completado
              </Badge>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>
        </div>
      )}

      {/* Results Header - Only show when showing results */}
      {showResults && (
        <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Nueva evaluación
                </Button>
                <span className="text-sm font-medium">Resultados del análisis</span>
              </div>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completado
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'bot' ? 'bg-primary' : 'bg-muted'
                }`}>
                  {message.type === 'bot' ? (
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.component ? (
                    // Special component messages
                    <div className="space-y-4">
                      {message.component === 'risk-summary' && (
                        <div className="space-y-4">
                          <Card className="p-6 bg-card border-border/50">
                            <div className="text-center space-y-4">
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                                <Shield className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Análisis de Riesgos</span>
                              </div>
                              
                              <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Nivel de Riesgo: {getRiskLevel(message.data.riskScore).level}</h3>
                                <div className="flex items-center justify-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${getRiskLevel(message.data.riskScore).bgColor}`}></div>
                                  <span className="text-lg font-semibold">{message.data.riskScore}/10</span>
                                </div>
                              </div>
                              
                              <Progress value={message.data.riskScore * 10} className="w-full h-3" />
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                                {message.data.riskFactors.map((factor: any, index: number) => (
                                  <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                    <span className="text-sm">{factor}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Card>
                        </div>
                      )}
                      
                      {message.component === 'coverages' && (
                        <div className="space-y-6">
                          {/* Obligatory Coverages */}
                          {message.data.recommendedCoverages.filter((c: Coverage) => c.priority === 'obligatorio').length > 0 && (
                            <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                              <CardHeader className="p-0 mb-4">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="w-5 h-5 text-red-500" />
                                  <CardTitle className="text-lg text-red-700 dark:text-red-300">Seguros Obligatorios</CardTitle>
                                </div>
                                <CardDescription className="text-red-600/80 dark:text-red-400/80">
                                  Requeridos por ley para tu tipo de empresa
                                </CardDescription>
                              </CardHeader>
                              <div className="space-y-3">
                                {message.data.recommendedCoverages.filter((c: Coverage) => c.priority === 'obligatorio').map((coverage: Coverage) => (
                                  <div key={coverage.id} className="flex items-center justify-between p-4 bg-white dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800/50">
                                    <div className="space-y-1">
                                      <h4 className="font-semibold text-red-800 dark:text-red-200">{coverage.name}</h4>
                                      <p className="text-sm text-red-600 dark:text-red-300">{coverage.description}</p>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="destructive" className="text-xs">Obligatorio</Badge>
                                        <span className="text-sm font-medium text-red-700 dark:text-red-300">${coverage.annualPriceRange.min.toLocaleString()} - ${coverage.annualPriceRange.max.toLocaleString()}/año</span>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() => handleQuoteClick(coverage.id)}
                                      className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                      Cotizar
                                      <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          )}

                          {/* Recommended Coverages */}
                          {message.data.recommendedCoverages.filter((c: Coverage) => c.priority === 'recomendado').length > 0 && (
                            <Card className="p-6 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                              <CardHeader className="p-0 mb-4">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                                  <CardTitle className="text-lg text-yellow-700 dark:text-yellow-300">Altamente Recomendados</CardTitle>
                                </div>
                                <CardDescription className="text-yellow-600/80 dark:text-yellow-400/80">
                                  Esenciales para tu perfil de riesgo
                                </CardDescription>
                              </CardHeader>
                              <div className="space-y-3">
                                {message.data.recommendedCoverages.filter((c: Coverage) => c.priority === 'recomendado').map((coverage: Coverage) => (
                                  <div key={coverage.id} className="flex items-center justify-between p-4 bg-white dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
                                    <div className="space-y-1">
                                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">{coverage.name}</h4>
                                      <p className="text-sm text-yellow-600 dark:text-yellow-300">{coverage.description}</p>
                                      <div className="flex items-center gap-2">
                                        <Badge className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">Recomendado</Badge>
                                        <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">${coverage.annualPriceRange.min.toLocaleString()} - ${coverage.annualPriceRange.max.toLocaleString()}/año</span>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleQuoteClick(coverage.id)}
                                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-700 dark:text-yellow-300 dark:hover:bg-yellow-900"
                                    >
                                      Cotizar
                                      <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          )}

                          {/* Optional Coverages */}
                          {message.data.recommendedCoverages.filter((c: Coverage) => c.priority === 'opcional').length > 0 && (
                            <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                              <CardHeader className="p-0 mb-4">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-5 h-5 text-blue-600" />
                                  <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Coberturas Opcionales</CardTitle>
                                </div>
                                <CardDescription className="text-blue-600/80 dark:text-blue-400/80">
                                  Protección adicional para mayor tranquilidad
                                </CardDescription>
                              </CardHeader>
                              <div className="space-y-3">
                                {message.data.recommendedCoverages.filter((c: Coverage) => c.priority === 'opcional').map((coverage: Coverage) => (
                                  <div key={coverage.id} className="flex items-center justify-between p-4 bg-white dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800/50">
                                    <div className="space-y-1">
                                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">{coverage.name}</h4>
                                      <p className="text-sm text-blue-600 dark:text-blue-300">{coverage.description}</p>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="text-xs">Opcional</Badge>
                                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">${coverage.annualPriceRange.min.toLocaleString()} - ${coverage.annualPriceRange.max.toLocaleString()}/año</span>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleQuoteClick(coverage.id)}
                                      className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
                                    >
                                      Cotizar
                                      <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular text messages
                    <Card className={`p-4 ${
                      message.type === 'bot' 
                        ? 'bg-card border-border/50' 
                        : 'bg-primary text-primary-foreground border-primary'
                    }`}>
                      <p className="text-base leading-relaxed">{message.content}</p>
                      
                      {/* Options for bot messages */}
                      {message.type === 'bot' && message.options && (
                        <div className="mt-4 space-y-2">
                          {message.options.map((option) => (
                            <Button
                              key={option.id}
                              variant="outline"
                              size="sm"
                              onClick={() => handleOptionSelect(option)}
                              className="w-full justify-start text-left bg-background/50 hover:bg-background border-border/30 hover:border-border"
                            >
                              {option.text}
                            </Button>
                          ))}
                        </div>
                      )}
                    </Card>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <Card className="p-4 bg-card border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Escribiendo...</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}