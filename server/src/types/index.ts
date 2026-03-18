export type Role = 'moderator' | 'voter';
export type RoundPhase = 'voting' | 'revealed' | 'closed';

export interface Participant {
  id: string;
  name: string;
  role: Role;
}

export interface Vote {
  participantId: string;
  value: string | null;
}

export interface RoundStats {
  average: number;
  mode: string[];
  minimum: number;
  maximum: number;
  hasHighDispersion: boolean;
}

export interface Round {
  id: string;
  story: string;
  phase: RoundPhase;
  votes: Vote[];
  startedAt: number;
}

export interface ClosedRound extends Round {
  phase: 'closed';
  stats: RoundStats;
  closedAt: number;
}

export interface Deck {
  name: string;
  values: string[];
}

export type SessionStatus = 'setup' | 'active' | 'finished';

export interface RoomState {
  code: string;
  participants: Participant[];
  deck: Deck;
  currentRound: Round | null;
  history: ClosedRound[];
  status: SessionStatus;
}
