import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '@/types';

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  emit: <K extends keyof SocketEvents>(event: K, data: Parameters<SocketEvents[K]>[0]) => void;
  on: <K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]) => void;
  off: <K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]) => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,

  connect: () => {
    const socket = io('http://localhost:3005', {
      transports: ['websocket'],
      autoConnect: true
    });

    socket.on('connect', () => {
      console.log('🔌 Connected to server');
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from server');
      set({ isConnected: false });
    });

    socket.on('connect_error', (error) => {
      console.error('🔌 Connection error:', error);
      set({ isConnected: false });
    });

    // Listen for class creation
    socket.on('class_created', (data) => {
      console.log('🏫 Class created:', data);
      // This will be handled by classStore
    });

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  emit: (event, data) => {
    const { socket } = get();
    if (socket && socket.connected) {
      console.log(`📤 Emitting ${event}:`, data);
      socket.emit(event, data);
    } else {
      console.warn(`⚠️ Cannot emit ${event}: socket not connected`);
    }
  },

  on: (event, callback) => {
    const { socket } = get();
    if (socket) {
      socket.on(event, callback);
    }
  },

  off: (event, callback) => {
    const { socket } = get();
    if (socket) {
      socket.off(event, callback);
    }
  }
}));
