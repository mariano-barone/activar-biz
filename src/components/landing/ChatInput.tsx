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

  useEffect(() => {
    // Focus automático en mobile y desktop
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Contame sobre tu empresa para empezar..."
              className="min-h-[52px] text-base resize-none border-border/50 bg-background/50 focus:bg-background transition-colors"
              disabled={isTyping}
            />
          </div>
          <Button 
            type="submit" 
            size="lg"
            disabled={!message.trim() || isTyping}
            className="min-h-[52px] px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
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
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm">Procesando tu información...</span>
          </div>
        )}
      </Card>

      {/* Suggestions */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          O probá con uno de estos ejemplos:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              disabled={isTyping}
              className="p-3 text-left text-sm bg-muted/50 hover:bg-muted rounded-lg border border-border/30 hover:border-border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}