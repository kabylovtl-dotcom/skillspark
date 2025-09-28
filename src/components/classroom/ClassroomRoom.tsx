import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import { useSocketStore } from '@/store/socketStore';
import { 
  Users, 
  Play, 
  Square, 
  MessageSquare, 
  HelpCircle, 
  Wifi, 
  WifiOff,
  BookOpen,
  Send
} from 'lucide-react';
import SimulationViewer from './SimulationViewer';
import SimulationControlPanel from './SimulationControlPanel';
import HomeworkEditor from './HomeworkEditor';
import HomeworkPlayer from './HomeworkPlayer';
import ChatBox from './ChatBox';

interface ActivityMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  user?: string;
}

const ClassroomRoom: React.FC = () => {
  const { user } = useAuthStore();
  const { currentClass, students, homeworks } = useClassStore();
  const { socket, emit, on, off } = useSocketStore();
  
  const [isLive, setIsLive] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [simulationParams, setSimulationParams] = useState<any>(null);
  const [isPresenting, setIsPresenting] = useState(false);
  const [activities, setActivities] = useState<ActivityMessage[]>([]);
  const [helpMessage, setHelpMessage] = useState('');
  const [showHomeworkEditor, setShowHomeworkEditor] = useState(false);
  const [raisedHands, setRaisedHands] = useState<string[]>([]);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleLessonStarted = (data: { lesson: any; class: any }) => {
      setIsLive(true);
      setCurrentLesson(data.lesson);
      addActivity('info', `Урок "${data.lesson.title}" начался`);
    };

    const handleSimulationUpdate = (data: { simId: string; simParams: any; byTeacherId: string }) => {
      setSimulationParams(data.simParams);
      addActivity('info', `Параметры симуляции обновлены`);
    };

    const handlePresentationStopped = () => {
      setIsPresenting(false);
      setSimulationParams(null);
      addActivity('info', 'Презентация остановлена');
    };

    const handleNewStudent = (data: { student: any }) => {
      addActivity('success', `${data.student.name} присоединился к классу`);
    };

    const handleHomeworkPublished = (data: { homework: any }) => {
      addActivity('info', `Новое задание: "${data.homework.title}"`);
    };

    const handleHomeworkSubmitted = (data: { homeworkId: string; submission: any }) => {
      const student = students.find(s => s.id === data.submission.studentId);
      addActivity('success', `${student?.name || 'Студент'} сдал задание`);
    };

    const handleHelpRequested = (data: { student: any; message: string; classCode: string }) => {
      addActivity('warning', `Помощь от ${data.student.name}: ${data.message}`);
    };

    const handleRaiseHand = (data: { studentId: string; classCode: string }) => {
      if (data.classCode === currentClass?.classCode) {
        setRaisedHands(prev => [...prev.filter(id => id !== data.studentId), data.studentId]);
        addActivity('info', 'Студент поднял руку');
      }
    };

    const handleLowerHand = (data: { studentId: string; classCode: string }) => {
      if (data.classCode === currentClass?.classCode) {
        setRaisedHands(prev => prev.filter(id => id !== data.studentId));
      }
    };

    // Register event listeners
    on('lesson_started', handleLessonStarted);
    on('presentation_simulation_update', handleSimulationUpdate);
    on('presentation_stopped', handlePresentationStopped);
    on('new_student_joined', handleNewStudent);
    on('homework_published', handleHomeworkPublished);
    on('homework_submitted', handleHomeworkSubmitted);
    on('help_requested', handleHelpRequested);
    on('raise_hand', handleRaiseHand);
    on('lower_hand', handleLowerHand);

    return () => {
      off('lesson_started', handleLessonStarted);
      off('presentation_simulation_update', handleSimulationUpdate);
      off('presentation_stopped', handlePresentationStopped);
      off('new_student_joined', handleNewStudent);
      off('homework_published', handleHomeworkPublished);
      off('homework_submitted', handleHomeworkSubmitted);
      off('help_requested', handleHelpRequested);
      off('raise_hand', handleRaiseHand);
      off('lower_hand', handleLowerHand);
    };
  }, [socket, students, on, off]);

  const addActivity = (type: ActivityMessage['type'], message: string, user?: string) => {
    const activity: ActivityMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      user
    };
    setActivities(prev => [activity, ...prev].slice(0, 50)); // Keep last 50 activities
  };

  const startLesson = (lessonId: string) => {
    if (!currentClass) return;
    
    emit('teacher_start_lesson', {
      teacherId: user?.id || '',
      classCode: currentClass.classCode,
      lessonId
    });
  };

  const stopPresentation = () => {
    if (!currentClass) return;
    
    emit('teacher_stop_presentation', {
      teacherId: user?.id || '',
      classCode: currentClass.classCode
    });
  };

  const requestHelp = () => {
    if (!currentClass || !helpMessage.trim()) return;
    
    emit('request_help', {
      studentId: user?.id || '',
      classCode: currentClass.classCode,
      message: helpMessage
    });
    
    setHelpMessage('');
    addActivity('info', `Запрос помощи отправлен: ${helpMessage}`);
  };

  const giveFloor = (studentId: string) => {
    emit('teacher_give_floor', { studentId });
    setRaisedHands(prev => prev.filter(id => id !== studentId));
    addActivity('info', 'Слово предоставлено студенту');
  };

  const isTeacher = user?.role === 'teacher';
  const onlineStudents = students.filter(s => s.isOnline);

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Left Sidebar - Students List */}
      <div className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {currentClass?.name || 'Класс'}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            {socket?.connected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {onlineStudents.length} из {students.length} онлайн
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {student.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {student.name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {student.isOnline ? 'Онлайн' : 'Офлайн'}
                  </p>
                </div>
                {isTeacher && (
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Help Request (Students only) */}
        {!isTeacher && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Запросить помощь..."
                value={helpMessage}
                onChange={(e) => setHelpMessage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
              />
              <Button 
                onClick={requestHelp} 
                disabled={!helpMessage.trim()}
                className="w-full"
                size="sm"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Отправить
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                {isLive ? 'Живой урок' : 'Классная комната'}
              </h1>
              {currentLesson && (
                <p className="text-slate-600 dark:text-slate-400">
                  {currentLesson.title}
                </p>
              )}
            </div>
            
            {isTeacher && (
              <div className="flex gap-2">
                {!isLive ? (
                  <Button
                    onClick={() => startLesson('l-1')}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Начать урок
                  </Button>
                ) : (
                  <Button
                    onClick={stopPresentation}
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Остановить
                  </Button>
                )}
                
                <Button
                  onClick={() => setShowHomeworkEditor(true)}
                  variant="outline"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Задание
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Simulation Area */}
          <div className="flex-1 p-6">
            {isLive ? (
              <div className="h-full">
                {isTeacher ? (
                  <div className="space-y-4">
                    <SimulationControlPanel
                      onParamsChange={(params) => {
                        setSimulationParams(params);
                        emit('teacher_present_simulation', {
                          teacherId: user?.id || '',
                          classCode: currentClass?.classCode || '',
                          simId: 'sim-pendulum-1',
                          simParams: params
                        });
                      }}
                    />
                    <SimulationViewer params={simulationParams} />
                  </div>
                ) : (
                  <SimulationViewer params={simulationParams} />
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Урок не начат
                  </h3>
                  <p className="text-slate-500 dark:text-slate-500">
                    {isTeacher 
                      ? 'Нажмите "Начать урок" чтобы начать презентацию'
                      : 'Ожидайте начала урока от учителя'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Chat */}
          <div className="w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700">
            <ChatBox
              classCode={currentClass?.classCode || ''}
              isTeacher={isTeacher}
              raisedHands={raisedHands}
              onGiveFloor={giveFloor}
            />
          </div>
        </div>
      </div>

      {/* Homework Editor Modal */}
      {showHomeworkEditor && isTeacher && (
        <HomeworkEditor
          onClose={() => setShowHomeworkEditor(false)}
          onPublish={() => {
            setShowHomeworkEditor(false);
            addActivity('info', 'Задание опубликовано');
          }}
        />
      )}
    </div>
  );
};

export default ClassroomRoom;
