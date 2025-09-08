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
      text: 'Olá! Sou a assistente virtual da Insight Digital. Como posso ajudá-lo com automações hoje?',
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
    
    // Simple bot logic
    let botResponse = '';
    
    if (step === 'greeting') {
      botResponse = 'Perfeito! Para eu te ajudar melhor, qual é o seu nome?';
      setStep('name');
    } else if (step === 'name') {
      setUserInfo(prev => ({ ...prev, name: message }));
      botResponse = `Prazer em conhecê-lo, ${message}! Agora, qual é o seu e-mail?`;
      setStep('email');
    } else if (step === 'email') {
      setUserInfo(prev => ({ ...prev, email: message }));
      botResponse = 'Ótimo! Que tipo de automação você gostaria de implementar?\n\n1. Integração Google (Sheets, Calendar)\n2. Chatbot WhatsApp/Instagram\n3. Automação de vendas\n4. Outro';
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
        
        botResponse = `Excelente! Recebi suas informações:\n\n• Nome: ${userInfo.name}\n• Email: ${userInfo.email}\n• Interesse: ${message}\n\nNossa equipe entrará em contato em breve para apresentar uma solução personalizada!`;
        
        toast({
          title: "Informações enviadas!",
          description: "Nossa equipe entrará em contato em breve.",
        });
      } catch (error) {
        botResponse = 'Houve um problema ao enviar suas informações. Pode tentar novamente?';
      }
    }
    
    // Simulate bot typing delay
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
          variant="tech"
          size="icon"
          className="w-14 h-14 rounded-full shadow-blue hover:scale-110 transition-bounce"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-blue">
            {/* Header */}
            <div className="bg-tech-gradient text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">Assistente Insight Digital</h3>
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
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" variant="tech">
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