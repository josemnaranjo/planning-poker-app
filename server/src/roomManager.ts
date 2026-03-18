import type { RoomState, Participant } from './types/index.js';

const rooms = new Map<string, RoomState>();
// socketId -> roomCode
const socketRoom = new Map<string, string>();

const DEFAULT_DECK = { name: 'Fibonacci', values: ['1', '2', '3', '5', '8', '13', '21', '?', '☕'] };

export const createRoom = (code: string, moderator: Participant): RoomState => {
  const room: RoomState = {
    code,
    participants: [moderator],
    deck: DEFAULT_DECK,
    currentRound: null,
    history: [],
    status: 'setup',
  };
  rooms.set(code, room);
  socketRoom.set(moderator.id, code);
  return room;
};

export const getRoom = (code: string): RoomState | undefined => rooms.get(code);

export const updateRoom = (code: string, updater: (r: RoomState) => RoomState): RoomState | null => {
  const room = rooms.get(code);
  if (!room) return null;
  const updated = updater(room);
  rooms.set(code, updated);
  return updated;
};

export const registerSocket = (socketId: string, roomCode: string): void => {
  socketRoom.set(socketId, roomCode);
};

export const removeParticipant = (socketId: string): string | null => {
  const code = socketRoom.get(socketId);
  if (!code) return null;
  socketRoom.delete(socketId);
  const room = rooms.get(code);
  if (!room) return null;
  const updated = { ...room, participants: room.participants.filter(p => p.id !== socketId) };
  if (updated.participants.length === 0) {
    rooms.delete(code);
  } else {
    rooms.set(code, updated);
  }
  return code;
};

export const getRoomCodeBySocket = (socketId: string): string | undefined => socketRoom.get(socketId);
