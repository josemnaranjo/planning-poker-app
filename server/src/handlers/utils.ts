import type { RoomState } from '../types/index.js';

export const sanitize = (room: RoomState): RoomState => {
  if (!room.currentRound || room.currentRound.phase !== 'voting') return room;
  return {
    ...room,
    currentRound: {
      ...room.currentRound,
      votes: room.currentRound.votes.map(v => ({
        ...v,
        value: v.value !== null ? 'hidden' : null,
      })),
    },
  };
};
