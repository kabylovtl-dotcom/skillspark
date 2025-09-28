import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { seedData } from './seed';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'student';
  avatar?: string;
  classCode?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

interface Class {
  id: string;
  name: string;
  classCode: string;
  teacherId: string;
  students: string[];
  createdAt: string;
  isLive?: boolean;
  currentLessonId?: string;
}

interface Lesson {
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

interface Homework {
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

interface Submission {
  id: string;
  homeworkId: string;
  studentId: string;
  answers: any[];
  submittedAt: string;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
  isGraded: boolean;
}

// In-memory stores
const users: Record<string, User> = {};
const classes: Record<string, Class> = {};
const lessons: Record<string, Lesson> = {};
const homeworks: Record<string, Homework> = {};
const submissions: Record<string, Submission> = {};
const connectedUsers: Set<string> = new Set();

// Express app
const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// REST API Endpoints
app.get('/api/classes/:code', (req, res) => {
  const { code } = req.params;
  const classData = Object.values(classes).find(c => c.classCode === code);
  
  if (!classData) {
    return res.status(404).json({ error: 'Class not found' });
  }
  
  const classStudents = classData.students.map(id => users[id]).filter(Boolean);
  const classLessons = Object.values(lessons).filter(l => l.classId === classData.id);
  const classHomeworks = Object.values(homeworks).filter(h => h.classId === classData.id);
  
  res.json({
    class: classData,
    students: classStudents,
    lessons: classLessons,
    homeworks: classHomeworks
  });
});

app.post('/api/homeworks/:homeworkId/grade', (req, res) => {
  const { homeworkId } = req.params;
  const { submissionId, score, feedback, teacherId } = req.body;
  
  const submission = submissions[submissionId];
  if (!submission || submission.homeworkId !== homeworkId) {
    return res.status(404).json({ error: 'Submission not found' });
  }
  
  submission.score = score;
  submission.feedback = feedback;
  submission.gradedBy = teacherId;
  submission.gradedAt = new Date().toISOString();
  submission.isGraded = true;
  
  // Notify student
  const student = users[submission.studentId];
  if (student) {
    io.to(student.id).emit('submission_graded', {
      homeworkId,
      submissionId,
      score,
      feedback
    });
  }
  
  res.json({ success: true });
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Register user
  socket.on('register_user', (data: { user: User }) => {
    const { user } = data;
    users[user.id] = user;
    connectedUsers.add(user.id);
    user.isOnline = true;
    user.lastSeen = new Date().toISOString();
    
    socket.join(user.id);
    socket.emit('user_registered', { user, token: 'mock-token-' + user.id });
    
    console.log(`User registered: ${user.name} (${user.role})`);
  });
  
  // Teacher create class
  socket.on('teacher_create_class', (data: { teacherId: string; name: string }) => {
    const { teacherId, name } = data;
    const teacher = users[teacherId];
    
    if (!teacher || teacher.role !== 'teacher') {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    const classCode = 'DY-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const newClass: Class = {
      id: 'class-' + Date.now(),
      name,
      classCode,
      teacherId,
      students: [],
      createdAt: new Date().toISOString()
    };
    
    classes[newClass.id] = newClass;
    socket.emit('class_created', { class: newClass });
    
    console.log(`Class created: ${name} (${classCode})`);
  });
  
  // Student join class
  socket.on('join_class', (data: { studentId: string; classCode: string }) => {
    const { studentId, classCode } = data;
    const student = users[studentId];
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    
    if (!student || !classData) {
      socket.emit('error', { message: 'Student or class not found' });
      return;
    }
    
    if (!classData.students.includes(studentId)) {
      classData.students.push(studentId);
      student.classCode = classCode;
    }
    
    socket.join(classData.id);
    socket.emit('joined_class', { class: classData });
    
    // Notify teacher
    const teacher = users[classData.teacherId];
    if (teacher) {
      io.to(teacher.id).emit('new_student_joined', { student });
    }
    
    console.log(`Student ${student.name} joined class ${classData.name}`);
  });
  
  // Teacher start lesson
  socket.on('teacher_start_lesson', (data: { teacherId: string; classCode: string; lessonId: string }) => {
    const { teacherId, classCode, lessonId } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    const lesson = lessons[lessonId];
    
    if (!classData || !lesson || classData.teacherId !== teacherId) {
      socket.emit('error', { message: 'Unauthorized or not found' });
      return;
    }
    
    classData.isLive = true;
    classData.currentLessonId = lessonId;
    lesson.isLive = true;
    
    // Notify all students in class
    io.to(classData.id).emit('lesson_started', { lesson, class: classData });
    
    console.log(`Lesson started: ${lesson.title} in class ${classData.name}`);
  });
  
  // Teacher present simulation
  socket.on('teacher_present_simulation', (data: { teacherId: string; classCode: string; simId: string; simParams: any }) => {
    const { teacherId, classCode, simId, simParams } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    
    if (!classData || classData.teacherId !== teacherId) {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    // Broadcast to all students in class
    io.to(classData.id).emit('presentation_simulation_update', {
      simId,
      simParams,
      byTeacherId: teacherId,
      timestamp: new Date().toISOString()
    });
    
    console.log(`Simulation update broadcasted: ${simId}`);
  });
  
  // Teacher stop presentation
  socket.on('teacher_stop_presentation', (data: { teacherId: string; classCode: string }) => {
    const { teacherId, classCode } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    
    if (!classData || classData.teacherId !== teacherId) {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    classData.isLive = false;
    classData.currentLessonId = undefined;
    
    // Notify all students
    io.to(classData.id).emit('presentation_stopped', { class: classData });
    
    console.log(`Presentation stopped in class ${classData.name}`);
  });
  
  // Publish homework
  socket.on('new_homework', (data: { teacherId: string; classCode: string; homework: Homework }) => {
    const { teacherId, classCode, homework } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    
    if (!classData || classData.teacherId !== teacherId) {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    homework.id = 'hw-' + Date.now();
    homework.teacherId = teacherId;
    homework.classId = classData.id;
    homework.createdAt = new Date().toISOString();
    homework.isPublished = true;
    
    homeworks[homework.id] = homework;
    
    // Notify all students in class
    io.to(classData.id).emit('homework_published', { homework });
    
    console.log(`Homework published: ${homework.title}`);
  });
  
  // Submit homework
  socket.on('submit_homework', (data: { studentId: string; homeworkId: string; submission: any }) => {
    const { studentId, homeworkId, submission } = data;
    const homework = homeworks[homeworkId];
    const student = users[studentId];
    
    if (!homework || !student) {
      socket.emit('error', { message: 'Homework or student not found' });
      return;
    }
    
    submission.id = 'sub-' + Date.now();
    submission.homeworkId = homeworkId;
    submission.studentId = studentId;
    submission.submittedAt = new Date().toISOString();
    submission.isGraded = false;
    
    // Auto-grade if possible
    if (homework.type === 'mcq' || homework.type === 'input') {
      submission.score = autoGradeSubmission(homework, submission);
      submission.isGraded = true;
    }
    
    submissions[submission.id] = submission;
    
    // Notify student
    socket.emit('submission_received', { submission });
    
    // Notify teacher
    const classData = classes[homework.classId];
    if (classData) {
      const teacher = users[classData.teacherId];
      if (teacher) {
        io.to(teacher.id).emit('homework_submitted', { homeworkId, submission });
      }
    }
    
    console.log(`Homework submitted: ${homework.title} by ${student.name}`);
  });
  
  // Grade submission
  socket.on('grade_submission', (data: { teacherId: string; homeworkId: string; submissionId: string; score: number; feedback: string }) => {
    const { teacherId, homeworkId, submissionId, score, feedback } = data;
    const submission = submissions[submissionId];
    
    if (!submission || submission.homeworkId !== homeworkId) {
      socket.emit('error', { message: 'Submission not found' });
      return;
    }
    
    submission.score = score;
    submission.feedback = feedback;
    submission.gradedBy = teacherId;
    submission.gradedAt = new Date().toISOString();
    submission.isGraded = true;
    
    // Notify student
    const student = users[submission.studentId];
    if (student) {
      io.to(student.id).emit('submission_graded', {
        homeworkId,
        submissionId,
        score,
        feedback
      });
    }
    
    console.log(`Submission graded: ${submissionId} - ${score} points`);
  });
  
  // Request help
  socket.on('request_help', (data: { studentId: string; classCode: string; message: string }) => {
    const { studentId, classCode, message } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    const student = users[studentId];
    
    if (!classData || !student) {
      socket.emit('error', { message: 'Class or student not found' });
      return;
    }
    
    // Notify teacher
    const teacher = users[classData.teacherId];
    if (teacher) {
      io.to(teacher.id).emit('help_requested', {
        student,
        message,
        classCode
      });
    }
    
    console.log(`Help requested by ${student.name}: ${message}`);
  });

  // Chat message
  socket.on('chat_message', (data: { senderId: string; senderName: string; text: string; classCode: string; timestamp: string }) => {
    const { senderId, classCode, text, senderName, timestamp } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    
    if (!classData) {
      socket.emit('error', { message: 'Class not found' });
      return;
    }
    
    // Broadcast to all users in class
    io.to(classData.id).emit('chat_message', {
      id: Date.now().toString(),
      senderId,
      senderName,
      text,
      classCode,
      timestamp,
      isPinned: false
    });
    
    console.log(`Chat message from ${senderName} in class ${classData.name}: ${text}`);
  });

  // Raise hand
  socket.on('raise_hand', (data: { studentId: string; classCode: string }) => {
    const { studentId, classCode } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    const student = users[studentId];
    
    if (!classData || !student) {
      socket.emit('error', { message: 'Class or student not found' });
      return;
    }
    
    // Notify teacher
    const teacher = users[classData.teacherId];
    if (teacher) {
      io.to(teacher.id).emit('raise_hand', { studentId, classCode });
    }
    
    console.log(`Student ${student.name} raised hand in class ${classData.name}`);
  });

  // Lower hand
  socket.on('lower_hand', (data: { studentId: string; classCode: string }) => {
    const { studentId, classCode } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    const student = users[studentId];
    
    if (!classData || !student) {
      socket.emit('error', { message: 'Class or student not found' });
      return;
    }
    
    // Notify teacher
    const teacher = users[classData.teacherId];
    if (teacher) {
      io.to(teacher.id).emit('lower_hand', { studentId, classCode });
    }
    
    console.log(`Student ${student.name} lowered hand in class ${classData.name}`);
  });

  // Teacher give floor
  socket.on('teacher_give_floor', (data: { studentId: string }) => {
    const { studentId } = data;
    const student = users[studentId];
    
    if (!student) {
      socket.emit('error', { message: 'Student not found' });
      return;
    }
    
    // Notify student
    io.to(studentId).emit('teacher_give_floor', { studentId });
    
    console.log(`Teacher gave floor to student ${student.name}`);
  });

  // Pin message
  socket.on('pin_message', (data: { messageId: string; classCode: string }) => {
    const { messageId, classCode } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    
    if (!classData) {
      socket.emit('error', { message: 'Class not found' });
      return;
    }
    
    // Broadcast to all users in class
    io.to(classData.id).emit('message_pinned', { messageId, classCode });
    
    console.log(`Message ${messageId} pinned in class ${classData.name}`);
  });

  // Delete message
  socket.on('delete_message', (data: { messageId: string; classCode: string }) => {
    const { messageId, classCode } = data;
    const classData = Object.values(classes).find(c => c.classCode === classCode);
    
    if (!classData) {
      socket.emit('error', { message: 'Class not found' });
      return;
    }
    
    // Broadcast to all users in class
    io.to(classData.id).emit('message_deleted', { messageId, classCode });
    
    console.log(`Message ${messageId} deleted in class ${classData.name}`);
  });
  
  // Ping/Pong
  socket.on('ping', () => {
    socket.emit('pong');
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // Mark user as offline
    Object.values(users).forEach(user => {
      if (user.id === socket.id) {
        user.isOnline = false;
        user.lastSeen = new Date().toISOString();
        connectedUsers.delete(user.id);
      }
    });
  });
});

// Auto-grade function
function autoGradeSubmission(homework: Homework, submission: any): number {
  if (homework.type === 'mcq') {
    let correct = 0;
    let total = 0;
    
    homework.payload.questions?.forEach((question: any, index: number) => {
      total += question.points;
      if (submission.answers[index]?.answer === question.correctAnswer) {
        correct += question.points;
      }
    });
    
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }
  
  if (homework.type === 'input') {
    let correct = 0;
    let total = 0;
    
    homework.payload.questions?.forEach((question: any, index: number) => {
      total += question.points;
      const answer = submission.answers[index]?.answer;
      
      if (question.type === 'number' && typeof answer === 'number') {
        const tolerance = question.tolerance || 0.01;
        if (Math.abs(answer - question.answer) <= tolerance) {
          correct += question.points;
        }
      } else if (question.type === 'text' && typeof answer === 'string') {
        if (question.regex) {
          const regex = new RegExp(question.regex);
          if (regex.test(answer)) {
            correct += question.points;
          }
        } else if (answer.toLowerCase().trim() === question.answer.toLowerCase().trim()) {
          correct += question.points;
        }
      }
    });
    
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }
  
  return 0; // Manual grading required
}

// Save data to JSON on shutdown
process.on('SIGINT', () => {
  const data = {
    users,
    classes,
    lessons,
    homeworks,
    submissions
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'data.json'),
    JSON.stringify(data, null, 2)
  );
  
  console.log('Data saved to data.json');
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 3005;

// Seed data
seedData(users, classes, lessons, homeworks);

server.listen(PORT, () => {
  console.log(`🚀 DeltaYurt Server running on port ${PORT}`);
  console.log(`📊 Seeded data:`);
  console.log(`   - Users: ${Object.keys(users).length}`);
  console.log(`   - Classes: ${Object.keys(classes).length}`);
  console.log(`   - Lessons: ${Object.keys(lessons).length}`);
  console.log(`   - Homeworks: ${Object.keys(homeworks).length}`);
  console.log(`\n🔑 Test credentials:`);
  console.log(`   Teacher: teacher@deltayurt.test (classCode: DY-TEST1)`);
  console.log(`   Student: student1@deltayurt.test`);
  console.log(`   Student: student2@deltayurt.test`);
});
