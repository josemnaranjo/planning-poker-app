import React, { useState } from 'react';
import { useSocketActions } from '../../hooks/useSocketActions.js';
import { Button } from '../shared/Button.js';
import type { RoundPhase } from '../../types/index.js';

interface Props {
  phase: RoundPhase | null;
  hasCurrentRound: boolean;
}

export const ModeratorControls: React.FC<Props> = ({ phase, hasCurrentRound }) => {
  const [story, setStory] = useState('');
  const { startRound, revealVotes, restartRound, closeRound, endSession } = useSocketActions();

  const handleStartRound = (e: React.FormEvent) => {
    e.preventDefault();
    if (story.trim()) {
      startRound(story.trim());
      setStory('');
    }
  };

  if (!hasCurrentRound) {
    return (
      <div className="moderator-controls">
        <form onSubmit={handleStartRound} className="start-round-form">
          <input
            type="text"
            value={story}
            onChange={e => setStory(e.target.value)}
            placeholder="Nombre de la historia o tarea"
            className="story-input"
          />
          <Button type="submit" disabled={!story.trim()}>
            Iniciar ronda
          </Button>
        </form>
        <Button variant="danger" onClick={endSession}>
          Finalizar sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="moderator-controls">
      {phase === 'voting' && (
        <Button onClick={revealVotes}>Revelar votos</Button>
      )}
      {phase === 'revealed' && (
        <>
          <Button variant="secondary" onClick={restartRound}>
            Reiniciar ronda
          </Button>
          <Button onClick={closeRound}>
            Siguiente historia
          </Button>
        </>
      )}
    </div>
  );
};
