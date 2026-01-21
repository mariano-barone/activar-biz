'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, Zap, Users, FileText } from 'lucide-react';

export function CoveragesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const coverages = [
    {
      id: 'responsabilidad-civil',
      icon: Shield,
      title: 'Responsabilidad Civil',
      description: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
      learnMore: 'Learn more'
    },
    {
      id: 'integrales',
      icon: Zap,
      title: 'Integrales', 
      description: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.',
      learnMore: 'Learn more'
    },
    {
      id: 'cauciones',
      icon: FileText,
      title: 'Cauciones',
      description: 'Measure what matters with Untitled\'s easy-to-use reports. You can filter, export, and drilldown on the data.',
      learnMore: 'Learn more'
    },
    {
      id: 'directors-officers',
      icon: Users,
      title: 'Directors and Officers (D&O)',
      description: 'Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email.',
      learnMore: 'Learn more'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(coverages.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(coverages.length / 4)) % Math.ceil(coverages.length / 4));
  };

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Why switch?
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Coberturas ofrecidas
          </h2>
          <p className="text-gray-400 max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
            We offer the best accounting and expense tracking for ambitious businesses.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {coverages.map((coverage, index) => {
            const IconComponent = coverage.icon;
            return (
              <div key={coverage.id} className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: '#2F80ED' }}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {coverage.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {coverage.description}
                </p>
                
                {/* Learn more link */}
                <button className="text-sm font-medium flex items-center group" style={{ color: '#2F80ED', fontFamily: 'Inter, sans-serif' }}>
                  {coverage.learnMore}
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-start gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  );
}