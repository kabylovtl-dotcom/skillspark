import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useHomeworkStore } from '@/store/homeworkStore';
import { useAuthStore } from '@/store/authStore';
import { Homework, SubmissionAnswer } from '@/types';
import { CheckCircle, Clock, Send } from 'lucide-react';
import SimulationViewer from './SimulationViewer';

interface HomeworkPlayerProps {
  homework: Homework;
  onClose: () => void;
}

const HomeworkPlayer: React.FC<HomeworkPlayerProps> = ({ homework, onClose }) => {
  const { submitHomework } = useHomeworkStore();
  const { user } = useAuthStore();

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [simulationParams, setSimulationParams] = useState<any>(null);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      const submissionAnswers: SubmissionAnswer[] = homework.payload.questions.map((question: any) => ({
        questionId: question.id,
        answer: answers[question.id] || ''
      }));

      await submitHomework(homework.id, {
        homeworkId: homework.id,
        studentId: user.id,
        answers: submissionAnswers
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting homework:', error);
      alert('Ошибка при отправке задания');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOverdue = new Date(homework.dueDate) < new Date();
  const timeLeft = new Date(homework.dueDate).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div
          className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Задание отправлено!
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Ваше решение отправлено на проверку. Результаты будут доступны после оценки учителем.
          </p>
          <Button onClick={onClose} className="w-full">
            Закрыть
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">{homework.title}</CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  {isOverdue ? (
                    <span className="text-red-600">Просрочено</span>
                  ) : (
                    <span>Осталось {daysLeft} дн.</span>
                  )}
                </div>
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full">
                  {homework.type.toUpperCase()}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          </CardHeader>
          <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Описание</h4>
                <p className="text-slate-600 dark:text-slate-400">{homework.description}</p>
              </div>

              {/* Interactive Simulation */}
              {homework.type === 'interactive' && (
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-4">Интерактивная симуляция</h4>
                  <SimulationViewer 
                    params={simulationParams} 
                    className="h-64"
                  />
                  <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Настройте параметры симуляции и запишите результаты:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Период колебаний (с)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          onChange={(e) => setSimulationParams(prev => ({ 
                            ...prev, 
                            period: parseFloat(e.target.value) || 0 
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Частота (Гц)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          onChange={(e) => setSimulationParams(prev => ({ 
                            ...prev, 
                            frequency: parseFloat(e.target.value) || 0 
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Coding Task */}
              {homework.type === 'coding' && (
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-4">Задача программирования</h4>
                  <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg mb-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {homework.payload.problem || 'Решите задачу программирования'}
                    </p>
                  </div>
                  <div>
                    <Label>Ваш код</Label>
                    <Textarea
                      value={answers['code'] || ''}
                      onChange={(e) => handleAnswerChange('code', e.target.value)}
                      placeholder="Введите ваш код здесь..."
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Questions */}
              {homework.payload.questions?.map((question: any, index: number) => (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-slate-200">
                        Вопрос {index + 1}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        {question.question}
                      </p>
                      <div className="text-xs text-slate-500 mt-1">
                        {question.points} баллов
                      </div>
                    </div>

                    {/* MCQ Questions */}
                    {homework.type === 'mcq' && (
                      <RadioGroup
                        value={answers[question.id]?.toString() || ''}
                        onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                      >
                        {question.options.map((option: string, optionIndex: number) => (
                            <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-${optionIndex}`} />
                            <Label htmlFor={`${question.id}-${optionIndex}`} className="text-sm">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {/* Input Questions */}
                    {homework.type === 'input' && (
                      <div>
                        <Label htmlFor={`answer-${question.id}`}>
                          Ваш ответ {question.type === 'number' ? '(число)' : ''}
                        </Label>
                        <Input
                          id={`answer-${question.id}`}
                          type={question.type === 'number' ? 'number' : 'text'}
                          step={question.type === 'number' ? '0.01' : undefined}
                          value={answers[question.id] || ''}
                          onChange={(e) => handleAnswerChange(question.id, 
                            question.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                          )}
                          placeholder="Введите ответ..."
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
          <div className="p-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(answers).length === 0}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isSubmitting ? (
                  'Отправка...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Отправить
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeworkPlayer;
