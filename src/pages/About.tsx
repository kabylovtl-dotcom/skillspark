import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PenTool,
  Palette,
  Download,
  Eraser,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import whiteboardImage from "@/assets/whiteboard-demo.jpg";

const About = () => {
  // Устанавливаем заголовок страницы
  document.title = "Whiteboard - SkillSpark KG";
  const whiteboardTools = [
    { icon: PenTool, name: "Умная ручка", desc: "Рисование с распознаванием жестов" },
    { icon: Palette, name: "Цветовая палитра", desc: "Безграничные возможности цветов" },
    { icon: Eraser, name: "Ластик", desc: "Точное удаление элементов" },
    { icon: Download, name: "Экспорт", desc: "Сохранение работ в различных форматах" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 px-4 py-2 text-base">
                🎨 Цифровая доска
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gradient-primary">
                Whiteboard - Интерактивная доска
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Создавайте диаграммы сил, схемы цепей, визуализации волн и многое другое 
                с помощью интуитивных инструментов рисования. Идеально для объяснения 
                сложных научных концепций в классе или онлайн.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/simulations">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-strong transition-smooth">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Исследовать симуляции
                  </Button>
                </Link>
                <Link to="/online-lessons">
                  <Button variant="outline" size="lg" className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-smooth">
                    <PenTool className="h-5 w-5 mr-2" />
                    Онлайн уроки
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Whiteboard Demo Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Demo Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl"></div>
                <Card className="relative overflow-hidden shadow-strong border-0">
                  <img 
                    src={whiteboardImage} 
                    alt="Цифровая доска с физическими диаграммами" 
                    className="w-full h-auto object-cover"
                  />
                </Card>
              </div>

              {/* Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-6">
                    Что такое цифровая доска SkillSpark?
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Это интерактивный инструмент для создания и объяснения научных концепций. 
                    Учителя могут рисовать диаграммы, создавать схемы и демонстрировать 
                    сложные физические процессы в реальном времени.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ученики могут взаимодействовать с доской, задавать вопросы и 
                    участвовать в создании научных моделей, что значительно повышает 
                    понимание и вовлеченность в процесс обучения.
                  </p>
                </div>

                {/* Drawing Tools */}
                <div className="space-y-6">
                  <h4 className="text-2xl font-semibold">Инструменты рисования</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {whiteboardTools.map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <div 
                          key={index} 
                          className="flex items-start space-x-4 p-4 rounded-medium bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-smooth border border-neutral-200 dark:border-neutral-700"
                        >
                          <div className="p-2 bg-gradient-primary rounded-lg text-white">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">{tool.name}</div>
                            <div className="text-sm text-muted-foreground">{tool.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button size="lg" className="bg-gradient-primary hover:shadow-strong transition-smooth group">
                  <PenTool className="h-5 w-5 mr-2" />
                  Попробовать доску
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Как использовать цифровую доску?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Цифровая доска подходит для различных сценариев обучения
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 bg-white dark:bg-neutral-800 border-0 shadow-medium hover:shadow-strong transition-smooth">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">В классе</h3>
                <p className="text-muted-foreground">
                  Объясняйте сложные концепции с помощью интерактивных диаграмм 
                  и схем, которые можно сохранить и пересмотреть позже.
                </p>
              </Card>

              <Card className="text-center p-8 bg-white dark:bg-neutral-800 border-0 shadow-medium hover:shadow-strong transition-smooth">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <PenTool className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Онлайн обучение</h3>
                <p className="text-muted-foreground">
                  Создавайте визуальные материалы для дистанционных уроков, 
                  которые ученики могут изучать в удобном для них темпе.
                </p>
              </Card>

              <Card className="text-center p-8 bg-white dark:bg-neutral-800 border-0 shadow-medium hover:shadow-strong transition-smooth">
                <div className="w-16 h-16 bg-gradient-cool rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Домашние задания</h3>
                <p className="text-muted-foreground">
                  Задавайте творческие задания по созданию диаграмм и схем, 
                  которые развивают понимание и креативность учеников.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
