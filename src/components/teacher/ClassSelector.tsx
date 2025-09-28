import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useClassStore } from '@/store/classStore';
import { useAuthStore } from '@/store/authStore';
import { Plus, Users, Copy, Check, Calendar, BookOpen } from 'lucide-react';

const ClassSelector: React.FC = () => {
  const { classes, currentClass, createClass, switchClass } = useClassStore();
  const { user } = useAuthStore();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [copiedClassCode, setCopiedClassCode] = useState<string | null>(null);

  const handleCreateClass = async () => {
    if (!newClassName.trim()) return;
    
    setIsCreating(true);
    try {
      const newClass = await createClass(newClassName.trim());
      if (newClass) {
        setNewClassName('');
        setShowCreateDialog(false);
      }
    } catch (error) {
      console.error('Error creating class:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const copyClassCode = (classCode: string) => {
    navigator.clipboard.writeText(classCode);
    setCopiedClassCode(classCode);
    setTimeout(() => setCopiedClassCode(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (user?.role !== 'teacher') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Мои классы
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Управляйте своими классами и создавайте новые
          </p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Создать класс
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Создать новый класс</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="className">Название класса</Label>
                <Input
                  id="className"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Например: Физика 10А"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateClass()}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleCreateClass}
                  disabled={!newClassName.trim() || isCreating}
                >
                  {isCreating ? 'Создание...' : 'Создать'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {classes.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-300 dark:border-slate-600">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              У вас пока нет классов
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
              Создайте свой первый класс, чтобы начать преподавать
            </p>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Создать первый класс
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className={`cursor-pointer transition-all duration-200 ${
                currentClass?.id === classItem.id
                  ? 'ring-2 ring-purple-500 ring-opacity-50'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => switchClass(classItem.id)}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
                        {classItem.name}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Создан {formatDate(classItem.createdAt)}
                      </p>
                    </div>
                    {currentClass?.id === classItem.id && (
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Активный
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Class Code */}
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                          Код класса
                        </p>
                        <p className="font-mono text-sm font-medium text-slate-800 dark:text-slate-200">
                          {classItem.classCode}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyClassCode(classItem.classCode);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        {copiedClassCode === classItem.classCode ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-1">
                        <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Студентов
                      </p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {classItem.students?.length || 0}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-1">
                        <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Уроков
                      </p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        0
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        switchClass(classItem.id);
                      }}
                    >
                      {currentClass?.id === classItem.id ? 'Активный' : 'Выбрать'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyClassCode(classItem.classCode);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassSelector;
