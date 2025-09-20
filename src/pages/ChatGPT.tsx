import { useState, useRef, useEffect } from 'react';
// Extension style - no Header/Footer
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw,
  Plus,
  MessageSquare,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  callChatGPT, 
  callResponsesAPI,
  systemPrompt, 
  ChatMessage 
} from '@/api/chatgpt';
import { physicsCalculator, PhysicsCalculator } from '@/utils/physics-calculator-browser';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  displayContent?: string;
}

const ChatGPT = () => {
  const { t, currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Автопрокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Анимация печати
  useEffect(() => {
    messages.forEach((message, index) => {
      if (message.role === 'assistant' && message.isTyping && message.displayContent === '') {
        let charIndex = 0;
        const fullText = message.content;
        
        typingIntervalRef.current = setInterval(() => {
          if (charIndex < fullText.length) {
            setMessages(prev => prev.map((msg, i) => 
              i === index 
                ? { ...msg, displayContent: fullText.slice(0, charIndex + 1) }
                : msg
            ));
            charIndex++;
          } else {
            setMessages(prev => prev.map((msg, i) => 
              i === index 
                ? { ...msg, isTyping: false }
                : msg
            ));
            if (typingIntervalRef.current) {
              clearInterval(typingIntervalRef.current);
            }
          }
        }, 20);
      }
    });
  }, [messages]);

  const getWelcomeMessage = (): string => {
    switch (currentLanguage) {
      case 'ИИ Жардамчы':
        return `🎉 Кош келдиңиз! Мен ChatGPT - сиздин жардамчыңыз.

Мен сизге жардам бере алам:
• Физика боюнча суроолорго жооп берүү
• Кызыктуу маселдерди чечүү
• Тил үйрөнүү жана которуу
• Код жазуу жана программист болуу
• Жана башка көп нерселер!

Сурооңузду жазыңыз, мен сизге жооп берейин! 💡`;
      case 'AI Assistant':
        return `🎉 Welcome! I'm ChatGPT - your AI assistant.

I can help you with:
• Answering physics questions
• Solving interesting problems
• Learning languages and translation
• Writing code and programming
• And many other things!

Type your question and I'll help you! 💡`;
      default:
        return `🎉 Добро пожаловать! Я ChatGPT - ваш ИИ-помощник.

Я могу помочь вам с:
• Ответами на вопросы по физике
• Решением интересных задач
• Изучением языков и переводом
• Написанием кода и программированием
• И многим другим!

Задайте свой вопрос, и я помогу вам! 💡`;
    }
  };

  // Показываем приветственное сообщение при загрузке
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        role: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date(),
        displayContent: getWelcomeMessage(),
        isTyping: false
      };
      setMessages([welcomeMessage]);
    }
  }, [currentLanguage]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      displayContent: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Показываем сообщение о начале обработки
    const processingMessage: ChatMessage = {
      id: (Date.now() + 0.5).toString(),
      role: 'assistant',
      content: currentLanguage === 'AI Assistant' 
        ? '🔄 Processing your request...'
        : currentLanguage === 'ИИ Жардамчы'
        ? '🔄 Суроону иштетүүдө...'
        : '🔄 Обрабатываю ваш запрос...',
      timestamp: new Date(),
      displayContent: '',
      isTyping: true
    };
    setMessages(prev => [...prev, processingMessage]);

    try {
      // Проверяем, является ли вопрос физическим
      const isPhysicsQuestion = PhysicsCalculator.isPhysicsQuestion(inputValue);
      
      let response: string;
      
      if (isPhysicsQuestion) {
        // Пытаемся распарсить физический вопрос
        const calculation = PhysicsCalculator.parsePhysicsQuestion(inputValue);
        
        if (calculation) {
          // Выполняем физический расчет
          response = await physicsCalculator.calculate(calculation);
        } else {
          // Если не удалось распарсить, используем ChatGPT с физическим контекстом
          const physicsContext = await physicsCalculator.getPhysicsResource('newtons-laws');
          const enhancedPrompt = `${inputValue}\n\nPhysics context:\n${physicsContext}`;
          
          const conversationMessages = messages.filter(msg => msg.id !== '1');
          const chatMessages: ChatMessage[] = [
            { role: 'system', content: systemPrompt(currentLanguage) + "\n\nYou are a physics expert. Use the provided physics context to help answer questions." },
            ...conversationMessages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: enhancedPrompt }
          ];
          
          response = await callChatGPT(chatMessages);
        }
      } else {
        // Обычный ChatGPT запрос
        const conversationMessages = messages.filter(msg => msg.id !== '1');
        const chatMessages: ChatMessage[] = [
          { role: 'system', content: systemPrompt(currentLanguage) },
          ...conversationMessages.map(msg => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: inputValue }
        ];

        response = await callChatGPT(chatMessages);
      }
      
      // Удаляем сообщение о обработке и добавляем реальный ответ
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== processingMessage.id);
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          displayContent: '',
          isTyping: true
        };
        return [...filtered, aiMessage];
      });
    } catch (error) {
      console.error('Error calling ChatGPT:', error);
      
      let errorText = '';
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          errorText = currentLanguage === 'AI Assistant' 
            ? '🚫 Rate limit exceeded. The API is currently busy.\n\n⏳ I\'m automatically retrying with longer delays...\n\n💡 Try again in a few minutes if this persists.'
            : currentLanguage === 'ИИ Жардамчы'
            ? '🚫 Чектеме ашып кетти. API азыр бир аз тыгыз.\n\n⏳ Мен муну узак күтүү менен автоматтык түрдө кайра аракет кылам...\n\n💡 Эгер бул уланып кетсе, бир нече мүнөттөн кийин кайра аракет кылыңыз.'
            : '🚫 Превышен лимит запросов. API сейчас загружен.\n\n⏳ Я автоматически повторяю с увеличенными задержками...\n\n💡 Попробуйте снова через несколько минут, если проблема повторяется.';
        } else if (error.message.includes('401')) {
          errorText = currentLanguage === 'AI Assistant' 
            ? '🔐 Authentication error. Please check API configuration.'
            : currentLanguage === 'ИИ Жардамчы'
            ? '🔐 Аутентификация катасы. API конфигурациясын текшериңиз.'
            : '🔐 Ошибка аутентификации. Проверьте конфигурацию API.';
        } else if (error.message.includes('Load failed')) {
          errorText = currentLanguage === 'AI Assistant' 
            ? '🌐 Network error. Please check your internet connection and try again.'
            : currentLanguage === 'ИИ Жардамчы'
            ? '🌐 Тармак катасы. Интернет байланышыңызды текшерип, кайра аракет кылыңыз.'
            : '🌐 Ошибка сети. Проверьте интернет-соединение и попробуйте снова.';
        } else {
          errorText = currentLanguage === 'AI Assistant' 
            ? `⚠️ Error: ${error.message}\n\nPlease try again or contact support if the problem persists.`
            : currentLanguage === 'ИИ Жардамчы'
            ? `⚠️ Ката: ${error.message}\n\nКайра аракет кылыңыз же көйгөй уланып кетсе колдоо кызматына кайрылыңыз.`
            : `⚠️ Ошибка: ${error.message}\n\nПопробуйте снова или обратитесь в поддержку, если проблема повторяется.`;
        }
      } else {
        errorText = currentLanguage === 'AI Assistant' 
          ? '❌ Sorry, I encountered an unexpected error. Please try again later.'
          : currentLanguage === 'ИИ Жардамчы'
          ? '❌ Кечиресиз, күтүлбөгөн ката кетти. Кийин кайра аракет кылыңыз.'
          : '❌ Извините, произошла неожиданная ошибка. Попробуйте позже.';
      }
      
      // Удаляем сообщение о обработке и добавляем сообщение об ошибке
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== processingMessage.id);
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: errorText,
          timestamp: new Date(),
          displayContent: '',
          isTyping: true
        };
        return [...filtered, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const newChat = () => {
    setMessages([]);
  };


  const quickPrompts = [
    currentLanguage === 'AI Assistant' 
      ? 'Calculate force: mass 5kg, acceleration 3m/s²'
      : currentLanguage === 'ИИ Жардамчы'
      ? 'Силаны эсепте: масса 5кг, ылдамдык 3м/с²'
      : 'Рассчитай силу: масса 5кг, ускорение 3м/с²',
    
    currentLanguage === 'AI Assistant'
      ? 'Explain Newton\'s laws'
      : currentLanguage === 'ИИ Жардамчы'
      ? 'Ньютондун мыйзамдарын түшүндүр'
      : 'Объясни законы Ньютона',
    
    currentLanguage === 'AI Assistant'
      ? 'Calculate kinetic energy: mass 2kg, velocity 10m/s'
      : currentLanguage === 'ИИ Жардамчы'
      ? 'Кинетикалык энергияны эсепте: масса 2кг, ылдамдык 10м/с'
      : 'Рассчитай кинетическую энергию: масса 2кг, скорость 10м/с',
    
    currentLanguage === 'AI Assistant'
      ? 'Ohm\'s law: voltage 12V, current 2A'
      : currentLanguage === 'ИИ Жардамчы'
      ? 'Ом мыйзамы: чыңалуу 12В, ток 2А'
      : 'Закон Ома: напряжение 12В, ток 2А'
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Minimal Header */}
      <div className="flex-shrink-0 border-b bg-card/50 backdrop-blur-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ChatGPT
                </h1>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="h-5 text-xs">
                    <Brain className="h-2 w-2 mr-1" />
                    GPT-4
                  </Badge>
                  <Badge variant="outline" className="h-5 text-xs">
                    <Zap className="h-2 w-2 mr-1" />
                    Online
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={newChat}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">
                {currentLanguage === 'AI Assistant' ? 'New Chat' : 
                 currentLanguage === 'ИИ Жардамчы' ? 'Жаңы чат' : 'Новый чат'}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
              >
                <div className={`flex max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-r from-green-500 to-teal-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-4 rounded-2xl shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-card border text-foreground'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.displayContent || message.content}
                        {message.isTyping && (
                          <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Message Actions */}
                    {message.role === 'assistant' && !message.isTyping && (
                      <div className="flex items-center space-x-2 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.content)}
                          className="h-8 w-8 p-0"
                          title="Copy"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        
                        {/* Retry button for error messages */}
                        {(message.content.includes('🚫') || message.content.includes('❌') || message.content.includes('⚠️')) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // Get the last user message and retry
                              const lastUserMessage = messages.findLast(msg => msg.role === 'user');
                              if (lastUserMessage && !isLoading) {
                                setInputValue(lastUserMessage.content);
                                setTimeout(() => handleSendMessage(), 100);
                              }
                            }}
                            className="h-8 w-8 p-0"
                            title="Retry"
                          >
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Like">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Dislike">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start hover:bg-accent transition-colors"
                    onClick={() => setInputValue(prompt)}
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{prompt}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex-shrink-0 border-t bg-card/50 backdrop-blur-sm p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    currentLanguage === 'AI Assistant' 
                      ? 'Message ChatGPT...'
                      : currentLanguage === 'ИИ Жардамчы'
                      ? 'ChatGPTга билдирүү жаз...'
                      : 'Напишите сообщение ChatGPT...'
                  }
                  className="min-h-[60px] max-h-[200px] resize-none pr-12"
                  disabled={isLoading}
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute bottom-2 right-2 h-8 w-8 p-0"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {currentLanguage === 'AI Assistant' 
                ? 'ChatGPT can make mistakes. Consider checking important information.'
                : currentLanguage === 'ИИ Жардамчы'
                ? 'ChatGPT ката кыла алат. Маанилүү маалыматты текшерүүнү унутпаңыз.'
                : 'ChatGPT может делать ошибки. Проверяйте важную информацию.'}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatGPT;
