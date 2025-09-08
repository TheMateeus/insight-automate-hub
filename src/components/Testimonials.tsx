import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Silva",
      company: "Tech Solutions",
      role: "CEO",
      content: "A Insight Digital automatizou todo nosso processo de vendas. Agora captamos e nutrimos leads 24/7 sem intervenção manual.",
      rating: 5,
      avatar: "CS"
    },
    {
      name: "Marina Santos",
      company: "Marketing Pro",
      role: "Diretora de Marketing",
      content: "Nossos chatbots do WhatsApp aumentaram em 300% nossa taxa de conversão. O ROI foi impressionante!",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "Roberto Costa",
      company: "E-commerce Plus",
      role: "Founder",
      content: "As integrações com Google Sheets revolucionaram nossa gestão. Economizamos 20 horas semanais de trabalho manual.",
      rating: 5,
      avatar: "RC"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            O que nossos <span className="text-primary">clientes</span> dizem
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja como transformamos negócios através da automação digital
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-blue transition-smooth">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-tech-gradient rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}