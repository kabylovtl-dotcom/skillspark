import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  UserPlus,
  BookOpen, 
  BarChart3, 
  FileText, 
  Settings,
  GraduationCap,
  Calendar,
  User,
  FolderOpen
} from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface TeacherSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', labelKey: 'dashboard', icon: GraduationCap },
  { id: 'classes', labelKey: 'myClasses', icon: Users },
  { id: 'students', labelKey: 'myClass', icon: UserPlus },
  { id: 'lessons', labelKey: 'lessons', icon: BookOpen },
  { id: 'calendar', labelKey: 'calendar', icon: Calendar },
  { id: 'statistics', labelKey: 'statistics', icon: BarChart3 },
  { id: 'materials', labelKey: 'materials', icon: FileText },
  { id: 'resources', labelKey: 'resources', icon: FolderOpen },
  { id: 'profile', labelKey: 'profile', icon: User },
  { id: 'settings', labelKey: 'settings', icon: Settings },
];

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  return (
    <aside className="w-56 lg:w-64 bg-white dark:bg-slate-800 border-r border-purple-200 dark:border-purple-800 h-full">
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-base lg:text-lg font-semibold text-purple-800 dark:text-purple-200">
            <AnimatedText translationKey="teacherPanel" />
          </h2>
          <ThemeToggle />
        </div>
        
        <nav className="space-y-1 lg:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-left transition-all duration-200 text-sm lg:text-base",
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300"
                )}
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="font-medium">
                  <AnimatedText translationKey={item.labelKey} />
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
