import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./Home";
import FeaturePage from "./FeaturePage";
import ScamTypePage from "./ScamTypePage";
import StatisticsPage from "./StatisticsPage";
import EnhancedScamExplanation from "./components/EnhancedScamExplanation";
import EnhancedAuthorityContacts from "./components/EnhancedAuthorityContacts";
import EnhancedScamAnalysisMessage from "./components/EnhancedScamAnalysisMessage";
import ScamEducationWidget from "./components/ScamEducationWidget";

const HighlightedMessage = ({ message, redFlags }) => {
  // Common scam keywords to highlight
  const scamKeywords = [
    'urgent', 'verify', 'account', 'suspended', 'click', 'link', 'immediately',
    'password', 'login', 'security', 'bank', 'paypal', 'limited time',
    'won', 'winner', 'prize', 'lottery', 'million', 'dollars', 'claim',
    'suspicious', 'activity', 'unauthorized', 'confirm', 'information',
    'failure', 'terminate', 'closure', 'locked', 'restricted', 'unusual',
    'gift card', 'bitcoin', 'wire transfer', 'western union', 'money gram',
    'payment', 'fee', 'processing', 'tax', 'inheritance', 'prince', 'nigeria',
    'confidential', 'secret', 'opportunity', 'investment', 'fund', 'transaction'
  ];

  // Create a regex pattern from keywords
  const pattern = new RegExp(`\\b(${scamKeywords.join('|')})\\b`, 'gi');

  // URLs pattern
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  // Split the message by patterns and create spans with highlighting
  let parts = [];
  let lastIndex = 0;
  let match;

  // First highlight URLs
  const tempParts = [];
  while ((match = urlPattern.exec(message)) !== null) {
    if (match.index > lastIndex) {
      tempParts.push({ text: message.substring(lastIndex, match.index), type: 'normal' });
    }
    tempParts.push({ text: match[0], type: 'url' });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < message.length) {
    tempParts.push({ text: message.substring(lastIndex), type: 'normal' });
  }

  // Then highlight keywords in the non-URL parts
  lastIndex = 0;
  for (const part of tempParts) {
    if (part.type === 'url') {
      parts.push(part);
    } else {
      const text = part.text;
      lastIndex = 0;
      pattern.lastIndex = 0; // Reset regex state

      while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: text.substring(lastIndex, match.index), type: 'normal' });
        }
        parts.push({ text: match[0], type: 'keyword' });
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < text.length) {
        parts.push({ text: text.substring(lastIndex), type: 'normal' });
      }
    }
  }

  return (
    <div className="highlighted-message">
      <h4>Message Analysis</h4>
      <div className="message-container">
        {parts.map((part, i) => {
          if (part.type === 'keyword') {
            return <span key={i} className="highlight-keyword">{part.text}</span>;
          } else if (part.type === 'url') {
            return <span key={i} className="highlight-url">{part.text}</span>;
          } else {
            return <span key={i}>{part.text}</span>;
          }
        })}
      </div>
      <div className="highlight-legend">
        <div><span className="legend-item keyword"></span> Suspicious keywords</div>
        <div><span className="legend-item url"></span> Suspicious URLs</div>
      </div>
    </div>
  );
};

// AuthorityContacts component is imported from './components/AuthorityContacts'

const ScamAnalysisMessage = ({ data, originalMessage, language, multiLanguageAnalysis }) => {
  if (!data) return null;

  const getStatusClass = () => {
    if (data.isScam) return "scam";
    return "safe";
  };

  const getStatusIcon = () => {
    if (data.isScam) return "🚨";
    return "✅";
  };

  const getStatusText = () => {
    if (data.isScam) return "SCAM DETECTED";
    return "LEGITIMATE MESSAGE";
  };

  // Function to get language display name
  const getLanguageDisplay = () => {
    if (!language) return null;

    let methodText = "";
    let confidenceText = "";

    if (language.method === "transliteration") {
      methodText = " (transliterated)";
    } else if (language.method === "default" || language.method === "error_fallback") {
      methodText = " (assumed)";
    }

    if (language.confidence < 0.8) {
      confidenceText = " - low confidence";
    } else if (language.confidence >= 0.9) {
      confidenceText = " - high confidence";
    }

    return `${language.name}${methodText}${confidenceText}`;
  };

  // Function to get additional language info
  const getLanguageInfo = () => {
    if (!language) return null;

    if (language.method === "transliteration") {
      return "Text appears to be written in English characters but contains patterns of another language.";
    } else if (language.method === "detection") {
      return "Text contains characters specific to this language.";
    }

    return null;
  };

  return (
    <div className="structured-response">
      <div className={`scam-indicator ${getStatusClass()}`}>
        {getStatusIcon()} {getStatusText()}
      </div>

      {data.isScam && data.scamType && (
        <div className="scam-type">
          <strong>Type:</strong> {data.scamType}
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
      {data.isScam && (
        <EnhancedScamExplanation
          scamType={data.scamType}
          confidence={data.confidence}
          indicators={data.red_flags}
        />
      )}

      {data.isScam && data.indicators && data.indicators.length > 0 && (
        <div className="scam-indicators">
          <h4>Red Flags Detected:</h4>
          <ul>
            {data.indicators.map((indicator, index) => (
              <li key={index}>{indicator}</li>
            ))}
          </ul>
        </div>
      )}

      {data.recommendations && data.recommendations.length > 0 && (
        <div className="scam-recommendations">
          <h4>How to Protect Yourself:</h4>
          <ul>
            {data.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Add the highlighted message component */}
      {data.isScam && originalMessage && (
        <div className="original-message">
          <h4>Original Message:</h4>
          <div className="message-content">{originalMessage}</div>
        </div>
      )}

      {/* Add enhanced authority contacts for scams */}
      {data.isScam && (
        <>
          <EnhancedAuthorityContacts scamType={data.scamType || 'KYC Fraud'} />
        </>
      )}
    </div>
  );
};

// ChatInterface component for the chat functionality
const ChatInterface = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) {
      alert("Please enter a message to analyze.");
      return;
    }

    setLoading(true);
    const currentMessages = [...messages];
    const userMessage = { sender: "You", text };
    currentMessages.push(userMessage);
    setMessages(currentMessages);
    setText("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/analyze", { text });

      // Log the response data to see its structure
      console.log("Backend response:", response.data);

      // Check if we have structured data
      if (response.data.structured_data && (response.data.structured_data.isScam || response.data.structured_data.is_scam)) {
        // Add authority_contacts to structured data if available
        if (response.data.authority_contacts) {
          console.log("Authority contacts from backend:", response.data.authority_contacts);
          response.data.structured_data.authority_contacts = response.data.authority_contacts;
        } else {
          console.log("No authority_contacts in response data");
        }

        setMessages([
          ...currentMessages,
          {
            sender: "ScamGPT",
            text: response.data.response,
            structuredData: response.data.structured_data,
            originalText: text, // Store the original message
            language: response.data.language, // Store language detection info
            multiLanguageAnalysis: response.data.multi_language_analysis, // Store multi-language analysis
            isStructured: true
          }
        ]);
      } else {
        // Regular conversational response
        setMessages([
          ...currentMessages,
          {
            sender: "ScamGPT",
            text: response.data.response,
            language: response.data.language // Store language detection info even for regular responses
          }
        ]);
      }
    } catch (error) {
      setMessages([
        ...currentMessages,
        { sender: "ScamGPT", text: "Oops! Something went wrong. Try again." }
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeText();
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          ScamGPT
        </h1>
        <p>Analyze messages for potential scams and learn how to protect yourself online</p>
      </header>

      <div className="chat-box">
        {messages.length === 0 ? (
          <>
            <div className="empty-chat">
              <p>Paste a suspicious message to analyze it for potential scams.</p>
              <p>Our AI will identify red flags and provide safety recommendations.</p>
            </div>
            <ScamEducationWidget />
          </>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender === "You" ? "user" : "ai"}`}>
              <strong>{msg.sender}:</strong>
              {msg.isStructured ? (
                <EnhancedScamAnalysisMessage
                  data={msg.structuredData}
                  originalMessage={msg.originalText}
                  language={msg.language}
                  multiLanguageAnalysis={msg.multiLanguageAnalysis}
                />
              ) : (
                <div className="message-text">
                  {msg.text}
                  {msg.language && (
                    <div className="message-language">
                      <small>
                        Detected language: {msg.language.name}
                        {msg.language.method === "transliteration" && " (transliterated)"}
                        {msg.language.confidence < 0.8 && " - low confidence"}
                      </small>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="input-area">
        <textarea
          placeholder="Paste a suspicious message here to analyze it..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={analyzeText} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Message"}
        </button>
      </div>
    </div>
  );
};

// Main App component with routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/features/:featureId" element={<FeaturePage />} />
        <Route path="/scams/:scamId" element={<ScamTypePage />} />
        <Route path="/scams" element={<ScamTypePage />} />
        <Route path="/statistics/:year" element={<StatisticsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
