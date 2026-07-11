import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12 mt-12 md:mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#ff9900]">
              Reservei Viagens
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Plataforma especializada em hospedagem de temporada nas melhores
              destinos termais do Brasil.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2 hover:text-[#ff9900] transition-colors">
                <Phone size={16} />
                <a href="tel:+5562999999999">(62) 99999-9999</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#ff9900] transition-colors">
                <Mail size={16} />
                <a href="mailto:contato@reserveiviagens.com">
                  contato@reserveiviagens.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Caldas Novas, GO, Brasil</span>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#ff9900] transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff9900] transition-colors">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff9900] transition-colors">
                  Segurança
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff9900] transition-colors">
                  Comunidade
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#ff9900] transition-colors">
                  Central de ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff9900] transition-colors">
                  Termos de serviço
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff9900] transition-colors">
                  Política de privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff9900] transition-colors">
                  Cancelamento
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-800 pt-8">
          {/* Redes Sociais */}
          <div className="flex justify-center gap-6 mb-6">
            {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-[#ff9900] transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            <p>
              © {currentYear} Reservei Viagens. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
