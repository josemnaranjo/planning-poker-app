import React from 'react';
import type { Participant } from '../../types/index.js';

interface Props {
  participants: Participant[];
}

export const ParticipantList: React.FC<Props> = ({ participants }) => (
  <div className="participant-list">
    <h3>Participantes ({participants.length})</h3>
    <ul>
      {participants.map(p => (
        <li key={p.id} className="participant-item">
          <span className="participant-name">{p.name}</span>
          <span className={`participant-badge ${p.role}`}>
            {p.role === 'moderator' ? 'Moderador' : 'Votante'}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
