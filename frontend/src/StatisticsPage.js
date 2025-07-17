import React from "react";
import { useParams, Link } from "react-router-dom";
import "./StatisticsPage.css";

const StatisticsPage = () => {
  const { year } = useParams();
  
  // Statistics data by year
  const yearlyStats = {
    "2019": {
      totalReported: 12213,
      growthRate: "-",
      topScams: [
        { type: "Phishing", percentage: 32, count: 3908 },
        { type: "Credit Card Fraud", percentage: 24, count: 2931 },
        { type: "Identity Theft", percentage: 18, count: 2198 },
        { type: "Online Shopping Fraud", percentage: 15, count: 1832 },
        { type: "Social Media Scams", percentage: 11, count: 1344 }
      ],
      stateData: [
        { state: "Maharashtra", count: 2564, percentage: 21 },
        { state: "Karnataka", count: 1954, percentage: 16 },
        { state: "Delhi", count: 1710, percentage: 14 },
        { state: "Tamil Nadu", count: 1221, percentage: 10 },
        { state: "Telangana", count: 977, percentage: 8 }
      ],
      ageGroups: [
        { group: "18-25", percentage: 15 },
        { group: "26-35", percentage: 32 },
        { group: "36-45", percentage: 28 },
        { group: "46-60", percentage: 18 },
        { group: "60+", percentage: 7 }
      ],
      keyInsights: [
        "Cyber crime reporting mechanisms were still developing in India",
        "National Cyber Crime Reporting Portal was in its early stages",
        "Urban centers accounted for over 70% of reported cyber crimes",
        "Limited awareness about cyber crime reporting in rural areas",
        "Banking-related frauds were the most financially damaging"
      ],
      summary: "In 2019, cyber crime reporting in India was still in its developmental phase. The National Cyber Crime Reporting Portal had just been launched, and awareness about cyber crime reporting was primarily concentrated in urban areas. Phishing and credit card fraud were the most common types of cyber crimes reported, with Maharashtra, Karnataka, and Delhi accounting for over 50% of all reports. The financial sector was the most targeted, with banking frauds causing the highest monetary losses."
    },
    "2020": {
      totalReported: 24759,
      growthRate: "+102.7%",
      topScams: [
        { type: "COVID-19 Relief Scams", percentage: 28, count: 6933 },
        { type: "Phishing", percentage: 25, count: 6190 },
        { type: "E-commerce Fraud", percentage: 18, count: 4457 },
        { type: "Social Media Scams", percentage: 16, count: 3961 },
        { type: "Banking Fraud", percentage: 13, count: 3219 }
      ],
      stateData: [
        { state: "Maharashtra", count: 4952, percentage: 20 },
        { state: "Karnataka", count: 3714, percentage: 15 },
        { state: "Delhi", count: 3218, percentage: 13 },
        { state: "Tamil Nadu", count: 2476, percentage: 10 },
        { state: "Uttar Pradesh", count: 2228, percentage: 9 }
      ],
      ageGroups: [
        { group: "18-25", percentage: 18 },
        { group: "26-35", percentage: 35 },
        { group: "36-45", percentage: 26 },
        { group: "46-60", percentage: 15 },
        { group: "60+", percentage: 6 }
      ],
      keyInsights: [
        "COVID-19 pandemic led to a surge in pandemic-related scams",
        "102.7% increase in reported cyber crimes compared to 2019",
        "Significant rise in first-time internet users falling victim to scams",
        "E-commerce fraud increased as online shopping became more prevalent",
        "Government relief program impersonation scams were particularly effective"
      ],
      summary: "2020 marked a significant turning point in cyber crime in India, with reported cases more than doubling from the previous year. The COVID-19 pandemic created new opportunities for scammers, with pandemic-related scams becoming the most prevalent category. As lockdowns forced more people online, many first-time internet users became vulnerable targets. E-commerce fraud saw a substantial increase as online shopping became necessary during lockdowns. Government relief program impersonation scams were particularly effective, with fraudsters exploiting people's financial anxieties during the pandemic."
    },
    "2021": {
      totalReported: 52974,
      growthRate: "+114.0%",
      topScams: [
        { type: "UPI Fraud", percentage: 30, count: 15892 },
        { type: "Investment Scams", percentage: 22, count: 11654 },
        { type: "Vaccine Registration Scams", percentage: 18, count: 9535 },
        { type: "Phishing", percentage: 16, count: 8476 },
        { type: "Social Media Scams", percentage: 14, count: 7416 }
      ],
      stateData: [
        { state: "Maharashtra", count: 9535, percentage: 18 },
        { state: "Karnataka", count: 7946, percentage: 15 },
        { state: "Delhi", count: 6357, percentage: 12 },
        { state: "Telangana", count: 5297, percentage: 10 },
        { state: "Gujarat", count: 4768, percentage: 9 }
      ],
      ageGroups: [
        { group: "18-25", percentage: 22 },
        { group: "26-35", percentage: 38 },
        { group: "36-45", percentage: 24 },
        { group: "46-60", percentage: 12 },
        { group: "60+", percentage: 4 }
      ],
      keyInsights: [
        "UPI-related fraud became the dominant cyber crime category",
        "Digital payment adoption accelerated, leading to more payment-related scams",
        "Investment scams targeting cryptocurrency and stock market gained popularity",
        "Vaccine registration scams exploited the vaccination drive",
        "114% increase in reported cyber crimes compared to 2020"
      ],
      summary: "2021 saw another dramatic increase in cyber crime reports, with cases more than doubling again from the previous year. UPI fraud emerged as the dominant category, reflecting India's rapid adoption of digital payment systems. Investment scams targeting cryptocurrency and stock market investments gained significant traction as more Indians began exploring investment opportunities online. Vaccine registration scams became prevalent as India's vaccination drive accelerated. The younger demographic (18-35) accounted for 60% of all victims, indicating their higher engagement with digital platforms."
    },
    "2022": {
      totalReported: 74129,
      growthRate: "+39.9%",
      topScams: [
        { type: "KYC Fraud", percentage: 27, count: 20015 },
        { type: "Loan App Scams", percentage: 23, count: 17050 },
        { type: "Job Fraud", percentage: 19, count: 14085 },
        { type: "UPI Fraud", percentage: 17, count: 12602 },
        { type: "Investment Scams", percentage: 14, count: 10378 }
      ],
      stateData: [
        { state: "Maharashtra", count: 12602, percentage: 17 },
        { state: "Karnataka", count: 10378, percentage: 14 },
        { state: "Telangana", count: 8895, percentage: 12 },
        { state: "Delhi", count: 7413, percentage: 10 },
        { state: "Tamil Nadu", count: 6672, percentage: 9 }
      ],
      ageGroups: [
        { group: "18-25", percentage: 25 },
        { group: "26-35", percentage: 36 },
        { group: "36-45", percentage: 22 },
        { group: "46-60", percentage: 13 },
        { group: "60+", percentage: 4 }
      ],
      keyInsights: [
        "KYC fraud became the most reported cyber crime category",
        "Fraudulent loan apps targeting financially vulnerable individuals proliferated",
        "Job fraud increased amid post-pandemic employment challenges",
        "Improved reporting mechanisms led to better documentation of cyber crimes",
        "39.9% increase in reported cyber crimes compared to 2021"
      ],
      summary: "In 2022, cyber crime reports continued to rise, though at a slower rate than the previous two years. KYC fraud emerged as the most reported category, with scammers impersonating banks and financial institutions to steal personal information. Fraudulent loan apps targeting financially vulnerable individuals became a major concern, often charging exorbitant interest rates and using harassment tactics. Job fraud increased significantly as people sought employment opportunities in the post-pandemic economy. The growth rate of 39.9%, while lower than previous years, still represented a substantial increase in absolute numbers."
    },
    "2023": {
      totalReported: 102485,
      growthRate: "+38.3%",
      topScams: [
        { type: "Digital Payment Fraud", percentage: 26, count: 26646 },
        { type: "Social Media Scams", percentage: 22, count: 22547 },
        { type: "Crypto Scams", percentage: 19, count: 19472 },
        { type: "KYC Fraud", percentage: 18, count: 18447 },
        { type: "Job Fraud", percentage: 15, count: 15373 }
      ],
      stateData: [
        { state: "Maharashtra", count: 17422, percentage: 17 },
        { state: "Karnataka", count: 13323, percentage: 13 },
        { state: "Telangana", count: 11273, percentage: 11 },
        { state: "Delhi", count: 10249, percentage: 10 },
        { state: "Gujarat", count: 9224, percentage: 9 }
      ],
      ageGroups: [
        { group: "18-25", percentage: 28 },
        { group: "26-35", percentage: 35 },
        { group: "36-45", percentage: 21 },
        { group: "46-60", percentage: 12 },
        { group: "60+", percentage: 4 }
      ],
      keyInsights: [
        "Digital payment fraud became the most reported cyber crime category",
        "Social engineering tactics became more sophisticated and effective",
        "Cryptocurrency-related scams saw a significant increase",
        "Younger demographics (18-35) accounted for 63% of all victims",
        "38.3% increase in reported cyber crimes compared to 2022"
      ],
      summary: "2023 marked the first year that reported cyber crimes in India crossed the 100,000 mark, highlighting the escalating digital security challenges facing the country. Digital payment fraud became the most reported category, reflecting the continued growth of India's digital economy. Social media scams increased substantially, with sophisticated social engineering tactics targeting users across platforms. Cryptocurrency-related scams saw significant growth as more Indians began exploring digital assets. The younger demographic remained the most vulnerable, with 18-35 year-olds accounting for 63% of all victims. The Indian government responded by strengthening the National Cyber Crime Reporting Portal and establishing more dedicated cyber cells across the country."
    }
  };
  
  const yearData = yearlyStats[year] || {
    totalReported: 0,
    growthRate: "N/A",
    topScams: [],
    stateData: [],
    ageGroups: [],
    keyInsights: ["Data not available for the selected year"],
    summary: "Statistical data is not available for the selected year."
  };

  // Calculate previous and next years for navigation
  const yearNum = parseInt(year);
  const prevYear = (yearNum > 2019) ? (yearNum - 1).toString() : null;
  const nextYear = (yearNum < 2023) ? (yearNum + 1).toString() : null;

  return (
    <div className="stats-page">
      <header className="stats-header">
        <div className="container">
          <Link to="/" className="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
          <h1>Cyber Crime Statistics {year}</h1>
          <p className="stats-description">Comprehensive analysis of cyber crime trends and patterns in India</p>
          
          <div className="year-navigation">
            {prevYear && (
              <Link to={`/statistics/${prevYear}`} className="year-nav-button prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                {prevYear}
              </Link>
            )}
            
            <div className="current-year">{year}</div>
            
            {nextYear && (
              <Link to={`/statistics/${nextYear}`} className="year-nav-button next">
                {nextYear}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="stats-content container">
        <div className="stats-overview">
          <div className="stat-card total">
            <div className="stat-value">{yearData.totalReported.toLocaleString()}</div>
            <div className="stat-label">Total Reported Cyber Crimes</div>
          </div>
          
          <div className="stat-card growth">
            <div className="stat-value">{yearData.growthRate}</div>
            <div className="stat-label">Growth from Previous Year</div>
          </div>
          
          <div className="stat-card victims">
            <div className="stat-value">18-35</div>
            <div className="stat-label">Most Affected Age Group</div>
          </div>
          
          <div className="stat-card region">
            <div className="stat-value">{yearData.stateData[0]?.state || "N/A"}</div>
            <div className="stat-label">Most Affected State</div>
          </div>
        </div>
        
        <div className="stats-summary">
          <h2>Executive Summary</h2>
          <p>{yearData.summary}</p>
        </div>
        
        <div className="stats-grid">
          <div className="stats-section top-scams">
            <h2>Top Scam Types</h2>
            <div className="bar-chart">
              {yearData.topScams.map((scam, index) => (
                <div className="chart-item" key={index}>
                  <div className="chart-label">
                    <span className="chart-rank">{index + 1}</span>
                    <span>{scam.type}</span>
                  </div>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar" 
                      style={{ width: `${scam.percentage}%` }}
                      data-percentage={`${scam.percentage}%`}
                    ></div>
                  </div>
                  <div className="chart-value">{scam.count.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="stats-section age-distribution">
            <h2>Age Distribution of Victims</h2>
            <div className="pie-chart">
              {yearData.ageGroups.map((group, index) => (
                <div className="pie-segment" key={index}>
                  <div className="segment-color" style={{ backgroundColor: getAgeGroupColor(index) }}></div>
                  <div className="segment-label">{group.group}</div>
                  <div className="segment-value">{group.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="stats-section geographical">
          <h2>Geographical Distribution</h2>
          <div className="state-chart">
            {yearData.stateData.map((state, index) => (
              <div className="state-item" key={index}>
                <div className="state-name">{state.state}</div>
                <div className="state-bar-container">
                  <div 
                    className="state-bar" 
                    style={{ width: `${state.percentage * 3}%` }}
                    data-percentage={`${state.percentage}%`}
                  ></div>
                </div>
                <div className="state-value">{state.count.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="stats-section key-insights">
          <h2>Key Insights</h2>
          <ul className="insights-list">
            {yearData.keyInsights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
        
        <div className="stats-cta">
          <h3>Protect Yourself from Cyber Crimes</h3>
          <p>Use our AI-powered tool to check if a message you've received might be a scam.</p>
          <Link to="/chat" className="cta-button">
            Try ScamGPT Now
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </main>
      
      <footer className="stats-footer">
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
          <div className="footer-disclaimer">
            <p>Data sources: National Crime Records Bureau (NCRB), Indian Cyber Crime Coordination Centre (I4C), and Ministry of Home Affairs reports.</p>
          </div>
          <div className="footer-copyright">
            © 2024 ScamGPT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper function to get colors for age groups
const getAgeGroupColor = (index) => {
  const colors = ['#4f46e5', '#818cf8', '#93c5fd', '#bae6fd', '#e0f2fe'];
  return colors[index % colors.length];
};

export default StatisticsPage;
