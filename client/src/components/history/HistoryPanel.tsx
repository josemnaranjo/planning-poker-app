import React from 'react';
import type { ClosedRound, Participant } from '../../types/index.js';

interface Props {
  history: ClosedRound[];
  participants: Participant[];
}

export const HistoryPanel: React.FC<Props> = ({ history, participants: _participants }) => {
  if (history.length === 0) return (
    <div className="history-panel">
      <h3>Historial</h3>
      <p className="empty-history">Aún no hay rondas completadas.</p>
    </div>
  );

  return (
    <div className="history-panel">
      <h3>Historial ({history.length})</h3>
      <div className="history-list">
        {history.map((round, idx) => (
          <div key={round.id} className="history-item">
            <div className="history-item-header">
              <span className="history-index">#{idx + 1}</span>
              <span className="history-story">{round.story}</span>
            </div>
            <div className="history-stats">
              <span>Prom: {round.stats.average.toFixed(1)}</span>
              <span>Moda: {round.stats.mode.join(', ') || '—'}</span>
              {round.stats.hasHighDispersion && <span className="dispersion-badge">⚠ Dispersión</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
