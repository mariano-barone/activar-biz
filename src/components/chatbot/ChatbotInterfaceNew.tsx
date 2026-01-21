'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Bot, User, CheckCircle, ArrowLeft, Sparkles, Shield, AlertTriangle, TrendingUp, Calculator, ArrowRight, Send, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useAppStore } from '@/lib/store/app-store';
import { chatbotQuestions, getQuestionByOrder, getTotalQuestions, getProgressPercentage, isLastQuestion } from '@/data/questions';
import { ChatbotAnswer, Coverage, RiskAssessment } from '@/types';
import { assessRisk } from '@/lib/rules/risk-engine';

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
      content: '¡Análisis completado! 🎉 Aquí tienes los resultados detallados de tu evaluación de riesgos y nuestras recomendaciones personalizadas.',
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

    // Add final message
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
  };

  const handleOptionSelect = async (option: { id: string; text: string; value: string }) => {
    // Handle results actions
    if (showResults) {
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
      } else if (option.value === 'restart') {
        setLoading(true);
        setTimeout(() => {
          setCurrentStep('landing');
          setLoading(false);
        }, 1000);
      }
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
          content: '¡Perfecto! 🎉 Ya tengo toda la información que necesito. Procesando tu análisis...',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, completionMessage]);
        setIsTyping(false);
        
        // Process and show results
        setTimeout(() => {
          const assessmentData = {
            companyType: 'startup' as any,
            industry: 'tecnologia' as any,
            employeeCount: 5,
            employmentType: 'mixto' as any,
            hasPhysicalOffice: true,
            handlesPersonalData: true,
            usesProprieterarySoftware: true,
            revenue: '1m_5m' as any,
            hasInvestors: true,
            hasInternationalOperations: false,
            answers: answers
          };
          
          const assessment = assessRisk(assessmentData);
          showResultsFlow(assessment);
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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#13161B' }}>
      {/* Chat Wrapper Container */}
      <div className="w-full max-w-2xl h-[90vh] flex flex-col rounded-lg overflow-hidden shadow-2xl" style={{ backgroundColor: '#0C0E12' }}>
        
        {/* Chat Header */}
        <div className="border-b px-4 py-3 flex items-center justify-between" style={{ backgroundColor: '#0C0E12', borderColor: '#2A2D36' }}>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack} className="p-2 text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">activar biz</h3>
                <p className="text-xs text-gray-400">
                  {showResults ? 'Análisis completado' : `Pregunta ${currentQuestionOrder} de ${totalQuestions}`}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!showResults && (
              <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                {progress}% completado
              </Badge>
            )}
            <Button variant="outline" size="sm" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700">
              Contacto
            </Button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-dark">
          <style jsx>{`
            .scrollbar-dark::-webkit-scrollbar {
              width: 6px;
            }
            .scrollbar-dark::-webkit-scrollbar-track {
              background: #0C0E12;
            }
            .scrollbar-dark::-webkit-scrollbar-thumb {
              background: #2A2D36;
              border-radius: 3px;
            }
            .scrollbar-dark::-webkit-scrollbar-thumb:hover {
              background: #3A3D46;
            }
          `}</style>
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {/* Bot Message */}
              {message.type === 'bot' && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 max-w-[480px] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white">activar biz</span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    {message.content && (
                      <div className="rounded-lg p-3 shadow-sm text-white" style={{ backgroundColor: '#13161B' }}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    )}

                    {/* Special Components */}
                    {message.component === 'risk-summary' && (
                      <div className="rounded-lg p-4 shadow-sm" style={{ backgroundColor: '#13161B' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm text-white">Análisis de Riesgos</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-white">Nivel de Riesgo</span>
                            <Badge className={`${getRiskLevel(message.data.riskScore).color === 'text-yellow-500' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'} text-xs`}>
                              {getRiskLevel(message.data.riskScore).level}
                            </Badge>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-2 text-white">{message.data.riskScore}/10</div>
                            <Progress value={message.data.riskScore * 10} className="w-full h-2 mb-3" />
                          </div>
                          
                          {message.data.riskFactors.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 text-white">Factores de exposición</h4>
                              <p className="text-xs text-gray-400 mb-2">Riesgos identificados en tu perfil empresarial</p>
                              <div className="space-y-1">
                                {message.data.riskFactors.slice(0, 3).map((factor: string, index: number) => (
                                  <div key={index} className="flex items-center gap-2 bg-orange-900/20 px-3 py-1.5 rounded-md">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span className="text-xs text-orange-300">{factor}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {message.component === 'coverages' && (
                      <div className="space-y-3">
                        {message.data.recommendedCoverages.filter((c: Coverage) => c.priority === 'recomendado').length > 0 && (
                          <div className="rounded-lg p-4 shadow-sm" style={{ backgroundColor: '#13161B' }}>
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="w-4 h-4 text-blue-400" />
                              <span className="font-medium text-sm text-white">Altamente recomendados</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-3">Esenciales para tu perfil de riesgo</p>
                            
                            <div className="space-y-3">
                              {message.data.recommendedCoverages.filter((c: Coverage) => c.priority === 'recomendado').map((coverage: Coverage) => (
                                <div key={coverage.id} className="border border-gray-700 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium text-sm text-white">{coverage.name}</h4>
                                      <Badge className="bg-purple-900/50 text-purple-300 text-xs border-purple-700">Popular</Badge>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2 mb-3">
                                    {coverage.features.slice(0, 2).map((feature, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <span className="text-xs text-gray-400">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className="space-y-3 mb-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                                      <div className="flex items-center gap-3">
                                        <Image 
                                          src="/Logo_Meridional_Blanco-01@2x.png" 
                                          alt="Meridional Seguros" 
                                          width={120} 
                                          height={80}
                                          className="rounded-sm"
                                        />
                                      </div>
                                      <div className="text-right">
                                        <div className="text-sm font-medium text-white">Desde ${Math.round(coverage.annualPriceRange.min/12).toLocaleString()}</div>
                                        <div className="text-xs text-gray-400">al mes</div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                                      <div className="flex items-center gap-3">
                                        <Image 
                                          src="/Allianz logo blanco.png" 
                                          alt="Allianz Seguros" 
                                          width={120} 
                                          height={60}
                                          className="rounded-sm"
                                        />
                                      </div>
                                      <div className="text-right">
                                        <div className="text-sm font-medium text-white">Desde ${Math.round(coverage.annualPriceRange.min * 1.1/12).toLocaleString()}</div>
                                        <div className="text-xs text-gray-400">al mes</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Button 
                                      className="w-full text-white text-sm hover:opacity-90"
                                      style={{ backgroundColor: '#2F80ED' }}
                                      onClick={() => handleQuoteClick(coverage.id)}
                                    >
                                      Cotizar ahora
                                    </Button>
                                    
                                    <Button 
                                      variant="outline"
                                      className="w-full text-sm border-green-600 bg-green-600/10 text-green-400 hover:bg-green-600/20 flex items-center gap-2"
                                      onClick={() => window.open('https://wa.me/5491234567890?text=Hola, me interesa obtener asesoramiento sobre seguros para mi empresa', '_blank')}
                                    >
                                      <Image 
                                        src="/icons8-whatsapp.svg" 
                                        alt="WhatsApp" 
                                        width={16} 
                                        height={16}
                                      />
                                      Solicitar asesoramiento humano
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Options for bot messages */}
                    {message.type === 'bot' && message.options && (
                      <div className="space-y-2">
                        {message.options.map((option) => (
                          <Button
                            key={option.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleOptionSelect(option)}
                            className="w-full justify-start text-left border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
                            style={{ backgroundColor: '#13161B' }}
                          >
                            {option.text}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* User Message */}
              {message.type === 'user' && (
                <div className="flex justify-end">
                  <div className="flex items-start gap-3 max-w-[480px]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-medium text-sm text-white">You</span>
                        <span className="text-xs text-gray-500">Just now</span>
                      </div>
                      <div className="text-white rounded-lg px-3 py-2" style={{ backgroundColor: '#2F80ED' }}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-6" style={{ backgroundColor: '#2F80ED' }}>
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="rounded-lg px-3 py-2" style={{ backgroundColor: '#13161B' }}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        {!showResults && (
          <div className="border-t p-4" style={{ backgroundColor: '#0C0E12', borderColor: '#2A2D36' }}>
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-full px-4 py-2 flex items-center gap-2" style={{ backgroundColor: '#13161B' }}>
                <span className="text-sm text-gray-500">Send a message</span>
              </div>
              <Button size="sm" className="rounded-full w-10 h-10 p-0 hover:opacity-90" style={{ backgroundColor: '#2F80ED' }}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}