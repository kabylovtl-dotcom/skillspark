import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { useClassStore } from '@/store/classStore';
import { Users, BookOpen, TrendingUp, Clock, Video, Zap, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import DemoButtons from '@/components/demo/DemoButtons';
import ClassSelector from './ClassSelector';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { students, lessons } = useAppStore();
  const { classes, currentClass } = useClassStore();

  // State for slide and hide functionality
  const [quickActionsSlidOut, setQuickActionsSlidOut] = useState(false);
  const [quickActionsHidden, setQuickActionsHidden] = useState(false);

  const stats = [
    {
      title: 'Студентов в классе',
      value: students.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+2 за месяц'
    },
    {
      title: 'Всего уроков',
      value: lessons.length,
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      change: '+3 на этой неделе'
    },
    {
      title: 'Средняя успеваемость',
      value: `${Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+5% за месяц'
    },
    {
      title: 'Активных студентов',
      value: students.filter(s => s.progress > 0).length,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      change: 'Сегодня'
    }
  ];

  return (
    <div className="space-y-6">
      <div
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Добро пожаловать, {user?.name}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Вот обзор вашего класса и активности
        </p>
      </div>

      {/* Статистика класса - Redesigned */}
      <div className="relative">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Статистика класса</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Обзор активности и успеваемости</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="group">
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {stat.value}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                        {stat.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Последние активности */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Последние студенты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.slice(0, 3).map((student) => (
                  <div key={student.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {student.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Прогресс: {student.progress}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {student.averageScore}%
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Средний балл
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Последние уроки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.slice(0, 3).map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {lesson.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {lesson.subject} • {lesson.duration} мин
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lesson.difficulty === 'beginner' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : lesson.difficulty === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {lesson.difficulty === 'beginner' ? 'Начальный' : 
                         lesson.difficulty === 'intermediate' ? 'Средний' : 'Продвинутый'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Live Classroom Button */}
      <div
      >
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Живая классная комната</h3>
                <p className="text-purple-100">
                  Начните интерактивный урок с симуляциями и заданиями в реальном времени
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/classroom'}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center gap-2"
              >
                <Video className="h-5 w-5" />
                Открыть классную комнату
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="relative">
        {/* Control Panel */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            Быстрые действия
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setQuickActionsSlidOut(!quickActionsSlidOut)}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title={quickActionsSlidOut ? "Показать быстрые действия" : "Скрыть быстрые действия"}
            >
              {quickActionsSlidOut ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setQuickActionsHidden(!quickActionsHidden)}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title={quickActionsHidden ? "Показать быстрые действия" : "Скрыть быстрые действия"}
            >
              {quickActionsHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Quick Actions Content */}
        <div className={`transition-all duration-500 ease-in-out ${
          quickActionsSlidOut ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        } ${quickActionsHidden ? 'hidden' : 'block'}`}>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    console.log('Opening pendulum lab...');
                    window.open('/pendulum-lab_en.html', '_blank');
                  }}
                  className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">Pendulum Lab</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Интерактивная симуляция маятника</p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => window.location.href = '/classroom'}
                  className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">Классная комната</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Живые уроки и презентации</p>
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Class Management */}
      <div
      >
        <ClassSelector />
      </div>

      {/* Demo Buttons */}
      <div
      >
        <DemoButtons />
      </div>
    </div>
  );
};

export default TeacherDashboard;
