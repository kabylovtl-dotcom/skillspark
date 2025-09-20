import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Target, 
  Atom, 
  Magnet, 
  Calculator,
  FlaskConical,
  Leaf,
  Globe,
  Brain,
  Dna,
  Zap,
  Star,
  Users,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const OnlineLessons = () => {
  const { t } = useLanguage();

  const subjects = [
    {
      id: 'physics',
      title: t('lessons.subject.physics'),
      icon: <Atom className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      description: t('lessons.subject.physics.desc'),
      lessons: 123,
      hours: 45,
      difficulty: t('lessons.difficulty.intermediate'),
      topics: ['Механика', 'Электромагнетизм', 'Термодинамика', 'Квантовая физика'],
      status: 'active'
    },
    {
      id: 'mathematics',
      title: t('lessons.subject.mathematics'),
      icon: <Calculator className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      description: t('lessons.subject.mathematics.desc'),
      lessons: 98,
      hours: 38,
      difficulty: t('lessons.difficulty.intermediate'),
      topics: ['Алгебра', 'Геометрия', 'Тригонометрия', 'Математический анализ'],
      status: 'coming-soon'
    },
    {
      id: 'chemistry',
      title: t('lessons.subject.chemistry'),
      icon: <FlaskConical className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500',
      description: t('lessons.subject.chemistry.desc'),
      lessons: 87,
      hours: 32,
      difficulty: t('lessons.difficulty.intermediate'),
      topics: ['Неорганическая химия', 'Органическая химия', 'Физическая химия', 'Биохимия'],
      status: 'coming-soon'
    },
    {
      id: 'biology',
      title: t('lessons.subject.biology'),
      icon: <Leaf className="h-8 w-8" />,
      color: 'from-emerald-500 to-teal-500',
      description: t('lessons.subject.biology.desc'),
      lessons: 76,
      hours: 28,
      difficulty: t('lessons.difficulty.intermediate'),
      topics: ['Ботаника', 'Зоология', 'Анатомия', 'Генетика'],
      status: 'coming-soon'
    },
    {
      id: 'geography',
      title: 'География',
      icon: <Globe className="h-8 w-8" />,
      color: 'from-orange-500 to-red-500',
      description: 'Наука о Земле и её обитателях',
      lessons: 65,
      hours: 24,
      difficulty: t('lessons.difficulty.beginner'),
      topics: ['Физическая география', 'Экономическая география', 'Картография', 'Климатология'],
      status: 'coming-soon'
    },
    {
      id: 'psychology',
      title: 'Психология',
      icon: <Brain className="h-8 w-8" />,
      color: 'from-indigo-500 to-purple-500',
      description: 'Наука о психике и поведении человека',
      lessons: 54,
      hours: 20,
      difficulty: t('lessons.difficulty.intermediate'),
      topics: ['Общая психология', 'Социальная психология', 'Клиническая психология', 'Педагогическая психология'],
      status: 'coming-soon'
    },
    {
      id: 'genetics',
      title: 'Генетика',
      icon: <Dna className="h-8 w-8" />,
      color: 'from-pink-500 to-rose-500',
      description: 'Наука о наследственности и изменчивости',
      lessons: 42,
      hours: 16,
      difficulty: t('lessons.difficulty.advanced'),
      topics: ['Молекулярная генетика', 'Популяционная генетика', 'Медицинская генетика', 'Генетическая инженерия'],
      status: 'coming-soon'
    },
    {
      id: 'astronomy',
      title: 'Астрономия',
      icon: <Star className="h-8 w-8" />,
      color: 'from-slate-500 to-gray-500',
      description: 'Изучение космоса и небесных объектов',
      lessons: 38,
      hours: 14,
      difficulty: t('lessons.difficulty.intermediate'),
      topics: ['Планетология', 'Звездная астрономия', 'Космология', 'Астрофизика'],
      status: 'coming-soon'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Доступно</Badge>;
      case 'coming-soon':
        return <Badge variant="outline" className="text-muted-foreground">Скоро</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">В разработке</Badge>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Начинающий':
        return 'text-green-600';
      case 'Средний':
        return 'text-yellow-600';
      case 'Продвинутый':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              🎓 {t('lessons.page.subtitle')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('lessons.page.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('lessons.page.description')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6">
              <div className="flex items-center justify-center mb-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600">8</h3>
              <p className="text-muted-foreground">{t('lessons.stats.subjects')}</p>
            </Card>
            <Card className="text-center p-6">
              <div className="flex items-center justify-center mb-3">
                <Play className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600">583</h3>
              <p className="text-muted-foreground">{t('lessons.stats.lessons')}</p>
            </Card>
            <Card className="text-center p-6">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-600">217</h3>
              <p className="text-muted-foreground">{t('lessons.stats.hours')}</p>
            </Card>
            <Card className="text-center p-6">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-pink-600">5000+</h3>
              <p className="text-muted-foreground">{t('stats.students')}</p>
            </Card>
          </div>

          {/* Subjects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {subjects.map((subject) => (
              <Card 
                key={subject.id} 
                className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  subject.status === 'active' ? 'ring-2 ring-blue-500/20' : ''
                }`}
              >
                <CardHeader className={`bg-gradient-to-r ${subject.color} text-white relative`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-xl">
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{subject.title}</CardTitle>
                      <p className="text-white/90 text-sm mt-1">{subject.description}</p>
                    </div>
                  </div>
                  {subject.status === 'active' && (
                    <div className="absolute top-3 right-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {getStatusBadge(subject.status)}
                    <span className={`text-sm font-medium ${getDifficultyColor(subject.difficulty)}`}>
                      {subject.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t('lessons.card.lessons')}:</span>
                      <span className="font-medium">{subject.lessons}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t('lessons.card.hours')}:</span>
                      <span className="font-medium">{subject.hours}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 text-muted-foreground">Основные темы:</h4>
                    <div className="flex flex-wrap gap-1">
                      {subject.topics.slice(0, 3).map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {subject.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{subject.topics.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {subject.status === 'active' ? (
                    <Link to={`/online-lessons/${subject.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Play className="h-4 w-4 mr-2" />
                        {t('lessons.buttons.start')}
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <Clock className="h-4 w-4 mr-2" />
                      {t('lessons.buttons.coming')}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('lessons.cta.title')}</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('lessons.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/online-lessons/physics">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Atom className="h-5 w-5 mr-2" />
                    {t('lessons.cta.start.physics')}
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Star className="h-5 w-5 mr-2" />
                  {t('lessons.cta.notify')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OnlineLessons;
