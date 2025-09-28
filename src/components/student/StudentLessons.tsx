import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store/appStore';
import AnimatedText from '@/components/ui/AnimatedText';
import { useTranslation } from 'react-i18next';
import { BookOpen, Clock, Play, CheckCircle, Search, Filter } from 'lucide-react';

const StudentLessons: React.FC = () => {
  const { lessons, completeLesson } = useAppStore();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const subjects = ['all', ...Array.from(new Set(lessons.map(lesson => lesson.subject)))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || lesson.subject === filterSubject;
    const matchesDifficulty = filterDifficulty === 'all' || lesson.difficulty === filterDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleCompleteLesson = (lessonId: string) => {
    completeLesson(lessonId);
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
        return 'beginner';
      case 'intermediate':
        return 'intermediate';
      case 'advanced':
        return 'advanced';
      default:
        return difficulty;
    }
  };

  return (
    <div className="space-y-6">
      <div
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          <AnimatedText translationKey="myLessons" />
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          <AnimatedText translationKey="studyNewTopicsAndTrackProgress" />
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
              placeholder={t('searchLessons')}
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
                  {subject === 'all' ? t('allSubjects') : subject}
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
                  {difficulty === 'all' ? t('allLevels') : t(getDifficultyLabel(difficulty))}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Список уроков */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson, index) => (
          <div
          >
            <Card className={`hover:shadow-lg transition-all duration-300 ${
              lesson.isCompleted ? 'ring-2 ring-green-200 dark:ring-green-800' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      lesson.isCompleted 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}>
                      {lesson.isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {lesson.subject}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                    <AnimatedText translationKey={getDifficultyLabel(lesson.difficulty)} />
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                  {lesson.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lesson.duration} мин
                    </div>
                    <div>
                      {lesson.isCompleted ? <AnimatedText translationKey="completed" /> : <AnimatedText translationKey="inProgress" />}
                    </div>
                  </div>
                  
                  {lesson.isCompleted ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium"><AnimatedText translationKey="lessonCompleted" /></span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span><AnimatedText translationKey="progress" /></span>
                        <span>{lesson.progress || 0}%</span>
                      </div>
                      <Progress value={lesson.progress || 0} className="h-2" />
                      <Button 
                        onClick={() => handleCompleteLesson(lesson.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        size="sm"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {lesson.progress ? <AnimatedText translationKey="continue" /> : <AnimatedText translationKey="startLesson" />}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
            {searchTerm || filterSubject !== 'all' || filterDifficulty !== 'all' 
              ? <AnimatedText translationKey="lessonsNotFound" />
              : <AnimatedText translationKey="noAvailableLessons" />
            }
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {searchTerm || filterSubject !== 'all' || filterDifficulty !== 'all'
              ? <AnimatedText translationKey="tryChangingSearchFilters" />
              : <AnimatedText translationKey="contactTeacherForAccess" />
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentLessons;
