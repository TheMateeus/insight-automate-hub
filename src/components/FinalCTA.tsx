import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const whatsappNumber = "5511999999999"; // Replace with actual WhatsApp number
  const whatsappMessage = encodeURIComponent(
    "Olá! Vim do site da Insight Digital e gostaria de saber mais sobre automações digitais."
  );

  const handleScheduleDemo = async () => {
    try {
      await fetch('/webhook/agendar-consultoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'agendar_consultoria',
          timestamp: new Date().toISOString()
        }),
      });
      // This could redirect to Google Calendar or open a scheduling widget
      alert('Redirecionando para agendamento...');
    } catch (error) {
      console.error('Erro ao agendar consultoria:', error);
    }
  };

  return (
    <section className="py-20 bg-gradient-insight text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-insight-dark/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Transforme seu negócio com
            <br />
            <span className="text-insight-light">automação hoje mesmo</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Não perca mais tempo com processos manuais. Nossa equipe está pronta 
            para criar a solução perfeita para impulsionar seu negócio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              variant="success"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
              onClick={() => {
                window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
              }}
            >
              Falar no WhatsApp
            </Button>
            
            <Button
              variant="outline-light"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
              onClick={handleScheduleDemo}
            >
              Agendar Consultoria Gratuita
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-insight-success rounded-full"></div>
              <span>Consulta Gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-insight-success rounded-full"></div>
              <span>Implementação Rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-insight-success rounded-full"></div>
              <span>Suporte Completo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}