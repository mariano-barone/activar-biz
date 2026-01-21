'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Bot, User, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';
import { chatbotQuestions, getQuestionByOrder, getTotalQuestions, getProgressPercentage, isLastQuestion } from '@/data/questions';
import { ChatbotAnswer } from '@/types';
import { Navbar } from '@/components/ui/Navbar';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: Array<{ id: string; text: string; value: string }>;
  isTyping?: boolean;
}

interface ChatbotInterfaceProps {
  onComplete: () => void;
}

export function ChatbotInterface({ onComplete }: ChatbotInterfaceProps) {
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

  // Initialize first question
  useEffect(() => {
    if (messages.length === 0 && currentQuestion) {
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
  }, []);

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

  const handleOptionSelect = async (option: { id: string; text: string; value: string }) => {
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
    if (isLastQuestion(currentQuestion.order)) {
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
        
        // Complete after showing message
        setTimeout(() => {
          setLoading(true);
          setTimeout(() => {
            onComplete();
            setLoading(false);
          }, 2000);
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
      
      {/* Progress Bar */}
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