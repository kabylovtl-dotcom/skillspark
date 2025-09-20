import { useState } from "react";
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
  ChevronRight,
  ChevronDown,
  Star,
  Users,
  ArrowLeft,
  Bookmark,
  Share2,
  Download,
  CheckCircle,
  Circle,
  Lock,
  Eye,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import AIAssistant from "@/components/ui/ai-assistant";

const PhysicsLessons = () => {
  const { t } = useLanguage();
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const getLessonPreview = (lessonId: string, title: string) => {
    // Генерируем превью на основе ID урока и названия
    const previews: { [key: string]: { description: string; topics: string[]; simulation?: string } } = {
      '3': {
        description: 'Изучите основы движения точечных частиц и твердых тел. Понимание положения, скорости и ускорения.',
        topics: ['Движение материальной точки', 'Движение твердого тела', 'Системы координат'],
        simulation: 'Интерактивная визуализация движения с отслеживанием позиции'
      },
      '84': {
        description: 'Откройте для себя фундаментальные свойства электрического заряда и элементарных частиц в электростатике.',
        topics: ['Элементарный заряд', 'Сохранение заряда', 'Электрические поля'],
        simulation: 'Симулятор взаимодействия зарядов'
      },
      // Добавим больше превью для популярных уроков
      '87': {
        description: 'Изучите закон Кулона - фундаментальный закон, управляющий электрической силой между заряженными частицами.',
        topics: ['Формула закона Кулона', 'Вычисления электрической силы', 'Принцип суперпозиции'],
        simulation: 'Калькулятор силы Кулона'
      }
    };
    
    return previews[lessonId] || {
      description: 'Комплексный урок, охватывающий основные концепции физики с интерактивными примерами и практическими применениями.',
      topics: ['Теоретические основы', 'Практические применения', 'Решение задач'],
      simulation: 'Интерактивная демонстрация физики'
    };
  };

  const physicsChapters = [
    {
      id: 'mechanics',
      title: 'Механика',
      icon: <Target className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Основы кинематики, динамики и статики',
      lessons: [
        { id: '3', title: 'Движение точки и тела', duration: '15 мин', difficulty: 'Начинающий', completed: false },
        { id: '4', title: 'Положение точки в пространстве', duration: '12 мин', difficulty: 'Начинающий', completed: false },
        { id: '5', title: 'Способы описания движения. Система отсчета', duration: '18 мин', difficulty: 'Начинающий', completed: false },
        { id: '6', title: 'Перемещение', duration: '14 мин', difficulty: 'Начинающий', completed: false },
        { id: '7', title: 'Скорость равномерного прямолинейного движения', duration: '20 мин', difficulty: 'Начинающий', completed: false },
        { id: '8', title: 'Уравнение равномерного прямолинейного движения', duration: '16 мин', difficulty: 'Начинающий', completed: false },
        { id: '9', title: 'Мгновенная скорость', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '10', title: 'Сложение скоростей', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '11', title: 'Ускорение', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '12', title: 'Единица ускорения', duration: '15 мин', difficulty: 'Средний', completed: false },
        { id: '13', title: 'Скорость при движении с постоянным ускорением', duration: '25 мин', difficulty: 'Средний', completed: false },
        { id: '14', title: 'Движение с постоянным ускорением', duration: '28 мин', difficulty: 'Средний', completed: false },
        { id: '15', title: 'Свободное падение тел', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '16', title: 'Движение с постоянным ускорением свободного падения', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '17', title: 'Равномерное движение точки по окружности', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '18', title: 'Движение тел. Поступательное движение', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '19', title: 'Вращательное движение твердого тела', duration: '26 мин', difficulty: 'Средний', completed: false },
        { id: '20', title: 'Основное утверждение механики', duration: '16 мин', difficulty: 'Средний', completed: false },
        { id: '21', title: 'Материальная точка', duration: '14 мин', difficulty: 'Начинающий', completed: false },
        { id: '22', title: 'Первый закон Ньютона', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '23', title: 'Сила', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '24', title: 'Связь между ускорением и силой', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '25', title: 'Второй закон Ньютона. Масса', duration: '25 мин', difficulty: 'Средний', completed: false },
        { id: '26', title: 'Третий закон Ньютона', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '27', title: 'Единицы массы и силы', duration: '16 мин', difficulty: 'Средний', completed: false },
        { id: '28', title: 'Инерциальные системы отсчета', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '29', title: 'Силы в природе. Гравитационные силы', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '30', title: 'Силы всемирного тяготения', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '31', title: 'Закон всемирного тяготения', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '32', title: 'Первая космическая скорость', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '33', title: 'Сила тяжести и вес. Невесомость', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '34', title: 'Деформация и силы упругости', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '35', title: 'Закон Гука', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '36', title: 'Роль сил трения', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '37', title: 'Силы трения между соприкасающимися поверхностями', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '38', title: 'Силы сопротивления в жидкостях и газах', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '39', title: 'Импульс материальной точки', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '40', title: 'Закон сохранения импульса', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '41', title: 'Реактивное движение', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '42', title: 'Успехи в освоении космического пространства', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '43', title: 'Работа силы', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '44', title: 'Мощность', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '45', title: 'Энергия', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '46', title: 'Кинетическая энергия и ее изменение', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '47', title: 'Работа силы тяжести', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '48', title: 'Работа силы упругости', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '49', title: 'Потенциальная энергия', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '50', title: 'Закон сохранения энергии в механике', duration: '26 мин', difficulty: 'Средний', completed: false },
        { id: '51', title: 'Уменьшение механической энергии под действием сил трения', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '52', title: 'Равновесие тел', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '53', title: 'Первое условие равновесия твердого тела', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '54', title: 'Второе условие равновесия твердого тела', duration: '24 мин', difficulty: 'Средний', completed: false }
      ]
    },
    {
      id: 'molecular-kinetics',
      title: 'Молекулярно-кинетическая теория',
      icon: <Atom className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Основы молекулярной физики и термодинамики',
      lessons: [
        { id: '56', title: 'Основные положения молекулярно-кинетической теории', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '57', title: 'Масса молекул. Количество вещества', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '58', title: 'Броуновское движение', duration: '16 мин', difficulty: 'Средний', completed: false },
        { id: '59', title: 'Силы взаимодействия молекул', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '60', title: 'Строение газообразных, жидких и твердых тел', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '61', title: 'Идеальный газ в молекулярно-кинетической теории', duration: '26 мин', difficulty: 'Средний', completed: false },
        { id: '62', title: 'Среднее значение квадрата скорости молекул', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '63', title: 'Основное уравнение молекулярно-кинетической теории', duration: '28 мин', difficulty: 'Средний', completed: false },
        { id: '64', title: 'Температура и тепловое равновесие', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '65', title: 'Определение температуры', duration: '16 мин', difficulty: 'Средний', completed: false },
        { id: '66', title: 'Абсолютная температура', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '67', title: 'Измерение скоростей молекул газа', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '68', title: 'Уравнение состояния идеального газа', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '69', title: 'Газовые законы', duration: '26 мин', difficulty: 'Средний', completed: false },
        { id: '70', title: 'Насыщенный пар', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '71', title: 'Зависимость давления насыщенного пара от температуры', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '72', title: 'Влажность воздуха', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '73', title: 'Кристаллические тела', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '74', title: 'Аморфные тела', duration: '16 мин', difficulty: 'Средний', completed: false },
        { id: '75', title: 'Внутренняя энергия', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '76', title: 'Работа в термодинамике', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '77', title: 'Количество теплоты', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '78', title: 'Первый закон термодинамики', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '79', title: 'Применение первого закона термодинамики', duration: '26 мин', difficulty: 'Средний', completed: false },
        { id: '80', title: 'Необратимость процессов в природе', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '81', title: 'Статистическое истолкование необратимости', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '82', title: 'Принцип действия тепловых двигателей', duration: '24 мин', difficulty: 'Средний', completed: false }
      ]
    },
    {
      id: 'electromagnetism',
      title: 'Электромагнетизм',
      icon: <Magnet className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Электростатика, электрический ток и магнитные явления',
      lessons: [
        { id: '84', title: 'Электрический заряд и элементарные частицы', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '85', title: 'Заряженные тела. Электризация тел', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '86', title: 'Закон сохранения электрического заряда', duration: '16 мин', difficulty: 'Средний', completed: false },
        { id: '87', title: 'Основной закон электростатики - закон Кулона', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '88', title: 'Единица электрического заряда', duration: '14 мин', difficulty: 'Средний', completed: false },
        { id: '89', title: 'Близкодействие и действие на расстоянии', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '90', title: 'Электрическое поле', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '91', title: 'Напряженность электрического поля', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '92', title: 'Силовые линии электрического поля', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '93', title: 'Проводники в электростатическом поле', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '94', title: 'Диэлектрики в электростатическом поле', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '95', title: 'Поляризация диэлектриков', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '96', title: 'Потенциальная энергия заряженного тела', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '97', title: 'Потенциал электростатического поля', duration: '26 мин', difficulty: 'Средний', completed: false },
        { id: '98', title: 'Связь между напряженностью и разностью потенциалов', duration: '28 мин', difficulty: 'Средний', completed: false },
        { id: '99', title: 'Электроемкость', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '100', title: 'Конденсаторы', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '101', title: 'Энергия заряженного конденсатора', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '102', title: 'Электрический ток. Сила тока', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '103', title: 'Условия существования электрического тока', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '104', title: 'Закон Ома для участка цепи', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '105', title: 'Сопротивление. Электрические цепи', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '106', title: 'Работа и мощность постоянного тока', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '107', title: 'Электродвижущая сила', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '108', title: 'Закон Ома для полной цепи', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '109', title: 'Электрическая проводимость различных веществ', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '110', title: 'Электронная проводимость металлов', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '111', title: 'Зависимость сопротивления от температуры', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '112', title: 'Сверхпроводимость', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '113', title: 'Электрический ток в полупроводниках', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '114', title: 'Электрическая проводимость полупроводников', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '115', title: 'Электрический ток через контакт полупроводников', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '116', title: 'Транзисторы', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '117', title: 'Электрический ток в вакууме', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '118', title: 'Электронные пучки', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '119', title: 'Электрический ток в жидкостях', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '120', title: 'Закон электролиза', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '121', title: 'Электрический ток в газах', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '122', title: 'Несамостоятельный и самостоятельный разряды', duration: '26 мин', difficulty: 'Средний', completed: false },
        { id: '123', title: 'Плазма', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '1', title: 'Взаимодействие токов', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '2', title: 'Вектор магнитной индукции', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '3', title: 'Модуль вектора магнитной индукции', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '4', title: 'Электроизмерительные приборы', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '5', title: 'Применение закона Ампера', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '6', title: 'Действие магнитного поля на движущийся заряд', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '7', title: 'Магнитные свойства вещества', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '8', title: 'Открытие электромагнитной индукции', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '9', title: 'Магнитный поток', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '10', title: 'Направление индукционного тока', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '11', title: 'Закон электромагнитной индукции', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '12', title: 'Вихревое электрическое поле', duration: '26 мин', difficulty: 'Средний', completed: false },
        { id: '13', title: 'ЭДС индукции в движущихся проводниках', duration: '20 мин', difficulty: 'Средний', completed: false },
        { id: '14', title: 'Электродинамический микрофон', duration: '18 мин', difficulty: 'Средний', completed: false },
        { id: '15', title: 'Самоиндукция. Индуктивность', duration: '22 мин', difficulty: 'Средний', completed: false },
        { id: '16', title: 'Энергия магнитного поля тока', duration: '24 мин', difficulty: 'Средний', completed: false },
        { id: '17', title: 'Электромагнитное поле', duration: '20 мин', difficulty: 'Средний', completed: false }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Начинающий':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Средний':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Продвинутый':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const totalLessons = physicsChapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  const totalHours = Math.round(totalLessons * 0.35); // Примерно 21 минута на урок

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-6">
            <Link to="/online-lessons" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Назад к предметам
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary font-medium">Физика</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl hover:from-blue-600 hover:to-cyan-600">
                <Atom className="h-12 w-12 text-white transition-all duration-300 ease-in-out group-hover:rotate-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Физика
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Изучение материи, энергии и их взаимодействий. От классической механики до современной квантовой физики
            </p>
            
            {/* Course Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-blue-700">
                <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
                <div className="text-sm text-muted-foreground">Уроков</div>
              </div>
              <div className="text-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-green-700">
                <div className="text-2xl font-bold text-green-600">{totalHours}</div>
                <div className="text-sm text-muted-foreground">Часов обучения</div>
              </div>
              <div className="text-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-purple-700">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-muted-foreground">Раздела</div>
              </div>
              <div className="text-center transition-all duration-300 ease-in-out hover:scale-110 hover:text-pink-700">
                <div className="text-2xl font-bold text-pink-600">Средний</div>
                <div className="text-sm text-muted-foreground">Уровень сложности</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <Play className="h-5 w-5 mr-2" />
                Начать обучение
              </Button>
              <Button variant="outline" size="lg" className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                <Bookmark className="h-5 w-5 mr-2" />
                Добавить в закладки
              </Button>
              <Button variant="outline" size="lg" className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                <Share2 className="h-5 w-5 mr-2" />
                Поделиться
              </Button>
            </div>
          </div>

          {/* Chapters */}
          <div className="space-y-8">
            {physicsChapters.map((chapter, index) => (
              <Card 
                key={chapter.id} 
                className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className={`bg-gradient-to-r ${chapter.color} text-white`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg transition-all duration-300 ease-in-out group-hover:bg-white/30 group-hover:scale-110">
                      {chapter.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{chapter.title}</CardTitle>
                      <p className="text-white/90 mt-1">{chapter.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {chapter.lessons.map((lesson) => {
                      const isExpanded = expandedLessons.includes(lesson.id);
                      const preview = getLessonPreview(lesson.id, lesson.title);
                      
                      return (
                        <div key={lesson.id} className="border rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
                          <div 
                            className="group p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer transition-all duration-200 ease-in-out"
                            onClick={() => toggleLesson(lesson.id)}
                          >
                            <div className="flex items-start justify-between mb-2">
                                                          <h4 className="font-medium text-sm group-hover:text-primary transition-all duration-200 ease-in-out pr-8">
                              §{lesson.id}. {lesson.title}
                            </h4>
                              <div className="flex items-center space-x-2">
                                {lesson.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Circle className="h-4 w-4 text-muted-foreground" />
                                )}
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-primary transition-all duration-300 ease-in-out transform rotate-0" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 ease-in-out transform rotate-0" />
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                              </div>
                                                      <Badge 
                          variant="outline" 
                          className={`text-xs transition-all duration-200 ease-in-out hover:scale-105 ${getDifficultyColor(lesson.difficulty)}`}
                        >
                          {lesson.difficulty}
                        </Badge>
                            </div>
                          </div>
                          
                          {/* Expanded Content */}
                          <div 
                            className={`px-4 pb-4 bg-gray-50/50 dark:bg-gray-900/30 border-t transition-all duration-500 ease-in-out overflow-hidden ${
                              isExpanded 
                                ? 'max-h-96 opacity-100 transform translate-y-0' 
                                : 'max-h-0 opacity-0 transform -translate-y-2'
                            }`}
                          >
                              <div className="grid md:grid-cols-2 gap-6 pt-4">
                                {/* Preview Content */}
                                <div className="space-y-4">
                                  <div>
                                    <h5 className="font-semibold text-sm mb-2 text-primary">
                                      Предварительный просмотр урока
                                    </h5>
                                    <p className="text-sm text-muted-foreground">
                                      {preview.description}
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <h5 className="font-semibold text-sm mb-2 text-primary">
                                      Изучаемые темы
                                    </h5>
                                    <ul className="space-y-1">
                                      {preview.topics.map((topic, index) => (
                                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                                          <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                          <span>{topic}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                {/* Actions */}
                                <div className="space-y-3">
                                  {preview.simulation && (
                                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Eye className="h-4 w-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                          Интерактивная симуляция
                                        </span>
                                      </div>
                                      <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                                        {preview.simulation}
                                      </p>
                                                                          <Button size="sm" variant="outline" className="w-full transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md">
                                      <ExternalLink className="h-3 w-3 mr-2" />
                                      Открыть симуляцию
                                    </Button>
                                    </div>
                                  )}
                                  
                                  <div className="flex flex-col space-y-2">
                                    <Button size="sm" className="w-full transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                                      <Play className="h-3 w-3 mr-2" />
                                      Начать урок
                                    </Button>
                                    <Button size="sm" variant="outline" className="w-full transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md">
                                      <BookOpen className="h-3 w-3 mr-2" />
                                      Изучить теорию
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Готовы к изучению физики?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Начните с первого урока и постепенно продвигайтесь по программе. 
                Каждый урок содержит теорию, практические примеры и интерактивные элементы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Play className="h-5 w-5 mr-2" />
                  Начать первый урок
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Скачать программу курса
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default PhysicsLessons;
