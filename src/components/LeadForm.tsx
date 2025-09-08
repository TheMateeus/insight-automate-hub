import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      interesse: formData.get('interesse'),
      timestamp: new Date().toISOString()
    };
    
    try {
      const response = await fetch('/webhook/captura-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Seus dados foram enviados. Entraremos em contato em breve!",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um problema ao enviar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comece Sua <span className="text-primary">Automação</span> Hoje
            </h2>
            <p className="text-lg text-muted-foreground">
              Preencha o formulário abaixo e receba uma proposta personalizada 
              para automatizar seus processos.
            </p>
          </div>
          
          <Card className="p-8 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input 
                    id="nome" 
                    name="nome" 
                    placeholder="Seu nome completo" 
                    required 
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    required 
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                  <Input 
                    id="telefone" 
                    name="telefone" 
                    placeholder="(11) 99999-9999" 
                    required 
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="interesse">Interesse Principal</Label>
                  <Select name="interesse" required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="integracao-google">Integração Google</SelectItem>
                      <SelectItem value="chatbot">Chatbot WhatsApp/Instagram</SelectItem>
                      <SelectItem value="automacao-vendas">Automação de Vendas</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="tech" 
                size="lg" 
                className="w-full text-lg py-4 h-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Solicitar Proposta Gratuita"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}