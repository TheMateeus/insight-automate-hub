import { Card } from "@/components/ui/card";
import { Bot, Calendar, ShoppingCart } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Calendar,
      title: "Integrações Google",
      description: "Conectamos Sheets, Calendar, Drive e Gmail para automatizar seus processos empresariais.",
      features: ["Google Sheets", "Google Calendar", "Google Drive", "Gmail"]
    },
    {
      icon: Bot,
      title: "Bots Inteligentes", 
      description: "Chatbots para WhatsApp e Instagram que capturam leads e atendem clientes automaticamente.",
      features: ["WhatsApp Business", "Instagram DM", "Captura de Leads", "Respostas Automáticas"]
    },
    {
      icon: ShoppingCart,
      title: "Automação de Vendas",
      description: "Pipelines de vendas e marketing automatizados que nutrem leads e convertem mais clientes.",
      features: ["Funil de Vendas", "Email Marketing", "CRM Integration", "Follow-up Automático"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Oferecemos soluções completas de automação digital para transformar 
            a maneira como sua empresa opera e se relaciona com clientes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8 hover:shadow-blue transition-smooth group cursor-pointer">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
              </div>
              
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}