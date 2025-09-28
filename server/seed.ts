// DeltaYurt Seed Data - Test Data for Development

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'student';
  avatar?: string;
  classCode?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Class {
  id: string;
  name: string;
  classCode: string;
  teacherId: string;
  students: string[];
  createdAt: string;
  isLive?: boolean;
  currentLessonId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  teacherId: string;
  classId: string;
  createdAt: string;
  isLive?: boolean;
  simulationId?: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  type: 'mcq' | 'input' | 'interactive' | 'coding';
  payload: any;
  teacherId: string;
  classId: string;
  dueDate: string;
  createdAt: string;
  isPublished: boolean;
}

export function seedData(
  users: Record<string, User>,
  classes: Record<string, Class>,
  lessons: Record<string, Lesson>,
  homeworks: Record<string, Homework>
) {
  // Create teacher
  const teacher: User = {
    id: 't-1',
    email: 'teacher@deltayurt.test',
    name: 'Анна Петровна',
    role: 'teacher',
    avatar: 'https://ui-avatars.com/api/?name=Анна+Петровна&background=8B5CF6&color=fff',
    isOnline: false,
    lastSeen: new Date().toISOString()
  };
  users[teacher.id] = teacher;

  // Create students
  const student1: User = {
    id: 's-1',
    email: 'student1@deltayurt.test',
    name: 'Иван Иванов',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Иван+Иванов&background=8B5CF6&color=fff',
    classCode: 'DY-TEST1',
    isOnline: false,
    lastSeen: new Date().toISOString()
  };
  users[student1.id] = student1;

  const student2: User = {
    id: 's-2',
    email: 'student2@deltayurt.test',
    name: 'Мария Сидорова',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Мария+Сидорова&background=8B5CF6&color=fff',
    classCode: 'DY-TEST1',
    isOnline: false,
    lastSeen: new Date().toISOString()
  };
  users[student2.id] = student2;

  // Create class
  const testClass: Class = {
    id: 'class-1',
    name: 'Физика 10А',
    classCode: 'DY-TEST1',
    teacherId: teacher.id,
    students: [student1.id, student2.id],
    createdAt: new Date().toISOString(),
    isLive: false
  };
  classes[testClass.id] = testClass;

  // Create lessons
  const lesson1: Lesson = {
    id: 'l-1',
    title: 'Маятник — основы',
    description: 'Изучаем основные принципы работы математического маятника',
    content: `
# Математический маятник

## Основные понятия

Математический маятник — это идеализированная система, состоящая из материальной точки, подвешенной на невесомой нерастяжимой нити.

## Формулы

- Период колебаний: T = 2π√(L/g)
- Частота: f = 1/T
- Угловая частота: ω = 2π/T

## Практическое применение

Маятники используются в часах, сейсмографах и других устройствах.
    `,
    teacherId: teacher.id,
    classId: testClass.id,
    createdAt: new Date().toISOString(),
    simulationId: 'sim-pendulum-1'
  };
  lessons[lesson1.id] = lesson1;

  const lesson2: Lesson = {
    id: 'l-2',
    title: 'Закон Ома',
    description: 'Изучаем зависимость силы тока от напряжения и сопротивления',
    content: `
# Закон Ома

## Формулировка

Сила тока в проводнике прямо пропорциональна напряжению на его концах и обратно пропорциональна сопротивлению проводника.

## Формула

I = U/R

где:
- I — сила тока (А)
- U — напряжение (В)
- R — сопротивление (Ом)

## Практические примеры

- Расчет тока в электрической цепи
- Определение сопротивления проводника
- Анализ электрических схем
    `,
    teacherId: teacher.id,
    classId: testClass.id,
    createdAt: new Date().toISOString(),
    simulationId: 'sim-ohm-1'
  };
  lessons[lesson2.id] = lesson2;

  // Create homeworks
  const homework1: Homework = {
    id: 'hw-1',
    title: 'Контрольная работа: Маятник',
    description: 'Ответьте на вопросы по теме математического маятника',
    type: 'mcq',
    payload: {
      questions: [
        {
          id: 'q1',
          question: 'Как зависит период колебаний маятника от его длины?',
          options: [
            'Прямо пропорционально',
            'Обратно пропорционально',
            'Пропорционально квадратному корню',
            'Не зависит'
          ],
          correctAnswer: 2,
          points: 25
        },
        {
          id: 'q2',
          question: 'Что произойдет с периодом маятника, если его перенести на Луну?',
          options: [
            'Увеличится',
            'Уменьшится',
            'Останется прежним',
            'Зависит от массы'
          ],
          correctAnswer: 0,
          points: 25
        },
        {
          id: 'q3',
          question: 'Какой угол максимального отклонения маятника считается малым?',
          options: [
            'Менее 5°',
            'Менее 10°',
            'Менее 15°',
            'Менее 20°'
          ],
          correctAnswer: 2,
          points: 25
        },
        {
          id: 'q4',
          question: 'Что такое амплитуда колебаний маятника?',
          options: [
            'Время одного полного колебания',
            'Максимальное отклонение от положения равновесия',
            'Количество колебаний в секунду',
            'Скорость движения маятника'
          ],
          correctAnswer: 1,
          points: 25
        }
      ]
    },
    teacherId: teacher.id,
    classId: testClass.id,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    createdAt: new Date().toISOString(),
    isPublished: true
  };
  homeworks[homework1.id] = homework1;

  const homework2: Homework = {
    id: 'hw-2',
    title: 'Интерактивное задание: Симуляция маятника',
    description: 'Настройте параметры маятника и определите период колебаний',
    type: 'interactive',
    payload: {
      simulationId: 'sim-pendulum-1',
      criteria: [
        {
          id: 'c1',
          description: 'Длина маятника установлена в диапазоне 1.5-2.5 м',
          checkFunction: 'function(params) { return params.length >= 1.5 && params.length <= 2.5; }',
          points: 30
        },
        {
          id: 'c2',
          description: 'Угол начального отклонения не превышает 15°',
          checkFunction: 'function(params) { return Math.abs(params.initialAngle) <= 0.26; }', // 15° in radians
          points: 30
        },
        {
          id: 'c3',
          description: 'Период колебаний рассчитан правильно (±0.1 с)',
          checkFunction: 'function(params, result) { const expected = 2 * Math.PI * Math.sqrt(params.length / 9.81); return Math.abs(result.period - expected) <= 0.1; }',
          points: 40
        }
      ]
    },
    teacherId: teacher.id,
    classId: testClass.id,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    createdAt: new Date().toISOString(),
    isPublished: true
  };
  homeworks[homework2.id] = homework2;

  const homework3: Homework = {
    id: 'hw-3',
    title: 'Задачи на закон Ома',
    description: 'Решите задачи на применение закона Ома',
    type: 'input',
    payload: {
      questions: [
        {
          id: 'q1',
          question: 'Какая сила тока протекает через резистор сопротивлением 10 Ом при напряжении 5 В?',
          type: 'number',
          answer: 0.5,
          tolerance: 0.01,
          points: 25
        },
        {
          id: 'q2',
          question: 'Какое сопротивление имеет проводник, если при напряжении 12 В через него протекает ток 2 А?',
          type: 'number',
          answer: 6,
          tolerance: 0.1,
          points: 25
        },
        {
          id: 'q3',
          question: 'Какое напряжение нужно приложить к проводнику сопротивлением 15 Ом, чтобы через него протекал ток 0.8 А?',
          type: 'number',
          answer: 12,
          tolerance: 0.1,
          points: 25
        },
        {
          id: 'q4',
          question: 'В чем измеряется электрическое сопротивление?',
          type: 'text',
          answer: 'Ом',
          points: 25
        }
      ]
    },
    teacherId: teacher.id,
    classId: testClass.id,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    createdAt: new Date().toISOString(),
    isPublished: true
  };
  homeworks[homework3.id] = homework3;

  console.log('🌱 Seed data created successfully!');
  console.log(`   Teacher: ${teacher.name} (${teacher.email})`);
  console.log(`   Students: ${student1.name}, ${student2.name}`);
  console.log(`   Class: ${testClass.name} (${testClass.classCode})`);
  console.log(`   Lessons: ${Object.keys(lessons).length}`);
  console.log(`   Homeworks: ${Object.keys(homeworks).length}`);
}
