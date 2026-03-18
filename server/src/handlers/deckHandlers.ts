import { Socket, Server } from 'socket.io';
import { updateRoom, getRoomCodeBySocket } from '../roomManager.js';
import type { Deck } from '../types/index.js';
import { sanitize } from './utils.js';

export const registerDeckHandlers = (io: Server, socket: Socket): void => {
  socket.on('set-deck', ({ deck }: { deck: Deck }) => {
    const code = getRoomCodeBySocket(socket.id);
    if (!code) return;
    const updated = updateRoom(code, r => ({ ...r, deck }));
    if (!updated) return;
    io.to(code).emit('room-state', sanitize(updated));
  });
};
