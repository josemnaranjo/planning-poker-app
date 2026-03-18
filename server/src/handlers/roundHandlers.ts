import { Socket, Server } from 'socket.io';
import { updateRoom, getRoom, getRoomCodeBySocket } from '../roomManager';
import { computeStats } from '../lib/statistics';
import type { Round, ClosedRound } from '../types/index';
import { v4 as uuidv4 } from 'uuid';
import { sanitize } from './utils';

export const registerRoundHandlers = (io: Server, socket: Socket): void => {
  socket.on('start-session', () => {
    const code = getRoomCodeBySocket(socket.id);
    if (!code) return;
    const room = getRoom(code);
    if (!room || room.participants.find(p => p.id === socket.id)?.role !== 'moderator') return;
    const updated = updateRoom(code, r => ({ ...r, status: 'active' }));
    if (!updated) return;
    io.to(code).emit('room-state', sanitize(updated));
  });

  socket.on('start-round', ({ story }: { story: string }) => {
    const code = getRoomCodeBySocket(socket.id);
    if (!code) return;
    const room = getRoom(code);
    if (!room) return;
    const round: Round = {
      id: uuidv4(),
      story,
      phase: 'voting',
      votes: room.participants
        .filter(p => p.role === 'voter')
        .map(p => ({ participantId: p.id, value: null })),
      startedAt: Date.now(),
    };
    const updated = updateRoom(code, r => ({ ...r, currentRound: round }));
    if (!updated) return;
    io.to(code).emit('room-state', sanitize(updated));
  });

  socket.on('cast-vote', ({ value }: { value: string }) => {
    const code = getRoomCodeBySocket(socket.id);
    if (!code) return;
    const room = getRoom(code);
    if (!room || !room.currentRound || room.currentRound.phase !== 'voting') return;
    // Add vote if not present, update if present
    const votes = room.currentRound.votes.some(v => v.participantId === socket.id)
      ? room.currentRound.votes.map(v =>
          v.participantId === socket.id ? { ...v, value } : v
        )
      : [...room.currentRound.votes, { participantId: socket.id, value }];
    const updated = updateRoom(code, r => ({
      ...r,
      currentRound: r.currentRound ? { ...r.currentRound, votes } : null,
    }));
    if (!updated) return;
    io.to(code).emit('room-state', sanitize(updated));
  });

  socket.on('reveal-votes', () => {
    const code = getRoomCodeBySocket(socket.id);
    if (!code) return;
    const room = getRoom(code);
    if (!room || !room.currentRound || room.currentRound.phase !== 'voting') return;
    const updated = updateRoom(code, r => ({
      ...r,
      currentRound: r.currentRound
        ? { ...r.currentRound, phase: 'revealed' }
        : null,
    }));
    if (!updated) return;
    // Send full state with actual votes (no sanitize for revealed phase)
    io.to(code).emit('room-state', updated);
  });

  socket.on('restart-round', () => {
    const code = getRoomCodeBySocket(socket.id);
    if (!code) return;
    const room = getRoom(code);
    if (!room || !room.currentRound) return;
    const updated = updateRoom(code, r => ({
      ...r,
      currentRound: r.currentRound
        ? {
            ...r.currentRound,
            phase: 'voting',
            votes: r.participants
              .filter(p => p.role === 'voter')
              .map(p => ({ participantId: p.id, value: null })),
          }
        : null,
    }));
    if (!updated) return;
    io.to(code).emit('room-state', sanitize(updated));
  });

  socket.on('close-round', () => {
    const code = getRoomCodeBySocket(socket.id);
    if (!code) return;
    const room = getRoom(code);
    if (!room || !room.currentRound || room.currentRound.phase !== 'revealed') return;
    const stats = computeStats(room.currentRound.votes);
    const closedRound: ClosedRound = {
      ...room.currentRound,
      phase: 'closed',
      stats,
      closedAt: Date.now(),
    };
    const updated = updateRoom(code, r => ({
      ...r,
      currentRound: null,
      history: [...r.history, closedRound],
    }));
    if (!updated) return;
    io.to(code).emit('room-state', sanitize(updated));
  });

  socket.on('end-session', () => {
    const code = getRoomCodeBySocket(socket.id);
    if (!code) return;
    const room = getRoom(code);
    if (!room || room.participants.find(p => p.id === socket.id)?.role !== 'moderator') return;
    const updated = updateRoom(code, r => ({ ...r, status: 'finished', currentRound: null }));
    if (!updated) return;
    io.to(code).emit('room-state', sanitize(updated));
  });
};
