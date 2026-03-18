import { Socket, Server } from 'socket.io';
import { generateRoomCode } from '../lib/codeGenerator';
import { createRoom, getRoom, updateRoom, registerSocket } from '../roomManager';
import type { Participant } from '../types/index';
import { sanitize } from './utils';

export const registerRoomHandlers = (io: Server, socket: Socket): void => {
  socket.on('create-room', ({ name }: { name: string }) => {
    const code = generateRoomCode();
    const moderator: Participant = { id: socket.id, name, role: 'moderator' };
    const room = createRoom(code, moderator);
    socket.join(code);
    socket.emit('room-created', { code });
    io.to(code).emit('room-state', sanitize(room));
  });

  socket.on('join-room', ({ code, name }: { code: string; name: string }) => {
    const room = getRoom(code);
    if (!room) {
      socket.emit('error', { message: 'Sala no encontrada. Verifica el código.' });
      return;
    }
    if (room.status === 'finished') {
      socket.emit('error', { message: 'Esta sesión ya ha finalizado.' });
      return;
    }
    const nameTaken = room.participants.some(p => p.name.toLowerCase() === name.toLowerCase());
    if (nameTaken) {
      socket.emit('error', { message: 'Este nombre ya está en uso en la sala.' });
      return;
    }
    const voter: Participant = { id: socket.id, name, role: 'voter' };
    registerSocket(socket.id, code);
    const updated = updateRoom(code, r => ({ ...r, participants: [...r.participants, voter] }));
    if (!updated) return;
    socket.join(code);
    socket.emit('room-joined', { code, role: 'voter' });
    io.to(code).emit('room-state', sanitize(updated));
  });
};
