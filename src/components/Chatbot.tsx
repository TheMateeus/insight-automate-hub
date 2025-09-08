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

  try {
    // Enviar a mensagem para o agente IA (Rebecca) no n8n
    const response = await fetch('https://primary-production-2d57a.up.railway.app/webhook-test/chatbot-rebecca', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    // O n8n retorna a resposta da Rebecca
    const botResponse = data.reply || "Desculpe, estou com dificuldades técnicas 😅";

    // Mostrar no chat
    setTimeout(() => {
      sendMessage(botResponse, 'bot');
    }, 1000);

  } catch (error) {
    sendMessage("Ops! Houve um erro na conexão com a Rebecca. Pode tentar novamente?", 'bot');
  }
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