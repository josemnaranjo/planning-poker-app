import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { useStore } from '../../store/index.js';
import { PdfDocument } from './PdfDocument.js';
import { Button } from '../shared/Button.js';
import { StatsPanel } from '../voting/StatsPanel.js';
import { DispersionAlert } from '../voting/DispersionAlert.js';

export const SummaryPage: React.FC = () => {
  const { room, myRole } = useStore();

  if (!room) return null;

  const handleDownloadPdf = async () => {
    const date = new Date().toLocaleDateString('es-ES');
    const blob = await pdf(
      <PdfDocument history={room.history} participants={room.participants} date={date} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poker-planning-${date}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="summary-page">
      <header className="summary-header">
        <h1>Resumen de la sesión</h1>
        <p>Sala: {room.code} · {room.participants.length} participante(s)</p>
      </header>

      <div className="summary-content">
        {room.history.length === 0 ? (
          <p>No se completaron rondas en esta sesión.</p>
        ) : (
          <div className="summary-list">
            {room.history.map((round, idx) => (
              <div key={round.id} className="summary-item">
                <h3>#{idx + 1} {round.story}</h3>
                <StatsPanel
                  stats={round.stats}
                  participants={room.participants}
                  votes={round.votes}
                />
                {round.stats.hasHighDispersion && <DispersionAlert />}
              </div>
            ))}
          </div>
        )}

        {myRole === 'moderator' && room.history.length > 0 && (
          <div className="summary-actions">
            <Button onClick={handleDownloadPdf}>
              Descargar PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
