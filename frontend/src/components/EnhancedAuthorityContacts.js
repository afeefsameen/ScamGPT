import React from 'react';
import './EnhancedAuthorityContacts.css';

const EnhancedAuthorityContacts = ({ scamType, authorityContacts }) => {
  // Log props for debugging
  console.log("EnhancedAuthorityContacts props:", { scamType, authorityContacts });

  // Define contact information for different authorities based on scam type
  const getAuthorities = () => {
    // If we have authority contacts from the backend, use those
    if (authorityContacts && authorityContacts.length > 0) {
      console.log("Using authority contacts from backend:", authorityContacts);
      return authorityContacts;
    }

    // Otherwise, use hardcoded authorities as fallback
    // Indian authorities for all types of scams
    const indianAuthorities = [
      {
        name: "National Cyber Crime Reporting Portal",
        description: "Report all types of cyber crimes in India",
        contact: "cybercrime.gov.in or call 1930",
        website: "https://cybercrime.gov.in/"
      },
      {
        name: "Indian Cyber Crime Coordination Centre (I4C)",
        description: "Central agency for cybercrime coordination",
        contact: "Report through National Cyber Crime Reporting Portal",
        website: "https://cybercrime.gov.in/"
      },
      {
        name: "Local Police Cyber Cell",
        description: "Report to your nearest police cyber cell",
        contact: "Find your local cyber cell contact information",
        website: "https://www.cybercell.in/"
      }
    ];

    // Add specialized authorities based on scam type
    const scamTypeLC = scamType ? scamType.toLowerCase() : '';

    if (scamTypeLC.includes('phishing') || scamTypeLC.includes('account') || scamTypeLC.includes('kyc')) {
      return [
        ...indianAuthorities,
        {
          name: "CERT-In (Indian Computer Emergency Response Team)",
          description: "Report phishing and other cyber security incidents",
          contact: "incident@cert-in.org.in",
          website: "https://www.cert-in.org.in/"
        },
        {
          name: "RBI Sachet Portal",
          description: "Report financial frauds related to banking",
          contact: "sachet.rbi.org.in",
          website: "https://sachet.rbi.org.in/"
        },
        {
          name: "Reserve Bank of India (RBI)",
          description: "Report banking related frauds",
          contact: "rbi.org.in or call 14440",
          website: "https://rbi.org.in/"
        }
      ];
    } else if (scamTypeLC.includes('upi') || scamTypeLC.includes('payment')) {
      return [
        ...indianAuthorities,
        {
          name: "Reserve Bank of India (RBI)",
          description: "Report banking and UPI related frauds",
          contact: "rbi.org.in or call 14440",
          website: "https://rbi.org.in/"
        },
        {
          name: "Banking Ombudsman",
          description: "Resolve complaints against banks",
          contact: "cms.rbi.org.in",
          website: "https://cms.rbi.org.in/"
        }
      ];
    } else if (scamTypeLC.includes('job') || scamTypeLC.includes('employment')) {
      return [
        ...indianAuthorities,
        {
          name: "Ministry of Labour & Employment",
          description: "Report fraudulent job offers and employment scams",
          contact: "labour.gov.in",
          website: "https://labour.gov.in/"
        },
        {
          name: "Indian Overseas MADAD",
          description: "For overseas job fraud",
          contact: "madad.gov.in",
          website: "https://madad.gov.in/"
        }
      ];
    } else if (scamTypeLC.includes('investment') || scamTypeLC.includes('lottery')) {
      return [
        ...indianAuthorities,
        {
          name: "Securities and Exchange Board of India (SEBI)",
          description: "Report investment frauds and scams",
          contact: "sebi.gov.in or SEBI SCORES portal",
          website: "https://www.sebi.gov.in/"
        },
        {
          name: "RBI Sachet Portal",
          description: "Report unauthorized financial schemes",
          contact: "sachet.rbi.org.in",
          website: "https://sachet.rbi.org.in/"
        }
      ];
    } else if (scamTypeLC.includes('otp') || scamTypeLC.includes('password')) {
      return [
        ...indianAuthorities,
        {
          name: "CERT-In (Indian Computer Emergency Response Team)",
          description: "Report phishing and other cyber security incidents",
          contact: "incident@cert-in.org.in",
          website: "https://www.cert-in.org.in/"
        }
      ];
    } else {
      // Default authorities for other scam types
      return indianAuthorities;
    }
  };

  const authorities = getAuthorities();

  return (
    <div className="enhanced-authority-contacts">
      <h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        Report to Indian Authorities
      </h3>
      <p className="authority-intro">If you've encountered this scam, report it to these official agencies. They can help investigate the incident, potentially recover lost funds, and prevent others from becoming victims.</p>
      <div className="authority-list">
        {authorities.map((authority, index) => (
          <div key={index} className="authority-item">
            <div className="authority-name">{authority.name}</div>
            <div className="authority-description">{authority.description}</div>
            <div className="authority-contact">
              {authority.website ? (
                <a href={authority.website} target="_blank" rel="noopener noreferrer" className="authority-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  <span>{authority.contact}</span>
                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              ) : (
                <div className="authority-contact-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>{authority.contact}</span>
                </div>
              )}
            </div>
            <div className="authority-actions">
              <button className="report-button" onClick={() => window.open(authority.website || 'https://cybercrime.gov.in/', '_blank')}>
                Report Scam
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 17l5-5-5-5"></path>
                  <path d="M6 17l5-5-5-5"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedAuthorityContacts;
