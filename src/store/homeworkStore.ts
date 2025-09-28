import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Homework, Submission } from '@/types';
import { useSocketStore } from './socketStore';

interface HomeworkStore {
  homeworks: Homework[];
  submissions: Submission[];
  publishHomework: (homework: Omit<Homework, 'id' | 'createdAt' | 'isPublished'>) => Promise<void>;
  submitHomework: (homeworkId: string, submission: Omit<Submission, 'id' | 'submittedAt' | 'isGraded'>) => Promise<void>;
  gradeSubmission: (homeworkId: string, submissionId: string, score: number, feedback: string) => Promise<void>;
  getSubmissionsForHomework: (homeworkId: string) => Submission[];
  onHomeworkPublished: (homework: Homework) => void;
  onSubmissionReceived: (submission: Submission) => void;
  onSubmissionGraded: (data: { homeworkId: string; submissionId: string; score: number; feedback: string }) => void;
}

export const useHomeworkStore = create<HomeworkStore>()(
  persist(
    (set, get) => ({
      homeworks: [],
      submissions: [],

      publishHomework: async (homeworkData) => {
        try {
          const { emit } = useSocketStore.getState();
          const { currentClass } = useClassStore.getState();
          
          if (!currentClass) {
            throw new Error('No class selected');
          }

          const homework: Homework = {
            ...homeworkData,
            id: 'hw-' + Date.now(),
            createdAt: new Date().toISOString(),
            isPublished: true
          };

          if (emit) {
            emit('new_homework', {
              teacherId: homework.teacherId,
              classCode: currentClass.classCode,
              homework
            });
          }

          // Add to local store
          const { homeworks } = get();
          set({ homeworks: [...homeworks, homework] });
        } catch (error) {
          console.error('Error publishing homework:', error);
          throw error;
        }
      },

      submitHomework: async (homeworkId, submissionData) => {
        try {
          const { emit } = useSocketStore.getState();
          
          // Get current user
          const authData = localStorage.getItem('deltayurt-auth');
          if (!authData) {
            throw new Error('No user logged in');
          }

          const { user } = JSON.parse(authData);
          if (!user) {
            throw new Error('No user data');
          }

          const submission: Submission = {
            ...submissionData,
            id: 'sub-' + Date.now(),
            submittedAt: new Date().toISOString(),
            isGraded: false
          };

          if (emit) {
            emit('submit_homework', {
              studentId: user.id,
              homeworkId,
              submission
            });
          }

          // Add to local store
          const { submissions } = get();
          set({ submissions: [...submissions, submission] });
        } catch (error) {
          console.error('Error submitting homework:', error);
          throw error;
        }
      },

      gradeSubmission: async (homeworkId, submissionId, score, feedback) => {
        try {
          const { emit } = useSocketStore.getState();
          
          // Get current user (teacher)
          const authData = localStorage.getItem('deltayurt-auth');
          if (!authData) {
            throw new Error('No user logged in');
          }

          const { user } = JSON.parse(authData);
          if (!user || user.role !== 'teacher') {
            throw new Error('Only teachers can grade submissions');
          }

          if (emit) {
            emit('grade_submission', {
              teacherId: user.id,
              homeworkId,
              submissionId,
              score,
              feedback
            });
          }

          // Update local store
          const { submissions } = get();
          const updatedSubmissions = submissions.map(sub => 
            sub.id === submissionId 
              ? { ...sub, score, feedback, gradedBy: user.id, gradedAt: new Date().toISOString(), isGraded: true }
              : sub
          );
          set({ submissions: updatedSubmissions });
        } catch (error) {
          console.error('Error grading submission:', error);
          throw error;
        }
      },

      getSubmissionsForHomework: (homeworkId: string) => {
        const { submissions } = get();
        return submissions.filter(sub => sub.homeworkId === homeworkId);
      },

      onHomeworkPublished: (homework: Homework) => {
        const { homeworks } = get();
        const exists = homeworks.find(h => h.id === homework.id);
        if (!exists) {
          set({ homeworks: [...homeworks, homework] });
        }
      },

      onSubmissionReceived: (submission: Submission) => {
        const { submissions } = get();
        const exists = submissions.find(s => s.id === submission.id);
        if (!exists) {
          set({ submissions: [...submissions, submission] });
        }
      },

      onSubmissionGraded: (data: { homeworkId: string; submissionId: string; score: number; feedback: string }) => {
        const { submissions } = get();
        const updatedSubmissions = submissions.map(sub => 
          sub.id === data.submissionId 
            ? { ...sub, score: data.score, feedback: data.feedback, isGraded: true }
            : sub
        );
        set({ submissions: updatedSubmissions });
      }
    }),
    {
      name: 'deltayurt-homework',
      partialize: (state) => ({ 
        homeworks: state.homeworks,
        submissions: state.submissions
      })
    }
  )
);

// Import useClassStore here to avoid circular dependency
import { useClassStore } from './classStore';
