import React from "react";
import EnhancedScamExplanation from "./EnhancedScamExplanation";
import EnhancedAuthorityContacts from "./EnhancedAuthorityContacts";
import "../App.css";

// For debugging
const logData = (data) => {
  console.log("EnhancedScamAnalysisMessage data:", data);
  if (data.authority_contacts) {
    console.log("Authority contacts in data:", data.authority_contacts);
  }
};

const EnhancedScamAnalysisMessage = ({ data, originalMessage, language, multiLanguageAnalysis }) => {
  // Log data for debugging
  logData(data);
  // Helper function to get status class
  const getStatusClass = () => {
    if (data.isScam === "Yes" || data.is_scam === "Yes") return "scam";
    if (data.isScam === "Maybe" || data.is_scam === "Maybe") return "potential-scam";
    return "legitimate";
  };

  // Helper function to get status icon
  const getStatusIcon = () => {
    if (data.isScam === "Yes" || data.is_scam === "Yes") return "🚨";
    if (data.isScam === "Maybe" || data.is_scam === "Maybe") return "⚠️";
    return "✅";
  };

  // Helper function to get status text
  const getStatusText = () => {
    if (data.isScam === "Yes" || data.is_scam === "Yes") return "SCAM DETECTED";
    if (data.isScam === "Maybe" || data.is_scam === "Maybe") return "POTENTIAL SCAM";
    return "LIKELY LEGITIMATE";
  };

  // Helper function to get language display
  const getLanguageDisplay = () => {
    if (!language) return "Unknown";

    let display = language.name;
    if (language.method === "transliteration") {
      display += " (transliterated)";
    }
    return display;
  };

  // Helper function to get language info
  const getLanguageInfo = () => {
    if (!language) return null;

    if (language.method === "transliteration") {
      return "This message appears to be written in Hindi using English characters. Our system has analyzed it accordingly.";
    }

    if (language.confidence < 0.8) {
      return "The language detection has low confidence. The message may contain mixed languages or uncommon patterns.";
    }

    return null;
  };

  return (
    <div className="structured-response">
      <div className={`scam-indicator ${getStatusClass()}`}>
        {getStatusIcon()} {getStatusText()}
      </div>

      {(data.isScam === "Yes" || data.is_scam === "Yes" || data.isScam === "Maybe" || data.is_scam === "Maybe") && (
        <div className="scam-summary">
          <p>This message has been identified as a <strong>scam attempt</strong>. Below you'll find a detailed explanation of why it's suspicious, what red flags were detected, and how to protect yourself. You'll also find contact information for authorities where you can report this scam.</p>
        </div>
      )}

      {(data.isScam === "Yes" || data.is_scam === "Yes" || data.isScam === "Maybe" || data.is_scam === "Maybe") && (data.scamType || data.scam_type) && (
        <div className="scam-type">
          <strong>Type:</strong> {data.scamType || data.scam_type}
        </div>
      )}

      {language && (
        <div className="language-detection-container">
          <div className="language-detection">
            <strong>Language:</strong> {getLanguageDisplay()}
          </div>
          {getLanguageInfo() && (
            <div className="language-info">
              {getLanguageInfo()}
            </div>
          )}
        </div>
      )}

      {/* Add the enhanced scam explanation component */}
      {(data.isScam === "Yes" || data.is_scam === "Yes" || data.isScam === "Maybe" || data.is_scam === "Maybe") && (
        <EnhancedScamExplanation
          scamType={data.scamType || data.scam_type}
          confidence={data.confidence}
          indicators={data.red_flags}
        />
      )}

      {(data.isScam === "Yes" || data.is_scam === "Yes" || data.isScam === "Maybe" || data.is_scam === "Maybe") && data.red_flags && data.red_flags.length > 0 && (
        <div className="scam-indicators">
          <h4>Red Flags Detected:</h4>
          <ul>
            {data.red_flags.map((indicator, index) => (
              <li key={index}>{indicator}</li>
            ))}
          </ul>
        </div>
      )}

      {(data.isScam === "Yes" || data.is_scam === "Yes" || data.isScam === "Maybe" || data.is_scam === "Maybe") && data.prevention_measures && data.prevention_measures.length > 0 && (
        <div className="scam-recommendations">
          <h4>How to Protect Yourself:</h4>
          <ul>
            {data.prevention_measures.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Add the highlighted message component */}
      {(data.isScam === "Yes" || data.is_scam === "Yes" || data.isScam === "Maybe" || data.is_scam === "Maybe") && originalMessage && (
        <div className="original-message">
          <h4>Original Message:</h4>
          <div className="message-content">{originalMessage}</div>
        </div>
      )}

      {/* Add enhanced authority contacts for scams */}
      {(data.isScam === "Yes" || data.is_scam === "Yes" || data.isScam === "Maybe" || data.is_scam === "Maybe") && (
        <>
          <div className="authority-section-header">
            <h3>Report This Scam to Authorities</h3>
            <p>If you've received this message, you should report it to the appropriate authorities to help prevent others from becoming victims.</p>
          </div>
          {/* Always render the EnhancedAuthorityContacts component */}
          <EnhancedAuthorityContacts
            scamType={data.scamType || data.scam_type || 'KYC Fraud'}
            authorityContacts={data.authority_contacts || []}
          />
        </>
      )}
    </div>
  );
};

export default EnhancedScamAnalysisMessage;
