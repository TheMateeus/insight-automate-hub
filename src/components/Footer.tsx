export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Insight Digital</h3>
            <p className="text-sm text-background/70 mb-4">
              Especialistas em automação digital, 
              transformando processos com n8n e integrações inteligentes.
            </p>
            <div className="text-sm text-background/70">
              <p>📧 insightsdigital.tech@gmail.com</p>
              <p>📱 WhatsApp: 933 273 186</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Integrações Google</li>
              <li>Chatbots WhatsApp</li>
              <li>Automação de Vendas</li>
              <li>Consultoria n8n</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Sobre Nós</li>
              <li>Blog</li>
              <li>Casos de Sucesso</li>
              <li>Contato</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Central de Ajuda</li>
              <li>Documentação</li>
              <li>Treinamentos</li>
              <li>Comunidade</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/70">
            © 2024 Insight Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}