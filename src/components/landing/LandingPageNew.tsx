'use client';

import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { InsurancePartners } from './InsurancePartners';
import { FeaturesSection } from './FeaturesSection';
import { BenefitsSection } from './BenefitsSection';
import { CoveragesCarousel } from './CoveragesCarousel';
import { FAQSection } from './FAQSection';
import { Footer } from './Footer';

interface LandingPageProps {
  onStartAssessment: (initialMessage: string) => void;
}

export function LandingPage({ onStartAssessment }: LandingPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <Navbar />
      <HeroSection onStartAssessment={onStartAssessment} />
      <InsurancePartners />
      <FeaturesSection />
      <BenefitsSection onStartAssessment={onStartAssessment} />
      <CoveragesCarousel />
      <FAQSection />
      <Footer />
    </div>
  );
}