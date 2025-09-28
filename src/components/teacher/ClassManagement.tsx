import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useClassStore } from '@/store/classStore';
import { useAppStore } from '@/store/appStore';
import { 
  Plus, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  Copy, 
  Share2, 
  Edit, 
  Trash2, 
  Eye,
  GraduationCap,
  Clock,
  TrendingUp,
  UserPlus,
  FileText,
  BarChart3
} from 'lucide-react';

const ClassManagement: React.FC = () => {
  const { classes, currentClass, createClass, switchClass, onClassCreated } = useClassStore();
  const { students, lessons, assignments } = useAppStore();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassDescription, setNewClassDescription] = useState('');
  const [newClassSubject, setNewClassSubject] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const subjects = ['Физика', 'Математика', 'Химия', 'Биология', 'Информатика', 'Английский язык', 'История', 'Литература'];
  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  useEffect(() => {
    // Mock some classes for demonstration
    if (classes.length === 0) {
      const mockClasses = [
        {
          id: 'class-1',
          name: 'Физика 10А',
          classCode: 'PHY10A2024',
          teacherId: 'teacher-1',
          students: [],
          createdAt: new Date().toISOString(),
          subject: 'Физика',
          grade: '10',
          description: 'Углубленное изучение физики для 10 класса'
        },
        {
          id: 'class-2',
          name: 'Математика 9Б',
          classCode: 'MATH9B2024',
          teacherId: 'teacher-1',
          students: [],
          createdAt: new Date().toISOString(),
          subject: 'Математика',
          grade: '9',
          description: 'Алгебра и геометрия для 9 класса'
        }
      ];
      mockClasses.forEach(cls => onClassCreated(cls));
    }
  }, [classes.length, onClassCreated]);

  const handleCreateClass = async () => {
    if (!newClassName.trim()) return;
    
    setIsCreating(true);
    try {
      const classData = await createClass(newClassName);
      if (classData) {
        // Update with additional data
        const updatedClass = {
          ...classData,
          subject: newClassSubject,
          grade: newClassGrade,
          description: newClassDescription,
          classCode: `CLS${Date.now().toString().slice(-6).toUpperCase()}`
        };
        onClassCreated(updatedClass);
        
        // Reset form
        setNewClassName('');
        setNewClassDescription('');
        setNewClassSubject('');
        setNewClassGrade('');
        setIsCreateDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating class:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyClassCode = (classCode: string) => {
    navigator.clipboard.writeText(classCode);
    // You could add a toast notification here
  };

  const getClassStats = (classId: string) => {
    const classStudents = students.filter(s => s.classId === classId);
    const classLessons = lessons.filter(l => l.classId === classId);
    const classAssignments = assignments.filter(a => a.classId === classId);
    
    return {
      studentCount: classStudents.length,
      lessonCount: classLessons.length,
      assignmentCount: classAssignments.length,
      averageScore: classStudents.length > 0 
        ? Math.round(classStudents.reduce((acc, s) => acc + s.averageScore, 0) / classStudents.length)
        : 0
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            Мои классы
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Управляйте своими классами и создавайте новые
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Создать класс
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Создать новый класс</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="class-name">Название класса</Label>
                <Input
                  id="class-name"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Например: Физика 10А"
                />
              </div>
              
              <div>
                <Label htmlFor="class-subject">Предмет</Label>
                <select
                  id="class-subject"
                  value={newClassSubject}
                  onChange={(e) => setNewClassSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
                >
                  <option value="">Выберите предмет</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="class-grade">Класс</Label>
                <select
                  id="class-grade"
                  value={newClassGrade}
                  onChange={(e) => setNewClassGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
                >
                  <option value="">Выберите класс</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade} класс</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="class-description">Описание (необязательно)</Label>
                <Textarea
                  id="class-description"
                  value={newClassDescription}
                  onChange={(e) => setNewClassDescription(e.target.value)}
                  placeholder="Краткое описание класса..."
                  rows={3}
                />
              </div>
              
              <Button 
                onClick={handleCreateClass} 
                disabled={!newClassName.trim() || isCreating}
                className="w-full"
              >
                {isCreating ? 'Создание...' : 'Создать класс'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes Grid */}
      {classes.length === 0 ? (
        <div
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
            У вас пока нет классов
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Создайте свой первый класс, чтобы начать преподавать
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Создать класс
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem, index) => {
            const stats = getClassStats(classItem.id);
            const isActive = currentClass?.id === classItem.id;
            
            return (
              <div
                key={classItem.id}
              >
                <Card className={`hover:shadow-lg transition-all duration-300 ${
                  isActive ? 'ring-2 ring-purple-200 dark:ring-purple-800' : ''
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-purple-600" />
                          {classItem.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{classItem.subject}</Badge>
                          <Badge variant="outline">{classItem.grade} класс</Badge>
                        </div>
                        {classItem.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {classItem.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyClassCode(classItem.classCode)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Class Code */}
                    <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Код класса</p>
                          <p className="font-mono text-sm font-medium">{classItem.classCode}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyClassCode(classItem.classCode)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Копировать
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto mb-1">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                          {stats.studentCount}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Студентов</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full mx-auto mb-1">
                          <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                          {stats.lessonCount}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Уроков</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => switchClass(classItem.id)}
                        className="flex-1"
                        variant={isActive ? "default" : "outline"}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {isActive ? 'Активный' : 'Открыть'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyClassCode(classItem.classCode)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Stats */}
      {classes.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {classes.length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Всего классов</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {students.length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Всего студентов</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {lessons.length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Всего уроков</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {students.length > 0 ? Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length) : 0}%
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Средняя успеваемость</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
