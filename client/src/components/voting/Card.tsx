import React from 'react';

interface Props {
  value: string;
  selected?: boolean;
  hidden?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<Props> = ({ value, selected = false, hidden = false, onClick }) => (
  <button
    className={`card ${selected ? 'selected' : ''} ${hidden ? 'hidden' : ''} ${onClick ? 'clickable' : ''}`}
    onClick={onClick}
    disabled={!onClick}
  >
    {hidden ? '?' : value}
  </button>
);
