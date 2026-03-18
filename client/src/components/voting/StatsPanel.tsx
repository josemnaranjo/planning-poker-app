import React from 'react';
import type { RoundStats } from '../../types/index.js';

interface Props {
  stats: RoundStats;
  participants: { id: string; name: string }[];
  votes: { participantId: string; value: string | null }[];
}

export const StatsPanel: React.FC<Props> = ({ stats, participants, votes }) => (
  <div className="stats-panel">
    <h3>Estadísticas</h3>
    <div className="stats-grid">
      <div className="stat">
        <span className="stat-label">Promedio</span>
        <span className="stat-value">{stats.average.toFixed(1)}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Moda</span>
        <span className="stat-value">{stats.mode.join(', ') || '—'}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Mínimo</span>
        <span className="stat-value">{stats.minimum}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Máximo</span>
        <span className="stat-value">{stats.maximum}</span>
      </div>
    </div>
    <div className="votes-detail">
      {votes.map(v => {
        const p = participants.find(p => p.id === v.participantId);
        return (
          <div key={v.participantId} className="vote-detail-row">
            <span>{p?.name ?? 'Desconocido'}</span>
            <span>{v.value ?? '—'}</span>
          </div>
        );
      })}
    </div>
  </div>
);
