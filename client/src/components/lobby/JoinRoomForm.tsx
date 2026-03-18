import React, { useState } from 'react';
import { useSocketActions } from '../../hooks/useSocketActions.js';
import { useStore } from '../../store/index.js';
import { Button } from '../shared/Button.js';

export const JoinRoomForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const { joinRoom } = useSocketActions();
  const { isLoading, error } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() && name.trim()) joinRoom(code.trim().toUpperCase(), name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>Unirse a una sala</h2>
      <p className="form-hint">Ingresa el código de la sala y tu nombre.</p>
      <div className="field">
        <label htmlFor="room-code">Código de sala</label>
        <input
          id="room-code"
          type="text"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="Ej: A3K9XZ"
          maxLength={6}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="voter-name">Tu nombre</label>
        <input
          id="voter-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ej: Luis Torres"
          maxLength={30}
          required
        />
      </div>
      {error && <p className="error-msg">{error}</p>}
      <Button type="submit" disabled={isLoading || !code.trim() || !name.trim()}>
        {isLoading ? 'Uniéndose...' : 'Unirse'}
      </Button>
    </form>
  );
};
