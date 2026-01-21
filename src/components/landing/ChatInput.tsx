'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onStartChat: (initialMessage: string) => void;
}

export function ChatInput({ onStartChat }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Removed auto-focus to prevent page scroll on load

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsTyping(true);
    // Simular procesamiento
    setTimeout(() => {
      onStartChat(message.trim());
      setIsTyping(false);
    }, 800);
  };

  const suggestions = [
    "Tengo una startup tech con 5 empleados",
    "Soy freelancer que maneja datos de clientes", 
    "Tengo una PYME de comercio electrónico",
    "Desarrollamos software para empresas"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Chat Input */}
      <Card 
        className="p-4 sm:p-6 backdrop-blur-sm border border-gray-600 shadow-lg"
        style={{ backgroundColor: '#0C0E12' }}
      >
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Contame sobre tu empresa para empezar..."
              className="min-h-[52px] text-base resize-none border-gray-600 text-white placeholder-gray-400 transition-colors"
              style={{ backgroundColor: '#13161B' }}
              disabled={isTyping}
            />
          </div>
          <Button 
            type="submit" 
            size="lg"
            disabled={!message.trim() || isTyping}
            className="min-h-[52px] px-4 text-white hover:opacity-90"
            style={{ backgroundColor: '#2F80ED' }}
          >
            {isTyping ? (
              <div className="animate-spin">
                <Sparkles className="w-5 h-5" />
              </div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="mt-4 flex items-center gap-2 text-gray-400">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2F80ED' }}></div>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2F80ED', animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2F80ED', animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm">Procesando tu información...</span>
          </div>
        )}
      </Card>

      {/* Suggestions */}
      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-3 text-center">
          O probá con uno de estos ejemplos:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              disabled={isTyping}
              className="p-3 text-left text-sm text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#13161B' }}
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}