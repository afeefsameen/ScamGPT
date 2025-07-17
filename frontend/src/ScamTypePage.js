import React from "react";
import { useParams, Link } from "react-router-dom";
import "./ScamTypePage.css";

const ScamTypePage = () => {
  const { scamId } = useParams();
  
  // Scam type data
  const scamTypes = {
    "kyc-fraud": {
      title: "KYC Fraud",
      icon: "🏦",
      description: "Scammers pose as bank officials claiming your KYC needs updating",
      content: `
        <h2>Understanding KYC Fraud</h2>
        <p>KYC (Know Your Customer) fraud is one of the most common scams in India, where fraudsters impersonate bank officials or financial institutions to trick you into sharing sensitive personal and financial information under the pretext of updating your KYC details.</p>
        
        <h3>How KYC Fraud Works</h3>
        <p>The typical KYC fraud follows these steps:</p>
        <ol>
          <li><strong>Initial Contact:</strong> You receive a message or call claiming to be from your bank, stating that your KYC needs to be updated urgently or your account will be blocked.</li>
          <li><strong>Creating Urgency:</strong> The scammer creates a sense of urgency, often claiming your account will be suspended within 24-48 hours if you don't comply.</li>
          <li><strong>Requesting Information:</strong> They ask for personal details like Aadhaar number, PAN card, bank account details, or debit card information.</li>
          <li><strong>Phishing Link:</strong> They may send a fraudulent link that looks like a legitimate bank website but is designed to steal your information.</li>
          <li><strong>OTP Fraud:</strong> In some cases, they may ask for OTPs received on your phone, claiming it's for verification purposes.</li>
        </ol>
        
        <h3>Red Flags to Watch For</h3>
        <ul>
          <li>Unsolicited messages or calls about KYC updates</li>
          <li>Urgent deadlines or threats of account suspension</li>
          <li>Requests for personal information via call, SMS, or WhatsApp</li>
          <li>Links that don't match the official bank domain</li>
          <li>Poor grammar or spelling in official communications</li>
          <li>Requests for OTPs or banking passwords</li>
        </ul>
        
        <h3>Real-Life Example</h3>
        <div class="example-box">
          <h4>Common KYC Fraud Message</h4>
          <p class="example-text">"Dear Customer, Your SBI account will be blocked today as your KYC documents expired. Update KYC immediately: http://sbi-kyc-update.co.in"</p>
          <div class="example-analysis">
            <p><strong>Red Flags:</strong></p>
            <ul>
              <li>Creates false urgency ("will be blocked today")</li>
              <li>Uses a suspicious domain (legitimate SBI domain is sbi.co.in)</li>
              <li>Unsolicited message about KYC expiry</li>
            </ul>
          </div>
        </div>
        
        <h3>Prevention Measures</h3>
        <ul>
          <li><strong>Verify Independently:</strong> Always contact your bank directly through their official customer care number printed on your debit/credit card or from their official website.</li>
          <li><strong>Never Share OTPs:</strong> Banks never ask for OTPs over phone calls or messages.</li>
          <li><strong>Check URLs Carefully:</strong> Before clicking on any link, verify that it's the official domain of your bank.</li>
          <li><strong>Use Official Apps:</strong> Complete KYC updates only through official banking apps or by visiting a branch in person.</li>
          <li><strong>Report Suspicious Activity:</strong> If you receive suspicious KYC-related communications, report them to your bank and the cyber crime portal immediately.</li>
        </ul>
        
        <h3>If You've Been a Victim</h3>
        <ol>
          <li>Contact your bank immediately to block your cards and accounts</li>
          <li>Change passwords for all your financial accounts</li>
          <li>File a complaint on the National Cyber Crime Reporting Portal (cybercrime.gov.in)</li>
          <li>Report to your local police cyber cell</li>
          <li>Monitor your accounts for any unauthorized transactions</li>
        </ol>
      `
    },
    "upi-scams": {
      title: "UPI Scams",
      icon: "💳",
      description: "Fraudsters trick you into sending money via UPI",
      content: `
        <h2>Understanding UPI Scams</h2>
        <p>UPI (Unified Payments Interface) scams have become increasingly common in India as digital payments gain popularity. These scams exploit the convenience and widespread use of UPI apps like Google Pay, PhonePe, and BHIM to trick users into transferring money to fraudsters.</p>
        
        <h3>How UPI Scams Work</h3>
        <p>UPI scammers typically use these methods:</p>
        <ol>
          <li><strong>Request Money Fraud:</strong> Scammers send you a "request money" notification but claim they're actually trying to send you money. When you approve the request, you're actually sending them money instead.</li>
          <li><strong>QR Code Scams:</strong> Fraudsters share QR codes claiming you need to scan them to receive money, but scanning and approving actually transfers money to them.</li>
          <li><strong>Fake Customer Support:</strong> Scammers pose as customer support for popular UPI apps and trick users into sharing sensitive information or making transactions.</li>
          <li><strong>Impersonation Scams:</strong> Fraudsters pretend to be someone you know (like a friend or family member) and request urgent money transfers.</li>
          <li><strong>Fake Cashback Offers:</strong> Scammers create fake cashback or reward schemes that require you to make a UPI payment to "claim" your reward.</li>
        </ol>
        
        <h3>Red Flags to Watch For</h3>
        <ul>
          <li>Unexpected requests for money from unknown numbers</li>
          <li>Messages claiming you need to "receive" money by scanning a QR code</li>
          <li>Unsolicited customer support calls asking for UPI details</li>
          <li>Offers that seem too good to be true (excessive cashback, rewards)</li>
          <li>Urgent money requests even from contacts (verify via call first)</li>
          <li>Requests to share your UPI PIN or OTP</li>
        </ul>
        
        <h3>Real-Life Example</h3>
        <div class="example-box">
          <h4>Common UPI Scam Scenario</h4>
          <p class="example-text">"Hello, I am calling from PhonePe customer care. Your account needs verification or it will be blocked. Please scan this QR code to verify your account and receive ₹500 bonus."</p>
          <div class="example-analysis">
            <p><strong>Red Flags:</strong></p>
            <ul>
              <li>Unsolicited call claiming to be from customer support</li>
              <li>Threat of account blocking to create urgency</li>
              <li>Offering money as an incentive</li>
              <li>Asking to scan a QR code for "verification"</li>
            </ul>
          </div>
        </div>
        
        <h3>Prevention Measures</h3>
        <ul>
          <li><strong>Verify Before Paying:</strong> Always double-check if you're sending or receiving money before approving any UPI request.</li>
          <li><strong>Be Cautious with QR Codes:</strong> Scanning a QR code should only be done when you're making a payment, not when receiving money.</li>
          <li><strong>Check UPI IDs:</strong> Verify the UPI ID you're sending money to, especially for businesses.</li>
          <li><strong>Ignore Unsolicited Support:</strong> Legitimate UPI apps never call you for verification or to offer rewards.</li>
          <li><strong>Verify Contacts:</strong> If a friend or family member requests money urgently, call them directly to confirm.</li>
          <li><strong>Never Share:</strong> Never share your UPI PIN, OTP, or other sensitive information with anyone.</li>
        </ul>
        
        <h3>If You've Been a Victim</h3>
        <ol>
          <li>Report the fraud to your bank and UPI app immediately</li>
          <li>File a complaint on the National Cyber Crime Reporting Portal</li>
          <li>Report to your local police cyber cell</li>
          <li>Save all communication with the scammer as evidence</li>
          <li>Check if your UPI app has an option to report fraudulent transactions</li>
        </ol>
      `
    },
    "otp-fraud": {
      title: "OTP Fraud",
      icon: "📱",
      description: "Criminals trick you into sharing One-Time Passwords",
      content: `
        <h2>Understanding OTP Fraud</h2>
        <p>OTP (One-Time Password) fraud is a sophisticated scam where fraudsters manipulate victims into sharing the verification codes sent to their mobile phones, giving scammers access to financial accounts, personal information, and the ability to authorize fraudulent transactions.</p>
        
        <h3>How OTP Fraud Works</h3>
        <p>The typical OTP fraud follows these steps:</p>
        <ol>
          <li><strong>Initial Contact:</strong> Scammers call or message pretending to be from your bank, a government agency, or a service you use.</li>
          <li><strong>Creating a Pretext:</strong> They create a convincing story - updating your account, verifying your identity, offering a refund, or claiming suspicious activity on your account.</li>
          <li><strong>Initiating the Real Transaction:</strong> Behind the scenes, they attempt a transaction using your leaked information (like card details) which triggers a legitimate OTP from your bank.</li>
          <li><strong>Requesting the OTP:</strong> They ask you to share the OTP you just received, claiming it's for verification purposes.</li>
          <li><strong>Completing the Fraud:</strong> Once you share the OTP, they use it to complete the fraudulent transaction or gain access to your accounts.</li>
        </ol>
        
        <h3>Red Flags to Watch For</h3>
        <ul>
          <li>Unsolicited calls asking for OTPs</li>
          <li>Callers creating urgency or fear</li>
          <li>Requests to share OTPs to "stop" or "verify" transactions</li>
          <li>Callers asking you to download remote access apps</li>
          <li>Receiving an OTP when you haven't initiated any transaction</li>
          <li>Callers claiming to be from government agencies or banks</li>
        </ul>
        
        <h3>Real-Life Example</h3>
        <div class="example-box">
          <h4>Common OTP Fraud Scenario</h4>
          <p class="example-text">"Hello, I'm calling from HDFC Bank security department. We've detected suspicious transactions on your account. To block these transactions, we need to verify your identity. You'll receive an OTP - please share it with me so I can stop these unauthorized transactions."</p>
          <div class="example-analysis">
            <p><strong>Red Flags:</strong></p>
            <ul>
              <li>Creating fear about unauthorized transactions</li>
              <li>Claiming to need the OTP to "block" transactions</li>
              <li>Unsolicited call claiming to be from bank security</li>
              <li>Urgency in the request</li>
            </ul>
          </div>
        </div>
        
        <h3>Prevention Measures</h3>
        <ul>
          <li><strong>Never Share OTPs:</strong> No legitimate organization will ever ask for your OTP over phone, email, or message.</li>
          <li><strong>Understand OTP Purpose:</strong> OTPs are only used to APPROVE transactions, never to cancel, verify, or block them.</li>
          <li><strong>Verify Independently:</strong> If you receive a suspicious call, hang up and call the official number of your bank or service provider.</li>
          <li><strong>Be Alert to Timing:</strong> Be especially suspicious if you receive an OTP without initiating any transaction, followed by a call asking for it.</li>
          <li><strong>Read OTP Messages:</strong> The SMS containing the OTP usually specifies what it's for - read it carefully.</li>
          <li><strong>Enable Additional Security:</strong> Use biometric authentication where available for additional security.</li>
        </ul>
        
        <h3>If You've Been a Victim</h3>
        <ol>
          <li>Contact your bank immediately to report the fraud</li>
          <li>Change passwords for all your financial accounts</li>
          <li>Check your accounts for unauthorized transactions</li>
          <li>File a complaint on the National Cyber Crime Reporting Portal</li>
          <li>Report to your local police cyber cell</li>
        </ol>
      `
    },
    "job-scams": {
      title: "Job Scams",
      icon: "💼",
      description: "Fake job offers that require payment for 'registration fees'",
      content: `
        <h2>Understanding Job Scams</h2>
        <p>Job scams target job seekers by offering lucrative employment opportunities that require upfront payments for various purposes. These scams have become increasingly sophisticated and prevalent in India, especially targeting young graduates and professionals looking for better opportunities.</p>
        
        <h3>How Job Scams Work</h3>
        <p>Job scammers typically follow these patterns:</p>
        <ol>
          <li><strong>Attractive Job Offers:</strong> Scammers post fake job listings with attractive salaries, often for well-known companies, on job portals or social media.</li>
          <li><strong>Minimal Screening:</strong> They conduct superficial interviews, often via text or instant messaging, and quickly "select" candidates regardless of qualifications.</li>
          <li><strong>Requesting Payments:</strong> Before finalizing the job, they ask for payments for various reasons - registration fees, security deposits, document verification, training materials, etc.</li>
          <li><strong>Fake Documentation:</strong> They may provide official-looking offer letters, appointment letters, or agreements to appear legitimate.</li>
          <li><strong>Disappearing Act:</strong> Once payment is made, the scammers become unreachable or continue asking for additional payments.</li>
        </ol>
        
        <h3>Red Flags to Watch For</h3>
        <ul>
          <li>Job offers with unusually high salaries for minimal qualifications</li>
          <li>Requests for payment before joining</li>
          <li>Job offers without proper interviews or screening</li>
          <li>Communication only via WhatsApp or personal email (not company domain)</li>
          <li>Grammatical errors in official communications</li>
          <li>Pressure to pay quickly to "secure the position"</li>
          <li>Job offers from companies you never applied to</li>
        </ul>
        
        <h3>Real-Life Example</h3>
        <div class="example-box">
          <h4>Common Job Scam Message</h4>
          <p class="example-text">"Congratulations! You've been selected for a Data Entry position at Amazon with a salary of ₹45,000 per month. Work from home option available. To confirm your position, please pay ₹3,000 as a refundable security deposit. Contact HR at amazon.jobs.india@gmail.com"</p>
          <div class="example-analysis">
            <p><strong>Red Flags:</strong></p>
            <ul>
              <li>Unusually high salary for an entry-level position</li>
              <li>Request for security deposit</li>
              <li>Non-corporate email address (gmail instead of amazon.com)</li>
              <li>No formal interview process mentioned</li>
              <li>Too-good-to-be-true work from home option</li>
            </ul>
          </div>
        </div>
        
        <h3>Prevention Measures</h3>
        <ul>
          <li><strong>No Legitimate Job Requires Payment:</strong> Legitimate employers never ask candidates to pay for job opportunities.</li>
          <li><strong>Research the Company:</strong> Verify the company exists and check if the job is listed on their official website.</li>
          <li><strong>Verify Contact Information:</strong> Ensure you're communicating with someone using an official company email domain.</li>
          <li><strong>Be Skeptical of Easy Money:</strong> If the salary seems too good to be true for the qualifications required, it probably is.</li>
          <li><strong>Complete Interview Process:</strong> Legitimate companies have thorough interview processes, not just quick text chats.</li>
          <li><strong>Check for Online Reviews:</strong> Search for "[Company Name] job scam" to see if others have reported similar experiences.</li>
        </ul>
        
        <h3>If You've Been a Victim</h3>
        <ol>
          <li>Stop all communication with the scammers</li>
          <li>Report to the job portal where you found the listing</li>
          <li>File a complaint on the National Cyber Crime Reporting Portal</li>
          <li>Report to your local police cyber cell</li>
          <li>Alert your bank if you've made any payments</li>
          <li>Report to the Ministry of Labour & Employment</li>
        </ol>
      `
    },
    "tech-support-scams": {
      title: "Tech Support Scams",
      icon: "💻",
      description: "Scammers claim your device has issues and offer to 'fix' it",
      content: `
        <h2>Understanding Tech Support Scams</h2>
        <p>Tech support scams involve fraudsters who claim to be from well-known technology companies like Microsoft, Apple, or Google, telling victims their computer or device has a serious problem that needs immediate attention. These scams are particularly effective because they exploit people's limited technical knowledge and fear of security threats.</p>
        
        <h3>How Tech Support Scams Work</h3>
        <p>Tech support scammers typically use these approaches:</p>
        <ol>
          <li><strong>Cold Calls:</strong> Scammers call claiming to be from Microsoft, Apple, or other tech companies, saying they've detected problems with your device.</li>
          <li><strong>Pop-up Warnings:</strong> Fake security alerts appear on your screen with a phone number to call for "technical support."</li>
          <li><strong>Search Engine Ads:</strong> When searching for technical support, scammers place ads that appear at the top of search results.</li>
          <li><strong>Remote Access:</strong> They convince you to download remote access software so they can "fix" your computer.</li>
          <li><strong>Fake Problems:</strong> They run fake scans or show normal system logs claiming they're evidence of serious problems.</li>
          <li><strong>Payment for "Services":</strong> They charge for unnecessary services, often demanding payment via gift cards or wire transfers.</li>
        </ol>
        
        <h3>Red Flags to Watch For</h3>
        <ul>
          <li>Unsolicited calls about technical problems</li>
          <li>Callers creating urgency or fear about your device</li>
          <li>Requests to download remote access software</li>
          <li>Demands for payment to fix "critical issues"</li>
          <li>Requests for payment via gift cards or wire transfers</li>
          <li>Websites or pop-ups that can't be closed easily</li>
          <li>Pressure to make quick decisions</li>
        </ul>
        
        <h3>Real-Life Example</h3>
        <div class="example-box">
          <h4>Common Tech Support Scam Scenario</h4>
          <p class="example-text">"This is Microsoft Technical Department. We've detected dangerous virus activity from your computer that is stealing your personal information. Your Windows license will be terminated if not fixed immediately. Call our support team at +91-XXX-XXX-XXXX now to protect your data."</p>
          <div class="example-analysis">
            <p><strong>Red Flags:</strong></p>
            <ul>
              <li>Unsolicited contact claiming to be from Microsoft</li>
              <li>Creating fear about viruses and data theft</li>
              <li>Threatening to terminate your Windows license</li>
              <li>Urgent call to action</li>
              <li>Microsoft never proactively contacts customers about viruses</li>
            </ul>
          </div>
        </div>
        
        <h3>Prevention Measures</h3>
        <ul>
          <li><strong>Be Skeptical of Unsolicited Contacts:</strong> Microsoft, Apple, and Google do not make unsolicited calls about technical issues.</li>
          <li><strong>Never Allow Remote Access:</strong> Don't give strangers remote access to your computer unless you initiated contact with a legitimate support service.</li>
          <li><strong>Verify the Source:</strong> If you get a call or pop-up, hang up or close the browser. Contact the company directly through their official website.</li>
          <li><strong>Don't Trust Caller ID:</strong> Scammers can fake caller ID information to appear legitimate.</li>
          <li><strong>Use Official Support Channels:</strong> Go directly to the company's official website and find their support contact information.</li>
          <li><strong>Keep Software Updated:</strong> Maintain updated antivirus software and keep your operating system current.</li>
        </ul>
        
        <h3>If You've Been a Victim</h3>
        <ol>
          <li>Disconnect from the internet immediately</li>
          <li>Uninstall any software the scammer had you install</li>
          <li>Change passwords for all your accounts, especially financial ones</li>
          <li>Run a legitimate antivirus scan</li>
          <li>Contact your bank if you shared payment information</li>
          <li>Report to CERT-In (Indian Computer Emergency Response Team)</li>
          <li>File a complaint on the National Cyber Crime Reporting Portal</li>
        </ol>
      `
    },
    "romance-scams": {
      title: "Romance Scams",
      icon: "❤️",
      description: "Fraudsters build fake romantic relationships online",
      content: `
        <h2>Understanding Romance Scams</h2>
        <p>Romance scams involve fraudsters creating fake identities to establish romantic relationships with victims online, with the ultimate goal of exploiting them financially. These scams are particularly devastating as they manipulate emotions and can continue for months or even years.</p>
        
        <h3>How Romance Scams Work</h3>
        <p>Romance scammers typically follow this pattern:</p>
        <ol>
          <li><strong>Creating Fake Profiles:</strong> Scammers create attractive profiles on dating apps, social media, or matrimonial sites, often using stolen photos of good-looking individuals.</li>
          <li><strong>Fast Emotional Connection:</strong> They quickly express deep feelings and establish an intense emotional connection, sometimes within days or weeks.</li>
          <li><strong>Moving Communication:</strong> They prefer to move conversations to private messaging platforms like WhatsApp or Telegram.</li>
          <li><strong>Avoiding Video Calls:</strong> They make excuses to avoid video calls or in-person meetings, often claiming to be working abroad.</li>
          <li><strong>Building Trust:</strong> They spend weeks or months building trust and emotional dependency before asking for money.</li>
          <li><strong>Creating Emergencies:</strong> They eventually create a crisis situation requiring urgent financial help - medical emergencies, travel expenses to meet you, customs fees, etc.</li>
          <li><strong>Continuous Requests:</strong> Once you send money, they continue creating new emergencies requiring additional funds.</li>
        </ol>
        
        <h3>Red Flags to Watch For</h3>
        <ul>
          <li>Profiles that seem too perfect (very attractive photos, ideal job, shared interests)</li>
          <li>Declaring love or deep feelings unusually quickly</li>
          <li>Vague or inconsistent personal details</li>
          <li>Claims of working abroad in specific professions (military, oil rig worker, international doctor)</li>
          <li>Reluctance or excuses to video chat or meet in person</li>
          <li>Requests for money for emergencies, travel, or medical issues</li>
          <li>Requests for financial assistance via wire transfers, gift cards, or cryptocurrency</li>
          <li>Poor grammar or inconsistent language skills despite claiming to be educated</li>
        </ul>
        
        <h3>Real-Life Example</h3>
        <div class="example-box">
          <h4>Common Romance Scam Scenario</h4>
          <p class="example-text">"My dear, I can't wait to finally meet you in person. I've booked my flight to India, but there's a problem. The company hasn't paid me this month, and I need ₹50,000 for the ticket. Once I arrive, I'll repay you immediately. I'm so desperate to hold you in my arms. Please help me - you're the only one I can trust."</p>
          <div class="example-analysis">
            <p><strong>Red Flags:</strong></p>
            <ul>
              <li>Creating urgency around travel plans</li>
              <li>Unexpected financial problem preventing the meeting</li>
              <li>Specific amount requested</li>
              <li>Promise of immediate repayment upon arrival</li>
              <li>Emotional manipulation ("desperate to hold you", "only one I can trust")</li>
            </ul>
          </div>
        </div>
        
        <h3>Prevention Measures</h3>
        <ul>
          <li><strong>Research the Person:</strong> Perform reverse image searches on profile pictures to check if they're stolen from elsewhere.</li>
          <li><strong>Video Chat Early:</strong> Insist on video calls early in the relationship to confirm their identity.</li>
          <li><strong>Take It Slow:</strong> Be wary of anyone who declares their love very quickly or seems too perfect.</li>
          <li><strong>Never Send Money:</strong> Don't send money to someone you haven't met in person, regardless of how convincing their story is.</li>
          <li><strong>Discuss with Others:</strong> Talk about your online relationship with friends or family who can offer objective perspectives.</li>
          <li><strong>Meet in Public Places:</strong> If you do arrange to meet, choose public locations and inform others of your plans.</li>
          <li><strong>Verify Information:</strong> Cross-check details they share about their life, job, and background.</li>
        </ul>
        
        <h3>If You've Been a Victim</h3>
        <ol>
          <li>Stop all communication with the scammer immediately</li>
          <li>Don't send any more money, regardless of the story</li>
          <li>Report the profile to the dating site or social media platform</li>
          <li>File a complaint on the National Cyber Crime Reporting Portal</li>
          <li>Report to your local police cyber cell</li>
          <li>If you've shared banking information, contact your bank</li>
          <li>Seek emotional support - these scams can be traumatic</li>
        </ol>
      `
    }
  };
  
  const scamType = scamTypes[scamId] || {
    title: "Scam Type Not Found",
    icon: "❓",
    description: "The requested scam type information could not be found.",
    content: "<p>Please return to the home page and select a valid scam type.</p>"
  };

  return (
    <div className="scam-page">
      <header className="scam-header">
        <div className="container">
          <Link to="/" className="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
          <div className="scam-icon-large">{scamType.icon}</div>
          <h1>{scamType.title}</h1>
          <p className="scam-description">{scamType.description}</p>
        </div>
      </header>
      
      <main className="scam-content container">
        <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: scamType.content }}></div>
        
        <div className="scam-cta">
          <h3>Analyze a Suspicious Message</h3>
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
      
      <section className="related-scams">
        <div className="container">
          <h2>Related Scam Types</h2>
          <div className="related-scams-grid">
            {Object.entries(scamTypes)
              .filter(([id]) => id !== scamId)
              .slice(0, 3)
              .map(([id, scam]) => (
                <Link to={`/scams/${id}`} className="related-scam-card" key={id}>
                  <div className="related-scam-icon">{scam.icon}</div>
                  <h3>{scam.title}</h3>
                  <p>{scam.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
      
      <footer className="scam-footer">
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

export default ScamTypePage;
