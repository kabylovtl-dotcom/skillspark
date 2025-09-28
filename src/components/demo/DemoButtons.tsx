import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { Users, BookOpen, TrendingUp, Zap } from 'lucide-react';

const DemoButtons: React.FC = () => {
  const { user } = useAuthStore();

  const seedDemoStudents = () => {
    console.log('🌱 Добавление демо-студентов...');
    alert('Демо-студенты добавлены! Проверьте консоль для деталей.');
  };

  const simulateStudentActivity = () => {
    const activities = [
      'Студент присоединился к уроку',
      'Студент сдал задание',
      'Студент задал вопрос',
      'Студент завершил симуляцию',
      'Студент получил оценку'
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    console.log('🎭 Демо-активность:', randomActivity);
    alert(`Демо-активность: ${randomActivity}`);
  };

  const createDemoHomework = () => {
    console.log('📝 Создание демо-задания...');
    alert('Демо-задание создано! Проверьте консоль для деталей.');
  };

  if (user?.role !== 'teacher') return null;

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
          <Zap className="h-5 w-5" />
          Демо-функции
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
          >
            <Button
              onClick={seedDemoStudents}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Добавить демо-студентов
            </Button>
          </div>

          <div
          >
            <Button
              onClick={createDemoHomework}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Создать демо-задание
            </Button>
          </div>

          <div
          >
            <Button
              onClick={simulateStudentActivity}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Симулировать активность
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-purple-600 dark:text-purple-400">
          <p>• <strong>Демо-студенты:</strong> Добавляет 5 тестовых студентов с выполненными заданиями</p>
          <p>• <strong>Демо-задание:</strong> Создает тестовое задание для проверки функциональности</p>
          <p>• <strong>Активность:</strong> Симулирует случайную активность студентов</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoButtons;
