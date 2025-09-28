import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StudentDashboard from './StudentDashboard';
import StudentLessons from './StudentLessons';
import StudentSimulations from './StudentSimulations';
import StudentAssignments from './StudentAssignments';
import StudentProgress from './StudentProgress';
import CalendarPage from '../../pages/CalendarPage';
import ProfilePage from '../../pages/ProfilePage';
import { BookOpen, Play, ClipboardList, TrendingUp, Home, Settings, Calendar, User } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';

const StudentInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { t } = useTranslation();

  const menuItems = [
    { id: 'dashboard', labelKey: 'navigation.mainPage', icon: Home },
    { id: 'lessons', labelKey: 'navigation.myLessons', icon: BookOpen },
    { id: 'simulations', labelKey: 'navigation.simulations', icon: Play },
    { id: 'assignments', labelKey: 'navigation.homework', icon: ClipboardList },
    { id: 'calendar', labelKey: 'navigation.calendar', icon: Calendar },
    { id: 'progress', labelKey: 'navigation.progress', icon: TrendingUp },
    { id: 'profile', labelKey: 'navigation.profile', icon: User },
    { id: 'settings', labelKey: 'navigation.settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'lessons':
        return <StudentLessons />;
      case 'simulations':
        return <StudentSimulations />;
      case 'assignments':
        return <StudentAssignments />;
      case 'calendar':
        return <CalendarPage />;
      case 'profile':
        return <ProfilePage />;
      case 'progress':
        return <StudentProgress />;
      case 'settings':
        return <div className="text-center py-8">
          <AnimatedText translationKey="settingsTemporarilyUnavailable" />
        </div>;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Мобильное меню */}
      <div className="lg:hidden">
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-3 sm:p-4">
          <h2 className="text-base sm:text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 sm:mb-4">
            <AnimatedText translationKey="studentPanel" />
          </h2>
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300'
                  }`}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">
                    <AnimatedText translationKey={item.labelKey} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Десктопное меню */}
      <div className="hidden lg:block">
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
              <AnimatedText translationKey="studentPanel" />
            </h2>
            <div className="flex space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <AnimatedText translationKey={item.labelKey} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

            {/* Основной контент */}
            <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        <div
          key={activeTab}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentInterface;
