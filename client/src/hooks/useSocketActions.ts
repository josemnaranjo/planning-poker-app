import { useCallback } from 'react';
import { getSocket } from '../socket.js';
import { useStore } from '../store/index.js';
import type { Deck } from '../types/index.js';

/**
 * Returns emit action functions. Safe to call from any component
 * since it does NOT set up event listeners.
 */
export const useSocketActions = () => {
  const { setLoading, setError } = useStore();

  const createRoom = useCallback((name: string) => {
    setLoading(true);
    setError(null);
    getSocket().emit('create-room', { name });
  }, [setLoading, setError]);

  const joinRoom = useCallback((code: string, name: string) => {
    setLoading(true);
    setError(null);
    getSocket().emit('join-room', { code, name });
  }, [setLoading, setError]);

  const setDeck = useCallback((deck: Deck) => {
    getSocket().emit('set-deck', { deck });
  }, []);

  const startSession = useCallback(() => {
    getSocket().emit('start-session');
  }, []);

  const startRound = useCallback((story: string) => {
    getSocket().emit('start-round', { story });
  }, []);

  const castVote = useCallback((value: string) => {
    getSocket().emit('cast-vote', { value });
  }, []);

  const revealVotes = useCallback(() => {
    getSocket().emit('reveal-votes');
  }, []);

  const restartRound = useCallback(() => {
    getSocket().emit('restart-round');
  }, []);

  const closeRound = useCallback(() => {
    getSocket().emit('close-round');
  }, []);

  const endSession = useCallback(() => {
    getSocket().emit('end-session');
  }, []);

  return {
    createRoom,
    joinRoom,
    setDeck,
    startSession,
    startRound,
    castVote,
    revealVotes,
    restartRound,
    closeRound,
    endSession,
  };
};
