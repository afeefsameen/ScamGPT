import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Simple chart component for scam statistics
const ScamStatChart = () => {
  // Data for the chart
  const chartData = [
    { year: 2019, value: 12213, label: "12,213" },
    { year: 2020, value: 24759, label: "24,759" },
    { year: 2021, value: 52974, label: "52,974" },
    { year: 2022, value: 74129, label: "74,129" },
    { year: 2023, value: 102485, label: "102,485" }
  ];

  // Calculate percentages for bar heights
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className="simple-chart">
      {chartData.map((data, index) => {
        const percentage = (data.value / maxValue) * 100;
        return (
          <div className="simple-chart-item" key={data.year}>
            <div className="simple-chart-bar-container">
              <div
                className={`simple-chart-bar ${data.year === 2023 ? 'highlight' : ''}`}
                style={{ height: `${percentage}%` }}
              >
                <span className="simple-chart-value">{data.label}</span>
              </div>
            </div>
            <div className="simple-chart-year">{data.year}</div>
            <Link to={`/statistics/${data.year}`} className="simple-chart-link">
              View Details
            </Link>
          </div>
        );
      })}
    </div>
  );
};

// News card component
const NewsCard = ({ title, date, source, summary, imageUrl }) => {
  return (
    <div className="news-card">
      <div className="news-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="news-content">
        <h3>{title}</h3>
        <div className="news-meta">
          <span className="news-date">{date}</span>
          <span className="news-source">{source}</span>
        </div>
        <p className="news-summary">{summary}</p>
      </div>
    </div>
  );
};

// Scam type card component
const ScamTypeCard = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="scam-type-link">
      <div className="scam-type-card">
        <div className="scam-type-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="scam-type-footer">
          <span className="learn-more">Learn More →</span>
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  // Sample news data
  const newsItems = [
    {
      title: "Cyber Crime in India Surges by 40% in 2023",
      date: "Jan 15, 2024",
      source: "Cyber Security Times",
      summary: "The National Cyber Crime Reporting Portal reported a significant increase in online scams, with phishing and KYC fraud leading the charts.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "New UPI Scam Alert Issued by RBI",
      date: "Feb 2, 2024",
      source: "Financial Express",
      summary: "Reserve Bank of India warns citizens about a new type of UPI scam where fraudsters pose as bank officials to gain access to accounts.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Government Launches New Cyber Security Initiative",
      date: "Jan 28, 2024",
      source: "Tech Today",
      summary: "The Ministry of Electronics and IT has launched a nationwide program to educate citizens about online scams and cyber security.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>ScamGPT</h1>
          <p className="tagline">AI-Powered Scam Detection & Education</p>
          <p className="header-description">
            Protect yourself from digital fraud with our advanced AI system that identifies scams,
            explains how they work, and connects you with the right authorities.
          </p>
          <Link to="/chat" className="cta-button">
            Try ScamGPT Now
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
        <div className="header-image">
          <div className="shield-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
        </div>
      </header>

      <section className="about-section">
        <h2>About ScamGPT</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              ScamGPT is an advanced AI-powered chatbot designed to help you identify and understand various types of scams.
              Our system uses cutting-edge natural language processing to analyze messages and detect potential fraud.
            </p>
            <p>
              Unlike traditional scam detection tools that simply flag suspicious content, ScamGPT explains <strong>why</strong> a
              message is likely a scam, identifies specific red flags, and provides actionable advice on how to protect yourself.
            </p>
            <p>
              We also connect you with the appropriate authorities in India to report scams, helping to create a safer digital
              environment for everyone.
            </p>
          </div>
          <div className="about-features">
            <Link to="/features/scam-detection" className="feature-link">
              <div className="feature">
                <div className="feature-icon">🔍</div>
                <div className="feature-text">
                  <h3>Scam Detection</h3>
                  <p>Identifies various types of scams with high accuracy</p>
                  <span className="learn-more">Learn More →</span>
                </div>
              </div>
            </Link>
            <Link to="/features/educational-insights" className="feature-link">
              <div className="feature">
                <div className="feature-icon">💡</div>
                <div className="feature-text">
                  <h3>Educational Insights</h3>
                  <p>Explains how scams work and what makes them suspicious</p>
                  <span className="learn-more">Learn More →</span>
                </div>
              </div>
            </Link>
            <Link to="/features/prevention-guidance" className="feature-link">
              <div className="feature">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <h3>Prevention Guidance</h3>
                  <p>Provides actionable steps to protect yourself</p>
                  <span className="learn-more">Learn More →</span>
                </div>
              </div>
            </Link>
            <Link to="/features/authority-contacts" className="feature-link">
              <div className="feature">
                <div className="feature-icon">📱</div>
                <div className="feature-text">
                  <h3>Authority Contacts</h3>
                  <p>Connects you with relevant Indian authorities</p>
                  <span className="learn-more">Learn More →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="scam-types-section">
        <h2>Common Scam Types in India</h2>
        <div className="scam-types-grid">
          <ScamTypeCard
            icon="🏦"
            title="KYC Fraud"
            description="Scammers pose as bank officials claiming your KYC needs updating, then steal your information to access your accounts."
            link="/scams/kyc-fraud"
          />
          <ScamTypeCard
            icon="💳"
            title="UPI Scams"
            description="Fraudsters trick you into sending money via UPI by creating fake payment requests or impersonating legitimate services."
            link="/scams/upi-scams"
          />
          <ScamTypeCard
            icon="📱"
            title="OTP Fraud"
            description="Criminals trick you into sharing One-Time Passwords, giving them access to your accounts and financial services."
            link="/scams/otp-fraud"
          />
          <ScamTypeCard
            icon="💼"
            title="Job Scams"
            description="Fake job offers that require payment for 'registration fees' or 'training materials' but never lead to actual employment."
            link="/scams/job-scams"
          />
          <ScamTypeCard
            icon="💻"
            title="Tech Support Scams"
            description="Scammers claim your device has issues and offer to 'fix' it while actually installing malware or charging for unnecessary services."
            link="/scams/tech-support-scams"
          />
          <ScamTypeCard
            icon="❤️"
            title="Romance Scams"
            description="Fraudsters build fake romantic relationships online, then request money for emergencies or travel to meet you."
            link="/scams/romance-scams"
          />
        </div>
      </section>

      <section className="statistics-section">
        <h2>Cyber Crime Statistics in India</h2>
        <div className="statistics-content">
          <div className="statistics-text">
            <p>
              Cyber crime in India has seen an alarming rise in recent years. According to the National Crime Records Bureau (NCRB),
              reported cyber crimes have increased by over 700% since 2019.
            </p>
            <p>
              Financial fraud represents the largest category, with phishing, KYC fraud, and UPI scams being the most common methods
              used by criminals to target Indian citizens.
            </p>
            <p>
              The Indian government has responded by strengthening the National Cyber Crime Reporting Portal and establishing
              dedicated cyber cells across the country, but public awareness remains the most effective defense.
            </p>
            <div className="key-stats">
              <div className="stat-item">
                <div className="stat-value">₹1,25,000 Cr+</div>
                <div className="stat-label">Annual losses due to cyber crime</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">57%</div>
                <div className="stat-label">Increase in scams in 2023</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">3.17 Lakh</div>
                <div className="stat-label">Complaints filed in 2023</div>
              </div>
            </div>
          </div>
          <div className="statistics-chart">
            <h3>Reported Cyber Crimes in India</h3>
            <div className="chart-wrapper">
              <ScamStatChart />
            </div>
          </div>
        </div>
      </section>

      <section className="news-section">
        <h2>Latest Scam News & Alerts</h2>
        <div className="news-grid">
          {newsItems.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Protect Yourself?</h2>
          <p>
            Try ScamGPT now to analyze suspicious messages, learn about different scam types,
            and get connected with the right authorities to report fraud.
          </p>
          <Link to="/chat" className="cta-button">
            Try ScamGPT Now
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">ScamGPT</div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#scam-types">Scam Types</a>
            <a href="#statistics">Statistics</a>
            <a href="#news">News</a>
          </div>
          <div className="footer-disclaimer">
            <p>
              ScamGPT is an educational tool designed to help identify potential scams.
              Always exercise caution online and consult with appropriate authorities when in doubt.
            </p>
          </div>
        </div>
        <div className="footer-copyright">
          © 2024 ScamGPT. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
