import React from 'react';
import { CreateRoomForm } from './CreateRoomForm.js';
import { JoinRoomForm } from './JoinRoomForm.js';

export const LobbyPage: React.FC = () => (
  <div className="lobby-page">
    <header className="lobby-header">
      <h1>Poker Planning</h1>
      <p>Herramienta de estimación ágil para equipos remotos</p>
    </header>
    <div className="lobby-forms">
      <CreateRoomForm />
      <div className="divider">
        <span>o</span>
      </div>
      <JoinRoomForm />
    </div>
  </div>
);
