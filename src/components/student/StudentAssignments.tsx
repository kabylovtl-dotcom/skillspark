import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAppStore } from '@/store/appStore';
import AnimatedText from '@/components/ui/AnimatedText';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Upload, CheckCircle, Clock, Search, Filter, FileText, Calendar } from 'lucide-react';

const StudentAssignments: React.FC = () => {
  const { assignments, submitAssignment } = useAppStore();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState('');

  const subjects = ['all', ...Array.from(new Set(assignments.map(assignment => assignment.subject)))];
  const statuses = ['all', 'pending', 'submitted', 'graded'];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || assignment.subject === filterSubject;
    
    let matchesStatus = true;
    if (filterStatus === 'pending') matchesStatus = !assignment.isSubmitted;
    else if (filterStatus === 'submitted') matchesStatus = assignment.isSubmitted && !assignment.grade;
    else if (filterStatus === 'graded') matchesStatus = assignment.isSubmitted && assignment.grade;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleSubmitAssignment = (assignmentId: string) => {
    if (submissionText.trim()) {
      submitAssignment(assignmentId);
      setSubmissionText('');
      setSelectedAssignment(null);
    }
  };

  const getStatusColor = (assignment: any) => {
    if (assignment.grade) {
      return assignment.grade >= 80 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
        : assignment.grade >= 60
        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    }
    if (assignment.isSubmitted) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
    return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
  };

  const getStatusLabel = (assignment: any) => {
    if (assignment.grade) {
      return `Оценено: ${assignment.grade}%`;
    }
    if (assignment.isSubmitted) {
      return 'Сдано';
    }
    return 'В процессе';
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !assignments.find(a => a.dueDate === dueDate)?.isSubmitted;
  };

  return (
    <div className="space-y-6">
      <div
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          <AnimatedText translationKey="homework" />
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          <AnimatedText translationKey="completeAssignmentsAndTrackProgress" />
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
              placeholder={t('searchAssignments')}
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'Все статусы' : 
                   status === 'pending' ? 'В процессе' :
                   status === 'submitted' ? 'Сдано' : 'Оценено'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Список заданий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment, index) => (
          <div
          >
            <Card className={`hover:shadow-lg transition-all duration-300 ${
              isOverdue(assignment.dueDate) ? 'ring-2 ring-red-200 dark:ring-red-800' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      assignment.isSubmitted 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    }`}>
                      {assignment.isSubmitted ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <ClipboardList className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {assignment.subject}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment)}`}>
                    {getStatusLabel(assignment)}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                  {assignment.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Calendar className="h-4 w-4" />
                      Срок: {new Date(assignment.dueDate).toLocaleDateString('ru-RU')}
                    </div>
                    {isOverdue(assignment.dueDate) && (
                      <span className="text-red-500 text-xs font-medium">Просрочено</span>
                    )}
                  </div>
                  
                  {assignment.grade && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Оценка</span>
                        <span className={`text-lg font-bold ${
                          assignment.grade >= 80 ? 'text-green-600' :
                          assignment.grade >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {assignment.grade}%
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {!assignment.isSubmitted ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                          size="sm"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Сдать задание
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{assignment.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Описание задания</Label>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {assignment.description}
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="submission">Ваш ответ</Label>
                            <Textarea
                              id="submission"
                              value={submissionText}
                              onChange={(e) => setSubmissionText(e.target.value)}
                              placeholder="Введите ваш ответ..."
                              rows={6}
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              onClick={() => handleSubmitAssignment(assignment.id)}
                              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Сдать задание
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Задание сдано</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                        {assignment.submittedAt ? new Date(assignment.submittedAt).toLocaleDateString('ru-RU') : ''}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
            {searchTerm || filterSubject !== 'all' || filterStatus !== 'all' 
              ? 'Задания не найдены' 
              : 'Нет доступных заданий'
            }
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {searchTerm || filterSubject !== 'all' || filterStatus !== 'all'
              ? 'Попробуйте изменить фильтры поиска'
              : 'Обратитесь к учителю для получения заданий'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
