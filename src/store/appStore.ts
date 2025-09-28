import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  averageScore: number;
  progress: number;
  lastActive: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // в минутах
  progress?: number; // для студентов
  isCompleted?: boolean;
  createdAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  isSubmitted: boolean;
  submittedAt?: string;
  grade?: number;
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
  completedAt?: string;
}

interface AppState {
  // Учительские данные
  students: Student[];
  lessons: Lesson[];
  
  // Студенческие данные
  assignments: Assignment[];
  simulations: Simulation[];
  
  // Действия
  addStudent: (student: Omit<Student, 'id' | 'averageScore' | 'progress' | 'lastActive'>) => void;
  removeStudent: (id: string) => void;
  addLesson: (lesson: Omit<Lesson, 'id' | 'createdAt'>) => void;
  updateStudentProgress: (studentId: string, progress: number, score: number) => void;
  
  // Студенческие действия
  completeLesson: (lessonId: string) => void;
  completeSimulation: (simulationId: string) => void;
  submitAssignment: (assignmentId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Mock данные
      students: [
        {
          id: '1',
          name: 'Айбек Токтогулов',
          email: 'aibek@example.com',
          averageScore: 85,
          progress: 78,
          lastActive: '2024-01-15'
        },
        {
          id: '2',
          name: 'Нургуль Асанова',
          email: 'nurgul@example.com',
          averageScore: 92,
          progress: 95,
          lastActive: '2024-01-14'
        },
        {
          id: '3',
          name: 'Эрлан Жумабаев',
          email: 'erlan@example.com',
          averageScore: 76,
          progress: 65,
          lastActive: '2024-01-13'
        }
      ],

      lessons: [
        {
          id: '1',
          title: 'Основы механики',
          description: 'Изучение законов Ньютона и движения тел',
          subject: 'Физика',
          difficulty: 'beginner',
          duration: 45,
          createdAt: '2024-01-10'
        },
        {
          id: '2',
          title: 'Электрические цепи',
          description: 'Закон Ома и основы электричества',
          subject: 'Физика',
          difficulty: 'intermediate',
          duration: 60,
          createdAt: '2024-01-12'
        },
        {
          id: '3',
          title: 'Квадратные уравнения',
          description: 'Решение квадратных уравнений и графики',
          subject: 'Математика',
          difficulty: 'intermediate',
          duration: 50,
          createdAt: '2024-01-14'
        }
      ],

      assignments: [
        {
          id: '1',
          title: 'Домашнее задание по механике',
          description: 'Решить задачи на законы Ньютона',
          subject: 'Физика',
          dueDate: '2024-01-20',
          isSubmitted: false
        },
        {
          id: '2',
          title: 'Лабораторная работа по электричеству',
          description: 'Провести эксперименты с электрическими цепями',
          subject: 'Физика',
          dueDate: '2024-01-18',
          isSubmitted: true,
          submittedAt: '2024-01-17',
          grade: 88
        }
      ],

      simulations: [
        {
          id: '1',
          title: 'Движение маятника',
          description: 'Интерактивная симуляция гармонических колебаний с настройкой параметров',
          subject: 'Физика',
          difficulty: 'beginner',
          isCompleted: false
        },
        {
          id: '2',
          title: 'Закон Ома',
          description: 'Эксперименты с электрическими цепями',
          subject: 'Физика',
          difficulty: 'intermediate',
          isCompleted: true,
          completedAt: '2024-01-15'
        },
        {
          id: '3',
          title: 'Законы Ньютона',
          description: 'Интерактивное изучение законов движения',
          subject: 'Физика',
          difficulty: 'intermediate',
          isCompleted: false
        }
      ],

      // Действия учителя
      addStudent: (studentData) => {
        const newStudent: Student = {
          ...studentData,
          id: Date.now().toString(),
          averageScore: 0,
          progress: 0,
          lastActive: new Date().toISOString().split('T')[0]
        };
        set((state) => ({ students: [...state.students, newStudent] }));
      },

      removeStudent: (id) => {
        set((state) => ({ students: state.students.filter(s => s.id !== id) }));
      },

      addLesson: (lessonData) => {
        const newLesson: Lesson = {
          ...lessonData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0]
        };
        set((state) => ({ lessons: [...state.lessons, newLesson] }));
      },

      updateStudentProgress: (studentId, progress, score) => {
        set((state) => ({
          students: state.students.map(s => 
            s.id === studentId 
              ? { ...s, progress, averageScore: score }
              : s
          )
        }));
      },

      // Действия студента
      completeLesson: (lessonId) => {
        set((state) => ({
          lessons: state.lessons.map(l => 
            l.id === lessonId 
              ? { ...l, isCompleted: true, progress: 100 }
              : l
          )
        }));
      },

      completeSimulation: (simulationId) => {
        set((state) => ({
          simulations: state.simulations.map(s => 
            s.id === simulationId 
              ? { ...s, isCompleted: true, completedAt: new Date().toISOString() }
              : s
          )
        }));
      },

      submitAssignment: (assignmentId) => {
        set((state) => ({
          assignments: state.assignments.map(a => 
            a.id === assignmentId 
              ? { ...a, isSubmitted: true, submittedAt: new Date().toISOString() }
              : a
          )
        }));
      }
    }),
    {
      name: 'deltayurt-app-data'
    }
  )
);
