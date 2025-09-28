import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';
import { useClassStore } from '@/store/classStore';
import ClassroomRoom from '@/components/classroom/ClassroomRoom';

const ClassroomRoomPage: React.FC = () => {
  const { user } = useAuthStore();
  const { connect } = useSocketStore();
  const { currentClass, joinClass } = useClassStore();

  useEffect(() => {
    // Connect to socket when component mounts
    connect();

    // If user is a student and has a classCode, try to join the class
    if (user?.role === 'student' && user.classCode && !currentClass) {
      joinClass(user.classCode);
    }
  }, [user, connect, joinClass, currentClass]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Необходима авторизация
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Пожалуйста, войдите в систему
          </p>
        </div>
      </div>
    );
  }

  if (user.role === 'student' && !currentClass) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Класс не найден
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Обратитесь к учителю за кодом класса
          </p>
        </div>
      </div>
    );
  }

  return <ClassroomRoom />;
};

export default ClassroomRoomPage;
