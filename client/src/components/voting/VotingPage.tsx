import React from 'react';
import { useStore } from '../../store/index.js';
import { useSocketActions } from '../../hooks/useSocketActions.js';
import { StoryHeader } from './StoryHeader.js';
import { VotingBoard } from './VotingBoard.js';
import { CardPicker } from './CardPicker.js';
import { ModeratorControls } from './ModeratorControls.js';
import { HistoryPanel } from '../history/HistoryPanel.js';

export const VotingPage: React.FC = () => {
  const { room, myRole, myId } = useStore();
  const { castVote } = useSocketActions();

  if (!room) return null;

  const round = room.currentRound;
  const myVote = round?.votes.find(v => v.participantId === myId)?.value ?? null;

  return (
    <div className="voting-page">
      <header className="room-header">
        <div>
          <h2>Sesión activa</h2>
          <span className="room-code-badge">Sala: {room.code}</span>
        </div>
      </header>

      <div className="voting-content">
        <div className="voting-main">
          {round ? (
            <>
              <StoryHeader story={round.story} phase={round.phase} />
              <VotingBoard
                participants={room.participants}
                votes={round.votes}
                revealed={round.phase === 'revealed'}
              />
              {myRole === 'voter' && round.phase === 'voting' && (
                <CardPicker
                  deck={room.deck}
                  selectedValue={myVote === 'hidden' ? null : myVote}
                  onVote={castVote}
                />
              )}
            </>
          ) : (
            <div className="no-round">
              <p>Esperando que el moderador inicie una ronda...</p>
            </div>
          )}

          {myRole === 'moderator' && (
            <ModeratorControls
              phase={round?.phase ?? null}
              hasCurrentRound={round !== null}
            />
          )}
        </div>

        <aside className="voting-sidebar">
          <HistoryPanel history={room.history} participants={room.participants} />
        </aside>
      </div>
    </div>
  );
};
