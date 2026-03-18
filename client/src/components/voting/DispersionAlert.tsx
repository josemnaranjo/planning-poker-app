import React from 'react';

export const DispersionAlert: React.FC = () => (
  <div className="dispersion-alert">
    <span className="alert-icon">⚠️</span>
    <div>
      <strong>Alta dispersión detectada</strong>
      <p>Hay diferencias significativas entre las estimaciones. Se recomienda debatir antes de volver a votar.</p>
    </div>
  </div>
);
