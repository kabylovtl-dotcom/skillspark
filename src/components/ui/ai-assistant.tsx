import { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { 
  Bot, 
  Send, 
  X, 
  MessageCircle, 
  Lightbulb, 
  Zap, 
  Atom, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Brain,
  BookOpen,
  Cpu,
  Waves
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  callChatGPT, 
  systemPrompt, 
  ChatMessage 
} from '@/api/chatgpt';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  displayContent?: string;
}

const AIAssistant = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'chat' | 'physics' | 'example' | 'formula'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Показываем приветственное сообщение при открытии панели
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'ai',
        content: getWelcomeMessage(),
        timestamp: new Date(),
        displayContent: getWelcomeMessage(),
        isTyping: false
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, selectedMode]);

  const getWelcomeMessage = (): string => {
    switch (selectedMode) {
      case 'physics':
        return `🔬 Добро пожаловать в режим решения физических задач!

Я помогу вам:
• Решить задачи пошагово
• Объяснить физические законы
• Проверить ваши решения
• Дать практические примеры

Задайте любую физическую задачу! 💡`;
      case 'example':
        return `📚 Режим интерактивных примеров!

Я создам для вас:
• Практические примеры с числами
• Пошаговые решения
• Вопросы для самопроверки
• Связанные темы для изучения

Укажите тему, и я создам увлекательный пример! ✨`;
      case 'formula':
        return `🧮 Режим объяснения формул!

Я расскажу о:
• Значении каждого символа
• Единицах измерения
• Применении формул
• Связи с другими формулами
• Историческом контексте

Введите формулу для подробного объяснения! 📐`;
      case 'chat':
      default:
        return t('ai.welcome');
    }
  };

  // Анимация печати для ИИ сообщений
  useEffect(() => {
    messages.forEach((message, index) => {
      if (message.type === 'ai' && message.isTyping && message.displayContent === '') {
        console.log('Starting typing animation for message:', index);
        const fullContent = message.content;
        let currentIndex = 0;
        
        const typeText = () => {
          if (currentIndex < fullContent.length) {
            setMessages(prev => prev.map((msg, i) => 
              i === index 
                ? { ...msg, displayContent: fullContent.slice(0, currentIndex + 1) }
                : msg
            ));
            currentIndex++;
            setTimeout(typeText, 20);
          } else {
            console.log('Finished typing message:', index);
            setMessages(prev => prev.map((msg, i) => 
              i === index 
                ? { ...msg, isTyping: false }
                : msg
            ));
          }
        };
        
        // Запускаем печать с небольшой задержкой
        setTimeout(typeText, 100);
      }
    });
  }, [messages]);

  const quickPrompts = [
    t('ai.prompts.newton'),
    t('ai.prompts.gravity'),
    t('ai.prompts.electricity'),
    t('ai.prompts.quantum'),
    t('ai.prompts.energy'),
    t('ai.prompts.magnetism')
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      displayContent: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Получаем ответ от AI в зависимости от выбранного режима
      const aiResponse = await getAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        displayContent: '',
        isTyping: true
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback на локальные ответы при ошибке
      const fallbackResponse = generateFallbackResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: fallbackResponse,
        timestamp: new Date(),
        displayContent: '',
        isTyping: true
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для получения ответа от ChatGPT API
  const getChatGPTResponse = async (question: string): Promise<string> => {
    const currentLanguage = t('ai.title');
    
    try {
      // Создаем сообщения для ChatGPT
      const messages: ChatMessage[] = [
        { role: 'system', content: systemPrompt(currentLanguage) },
        { role: 'user', content: question }
      ];

      // Вызываем ChatGPT API
      const response = await callChatGPT(messages);
      return response;
    } catch (error) {
      console.error('Error calling ChatGPT:', error);
      throw error;
    }
  };

  // Новая функция для обработки разных режимов
  const getAIResponse = async (question: string): Promise<string> => {
    const currentLanguage = t('ai.title');
    
    try {
      // For all modes, use ChatGPT with enhanced prompts
      let enhancedPrompt = question;
      
      switch (selectedMode) {
        case 'physics':
          enhancedPrompt = `Physics question: ${question}. Please provide a detailed physics explanation with formulas and examples.`;
          break;
        case 'example':
          enhancedPrompt = `Interactive example request: ${question}. Please provide practical, hands-on examples that demonstrate this concept.`;
          break;
        case 'formula':
          enhancedPrompt = `Formula explanation request: ${question}. Please explain the formulas involved, their derivation, and how to apply them.`;
          break;
        case 'chat':
        default:
          enhancedPrompt = question;
          break;
      }

      return await getChatGPTResponse(enhancedPrompt);
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw error;
    }
  };

  // Fallback функция для локальных ответов при ошибке API
  const generateFallbackResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const currentLanguage = t('ai.title');
    
    // Кыргызские ответы
    if (currentLanguage === 'ИИ Жардамчы') {
      if (lowerQuestion.includes('ньютон') || lowerQuestion.includes('закон') || lowerQuestion.includes('newton') || lowerQuestion.includes('мыйзам')) {
        return `🔬 Ньютондун биринчи мыйзамы (Инерция мыйзамы):
        
Объект тынч абалда калат же турук ылдамдык менен кыймылдайт, эгер ага сырткы күчтөр таасир этпесе.

Жөнөкөй мисал: 
- Китеп столдо жатат жана сиз аны түрткөнгө чейин кыймылдабайт
- Автомобиль сиз газды бошоткондо инерция менен айдала берет

Формула: F = 0 → v = const

Бул дегенди билдирет: эгер бардык күчтөрдүн суммасы нөлгө барабар болсо, анда объекттин ылдамдыгы турук! 🚗`;
      }
      
      if (lowerQuestion.includes('гравитация') || lowerQuestion.includes('тяжесть') || lowerQuestion.includes('gravity') || lowerQuestion.includes('ауурлук')) {
        return `🌍 Ауурлук - бул объекттердин ортосундагы тартылуу күчү

Негизги принциптер:
- Объекттин массасы канчалык чоң болсо, анын ауурлугу ошончолук күчтүү
- Объекттер бири-биринен канчалык алыс болсо, ауурлук ошончолук начар

Ньютондун дүйнөлүк тартылуу мыйзамы:
F = G × (m₁ × m₂) / r²

Мында:
- F - ауурлук күчү
- G - ауурлук турактуусу
- m₁, m₂ - объекттердин массалары
- r - объекттердин борборлорунун ортосундагы аралык

Мисал: Жер сизди тартат, анткени анын массасы өтө чоң! 🌎`;
      }
      
      if (lowerQuestion.includes('электричество') || lowerQuestion.includes('ток') || lowerQuestion.includes('electricity') || lowerQuestion.includes('электр')) {
        return `⚡ Электр - бул электр заряддарынын кыймылы

Негизги концепциялар:
- Электрондор - терс заряддалган бөлүктөр
- Протондор - оң заряддалган бөлүктөр
- Ток - электрондордун өткөргүч аркылуу агымы

Ом мыйзамы:
U = I × R

Мында:
- U - чыңалуу (Вольт)
- I - ток (Ампер) 
- R - каршылык (Ом)

Жөнөкөй окшоштук: 
Суу түтүгүн элестетиңиз:
- Чыңалуу = суунун басымы
- Ток = суунун көлөмү
- Каршылык = түтүктүн калыңдыгы

Электр + дан - га суу төмөн агыгандай агат! 💧`;
      }
      
      if (lowerQuestion.includes('квантовая') || lowerQuestion.includes('квант') || lowerQuestion.includes('quantum') || lowerQuestion.includes('кванттык')) {
        return `🔬 Кванттык физика - өтө кичине объекттердин физикасы

Негизги принциптер:
- Квантташтыруу - энергия гана белгилүү маанилерди ала алат
- Толкун функциясы - бөлүктөр толкун сыяктуу аракет кылат
- Белгисиздик принциби - орун жана ылдамдыкты так өлчөй албайсыз

Квантташтыруунун мисалдары:
- Атомдогу электрондор гана белгилүү орбиталарда боло алат
- Жарык белгилүү энергиясы бар фотон-бөлүктөрдөн турат

Жөнөкөй окшоштук:
Баскычты элестетиңиз - сиз гана баскычтарда тура аласыз, алардын ортосунда эмес! 🪜

Бул энергия бир мааниден экинчисине "секирген" сыяктуу!`;
      }
      
      if (lowerQuestion.includes('энергия') || lowerQuestion.includes('energy') || lowerQuestion.includes('энергия')) {
        return `⚡ Энергия - жумуш аткаруу жөндөмү

Энергиянын негизги түрлөрү:
- Кинетикалык - кыймыл энергиясы
- Потенциалдык - орун энергиясы
- Жылуулук - молекулалардын кыймыл энергиясы
- Электр - электр заряддарынын энергиясы

Энергиянын сакталуу мыйзамы:
Энергия пайда болбойт жана жоголбойт, бирок бир түрдөн экинчисине айланат!

Мисалдар:
- Салки: потенциалдык → кинетикалык → потенциалдык
- Лампа: электр → жарык + жылуулук
- Батарея: химиялык → электр

Кинетикалык энергиянын формуласы:
E = ½ × m × v²

Мында m - масса, v - ылдамдык! 🚀`;
      }
      
      if (lowerQuestion.includes('магнетизм') || lowerQuestion.includes('магнит') || lowerQuestion.includes('magnetism') || lowerQuestion.includes('магнетизм')) {
        return `🧲 Магнетизм - материалдардын башка материалдарды тартуу же түртүү касиети

Негизги принциптер:
- Магнит уюлдары - түндүк (N) жана түштүк (S)
- Карама-каршы уюлдар тартат
- Окшош уюлдар түртөт

Магнит талаасы:
- Магниттин айланасындагы көрүнбөгөн аймак
- Магнит күчтөрүнүн багытын көрсөтөт
- Темир күрөөлөрү менен көрсөтүлөт

Мисалдар:
- Компас ар дайым Жердин түндүк уюлуна көрсөтөт
- Муздаткыч магниттерди тартат
- Электромагниттер моторлордо жана динамиктерде

Жөнөкөй окшоштук:
Магниттер адамдар сыяктуу - карама-каршылар тартат! 😄`;
      }

      // Общий ответ для других вопросов на кыргызском
      return `🤔 Кызыктуу суроо! Келгиле, муну чогуу чечели.

Сизди эмне кызыктырат?
- Физикалык мыйзамдар жана формулалар?
- Конкреттүү көрүнүштөр?
- Практикалык мисалдар?

Көбүрөөк конкреттүү суроо бериңиз, мен аны мисалдар менен толук түшүндүрүп берейин! 💡

Кеңеш: Физика боюнча типикалдуу суроолор үчүн төмөндөгү тез суроолорду колдонуңуз.`;
    }
    
    // Русские ответы (по умолчанию)
    if (lowerQuestion.includes('ньютон') || lowerQuestion.includes('закон') || lowerQuestion.includes('newton') || lowerQuestion.includes('закон')) {
      return `🔬 Первый закон Ньютона (Закон инерции):
      
Объект остается в покое или движется с постоянной скоростью, если на него не действуют внешние силы.

Простой пример: 
- Книга лежит на столе и не двигается, пока вы её не толкнете
- Автомобиль продолжает катиться по инерции, когда вы отпускаете газ

Формула: F = 0 → v = const

Это означает, что если сумма всех сил равна нулю, то скорость объекта постоянна! 🚗`;
    }
    
    if (lowerQuestion.includes('гравитация') || lowerQuestion.includes('тяжесть') || lowerQuestion.includes('gravity') || lowerQuestion.includes('ауурлук')) {
      return `🌍 Гравитация - это сила притяжения между объектами

Основные принципы:
- Чем больше масса объекта, тем сильнее его гравитация
- Чем дальше объекты друг от друга, тем слабее гравитация

Закон всемирного тяготения Ньютона:
F = G × (m₁ × m₂) / r²

Где:
- F - сила гравитации
- G - гравитационная постоянная
- m₁, m₂ - массы объектов
- r - расстояние между центрами объектов

Пример: Земля притягивает вас, потому что у неё огромная масса! 🌎`;
    }
    
    if (lowerQuestion.includes('электричество') || lowerQuestion.includes('ток') || lowerQuestion.includes('electricity') || lowerQuestion.includes('электр')) {
      return `⚡ Электричество - это движение электрических зарядов

Основные концепции:
- Электроны - отрицательно заряженные частицы
- Протоны - положительно заряженные частицы
- Ток - поток электронов по проводнику

Закон Ома:
U = I × R

Где:
- U - напряжение (Вольты)
- I - ток (Амперы) 
- R - сопротивление (Омы)

Простая аналогия: 
Представьте водопроводную трубу:
- Напряжение = давление воды
- Ток = количество воды
- Сопротивление = толщина трубы

Электричество течет от + к - как вода под гору! 💧`;
    }
    
    if (lowerQuestion.includes('квантовая') || lowerQuestion.includes('квант') || lowerQuestion.includes('quantum') || lowerQuestion.includes('кванттык')) {
      return `🔬 Квантовая физика - физика очень маленьких объектов

Ключевые принципы:
- Квантование - энергия может принимать только определенные значения
- Волновая функция - частицы ведут себя как волны
- Принцип неопределенности - нельзя точно измерить и положение, и скорость

Примеры квантования:
- Электроны в атоме могут находиться только на определенных орбитах
- Свет состоит из частиц-фотонов с определенной энергией

Простая аналогия:
Представьте лестницу - вы можете стоять только на ступеньках, а не между ними! 🪜

Это как если бы энергия "прыгала" от одного значения к другому!`;
    }
    
    if (lowerQuestion.includes('энергия') || lowerQuestion.includes('energy') || lowerQuestion.includes('энергия')) {
      return `⚡ Энергия - способность совершать работу

Основные виды энергии:
- Кинетическая - энергия движения
- Потенциальная - энергия положения
- Тепловая - энергия движения молекул
- Электрическая - энергия электрических зарядов

Закон сохранения энергии:
Энергия не создается и не исчезает, а только превращается из одного вида в другой!

Примеры:
- Качели: потенциальная → кинетическая → потенциальная
- Лампочка: электрическая → световая + тепловая
- Батарея: химическая → электрическая

Формула кинетической энергии:
E = ½ × m × v²

Где m - масса, v - скорость! 🚀`;
    }
    
    if (lowerQuestion.includes('магнетизм') || lowerQuestion.includes('магнит') || lowerQuestion.includes('magnetism') || lowerQuestion.includes('магнетизм')) {
      return `🧲 Магнетизм - свойство материалов притягивать или отталкивать другие материалы

Основные принципы:
- Магнитные полюса - северный (N) и южный (S)
- Противоположные полюса притягиваются
- Одинаковые полюса отталкиваются

Магнитное поле:
- Невидимая область вокруг магнита
- Показывает направление магнитных сил
- Визуализируется железными опилками

Примеры:
- Компас всегда показывает на северный полюс Земли
- Холодильник притягивает магниты
- Электромагниты в моторах и динамиках

Простая аналогия:
Магниты как люди - противоположности притягиваются! 😄`;
    }

    // Общий ответ для других вопросов
    return `🤔 Интересный вопрос! Давайте разберем это вместе.

Что именно вас интересует?
- Физические законы и формулы?
- Конкретные явления?
- Практические примеры?

Попробуйте задать более конкретный вопрос, и я дам подробное объяснение с примерами! 💡

Совет: Используйте быстрые подсказки ниже для типичных вопросов по физике.`;
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleModeChange = (mode: 'chat' | 'physics' | 'example' | 'formula') => {
    setSelectedMode(mode);
    // Обновляем приветственное сообщение при смене режима
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: getWelcomeMessage(),
      timestamp: new Date(),
      displayContent: getWelcomeMessage(),
      isTyping: false
    };
    setMessages([welcomeMessage]);
  };

  if (!isOpen) {
    return (
      <div className="fixed right-4 bottom-4 z-50">
        <Button
          onClick={togglePanel}
          className="group relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 text-white rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-all duration-500 overflow-hidden"
        >
          {/* Анимированный фон */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Пульсирующий эффект */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse opacity-20" />
          
          {/* Иконка */}
          <Bot className="h-7 w-7 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          
          {/* Светящийся эффект */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed right-0 top-0 h-full z-50 transition-all duration-700 ease-out ${
      isCollapsed ? 'w-20' : 'w-[420px]'
    }`}>
      <div className="h-full bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-xl flex flex-col">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white overflow-hidden">
          {/* Анимированный фон */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-cyan-500/90" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* Плавающие частицы */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 left-8 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="absolute top-8 right-12 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-6 left-16 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              {!isCollapsed && (
                <div>
                  <span className="font-bold text-lg">{t('ai.title')}</span>
                  <div className="text-xs text-white/80 mt-1">Powered by AI</div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePanel}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {!isCollapsed && (
          <>
            {/* Quick Prompts */}
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {t('ai.quick.prompts')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs h-10 px-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:scale-105 text-left justify-start"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Mode Selection */}
            <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
                  <Cpu className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Режим работы
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedMode === 'chat' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange('chat')}
                  className={`text-xs h-9 px-3 transition-all duration-300 hover:scale-105 ${
                    selectedMode === 'chat' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30'
                  }`}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Чат
                </Button>
                <Button
                  variant={selectedMode === 'physics' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange('physics')}
                  className={`text-xs h-9 px-3 transition-all duration-300 hover:scale-105 ${
                    selectedMode === 'physics' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30'
                  }`}
                >
                  <Atom className="h-3 w-3 mr-1" />
                  Физика
                </Button>
                <Button
                  variant={selectedMode === 'example' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange('example')}
                  className={`text-xs h-9 px-3 transition-all duration-300 hover:scale-105 ${
                    selectedMode === 'example' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30'
                  }`}
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Примеры
                </Button>
                <Button
                  variant={selectedMode === 'formula' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange('formula')}
                  className={`text-xs h-9 px-3 transition-all duration-300 hover:scale-105 ${
                    selectedMode === 'formula' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30'
                  }`}
                >
                  <Waves className="h-3 w-3 mr-1" />
                  Формулы
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-lg transition-all duration-500 hover:scale-105 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/25'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-gray-500/25 border border-gray-200/50 dark:border-gray-700/50'
                    }`}
                  >
                    {/* Анимированный курсор для ИИ сообщений */}
                    {message.type === 'ai' && message.isTyping && (
                      <div className="inline-block w-2 h-5 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full animate-pulse ml-1" />
                    )}
                    
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.type === 'ai' && message.isTyping 
                        ? (message.displayContent || '') 
                        : message.content
                      }
                    </div>
                    
                    <div className={`text-xs mt-3 flex items-center space-x-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.type === 'ai' && (
                        <div className="flex items-center space-x-1">
                          <Cpu className="h-3 w-3" />
                          <span>AI</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-700/50">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <div className="absolute inset-0 w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {t('ai.thinking')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/30 to-blue-50/30 dark:from-purple-900/20 dark:to-blue-900/20">
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t('ai.input.placeholder')}
                    className="w-full pl-4 pr-12 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Waves className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Collapsed View */}
        {isCollapsed && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-4">
            <div className="text-center">
              <div className="relative mb-4">
                <Bot className="h-10 w-10 text-purple-600 mx-auto" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center font-medium">
                {t('ai.title')}
              </div>
            </div>
            
            {/* Анимированные частицы */}
            <div className="space-y-2">
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
