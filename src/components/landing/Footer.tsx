'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Producto",
      links: [
        { name: "Diagnóstico gratuito", href: "#" },
        { name: "Coberturas", href: "#" },
        { name: "Precios", href: "#" },
        { name: "Para startups", href: "#" },
        { name: "Para PyMEs", href: "#" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre nosotros", href: "#" },
        { name: "Carreras", href: "#" },
        { name: "Prensa", href: "#" },
        { name: "Contacto", href: "#" }
      ]
    },
    {
      title: "Recursos",
      links: [
        { name: "Blog", href: "#" },
        { name: "Centro de ayuda", href: "#" },
        { name: "Guías de seguros", href: "#" },
        { name: "Webinars", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Términos de servicio", href: "#" },
        { name: "Política de privacidad", href: "#" },
        { name: "Cookies", href: "#" },
        { name: "Cumplimiento", href: "#" }
      ]
    }
  ];

  return (
    <footer style={{ backgroundColor: '#000000' }}>
      {/* Main Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                activar Biz
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Seguros inteligentes diseñados específicamente para startups y PyMEs argentinas. 
                Diagnóstico gratuito en 5 minutos.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.743 3.708 12.446s.49-2.449 1.297-3.325C5.901 8.245 7.053 7.755 8.35 7.755s2.449.49 3.325 1.297c.876.876 1.366 2.028 1.366 3.325s-.49 2.449-1.366 3.325c-.876.876-2.028 1.366-3.325 1.366z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              © {currentYear} activar Biz. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Términos
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}