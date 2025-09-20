import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Eye, 
  Brain, 
  Target, 
  Award,
  BarChart3,
  Lightbulb
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import "./FeaturesSection.css";

export const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: "Персональный класс для каждого учителя",
      description: "Создавайте уникальные классы и отслеживайте прогресс каждого ученика индивидуально",
      color: "from-blue-500 to-cyan-500",
      stats: "100% персонализация"
    },
    {
      icon: TrendingUp,
      title: "Трекер успеваемости",
      description: "Мониторинг прогресса в реальном времени с детальной аналитикой и рекомендациями",
      color: "from-green-500 to-emerald-500",
      stats: "До 70% рост успеваемости"
    },
    {
      icon: Eye,
      title: "Визуальные симуляции",
      description: "3D модели и интерактивные симуляции делают сложные концепции понятными",
      color: "from-purple-500 to-pink-500",
      stats: "Упрощение понимания на 80%"
    },
    {
      icon: Brain,
      title: "Онлайн уроки",
      description: "Структурированные уроки с пошаговым изучением материала",
      color: "from-orange-500 to-red-500",
      stats: "Систематическое обучение"
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Визуализация абстракций",
      description: "Законы Ньютона, электромагнетизм и другие сложные концепции в 3D",
      example: "Законы Ньютона в 3D"
    },
    {
      icon: Award,
      title: "Интерактивность",
      description: "Повышение вовлеченности учеников через активное участие",
      example: "Рост вовлеченности на 50-70%"
    },
    {
      icon: BarChart3,
      title: "Доказанная эффективность",
      description: "Основано на исследованиях и аналогах вроде PhET Colorado",
      example: "По данным исследований"
    },
    {
      icon: Lightbulb,
      title: "Инновационный подход",
      description: "Современные технологии в образовании для лучших результатов",
      example: "Новейшие методики"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/20 features-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-base bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            🚀 Преимущества платформы
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Почему SkillSpark работает?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Наша платформа объединяет лучшие практики современного образования с инновационными технологиями
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg hover:scale-105 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm feature-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <Icon className="h-8 w-8" />
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {feature.stats}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-gray-800/20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Научно обоснованные результаты
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Наша эффективность подтверждена исследованиями и опытом ведущих образовательных платформ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="group p-6 rounded-2xl bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 hover:from-white/80 hover:to-white/60 dark:hover:from-gray-700/80 dark:hover:to-gray-700/60 transition-all duration-300 border border-white/30 dark:border-gray-700/30 benefit-item"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {benefit.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300">
                        💡 {benefit.example}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 pt-8 border-t border-white/30 dark:border-gray-700/30">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <TrendingUp className="h-5 w-5 mr-2" />
              Начать использовать уже сегодня
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Присоединяйтесь к тысячам учителей, которые уже повысили успеваемость своих учеников
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
