import React from 'react';

interface Props {
  story: string;
  phase: string;
}

export const StoryHeader: React.FC<Props> = ({ story, phase }) => (
  <div className="story-header">
    <div className="story-phase">
      {phase === 'voting' ? 'Votando' : phase === 'revealed' ? 'Votos revelados' : 'Ronda cerrada'}
    </div>
    <h2 className="story-title">{story}</h2>
  </div>
);
