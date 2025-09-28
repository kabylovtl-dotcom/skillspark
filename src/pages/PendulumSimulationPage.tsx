import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, ExternalLink } from 'lucide-react';

const PendulumSimulationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleOpenInNewTab = () => {
    window.open('/pendulum-lab_en.html', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Назад
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Лаборатория маятника
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  PhET Interactive Simulation
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Обновить
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Открыть в новой вкладке
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading && (
          <div
            className="flex items-center justify-center h-96"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                Загрузка симуляции...
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Пожалуйста, подождите, пока загружается интерактивная симуляция
              </p>
            </div>
          </div>
        )}

        {hasError && (
          <div
            className="flex items-center justify-center h-96"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                Ошибка загрузки
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Не удалось загрузить симуляцию. Попробуйте обновить страницу.
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Попробовать снова
                </Button>
                <Button variant="outline" onClick={handleOpenInNewTab}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Открыть в новой вкладке
                </Button>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !hasError && (
          <div
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <iframe
              src="/pendulum-lab_en.html"
              width="100%"
              height="800"
              frameBorder="0"
              allowFullScreen
              className="w-full"
              title="Pendulum Lab Simulation"
              onLoad={() => setIsLoading(false)}
              onError={() => setHasError(true)}
            />
          </div>
        )}

        {/* Instructions */}
        <div
          className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-3">
            Как использовать симуляцию
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <h4 className="font-medium mb-2">Основные функции:</h4>
              <ul className="space-y-1">
                <li>• Перетаскивайте маятник мышью для изменения угла</li>
                <li>• Используйте кнопки Play/Pause для управления</li>
                <li>• Настраивайте длину, массу и гравитацию</li>
                <li>• Включайте/выключайте затухание</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Измерения:</h4>
              <ul className="space-y-1">
                <li>• Время и период колебаний</li>
                <li>• Угол отклонения и скорость</li>
                <li>• Кинетическая и потенциальная энергия</li>
                <li>• Графики движения в реальном времени</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendulumSimulationPage;
