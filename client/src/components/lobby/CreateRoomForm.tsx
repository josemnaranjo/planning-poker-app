import React, { useState } from 'react';
import { useSocketActions } from '../../hooks/useSocketActions.js';
import { useStore } from '../../store/index.js';
import { Button } from '../shared/Button.js';

export const CreateRoomForm: React.FC = () => {
  const [name, setName] = useState('');
  const { createRoom } = useSocketActions();
  const { isLoading, error } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) createRoom(name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>Crear nueva sala</h2>
      <p className="form-hint">Ingresa tu nombre para crear una sala como moderador.</p>
      <div className="field">
        <label htmlFor="moderator-name">Tu nombre</label>
        <input
          id="moderator-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ej: Ana García"
          maxLength={30}
          required
        />
      </div>
      {error && <p className="error-msg">{error}</p>}
      <Button type="submit" disabled={isLoading || !name.trim()}>
        {isLoading ? 'Creando...' : 'Crear sala'}
      </Button>
    </form>
  );
};
