import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import { useSocketStore } from '@/store/socketStore';
import AnimatedText from '@/components/ui/AnimatedText';
import { Plus, Calendar as CalendarIcon, Clock, BookOpen, AlertCircle } from 'lucide-react';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'lesson' | 'homework' | 'exam' | 'meeting';
  description?: string;
  classId?: string;
  homeworkId?: string;
  lessonId?: string;
}

const CalendarPage: React.FC = () => {
  const { user } = useAuthStore();
  const { currentClass, homeworks } = useClassStore();
  const { emit } = useSocketStore();
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'lesson' as CalendarEvent['type'],
    description: '',
    start: new Date(),
    end: new Date(Date.now() + 60 * 60 * 1000) // 1 hour later
  });

  const isTeacher = user?.role === 'teacher';

  // Load events from server/localStorage
  useEffect(() => {
    loadEvents();
  }, [currentClass]);

  // Listen for calendar events
  useEffect(() => {
    const handleCalendarEvent = (data: any) => {
      if (data.classId === currentClass?.id) {
        const event: CalendarEvent = {
          id: data.id,
          title: data.title,
          start: new Date(data.start),
          end: new Date(data.end),
          type: data.type,
          description: data.description,
          classId: data.classId
        };
        setEvents(prev => [...prev.filter(e => e.id !== event.id), event]);
      }
    };

    const socket = useSocketStore.getState().socket;
    if (socket) {
      socket.on('calendar_event_created', handleCalendarEvent);
      socket.on('calendar_event_updated', handleCalendarEvent);
      socket.on('calendar_event_deleted', (data: any) => {
        setEvents(prev => prev.filter(e => e.id !== data.eventId));
      });
    }

    return () => {
      if (socket) {
        socket.off('calendar_event_created', handleCalendarEvent);
        socket.off('calendar_event_updated', handleCalendarEvent);
        socket.off('calendar_event_deleted', handleCalendarEvent);
      }
    };
  }, [currentClass]);

  const loadEvents = () => {
    // Load from localStorage
    const savedEvents = localStorage.getItem(`calendar_events_${currentClass?.id}`);
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      setEvents(parsedEvents);
    }

    // Add homework deadlines
    const homeworkEvents: CalendarEvent[] = homeworks.map(hw => ({
      id: `homework-${hw.id}`,
      title: `Дедлайн: ${hw.title}`,
      start: new Date(hw.dueDate),
      end: new Date(new Date(hw.dueDate).getTime() + 60 * 60 * 1000),
      type: 'homework',
      description: hw.description,
      classId: currentClass?.id,
      homeworkId: hw.id
    }));

    setEvents(prev => [
      ...prev.filter(e => !e.homeworkId), // Remove old homework events
      ...homeworkEvents
    ]);
  };

  const saveEvents = (eventsToSave: CalendarEvent[]) => {
    localStorage.setItem(`calendar_events_${currentClass?.id}`, JSON.stringify(eventsToSave));
  };

  const createEvent = () => {
    if (!newEvent.title.trim() || !currentClass) return;

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      type: newEvent.type,
      description: newEvent.description,
      classId: currentClass.id
    };

    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);

    // Emit to server
    emit('calendar_event_created', event);

    // Reset form
    setNewEvent({
      title: '',
      type: 'lesson',
      description: '',
      start: new Date(),
      end: new Date(Date.now() + 60 * 60 * 1000)
    });
    setShowEventDialog(false);
    setIsCreating(false);
  };

  const deleteEvent = (eventId: string) => {
    const updatedEvents = events.filter(e => e.id !== eventId);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);

    // Emit to server
    emit('calendar_event_deleted', { eventId, classId: currentClass?.id });
  };

  const getEventStyle = (event: CalendarEvent) => {
    const baseStyle = {
      borderRadius: '4px',
      border: 'none',
      color: 'white',
      padding: '2px 6px',
      fontSize: '12px'
    };

    switch (event.type) {
      case 'lesson':
        return { ...baseStyle, backgroundColor: '#8b5cf6' };
      case 'homework':
        return { ...baseStyle, backgroundColor: '#f59e0b' };
      case 'exam':
        return { ...baseStyle, backgroundColor: '#ef4444' };
      case 'meeting':
        return { ...baseStyle, backgroundColor: '#10b981' };
      default:
        return { ...baseStyle, backgroundColor: '#6b7280' };
    }
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="h-4 w-4" />;
      case 'homework':
        return <AlertCircle className="h-4 w-4" />;
      case 'exam':
        return <AlertCircle className="h-4 w-4" />;
      case 'meeting':
        return <Clock className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const eventPropGetter = (event: CalendarEvent) => ({
    style: getEventStyle(event)
  });

  const EventComponent = ({ event }: { event: CalendarEvent }) => (
    <div className="flex items-center gap-1">
      {getEventIcon(event.type)}
      <span className="truncate">{event.title}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                <AnimatedText translationKey="calendar" />
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                {currentClass?.name || 'Выберите класс'}
              </p>
            </div>
            
            {isTeacher && (
              <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Создать событие
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Создать событие</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Название</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Название события"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="type">Тип</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value: CalendarEvent['type']) => 
                          setNewEvent(prev => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lesson">Урок</SelectItem>
                          <SelectItem value="homework">Домашнее задание</SelectItem>
                          <SelectItem value="exam">Экзамен</SelectItem>
                          <SelectItem value="meeting">Встреча</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start">Начало</Label>
                        <Input
                          id="start"
                          type="datetime-local"
                          value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                          onChange={(e) => setNewEvent(prev => ({ 
                            ...prev, 
                            start: new Date(e.target.value) 
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end">Конец</Label>
                        <Input
                          id="end"
                          type="datetime-local"
                          value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                          onChange={(e) => setNewEvent(prev => ({ 
                            ...prev, 
                            end: new Date(e.target.value) 
                          }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Описание события"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowEventDialog(false)}
                      >
                        Отмена
                      </Button>
                      <Button onClick={createEvent}>
                        Создать
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Уроки</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Домашние задания</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Экзамены</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Встречи</span>
            </div>
          </div>
        </div>

        <div
        >
          <Card>
            <CardContent className="p-0">
              <div className="h-[600px]">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  eventPropGetter={eventPropGetter}
                  components={{
                    event: EventComponent
                  }}
                  onSelectEvent={(event) => setSelectedEvent(event)}
                  views={['month', 'week', 'day']}
                  defaultView="month"
                  messages={{
                    next: 'Следующий',
                    previous: 'Предыдущий',
                    today: 'Сегодня',
                    month: 'Месяц',
                    week: 'Неделя',
                    day: 'День',
                    agenda: 'Повестка',
                    date: 'Дата',
                    time: 'Время',
                    event: 'Событие',
                    noEventsInRange: 'Нет событий в выбранном диапазоне'
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getEventIcon(selectedEvent.type)}
                  {selectedEvent.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Тип события</Label>
                  <Badge variant="outline" className="mt-1">
                    {selectedEvent.type === 'lesson' && 'Урок'}
                    {selectedEvent.type === 'homework' && 'Домашнее задание'}
                    {selectedEvent.type === 'exam' && 'Экзамен'}
                    {selectedEvent.type === 'meeting' && 'Встреча'}
                  </Badge>
                </div>
                
                <div>
                  <Label>Время</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {moment(selectedEvent.start).format('DD.MM.YYYY HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}
                  </p>
                </div>
                
                {selectedEvent.description && (
                  <div>
                    <Label>Описание</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}
                
                {isTeacher && (
                  <div className="flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        deleteEvent(selectedEvent.id);
                        setSelectedEvent(null);
                      }}
                    >
                      Удалить
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
