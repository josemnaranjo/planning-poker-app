import React from 'react';
import { DECKS } from '../../lib/decks.js';
import type { Deck } from '../../types/index.js';

interface Props {
  currentDeck: Deck;
  onSelect: (deck: Deck) => void;
}

export const DeckSelector: React.FC<Props> = ({ currentDeck, onSelect }) => (
  <div className="deck-selector">
    <h3>Seleccionar mazo</h3>
    <div className="deck-options">
      {DECKS.map(deck => (
        <button
          key={deck.name}
          className={`deck-option ${currentDeck.name === deck.name ? 'selected' : ''}`}
          onClick={() => onSelect(deck)}
        >
          <strong>{deck.name}</strong>
          <span className="deck-values">{deck.values.join(' · ')}</span>
        </button>
      ))}
    </div>
  </div>
);
