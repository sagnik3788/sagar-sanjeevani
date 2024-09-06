import React from 'react';
import './BeachReport.css'; // Make sure to import the CSS file

const BeachReport = ({ beach, onMouseEnter, onMouseLeave, isHighlighted }) => {
  return (
    <div
      className={`beach-report ${isHighlighted ? 'highlighted' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grade-container">
        <strong className="grade">Grade:{beach.Grade}</strong>
      </div>
      <h3>{beach.name}</h3>
      <ul>
        <li><strong>Wind Speed:</strong> {beach.windSpeed}</li>
        <li><strong>Current Strength:</strong> {beach.currentStrength}</li>
        <li><strong>Current Speed:</strong> {beach.currentSpeed}</li>
        <li><strong>Temperature:</strong> {beach.temperature}</li>
      </ul>
      {!beach.safe && (
        <p className="warning">WARNING: High-risk conditions!</p>
      )}
    </div>
  );
};

export default BeachReport;
