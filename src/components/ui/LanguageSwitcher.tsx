import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ky', name: 'Кыргызча', flag: '🇰🇬', nativeName: 'Кыргызча' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 px-2 sm:px-3"
      >
        <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-sm sm:text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline font-medium text-xs sm:text-sm">{currentLanguage.nativeName}</span>
        <ChevronDown className={`h-2 w-2 sm:h-3 sm:w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-fadeInUp"
        >
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors duration-200 ${
                  i18n.language === language.code
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{language.name}</div>
                </div>
                {i18n.language === language.code && (
                  <span
                    className="text-purple-600 dark:text-purple-400 font-bold"
                  >
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}