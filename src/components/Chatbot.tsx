import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou a Rebecca, assistente virtual da Insight Digital. Como posso ajudá-lo com automações hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [step, setStep] = useState<'greeting' | 'name' | 'email' | 'service'>('greeting');
  const { toast } = useToast();

  const sendMessage = async (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserMessage = async (message: string) => {
    await sendMessage(message, 'user');
    setInputMessage('');
    
    // Rebecca's intelligent responses
    let botResponse = '';
    
    if (step === 'greeting') {
      botResponse = 'Que bom falar com você! Para eu personalizar melhor nossa conversa, qual é o seu nome?';
      setStep('name');
    } else if (step === 'name') {
      setUserInfo(prev => ({ ...prev, name: message }));
      botResponse = `Prazer em conhecê-lo, ${message}! Para eu enviar as informações corretas, qual é o seu melhor e-mail?`;
      setStep('email');
    } else if (step === 'email') {
      setUserInfo(prev => ({ ...prev, email: message }));
      botResponse = 'Perfeito! Agora me conta, que tipo de automação você gostaria de implementar no seu negócio?\n\n🤖 Chatbot WhatsApp/Instagram\n📊 Integração Google (Sheets, Calendar)\n💰 Automação de vendas\n📈 Dashboards inteligentes\n❓ Tenho outra necessidade';
      setStep('service');
    } else if (step === 'service') {
      // Send data to n8n webhook
      try {
        await fetch('/webhook/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            interest: message,
            timestamp: new Date().toISOString()
          }),
        });
        
        botResponse = `Excelente escolha, ${userInfo.name}! 🎉\n\nRecebi suas informações:\n• Nome: ${userInfo.name}\n• Email: ${userInfo.email}\n• Interesse: ${message}\n\nNossa equipe especializada entrará em contato em até 2 horas para apresentar uma solução personalizada para sua empresa!\n\nEnquanto isso, que tal agendar uma demonstração gratuita? 😊`;
        
        toast({
          title: "Informações enviadas com sucesso!",
          description: "Rebecca registrou seus dados. Nossa equipe entrará em contato em breve.",
        });
      } catch (error) {
        botResponse = 'Ops! Tivemos um probleminha técnico. Pode tentar novamente? Ou se preferir, me chama no WhatsApp!';
      }
    }
    
    // Simulate Rebecca thinking
    setTimeout(() => {
      sendMessage(botResponse, 'bot');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      handleUserMessage(inputMessage.trim());
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="insight"
          size="icon"
          className="w-14 h-14 rounded-full shadow-insight hover:scale-110 transition-bounce"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-insight border-insight-gray">
            {/* Header */}
            <div className="bg-gradient-insight text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">Rebecca - Assistente Insight Digital</h3>
              <p className="text-sm opacity-90">Especialista em Automações</p>
            </div>
            
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-insight-light text-white'
                        : 'bg-insight-gray text-insight-text'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-insight-gray">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" variant="insight">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}