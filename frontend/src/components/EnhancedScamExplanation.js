import React from 'react';
import './EnhancedScamExplanation.css';

const EnhancedScamExplanation = ({ scamType, confidence, indicators }) => {
  // Get explanation based on scam type
  const getExplanation = () => {
    const scamTypeLC = scamType ? scamType.toLowerCase() : '';
    
    if (scamTypeLC.includes('kyc')) {
      return {
        title: "How KYC Fraud Was Detected",
        method: "Pattern matching identified this as a KYC fraud attempt based on several key indicators. These scams typically create a false sense of urgency about your account's KYC status to trick you into sharing sensitive information.",
        techniques: [
          "Detected urgent language about KYC expiry or account suspension",
          "Identified requests to call an unofficial number",
          "Recognized threats of account closure or restrictions",
          "Found patterns consistent with impersonation of legitimate banks"
        ]
      };
    } else if (scamTypeLC.includes('upi') || scamTypeLC.includes('payment')) {
      return {
        title: "How UPI/Payment Scam Was Detected",
        method: "This message was identified as a UPI/payment scam through analysis of common deception patterns. These scams often involve requests to scan QR codes or approve collect requests under false pretenses.",
        techniques: [
          "Detected promises of rewards or cashbacks requiring QR code scanning",
          "Identified suspicious payment collection requests",
          "Recognized patterns of urgency to complete financial transactions",
          "Found language patterns consistent with payment fraud schemes"
        ]
      };
    } else {
      return {
        title: `How This Scam Was Detected`,
        method: `Our system identified this as a potential scam through pattern matching and linguistic analysis. The message contains elements commonly found in fraudulent communications.`,
        techniques: [
          "Detected suspicious language patterns and requests",
          "Identified potential impersonation attempts",
          "Recognized elements designed to create urgency or fear",
          "Found patterns consistent with known scam techniques"
        ]
      };
    }
  };

  const explanation = getExplanation();
  
  // Handle different confidence formats
  let confidenceValue = 0;
  if (typeof confidence === 'number') {
    confidenceValue = confidence < 1 ? Math.round(confidence * 100) : confidence;
  } else if (typeof confidence === 'string') {
    if (confidence === 'High') confidenceValue = 90;
    else if (confidence === 'Medium') confidenceValue = 70;
    else if (confidence === 'Low') confidenceValue = 40;
    else confidenceValue = 50; // Default
  } else {
    confidenceValue = 50; // Default if confidence is undefined
  }
  
  const confidenceClass = 
    confidenceValue > 80 ? "high" : 
    confidenceValue > 50 ? "medium" : 
    "low";

  // Use indicators if provided, otherwise use an empty array
  const displayIndicators = indicators && indicators.length > 0 ? indicators : [];

  return (
    <div className="enhanced-scam-explanation">
      <h3>{explanation.title}</h3>
      <p className="explanation-method">{explanation.method}</p>
      
      <div className="detection-details">
        <div className="confidence-meter">
          <h4>Detection Confidence</h4>
          <div className="confidence-bar-container">
            <div 
              className={`confidence-bar ${confidenceClass}`} 
              style={{width: `${confidenceValue}%`}}
            ></div>
          </div>
          <span className="confidence-value">{confidenceValue}%</span>
        </div>
        
        <div className="detection-techniques">
          <h4>Detection Techniques Used</h4>
          <ul>
            {explanation.techniques.map((technique, index) => (
              <li key={index}>{technique}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="detected-indicators">
        <h4>Specific Indicators Detected in This Message</h4>
        <ul>
          {displayIndicators && displayIndicators.length > 0 ? (
            displayIndicators.map((indicator, index) => (
              <li key={index}>{indicator}</li>
            ))
          ) : (
            <li>Multiple suspicious patterns were detected in the message content</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EnhancedScamExplanation;
