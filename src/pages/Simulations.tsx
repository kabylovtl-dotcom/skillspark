import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./Simulations.css";
import { 
  ArrowRight, 
  Play, 
  Eye, 
  Ruler, 
  Atom, 
  Beaker, 
  Leaf, 
  Telescope, 
  Calculator,
  Target,
  Zap,
  Activity,
  Brain,
  Globe,
  Microscope,
  Download
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import AIAssistant from "@/components/ui/ai-assistant";
import pendulumPreview from "@/assets/preview-pendulum.jpg";
import projectilePreview from "@/assets/preview-projectile.jpg";
import ohmsPreview from "@/assets/preview-ohms.jpg";
import newtonsPreview from "@/assets/preview-newtons.jpg";

const Simulations = () => {
  const { t } = useLanguage();

  const getDifficultyColor = (difficulty: string) => {
    const beginner = t('sims.difficulty.beginner');
    const intermediate = t('sims.difficulty.intermediate');
    const advanced = t('sims.difficulty.advanced');
    
    switch (difficulty) {
      case beginner:
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case intermediate:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case advanced:
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const subjectCategories = [
    {
      id: 'physics',
      name: t('sims.page.physics'),
      icon: <Atom className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      description: t('sims.page.physics.desc'),
      simulations: [
    {
      id: 'pendulum',
          title: 'Движение Маятника',
          description: 'Исследуйте простое гармоническое движение с настраиваемыми параметрами и анализом энергии',
      preview: pendulumPreview,
          difficulty: t('sims.difficulty.beginner'),
          features: ['Регулировка угла', 'Измерение периода', 'Визуализация энергии', 'Эффекты затухания'],
          color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'projectile',
          title: 'Движение Снаряда',
          description: 'Понимание физики траектории с интерактивным управлением скоростью',
      preview: projectilePreview,
          difficulty: t('sims.difficulty.intermediate'),
          features: ['Векторы скорости', 'Отслеживание траектории', 'Оптимизация дальности', 'Сопротивление воздуха'],
          color: 'from-blue-500 to-indigo-500'
        },
        {
          id: 'newtons-laws',
          title: 'Законы Ньютона',
          description: 'Визуализация сил и движения в интерактивных сценариях',
          preview: newtonsPreview,
          difficulty: t('sims.difficulty.intermediate'),
          features: ['Векторы сил', 'Изменение массы', 'Графики ускорения', 'Моделирование трения'],
          color: 'from-indigo-500 to-purple-500'
        },
        {
          id: 'wave-motion',
          title: 'Волновое Движение',
          description: 'Исследуйте свойства волн, включая интерференцию и дифракцию',
          preview: pendulumPreview,
          difficulty: t('sims.difficulty.advanced'),
          features: ['Суперпозиция волн', 'Контроль частоты', 'Регулировка амплитуды', 'Анализ фазы'],
          color: 'from-purple-500 to-pink-500'
        }
      ]
    },
    {
      id: 'chemistry',
      name: t('sims.page.chemistry'),
      icon: <Beaker className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500',
      description: t('sims.page.chemistry.desc'),
      simulations: [
        {
          id: 'molecular-builder',
          title: 'Конструктор Молекул',
          description: 'Создавайте и исследуйте молекулярные структуры в 3D пространстве',
          preview: newtonsPreview,
          difficulty: t('sims.difficulty.intermediate'),
          features: ['3D вращение', 'Создание связей', 'Анализ структуры', 'Химические инструменты'],
          color: 'from-green-400 to-emerald-400'
        },
        {
          id: 'reaction-simulator',
          title: 'Симулятор Реакций',
          description: 'Изучайте химические реакции с визуализацией процессов',
          preview: projectilePreview,
          difficulty: t('sims.difficulty.advanced'),
          features: ['Балансировка уравнений', 'Скорость реакций', 'Катализ', 'Термодинамика'],
          color: 'from-emerald-500 to-teal-500'
        }
      ]
    },
    {
      id: 'biology',
      name: t('sims.page.biology'),
      icon: <Leaf className="h-8 w-8" />,
      color: 'from-emerald-500 to-green-600',
      description: t('sims.page.biology.desc'),
      simulations: [
        {
          id: 'ecosystem-simulator',
          title: 'Симулятор Экосистемы',
          description: 'Исследуйте взаимодействие видов в динамической экосистеме',
          preview: pendulumPreview,
          difficulty: t('sims.difficulty.intermediate'),
          features: ['Популяционная динамика', 'Пищевые цепи', 'Адаптация', 'Эволюция'],
          color: 'from-emerald-400 to-green-500'
        },
        {
          id: 'cell-simulator',
          title: 'Симулятор Клетки',
          description: 'Изучайте структуру и функции клеток',
      preview: newtonsPreview,
          difficulty: t('sims.difficulty.advanced'),
          features: ['Органеллы', 'Метаболизм', 'Деление клеток', 'Генетика'],
          color: 'from-green-500 to-lime-500'
        }
      ]
    },
    {
      id: 'innovations',
      name: t('sims.page.innovations'),
      icon: <Globe className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-600',
      description: t('sims.page.innovations.desc'),
      simulations: [
        {
          id: 'ar-technology',
          title: 'AR Технология',
          description: 'Протестируйте дополненную реальность на своем телефоне',
          preview: newtonsPreview,
          difficulty: t('sims.difficulty.beginner'),
          features: ['QR код для AR', '3D модели', 'Интерактивность', 'Мобильное приложение'],
          color: 'from-purple-400 to-pink-500'
        }
      ]
    },
    {
      id: 'astronomy',
      name: t('sims.page.astronomy'),
      icon: <Telescope className="h-8 w-8" />,
      color: 'from-purple-500 to-indigo-600',
      description: t('sims.page.astronomy.desc'),
      simulations: [
        {
          id: 'solar-system',
          title: 'Солнечная Система',
          description: 'Исследуйте орбиты планет и их взаимодействия',
          preview: projectilePreview,
          difficulty: t('sims.difficulty.intermediate'),
          features: ['Орбитальное движение', 'Гравитация', 'Спутники', 'Космические миссии'],
          color: 'from-purple-400 to-indigo-500'
        },
        {
          id: 'star-lifecycle',
          title: 'Жизненный Цикл Звезд',
          description: 'Изучайте рождение, жизнь и смерть звезд',
      preview: ohmsPreview,
          difficulty: t('sims.difficulty.advanced'),
          features: ['Нуклеосинтез', 'Эволюция звезд', 'Сверхновые', 'Черные дыры'],
          color: 'from-indigo-500 to-blue-600'
        }
      ]
    },
    {
      id: 'mathematics',
      name: t('sims.page.mathematics'),
      icon: <Calculator className="h-8 w-8" />,
      color: 'from-orange-500 to-red-500',
      description: t('sims.page.mathematics.desc'),
      simulations: [
        {
          id: 'function-plotter',
          title: 'Построитель Функций',
          description: 'Визуализируйте математические функции и их свойства',
          preview: newtonsPreview,
          difficulty: t('sims.difficulty.beginner'),
          features: ['Графики функций', 'Производные', 'Интегралы', 'Анимация'],
          color: 'from-orange-400 to-red-400'
        },
        {
          id: 'geometry-explorer',
          title: 'Исследователь Геометрии',
          description: 'Изучайте геометрические фигуры и их свойства',
          preview: pendulumPreview,
          difficulty: t('sims.difficulty.intermediate'),
          features: ['2D и 3D фигуры', 'Теоремы', 'Доказательства', 'Интерактивные задачи'],
          color: 'from-red-500 to-pink-500'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 hero-section">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-base">
              {t('sims.page.subtitle')}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              {t('sims.page.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('sims.page.description')}
            </p>
          </div>

          {/* Subject Categories */}
          <div className="space-y-16">
            {subjectCategories.map((subject, subjectIndex) => (
              <div key={subject.id} className="space-y-8 subject-category">
                {/* Subject Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-4 bg-gradient-to-r ${subject.color} rounded-2xl text-white shadow-xl subject-icon`}>
                      {subject.icon}
                  </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{subject.name}</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {subject.description}
                  </p>
          </div>

          {/* Simulations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  {subject.simulations.map((sim, simIndex) => (
              <Card 
                      key={sim.id} 
                      className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg hover:scale-[1.02] simulation-card"
                      style={{ animationDelay: `${(subjectIndex * 200) + (simIndex * 100)}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={sim.preview} 
                          alt={sim.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge 
                              variant="secondary" 
                              className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                            >
                              {subject.name}
                    </Badge>
                    <Badge 
                              variant="outline" 
                              className={`${getDifficultyColor(sim.difficulty)} border-white/30 text-white backdrop-blur-sm`}
                    >
                              {sim.difficulty}
                    </Badge>
                  </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{sim.title}</h3>
                          <p className="text-white/90 text-base leading-relaxed line-clamp-2">
                            {sim.description}
                          </p>
                  </div>
                </div>
                
                      {/* Card Content */}
                      <CardContent className="p-6 bg-white dark:bg-gray-900">
                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {sim.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sim.color}`}></div>
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                  </div>
                  
                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Link to={`/simulations/${sim.id}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                              <Play className="h-4 w-4 mr-2" />
                              {t('sims.card.launch')}
                      </Button>
                    </Link>
                          <Button variant="outline" size="sm" className="px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Eye className="h-4 w-4" />
                          </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center cta-section">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0 shadow-2xl">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white shadow-xl">
                    <Brain className="h-12 w-12" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4">{t('sims.cta.title')}</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t('sims.cta.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Play className="h-5 w-5 mr-2" />
                    {t('sims.cta.start')}
                  </Button>
                  <Button variant="outline" size="lg" className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Download className="h-5 w-5 mr-2" />
                    {t('sims.cta.browse')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Simulations;