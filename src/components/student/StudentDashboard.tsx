import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { BookOpen, Play, ClipboardList, TrendingUp, Clock, Award, Video, Zap } from 'lucide-react';
import Leaderboard from './Leaderboard';
import AnimatedText from '@/components/ui/AnimatedText';

const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { lessons, assignments, simulations } = useAppStore();

  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const completedSimulations = simulations.filter(sim => sim.isCompleted).length;
  const submittedAssignments = assignments.filter(assignment => assignment.isSubmitted).length;
  
  const totalProgress = Math.round(
    (completedLessons + completedSimulations + submittedAssignments) / 
    (lessons.length + simulations.length + assignments.length) * 100
  );

  const stats = [
    {
      titleKey: 'myLessons',
      value: `${completedLessons}/${lessons.length}`,
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      descriptionKey: 'completedLessons'
    },
    {
      titleKey: 'simulations',
      value: `${completedSimulations}/${simulations.length}`,
      icon: Play,
      color: 'from-purple-600 to-purple-700',
      descriptionKey: 'passedSimulations'
    },
    {
      titleKey: 'homework',
      value: `${submittedAssignments}/${assignments.length}`,
      icon: ClipboardList,
      color: 'from-purple-700 to-purple-800',
      descriptionKey: 'submittedAssignments'
    },
    {
      titleKey: 'overallProgress',
      value: `${totalProgress}%`,
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      descriptionKey: 'yourProgress'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      titleKey: 'completedLesson',
      titleValue: 'mechanicsBasics',
      timeKey: 'hoursAgo',
      timeValue: '2',
      type: 'lesson',
      icon: BookOpen
    },
    {
      id: '2',
      titleKey: 'submittedHomework',
      titleValue: 'physicsHomework',
      timeKey: 'daysAgo',
      timeValue: '1',
      type: 'assignment',
      icon: ClipboardList
    },
    {
      id: '3',
      titleKey: 'passedSimulation',
      titleValue: 'ohmsLaw',
      timeKey: 'daysAgo',
      timeValue: '2',
      type: 'simulation',
      icon: Play
    }
  ];

  return (
    <div className="space-y-6">
      <div className="px-2 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          <AnimatedText translationKey="welcome" />, {user?.name}! 👋
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
          <AnimatedText translationKey="continueStudying" />
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                        <AnimatedText translationKey={stat.titleKey} />
                      </p>
                      <p className="text-lg md:text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 hidden md:block">
                        <AnimatedText translationKey={stat.descriptionKey} />
                      </p>
                    </div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Последние активности и быстрые действия */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Последние активности */}
        <div
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <AnimatedText translationKey="lastActivity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          <AnimatedText translationKey={activity.titleKey} /> "<AnimatedText translationKey={activity.titleValue} />"
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {activity.timeValue} <AnimatedText translationKey={activity.timeKey} />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Быстрые действия */}
        <div
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                <AnimatedText translationKey="quickActions" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full p-5 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl text-left hover:shadow-md transition-shadow min-h-[60px] md:min-h-auto">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-base md:text-sm"><AnimatedText translationKey="continueLessons" /></p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 hidden md:block"><AnimatedText translationKey="studyNewTopics" /></p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-5 md:p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl text-left hover:shadow-md transition-shadow min-h-[60px] md:min-h-auto">
                  <div className="flex items-center gap-3">
                    <Play className="h-6 w-6 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-base md:text-sm"><AnimatedText translationKey="runSimulation" /></p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 hidden md:block"><AnimatedText translationKey="interactiveExperiments" /></p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-5 md:p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl text-left hover:shadow-md transition-shadow min-h-[60px] md:min-h-auto">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-6 w-6 md:h-5 md:w-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-base md:text-sm"><AnimatedText translationKey="checkAssignments" /></p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 hidden md:block"><AnimatedText translationKey="homework" /></p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    console.log('Opening pendulum lab...');
                    window.open('/pendulum-lab_en.html', '_blank');
                  }}
                  className="w-full p-5 md:p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl text-left hover:shadow-md transition-shadow min-h-[60px] md:min-h-auto"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 md:h-5 md:w-5 text-orange-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-base md:text-sm">Pendulum Lab</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 hidden md:block">Interactive physics simulation</p>
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Leaderboard */}
      <div
      >
        <Leaderboard />
      </div>

      {/* Live Classroom Button */}
      <div
      >
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2"><AnimatedText translationKey="joinLiveClass" /></h3>
                <p className="text-purple-100 text-sm md:text-base">
                  <AnimatedText translationKey="continueStudying" />
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/classroom'}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center gap-2 w-full md:w-auto justify-center md:justify-start min-h-[48px]"
              >
                <Video className="h-5 w-5" />
                <AnimatedText translationKey="joinClass" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
