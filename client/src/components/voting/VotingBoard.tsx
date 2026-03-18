import React from 'react';
import type { Participant, Vote } from '../../types/index.js';

interface Props {
  participants: Participant[];
  votes: Vote[];
  revealed: boolean;
}

export const VotingBoard: React.FC<Props> = ({ participants, votes, revealed }) => {
  const voters = participants.filter(p => p.role === 'voter');

  return (
    <div className="voting-board">
      <h3>Estado de votación</h3>
      <div className="vote-grid">
        {voters.map(p => {
          const vote = votes.find(v => v.participantId === p.id);
          const hasVoted = vote?.value !== null;
          return (
            <div key={p.id} className={`vote-cell ${hasVoted ? 'voted' : 'pending'}`}>
              <span className="voter-name">{p.name}</span>
              <span className="vote-value">
                {revealed && hasVoted
                  ? vote?.value === 'hidden' ? '?' : vote?.value
                  : hasVoted
                  ? '✓'
                  : '—'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
