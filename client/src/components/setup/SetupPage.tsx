import React from 'react';
import { useStore } from '../../store/index.js';
import { useSocketActions } from '../../hooks/useSocketActions.js';
import { ParticipantList } from './ParticipantList.js';
import { DeckSelector } from './DeckSelector.js';
import { Button } from '../shared/Button.js';

export const SetupPage: React.FC = () => {
  const { room, myRole } = useStore();
  const { setDeck, startSession } = useSocketActions();

  if (!room) return null;

  return (
    <div className="setup-page">
      <header className="room-header">
        <div>
          <h2>Sala de espera</h2>
          <p>Comparte el código con tu equipo</p>
        </div>
        <div className="room-code-display">
          <span className="label">Código</span>
          <span className="code">{room.code}</span>
        </div>
      </header>

      <div className="setup-content">
        <ParticipantList participants={room.participants} />

        {myRole === 'moderator' && (
          <>
            <DeckSelector currentDeck={room.deck} onSelect={setDeck} />
            <div className="setup-actions">
              <Button
                onClick={startSession}
                disabled={room.participants.length < 2}
              >
                Iniciar sesión
              </Button>
              {room.participants.length < 2 && (
                <p className="hint">Espera a que se una al menos un participante</p>
              )}
            </div>
          </>
        )}

        {myRole === 'voter' && (
          <p className="waiting-msg">Esperando que el moderador inicie la sesión...</p>
        )}
      </div>
    </div>
  );
};
