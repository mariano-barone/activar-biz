'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';
import { chatbotQuestions, getQuestionByOrder, getTotalQuestions, getProgressPercentage, isLastQuestion } from '@/data/questions';
import { ChatbotAnswer } from '@/types';

interface ChatbotInterfaceProps {
  onComplete: () => void;
}

export function ChatbotInterface({ onComplete }: ChatbotInterfaceProps) {
  const {
    currentQuestionIndex,
    answers,
    addAnswer,
    nextQuestion,
    previousQuestion,
    setLoading
  } = useAppStore();

  const [selectedOption, setSelectedOption] = useState<string>('');
  const currentQuestion = getQuestionByOrder(currentQuestionIndex + 1);
  const totalQuestions = getTotalQuestions();
  const progress = getProgressPercentage(currentQuestionIndex + 1);

  // Cargar respuesta existente si la hay
  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
      setSelectedOption(existingAnswer?.value as string || '');
    }
  }, [currentQuestionIndex, currentQuestion, answers]);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = async () => {
    if (!currentQuestion || !selectedOption) return;

    // Guardar respuesta
    const answer: ChatbotAnswer = {
      questionId: currentQuestion.id,
      value: selectedOption,
      timestamp: new Date()
    };

    addAnswer(answer);

    // Si es la última pregunta, completar assessment
    if (isLastQuestion(currentQuestion.order)) {
      setLoading(true);
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete();
      setLoading(false);
    } else {
      nextQuestion();
      setSelectedOption('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      previousQuestion();
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Assessment Completado</h2>
          <p className="text-muted-foreground">Procesando tus respuestas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Pregunta {currentQuestionIndex + 1} de {totalQuestions}
            </span>
            <Badge variant="outline">
              {progress}% completado
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.text}
            </CardTitle>
            {currentQuestion.required && (
              <CardDescription>
                Esta pregunta es requerida para generar tu recomendación
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedOption === option.value ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto py-4 px-6 ${
                    selectedOption === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option.value
                        ? 'bg-primary-foreground border-primary-foreground'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedOption === option.value && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <span className="text-base font-medium">
                      {option.text}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="flex items-center space-x-2"
          >
            <span>
              {isLastQuestion(currentQuestion.order) ? 'Finalizar' : 'Siguiente'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}