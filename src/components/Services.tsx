import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Calendar, ShoppingCart, BarChart3 } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Bot,
      title: "Chatbots WhatsApp/Instagram",
      description: "Assistentes virtuais inteligentes que capturam leads e atendem clientes automaticamente 24/7.",
      features: ["WhatsApp Business API", "Instagram DM", "Captura de Leads", "Respostas Inteligentes"],
      webhook: "chatbot"
    },
    {
      icon: Calendar,
      title: "Integrações Google",
      description: "Conecte e automatize Sheets, Calendar, Drive e Gmail para otimizar seus processos empresariais.",
      features: ["Google Sheets", "Google Calendar", "Google Drive", "Gmail"],
      webhook: "integracao-google"
    },
    {
      icon: ShoppingCart,
      title: "Automação de Vendas",
      description: "Pipelines automatizados que nutrem leads, convertem clientes e aceleram suas vendas.",
      features: ["Funil de Vendas", "Email Marketing", "CRM Integration", "Follow-up Automático"],
      webhook: "automacao-vendas"
    },
    {
      icon: BarChart3,
      title: "Dashboards Inteligentes",
      description: "Relatórios e análises em tempo real com dados consolidados de todas suas ferramentas.",
      features: ["Métricas em Tempo Real", "Relatórios Automáticos", "KPIs Personalizados", "Alertas"],
      webhook: "dashboards"
    }
  ];

  const handleServiceClick = async (webhook: string, title: string) => {
    try {
      await fetch('/webhook/interesse-servico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          servico: title,
          webhook: webhook,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.error('Erro ao enviar dados do serviço:', error);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossos <span className="text-insight-dark">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Oferecemos soluções completas de automação digital para transformar 
            a maneira como sua empresa opera e se relaciona com clientes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8 hover:shadow-light transition-smooth group cursor-pointer border-insight-gray">
              <div className="mb-6">
                <div className="w-16 h-16 bg-insight-light/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-insight-light/20 transition-smooth">
                  <service.icon className="w-8 h-8 text-insight-light" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-insight-dark">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
              </div>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-insight-success rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="light" 
                size="sm"
                className="w-full"
                onClick={() => handleServiceClick(service.webhook, service.title)}
              >
                Quero saber mais
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}