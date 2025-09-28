import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store/appStore';
import AnimatedText from '@/components/ui/AnimatedText';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BookOpen, Play, ClipboardList, Award, Target } from 'lucide-react';

const StudentProgress: React.FC = () => {
  const { lessons, simulations, assignments } = useAppStore();

  // Расчет статистики
  const completedLessons = (lessons || []).filter(lesson => lesson.isCompleted).length;
  const completedSimulations = (simulations || []).filter(sim => sim.isCompleted).length;
  const submittedAssignments = (assignments || []).filter(assignment => assignment.isSubmitted).length;
  
  const totalProgress = Math.round(
    (completedLessons + completedSimulations + submittedAssignments) / 
    Math.max((lessons || []).length + (simulations || []).length + (assignments || []).length, 1) * 100
  );

  const gradedAssignments = (assignments || []).filter(a => a.grade);
  const averageGrade = gradedAssignments.length > 0 
    ? Math.round(gradedAssignments.reduce((acc, a) => acc + (a.grade || 0), 0) / gradedAssignments.length)
    : 0;

  // Данные для графиков
  const subjectProgress = [
    { subject: 'Физика', completed: 8, total: 12, percentage: 67 },
    { subject: 'Математика', completed: 6, total: 10, percentage: 60 },
    { subject: 'Химия', completed: 4, total: 8, percentage: 50 },
    { subject: 'Биология', completed: 3, total: 6, percentage: 50 }
  ];

  const weeklyProgress = [
    { week: 'Неделя 1', lessons: 3, simulations: 2, assignments: 1 },
    { week: 'Неделя 2', lessons: 4, simulations: 3, assignments: 2 },
    { week: 'Неделя 3', lessons: 2, simulations: 1, assignments: 1 },
    { week: 'Неделя 4', lessons: 5, simulations: 4, assignments: 3 }
  ];

  const activityDistribution = [
    { name: 'Уроки', value: completedLessons, color: '#8B5CF6' },
    { name: 'Симуляции', value: completedSimulations, color: '#06B6D4' },
    { name: 'Задания', value: submittedAssignments, color: '#10B981' }
  ];

  const stats = [
    {
      title: 'Общий прогресс',
      value: `${totalProgress}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      description: 'Ваш общий прогресс'
    },
    {
      title: 'Завершено уроков',
      value: `${completedLessons}/${lessons.length}`,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      description: 'Изученные темы'
    },
    {
      title: 'Пройдено симуляций',
      value: `${completedSimulations}/${simulations.length}`,
      icon: Play,
      color: 'from-green-500 to-green-600',
      description: 'Интерактивные эксперименты'
    },
    {
      title: 'Сдано заданий',
      value: `${submittedAssignments}/${assignments.length}`,
      icon: ClipboardList,
      color: 'from-orange-500 to-orange-600',
      description: 'Выполненные задания'
    },
    {
      title: 'Средняя оценка',
      value: `${Math.round(averageGrade)}%`,
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Ваша успеваемость'
    }
  ];

  return (
    <div className="space-y-6">
      <div
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          <AnimatedText translationKey="myProgress" />
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          <AnimatedText translationKey="trackYourLearningProgress" />
        </p>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Прогресс по предметам */}
        <div
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Прогресс по предметам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#8B5CF6" name="Прогресс %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Распределение активности */}
        <div
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Распределение активности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={activityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {activityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 137.5}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Еженедельный прогресс */}
      <div
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Еженедельный прогресс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="lessons" stroke="#8B5CF6" name="Уроки" />
                <Line type="monotone" dataKey="simulations" stroke="#06B6D4" name="Симуляции" />
                <Line type="monotone" dataKey="assignments" stroke="#10B981" name="Задания" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Детальная таблица прогресса */}
      <div
      >
        <Card>
          <CardHeader>
            <CardTitle>Детальный прогресс по предметам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">
                      {subject.subject}
                    </h4>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {subject.completed}/{subject.total} заданий
                    </span>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>0%</span>
                    <span className="font-medium">{subject.percentage}%</span>
                    <span>100%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProgress;
