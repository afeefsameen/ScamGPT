import React from "react";
import { useParams, Link } from "react-router-dom";
import "./FeaturePage.css";

const FeaturePage = () => {
  const { featureId } = useParams();
  
  // Feature data
  const features = {
    "scam-detection": {
      title: "Scam Detection Technology",
      icon: "🔍",
      description: "Our advanced AI-powered scam detection system",
      content: `
        <h2>How Our Scam Detection Works</h2>
        <p>ScamGPT uses a combination of machine learning algorithms and natural language processing to identify potential scams with high accuracy. Our system has been trained on thousands of known scam messages to recognize patterns and red flags that might not be immediately obvious to the average person.</p>
        
        <h3>Key Technologies</h3>
        <ul>
          <li><strong>Natural Language Processing (NLP):</strong> Analyzes the text of messages to identify suspicious patterns, urgency indicators, and manipulation tactics.</li>
          <li><strong>Machine Learning Models:</strong> Trained on a diverse dataset of verified scams to recognize evolving tactics used by scammers.</li>
          <li><strong>Contextual Analysis:</strong> Evaluates messages within their broader context to reduce false positives.</li>
          <li><strong>Pattern Recognition:</strong> Identifies common scam structures even when specific wording changes.</li>
        </ul>
        
        <h3>Detection Accuracy</h3>
        <p>Our system currently achieves over 95% accuracy in identifying common scam types, with continuous improvements as new scam tactics emerge. The AI is particularly effective at detecting:</p>
        <ul>
          <li>Phishing attempts</li>
          <li>KYC fraud</li>
          <li>UPI scams</li>
          <li>Job scams</li>
          <li>Romance scams</li>
          <li>Tech support scams</li>
        </ul>
        
        <h3>Continuous Learning</h3>
        <p>ScamGPT's detection capabilities improve over time as it analyzes more messages and incorporates feedback. This ensures the system stays effective against evolving scam tactics.</p>
      `
    },
    "educational-insights": {
      title: "Educational Insights",
      icon: "💡",
      description: "Understanding how scams work and why they're effective",
      content: `
        <h2>Understanding Scams Through Education</h2>
        <p>Beyond simply identifying scams, ScamGPT provides detailed educational insights to help you understand how scams work and why they're effective. This knowledge is crucial for long-term protection against fraud.</p>
        
        <h3>The Psychology of Scams</h3>
        <p>Scammers exploit fundamental human psychology to manipulate victims. Our educational insights explain common psychological tactics used in scams:</p>
        <ul>
          <li><strong>Authority:</strong> Impersonating trusted institutions like banks or government agencies</li>
          <li><strong>Scarcity:</strong> Creating false time pressure with "limited time offers"</li>
          <li><strong>Fear:</strong> Triggering panic with threats of account closure or legal action</li>
          <li><strong>Greed:</strong> Exploiting desire for easy money with "too good to be true" offers</li>
          <li><strong>Social proof:</strong> Using fake testimonials or references to build credibility</li>
        </ul>
        
        <h3>Red Flag Identification</h3>
        <p>Our system highlights specific red flags in messages and explains why they're suspicious. This educational approach helps you develop your own "scam radar" over time.</p>
        
        <h3>Scam Evolution Tracking</h3>
        <p>ScamGPT tracks how scams evolve over time and educates users about emerging threats and tactics. This proactive approach helps you stay protected against new scam variations.</p>
        
        <h3>Case Studies</h3>
        <p>We provide anonymized real-world examples of scams, showing how they progressed and the techniques used by scammers. These case studies offer valuable learning opportunities to recognize similar patterns in the future.</p>
      `
    },
    "prevention-guidance": {
      title: "Prevention Guidance",
      icon: "🛡️",
      description: "Actionable steps to protect yourself from scams",
      content: `
        <h2>Practical Scam Prevention Strategies</h2>
        <p>Knowledge alone isn't enough to stay safe online. ScamGPT provides actionable, specific guidance on how to protect yourself from various types of scams.</p>
        
        <h3>General Prevention Principles</h3>
        <ul>
          <li><strong>Verify independently:</strong> Always contact organizations directly through official channels, not through links or numbers provided in messages</li>
          <li><strong>Slow down:</strong> Legitimate organizations never demand immediate action</li>
          <li><strong>Guard personal information:</strong> Be extremely cautious about sharing personal or financial details</li>
          <li><strong>Use secure communication:</strong> Enable two-factor authentication on all accounts</li>
          <li><strong>Stay updated:</strong> Keep your devices and software updated with the latest security patches</li>
        </ul>
        
        <h3>Scam-Specific Prevention</h3>
        <p>Different scams require different prevention strategies. ScamGPT provides tailored guidance for each type of scam, including:</p>
        <ul>
          <li><strong>KYC Fraud:</strong> Specific steps to verify legitimate KYC requests</li>
          <li><strong>UPI Scams:</strong> Safe payment practices and verification methods</li>
          <li><strong>Job Scams:</strong> How to verify legitimate job offers and recognize red flags</li>
          <li><strong>Tech Support Scams:</strong> Safe practices for handling technical issues</li>
        </ul>
        
        <h3>Recovery Steps</h3>
        <p>If you've already interacted with a potential scam, ScamGPT provides immediate steps to minimize damage, such as:</p>
        <ul>
          <li>Changing compromised passwords</li>
          <li>Contacting financial institutions</li>
          <li>Monitoring accounts for suspicious activity</li>
          <li>Filing reports with appropriate authorities</li>
        </ul>
      `
    },
    "authority-contacts": {
      title: "Authority Contacts",
      icon: "📱",
      description: "Connect with the right authorities to report scams",
      content: `
        <h2>Reporting Scams to the Right Authorities</h2>
        <p>Reporting scams is crucial not only for your own case but to help authorities track and combat fraud at a larger scale. ScamGPT connects you with the appropriate authorities based on the type of scam you've encountered.</p>
        
        <h3>National Reporting Channels</h3>
        <ul>
          <li><strong>National Cyber Crime Reporting Portal:</strong> The primary channel for reporting all types of cyber crimes in India</li>
          <li><strong>Indian Cyber Crime Coordination Centre (I4C):</strong> Coordinates cyber crime prevention and investigation across India</li>
          <li><strong>Cyber Crime Cells:</strong> Specialized police units dedicated to cyber crime investigation</li>
        </ul>
        
        <h3>Financial Fraud Reporting</h3>
        <ul>
          <li><strong>Reserve Bank of India (RBI):</strong> For banking and financial frauds</li>
          <li><strong>Securities and Exchange Board of India (SEBI):</strong> For investment-related scams</li>
          <li><strong>Banking Ombudsman:</strong> For complaints against banks</li>
          <li><strong>RBI Sachet Portal:</strong> For reporting unauthorized financial schemes</li>
        </ul>
        
        <h3>Specialized Reporting Channels</h3>
        <ul>
          <li><strong>CERT-In:</strong> For cyber security incidents and phishing</li>
          <li><strong>Ministry of Labour & Employment:</strong> For job scams</li>
          <li><strong>Indian Overseas MADAD:</strong> For overseas job fraud</li>
        </ul>
        
        <h3>What to Include in Your Report</h3>
        <p>When reporting a scam, include as much information as possible:</p>
        <ul>
          <li>Original messages or screenshots</li>
          <li>Contact information used by the scammer</li>
          <li>Transaction details (if applicable)</li>
          <li>Timeline of events</li>
          <li>Any other evidence you may have</li>
        </ul>
      `
    }
  };
  
  const feature = features[featureId] || {
    title: "Feature Not Found",
    icon: "❓",
    description: "The requested feature information could not be found.",
    content: "<p>Please return to the home page and select a valid feature.</p>"
  };

  return (
    <div className="feature-page">
      <header className="feature-header">
        <div className="container">
          <Link to="/" className="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
          <div className="feature-icon-large">{feature.icon}</div>
          <h1>{feature.title}</h1>
          <p className="feature-description">{feature.description}</p>
        </div>
      </header>
      
      <main className="feature-content container">
        <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: feature.content }}></div>
        
        <div className="feature-cta">
          <h3>Ready to try ScamGPT?</h3>
          <p>Test our scam detection technology with your own messages.</p>
          <Link to="/chat" className="cta-button">
            Try ScamGPT Now
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </main>
      
      <footer className="feature-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">ScamGPT</div>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/features/scam-detection">Scam Detection</Link>
              <Link to="/features/educational-insights">Educational Insights</Link>
              <Link to="/features/prevention-guidance">Prevention Guidance</Link>
              <Link to="/features/authority-contacts">Authority Contacts</Link>
            </div>
          </div>
          <div className="footer-copyright">
            © 2024 ScamGPT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeaturePage;
