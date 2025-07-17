import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ScamEducationWidget.css';

const ScamEducationWidget = ({ onClose }) => {
  const [scamTypes, setScamTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWidget, setShowWidget] = useState(true);

  useEffect(() => {
    // Fetch scam types from the API
    fetch('/api/scam-types')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch scam types');
        }
        return response.json();
      })
      .then(data => {
        setScamTypes(data.types || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching scam types:', err);
        setError('Failed to load scam information. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setShowWidget(false);
    if (onClose) onClose();
  };

  if (!showWidget) return null;

  return (
    <div className="scam-education-widget">
      <div className="widget-header">
        <h3>Learn About Common Scams</h3>
        <button className="close-button" onClick={handleClose}>×</button>
      </div>
      
      <div className="widget-content">
        {loading ? (
          <div className="loading-spinner">Loading scam information...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <p className="widget-intro">
              Stay informed about these common scam types to protect yourself and your loved ones.
            </p>
            
            <div className="scam-types-grid">
              {scamTypes.map((scamType, index) => (
                <Link 
                  to={`/scams/${scamType.name.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="scam-type-card" 
                  key={index}
                >
                  <div className="scam-type-icon">{scamType.icon}</div>
                  <h4>{scamType.name}</h4>
                  <p>{scamType.short_description}</p>
                </Link>
              ))}
            </div>
            
            <div className="widget-footer">
              <Link to="/scams" className="view-all-link">
                View All Scam Types
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScamEducationWidget;
