// DeltaYurt Types - Live Classroom System

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'student';
  avatar?: string;
  classCode?: string; // For students
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Class {
  id: string;
  name: string;
  classCode: string;
  teacherId: string;
  students: string[]; // student IDs
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

export interface Simulation {
  id: string;
  name: string;
  type: 'pendulum' | 'projectile' | 'ohm' | 'newton';
  defaultParams: SimulationParams;
  description: string;
}

export interface SimulationParams {
  // Pendulum
  length?: number;
  mass?: number;
  initialAngle?: number;
  damping?: number;
  // Projectile
  velocity?: number;
  angle?: number;
  gravity?: number;
  // Ohm's Law
  voltage?: number;
  resistance?: number;
  current?: number;
  // Newton's Laws
  force?: number;
  acceleration?: number;
  mass?: number;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  type: 'mcq' | 'input' | 'interactive' | 'coding';
  payload: HomeworkPayload;
  teacherId: string;
  classId: string;
  dueDate: string;
  createdAt: string;
  isPublished: boolean;
}

export interface HomeworkPayload {
  // MCQ
  questions?: MCQQuestion[];
  // Input/Math
  questions?: InputQuestion[];
  // Interactive
  simulationId?: string;
  criteria?: InteractiveCriteria[];
  // Coding
  problem?: string;
  language?: string;
  testCases?: TestCase[];
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface InputQuestion {
  id: string;
  question: string;
  type: 'number' | 'text' | 'math';
  answer?: string | number;
  tolerance?: number;
  regex?: string;
  points: number;
}

export interface InteractiveCriteria {
  id: string;
  description: string;
  checkFunction: string; // JavaScript function as string
  points: number;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  points: number;
}

export interface Submission {
  id: string;
  homeworkId: string;
  studentId: string;
  answers: SubmissionAnswer[];
  submittedAt: string;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
  isGraded: boolean;
}

export interface SubmissionAnswer {
  questionId: string;
  answer: any; // Can be string, number, object, etc.
  isCorrect?: boolean;
  points?: number;
}

// Socket.IO Event Types
export interface SocketEvents {
  // Client -> Server
  register_user: (data: { user: User }) => void;
  teacher_create_class: (data: { teacherId: string; name: string }) => void;
  join_class: (data: { studentId: string; classCode: string }) => void;
  teacher_start_lesson: (data: { teacherId: string; classCode: string; lessonId: string }) => void;
  teacher_present_simulation: (data: { teacherId: string; classCode: string; simId: string; simParams: SimulationParams }) => void;
  teacher_stop_presentation: (data: { teacherId: string; classCode: string }) => void;
  new_homework: (data: { teacherId: string; classCode: string; homework: Homework }) => void;
  submit_homework: (data: { studentId: string; homeworkId: string; submission: Submission }) => void;
  grade_submission: (data: { teacherId: string; homeworkId: string; submissionId: string; score: number; feedback: string }) => void;
  request_help: (data: { studentId: string; classCode: string; message: string }) => void;
  ping: () => void;
  
  // Server -> Client
  new_student_joined: (data: { student: User }) => void;
  presentation_simulation_update: (data: { simId: string; simParams: SimulationParams; byTeacherId: string }) => void;
  homework_published: (data: { homework: Homework }) => void;
  homework_submitted: (data: { homeworkId: string; submission: Submission }) => void;
  submission_graded: (data: { homeworkId: string; submissionId: string; score: number; feedback: string }) => void;
  class_state: (data: { class: Class; students: User[]; lessons: Lesson[]; homeworks: Homework[] }) => void;
  pong: () => void;
}

// Store Types
export interface UserStore {
  currentUser: User | null;
  token: string | null;
  registerLocal: (user: User) => void;
  loginLocal: (email: string, password: string, role: 'teacher' | 'student', name: string, classCode?: string) => Promise<boolean>;
  logout: () => void;
}

export interface ClassStore {
  currentClass: Class | null;
  students: User[];
  lessons: Lesson[];
  homeworks: Homework[];
  classCode: string | null;
  joinClass: (code: string) => Promise<boolean>;
  leaveClass: () => void;
  fetchClass: (code: string) => Promise<void>;
  onNewStudent: (student: User) => void;
  onHomeworkPublished: (homework: Homework) => void;
}

export interface HomeworkStore {
  homeworks: Homework[];
  submissions: Submission[];
  publishHomework: (homework: Homework) => void;
  submitHomework: (homeworkId: string, submission: Omit<Submission, 'id' | 'submittedAt' | 'isGraded'>) => Promise<void>;
  gradeSubmission: (homeworkId: string, submissionId: string, score: number, feedback: string) => Promise<void>;
  getSubmissionsForHomework: (homeworkId: string) => Submission[];
}

export interface SocketStore {
  socket: any | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  emit: <K extends keyof SocketEvents>(event: K, data: Parameters<SocketEvents[K]>[0]) => void;
  on: <K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]) => void;
  off: <K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]) => void;
}
