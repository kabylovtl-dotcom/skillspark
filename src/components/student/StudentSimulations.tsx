import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppStore } from '@/store/appStore';
import AnimatedText from '@/components/ui/AnimatedText';
import { useTranslation } from 'react-i18next';
import { Play, CheckCircle, Clock, Search, Filter, Atom, Zap, Target } from 'lucide-react';
import PendulumSimulation from '@/components/simulation/PendulumSimulation';

const StudentSimulations: React.FC = () => {
  const { simulations, completeSimulation } = useAppStore();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [selectedSimulation, setSelectedSimulation] = useState<string | null>(null);

  const subjects = ['all', ...Array.from(new Set(simulations.map(sim => sim.subject)))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredSimulations = simulations.filter(simulation => {
    const matchesSearch = simulation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         simulation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || simulation.subject === filterSubject;
    const matchesDifficulty = filterDifficulty === 'all' || simulation.difficulty === filterDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleStartSimulation = (simulationId: string) => {
    setSelectedSimulation(simulationId);
  };

  const handleCompleteSimulation = () => {
    if (selectedSimulation) {
      completeSimulation(selectedSimulation);
      setSelectedSimulation(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Начальный';
      case 'intermediate':
        return 'Средний';
      case 'advanced':
        return 'Продвинутый';
      default:
        return difficulty;
    }
  };

  const getSimulationIcon = (title: string) => {
    if (title.toLowerCase().includes('маятник')) return Atom;
    if (title.toLowerCase().includes('ом')) return Zap;
    if (title.toLowerCase().includes('ньютон')) return Target;
    return Play;
  };

  const SimulationCanvas: React.FC<{ simulationId: string }> = ({ simulationId }) => {
    const simulation = simulations.find(s => s.id === simulationId);
    
    // Check if this is the pendulum simulation
    if (simulation?.title.toLowerCase().includes('маятник') || simulation?.id === '1') {
      return (
        <PendulumSimulation 
          onComplete={handleCompleteSimulation}
          isTeacherMode={false}
        />
      );
    }
    
    // Default placeholder for other simulations
    return (
      <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>
        
        {/* Контент симуляции */}
        <div className="text-center z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {React.createElement(getSimulationIcon(simulation?.title || ''), { className: "h-10 w-10 text-white" })}
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {simulation?.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {simulation?.description}
          </p>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Здесь будет интерактивная 3D симуляция
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          <AnimatedText translationKey="simulations" />
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          <AnimatedText translationKey="interactive3DExperiments" />
        </p>
      </div>

      {/* Фильтры и поиск */}
      <div
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('searchSimulations')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'Все предметы' : subject}
                </option>
              ))}
            </select>
            
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'Все уровни' : getDifficultyLabel(difficulty)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Список симуляций */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSimulations.map((simulation, index) => {
          const Icon = getSimulationIcon(simulation.title);
          return (
            <div
            >
              <Card className={`hover:shadow-lg transition-all duration-300 ${
                simulation.isCompleted ? 'ring-2 ring-green-200 dark:ring-green-800' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        simulation.isCompleted 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                      }`}>
                        {simulation.isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <Icon className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{simulation.title}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {simulation.subject}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(simulation.difficulty)}`}>
                      {getDifficultyLabel(simulation.difficulty)}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {simulation.description}
                  </p>
                  
                  <div className="space-y-3">
                    {simulation.isCompleted ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Симуляция завершена</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                          {simulation.completedAt ? new Date(simulation.completedAt).toLocaleDateString('ru-RU') : ''}
                        </span>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => handleStartSimulation(simulation.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        size="sm"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Запустить симуляцию
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Диалог симуляции */}
      <Dialog open={!!selectedSimulation} onOpenChange={() => setSelectedSimulation(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedSimulation && simulations.find(s => s.id === selectedSimulation)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedSimulation && <SimulationCanvas simulationId={selectedSimulation} />}
            <div className="flex gap-3">
              <Button 
                onClick={handleCompleteSimulation}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Завершить симуляцию
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedSimulation(null)}
                className="flex-1"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {filteredSimulations.length === 0 && (
        <div
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
            {searchTerm || filterSubject !== 'all' || filterDifficulty !== 'all' 
              ? 'Симуляции не найдены' 
              : 'Нет доступных симуляций'
            }
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {searchTerm || filterSubject !== 'all' || filterDifficulty !== 'all'
              ? 'Попробуйте изменить фильтры поиска'
              : 'Обратитесь к учителю для получения доступа к симуляциям'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentSimulations;
