import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AuthForm from '@/components/auth/AuthForm';
import Header from '@/components/layout/Header';
import TeacherInterface from '@/components/teacher/TeacherInterface';
import StudentInterface from '@/components/student/StudentInterface';
import ClassroomRoomPage from '@/pages/ClassroomRoom';
import './i18n'; // Initialize i18n

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { connect } = useSocketStore();

  useEffect(() => {
    // Connect to socket when app starts
    connect();
  }, [connect]);

  // Show auth form for unauthenticated users
  if (!isAuthenticated || !user) {
    return (
      <ThemeProvider>
        <AuthForm />
      </ThemeProvider>
    );
  }

  // Check if we're in classroom mode (this would be determined by URL or state)
  const isInClassroom = window.location.pathname === '/classroom';

  if (isInClassroom) {
    return (
      <ThemeProvider>
        <ClassroomRoomPage />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        {user.role === 'teacher' ? <TeacherInterface /> : <StudentInterface />}
      </div>
    </ThemeProvider>
  );
}

export default App;