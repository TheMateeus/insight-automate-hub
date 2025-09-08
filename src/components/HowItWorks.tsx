import { MessageCircle, Cpu, Zap } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Cliente Entra em Contato",
      description: "Nosso chatbot inteligente recebe sua solicitação e coleta informações iniciais sobre suas necessidades de automação.",
      number: "01"
    },
    {
      icon: Cpu,
      title: "n8n Processa os Dados",
      description: "Nossa plataforma n8n analisa suas necessidades e cria fluxos de automação personalizados para seu negócio.",
      number: "02"
    },
    {
      icon: Zap,
      title: "Entregamos a Automação",
      description: "Implementamos e testamos sua automação personalizada, garantindo que funcione perfeitamente com seus sistemas.",
      number: "03"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Como <span className="text-primary">Funciona</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nosso processo simples e eficiente garante que você tenha 
            a automação perfeita para suas necessidades em apenas 3 passos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/4 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary to-primary/50"></div>
          <div className="hidden md:block absolute top-1/4 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/50 to-primary"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="text-center relative group">
              <div className="mb-8">
                <div className="relative mx-auto">
                  <div className="w-20 h-20 bg-tech-gradient rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-blue group-hover:scale-110 transition-bounce">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}