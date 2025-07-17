# Educational content about scam types
SCAM_EDUCATION = {
    # General scam information
    "scam_types": {
        "title": "Common Scam Types",
        "description": "Here are the most common types of scams you should be aware of:",
        "types": [
            {
                "name": "KYC Fraud",
                "short_description": "Scammers pose as bank officials claiming your KYC needs updating",
                "icon": "🏦"
            },
            {
                "name": "UPI Scams",
                "short_description": "Fraudsters trick you into sending money via UPI by creating fake payment requests",
                "icon": "💳"
            },
            {
                "name": "OTP Fraud",
                "short_description": "Criminals trick you into sharing One-Time Passwords, giving them access to your accounts",
                "icon": "📱"
            },
            {
                "name": "Job Scams",
                "short_description": "Fake job offers that require payment for 'registration fees' or 'training materials'",
                "icon": "💼"
            },
            {
                "name": "Tech Support Scams",
                "short_description": "Scammers claim your device has issues and offer to 'fix' it while installing malware",
                "icon": "💻"
            },
            {
                "name": "Romance Scams",
                "short_description": "Fraudsters build fake romantic relationships online, then request money for emergencies",
                "icon": "❤️"
            },
            {
                "name": "Lottery/Prize Scams",
                "short_description": "Claims you've won a lottery or prize you never entered, but need to pay fees to claim it",
                "icon": "🎟️"
            }
        ]
    },
    
    # Detailed information about specific scam types
    "kyc_fraud": {
        "title": "KYC Fraud",
        "icon": "🏦",
        "description": "KYC (Know Your Customer) fraud is one of the most common scams in India, where fraudsters impersonate bank officials or financial institutions to trick you into sharing sensitive personal and financial information under the pretext of updating your KYC details.",
        "how_it_works": [
            "Scammers send messages claiming your KYC has expired or needs updating",
            "They create urgency by threatening to block your account",
            "They direct you to call a number, click a link, or download an app",
            "They may ask for personal information or remote access to your device",
            "They use this information to access your accounts and steal money"
        ],
        "red_flags": [
            "Urgent messages about KYC expiry or account suspension",
            "Messages from unofficial numbers or emails",
            "Poor grammar or spelling errors",
            "Links to suspicious websites (not official bank domains)",
            "Requests to download unknown apps"
        ],
        "prevention": [
            "Never share personal information when someone contacts you first",
            "Always contact your bank directly through official channels",
            "Verify the sender's email address or phone number",
            "Don't click on links in suspicious messages",
            "Use official bank apps downloaded from official app stores only"
        ],
        "example": "Dear Customer, Your SBI account will be blocked today as your KYC documents expired. Update KYC immediately: http://sbi-kyc-update.co.in"
    },
    
    "upi_scam": {
        "title": "UPI Scams",
        "icon": "💳",
        "description": "UPI (Unified Payments Interface) scams involve fraudsters tricking you into sending money through UPI apps like Google Pay, PhonePe, or Paytm by manipulating the payment request system or impersonating legitimate services.",
        "how_it_works": [
            "Scammers send you a 'collect' request but claim they're trying to send you money",
            "They ask you to scan QR codes claiming you'll receive money",
            "They impersonate customer support for UPI apps",
            "They create fake payment confirmation messages",
            "They may offer cashback or rewards requiring QR code scanning"
        ],
        "red_flags": [
            "Requests to scan QR codes to 'receive' money",
            "Messages about failed transactions requiring verification",
            "Calls from 'customer support' asking for UPI details",
            "Offers of cashback or rewards requiring immediate action",
            "Requests to download screen sharing apps"
        ],
        "prevention": [
            "Remember: scanning QR codes or entering UPI IDs SENDS money, not receives it",
            "Verify the direction of payment in your UPI app before approving",
            "Never share your UPI PIN with anyone",
            "Contact customer support only through official app channels",
            "Be suspicious of unexpected cashback or reward offers"
        ],
        "example": "Hello, I am calling from PhonePe customer care. Your account needs verification or it will be blocked. Please scan this QR code to verify your account and receive ₹500 bonus."
    },
    
    "otp_fraud": {
        "title": "OTP Fraud",
        "icon": "📱",
        "description": "OTP (One-Time Password) fraud occurs when scammers trick you into sharing verification codes sent to your phone, giving them access to your accounts, financial services, or allowing them to authorize fraudulent transactions.",
        "how_it_works": [
            "Scammers call pretending to be from your bank or a company",
            "They claim there's a security issue or suspicious transaction",
            "They create urgency about blocking unauthorized access",
            "They ask for the OTP sent to your phone to 'verify' or 'cancel' something",
            "They use this OTP to access your accounts or authorize transactions"
        ],
        "red_flags": [
            "Unsolicited calls about account security or verification",
            "Requests to share OTPs over phone or message",
            "Claims about suspicious transactions needing immediate action",
            "Callers creating fear or urgency",
            "Requests to download remote access apps"
        ],
        "prevention": [
            "Never share OTPs with anyone - legitimate organizations will never ask for them",
            "Remember that OTPs are for your use only, not for verification by others",
            "If concerned about account security, hang up and call the official number",
            "Enable two-factor authentication on all accounts",
            "Report suspicious calls to your bank immediately"
        ],
        "example": "Hello, I'm calling from HDFC Bank security department. We've detected suspicious transactions on your account. To block these transactions, we need to verify your identity. You'll receive an OTP - please share it with me so I can stop these unauthorized transactions."
    },
    
    "job_scam": {
        "title": "Job Scams",
        "icon": "💼",
        "description": "Job scams involve fraudsters posting fake job opportunities that require payment for 'registration fees' or 'training materials' but never lead to actual employment. These scams target job seekers with promises of high salaries for minimal work.",
        "how_it_works": [
            "Scammers post attractive job listings with minimal qualifications",
            "They offer unusually high salaries for simple work",
            "They conduct 'interviews' via messaging apps or email only",
            "They request payment for registration, training, or security deposits",
            "After payment, they either disappear or keep asking for more money"
        ],
        "red_flags": [
            "Jobs offering very high pay for little work or experience",
            "Requests for payment before starting work",
            "Job offers without proper interviews or background checks",
            "Communication only through messaging apps",
            "Non-corporate email addresses (gmail instead of company domain)"
        ],
        "prevention": [
            "Research the company thoroughly before applying",
            "Never pay money to get a job - legitimate employers don't charge applicants",
            "Be suspicious of job offers that come too easily",
            "Verify job listings on official company websites",
            "Be wary of jobs with vague descriptions but high salaries"
        ],
        "example": "Congratulations! You've been selected for a Data Entry position at Amazon with a salary of ₹45,000 per month. Work from home option available. To confirm your position, please pay ₹3,000 as a refundable security deposit. Contact HR at amazon.jobs.india@gmail.com"
    },
    
    "tech_support_scam": {
        "title": "Tech Support Scams",
        "icon": "💻",
        "description": "Tech support scams involve fraudsters who claim your device has serious problems that need immediate attention. They offer to 'fix' these non-existent issues while actually installing malware or charging for unnecessary services.",
        "how_it_works": [
            "Scammers call claiming to be from Microsoft, Apple, or other tech companies",
            "They create fake pop-up warnings on websites about viruses",
            "They claim your device is infected or your license is expiring",
            "They request remote access to your computer to 'fix' the issues",
            "They either charge fees for fake repairs or steal your information"
        ],
        "red_flags": [
            "Unsolicited calls about computer problems",
            "Pop-up messages that can't be closed easily",
            "Warnings about viruses with phone numbers to call",
            "Requests for remote access to your device",
            "Pressure to act quickly to avoid data loss"
        ],
        "prevention": [
            "Remember that Microsoft, Apple, etc. never make unsolicited calls",
            "Don't call phone numbers from pop-up messages",
            "Never give remote access to someone who contacts you first",
            "Use legitimate antivirus software from reputable sources",
            "If concerned, contact tech support through official websites"
        ],
        "example": "This is Microsoft Technical Department. We've detected dangerous virus activity from your computer that is stealing your personal information. Your Windows license will be terminated if not fixed immediately. Call our support team at +91-XXX-XXX-XXXX now to protect your data."
    },
    
    "romance_scam": {
        "title": "Romance Scams",
        "icon": "❤️",
        "description": "Romance scams occur when fraudsters create fake profiles on dating sites or social media, build emotional relationships with victims, and then exploit this connection to request money for supposed emergencies or expenses to meet in person.",
        "how_it_works": [
            "Scammers create attractive profiles with stolen photos",
            "They show intense affection quickly to build emotional connection",
            "They claim to be working abroad, in the military, or on oil rigs",
            "They always have excuses why they can't video chat or meet",
            "They eventually request money for emergencies, travel, or medical issues"
        ],
        "red_flags": [
            "Professing love or deep feelings very quickly",
            "Reluctance or inability to video chat or meet in person",
            "Claims of working in remote locations or overseas",
            "Stories about sudden crises or emergencies",
            "Requests for money, gift cards, or cryptocurrency"
        ],
        "prevention": [
            "Research the person's profile and photos (reverse image search)",
            "Be wary of someone who becomes romantic very quickly",
            "Never send money to someone you haven't met in person",
            "Insist on video calls if unable to meet in person",
            "Discuss the relationship with trusted friends or family"
        ],
        "example": "My dear, I've fallen deeply in love with you over these past weeks. I'm currently working on an oil rig in the North Sea and my contract ends next month. I want to come see you, but I'm having trouble with my bank account. Could you send $1,000 for my flight? I promise to pay you back as soon as I arrive."
    },
    
    "lottery_scam": {
        "title": "Lottery/Prize Scams",
        "icon": "🎟️",
        "description": "Lottery scams involve notifications that you've won a lottery or prize you never entered, but require you to pay fees, taxes, or provide bank details to claim your 'winnings' which never materialize.",
        "how_it_works": [
            "Scammers send messages claiming you've won a large sum of money",
            "They say you've been 'randomly selected' for a prize or lottery",
            "They create official-looking documents and certificates",
            "They ask for payment of fees, taxes, or processing charges",
            "After initial payment, they keep finding reasons for more payments"
        ],
        "red_flags": [
            "Notifications about winning lotteries you never entered",
            "Poor grammar and spelling in official communications",
            "Requests to keep the winnings secret",
            "Pressure to pay fees quickly to claim the prize",
            "Requests for bank details or personal information"
        ],
        "prevention": [
            "Remember: legitimate lotteries don't notify winners via email/text",
            "You can't win a lottery you didn't enter",
            "Legitimate prizes never require upfront payment",
            "Research the organization contacting you",
            "Never send money to claim a 'prize'"
        ],
        "example": "CONGRATULATIONS! Your email has won £2,500,000 in the UK National Lottery International Program. To claim your prize, contact our claims agent at uk.lottery.agent@gmail.com. A processing fee of £500 is required to release your winnings. Keep this confidential for security reasons."
    }
}

# Casual chat responses about scams
SCAM_CHAT_RESPONSES = {
    "tell me about scams": [
        "I'd be happy to tell you about common scams! Type 'scam types' to learn about different types of scams, or ask me about a specific scam like 'What is KYC fraud?'", 
        "Sure! There are many types of scams out there. Ask me about a specific one like 'What is UPI fraud?' or type 'scam types' for an overview."
    ],
    "scam types": [
        "Common scam types include KYC Fraud, UPI Scams, OTP Fraud, Job Scams, Tech Support Scams, and Romance Scams. Which one would you like to learn more about?", 
        "There are several common scams to be aware of: KYC Fraud, UPI Scams, OTP Fraud, Job Scams, Tech Support Scams, and Romance Scams. Ask me about any specific one for more details!"
    ],
    "what is kyc fraud": [
        "KYC (Know Your Customer) fraud is when scammers pose as bank officials claiming your KYC needs updating. They create urgency by saying your account will be blocked, then steal your information. Never share personal details when someone contacts you first - always contact your bank directly through official channels.", 
        "KYC Fraud happens when scammers pretend to be from your bank saying your KYC documents need updating or your account will be blocked. They'll ask for personal information or to click suspicious links. Remember: banks never ask for complete account details or passwords over phone/email."
    ],
    "what is upi scam": [
        "UPI scams happen when fraudsters trick you into sending money via UPI apps like Google Pay or PhonePe. Common tactics include: 1) Sending you a 'collect' request but claiming they're trying to pay you, 2) Asking you to scan QR codes to 'receive' money, and 3) Creating fake customer support numbers. Always verify before approving any UPI requests.", 
        "In UPI scams, fraudsters may ask you to scan a QR code to 'receive' money, but you'll actually be sending them money instead. They might also pose as customer support for UPI apps or create fake payment requests. Never scan QR codes from unknown sources or share your UPI PIN with anyone."
    ],
    "what is otp fraud": [
        "OTP (One-Time Password) fraud happens when scammers trick you into sharing verification codes sent to your phone. They might call pretending to be from your bank or a company, create a sense of urgency about a 'suspicious transaction,' then ask for the OTP to 'stop' it. In reality, they're using your OTP to authorize transactions. Never share OTPs with anyone.", 
        "In OTP fraud, scammers call pretending to be from your bank's security team, claiming they've detected suspicious activity on your account. They'll ask for the OTP sent to your phone to 'verify your identity' or 'cancel unauthorized transactions.' Remember: legitimate organizations will never ask for your OTP."
    ],
    "what is job scam": [
        "Job scams involve fake job offers that require payment for 'registration fees' or 'training materials' but never lead to actual employment. Red flags include: jobs with very high pay for little work, requests for payment before starting, interviews via messaging apps only, and job offers without proper interviews. Always research companies thoroughly before applying.", 
        "Job scammers post fake high-paying job listings, often for work-from-home positions with minimal qualifications. They'll ask for fees for 'registration,' 'training,' or 'security deposits' that are supposedly refundable. Legitimate employers never ask for payment to get hired. Be suspicious of job offers that come too easily without proper interviews."
    ],
    "what is tech support scam": [
        "Tech support scams happen when fraudsters claim your device has issues and offer to 'fix' it while actually installing malware or charging for unnecessary services. They often use pop-up warnings with scary messages about viruses, or call claiming to be from Microsoft/Apple. Remember: tech companies never proactively contact customers about viruses on their devices.", 
        "In tech support scams, you might see alarming pop-up messages claiming your computer is infected, or receive calls from 'Microsoft technicians' about problems with your Windows license. They'll ask for remote access to your computer to 'fix' issues, then either charge fees for fake repairs or steal your information. Legitimate tech companies don't monitor your device or call you about viruses."
    ],
    "what is romance scam": [
        "Romance scams occur when fraudsters build fake romantic relationships online, then request money for emergencies or travel to meet you. They create attractive profiles, show intense affection quickly, and always have excuses why they can't video chat or meet. They'll eventually claim emergencies (medical, legal, travel) requiring money transfers. Never send money to someone you haven't met in person.", 
        "In romance scams, fraudsters create fake profiles on dating apps or social media and develop deep emotional connections over weeks or months. They'll claim to be working abroad, in the military, or on oil rigs to explain why they can't meet. After establishing trust, they'll request money for emergencies, plane tickets to visit you, or customs fees. Be suspicious if someone you've never met asks for financial help."
    ],
    "what is lottery scam": [
        "Lottery scams claim you've won a prize or lottery you never entered. They'll ask for 'processing fees' or 'taxes' to release your winnings, which never arrive. They often use official-looking documents and logos to appear legitimate. Remember: real lotteries never ask for payment to claim prizes, and you can't win a lottery you didn't enter.", 
        "In lottery scams, you receive messages saying you've won millions in a foreign lottery or random drawing. The scammers create urgency to claim your prize and request payment for fees or taxes before releasing your 'winnings.' They may also ask for bank details to 'transfer the money.' Legitimate lotteries never notify winners via email or require payment to claim prizes."
    ]
}

def get_scam_education(scam_type=None):
    """Get educational information about scams"""
    if not scam_type:
        return SCAM_EDUCATION["scam_types"]
    
    # Convert to lowercase and remove spaces for matching
    scam_type_key = scam_type.lower().replace(" ", "_")
    
    # Handle variations in naming
    if "kyc" in scam_type_key:
        return SCAM_EDUCATION["kyc_fraud"]
    elif "upi" in scam_type_key:
        return SCAM_EDUCATION["upi_scam"]
    elif "otp" in scam_type_key:
        return SCAM_EDUCATION["otp_fraud"]
    elif "job" in scam_type_key:
        return SCAM_EDUCATION["job_scam"]
    elif "tech" in scam_type_key or "support" in scam_type_key:
        return SCAM_EDUCATION["tech_support_scam"]
    elif "romance" in scam_type_key or "dating" in scam_type_key:
        return SCAM_EDUCATION["romance_scam"]
    elif "lottery" in scam_type_key or "prize" in scam_type_key:
        return SCAM_EDUCATION["lottery_scam"]
    else:
        return SCAM_EDUCATION["scam_types"]
