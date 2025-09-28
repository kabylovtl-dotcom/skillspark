import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar';
import TeacherDashboard from './TeacherDashboard';
import ClassManagement from './ClassManagement';
import StudentsManagement from './StudentsManagement';
import LessonsManagement from './LessonsManagement';
import Statistics from './Statistics';
import Materials from './Materials';
import CalendarPage from '../../pages/CalendarPage';
import ProfilePage from '../../pages/ProfilePage';
import ResourcesPage from '../../pages/ResourcesPage';

const TeacherInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TeacherDashboard />;
      case 'classes':
        return <ClassManagement />;
      case 'students':
        return <StudentsManagement />;
      case 'lessons':
        return <LessonsManagement />;
      case 'statistics':
        return <Statistics />;
      case 'materials':
        return <Materials />;
      case 'resources':
        return <ResourcesPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <div className="text-center py-8">Настройки временно недоступны</div>;
      default:
        return <TeacherDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Боковое меню */}
      <TeacherSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Основной контент */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div
            key={activeTab}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherInterface;
