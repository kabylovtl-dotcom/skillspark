# Настройка системы аутентификации

Система аутентификации для SkillSpark KG использует Firebase Authentication и поддерживает следующие способы входа:

## Поддерживаемые способы аутентификации

- ✅ **Email/Пароль** - классическая регистрация и вход
- ✅ **Google** - вход через Google аккаунт
- ✅ **Apple** - вход через Apple ID
- ✅ **Восстановление пароля** - сброс пароля через email

## Настройка Firebase

### 1. Создание проекта Firebase

1. Перейдите в [Firebase Console](https://console.firebase.google.com)
2. Нажмите "Создать проект"
3. Введите название проекта (например, "skillspark-kg")
4. Выберите регион (рекомендуется ближайший к вашим пользователям)
5. Отключите Google Analytics (если не нужен)

### 2. Настройка Authentication

1. В левом меню выберите "Authentication"
2. Нажмите "Начать"
3. Перейдите на вкладку "Sign-in method"
4. Включите следующие провайдеры:

#### Email/Password
- Нажмите на "Email/Password"
- Включите "Email/Password" и "Email link (passwordless sign-in)"
- Сохраните изменения

#### Google
- Нажмите на "Google"
- Включите провайдер
- Добавьте email поддержки проекта
- Сохраните изменения

#### Apple
- Нажмите на "Apple"
- Включите провайдер
- Настройте Apple Developer Account (если нужно)
- Добавьте Service ID и Key ID
- Сохраните изменения

### 3. Получение конфигурации

1. В левом меню выберите "Project settings" (шестеренка)
2. Прокрутите вниз до "Ваши приложения"
3. Нажмите "Web" (</>) для создания веб-приложения
4. Введите название приложения (например, "skillspark-kg-web")
5. Скопируйте конфигурацию Firebase

### 4. Настройка переменных окружения

1. Скопируйте файл `env.example` в `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Заполните переменные в `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 5. Настройка доменов для продакшена

1. В Firebase Console перейдите в Authentication > Settings
2. В разделе "Authorized domains" добавьте ваши домены:
   - `your-domain.com`
   - `www.your-domain.com`
   - `your-app.vercel.app` (если используете Vercel)

## Разработка с Firebase Emulator (опционально)

Для локальной разработки можно использовать Firebase Emulator:

### 1. Установка Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Инициализация проекта
```bash
firebase init emulators
```

### 3. Запуск эмулятора
```bash
firebase emulators:start --only auth
```

### 4. Настройка для разработки
Эмулятор автоматически подключается в режиме разработки (когда `NODE_ENV=development`).

## Использование

### Компоненты аутентификации

```tsx
import { AuthButton } from '@/components/auth/AuthButton';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

// Кнопка входа/регистрации
<AuthButton />

// Защищенный маршрут
<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>

// Использование в компонентах
const { user, signIn, signOut } = useAuth();
```

### Доступные методы

```tsx
const {
  user,           // Текущий пользователь или null
  loading,        // Состояние загрузки
  signUp,         // Регистрация (email, password, displayName?)
  signIn,         // Вход (email, password)
  signOut,        // Выход
  resetPassword,  // Сброс пароля (email)
  signInWithGoogle, // Вход через Google
  signInWithApple,  // Вход через Apple
} = useAuth();
```

## Маршруты

- `/login` - Страница входа
- `/profile` - Профиль пользователя (защищенный)

## Безопасность

- Все формы валидируются с помощью Zod
- Пароли скрыты по умолчанию с возможностью показа
- Обработка ошибок с понятными сообщениями на русском языке
- Автоматическое перенаправление после входа
- Защищенные маршруты с проверкой аутентификации

## Развертывание

1. Убедитесь, что все переменные окружения настроены в вашем хостинге
2. Добавьте домены в Firebase Console
3. Настройте правила безопасности Firebase (если используете Firestore)

## Поддержка

При возникновении проблем проверьте:
1. Правильность конфигурации Firebase
2. Наличие всех переменных окружения
3. Настройки доменов в Firebase Console
4. Консоль браузера на наличие ошибок
