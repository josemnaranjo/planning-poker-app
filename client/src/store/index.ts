import { create } from 'zustand';
import type { RoomState, Role } from '../types/index.js';

interface ConnectionState {
  myId: string | null;
  myRole: Role | null;
  roomCode: string | null;
  setConnection: (id: string, role: Role, code: string) => void;
  clearConnection: () => void;
}

interface RoomStoreState {
  room: RoomState | null;
  setRoom: (room: RoomState) => void;
  clearRoom: () => void;
}

interface UiState {
  isLoading: boolean;
  error: string | null;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
}

interface AppStore extends ConnectionState, RoomStoreState, UiState {}

export const useStore = create<AppStore>((set) => ({
  // Connection
  myId: null,
  myRole: null,
  roomCode: null,
  setConnection: (id, role, code) => set({ myId: id, myRole: role, roomCode: code }),
  clearConnection: () => set({ myId: null, myRole: null, roomCode: null }),

  // Room
  room: null,
  setRoom: (room) => set({ room }),
  clearRoom: () => set({ room: null }),

  // UI
  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
