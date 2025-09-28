import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Settings, Info, ExternalLink, AlertCircle } from 'lucide-react';

interface PendulumSimulationProps {
  onComplete?: () => void;
  isTeacherMode?: boolean;
}

const PendulumSimulation: React.FC<PendulumSimulationProps> = ({ 
  onComplete, 
  isTeacherMode = false 
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [useTestSimulation, setUseTestSimulation] = useState(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      console.log('Iframe loaded successfully');
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      console.log('Iframe failed to load');
      setHasError(true);
      setIsLoaded(false);
    };

    // Check if iframe is already loaded
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      handleLoad();
    } else {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
    }
    
    // Set a timeout to show error if it takes too long
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        console.log('Iframe loading timeout');
        setHasError(true);
      }
    }, 15000); // Increased timeout to 15 seconds

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
      clearTimeout(timeout);
    };
  }, [isLoaded]);

  // Force load the iframe after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (iframeRef.current && !isLoaded && !hasError) {
        console.log('Force reloading iframe');
        iframeRef.current.src = iframeRef.current.src;
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenInNewTab = () => {
    window.open('/pendulum-lab_en.html', '_blank');
  };

  const handleOpenFullPage = () => {
    window.open('/pendulum-lab_en.html', '_blank');
  };

  const handleReset = () => {
    if (iframeRef.current) {
      setHasError(false);
      setIsLoaded(false);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="space-y-4">
      {/* Simulation Container */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Лаборатория маятника - PhET Simulation
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowControls(!showControls)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/pendulum-lab_en.html'}
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUseTestSimulation(!useTestSimulation)}
              >
                {useTestSimulation ? 'Полная симуляция' : 'Тестовая симуляция'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Error State */}
            {hasError && (
              <div className="w-full h-[600px] bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-2">
                    Ошибка загрузки симуляции
                  </h3>
                  <p className="text-red-700 dark:text-red-300 mb-4">
                    Не удалось загрузить симуляцию. Попробуйте один из вариантов ниже.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleReset} size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Попробовать снова
                    </Button>
                    <Button onClick={handleOpenInNewTab} variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Открыть в новой вкладке
                    </Button>
                    <Button onClick={handleOpenFullPage} variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Полноэкранный режим
                    </Button>
                    <Button onClick={() => setUseFallback(true)} variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Простая симуляция
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {!isLoaded && !hasError && (
              <div className="w-full h-[600px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    Загрузка симуляции...
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Пожалуйста, подождите, пока загружается интерактивная симуляция
                  </p>
                  <div className="flex flex-col gap-3 items-center">
                    <Button onClick={() => window.location.href = '/pendulum-lab_en.html'} size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      <Play className="h-5 w-5 mr-2" />
                      Открыть симуляцию сейчас
                    </Button>
                    <div className="flex gap-2">
                      <Button onClick={handleOpenInNewTab} variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        В новой вкладке
                      </Button>
                      <Button onClick={() => setUseFallback(true)} variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Простая версия
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Simulation Iframe */}
            {isLoaded && !hasError && !useFallback && (
              <div className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                <iframe
                  ref={iframeRef}
                  src={useTestSimulation ? "/test-simulation.html" : "/pendulum-lab_en.html"}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                  title="Pendulum Lab Simulation"
                />
              </div>
            )}

            {/* Fallback Simple Simulation */}
            {useFallback && (
              <div className="w-full h-[600px] rounded-lg border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    {/* Simple pendulum visualization */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-slate-600 rounded-full"></div>
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-slate-400 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Простая симуляция маятника
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Это упрощенная версия симуляции. Для полного функционала откройте в новой вкладке.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => setUseFallback(false)} size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Попробовать снова
                    </Button>
                    <Button onClick={handleOpenInNewTab} variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Полная симуляция
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Controls Panel */}
            {showControls && (
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">
                  Управление симуляцией
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h5 className="font-medium text-slate-700 dark:text-slate-300">Основные функции</h5>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                      <li>• Перетаскивайте маятник мышью</li>
                      <li>• Используйте кнопки управления</li>
                      <li>• Настраивайте параметры</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-slate-700 dark:text-slate-300">Измерения</h5>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                      <li>• Время и период</li>
                      <li>• Угол и скорость</li>
                      <li>• Энергия системы</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-slate-700 dark:text-slate-300">Настройки</h5>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                      <li>• Длина маятника</li>
                      <li>• Масса и гравитация</li>
                      <li>• Затухание</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Information Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            О симуляции
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
                Что изучаем
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>• Гармонические колебания</li>
                <li>• Период и частота маятника</li>
                <li>• Зависимость периода от длины</li>
                <li>• Энергетические преобразования</li>
                <li>• Затухающие колебания</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
                Возможности симуляции
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>• Интерактивное управление</li>
                <li>• Реальное время измерений</li>
                <li>• Графики и диаграммы</li>
                <li>• Настройка параметров</li>
                <li>• Многоязычная поддержка</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teacher Mode Controls */}
      {isTeacherMode && (
        <Card>
          <CardHeader>
            <CardTitle>Режим преподавателя</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Используйте эту симуляцию для демонстрации принципов гармонических колебаний в классе.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium text-slate-700 dark:text-slate-300">
                    Демонстрационные сценарии
                  </h5>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <li>• Покажите зависимость периода от длины</li>
                    <li>• Демонстрируйте затухающие колебания</li>
                    <li>• Изучите влияние массы на движение</li>
                    <li>• Сравните разные углы отклонения</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-slate-700 dark:text-slate-300">
                    Интерактивные элементы
                  </h5>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <li>• Измерения в реальном времени</li>
                    <li>• Графики энергии и движения</li>
                    <li>• Настройка параметров среды</li>
                    <li>• Сравнение с теорией</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Button */}
      {onComplete && (
        <div className="flex justify-end">
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Завершить симуляцию
          </Button>
        </div>
      )}
    </div>
  );
};

export default PendulumSimulation;
