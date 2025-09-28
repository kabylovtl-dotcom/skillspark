import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHomeworkStore } from '@/store/homeworkStore';
import { useClassStore } from '@/store/classStore';
import { useAuthStore } from '@/store/authStore';
import { X, Plus, Trash2 } from 'lucide-react';

interface HomeworkEditorProps {
  onClose: () => void;
  onPublish: () => void;
}

const HomeworkEditor: React.FC<HomeworkEditorProps> = ({ onClose, onPublish }) => {
  const { publishHomework } = useHomeworkStore();
  const { currentClass } = useClassStore();
  const { user } = useAuthStore();

  const [homework, setHomework] = useState({
    title: '',
    description: '',
    type: 'mcq' as 'mcq' | 'input' | 'interactive' | 'coding',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    payload: {
      questions: [] as any[]
    }
  });

  const [isPublishing, setIsPublishing] = useState(false);

  const addQuestion = () => {
    if (homework.type === 'mcq') {
      setHomework(prev => ({
        ...prev,
        payload: {
          ...prev.payload,
          questions: [
            ...prev.payload.questions,
            {
              id: `q-${Date.now()}`,
              question: '',
              options: ['', '', '', ''],
              correctAnswer: 0,
              points: 25
            }
          ]
        }
      }));
    } else if (homework.type === 'input') {
      setHomework(prev => ({
        ...prev,
        payload: {
          ...prev.payload,
          questions: [
            ...prev.payload.questions,
            {
              id: `q-${Date.now()}`,
              question: '',
              type: 'number',
              answer: '',
              tolerance: 0.01,
              points: 25
            }
          ]
        }
      }));
    }
  };

  const updateQuestion = (questionId: string, field: string, value: any) => {
    setHomework(prev => ({
      ...prev,
      payload: {
        ...prev.payload,
        questions: prev.payload.questions.map(q =>
          q.id === questionId ? { ...q, [field]: value } : q
        )
      }
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setHomework(prev => ({
      ...prev,
      payload: {
        ...prev.payload,
        questions: prev.payload.questions.map(q =>
          q.id === questionId 
            ? { 
                ...q, 
                options: q.options.map((opt: string, idx: number) => 
                  idx === optionIndex ? value : opt
                )
              }
            : q
        )
      }
    }));
  };

  const removeQuestion = (questionId: string) => {
    setHomework(prev => ({
      ...prev,
      payload: {
        ...prev.payload,
        questions: prev.payload.questions.filter(q => q.id !== questionId)
      }
    }));
  };

  const handlePublish = async () => {
    if (!homework.title.trim() || !homework.description.trim()) {
      alert('Пожалуйста, заполните название и описание задания');
      return;
    }

    if (homework.payload.questions.length === 0) {
      alert('Пожалуйста, добавьте хотя бы один вопрос');
      return;
    }

    if (!currentClass || !user) {
      alert('Ошибка: класс или пользователь не найден');
      return;
    }

    setIsPublishing(true);

    try {
      await publishHomework({
        title: homework.title,
        description: homework.description,
        type: homework.type,
        payload: homework.payload,
        teacherId: user.id,
        classId: currentClass.id,
        dueDate: new Date(homework.dueDate).toISOString()
      });

      onPublish();
    } catch (error) {
      console.error('Error publishing homework:', error);
      alert('Ошибка при публикации задания');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Создать задание</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Название задания</Label>
                  <Input
                    id="title"
                    value={homework.title}
                    onChange={(e) => setHomework(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Введите название..."
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Срок сдачи</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={homework.dueDate}
                    onChange={(e) => setHomework(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={homework.description}
                  onChange={(e) => setHomework(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Опишите задание..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="type">Тип задания</Label>
                <Select
                  value={homework.type}
                  onValueChange={(value: any) => setHomework(prev => ({ 
                    ...prev, 
                    type: value,
                    payload: { questions: [] }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Тест с вариантами ответов</SelectItem>
                    <SelectItem value="input">Ввод ответа</SelectItem>
                    <SelectItem value="interactive">Интерактивная симуляция</SelectItem>
                    <SelectItem value="coding">Программирование</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Questions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Вопросы</Label>
                  <Button onClick={addQuestion} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить вопрос
                  </Button>
                </div>

                <div className="space-y-4">
                  {homework.payload.questions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium">Вопрос {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <Card>
                        <CardContent className="space-y-3">
                        <div>
                          <Label>Текст вопроса</Label>
                          <Textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                            placeholder="Введите вопрос..."
                            rows={2}
                          />
                        </div>

                        {homework.type === 'mcq' && (
                          <div>
                            <Label>Варианты ответов</Label>
                            <div className="space-y-2 mt-2">
                              {question.options.map((option: string, optionIndex: number) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    name={`correct-${question.id}`}
                                    checked={question.correctAnswer === optionIndex}
                                    onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                                    className="text-purple-600"
                                  />
                                  <Input
                                    value={option}
                                    onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                    placeholder={`Вариант ${optionIndex + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {homework.type === 'input' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Тип ответа</Label>
                              <Select
                                value={question.type}
                                onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="number">Число</SelectItem>
                                  <SelectItem value="text">Текст</SelectItem>
                                  <SelectItem value="math">Математическое выражение</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Правильный ответ</Label>
                              <Input
                                value={question.answer}
                                onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                                placeholder="Введите правильный ответ..."
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <Label>Баллы</Label>
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            value={question.points}
                            onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 25)}
                            className="w-20"
                          />
                        </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isPublishing || homework.payload.questions.length === 0}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isPublishing ? 'Публикация...' : 'Опубликовать'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeworkEditor;
