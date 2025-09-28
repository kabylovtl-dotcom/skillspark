import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Class, User, Lesson, Homework } from '@/types';
import { useSocketStore } from './socketStore';

interface ClassStore {
  currentClass: Class | null;
  classes: Class[]; // All classes for teacher
  students: User[];
  lessons: Lesson[];
  homeworks: Homework[];
  classCode: string | null;
  joinClass: (code: string) => Promise<boolean>;
  leaveClass: () => void;
  fetchClass: (code: string) => Promise<void>;
  createClass: (name: string) => Promise<Class | null>;
  switchClass: (classId: string) => void;
  onNewStudent: (student: User) => void;
  onHomeworkPublished: (homework: Homework) => void;
  onClassState: (data: { class: Class; students: User[]; lessons: Lesson[]; homeworks: Homework[] }) => void;
  onClassCreated: (classData: Class) => void;
}

export const useClassStore = create<ClassStore>()(
  persist(
    (set, get) => ({
      currentClass: null,
      classes: [],
      students: [],
      lessons: [],
      homeworks: [],
      classCode: null,

      joinClass: async (code: string) => {
        try {
          const { socket, emit } = useSocketStore.getState();
          
          if (!socket) {
            console.error('Socket not connected');
            return false;
          }

          // Get current user from auth store
          const authData = localStorage.getItem('deltayurt-auth');
          if (!authData) {
            console.error('No user logged in');
            return false;
          }

          const { user } = JSON.parse(authData);
          if (!user) {
            console.error('No user data');
            return false;
          }

          // Emit join_class event
          if (emit) {
            emit('join_class', { studentId: user.id, classCode: code });
          }

          // For now, just set class locally
          set({ 
            currentClass: { id: 'class-1', name: 'Физика 10А', classCode: code, teacherId: 't-1', students: [], createdAt: new Date().toISOString() }, 
            classCode: code 
          });
          return true;
        } catch (error) {
          console.error('Error joining class:', error);
          return false;
        }
      },

      leaveClass: () => {
        set({ 
          currentClass: null, 
          students: [], 
          lessons: [], 
          homeworks: [], 
          classCode: null 
        });
      },

      fetchClass: async (code: string) => {
        try {
          const response = await fetch(`http://localhost:3005/api/classes/${code}`);
          if (!response.ok) {
            throw new Error('Failed to fetch class');
          }
          
          const data = await response.json();
          set({
            currentClass: data.class,
            students: data.students,
            lessons: data.lessons,
            homeworks: data.homeworks,
            classCode: code
          });
        } catch (error) {
          console.error('Error fetching class:', error);
        }
      },

      onNewStudent: (student: User) => {
        const { students } = get();
        set({ students: [...students, student] });
      },

      onHomeworkPublished: (homework: Homework) => {
        const { homeworks } = get();
        set({ homeworks: [...homeworks, homework] });
      },

      onClassState: (data: { class: Class; students: User[]; lessons: Lesson[]; homeworks: Homework[] }) => {
        set({
          currentClass: data.class,
          students: data.students,
          lessons: data.lessons,
          homeworks: data.homeworks
        });
      },

      createClass: async (name: string) => {
        try {
          const { socket, emit } = useSocketStore.getState();
          
          if (!socket || !emit) {
            console.error('Socket not connected');
            return null;
          }

          // Get current user from auth store
          const authData = localStorage.getItem('deltayurt-auth');
          if (!authData) {
            console.error('No user logged in');
            return null;
          }

          const { user } = JSON.parse(authData);
          if (!user || user.role !== 'teacher') {
            console.error('Only teachers can create classes');
            return null;
          }

          // Emit create class event
          emit('teacher_create_class', { teacherId: user.id, name });
          
          // Return a temporary class object (will be updated by socket response)
          const tempClass: Class = {
            id: `temp-${Date.now()}`,
            name,
            classCode: 'GENERATING...',
            teacherId: user.id,
            students: [],
            createdAt: new Date().toISOString()
          };

          return tempClass;
        } catch (error) {
          console.error('Error creating class:', error);
          return null;
        }
      },

      switchClass: (classId: string) => {
        const { classes } = get();
        const classToSwitch = classes.find(c => c.id === classId);
        
        if (classToSwitch) {
          set({ 
            currentClass: classToSwitch,
            classCode: classToSwitch.classCode
          });
          
          // Fetch class data
          get().fetchClass(classToSwitch.classCode);
        }
      },

      onClassCreated: (classData: Class) => {
        const { classes } = get();
        set({ 
          classes: [...classes.filter(c => c.id !== classData.id), classData],
          currentClass: classData,
          classCode: classData.classCode
        });
      }
    }),
    {
      name: 'deltayurt-class',
      partialize: (state) => ({ 
        currentClass: state.currentClass, 
        classes: state.classes,
        classCode: state.classCode 
      })
    }
  )
);
