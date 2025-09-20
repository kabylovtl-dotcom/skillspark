import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'ky';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.simulations': 'Simulations',
    'nav.lessons': 'Online Lessons',
    'nav.whiteboard': 'Whiteboard',
    'nav.get.started': 'Get Started',
    'nav.subtitle': 'STEM Education Platform',
    
    // Hero Section
    'hero.made.for': 'Made for Kyrgyzstan',
    'hero.title.part1': 'Master',
    'hero.title.part2': 'Physics',
    'hero.title.part3': 'Through Interactive Learning',
    'hero.description': 'Discover the fascinating world of physics through hands-on simulations, interactive whiteboards, and visual learning tools designed specifically for students and teachers in Kyrgyzstan.',
    'hero.start.learning': 'Start Learning',
    'hero.view.simulations': 'View Simulations',
    'hero.try.pendulum': 'Try Pendulum Demo',
    
    // New Homepage Sections
    'hero.badge': '🚀 Revolution in STEM Education',
    'hero.title.skillspark': 'SkillSpark',
    'hero.title.kg': 'KG',
    'hero.subtitle': 'Interactive simulations, personalized learning and digital tools for studying sciences in Kyrgyzstan',
    'hero.button.explore': 'Start Exploring',
    'hero.button.lessons': 'Online Lessons',
    
    // Quick Actions
    'quick.actions.simulations': 'Simulations',
    'quick.actions.simulations.desc': 'Interactive physics experiments',
    'quick.actions.whiteboard': 'Whiteboard',
    'quick.actions.whiteboard.desc': 'Visual learning tools',
    'quick.actions.lessons': 'Lessons',
    'quick.actions.lessons.desc': 'Structured learning',
    
    // Stats Section
    'stats.title': 'Platform Statistics',
    'stats.students.count': 'Students',
    'stats.teachers.count': 'Teachers',
    'stats.simulations.count': 'Simulations',
    'stats.lessons.count': 'Lessons',
    
    // Features Section
    'features.title': 'Why Choose SkillSpark?',
    'features.interactive.title': 'Interactive Learning',
    'features.interactive.desc': 'Hands-on experiments and real-time feedback',
    'features.visual.title': 'Visual Understanding',
    'features.visual.desc': 'Complex concepts made simple through visualization',
    'features.personalized.title': 'Personalized Path',
    'features.personalized.desc': 'Adaptive learning tailored to your pace',
    'features.accessible.title': 'Always Accessible',
    'features.accessible.desc': 'Learn anywhere, anytime with offline access',
    
    // Technologies Section
    'technologies.title': 'Cutting-Edge Technologies',
    'technologies.ar.title': 'Augmented Reality',
    'technologies.ar.desc': '3D models in real world',
    'technologies.vr.title': 'Virtual Reality',
    'technologies.vr.desc': 'Immersive learning experiences',
    'technologies.ai.title': 'Artificial Intelligence',
    'technologies.ai.desc': 'Smart learning recommendations',
    'technologies.cloud.title': 'Cloud Computing',
    'technologies.cloud.desc': 'Scalable and reliable platform',
    
    // Mission Section
    'mission.title': 'Our Mission',
    'mission.description': 'We are dedicated to making STEM education accessible, effective and engaging for every student and teacher in Kyrgyzstan.',
    'mission.accessible.title': 'Accessible Education',
    'mission.accessible.description': 'Breaking down barriers to quality STEM education with free, open resources for all students in Kyrgyzstan.',
    'mission.effective.title': 'Effective Learning',
    'mission.effective.description': 'Using interactive simulations and visual tools to make complex concepts easier to understand and remember.',
    'mission.engaging.title': 'Engaging Content',
    'mission.engaging.description': 'Transforming traditional learning into exciting, hands-on experiences that inspire curiosity and discovery.',
    'mission.local.title': 'Local Impact',
    'mission.local.description': 'Supporting teachers and students across Kyrgyzstan with resources designed for local needs and contexts.',
    
    // Achievements Section
    'achievements.title': 'Our Achievements',
    'achievements.students.title': 'Active Students',
    'achievements.students.desc': 'Students actively using the platform',
    'achievements.teachers.title': 'Teachers',
    'achievements.teachers.desc': 'Educators implementing our tools',
    'achievements.schools.title': 'Schools',
    'achievements.schools.desc': 'Educational institutions reached',
    'achievements.lessons.title': 'Lessons Created',
    'achievements.lessons.desc': 'Educational content developed',
    
    // Final CTA Section
    'final.cta.title': 'Ready to Transform Your Learning?',
    'final.cta.description': 'Join thousands of students and teachers already using SkillSpark to enhance their STEM education.',
    'final.cta.button': 'Get Started Now',
    'final.cta.button.secondary': 'Learn More',
    
    'stats.students': 'Students',
    'stats.free': 'Free',
    'stats.interactive': 'Interactive',
    
    // Simulations Page
    'sims.page.title': 'Interactive Simulations',
    'sims.page.subtitle': 'Explore, Learn, Discover',
    'sims.page.description': 'Dive deep into scientific concepts through hands-on interactive simulations across multiple subjects',
    'sims.page.physics': 'Physics',
    'sims.page.physics.desc': 'Study forces, motion, and fundamental laws of nature',
    'sims.page.chemistry': 'Chemistry',
    'sims.page.chemistry.desc': 'Explore substances, their properties and transformations',
    'sims.page.biology': 'Biology',
    'sims.page.biology.desc': 'Discover life processes and biological systems',
    'sims.page.astronomy': 'Astronomy',
    'sims.page.astronomy.desc': 'Journey through space and celestial objects',
    'sims.page.mathematics': 'Mathematics',
    'sims.page.mathematics.desc': 'Visualize mathematical concepts and equations',
    'sims.page.innovations': 'Innovations',
    'sims.page.innovations.desc': 'Cutting-edge technologies in education',
    'sims.difficulty.beginner': 'Beginner',
    'sims.difficulty.intermediate': 'Intermediate',
    'sims.difficulty.advanced': 'Advanced',
    'sims.card.explore': 'Explore Simulation',
    'sims.card.simulations': 'simulations',
    'sims.card.launch': 'Launch',
    'sims.cta.title': 'Ready for Scientific Discoveries?',
    'sims.cta.description': 'Choose any simulation and start exploring the amazing world of science. Each simulation is designed to make learning engaging and understandable.',
    'sims.cta.start': 'Start Exploration',
    'sims.cta.browse': 'Browse All',
    
    // Online Lessons Page
    'lessons.page.title': 'Online Science Lessons',
    'lessons.page.subtitle': 'Expert-Led Education',
    'lessons.page.description': 'Master scientific concepts through structured online lessons with expert instructors and interactive materials',
    'lessons.subject.physics': 'Physics',
    'lessons.subject.physics.desc': 'Study matter, energy and their interactions',
    'lessons.subject.mathematics': 'Mathematics',
    'lessons.subject.mathematics.desc': 'Queen of sciences - algebra, geometry, analysis',
    'lessons.subject.chemistry': 'Chemistry',
    'lessons.subject.chemistry.desc': 'Exploration of substances and their transformations',
    'lessons.subject.biology': 'Biology',
    'lessons.subject.biology.desc': 'Study of living organisms and life processes',
    'lessons.subject.astronomy': 'Astronomy',
    'lessons.subject.astronomy.desc': 'Journey through space and celestial bodies',
    'lessons.subject.computer': 'Computer Science',
    'lessons.subject.computer.desc': 'Programming, algorithms and digital technologies',
    'lessons.card.lessons': 'lessons',
    'lessons.card.hours': 'hours',
    'lessons.card.difficulty': 'Difficulty',
    'lessons.card.explore': 'Explore Course',
    'lessons.difficulty.beginner': 'Beginner',
    'lessons.difficulty.intermediate': 'Intermediate',
    'lessons.difficulty.advanced': 'Advanced',
    'lessons.status.active': 'Active',
    'lessons.status.soon': 'Coming Soon',
    'lessons.stats.subjects': 'Subjects',
    'lessons.stats.lessons': 'Lessons',
    'lessons.stats.hours': 'Learning Hours',
    'lessons.stats.experts': 'Expert Teachers',
    'lessons.buttons.start': 'Start Learning',
    'lessons.buttons.coming': 'Coming Soon',
    'lessons.cta.title': 'Ready to Learn?',
    'lessons.cta.description': 'Start with physics - the first available subject, or subscribe to notifications about the launch of other courses',
    'lessons.cta.start.physics': 'Start Physics',
    'lessons.cta.notify': 'Уведомить меня',
    
    // AI Assistant
    'ai.title': 'ИИ Ассистент',
    'ai.welcome': 'Привет! Я ваш ИИ-ассистент по физике. Задавайте вопросы о законах физики, формулах или концепциях, и я постараюсь объяснить их простым языком! 🚀',
    'ai.quick.prompts': 'Быстрые вопросы',
    'ai.thinking': 'ИИ думает...',
    'ai.input.placeholder': 'Задайте вопрос о физике...',
    'ai.prompts.newton': 'Объясни закон Ньютона простыми словами',
    'ai.prompts.gravity': 'Что такое гравитация?',
    'ai.prompts.electricity': 'Как работает электричество?',
    'ai.prompts.quantum': 'Объясни квантовую физику',
    'ai.prompts.energy': 'Что такое энергия?',
    'ai.prompts.magnetism': 'Как работает магнетизм?',
    
    // Simulations Section
    'sims.section.subtitle': 'Interactive Learning',
    'sims.section.title': 'Physics Simulations',
    'sims.section.description': 'Explore complex physics concepts through interactive 2D and 3D simulations. Manipulate variables, observe results, and understand the science behind the phenomena.',
    'sims.section.tools.title': 'Built-in Measurement Tools',
    'sims.section.button': 'Try Simulations',
    
    // Interactive Lab Cards
    'sims.lab.title': 'Interactive Lab',
    'sims.lab.description': 'Real-time experiments with live data and instant feedback',
    'sims.lab.features': ['Live sensors', 'Real-time graphs', 'Instant analysis', 'Data export'],
    'sims.lab.difficulty': 'Beginner',
    'sims.lab.category': 'Laboratory',
    
    'sims.molecule.title': '3D Molecule Builder',
    'sims.molecule.description': 'Build and explore molecular structures in 3D space',
    'sims.molecule.features': ['3D rotation', 'Bond creation', 'Structure analysis', 'Chemistry tools'],
    'sims.molecule.difficulty': 'Intermediate',
    'sims.molecule.category': 'Chemistry',
    
    'sims.wave.title': 'Wave Simulation',
    'sims.wave.description': 'Create beautiful wave patterns and study interference',
    'sims.wave.features': ['Wave generation', 'Interference patterns', 'Frequency control', 'Visual effects'],
    'sims.wave.difficulty': 'Beginner',
    'sims.wave.category': 'Waves',
    
    'sims.energy.title': 'Energy Maze',
    'sims.energy.description': 'Navigate through energy fields and learn conservation',
    'sims.energy.features': ['Energy fields', 'Particle navigation', 'Conservation laws', 'Game mechanics'],
    'sims.energy.difficulty': 'Intermediate',
    'sims.energy.category': 'Energy',
    
    // Simulation Tools
    'sims.tools.visualization': 'Data Visualization',
    'sims.tools.timer': 'Time Controls',
    'sims.tools.controls': 'Interactive Controls',
    
    // Interactive Features
    'sims.features.live.data': 'Live Data',
    'sims.features.real.time': 'Real-time',
    'sims.features.3d.space': '3D Space',
    'sims.features.interactive': 'Interactive',
    'sims.features.beautiful': 'Beautiful',
    'sims.features.patterns': 'Patterns',
    'sims.features.game.mode': 'Game Mode',
    'sims.features.adventure': 'Adventure',
    
    // Whiteboard Section
    'whiteboard.subtitle': 'Visual Learning',
    'whiteboard.title': 'Interactive Whiteboard',
    'whiteboard.description': 'Simple, visual explanations that teachers can use in class or students can create for themselves. Draw diagrams, annotate concepts, and visualize complex ideas.',
    'whiteboard.tools.title': 'Powerful Drawing Tools',
    'whiteboard.pen.name': 'Drawing Tools',
    'whiteboard.pen.desc': 'Multiple pen sizes and styles',
    'whiteboard.color.name': 'Color Palette',
    'whiteboard.color.desc': 'Highlight different concepts',
    'whiteboard.eraser.name': 'Smart Eraser',
    'whiteboard.eraser.desc': 'Precise editing capabilities',
    'whiteboard.export.name': 'Export Options',
    'whiteboard.export.desc': 'Save and share diagrams',
    'whiteboard.start': 'Start Drawing',
    
    // Usage Scenarios Section
    'usage.title': 'Multiple Ways to Learn',
    'usage.description': 'Whether you\'re a teacher conducting a lesson, a student studying at home, or someone exploring STEM on your own - we\'ve got you covered.',
    'usage.classroom.title': 'In the Classroom',
    'usage.classroom.subtitle': 'For Teachers',
    'usage.classroom.description': 'Use interactive simulations to demonstrate complex physics concepts. Project whiteboard explanations to help students visualize problems.',
    'usage.home.title': 'At Home',
    'usage.home.subtitle': 'For Students',
    'usage.home.description': 'Practice with simulations and create visual notes. Access all content offline for studying without internet connectivity.',
    'usage.selfstudy.title': 'Self-Study',
    'usage.selfstudy.subtitle': 'Independent Learning',
    'usage.selfstudy.description': 'Explore concepts at your own pace. Use visual tools to understand difficult topics and prepare for exams.',
    
    // Simulations Page
    'simulations.subtitle': 'Interactive Learning',
    'simulations.title': 'Physics Simulations',
    'simulations.description': 'Explore complex physics concepts through interactive 2D and 3D simulations.',
    'simulations.tools.description': 'Every simulation includes professional measurement tools: rulers, protractors, stopwatches, and more',
    'simulation.pendulum': 'Pendulum Motion',
    'simulation.projectile': 'Projectile Motion',
    'simulation.ohms': 'Ohm\'s Law Circuit',
    'simulation.newtons': 'Newton\'s Laws',
    
    // Pendulum Demo Page
    'pendulum.demo.back': 'Back to Home',
    'pendulum.demo.subtitle': 'Interactive Physics Demo',
    'pendulum.demo.title': 'Pendulum Motion Simulation',
    'pendulum.demo.description': 'Explore the fascinating world of oscillatory motion with our interactive pendulum simulation.',
    'pendulum.demo.learn.title': 'What You\'ll Learn',
    'pendulum.demo.learn.motion': 'Simple harmonic motion principles',
    'pendulum.demo.learn.energy': 'Energy conservation between kinetic and potential',
    'pendulum.demo.learn.period': 'How period depends on length and gravity',
    'pendulum.demo.learn.damping': 'Damping effects on motion',
    'pendulum.demo.usage.title': 'How to Use',
    'pendulum.demo.usage.drag': 'Drag the red bob to set initial angle',
    'pendulum.demo.usage.play': 'Click Play to start simulation',
    'pendulum.demo.usage.adjust': 'Adjust sliders to change parameters',
    'pendulum.demo.usage.watch': 'Watch energy bars for real-time data',
    'pendulum.demo.physics.title': 'Physics Concepts',
    'pendulum.demo.physics.shm': 'Simple Harmonic Motion: The pendulum oscillates back and forth with a period that depends only on length and gravity.',
    'pendulum.demo.physics.energy': 'Energy Conservation: Total mechanical energy remains constant, converting between kinetic and potential forms.',
    'pendulum.demo.physics.formula': 'Period Formula: T = 2π√(L/g) where L is length and g is gravitational acceleration.',
    'pendulum.demo.more.title': 'Ready for More?',
    'pendulum.demo.more.description': 'Explore other physics simulations and deepen your understanding.',
    'pendulum.demo.more.button': 'View All Simulations',
    
    // Pendulum Simulation
    'pendulum.sim.title': 'Interactive Pendulum Lab',
    'pendulum.sim.description': 'Official PhET simulation for exploring pendulum motion and energy conservation.',
    'pendulum.sim.features.title': 'Simulation Features',
    'pendulum.sim.features.gravity': 'Adjustable gravity settings',
    'pendulum.sim.features.length': 'Variable pendulum length',
    'pendulum.sim.features.multiple': 'Multiple pendulums support',
    'pendulum.sim.features.ruler': 'Built-in measurement tools',
    'pendulum.sim.features.energy': 'Real-time energy graphs',
    'pendulum.sim.features.friction': 'Friction and damping controls',
    'pendulum.sim.objectives.title': 'Learning Objectives',
    'pendulum.sim.objectives.motion': 'Understand simple harmonic motion',
    'pendulum.sim.objectives.period': 'Investigate period dependence on length and gravity',
    'pendulum.sim.objectives.compare': 'Compare multiple pendulums simultaneously',
    'pendulum.sim.objectives.damping': 'Study damping effects on oscillation',
    'pendulum.sim.about.title': 'About PhET Simulations',
    'pendulum.sim.about.desc': 'This simulation is provided by PhET Interactive Simulations at the University of Colorado Boulder. PhET creates free interactive math and science simulations that engage students through an intuitive, game-like environment where students learn through exploration and discovery.',
    'pendulum.sim.about.visit': 'Visit PhET Website',
    
    // Tools
    'tools.ruler': 'Ruler',
    'tools.protractor': 'Protractor',
    'tools.stopwatch': 'Stopwatch',
    'tools.voltmeter': 'Voltmeter',
    'tools.measurement': 'Measurement Tools',
    
    // View modes
    'mode.2d': '2D View',
    'mode.3d': '3D View',
    
    // Common UI
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.start': 'Start Simulation',
    'common.delete': 'Delete',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.share': 'Share',
    'common.export': 'Export',
    'common.parameters': 'Parameters',
    
    // Simulation Detail Page
    'sim.detail.not.found': 'Simulation Not Found',
    'sim.detail.not.found.desc': 'The requested simulation could not be found.',
    'sim.detail.back.to.sims': 'Back to Simulations',
    'sim.detail.theory.title': 'Theory & Background',
    'sim.detail.learning.objectives': 'Learning Objectives',
    'sim.detail.categories.mechanics': 'Mechanics',
    'sim.detail.categories.electricity': 'Electricity',
    'sim.detail.categories.waves': 'Waves',
    'sim.detail.categories.energy': 'Energy',
    'sim.detail.categories.chemistry': 'Chemistry',
    'sim.detail.difficulty.beginner': 'Beginner',
    'sim.detail.difficulty.intermediate': 'Intermediate',
    'sim.detail.difficulty.advanced': 'Advanced',
    
    // Simulation Descriptions
    'sim.detail.pendulum.desc': 'Explore simple harmonic motion with adjustable parameters. Observe how changing the length, mass, and starting angle affects the pendulum\'s period and energy.',
    'sim.detail.projectile.desc': 'Interactive PhET simulation for studying projectile motion. Adjust initial velocity, launch angle, and observe trajectory, range, and flight time in real-time.',
    'sim.detail.ohms.desc': 'Build circuits and measure electrical properties in real-time. Explore the relationship between voltage, current, and resistance.',
    'sim.detail.newtons.desc': 'Visualize forces and motion in interactive scenarios. Apply Newton\'s three laws to understand acceleration, forces, and momentum.',
    
    // Learning Objectives
    'sim.detail.pendulum.objectives': [
      'Understand simple harmonic motion',
      'Analyze energy conservation',
      'Measure period and frequency',
      'Investigate damping effects'
    ],
    'sim.detail.projectile.objectives': [
      'Analyze projectile motion components',
      'Optimize launch parameters',
      'Understand range equations',
      'Study air resistance effects'
    ],
    'sim.detail.ohms.objectives': [
      'Apply Ohm\'s law V=IR',
      'Measure electrical quantities',
      'Build simple circuits',
      'Calculate electrical power'
    ],
    'sim.detail.newtons.objectives': [
      'Apply Newton\'s three laws',
      'Analyze force vectors',
      'Calculate acceleration',
      'Study friction effects'
    ],
    
    // Theory
    'sim.detail.pendulum.theory': 'A pendulum demonstrates simple harmonic motion when the amplitude is small. The period depends only on the length and gravitational acceleration, not on the mass or amplitude.',
    'sim.detail.projectile.theory': 'Projectile motion combines horizontal motion at constant velocity with vertical motion under constant acceleration due to gravity.',
    'sim.detail.ohms.theory': 'Ohm\'s law states that the current through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance.',
    'sim.detail.newtons.theory': 'Newton\'s laws describe the relationship between forces acting on a body and its motion. F=ma is fundamental to understanding dynamics.',
    
    // PhET Information
    'phet.info.title': 'PhET Interactive Simulations',
    'phet.info.description': 'This simulation is provided by PhET Interactive Simulations at the University of Colorado Boulder. PhET creates free interactive simulations for math and science education.',
    'phet.info.visit': 'Visit PhET website',
    
    // Physics Lessons
    'physics.chapters.mechanics.title': 'Mechanics',
    'physics.chapters.mechanics.description': 'Fundamentals of kinematics, dynamics and statics',
    'physics.chapters.molecular.title': 'Molecular Kinetic Theory',
    'physics.chapters.molecular.description': 'Fundamentals of molecular physics and thermodynamics',
    'physics.chapters.electromagnetism.title': 'Electromagnetism',
    'physics.chapters.electromagnetism.description': 'Electrostatics, electric current and magnetic phenomena',
    
    'physics.difficulty.beginner': 'Beginner',
    'physics.difficulty.intermediate': 'Intermediate',
    'physics.difficulty.advanced': 'Advanced',
    
    'physics.lesson.preview.title': 'Lesson Preview',
    'physics.lesson.topics.title': 'Topics Covered',
    'physics.lesson.simulation.title': 'Interactive Simulation',
    'physics.lesson.simulation.button': 'Open Simulation',
    'physics.lesson.start.button': 'Start Lesson',
    'physics.lesson.theory.button': 'View Theory',
    
    // Specific lesson previews
    'physics.lessons.3.preview': 'Explore the fundamentals of motion for point particles and rigid bodies. Understand position, velocity, and acceleration.',
    'physics.lessons.3.topic1': 'Point particle motion',
    'physics.lessons.3.topic2': 'Rigid body motion',
    'physics.lessons.3.topic3': 'Coordinate systems',
    'physics.lessons.3.simulation': 'Interactive motion visualization with position tracking',
    
    'physics.lessons.84.preview': 'Discover the fundamental properties of electric charge and elementary particles in electrostatics.',
    'physics.lessons.84.topic1': 'Elementary charge',
    'physics.lessons.84.topic2': 'Charge conservation',
    'physics.lessons.84.topic3': 'Electric fields',
    'physics.lessons.84.simulation': 'Charge interaction simulator',
    
    'physics.lessons.87.preview': 'Learn about Coulomb\'s law, the fundamental law governing electric force between charged particles.',
    'physics.lessons.87.topic1': 'Coulomb\'s law formula',
    'physics.lessons.87.topic2': 'Electric force calculations',
    'physics.lessons.87.topic3': 'Superposition principle',
    'physics.lessons.87.simulation': 'Coulomb force calculator',
    
    'physics.lessons.default.preview': 'Comprehensive lesson covering essential physics concepts with interactive examples and practical applications.',
    'physics.lessons.default.topic1': 'Theoretical foundations',
    'physics.lessons.default.topic2': 'Practical applications',
    'physics.lessons.default.topic3': 'Problem solving',
    'physics.lessons.default.simulation': 'Interactive physics demonstration',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.simulations': 'Симуляции',
    'nav.lessons': 'Онлайн Уроки',
    'nav.whiteboard': 'Whiteboard',
    'nav.get.started': 'Начать',
    'nav.subtitle': 'STEM Образовательная Платформа',
    
    // Hero Section
    'hero.made.for': 'Создано для Кыргызстана',
    'hero.title.part1': 'Изучайте',
    'hero.title.part2': 'Физику',
    'hero.title.part3': 'Через Интерактивное Обучение',
    'hero.description': 'Откройте для себя увлекательный мир физики через практические симуляции, интерактивные доски и визуальные инструменты обучения, разработанные специально для учеников и учителей Кыргызстана.',
    'hero.start.learning': 'Начать Обучение',
    'hero.view.simulations': 'Просмотреть Симуляции',
    'hero.try.pendulum': 'Попробовать Демо Маятника',
    
    // New Homepage Sections
    'hero.badge': '🚀 Революция в STEM образовании',
    'hero.title.skillspark': 'SkillSpark',
    'hero.title.kg': 'KG',
    'hero.subtitle': 'Интерактивные симуляции, персонализированное обучение и цифровые инструменты для изучения наук в Кыргызстане',
    'hero.button.explore': 'Начать исследование',
    'hero.button.lessons': 'Онлайн уроки',
    
    // Quick Actions
    'quick.actions.simulations': 'Симуляции',
    'quick.actions.simulations.desc': 'Интерактивные физические эксперименты',
    'quick.actions.whiteboard': 'Доска',
    'quick.actions.whiteboard.desc': 'Визуальные инструменты обучения',
    'quick.actions.lessons': 'Уроки',
    'quick.actions.lessons.desc': 'Структурированное обучение',
    
    // Stats Section
    'stats.title': 'Статистика платформы',
    'stats.students.count': 'Студенты',
    'stats.teachers.count': 'Учителя',
    'stats.simulations.count': 'Симуляции',
    'stats.lessons.count': 'Уроки',
    
    // Features Section
    'features.title': 'Почему выбирают SkillSpark?',
    'features.interactive.title': 'Интерактивное обучение',
    'features.interactive.desc': 'Практические эксперименты и мгновенная обратная связь',
    'features.visual.title': 'Визуальное понимание',
    'features.visual.desc': 'Сложные концепции становятся простыми через визуализацию',
    'features.personalized.title': 'Персонализированный путь',
    'features.personalized.desc': 'Адаптивное обучение под ваш темп',
    'features.accessible.title': 'Всегда доступно',
    'features.accessible.desc': 'Учитесь где угодно, когда угодно с офлайн доступом',
    
    // Technologies Section
    'technologies.title': 'Передовые технологии',
    'technologies.ar.title': 'Дополненная реальность',
    'technologies.ar.desc': '3D модели в реальном мире',
    'technologies.vr.title': 'Виртуальная реальность',
    'technologies.vr.desc': 'Погружающие обучающие впечатления',
    'technologies.ai.title': 'Искусственный интеллект',
    'technologies.ai.desc': 'Умные рекомендации по обучению',
    'technologies.cloud.title': 'Облачные вычисления',
    'technologies.cloud.desc': 'Масштабируемая и надежная платформа',
    
    // Achievements Section
    'achievements.title': 'Наши достижения',
    'achievements.students.title': 'Активные студенты',
    'achievements.students.desc': 'Студенты, активно использующие платформу',
    'achievements.teachers.title': 'Учителя',
    'achievements.teachers.desc': 'Педагоги, внедряющие наши инструменты',
    'achievements.schools.title': 'Школы',
    'achievements.schools.desc': 'Достигнутые образовательные учреждения',
    'achievements.lessons.title': 'Созданные уроки',
    'achievements.lessons.desc': 'Разработанный образовательный контент',
    
    // Final CTA Section
    'final.cta.title': 'Готовы трансформировать ваше обучение?',
    'final.cta.description': 'Присоединяйтесь к тысячам студентов и учителей, уже использующих SkillSpark для улучшения своего STEM образования.',
    'final.cta.button': 'Начать сейчас',
    'final.cta.button.secondary': 'Узнать больше',
    
    'stats.students': 'Студенты',
    'stats.free': 'Бесплатно',
    'stats.interactive': 'Интерактивно',
    
    // Simulations Page
    'sims.page.title': 'Интерактивные Симуляции',
    'sims.page.subtitle': 'Исследуйте, Изучайте, Открывайте',
    'sims.page.description': 'Погрузитесь в научные концепции через практические интерактивные симуляции по разным предметам',
    'sims.page.physics': 'Физика',
    'sims.page.physics.desc': 'Изучение сил, движения и фундаментальных законов природы',
    'sims.page.chemistry': 'Химия',
    'sims.page.chemistry.desc': 'Изучение веществ, их свойств и превращений',
    'sims.page.biology': 'Биология',
    'sims.page.biology.desc': 'Открытие жизненных процессов и биологических систем',
    'sims.page.astronomy': 'Астрономия',
    'sims.page.astronomy.desc': 'Путешествие через космос и небесные объекты',
    'sims.page.mathematics': 'Математика',
    'sims.page.mathematics.desc': 'Визуализация математических концепций и уравнений',
    'sims.page.innovations': 'Инновации',
    'sims.page.innovations.desc': 'Передовые технологии в образовании',
    'sims.difficulty.beginner': 'Начинающий',
    'sims.difficulty.intermediate': 'Средний',
    'sims.difficulty.advanced': 'Продвинутый',
    'sims.card.explore': 'Исследовать Симуляцию',
    'sims.card.simulations': 'симуляций',
    'sims.card.launch': 'Запустить',
    'sims.cta.title': 'Готовы к научным открытиям?',
    'sims.cta.description': 'Выберите любую симуляцию и начните исследовать удивительный мир науки. Каждая симуляция создана для того, чтобы сделать обучение увлекательным и понятным.',
    'sims.cta.start': 'Начать Исследование',
    'sims.cta.browse': 'Все Симуляции',
    
    // Online Lessons Page
    'lessons.page.title': 'Онлайн Уроки по Наукам',
    'lessons.page.subtitle': 'Обучение с Экспертами',
    'lessons.page.description': 'Овладейте научными концепциями через структурированные онлайн уроки с экспертными инструкторами и интерактивными материалами',
    'lessons.subject.physics': 'Физика',
    'lessons.subject.physics.desc': 'Изучение материи, энергии и их взаимодействий',
    'lessons.subject.mathematics': 'Математика',
    'lessons.subject.mathematics.desc': 'Царица наук - алгебра, геометрия, анализ',
    'lessons.subject.chemistry': 'Химия',
    'lessons.subject.chemistry.desc': 'Исследование веществ и их превращений',
    'lessons.subject.biology': 'Биология',
    'lessons.subject.biology.desc': 'Изучение живых организмов и жизненных процессов',
    'lessons.subject.astronomy': 'Астрономия',
    'lessons.subject.astronomy.desc': 'Путешествие через космос и небесные тела',
    'lessons.subject.computer': 'Информатика',
    'lessons.subject.computer.desc': 'Программирование, алгоритмы и цифровые технологии',
    'lessons.card.lessons': 'уроков',
    'lessons.card.hours': 'часов',
    'lessons.card.difficulty': 'Сложность',
    'lessons.card.explore': 'Explore Course',
    'lessons.difficulty.beginner': 'Начинающий',
    'lessons.difficulty.intermediate': 'Средний',
    'lessons.difficulty.advanced': 'Продвинутый',
    'lessons.status.active': 'Активный',
    'lessons.status.soon': 'Скоро',
    'lessons.stats.subjects': 'Предметов',
    'lessons.stats.lessons': 'Уроков',
    'lessons.stats.hours': 'Часов обучения',
    'lessons.stats.experts': 'Экспертов-преподавателей',
    'lessons.buttons.start': 'Начать обучение',
    'lessons.buttons.coming': 'Скоро будет доступно',
    'lessons.cta.title': 'Готовы к обучению?',
    'lessons.cta.description': 'Начните с физики - первого доступного предмета, или подпишитесь на уведомления о запуске других курсов',
    'lessons.cta.start.physics': 'Начать физику',
    'lessons.cta.notify': 'Уведомить меня',
    
    // Mission Section
    'mission.title': 'Наша Миссия',
    'mission.description': 'Мы стремимся сделать STEM-образование более доступным, эффективным и увлекательным для каждого ученика и учителя в Кыргызстане.',
    'mission.accessible.title': 'Доступное Образование',
    'mission.accessible.description': 'Устранение барьеров для качественного STEM-образования с помощью бесплатных, открытых ресурсов для всех учащихся в Кыргызстане.',
    'mission.effective.title': 'Эффективное Обучение',
    'mission.effective.description': 'Использование интерактивных симуляций и визуальных инструментов для упрощения понимания и запоминания сложных концепций.',
    'mission.engaging.title': 'Увлекательный Контент',
    'mission.engaging.description': 'Превращение традиционного обучения в захватывающий, практический опыт, который вдохновляет любопытство и открытия.',
    'mission.local.title': 'Местное Воздействие',
    'mission.local.description': 'Поддержка учителей и учеников по всему Кыргызстану ресурсами, разработанными с учетом местных потребностей и контекстов.',
    
    // Simulations Section
    'sims.section.subtitle': 'Интерактивное Обучение',
    'sims.section.title': 'Физические Симуляции',
    'sims.section.description': 'Исследуйте сложные физические концепции через интерактивные 2D и 3D симуляции. Манипулируйте переменными, наблюдайте результаты и понимайте науку, стоящую за явлениями.',
    'sims.section.tools.title': 'Встроенные Измерительные Инструменты',
    'sims.section.button': 'Попробовать Симуляции',
    
    // Interactive Lab Cards
    'sims.lab.title': 'Интерактивная Лаборатория',
    'sims.lab.description': 'Эксперименты в реальном времени с живыми данными и мгновенной обратной связью',
    'sims.lab.features': ['Живые датчики', 'Графики в реальном времени', 'Мгновенный анализ', 'Экспорт данных'],
    'sims.lab.difficulty': 'Начинающий',
    'sims.lab.category': 'Лаборатория',
    
    'sims.molecule.title': '3D Конструктор Молекул',
    'sims.molecule.description': 'Создавайте и исследуйте молекулярные структуры в 3D пространстве',
    'sims.molecule.features': ['3D вращение', 'Создание связей', 'Анализ структуры', 'Химические инструменты'],
    'sims.molecule.difficulty': 'Средний',
    'sims.molecule.category': 'Chemistry',
    
    'sims.wave.title': 'Симуляция Волн',
    'sims.wave.description': 'Создавайте красивые волновые узоры и изучайте интерференцию',
    'sims.wave.features': ['Генерация волн', 'Интерференционные узоры', 'Контроль частоты', 'Визуальные эффекты'],
    'sims.wave.difficulty': 'Начинающий',
    'sims.wave.category': 'Волны',
    
    'sims.energy.title': 'Энергетический Лабиринт',
    'sims.energy.description': 'Навигация через энергетические поля и изучение законов сохранения',
    'sims.energy.features': ['Энергетические поля', 'Навигация частиц', 'Законы сохранения', 'Игровая механика'],
    'sims.energy.difficulty': 'Средний',
    'sims.energy.category': 'Energy',
    
    // Interactive Features
    'sims.features.live.data': 'Живые Данные',
    'sims.features.real.time': 'Реальное Время',
    'sims.features.3d.space': '3D Пространство',
    'sims.features.interactive': 'Интерактивно',
    'sims.features.beautiful': 'Красиво',
    'sims.features.patterns': 'Узоры',
    'sims.features.game.mode': 'Игровой Режим',
    'sims.features.adventure': 'Приключение',
    
    // Whiteboard Section
    'whiteboard.subtitle': 'Визуальное Обучение',
    'whiteboard.title': 'Интерактивная Доска',
    'whiteboard.description': 'Простые, визуальные объяснения, которые учителя могут использовать в классе или ученики могут создавать для себя. Рисуйте диаграммы, аннотируйте концепции и визуализируйте сложные идеи.',
    'whiteboard.tools.title': 'Мощные Инструменты Рисования',
    'whiteboard.pen.name': 'Инструменты Рисования',
    'whiteboard.pen.desc': 'Множество размеров и стилей ручек',
    'whiteboard.color.name': 'Цветовая Палитра',
    'whiteboard.color.desc': 'Highlight different concepts',
    'whiteboard.eraser.name': 'Умный Ластик',
    'whiteboard.eraser.desc': 'Precise editing capabilities',
    'whiteboard.export.name': 'Export Options',
    'whiteboard.export.desc': 'Save and share diagrams',
    'whiteboard.start': 'Start Drawing',
    
    // Usage Scenarios Section
    'usage.title': 'Множество Способов Обучения',
    'usage.description': 'Будь вы учитель, проводящий урок, ученик, изучающий дома, или кто-то, изучающий STEM самостоятельно - мы поможем вам.',
    'usage.classroom.title': 'В Классе',
    'usage.classroom.subtitle': 'Для Учителей',
    'usage.classroom.description': 'Используйте интерактивные симуляции для демонстрации сложных физических концепций. Проецируйте объяснения на доске, чтобы помочь ученикам визуализировать проблемы.',
    'usage.home.title': 'Дома',
    'usage.home.subtitle': 'Для Учеников',
    'usage.home.description': 'Практикуйтесь с симуляциями и создавайте визуальные заметки. Получайте доступ ко всему контенту офлайн для изучения без подключения к интернету.',
    'usage.selfstudy.title': 'Самостоятельное Изучение',
    'usage.selfstudy.subtitle': 'Independent Learning',
    'usage.selfstudy.description': 'Explore concepts at your own pace. Use visual tools to understand difficult topics and prepare for exams.',
    
    // Simulations Page
    'simulations.subtitle': 'Интерактивное Обучение',
    'simulations.title': 'Физические Симуляции',
    'simulations.description': 'Изучайте сложные физические концепции через интерактивные 2D и 3D симуляции.',
    'simulations.tools.description': 'Каждая симуляция включает профессиональные инструменты измерения: линейки, транспортиры, секундомеры и многое другое',
    'simulation.pendulum': 'Движение Маятника',
    'simulation.projectile': 'Движение Снаряда',
    'simulation.ohms': 'Закон Ома',
    'simulation.newtons': 'Законы Ньютона',
    
    // Pendulum Demo Page
    'pendulum.demo.back': 'Назад на Главную',
    'pendulum.demo.subtitle': 'Интерактивная Демонстрация Физики',
    'pendulum.demo.title': 'Симуляция Движения Маятника',
    'pendulum.demo.description': 'Исследуйте увлекательный мир колебательного движения с нашей интерактивной симуляцией маятника.',
    'pendulum.demo.learn.title': 'Что Вы Изучите',
    'pendulum.demo.learn.motion': 'Принципы простого гармонического движения',
    'pendulum.demo.learn.energy': 'Сохранение энергии между кинетической и потенциальной',
    'pendulum.demo.learn.period': 'Как период зависит от длины и гравитации',
    'pendulum.demo.learn.damping': 'Влияние затухания на движение',
    'pendulum.demo.usage.title': 'Как Использовать',
    'pendulum.demo.usage.drag': 'Перетащите красный шарик для установки угла',
    'pendulum.demo.usage.play': 'Нажмите Старт для запуска симуляции',
    'pendulum.demo.usage.adjust': 'Настройте ползунки для изменения параметров',
    'pendulum.demo.usage.watch': 'Следите за энергетическими шкалами для данных в реальном времени',
    'pendulum.demo.physics.title': 'Физические Концепции',
    'pendulum.demo.physics.shm': 'Простое Гармоническое Движение: Маятник колеблется взад и вперед с периодом, который зависит только от длины и гравитации.',
    'pendulum.demo.physics.energy': 'Сохранение Энергии: Общая механическая энергия остается постоянной, превращаясь между кинетической и потенциальной формами.',
    'pendulum.demo.physics.formula': 'Формула Периода: T = 2π√(L/g) где L - длина, g - ускорение силы тяжести.',
    'pendulum.demo.more.title': 'Готовы к Большему?',
    'pendulum.demo.more.description': 'Исследуйте другие физические симуляции и углубите свое понимание.',
    'pendulum.demo.more.button': 'Посмотреть Все Симуляции',
    
    // Pendulum Simulation
    'pendulum.sim.title': 'Интерактивная Лаборатория Маятника',
    'pendulum.sim.description': 'Маятниктин кыймылын жана энергиянын сакталышын үйрөнүү үчүн расмий PhET симуляциясы.',
    'pendulum.sim.features.title': 'Симуляция Мүмкүнчүлүктөрү',
    'pendulum.sim.features.gravity': 'Көйгөйлөштүрүлгөн тартылуу күчү параметрлери',
    'pendulum.sim.features.length': 'Өзгөрүүчү маятник узундугу',
    'pendulum.sim.features.multiple': 'Көп маятниктерди колдоо',
    'pendulum.sim.features.ruler': 'Киргизилген өлчөө куралдары',
    'pendulum.sim.features.energy': 'Реалдуу убакыттагы энергия графиктери',
    'pendulum.sim.features.friction': 'Үйкөлүш жана сөнүү башкаруусу',
    'pendulum.sim.objectives.title': 'Окуу Максаттары',
    'pendulum.sim.objectives.motion': 'Жөнөкөй гармониялык кыймылды түшүнүү',
    'pendulum.sim.objectives.period': 'Мезгилдин узундукка жана тартылуу күчүнө көз каранды болушун изилдөө',
    'pendulum.sim.objectives.compare': 'Бир нече маятникти бир убакта салыштыруу',
    'pendulum.sim.objectives.damping': 'Сөнүүнүн тербелүүгө тийгизген таасирин үйрөнүү',
    'pendulum.sim.about.title': 'PhET симуляциялары жөнүндө',
    'pendulum.sim.about.desc': 'Бул симуляция Боулдердеги Колорадо университетинин PhET Interactive Simulations тарабынан камсыз кылынган. PhET математика жана жаратылыш илимдери боюнча акысыз интерактивдүү симуляцияларды түзөт, алар студенттерди изилдөө жана ачылыш аркылуу интуитивдүү, оюндуу окуу чөйрөсү аркылуу тартат.',
    'pendulum.sim.about.visit': 'PhET сайтын көрүү',
    
    // Tools
    'tools.ruler': 'Сызгыч',
    'tools.protractor': 'Транспортир',
    'tools.stopwatch': 'Секундомер',
    'tools.voltmeter': 'Вольтметр',
    'tools.measurement': 'Измерительные Инструменты',
    
    // View modes
    'mode.2d': '2D Көрүнүш',
    'mode.3d': '3D Көрүнүш',
    
    // Common UI
    'common.loading': 'Жүктөлүүдө...',
    'common.error': 'Ката',
    'common.success': 'Ийгилик',
    'common.cancel': 'Жокко чыгаруу',
    'common.save': 'Сактоо',
    'common.edit': 'Өзгөртүү',
    'common.start': 'Симуляцияны Баштоо',
    'common.delete': 'Жок кылуу',
    'common.close': 'Жабуу',
    'common.back': 'Артка',
    'common.next': 'Кийинки',
    'common.previous': 'Мурунку',
    'common.share': 'Бөлүшүү',
    'common.export': 'Экспорт',
    'common.parameters': 'Параметрлер',
    
    // Simulation Detail Page
    'sim.detail.not.found': 'Симуляция Табылбады',
    'sim.detail.not.found.desc': 'Сураган симуляция табылбады.',
    'sim.detail.back.to.sims': 'Симуляцияларга Кайтуу',
    'sim.detail.theory.title': 'Теория жана Негиздер',
    'sim.detail.learning.objectives': 'Окуу Максаттары',
    'sim.detail.categories.mechanics': 'Механика',
    'sim.detail.categories.electricity': 'Электричество',
    'sim.detail.categories.waves': 'Волны',
    'sim.detail.categories.energy': 'Энергия',
    'sim.detail.categories.chemistry': 'Химия',
    'sim.detail.difficulty.beginner': 'Начинающий',
    'sim.detail.difficulty.intermediate': 'Средний',
    'sim.detail.difficulty.advanced': 'Продвинутый',
    
    // Simulation Descriptions
    'sim.detail.pendulum.desc': 'Жөнөкөй гармониялык кыймылды настройкалануучу параметрлер менен изилдеңиз. Узундук, масса жана баштапкы бурчтун өзгөрүшү маятниктин мезгилине жана энергиясына кантип таасир эткенин байкаңыз.',
    'sim.detail.projectile.desc': 'Снаряддын кыймылын үйрөнүү үчүн PhET интерактивдүү симуляциясы. Баштапкы ылдамдыкты, запуск бурчун жөнгө салыңыз жана траекторияны, алыстыкты жана учуу убактын реалдуу убакта байкаңыз.',
    'sim.detail.ohms.desc': 'Тынчтык убакта схемаларды түзүңүз жана электрдик касиеттерди өлчөңүз. Чыңалуу, ток жана каршылыктын ортосундагы байланышты изилдеңиз.',
    'sim.detail.newtons.desc': 'Интерактивдүү сценарийлерде күчтөрдү жана кыймылды визуализациялаңыз. Ньютондун үч мыйзамын ылдамдатуу, күчтөр жана импульсту түшүнүү үчүн колдонуңуз.',
    
    // Learning Objectives
    'sim.detail.pendulum.objectives': [
      'Жөнөкөй гармониялык кыймылды түшүнүү',
      'Энергиянын сакталышын анализдөө',
      'Мезгил жана жыштыкты өлчөө',
      'Сөнүү эффекттерин изилдөө'
    ],
    'sim.detail.projectile.objectives': [
      'Снаряддын кыймылынын компоненттерин анализдөө',
      'Запуск параметрлерин оптималдаштыруу',
      'Алыстык теңдемелерин түшүнүү',
      'Аба каршылыгынын эффекттерин изилдөө'
    ],
    'sim.detail.ohms.objectives': [
      'Омдун мыйзамын V=IR колдонуу',
      'Электрдик чоңдуктарды өлчөө',
      'Жөнөкөй схемаларды түзүү',
      'Электрдик кубаттуулукту эсептөө'
    ],
    'sim.detail.newtons.objectives': [
      'Ньютондун үч мыйзамын колдонуу',
      'Күчтөрдүн векторлорун анализдөө',
      'Ылдамдатууну эсептөө',
      'Үйкөлүштүн эффекттерин изилдөө'
    ],
    
    // Theory
    'sim.detail.pendulum.theory': 'Маятник амплитуда кичине болгондо жөнөкөй гармониялык кыймылды көрсөтөт. Мезгил узундукка жана гравитациялык ылдамдатууга гана көз каранды, массага же амплитудага эмес.',
    'sim.detail.projectile.theory': 'Снаряддын кыймылы турак ылдамдыктагы горизонталдык кыймылды гравитациядан улам турак ылдамдатуудагы тик кыймыл менен айкалыштырат.',
    'sim.detail.ohms.theory': 'Омдун мыйзамы токтун өткөргүч аркылуу анын үстүндөгү чыңалууга түз пропорционалдыгын жана анын каршылыгына тескери пропорционалдыгын айтат.',
    'sim.detail.newtons.theory': 'Ньютондун мыйзамдары денеге таасир эткен күчтөр менен анын кыймылынын ортосундагы байланышты сүрөттөйт. F=ma динамиканы түшүнүү үчүн негизги болуп саналат.',
    
    // PhET Information
    'phet.info.title': 'Интерактивные Симуляции PhET',
    'phet.info.description': 'Эта симуляция предоставлена PhET Interactive Simulations Университета Колорадо в Боулдере. PhET создает бесплатные интерактивные симуляции для математического и естественнонаучного образования.',
    'phet.info.visit': 'Посетить сайт PhET',
    
    // Physics Lessons
    'physics.chapters.mechanics.title': 'Механика',
    'physics.chapters.mechanics.description': 'Основы кинематики, динамики и статики',
    'physics.chapters.molecular.title': 'Молекулалык-кинетикалык теория',
    'physics.chapters.molecular.description': 'Молекулалык физика жана термодинамиканын негиздери',
    'physics.chapters.electromagnetism.title': 'Электромагнетизм',
    'physics.chapters.electromagnetism.description': 'Электростатика, электр тогу жана магниттик көрүнүштөр',
    
    'physics.difficulty.beginner': 'Начинающий',
    'physics.difficulty.intermediate': 'Средний',
    'physics.difficulty.advanced': 'Продвинутый',
    
    'physics.lesson.preview.title': 'Предварительный просмотр урока',
    'physics.lesson.topics.title': 'Изучаемые темы',
    'physics.lesson.simulation.title': 'Интерактивная симуляция',
    'physics.lesson.simulation.button': 'Открыть симуляцию',
    'physics.lesson.start.button': 'Начать урок',
    'physics.lesson.theory.button': 'Изучить теорию',
    
    // Specific lesson previews
    'physics.lessons.3.preview': 'Изучите основы движения точечных частиц и твердых тел. Понимание положения, скорости и ускорения.',
    'physics.lessons.3.topic1': 'Движение материальной точки',
    'physics.lessons.3.topic2': 'Движение твердого тела',
    'physics.lessons.3.topic3': 'Системы координат',
    'physics.lessons.3.simulation': 'Интерактивная визуализация движения с отслеживанием позиции',
    
    'physics.lessons.84.preview': 'Откройте для себя фундаментальные свойства электрического заряда и элементарных частиц в электростатике.',
    'physics.lessons.84.topic1': 'Элементарный заряд',
    'physics.lessons.84.topic2': 'Сохранение заряда',
    'physics.lessons.84.topic3': 'Электрические поля',
    'physics.lessons.84.simulation': 'Симулятор взаимодействия зарядов',
    
    'physics.lessons.87.preview': 'Изучите закон Кулона - фундаментальный закон, управляющий электрической силой между заряженными частицами.',
    'physics.lessons.87.topic1': 'Формула закона Кулона',
    'physics.lessons.87.topic2': 'Вычисления электрической силы',
    'physics.lessons.87.topic3': 'Принцип суперпозиции',
    'physics.lessons.87.simulation': 'Калькулятор силы Кулона',
    
    'physics.lessons.default.preview': 'Интерактивдүү мисалдар жана практикалык колдонуулар менен физиканын негизги концепцияларын камтыган комплекстүү сабак.',
    'physics.lessons.default.topic1': 'Теориялык негиздер',
    'physics.lessons.default.topic2': 'Практикалык колдонуулар',
    'physics.lessons.default.topic3': 'Маселе чечүү',
    'physics.lessons.default.simulation': 'Физиканын интерактивдүү демонстрациясы',
    
  },
  ky: {
    // Navigation
    'nav.home': 'Башкы бет',
    'nav.simulations': 'Симуляциялар',
    'nav.lessons': 'Онлайн Сабактар',
    'nav.whiteboard': 'Whiteboard',
    'nav.get.started': 'Баштоо',
    'nav.subtitle': 'STEM Билим Берүү Платформасы',
    
    // Hero Section
    'hero.made.for': 'Кыргызстан үчүн жасалган',
    'hero.title.part1': 'Физиканы',
    'hero.title.part2': 'Үйрөнүңүз',
    'hero.title.part3': 'Интерактивдүү Окуу Аркылуу',
    'hero.description': 'Кыргызстандын студенттери жана мугалимдери үчүн атайын иштелип чыккан практикалык симуляциялар, интерактивдүү доскалар жана визуалдык окуу куралдары аркылуу физиканын кызыктуу дүйнөсүн ачыңыз.',
    'hero.start.learning': 'Окууну Баштоо',
    'hero.view.simulations': 'Симуляцияларды Көрүү',
    'hero.try.pendulum': 'Маятник Демосун Сыноо',
    
    // New Homepage Sections
    'hero.badge': '🚀 STEM билиминде революция',
    'hero.title.skillspark': 'SkillSpark',
    'hero.title.kg': 'KG',
    'hero.subtitle': 'Кыргызстанда илимдерди үйрөнүү үчүн интерактивдүү симуляциялар, жекече окуу жана цифралык куралдар',
    'hero.button.explore': 'Изилдөөнү баштоо',
    'hero.button.lessons': 'Онлайн сабактар',
    
    // Quick Actions
    'quick.actions.simulations': 'Симуляциялар',
    'quick.actions.simulations.desc': 'Интерактивдүү физикалык эксперименттер',
    'quick.actions.whiteboard': 'Доска',
    'quick.actions.whiteboard.desc': 'Визуалдык окуу куралдары',
    'quick.actions.lessons': 'Сабактар',
    'quick.actions.lessons.desc': 'Структураланган окуу',
    
    // Stats Section
    'stats.title': 'Платформа статистикасы',
    'stats.students.count': 'Студенттер',
    'stats.teachers.count': 'Мугалимдер',
    'stats.simulations.count': 'Симуляциялар',
    'stats.lessons.count': 'Сабактар',
    
    // Features Section
    'features.title': 'Эмне үчүн SkillSpark тандалат?',
    'features.interactive.title': 'Интерактивдүү окуу',
    'features.interactive.desc': 'Практикалык эксперименттер жана дароо жооп',
    'features.visual.title': 'Визуалдык түшүнүү',
    'features.visual.desc': 'Татаал концепциялар визуализация аркылуу жөнөкөй болот',
    'features.personalized.title': 'Жекече жол',
    'features.personalized.desc': 'Сиздин темпке ылайыкталган адаптивдүү окуу',
    'features.accessible.title': 'Ар дайым жеткиликтүү',
    'features.accessible.desc': 'Офлайн жетүү менен каалаган жерде, каалаган убакта үйрөнүңүз',
    
    // Technologies Section
    'technologies.title': 'Эң сонун технологиялар',
    'technologies.ar.title': 'Кошумча чындык',
    'technologies.ar.desc': 'Чындык дүйнөдө 3D модельдер',
    'technologies.vr.title': 'Виртуалдык чындык',
    'technologies.vr.desc': 'Чөмөлдүү окуу тажрыйбалары',
    'technologies.ai.title': 'Жасандык интеллект',
    'technologies.ai.desc': 'Акылдуу окуу сунуштары',
    'technologies.cloud.title': 'Булуттук эсептөө',
    'technologies.cloud.desc': 'Масштабдануучу жана ишенимдүү платформа',
    
    // Mission Section
    'mission.title': 'Биздин милдет',
    'mission.description': 'Биз Кыргызстандагы ар бир студент жана мугалим үчүн STEM билимин жеткиликтүү, натыйжалуу жана кызыктуу кылууга багытталбыз.',
    'mission.accessible.title': 'Жеткиликтүү билим',
    'mission.accessible.description': 'Кыргызстандагы бардык студенттер үчүн акысыз, ачык ресурстар менен сапаттуу STEM билимине болгон тоскоолдуктарды жок кылуу.',
    'mission.effective.title': 'Натыйжалуу окуу',
    'mission.effective.description': 'Татаал концепцияларды түшүнүүнү жана эстеп калууну жеңилдетүү үчүн интерактивдүү симуляциялар жана визуалдык куралдарды колдонуу.',
    'mission.engaging.title': 'Кызыктуу мазмун',
    'mission.engaging.description': 'Салттуу окууну кызыктуу жана кызыгуу менен ачылышты шыктандырган практикалык тажрыйбага айландыруу.',
    'mission.local.title': 'Жергиликтүү таасир',
    'mission.local.description': 'Жергиликтүү муктаждыктар жана контекстти эске алып иштелип чыккан ресурстар менен Кыргызстандын мугалимдери менен студенттерин колдоо.',
    
    // Achievements Section
    'achievements.title': 'Биздин жетишкендиктер',
    'achievements.students.title': 'Активдүү студенттер',
    'achievements.students.desc': 'Платформаны активдүү колдонгон студенттер',
    'achievements.teachers.title': 'Мугалимдер',
    'achievements.teachers.desc': 'Биздин куралдарды колдонгон педагогдор',
    'achievements.schools.title': 'Мектептер',
    'achievements.schools.desc': 'Жетишкен билим берүү мекемелери',
    'achievements.lessons.title': 'Түзүлгөн сабактар',
    'achievements.lessons.desc': 'Иштелип чыккан билим берүү мазмуну',
    
    // Final CTA Section
    'final.cta.title': 'Окууңузду өзгөртүүгө даярсызбы?',
    'final.cta.description': 'Өздөрүнүн STEM билимин жакшыртуу үчүн SkillSpark колдонуп жаткан миңдеген студенттер менен мугалимдерге кошулуңуз.',
    'final.cta.button': 'Азыр баштоо',
    'final.cta.button.secondary': 'Көбүрөөк билүү',
    
    'stats.students': 'Студенттер',
    'stats.free': 'Акысыз',
    'stats.interactive': 'Интерактивдүү',
    
    // Simulations Page
    'sims.page.title': 'Интерактивдүү Симуляциялар',
    'sims.page.subtitle': 'Изилдеңиз, Үйрөнүңүз, Ачыңыз',
    'sims.page.description': 'Ар түрдүү предметтер боюнча практикалык интерактивдүү симуляциялар аркылуу илимий концепцияларга терең кириңиз',
    'sims.page.physics': 'Физика',
    'sims.page.physics.desc': 'Күчтөрдү, кыймылды жана табияттын фундаменталдуу мыйзамдарын үйрөнүү',
    'sims.page.chemistry': 'Химия',
    'sims.page.chemistry.desc': 'Заттардын касиеттерин жана өзгөрүүлөрүн изилдөө',
    'sims.page.biology': 'Биология',
    'sims.page.biology.desc': 'Жашоо процесстерин жана биологиялык системаларды ачып көрүү',
    'sims.page.astronomy': 'Астрономия',
    'sims.page.astronomy.desc': 'Космос жана асман объекттери аркылуу саякат',
    'sims.page.mathematics': 'Математика',
    'sims.page.mathematics.desc': 'Математикалык концепцияларды жана теңдемелерди визуализациялоо',
    'sims.page.innovations': 'Инновациялар',
    'sims.page.innovations.desc': 'Билим берүүдөгү алдыңкы технологиялар',
    'sims.difficulty.beginner': 'Башталгыч',
    'sims.difficulty.intermediate': 'Орточо',
    'sims.difficulty.advanced': 'Алдыңкы',
    'sims.card.explore': 'Симуляцияны Изилдөө',
    'sims.card.simulations': 'симуляциялар',
    'sims.card.launch': 'Иштетүү',
    'sims.cta.title': 'Илимий ачылыштарга даярсызбы?',
    'sims.cta.description': 'Каалаган симуляцияны тандап, илимдин укмуштуу дүйнөсүн изилдей баштаңыз. Ар бир симуляция окууну кызыктуу жана түшүнүктүү кылуу үчүн түзүлгөн.',
    'sims.cta.start': 'Изилдөөнү Баштоо',
    'sims.cta.browse': 'Бардык Симуляциялар',
    
    // Online Lessons Page
    'lessons.page.title': 'Илимдер боюнча Онлайн Сабактар',
    'lessons.page.subtitle': 'Эксперттер менен Окуу',
    'lessons.page.description': 'Эксперт мугалимдер жана интерактивдүү материалдар менен түзүлгөн онлайн сабактар аркылуу илимий концепцияларды үйрөнүңүз',
    'lessons.subject.physics': 'Физика',
    'lessons.subject.physics.desc': 'Материя, энергия жана алардын өз ара аракеттешүүсүн үйрөнүү',
    'lessons.subject.mathematics': 'Математика',
    'lessons.subject.mathematics.desc': 'Илимдердин королевасы - алгебра, геометрия, талдоо',
    'lessons.subject.chemistry': 'Химия',
    'lessons.subject.chemistry.desc': 'Заттарды жана алардын өзгөрүүлөрүн изилдөө',
    'lessons.subject.biology': 'Биология',
    'lessons.subject.biology.desc': 'Изучение живых организмов и жизненных процессов',
    'lessons.subject.astronomy': 'Астрономия',
    'lessons.subject.astronomy.desc': 'Космос жана асман денелери аркылуу саякат',
    'lessons.subject.computer': 'Информатика',
    'lessons.subject.computer.desc': 'Программалоо, алгоритмдер жана санарип технологиялар',
    'lessons.card.lessons': 'сабак',
    'lessons.card.hours': 'саат',
    'lessons.card.difficulty': 'Татаалдык',
    'lessons.card.explore': 'Explore Course',
    'lessons.difficulty.beginner': 'Башталгыч',
    'lessons.difficulty.intermediate': 'Орточо',
    'lessons.difficulty.advanced': 'Алдыңкы',
    'lessons.status.active': 'Активдүү',
    'lessons.status.soon': 'Скоро',
    'lessons.stats.subjects': 'Предметов',
    'lessons.stats.lessons': 'Уроков',
    'lessons.stats.hours': 'Часов обучения',
    'lessons.stats.experts': 'Экспертов-преподавателей',
    'lessons.buttons.start': 'Начать обучение',
    'lessons.buttons.coming': 'Скоро будет доступно',
    'lessons.cta.title': 'Готовы к обучению?',
    'lessons.cta.description': 'Начните с физики - первого доступного предмета, или подпишитесь на уведомления о запуске других курсов',
    'lessons.cta.start.physics': 'Начать физику',
    'lessons.cta.notify': 'Мага кабарла',
    
    // AI Assistant
    'ai.title': 'ИИ Жардамчы',
    'ai.welcome': 'Салам! Мен сиздин физика боюнча ИИ-жардамчыңыз. Физикалык мыйзамдар, формулалар же концепциялар тууралуу суроолорду бериңиз, мен аларды жөнөкөй тил менен түшүндүрүүгө аракет кылам! 🚀',
    'ai.quick.prompts': 'Тез суроолор',
    'ai.thinking': 'ИИ ойлонуп жатат...',
    'ai.input.placeholder': 'Физика тууралуу суроо бериңиз...',
    'ai.prompts.newton': 'Ньютондун мыйзамын жөнөкөй тил менен түшүндүр',
    'ai.prompts.gravity': 'Ауурлук деген эмне?',
    'ai.prompts.electricity': 'Электр кантип иштейт?',
    'ai.prompts.quantum': 'Кванттык физиканы түшүндүр',
    'ai.prompts.energy': 'Энергия деген эмне?',
    'ai.prompts.magnetism': 'Магнетизм кантип иштейт?',
    
    // Simulations Section
    'sims.section.subtitle': 'Интерактивдүү Окуу',
    'sims.section.title': 'Физика Симуляциялары',
    'sims.section.description': 'Татаал физикалык концепцияларды интерактивдүү 2D жана 3D симуляциялар аркылуу изилдеңиз. Өзгөрмөлөрдү башкарыңыз, натыйжаларды байкаңыз жана көрүнүштөрдүн артындагы илимди түшүнүңүз.',
    'sims.section.tools.title': 'Киргизилген Өлчөө Куралдары',
    'sims.section.button': 'Симуляцияларды Сыноо',
    
    // Interactive Lab Cards
    'sims.lab.title': 'Интерактивдүү Лаборатория',
    'sims.lab.description': 'Эксперименты в реальном времени с живыми данными и мгновенной обратной связью',
    'sims.lab.features': ['Живые датчики', 'Графики в реальном времени', 'Мгновенный анализ', 'Экспорт данных'],
    'sims.lab.difficulty': 'Начинающий',
    'sims.lab.category': 'Лаборатория',
    
    'sims.molecule.title': '3D Конструктор Молекул',
    'sims.molecule.description': 'Создавайте и исследуйте молекулярные структуры в 3D пространстве',
    'sims.molecule.features': ['3D вращение', 'Создание связей', 'Анализ структуры', 'Химические инструменты'],
    'sims.molecule.difficulty': 'Средний',
    'sims.molecule.category': 'Chemistry',
    
    'sims.wave.title': 'Симуляция Волн',
    'sims.wave.description': 'Создавайте красивые волновые узоры и изучайте интерференцию',
    'sims.wave.features': ['Генерация волн', 'Интерференционные узоры', 'Контроль частоты', 'Визуальные эффекты'],
    'sims.wave.difficulty': 'Начинающий',
    'sims.wave.category': 'Волны',
    
    'sims.energy.title': 'Энергетический Лабиринт',
    'sims.energy.description': 'Навигация через энергетические поля и изучение законов сохранения',
    'sims.energy.features': ['Энергетические поля', 'Навигация частиц', 'Законы сохранения', 'Игровая механика'],
    'sims.energy.difficulty': 'Средний',
    'sims.energy.category': 'Энергия',
    
    // Interactive Features
    'sims.features.live.data': 'Живые Данные',
    'sims.features.real.time': 'Реалдуу Убакыт',
    'sims.features.3d.space': '3D Пространство',
    'sims.features.interactive': 'Интерактивно',
    'sims.features.beautiful': 'Красиво',
    'sims.features.patterns': 'Узоры',
    'sims.features.game.mode': 'Игровой Режим',
    'sims.features.adventure': 'Приключение',
    
    // Whiteboard Section
    'whiteboard.subtitle': 'Визуалдык Окуу',
    'whiteboard.title': 'Интерактивдүү Доска',
    'whiteboard.description': 'Мугалимдер классто колдоно турган же студенттер өздөрү үчүн түзө турган жөнөкөй, визуалдык түшүндүрмөлөр. Диаграммаларды тартыңыз, концепцияларды белгилеңиз жана татаал идеяларды визуализациялаңыз.',
    'whiteboard.tools.title': 'Күчтүү Сүрөт Тартуу Куралдары',
    'whiteboard.pen.name': 'Сүрөт Тартуу Куралдары',
    'whiteboard.pen.desc': 'Көптөгөн калем өлчөмдөрү жана стилдери',
    'whiteboard.color.name': 'Түс Палитрасы',
    'whiteboard.color.desc': 'Highlight different concepts',
    'whiteboard.eraser.name': 'Умный Ластик',
    'whiteboard.eraser.desc': 'Precise editing capabilities',
    'whiteboard.export.name': 'Export Options',
    'whiteboard.export.desc': 'Save and share diagrams',
    'whiteboard.start': 'Start Drawing',
    
    // Usage Scenarios Section
    'usage.title': 'Множество Способов Обучения',
    'usage.description': 'Будь вы учитель, проводящий урок, ученик, изучающий дома, или кто-то, изучающий STEM самостоятельно - мы поможем вам.',
    'usage.classroom.title': 'В Классе',
    'usage.classroom.subtitle': 'Для Учителей',
    'usage.classroom.description': 'Используйте интерактивные симуляции для демонстрации сложных физических концепций. Проецируйте объяснения на доске, чтобы помочь ученикам визуализировать проблемы.',
    'usage.home.title': 'Дома',
    'usage.home.subtitle': 'Для Учеников',
    'usage.home.description': 'Практикуйтесь с симуляциями и создавайте визуальные заметки. Получайте доступ ко всему контенту офлайн для изучения без подключения к интернету.',
    'usage.selfstudy.title': 'Самостоятельное Изучение',
    'usage.selfstudy.subtitle': 'Independent Learning',
    'usage.selfstudy.description': 'Explore concepts at your own pace. Use visual tools to understand difficult topics and prepare for exams.',
    
    // Simulations Page
    'simulations.subtitle': 'Интерактивное Обучение',
    'simulations.title': 'Физика Симуляциялары',
    'simulations.description': 'Изучайте сложные физические концепции через интерактивные 2D и 3D симуляции.',
    'simulations.tools.description': 'Каждая симуляция включает профессиональные инструменты измерения: линейки, транспортиры, секундомеры и многое другое',
    'simulation.pendulum': 'Движение Маятника',
    'simulation.projectile': 'Движение Снаряда',
    'simulation.ohms': 'Закон Ома',
    'simulation.newtons': 'Законы Ньютона',
    
    // Pendulum Demo Page
    'pendulum.demo.back': 'Назад на Главную',
    'pendulum.demo.subtitle': 'Интерактивная Демонстрация Физики',
    'pendulum.demo.title': 'Симуляция Движения Маятника',
    'pendulum.demo.description': 'Исследуйте увлекательный мир колебательного движения с нашей интерактивной симуляцией маятника.',
    'pendulum.demo.learn.title': 'Что Вы Изучите',
    'pendulum.demo.learn.motion': 'Принципы простого гармонического движения',
    'pendulum.demo.learn.energy': 'Сохранение энергии между кинетической и потенциальной',
    'pendulum.demo.learn.period': 'Как период зависит от длины и гравитации',
    'pendulum.demo.learn.damping': 'Влияние затухания на движение',
    'pendulum.demo.usage.title': 'Как Использовать',
    'pendulum.demo.usage.drag': 'Перетащите красный шарик для установки угла',
    'pendulum.demo.usage.play': 'Нажмите Старт для запуска симуляции',
    'pendulum.demo.usage.adjust': 'Настройте ползунки для изменения параметров',
    'pendulum.demo.usage.watch': 'Следите за энергетическими шкалами для данных в реальном времени',
    'pendulum.demo.physics.title': 'Физические Концепции',
    'pendulum.demo.physics.shm': 'Простое Гармоническое Движение: Маятник колеблется взад и вперед с периодом, который зависит только от длины и гравитации.',
    'pendulum.demo.physics.energy': 'Сохранение Энергии: Общая механическая энергия остается постоянной, превращаясь между кинетической и потенциальной формами.',
    'pendulum.demo.physics.formula': 'Формула Периода: T = 2π√(L/g) где L - длина, g - ускорение силы тяжести.',
    'pendulum.demo.more.title': 'Готовы к Большему?',
    'pendulum.demo.more.description': 'Исследуйте другие физические симуляции и углубите свое понимание.',
    'pendulum.demo.more.button': 'Посмотреть Все Симуляции',
    
    // Pendulum Simulation
    'pendulum.sim.title': 'Интерактивная Лаборатория Маятника',
    'pendulum.sim.description': 'Маятниктин кыймылын жана энергиянын сакталышын үйрөнүү үчүн расмий PhET симуляциясы.',
    'pendulum.sim.features.title': 'Симуляция Мүмкүнчүлүктөрү',
    'pendulum.sim.features.gravity': 'Көйгөйлөштүрүлгөн тартылуу күчү параметрлери',
    'pendulum.sim.features.length': 'Өзгөрүүчү маятник узундугу',
    'pendulum.sim.features.multiple': 'Көп маятниктерди колдоо',
    'pendulum.sim.features.ruler': 'Киргизилген өлчөө куралдары',
    'pendulum.sim.features.energy': 'Реалдуу убакыттагы энергия графиктери',
    'pendulum.sim.features.friction': 'Үйкөлүш жана сөнүү башкаруусу',
    'pendulum.sim.objectives.title': 'Окуу Максаттары',
    'pendulum.sim.objectives.motion': 'Жөнөкөй гармониялык кыймылды түшүнүү',
    'pendulum.sim.objectives.period': 'Мезгилдин узундукка жана тартылуу күчүнө көз каранды болушун изилдөө',
    'pendulum.sim.objectives.compare': 'Бир нече маятникти бир убакта салыштыруу',
    'pendulum.sim.objectives.damping': 'Сөнүүнүн тербелүүгө тийгизген таасирин үйрөнүү',
    'pendulum.sim.about.title': 'PhET симуляциялары жөнүндө',
    'pendulum.sim.about.desc': 'Бул симуляция Боулдердеги Колорадо университетинин PhET Interactive Simulations тарабынан камсыз кылынган. PhET математика жана жаратылыш илимдери боюнча акысыз интерактивдүү симуляцияларды түзөт, алар студенттерди изилдөө жана ачылыш аркылуу интуитивдүү, оюндуу окуу чөйрөсү аркылуу тартат.',
    'pendulum.sim.about.visit': 'PhET сайтын көрүү',
    
    // Tools
    'tools.ruler': 'Сызгыч',
    'tools.protractor': 'Транспортир',
    'tools.stopwatch': 'Секундомер',
    'tools.voltmeter': 'Вольтметр',
    'tools.measurement': 'Измерительные Инструменты',
    
    // View modes
    'mode.2d': '2D Көрүнүш',
    'mode.3d': '3D Көрүнүш',
    
    // Common UI
    'common.loading': 'Жүктөлүүдө...',
    'common.error': 'Ката',
    'common.success': 'Ийгилик',
    'common.cancel': 'Жокко чыгаруу',
    'common.save': 'Сактоо',
    'common.edit': 'Өзгөртүү',
    'common.start': 'Симуляцияны Баштоо',
    'common.delete': 'Жок кылуу',
    'common.close': 'Жабуу',
    'common.back': 'Артка',
    'common.next': 'Кийинки',
    'common.previous': 'Мурунку',
    'common.share': 'Бөлүшүү',
    'common.export': 'Экспорт',
    'common.parameters': 'Параметрлер',
    
    // Simulation Detail Page
    'sim.detail.not.found': 'Симуляция Табылбады',
    'sim.detail.not.found.desc': 'Сураган симуляция табылбады.',
    'sim.detail.back.to.sims': 'Симуляцияларга Кайтуу',
    'sim.detail.theory.title': 'Теория жана Негиздер',
    'sim.detail.learning.objectives': 'Окуу Максаттары',
    'sim.detail.categories.mechanics': 'Механика',
    'sim.detail.categories.electricity': 'Электричество',
    'sim.detail.categories.waves': 'Волны',
    'sim.detail.categories.energy': 'Энергия',
    'sim.detail.categories.chemistry': 'Химия',
    'sim.detail.difficulty.beginner': 'Начинающий',
    'sim.detail.difficulty.intermediate': 'Средний',
    'sim.detail.difficulty.advanced': 'Продвинутый',
    
    // Simulation Descriptions
    'sim.detail.pendulum.desc': 'Жөнөкөй гармониялык кыймылды настройкалануучу параметрлер менен изилдеңиз. Узундук, масса жана баштапкы бурчтун өзгөрүшү маятниктин мезгилине жана энергиясына кантип таасир эткенин байкаңыз.',
    'sim.detail.projectile.desc': 'Снаряддын кыймылын үйрөнүү үчүн PhET интерактивдүү симуляциясы. Баштапкы ылдамдыкты, запуск бурчун жөнгө салыңыз жана траекторияны, алыстыкты жана учуу убактын реалдуу убакта байкаңыз.',
    'sim.detail.ohms.desc': 'Тынчтык убакта схемаларды түзүңүз жана электрдик касиеттерди өлчөңүз. Чыңалуу, ток жана каршылыктын ортосундагы байланышты изилдеңиз.',
    'sim.detail.newtons.desc': 'Интерактивдүү сценарийлерде күчтөрдү жана кыймылды визуализациялаңыз. Ньютондун үч мыйзамын ылдамдатуу, күчтөр жана импульсту түшүнүү үчүн колдонуңуз.',
    
    // Learning Objectives
    'sim.detail.pendulum.objectives': [
      'Жөнөкөй гармониялык кыймылды түшүнүү',
      'Энергиянын сакталышын анализдөө',
      'Мезгил жана жыштыкты өлчөө',
      'Сөнүү эффекттерин изилдөө'
    ],
    'sim.detail.projectile.objectives': [
      'Снаряддын кыймылынын компоненттерин анализдөө',
      'Запуск параметрлерин оптималдаштыруу',
      'Алыстык теңдемелерин түшүнүү',
      'Аба каршылыгынын эффекттерин изилдөө'
    ],
    'sim.detail.ohms.objectives': [
      'Омдун мыйзамын V=IR колдонуу',
      'Электрдик чоңдуктарды өлчөө',
      'Жөнөкөй схемаларды түзүү',
      'Электрдик кубаттуулукту эсептөө'
    ],
    'sim.detail.newtons.objectives': [
      'Ньютондун үч мыйзамын колдонуу',
      'Күчтөрдүн векторлорун анализдөө',
      'Ылдамдатууну эсептөө',
      'Үйкөлүштүн эффекттерин изилдөө'
    ],
    
    // Theory
    'sim.detail.pendulum.theory': 'Маятник амплитуда кичине болгондо жөнөкөй гармониялык кыймылды көрсөтөт. Мезгил узундукка жана гравитациялык ылдамдатууга гана көз каранды, массага же амплитудага эмес.',
    'sim.detail.projectile.theory': 'Снаряддын кыймылы турак ылдамдыктагы горизонталдык кыймылды гравитациядан улам турак ылдамдатуудагы тик кыймыл менен айкалыштырат.',
    'sim.detail.ohms.theory': 'Омдун мыйзамы токтун өткөргүч аркылуу анын үстүндөгү чыңалууга түз пропорционалдыгын жана анын каршылыгына тескери пропорционалдыгын айтат.',
    'sim.detail.newtons.theory': 'Ньютондун мыйзамдары денеге таасир эткен күчтөр менен анын кыймылынын ортосундагы байланышты сүрөттөйт. F=ma динамиканы түшүнүү үчүн негизги болуп саналат.',
    
    // PhET Information
    'phet.info.title': 'PhET Интерактивдүү Симуляциялары',
    'phet.info.description': 'Бул симуляция Боулдердеги Колорадо университетинин PhET Interactive Simulations тарабынан камсыз кылынган. PhET математика жана жаратылыш илимдери боюнча акысыз интерактивдүү симуляцияларды түзөт.',
    'phet.info.visit': 'PhET сайтын көрүү',
    
    // Physics Lessons
    'physics.chapters.mechanics.title': 'Механика',
    'physics.chapters.mechanics.description': 'Кинематика, динамика жана статиканын негиздери',
    'physics.chapters.molecular.title': 'Молекулалык-кинетикалык теория',
    'physics.chapters.molecular.description': 'Молекулалык физика жана термодинамиканын негиздери',
    'physics.chapters.electromagnetism.title': 'Электромагнетизм',
    'physics.chapters.electromagnetism.description': 'Электростатика, электр тогу жана магниттик көрүнүштөр',
    
    'physics.difficulty.beginner': 'Начинающий',
    'physics.difficulty.intermediate': 'Средний',
    'physics.difficulty.advanced': 'Продвинутый',
    
    'physics.lesson.preview.title': 'Сабактын алдын ала көрүнүшү',
    'physics.lesson.topics.title': 'Үйрөнүлүүчү темалар',
    'physics.lesson.simulation.title': 'Интерактивдүү симуляция',
    'physics.lesson.simulation.button': 'Симуляцияны ачуу',
    'physics.lesson.start.button': 'Сабакты баштоо',
    'physics.lesson.theory.button': 'Теорияны көрүү',
    
    // Specific lesson previews
    'physics.lessons.3.preview': 'Чекиттик бөлүкчөлөр жана катуу денелердин кыймылынын негиздерин үйрөнүңүз. Жайгашуу, ылдамдык жана ылдамдатууну түшүнүү.',
    'physics.lessons.3.topic1': 'Материалдык чекиттин кыймылы',
    'physics.lessons.3.topic2': 'Катуу дененин кыймылы',
    'physics.lessons.3.topic3': 'Координаталар системасы',
    'physics.lessons.3.simulation': 'Интерактивная визуализация движения с отслеживанием позиции',
    
    'physics.lessons.84.preview': 'Электростатикада электрдик заряддын жана элементардык бөлүкчөлөрдүн фундаменталдык касиеттерин ачыңыз.',
    'physics.lessons.84.topic1': 'Элементардык заряд',
    'physics.lessons.84.topic2': 'Сохранение заряда',
    'physics.lessons.84.topic3': 'Электрические поля',
    'physics.lessons.84.simulation': 'Симулятор взаимодействия зарядов',
    
    'physics.lessons.87.preview': 'Кулондун мыйзамын үйрөнүңүз - зарядалган бөлүкчөлөрдүн ортосундагы электрдик күчтү башкарган фундаменталдык мыйзам.',
    'physics.lessons.87.topic1': 'Кулондун мыйзамынын формуласы',
    'physics.lessons.87.topic2': 'Электрдик күчтү эсептөө',
    'physics.lessons.87.topic3': 'Принцип суперпозиции',
    'physics.lessons.87.simulation': 'Калькулятор силы Кулона',
    
    'physics.lessons.default.preview': 'Интерактивдүү мисалдар жана практикалык колдонуулар менен физиканын негизги концепцияларын камтыган комплекстүү сабак.',
    'physics.lessons.default.topic1': 'Теориялык негиздер',
    'physics.lessons.default.topic2': 'Практикалык колдонуулар',
    'physics.lessons.default.topic3': 'Маселе чечүү',
    'physics.lessons.default.simulation': 'Физиканын интерактивдүү демонстрациясы',
    
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};