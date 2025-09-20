import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Beaker, 
  Atom, 
  Eye, 
  Download, 
  ExternalLink,
  Info,
  Play,
  BookOpen
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MolecularShapesSimulation = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* PhET Simulation */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Beaker className="h-8 w-8" />
              <div>
                <CardTitle className="text-2xl">Конструктор Молекул</CardTitle>
                <p className="text-green-100 text-sm">PhET Colorado - Молекулярные формы</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Химия • Средний уровень
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-gray-100 dark:bg-gray-900 p-4">
            <iframe 
              src="https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_en.html"
              width="100%" 
              height="600" 
              allowFullScreen
              className="border-0 rounded-lg shadow-inner"
              title="PhET Molecular Shapes Simulation"
            />
          </div>
        </CardContent>
      </Card>

      {/* What You'll Learn */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
            <BookOpen className="h-5 w-5" />
            <span>Что вы изучите</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-green-700 dark:text-green-300">
                Основы молекулярной геометрии и теории VSEPR
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-green-700 dark:text-green-300">
                Создание и манипуляция молекулами в 3D пространстве
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-green-700 dark:text-green-300">
                Понимание электронных пар и их влияния на форму
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-green-700 dark:text-green-300">
                Анализ различных типов химических связей
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
            <Play className="h-5 w-5" />
            <span>Как использовать симуляцию</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">1. Выбор молекулы</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Выберите молекулу из списка или создайте свою собственную
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">2. 3D манипуляции</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Вращайте молекулу мышью для изучения со всех сторон
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">3. Анализ структуры</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Изучите электронные пары и их влияние на форму
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">4. Эксперименты</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Изменяйте атомы и наблюдайте изменения в геометрии
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chemistry Concepts */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800 dark:text-purple-200">
            <Atom className="h-5 w-5" />
            <span>Химические концепции</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                  VSEPR теория
                </Badge>
                <span className="text-purple-600 dark:text-purple-400 text-sm">
                  Отталкивание валентных электронных пар
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                  Молекулярная геометрия
                </Badge>
                <span className="text-purple-600 dark:text-purple-400 text-sm">
                  Формы молекул и их свойства
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                  Химические связи
                </Badge>
                <span className="text-purple-600 dark:text-purple-400 text-sm">
                  Ковалентные и ионные связи
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                  Электронные пары
                </Badge>
                <span className="text-purple-600 dark:text-purple-400 text-sm">
                  Свободные и связывающие пары
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Try More Simulations */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
            <Eye className="h-5 w-5" />
            <span>Попробуйте другие симуляции</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4 border-orange-200 hover:border-orange-300 hover:bg-orange-50 dark:border-orange-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/20"
            >
              <div className="text-left">
                <div className="font-semibold text-orange-700 dark:text-orange-300">
                  Симулятор Реакций
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">
                  Изучайте химические реакции
                </div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4 border-orange-200 hover:border-orange-300 hover:bg-orange-50 dark:border-orange-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/20"
            >
              <div className="text-left">
                <div className="font-semibold text-orange-700 dark:text-orange-300">
                  Движение Маятника
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">
                  Физика гармонического движения
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PhET Info */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-800 dark:text-cyan-200">
            <Info className="h-5 w-5" />
            <span>О PhET Colorado</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-cyan-700 dark:text-cyan-300">
            Эта симуляция создана PhET Interactive Simulations в Университете Колорадо Боулдер. 
            PhET предоставляет бесплатные интерактивные симуляции для изучения науки и математики.
          </p>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 dark:border-cyan-700 dark:text-cyan-300 dark:hover:bg-cyan-950/20"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Посетить PhET
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 dark:border-cyan-700 dark:text-cyan-300 dark:hover:bg-cyan-950/20"
            >
              <Download className="h-4 w-4 mr-2" />
              Скачать симуляцию
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MolecularShapesSimulation;
