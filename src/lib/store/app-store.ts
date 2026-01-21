import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssessmentData, ChatbotAnswer, RiskAssessment, ContractDemo } from '@/types';

interface AppState {
  // Assessment state
  currentQuestionIndex: number;
  answers: ChatbotAnswer[];
  assessmentData: Partial<AssessmentData>;
  riskAssessment: RiskAssessment | null;
  
  // Contract state
  selectedCoverages: string[];
  contractDemo: ContractDemo | null;
  
  // UI state
  isLoading: boolean;
  currentStep: 'landing' | 'assessment' | 'results' | 'quotes' | 'contract' | 'complete';
  
  // Actions
  addAnswer: (answer: ChatbotAnswer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  updateAssessmentData: (data: Partial<AssessmentData>) => void;
  setRiskAssessment: (assessment: RiskAssessment) => void;
  toggleCoverage: (coverageId: string) => void;
  setContractDemo: (contract: ContractDemo) => void;
  setCurrentStep: (step: AppState['currentStep']) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialState = {
  currentQuestionIndex: 0,
  answers: [],
  assessmentData: {},
  riskAssessment: null,
  selectedCoverages: [],
  contractDemo: null,
  isLoading: false,
  currentStep: 'landing' as const,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addAnswer: (answer: ChatbotAnswer) => {
        set((state) => {
          // Reemplazar respuesta existente si ya existe para esta pregunta
          const existingIndex = state.answers.findIndex(
            (a) => a.questionId === answer.questionId
          );
          
          let newAnswers;
          if (existingIndex >= 0) {
            newAnswers = [...state.answers];
            newAnswers[existingIndex] = answer;
          } else {
            newAnswers = [...state.answers, answer];
          }

          return {
            answers: newAnswers,
          };
        });
      },

      nextQuestion: () => {
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        }));
      },

      previousQuestion: () => {
        set((state) => ({
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
        }));
      },

      updateAssessmentData: (data: Partial<AssessmentData>) => {
        set((state) => ({
          assessmentData: {
            ...state.assessmentData,
            ...data,
          },
        }));
      },

      setRiskAssessment: (assessment: RiskAssessment) => {
        set({ riskAssessment: assessment });
      },

      toggleCoverage: (coverageId: string) => {
        set((state) => {
          const isSelected = state.selectedCoverages.includes(coverageId);
          const newSelected = isSelected
            ? state.selectedCoverages.filter((id) => id !== coverageId)
            : [...state.selectedCoverages, coverageId];
          
          return {
            selectedCoverages: newSelected,
          };
        });
      },

      setContractDemo: (contract: ContractDemo) => {
        set({ contractDemo: contract });
      },

      setCurrentStep: (step: AppState['currentStep']) => {
        set({ currentStep: step });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'activar-business-store',
      // Solo persistir datos importantes, no el estado de UI
      partialize: (state) => ({
        answers: state.answers,
        assessmentData: state.assessmentData,
        selectedCoverages: state.selectedCoverages,
        contractDemo: state.contractDemo,
      }),
    }
  )
);

// Selectors útiles
export const useCurrentStep = () => useAppStore((state) => state.currentStep);
export const useAssessmentData = () => useAppStore((state) => state.assessmentData);
export const useRiskAssessment = () => useAppStore((state) => state.riskAssessment);
export const useAnswers = () => useAppStore((state) => state.answers);
export const useSelectedCoverages = () => useAppStore((state) => state.selectedCoverages);
export const useContractDemo = () => useAppStore((state) => state.contractDemo);
export const useIsLoading = () => useAppStore((state) => state.isLoading);