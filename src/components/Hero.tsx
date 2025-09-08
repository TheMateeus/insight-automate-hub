import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-automation.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-light/20 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Automatize seus</span>
              <br />
              <span className="bg-tech-gradient bg-clip-text text-transparent">processos</span>
              <br />
              <span className="text-foreground">com a Insight Digital</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Transformamos processos manuais em automações inteligentes. 
              Ganhe tempo, reduza erros e acelere seu crescimento com nossa expertise em n8n e integrações digitais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
                Começar Automação
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                Ver Demonstração
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>100+ Automações Criadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Especialistas em n8n</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Automação Digital - Insight Digital"
                className="w-full h-auto rounded-2xl shadow-blue"
              />
            </div>
            <div className="absolute inset-0 bg-tech-gradient rounded-2xl blur-lg opacity-20 scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  );
}