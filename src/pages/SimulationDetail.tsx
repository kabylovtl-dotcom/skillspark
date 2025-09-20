import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SimulationCanvas } from "@/components/simulation/SimulationCanvas";
import { PendulumSimulation } from "@/components/simulation/PendulumSimulation";
import MolecularShapesSimulation from "@/components/simulation/MolecularShapesSimulation";
import ARSimulation from "@/components/simulation/ARSimulation";

import { ArrowLeft, BookOpen, Share2, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SimulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();

  // Simulation data (in real app, this would come from API/database)
  const simulations = {
    'pendulum': {
      title: t('simulation.pendulum'),
      description: t('sim.detail.pendulum.desc'),
      category: t('sim.detail.categories.mechanics'),
      difficulty: t('sim.detail.difficulty.beginner'),
      learningObjectives: t('sim.detail.pendulum.objectives'),
      theory: t('sim.detail.pendulum.theory'),
    },
    'projectile': {
      title: t('simulation.projectile'),
      description: t('sim.detail.projectile.desc'),
      category: t('sim.detail.categories.mechanics'),
      difficulty: t('sim.detail.difficulty.intermediate'),
      learningObjectives: t('sim.detail.projectile.objectives'),
      theory: t('sim.detail.projectile.theory'),
    },
    'ohms-law': {
      title: t('simulation.ohms'),
      description: t('sim.detail.ohms.desc'),
      category: t('sim.detail.categories.electricity'),
      difficulty: t('sim.detail.difficulty.beginner'),
      learningObjectives: t('sim.detail.ohms.objectives'),
      theory: t('sim.detail.ohms.theory'),
    },
    'newtons-laws': {
      title: t('simulation.newtons'),
      description: t('sim.detail.newtons.desc'),
      category: t('sim.detail.categories.mechanics'),
      difficulty: t('sim.detail.difficulty.intermediate'),
      learningObjectives: t('sim.detail.newtons.objectives'),
      theory: t('sim.detail.newtons.theory'),
    },
    'molecular-builder': {
      title: 'Конструктор Молекул',
      description: 'Создавайте и исследуйте молекулярные структуры в 3D пространстве',
      category: 'Химия',
      difficulty: 'Средний',
      learningObjectives: [
        'Понимание теории VSEPR и молекулярной геометрии',
        'Создание и манипуляция молекулами в 3D',
        'Анализ электронных пар и их влияния на форму',
        'Изучение различных типов химических связей'
      ],
      theory: 'Теория VSEPR (Valence Shell Electron Pair Repulsion) объясняет, как электронные пары в валентной оболочке атома отталкиваются друг от друга, определяя геометрическую форму молекулы. Эта теория помогает предсказать структуру молекул на основе количества связывающих и свободных электронных пар вокруг центрального атома.',
    },
    'ar-technology': {
      title: 'AR Технология',
      description: 'Протестируйте дополненную реальность на своем телефоне',
      category: 'Инновации',
      difficulty: 'Начинающий',
      learningObjectives: [
        'Понимание принципов работы AR технологий',
        'Тестирование AR через QR код на смартфоне',
        'Изучение возможностей дополненной реальности в образовании',
        'Практическое применение AR для визуализации 3D объектов'
      ],
      theory: 'Дополненная реальность (AR) - это технология, которая накладывает виртуальную информацию на реальный мир. В образовании AR позволяет студентам взаимодействовать с 3D моделями, визуализировать сложные концепции и проводить виртуальные эксперименты в реальном пространстве.',
    }
  };

  const simulation = simulations[id as keyof typeof simulations];

  if (!simulation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">{t('sim.detail.not.found')}</h1>
            <p className="text-muted-foreground mb-8">{t('sim.detail.not.found.desc')}</p>
            <Link to="/simulations">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('sim.detail.back.to.sims')}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-6">
            <Link to="/simulations" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.simulations')}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{simulation.title}</span>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">{simulation.category}</Badge>
                <Badge variant={simulation.difficulty === 'Beginner' ? 'default' : 'outline'}>
                  {simulation.difficulty}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold">{simulation.title}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {simulation.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {t('common.share')}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {t('common.export')}
              </Button>
              <Link to="/simulations">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('common.back')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Simulation Canvas */}
            <div className="space-y-6">
              {id === 'pendulum' ? (
                <PendulumSimulation />
              ) : id === 'projectile' ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <span>🎯 {t('simulation.projectile')}</span>
                        <Badge variant="outline" className="ml-2">
                          PhET Colorado
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          {t('sim.detail.projectile.desc')}
                        </p>
                        
                        {/* PhET iframe */}
                        <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                          <iframe 
                            src={`https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_${language === 'ru' || language === 'ky' ? 'ru' : 'en'}.html`}
                            width="100%" 
                            height="600" 
                            allowFullScreen
                            className="border-0"
                            title="PhET Projectile Motion Simulation"
                          />
                        </div>
                        
                        {/* PhET Information */}
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-600 dark:text-blue-400 text-sm">ℹ️</span>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                                {t('phet.info.title')}
                              </h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {t('phet.info.description')}
                              </p>
                              <a 
                                href="https://phet.colorado.edu" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <span>{t('phet.info.visit')}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : id === 'molecular-builder' ? (
                <MolecularShapesSimulation />
              ) : id === 'ar-technology' ? (
                <ARSimulation />
              ) : (
              <SimulationCanvas simulationId={id || ''} />
              )}
              
              {/* Theory Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>{t('sim.detail.theory.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {simulation.theory}
                  </p>
                </CardContent>
              </Card>
              
              {/* Learning Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('sim.detail.learning.objectives')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {simulation.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>


          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SimulationDetail;