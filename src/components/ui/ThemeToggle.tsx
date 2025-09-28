import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedText from '@/components/ui/AnimatedText';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();
  const { t } = useTranslation();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'light' },
    { value: 'dark' as const, icon: Moon, label: 'dark' },
    { value: 'system' as const, icon: Monitor, label: 'system' },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="flex items-center gap-1 sm:gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 px-2 sm:px-3"
      title={t(`theme.${currentTheme.label}`)}
    >
      <CurrentIcon className="h-3 w-3 sm:h-4 sm:w-4" />
      <span className="hidden sm:inline text-xs sm:text-sm">
        <AnimatedText translationKey={`theme.${currentTheme.label}`} />
      </span>
    </Button>
  );
};

export default ThemeToggle;
