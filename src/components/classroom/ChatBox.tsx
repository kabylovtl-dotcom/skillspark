import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Pin, Trash2, Hand, Mic } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isPinned?: boolean;
  isSystem?: boolean;
}

interface ChatBoxProps {
  classCode: string;
  isTeacher: boolean;
  raisedHands: string[];
  onGiveFloor: (studentId: string) => void;
}

export default function ChatBox({ classCode, isTeacher, raisedHands, onGiveFloor }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [hasFloor, setHasFloor] = useState(false);
  const { user } = useAuthStore();
  const { emit } = useSocketStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Listen for chat messages
    const handleChatMessage = (data: any) => {
      if (data.classCode === classCode) {
        const message: ChatMessage = {
          id: data.id || Date.now().toString(),
          senderId: data.senderId,
          senderName: data.senderName,
          text: data.text,
          timestamp: new Date(data.timestamp),
          isPinned: data.isPinned || false,
          isSystem: data.isSystem || false
        };
        setMessages(prev => [...prev, message]);
      }
    };

    // Listen for raised hands
    const handleRaiseHand = (data: any) => {
      if (data.classCode === classCode) {
        // This will be handled by parent component
      }
    };

    // Listen for floor given
    const handleGiveFloor = (data: any) => {
      if (data.studentId === user?.id) {
        setHasFloor(true);
        setTimeout(() => setHasFloor(false), 10000); // Floor for 10 seconds
      }
    };

    // Listen for system messages
    const handleSystemMessage = (data: any) => {
      if (data.classCode === classCode) {
        const systemMessage: ChatMessage = {
          id: `system-${Date.now()}`,
          senderId: 'system',
          senderName: 'Система',
          text: data.message,
          timestamp: new Date(),
          isSystem: true
        };
        setMessages(prev => [...prev, systemMessage]);
      }
    };

    const socket = useSocketStore.getState().socket;
    if (socket) {
      socket.on('chat_message', handleChatMessage);
      socket.on('raise_hand', handleRaiseHand);
      socket.on('teacher_give_floor', handleGiveFloor);
      socket.on('system_message', handleSystemMessage);
    }

    return () => {
      if (socket) {
        socket.off('chat_message', handleChatMessage);
        socket.off('raise_hand', handleRaiseHand);
        socket.off('teacher_give_floor', handleGiveFloor);
        socket.off('system_message', handleSystemMessage);
      }
    };
  }, [classCode, user?.id]);

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message = {
      senderId: user.id,
      senderName: user.name,
      text: newMessage.trim(),
      classCode,
      timestamp: new Date().toISOString()
    };

    emit('chat_message', message);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const raiseHand = () => {
    if (!user) return;
    
    setIsHandRaised(true);
    emit('raise_hand', {
      studentId: user.id,
      classCode
    });
  };

  const lowerHand = () => {
    setIsHandRaised(false);
    // Note: In a real app, you'd emit a lower_hand event
  };

  const pinMessage = (messageId: string) => {
    if (!isTeacher) return;
    emit('pin_message', { messageId, classCode });
  };

  const deleteMessage = (messageId: string) => {
    if (!isTeacher) return;
    emit('delete_message', { messageId, classCode });
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Чат класса</span>
          {!isTeacher && (
            <div className="flex gap-2">
              {!isHandRaised ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={raiseHand}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Hand className="h-4 w-4 mr-1" />
                  Поднять руку
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={lowerHand}
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <Hand className="h-4 w-4 mr-1" />
                  Опустить руку
                </Button>
              )}
            </div>
          )}
        </CardTitle>
        
        {/* Raised hands indicator for teacher */}
        {isTeacher && raisedHands.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Подняли руку:</p>
            <div className="flex flex-wrap gap-1">
              {raisedHands.map((studentId) => (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-purple-100"
                  onClick={() => onGiveFloor(studentId)}
                >
                  Студент {studentId.slice(-4)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Floor indicator for student */}
        {hasFloor && (
          <div
            className="bg-green-100 border border-green-300 rounded-lg p-2 text-center"
          >
            <Mic className="h-4 w-4 inline mr-1" />
            <span className="text-green-800 font-medium">Вам слово!</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            <AnimatePresence>
              {messages.map((message) => (
                <div
                  className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isSystem
                        ? 'bg-gray-100 text-gray-600 text-center text-sm'
                        : message.senderId === user?.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {!message.isSystem && (
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium opacity-70">
                          {message.senderName}
                        </span>
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                    {message.isPinned && (
                      <div className="flex items-center mt-1 text-xs opacity-70">
                        <Pin className="h-3 w-3 mr-1" />
                        Закреплено
                      </div>
                    )}
                  </div>
                  
                  {isTeacher && !message.isSystem && (
                    <div className="flex flex-col gap-1 ml-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => pinMessage(message.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Pin className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteMessage(message.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение..."
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
