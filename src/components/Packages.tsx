import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Packages() {
  const packages = [
    {
      name: "Bronze",
      price: "R$ 497",
      period: "/mês",
      description: "Ideal para pequenos negócios",
      features: [
        "1 automação básica",
        "Integração com 2 ferramentas",
        "Suporte por email",
        "Setup inicial incluso"
      ],
      popular: false,
      webhook: "bronze"
    },
    {
      name: "Prata",
      price: "R$ 997",
      period: "/mês",
      description: "Para empresas em crescimento",
      features: [
        "3 automações avançadas",
        "Integração com 5 ferramentas",
        "Chatbot WhatsApp básico",
        "Suporte prioritário",
        "Relatórios mensais"
      ],
      popular: true,
      webhook: "prata"
    },
    {
      name: "Ouro",
      price: "R$ 1.997",
      period: "/mês",
      description: "Solução completa para empresas",
      features: [
        "5 automações complexas",
        "Integrações ilimitadas",
        "Chatbot avançado multi-plataforma",
        "Dashboard personalizado",
        "Suporte 24/7",
        "Consultoria mensal"
      ],
      popular: false,
      webhook: "ouro"
    },
    {
      name: "Platina",
      price: "R$ 3.997",
      period: "/mês",
      description: "Enterprise com dedicação exclusiva",
      features: [
        "Automações ilimitadas",
        "Desenvolvimento customizado",
        "IA personalizada",
        "Equipe dedicada",
        "SLA garantido",
        "Consultoria semanal",
        "Treinamento da equipe"
      ],
      popular: false,
      webhook: "platina"
    }
  ];

  const handlePackageClick = async (packageData: any) => {
    try {
      await fetch('/webhook/interesse-plano', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plano: packageData.name,
          preco: packageData.price,
          webhook: packageData.webhook,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.error('Erro ao enviar dados do plano:', error);
    }
  };

  return (
    <section className="py-20 bg-insight-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pacotes de <span className="text-insight-dark">Automação</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha o plano ideal para sua empresa e comece a automatizar hoje mesmo.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`p-6 relative hover:shadow-light transition-smooth ${
                pkg.popular 
                  ? 'border-insight-success border-2 shadow-light' 
                  : 'border-insight-gray'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-success text-white px-3 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-insight-dark mb-2">{pkg.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-insight-dark">{pkg.price}</span>
                  <span className="text-muted-foreground">{pkg.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-insight-success flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant={pkg.popular ? "success" : "insight"}
                size="sm"
                className="w-full"
                onClick={() => handlePackageClick(pkg)}
              >
                Quero este plano
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}