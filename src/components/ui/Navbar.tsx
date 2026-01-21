'use client';

import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-comfortaa font-bold text-primary">
              activar Biz
            </h1>
          </div>
          
          {/* Sign Up Button */}
          <Button 
            variant="outline" 
            size="sm"
            className="font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}