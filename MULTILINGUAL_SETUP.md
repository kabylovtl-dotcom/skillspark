# Multilingual Engine Setup

This React application now includes a comprehensive multilingual system using i18next and react-i18next with smooth animations powered by Framer Motion.

## Features

✅ **Three Languages Supported:**
- English (en) - Default
- Russian (ru) 
- Kyrgyz (ky)

✅ **Language Switcher:**
- Toggle UI that cycles through languages: EN → RU → KY → EN
- Shows current language code and flag
- Smooth animations when switching

✅ **Persistent Language Selection:**
- Language preference saved in localStorage
- Automatically applied on page reload

✅ **Smooth Animations:**
- Fade-in/fade-out transitions using Framer Motion
- Staggered animations for better UX
- Customizable animation delays

## File Structure

```
src/
├── locales/
│   ├── en/
│   │   └── translation.json
│   ├── ru/
│   │   └── translation.json
│   └── ky/
│       └── translation.json
├── components/
│   └── ui/
│       ├── LanguageSwitcher.tsx
│       ├── AnimatedText.tsx
│       └── LanguageDemo.tsx
├── i18n.ts
└── main.tsx
```

## Usage

### Basic Translation
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('welcome')}</h1>;
}
```

### Animated Text
```tsx
import AnimatedText from '@/components/ui/AnimatedText';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <AnimatedText delay={0.2}>
      <h1>{t('welcome')}</h1>
    </AnimatedText>
  );
}
```

### Language Switcher
```tsx
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

## Translation Keys

The translation files follow a nested structure:

```json
{
  "welcome": "Welcome",
  "hero": {
    "title": {
      "kg": "STEM Education for Kyrgyzstan"
    },
    "subtitle": "Revolutionary physics simulations...",
    "button": {
      "explore": "Explore Simulations",
      "lessons": "Online Lessons"
    }
  }
}
```

Access nested keys with dot notation:
```tsx
{t('hero.title.kg')}
{t('hero.button.explore')}
```

## Adding New Languages

1. Create a new folder in `src/locales/` (e.g., `fr/`)
2. Add `translation.json` with all required keys
3. Update `src/i18n.ts` to include the new language
4. Add the language to the `languages` array in `LanguageSwitcher.tsx`

## Adding New Translations

1. Add the key to all three translation files
2. Use the key in your components with `t('your.key')`
3. Wrap with `AnimatedText` for smooth transitions

## Dependencies

- `i18next`: Core internationalization framework
- `react-i18next`: React integration for i18next
- `framer-motion`: Animation library for smooth transitions

## Running the Application

```bash
npm install
npm run dev
```

The application will start with English as the default language, and users can switch between languages using the toggle in the header.
