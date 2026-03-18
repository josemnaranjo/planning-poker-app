import { useEffect } from 'react';
import { getSocket } from '../socket.js';
import { useStore } from '../store/index.js';
import type { RoomState } from '../types/index.js';

/**
 * Sets up socket event listeners. Must be called ONCE at the app root.
 */
export const useSocketListeners = (): void => {
  const { setRoom, setError, setLoading, setConnection } = useStore();

  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) socket.connect();

    socket.on('room-state', (room: RoomState) => {
      setRoom(room);
      setLoading(false);
    });

    socket.on('error', ({ message }: { message: string }) => {
      setError(message);
      setLoading(false);
    });

    socket.on('room-created', ({ code }: { code: string }) => {
      setConnection(socket.id ?? '', 'moderator', code);
    });

    socket.on('room-joined', ({ code, role }: { code: string; role: 'voter' }) => {
      setConnection(socket.id ?? '', role, code);
    });

    return () => {
      socket.off('room-state');
      socket.off('error');
      socket.off('room-created');
      socket.off('room-joined');
    };
  }, [setRoom, setError, setLoading, setConnection]);
};
