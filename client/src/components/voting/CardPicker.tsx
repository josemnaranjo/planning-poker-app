import React from 'react';
import { Card } from './Card.js';
import type { Deck } from '../../types/index.js';

interface Props {
  deck: Deck;
  selectedValue: string | null;
  onVote: (value: string) => void;
}

export const CardPicker: React.FC<Props> = ({ deck, selectedValue, onVote }) => (
  <div className="card-picker">
    <h3>Selecciona tu estimación</h3>
    <div className="cards-row">
      {deck.values.map(value => (
        <Card
          key={value}
          value={value}
          selected={selectedValue === value}
          onClick={() => onVote(value)}
        />
      ))}
    </div>
  </div>
);
