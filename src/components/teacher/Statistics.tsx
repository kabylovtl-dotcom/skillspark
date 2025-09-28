import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store/appStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';

const Statistics: React.FC = () => {
  const { students, lessons } = useAppStore();

  // Данные для графиков
  const studentProgressData = students.map(student => ({
    name: student.name.split(' ')[0], // Только имя
    progress: student.progress,
    score: student.averageScore
  }));

  const subjectDistribution = lessons.reduce((acc, lesson) => {
    acc[lesson.subject] = (acc[lesson.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const subjectData = Object.entries(subjectDistribution).map(([subject, count]) => ({
    subject,
    count,
    percentage: Math.round((count / lessons.length) * 100)
  }));

  const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  const averageProgress = Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length);
  const averageScore = Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length);

  return (
    <div className="space-y-6">
      <div
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          Статистика класса
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Анализ успеваемости и прогресса студентов
        </p>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Всего студентов</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{students.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Средний прогресс</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{averageProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Средний балл</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Всего уроков</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{lessons.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Прогресс студентов */}
        <div
        >
          <Card>
            <CardHeader>
              <CardTitle>Прогресс студентов</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#8B5CF6" name="Прогресс %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Распределение по предметам */}
        <div
        >
          <Card>
            <CardHeader>
              <CardTitle>Распределение уроков по предметам</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ subject, percentage }) => `${subject} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Детальная таблица */}
      <div
      >
        <Card>
          <CardHeader>
            <CardTitle>Детальная статистика студентов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Студент</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Прогресс</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Средний балл</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Последняя активность</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-200">{student.name}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          student.averageScore >= 90 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : student.averageScore >= 70
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {student.averageScore}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {student.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
