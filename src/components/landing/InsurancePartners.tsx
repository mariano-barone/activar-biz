'use client';

import Image from 'next/image';

export function InsurancePartners() {
  const partners = [
    {
      name: "OdeaoLabs",
      logo: "/Logo_Meridional_Blanco-01@2x.png",
      width: 160,
      height: 80
    },
    {
      name: "Kintsugi", 
      logo: "/Allianz logo blanco.png",
      width: 160,
      height: 80
    },
    {
      name: "Stack&d Lab",
      logo: "/integrity logo 1.png", 
      width: 160,
      height: 80
    },
    {
      name: "Magnolia",
      logo: "/Logo_Meridional_Blanco-01@2x.png", 
      width: 160,
      height: 80
    },
    {
      name: "Warpspeed",
      logo: "/Allianz logo blanco.png", 
      width: 160,
      height: 80
    }
  ];

  return (
    <section className="py-12 sm:py-12" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Divider superior */}
        <div className="w-full h-px bg-gray-600 opacity-30 mb-12"></div>
        
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-500 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Nos respaldan
          </h2>
        </div>
        
        <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 flex-wrap">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center opacity-60 hover:opacity-90 transition-opacity duration-300">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="max-w-full h-auto"
              />
            </div>
          ))}
        </div>
        
        {/* Divider inferior */}
        <div className="w-full h-px bg-gray-600 opacity-30 mt-12"></div>
      </div>
    </section>
  );
}