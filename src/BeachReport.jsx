import React from 'react';

const BeachReport = ({ beach }) => {
  return (
    <div className="beach-report">
      <h3>{beach.name}</h3>
      <ul>
        <li><strong>Wind Speed:</strong> {beach.windSpeed}</li>
        <li><strong>Current Strength:</strong> {beach.currentStrength}</li>
        <li><strong>Current Speed:</strong> {beach.currentSpeed}</li>
        <li><strong>Temperature:</strong> {beach.temperature}</li>
      </ul>
      {!beach.safe && (
        <p className="warning">WARNING: High risk conditions!</p>
      )}
    </div>
  );
};

export default BeachReport;
