'use client';

import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-6 relative z-50">
      <div className="bg-gray-800/30 rounded-lg px-6 py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>activar Biz</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              Sobre Nosotros
            </a>
            <Button 
              className="text-white px-4 py-2 rounded-md font-medium"
              style={{ backgroundColor: '#2F80ED', fontFamily: 'Inter, sans-serif' }}
            >
              Iniciar sesión
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}