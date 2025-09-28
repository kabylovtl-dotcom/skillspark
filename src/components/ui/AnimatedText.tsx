import React from 'react';
import { useTranslation } from 'react-i18next';

interface AnimatedTextProps {
  translationKey: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ translationKey, className = '', delay = 0 }: AnimatedTextProps) {
  const { t } = useTranslation();

  return (
    <span
      className={`transition-opacity duration-300 ease-in-out ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animation: 'fadeInUp 0.6s ease-in-out forwards'
      }}
    >
      {t(translationKey)}
    </span>
  );
}