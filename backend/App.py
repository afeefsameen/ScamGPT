from flask import Flask, request, jsonify
import re
from flask_cors import CORS
import pickle
import pandas as pd
import random
import os
import json
import openai
from dotenv import load_dotenv

# Import language support module
from language_support import detect_language, analyze_multilingual, get_localized_response
# Import scam education module
from scam_education import get_scam_education, SCAM_CHAT_RESPONSES

# Load environment variables
load_dotenv()

# Configure OpenAI API - for demo purposes, we'll use a mock key
# In production, you would use: openai.api_key = os.getenv("OPENAI_API_KEY")
# For now, we'll set a flag to skip the OpenAI API call
USE_OPENAI_API = False  # Set to True when you have a valid API key

# -----------------------------------------------------------------------------
# 1) Load your model, vectorizer and explanations CSV
# -----------------------------------------------------------------------------
BASE_DIR = os.path.dirname(__file__)
model_path = os.path.join(BASE_DIR, "model", "scam_model.pkl")
vect_path  = os.path.join(BASE_DIR, "model", "vectorizer.pkl")
exp_path   = os.path.join(BASE_DIR, "model", "scam_explaination.csv")  # correct filename

model      = pickle.load(open(model_path, "rb"))
vectorizer = pickle.load(open(vect_path,  "rb"))

# load and normalize column names to lowercase
explanations_df = pd.read_csv(exp_path)
explanations_df.columns = [c.lower() for c in explanations_df.columns]

# -----------------------------------------------------------------------------
# 2) Create Flask app and define routes
# -----------------------------------------------------------------------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

# casual-chat phrases
casual_responses = {
    "hi": ["Hello! 😊 How can I help you today?", "Hi there! Need help detecting a scam?"],
    "hello": ["Hey! How’s your day going?", "Hello! What message do you want to check?"],
    "how are you": ["I’m just a bot, but I'm here to help you!", "I'm great! Ready to detect some scams?"],
    "i need help": ["Of course! Paste a message, and I’ll check if it’s a scam.", "I'm here to assist! What do you need?"],
    "thank you": ["You're welcome! Stay safe online. 😊", "No problem! Always happy to help!"],
}

@app.route("/", methods=["GET"])
def home():
    return "Flask API is running! Use POST /predict with JSON { text: ... }", 200

@app.route("/api/scam-education", methods=["GET"])
def scam_education():
    """Endpoint to get educational information about scams"""
    scam_type = request.args.get("type", None)
    education_data = get_scam_education(scam_type)
    return jsonify(education_data)

@app.route("/api/scam-types", methods=["GET"])
def scam_types():
    """Endpoint to get a list of all scam types"""
    return jsonify(get_scam_education())

@app.route("/predict", methods=["POST"])
@app.route("/api/analyze", methods=["POST"])
def predict():
    payload = request.get_json(force=True)
    message = payload.get("text", "").strip()
    message_lower = message.lower()

    # Detect language and analyze with multi-language support
    lang_info = detect_language(message)
    multi_lang_analysis = analyze_multilingual(message)

    # Add language info to response
    language_detected = {
        'code': lang_info['language_code'],
        'name': lang_info['language_name'],
        'confidence': lang_info['confidence'],
        'method': lang_info['method']
    }

    # 1) casual chat - use the existing model for quick responses
    for k, replies in casual_responses.items():
        if k in message_lower:
            return jsonify(response=random.choice(replies), language=language_detected)

    # 2) Check for educational queries about scams
    for k, replies in SCAM_CHAT_RESPONSES.items():
        if k in message_lower:
            return jsonify(response=random.choice(replies), language=language_detected)

    # 2) Get initial classification from existing model for backup/comparison
    tfidf = vectorizer.transform([message_lower])
    model_prediction = model.predict(tfidf)[0]
    model_result = "Scam" if model_prediction == 1 else "Legitimate"

    # 3) Use GPT for enhanced analysis (or mock data if API key not available)
    if USE_OPENAI_API:
        try:
            # System prompt that instructs the LLM how to analyze and respond
            system_prompt = """
            You are an expert scam detection assistant. Analyze the user's message and determine:

            1. If it's likely a scam (Yes/No/Maybe)
            2. What type of scam it might be (e.g., Phishing, Advance Fee Fraud, Romance Scam, Tech Support Scam, etc.)
            3. Why you believe it's a scam or not (specific red flags or safe indicators)
            4. Specific prevention measures for this type of message
            5. General advice about this category of scam

            Format your response in JSON structure:
            {
                "is_scam": "Yes/No/Maybe",
                "confidence": "High/Medium/Low",
                "scam_type": "Category name or N/A",
                "explanation": "Detailed explanation of why it is or isn't a scam",
                "red_flags": ["List of specific red flags in the message"],
                "prevention_measures": ["List of specific actions to take"],
                "educational_info": "Brief information about this type of scam"
            }

            If the message is a casual greeting or question about you, respond conversationally instead of with the JSON format.
            """

            # Add context from our existing model
            user_prompt = f"Message to analyze: {message}\n\nNote: Our traditional ML model classified this as: {model_result}"

            # Call to OpenAI API
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",  # You can use gpt-4 for better results if available
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7
            )

            assistant_response = response.choices[0].message.content

            # Process the response...
            try:
                json_response = json.loads(assistant_response)
                # Format response...
                # (rest of the code remains the same)
            except json.JSONDecodeError:
                return jsonify(response=assistant_response)

        except Exception as e:
            # Fall back to mock data or traditional model
            return use_traditional_model_or_mock(message, message_lower, model_result)
    else:
        # Use mock data for demonstration purposes
        return use_mock_data(message, model_result)

def get_authorities_for_scam_type(scam_type):
    """Get relevant authorities based on scam type"""
    # Base authorities for all scam types
    base_authorities = [
        {
            "name": "National Cyber Crime Reporting Portal",
            "description": "Report all types of cyber crimes in India",
            "contact": "cybercrime.gov.in or call 1930",
            "website": "https://cybercrime.gov.in/"
        },
        {
            "name": "Indian Cyber Crime Coordination Centre (I4C)",
            "description": "Central agency for cybercrime coordination",
            "contact": "Report through National Cyber Crime Reporting Portal",
            "website": "https://cybercrime.gov.in/"
        },
        {
            "name": "Local Police Cyber Cell",
            "description": "Report to your nearest police cyber cell",
            "contact": "Find your local cyber cell contact information",
            "website": "https://www.cybercell.in/"
        }
    ]

    # Add specialized authorities based on scam type
    scam_type_lower = scam_type.lower() if scam_type else ''

    if 'kyc' in scam_type_lower or 'bank' in scam_type_lower or 'account' in scam_type_lower:
        return base_authorities + [
            {
                "name": "CERT-In (Indian Computer Emergency Response Team)",
                "description": "Report phishing and other cyber security incidents",
                "contact": "incident@cert-in.org.in",
                "website": "https://www.cert-in.org.in/"
            },
            {
                "name": "RBI Sachet Portal",
                "description": "Report financial frauds related to banking",
                "contact": "sachet.rbi.org.in",
                "website": "https://sachet.rbi.org.in/"
            },
            {
                "name": "Reserve Bank of India (RBI)",
                "description": "Report banking related frauds",
                "contact": "rbi.org.in or call 14440",
                "website": "https://rbi.org.in/"
            }
        ]
    elif 'upi' in scam_type_lower or 'payment' in scam_type_lower:
        return base_authorities + [
            {
                "name": "Reserve Bank of India (RBI)",
                "description": "Report banking and UPI related frauds",
                "contact": "rbi.org.in or call 14440",
                "website": "https://rbi.org.in/"
            },
            {
                "name": "Banking Ombudsman",
                "description": "Resolve complaints against banks",
                "contact": "cms.rbi.org.in",
                "website": "https://cms.rbi.org.in/"
            }
        ]
    elif 'job' in scam_type_lower or 'employment' in scam_type_lower:
        return base_authorities + [
            {
                "name": "Ministry of Labour & Employment",
                "description": "Report fraudulent job offers and employment scams",
                "contact": "labour.gov.in",
                "website": "https://labour.gov.in/"
            },
            {
                "name": "Indian Overseas MADAD",
                "description": "For overseas job fraud",
                "contact": "madad.gov.in",
                "website": "https://madad.gov.in/"
            }
        ]
    elif 'investment' in scam_type_lower or 'lottery' in scam_type_lower:
        return base_authorities + [
            {
                "name": "Securities and Exchange Board of India (SEBI)",
                "description": "Report investment frauds and scams",
                "contact": "sebi.gov.in or SEBI SCORES portal",
                "website": "https://www.sebi.gov.in/"
            },
            {
                "name": "RBI Sachet Portal",
                "description": "Report unauthorized financial schemes",
                "contact": "sachet.rbi.org.in",
                "website": "https://sachet.rbi.org.in/"
            }
        ]
    elif 'otp' in scam_type_lower or 'password' in scam_type_lower:
        return base_authorities + [
            {
                "name": "CERT-In (Indian Computer Emergency Response Team)",
                "description": "Report phishing and other cyber security incidents",
                "contact": "incident@cert-in.org.in",
                "website": "https://www.cert-in.org.in/"
            }
        ]
    else:
        return base_authorities

def format_response(mock_data, lang_info, multi_lang_analysis):
    """Format the response based on the mock data"""
    language_detected = {
        'code': lang_info['language_code'],
        'name': lang_info['language_name'],
        'confidence': lang_info['confidence'],
        'method': lang_info['method']
    }

    if mock_data["is_scam"] == "No":
        formatted_response = f"✅ **LIKELY LEGITIMATE**: This message doesn't appear to be a scam.\n\n"

        # Explanation of why the message was classified as legitimate
        formatted_response += f"**How This Was Identified as Legitimate**:\n"
        formatted_response += f"This message doesn't contain patterns typically associated with known scam types. "
        formatted_response += f"Our system analyzed the content and found no significant red flags or suspicious elements.\n\n"

        formatted_response += f"**Analysis**: {mock_data['explanation']}\n\n"
        formatted_response += "**Still, always remember these safety tips**:\n"
        for measure in mock_data['prevention_measures']:
            formatted_response += f"- {measure}\n"

        # Add general information about reporting suspicious messages
        formatted_response += "\n**If you ever encounter suspicious messages, report them to**:\n"
        formatted_response += "- National Cyber Crime Reporting Portal: cybercrime.gov.in or call 1930\n"
        formatted_response += "- Your bank or the organization being impersonated\n"
        formatted_response += "- Local police cyber cell\n"

    # Create a response object
    response_obj = {
        'response': formatted_response,
        'structured_data': mock_data,
        'language': language_detected,
        'multi_language_analysis': multi_lang_analysis
    }

    # Add default authority contacts
    response_obj['authority_contacts'] = [
        {
            "name": "National Cyber Crime Reporting Portal",
            "description": "Report all types of cyber crimes in India",
            "contact": "cybercrime.gov.in or call 1930",
            "website": "https://cybercrime.gov.in/"
        },
        {
            "name": "Indian Cyber Crime Coordination Centre (I4C)",
            "description": "Central agency for cybercrime coordination",
            "contact": "Report through National Cyber Crime Reporting Portal",
            "website": "https://cybercrime.gov.in/"
        },
        {
            "name": "Local Police Cyber Cell",
            "description": "Report to your nearest police cyber cell",
            "contact": "Find your local cyber cell contact information",
            "website": "https://www.cybercell.in/"
        }
    ]

    return jsonify(response_obj)

def use_mock_data(message, model_result):
    """Generate mock structured data for demonstration purposes"""
    # Check for keywords that might indicate a scam
    message_lower = message.lower()

    # Get multi-language analysis
    lang_info = detect_language(message)
    multi_lang_analysis = analyze_multilingual(message)

    # First, check if this is a clearly legitimate message
    # Define patterns for legitimate messages
    legitimate_patterns = [
        # Simple greetings or casual conversations
        r'^(hi|hello|hey)\s+\w+',
        r'(how are you|how\'s it going)',
        r'(meeting|appointment|coffee|lunch|dinner)\s+(tomorrow|today|on|at)',
        r'(weather|nice day|sunny|rainy)',
        r'(thanks|thank you)',
        # Business communications
        r'(report|meeting|presentation|document|project)\s+(is ready|completed|finished)',
        r'(attached|sending|sharing)\s+(file|document|report)',
        r'(following up|follow up|follow-up)',
        r'(quarterly|monthly|weekly|annual)\s+(report|review|summary)',
        r'(financial|projections|analysis|data)',
        r'(dear|hi|hello)\s+(mr\.|ms\.|mrs\.|dr\.)',
        r'(best regards|sincerely|regards|thank you)',
        # Appointment reminders
        r'(reminder|appointment|scheduled|booking)',
        # Simple statements
        r'^the\s+\w+\s+is\s+\w+',
        r'^i\s+(am|was|will)\s+\w+'
    ]

    # Check if message matches legitimate patterns
    is_legitimate = any(re.search(pattern, message_lower) for pattern in legitimate_patterns)

    # Check for scam indicators
    has_scam_indicators = (
        any(word in message_lower for word in ['won', 'winner', 'prize', 'lottery', 'million', 'dollars']) or
        any(word in message_lower for word in ['account', 'password', 'login', 'verify', 'security', 'bank', 'paypal', 'suspended', 'kyc']) or
        any(word in message_lower for word in ['urgent', 'help', 'emergency', 'stranded', 'trouble', 'need money'])
    )

    # If message matches legitimate patterns and has no scam indicators, mark as legitimate
    if is_legitimate and not has_scam_indicators:
        # This is likely a legitimate message
        mock_data = {
            "is_scam": "No",
            "confidence": "High",
            "scam_type": "N/A",
            "explanation": "This message appears to be a normal, legitimate communication. It contains natural language patterns typical of everyday conversations or standard business communications.",
            "red_flags": [],
            "prevention_measures": [
                "Always maintain general online safety practices",
                "Be cautious with unexpected requests for personal information",
                "Keep your devices and software updated"
            ],
            "educational_info": "Most messages you receive are legitimate, but it's always good to maintain healthy skepticism with unexpected communications that request personal information or financial transactions."
        }
        return format_response(mock_data, lang_info, multi_lang_analysis)

    # Use multi-language results if available
    if multi_lang_analysis['scam_types']:
        primary_scam = multi_lang_analysis['scam_types'][0]
        scam_type = primary_scam['type']
        confidence = primary_scam['confidence']
        matched_patterns = primary_scam['matched_patterns']

        # Get localized response templates
        lang_code = lang_info['language_code']
        response_templates = get_localized_response(lang_code, scam_type)

    # Create different mock responses based on message content
    if any(word in message_lower for word in ['won', 'winner', 'prize', 'lottery', 'million', 'dollars']):
        # Advance fee fraud / lottery scam
        mock_data = {
            "is_scam": "Yes",
            "confidence": "High",
            "scam_type": "Advance Fee Fraud / Lottery Scam",
            "explanation": "This message contains classic signs of a lottery or prize scam. Unexpected winnings, especially from contests you didn't enter, are almost always fraudulent.",
            "red_flags": [
                "Unexpected prize or lottery win",
                "Too good to be true offers",
                "Urgency to respond",
                "Requests for personal information or payment"
            ],
            "prevention_measures": [
                "Ignore and delete the message",
                "Never send money to claim a 'prize'",
                "Don't click on any links in the message",
                "Report to relevant authorities like the FTC"
            ],
            "educational_info": "Advance Fee Frauds trick victims into paying money upfront to receive a larger sum that never materializes. Legitimate lotteries never ask winners to pay fees to collect winnings.",
            "authority_contacts": [
                {
                    "name": "National Cyber Crime Reporting Portal",
                    "description": "Report all types of cyber crimes in India",
                    "contact": "cybercrime.gov.in or call 1930",
                    "website": "https://cybercrime.gov.in/"
                },
                {
                    "name": "Securities and Exchange Board of India (SEBI)",
                    "description": "Report investment frauds and scams",
                    "contact": "sebi.gov.in or SEBI SCORES portal",
                    "website": "https://www.sebi.gov.in/"
                },
                {
                    "name": "RBI Sachet Portal",
                    "description": "Report unauthorized financial schemes",
                    "contact": "sachet.rbi.org.in",
                    "website": "https://sachet.rbi.org.in/"
                }
            ]
        }
    elif any(word in message_lower for word in ['account', 'password', 'login', 'verify', 'security', 'bank', 'paypal', 'suspended', 'kyc']):
        # Phishing scam or KYC fraud
        scam_type = "KYC Fraud" if "kyc" in message_lower else "Phishing Attempt"
        mock_data = {
            "is_scam": "Yes",
            "confidence": "High",
            "scam_type": scam_type,
            "explanation": "This appears to be a phishing attempt designed to steal your account credentials or personal information by creating a false sense of urgency about your account.",
            "red_flags": [
                "Urgent request to verify account information",
                "Threatening consequences for not acting quickly",
                "Generic greeting rather than your name",
                "Links to suspicious or lookalike websites",
                "Requests for sensitive information"
            ],
            "prevention_measures": [
                "Never click links in suspicious emails",
                "Contact the company directly using official contact information",
                "Check the sender's email address carefully",
                "Use two-factor authentication on all accounts",
                "Report phishing attempts to the company being impersonated"
            ],
            "educational_info": "Phishing scams impersonate trusted organizations to trick you into revealing sensitive information. Legitimate companies never ask for passwords or sensitive information via email or text.",
            "authority_contacts": [
                {
                    "name": "National Cyber Crime Reporting Portal",
                    "description": "Report all types of cyber crimes in India",
                    "contact": "cybercrime.gov.in or call 1930",
                    "website": "https://cybercrime.gov.in/"
                },
                {
                    "name": "CERT-In (Indian Computer Emergency Response Team)",
                    "description": "Report phishing and other cyber security incidents",
                    "contact": "incident@cert-in.org.in",
                    "website": "https://www.cert-in.org.in/"
                },
                {
                    "name": "RBI Sachet Portal",
                    "description": "Report financial frauds related to banking",
                    "contact": "sachet.rbi.org.in",
                    "website": "https://sachet.rbi.org.in/"
                },
                {
                    "name": "Reserve Bank of India (RBI)",
                    "description": "Report banking related frauds",
                    "contact": "rbi.org.in or call 14440",
                    "website": "https://rbi.org.in/"
                }
            ]
        }
    elif any(word in message_lower for word in ['urgent', 'help', 'emergency', 'stranded', 'trouble', 'need money']):
        # Emergency scam
        mock_data = {
            "is_scam": "Yes",
            "confidence": "High",
            "scam_type": "Emergency/Grandparent Scam",
            "explanation": "This message shows signs of an emergency scam where the sender claims to be in trouble and needs financial help immediately.",
            "red_flags": [
                "Urgent request for financial help",
                "Story about being in trouble or stranded",
                "Request to keep the situation secret",
                "Unusual payment methods requested"
            ],
            "prevention_measures": [
                "Verify the person's identity through a different communication channel",
                "Ask personal questions only the real person would know",
                "Never send money based solely on a message or call",
                "Contact other family members to confirm the story"
            ],
            "educational_info": "Emergency scams prey on your compassion by creating fictional emergencies involving loved ones or strangers. Always verify the identity of anyone claiming to need emergency financial help."
        }
    elif model_result == "Scam":
        # Generic scam (based on ML model)
        mock_data = {
            "is_scam": "Yes",
            "confidence": "Medium",
            "scam_type": "Suspicious Message",
            "explanation": "Our analysis indicates this message contains elements commonly found in scam communications.",
            "red_flags": [
                "Suspicious or unusual requests",
                "Poor grammar or spelling errors",
                "Sense of urgency",
                "Offers that seem too good to be true"
            ],
            "prevention_measures": [
                "Do not respond to the message",
                "Block the sender",
                "Report the message as spam",
                "Never share personal or financial information with unknown contacts"
            ],
            "educational_info": "Scammers use various tactics to create urgency and emotional responses. Taking time to verify and research before responding is your best protection."
        }
    else:
        # Likely legitimate
        mock_data = {
            "is_scam": "No",
            "confidence": "Medium",
            "scam_type": "N/A",
            "explanation": "This message doesn't contain common patterns associated with scams. However, always remain vigilant with unexpected communications.",
            "red_flags": [],
            "prevention_measures": [
                "Still be cautious with unexpected messages",
                "Never share sensitive information unless you're certain of the recipient",
                "Keep your devices and software updated",
                "Use strong, unique passwords for all accounts"
            ],
            "educational_info": "Even legitimate-looking messages can sometimes be sophisticated scams. Always maintain healthy skepticism with unexpected communications."
        }

    # Get authority contacts if it's a scam
    if mock_data["is_scam"] == "Yes" and mock_data.get('scam_type'):
        mock_data['authority_contacts'] = get_authorities_for_scam_type(mock_data['scam_type'])

    # Format the response based on the mock data
    if mock_data["is_scam"] == "Yes":
        formatted_response = f"🚨 **SCAM DETECTED**: This appears to be a {mock_data['scam_type']}.\n\n"

        # Enhanced explanation of how the message was identified as a scam
        formatted_response += f"**How This Was Identified as a Scam**:\n"
        formatted_response += f"This message was identified as a potential {mock_data['scam_type']} based on pattern matching and linguistic analysis. "
        formatted_response += f"Our system detected multiple suspicious elements commonly found in scam messages of this type.\n\n"

        # Add detailed explanation based on scam type
        if 'kyc' in mock_data['scam_type'].lower():
            formatted_response += "Our detection system identified this as a KYC fraud attempt by recognizing patterns such as urgent language about KYC expiry, account suspension threats, and requests to call unofficial numbers. These are classic techniques used in banking scams.\n\n"
        elif 'phishing' in mock_data['scam_type'].lower():
            formatted_response += "This message was identified as a phishing attempt through analysis of deceptive patterns. Our system detected impersonation of legitimate organizations, requests for sensitive information, and urgent claims about account problems.\n\n"
        elif 'lottery' in mock_data['scam_type'].lower() or 'prize' in mock_data['scam_type'].lower():
            formatted_response += "Our system identified this as a lottery/prize scam through pattern recognition. We detected claims of unexpected winnings, requests for personal information or payment to claim prizes, and patterns of large monetary amounts in foreign currencies.\n\n"
        elif 'job' in mock_data['scam_type'].lower() or 'employment' in mock_data['scam_type'].lower():
            formatted_response += "This message was identified as a job scam through analysis of suspicious employment offers. Our system detected unrealistic salary promises for minimal work, requests for registration fees, and suspicious contact methods for job applications.\n\n"
        elif 'upi' in mock_data['scam_type'].lower() or 'payment' in mock_data['scam_type'].lower():
            formatted_response += "Our system identified this as a UPI/payment scam through analysis of common deception patterns. We detected promises of rewards requiring QR code scanning, suspicious payment collection requests, and patterns of urgency to complete financial transactions.\n\n"

        formatted_response += f"**Explanation**: {mock_data['explanation']}\n\n"
        formatted_response += "**Red Flags Detected in This Message**:\n"
        for flag in mock_data['red_flags']:
            formatted_response += f"- {flag}\n"
        formatted_response += "\n**How to Protect Yourself**:\n"
        for measure in mock_data['prevention_measures']:
            formatted_response += f"- {measure}\n"
        formatted_response += f"\n**Learn More**: {mock_data['educational_info']}"

        # Always add authority contacts information directly in the response
        formatted_response += "\n\n**Report to Indian Authorities**:\n"

        # Use authority contacts from mock data if available, otherwise use default contacts
        if mock_data.get('authority_contacts'):
            formatted_response += "The following authorities are specifically relevant for this type of scam:\n"
            for authority in mock_data['authority_contacts'][:4]:  # Show top 4 for better coverage
                formatted_response += f"- **{authority['name']}**: {authority['description']}. Contact: {authority['contact']}\n"
        else:
            # Default authority contacts
            formatted_response += "- **National Cyber Crime Reporting Portal**: Report all types of cyber crimes. Visit cybercrime.gov.in or call 1930\n"
            formatted_response += "- **CERT-In (Indian Computer Emergency Response Team)**: Report phishing and cyber security incidents. Contact: incident@cert-in.org.in\n"
            formatted_response += "- **RBI Sachet Portal**: Report financial frauds related to banking. Visit sachet.rbi.org.in\n"

        formatted_response += "\nFor more reporting options, visit cybercrime.gov.in or call 1930."

    elif mock_data["is_scam"] == "Maybe":
        formatted_response = f"⚠️ **POTENTIAL SCAM**: This message has some characteristics of a {mock_data['scam_type']}.\n\n"

        # Enhanced explanation of how the message was identified as a potential scam
        formatted_response += f"**How This Was Identified as a Potential Scam**:\n"
        formatted_response += f"This message contains some elements that match patterns seen in {mock_data['scam_type']} scams, but the confidence level is not high enough for a definitive classification. "
        formatted_response += f"Our system uses pattern matching and linguistic analysis to identify suspicious elements.\n\n"

        # Add detailed explanation based on scam type
        if 'kyc' in mock_data['scam_type'].lower():
            formatted_response += "Our detection system found some patterns similar to KYC fraud attempts, such as mentions of account verification or KYC processes. However, some typical strong indicators like urgent language or explicit threats of account suspension are missing or not clear enough.\n\n"
        elif 'phishing' in mock_data['scam_type'].lower():
            formatted_response += "This message shows some characteristics of phishing attempts, but lacks the definitive patterns we typically see. Our system detected potential impersonation elements, but the confidence level is not high enough for a definitive classification.\n\n"
        elif 'lottery' in mock_data['scam_type'].lower() or 'prize' in mock_data['scam_type'].lower():
            formatted_response += "Our system detected some patterns associated with lottery/prize scams, but the message lacks some of the stronger indicators we typically see in such scams. The confidence level is not high enough for a definitive classification.\n\n"
        elif 'job' in mock_data['scam_type'].lower() or 'employment' in mock_data['scam_type'].lower():
            formatted_response += "This message contains some elements found in job scams, but lacks definitive patterns like unrealistic salary promises or explicit requests for fees. Our system flagged it as suspicious but not definitively fraudulent.\n\n"
        elif 'upi' in mock_data['scam_type'].lower() or 'payment' in mock_data['scam_type'].lower():
            formatted_response += "Our system detected some patterns associated with UPI/payment scams, but the message lacks some of the stronger indicators we typically see. Exercise caution but be aware that our confidence level is not high enough for a definitive classification.\n\n"

        formatted_response += f"**Explanation**: {mock_data['explanation']}\n\n"
        formatted_response += "**Concerning Elements Detected**:\n"
        for flag in mock_data['red_flags']:
            formatted_response += f"- {flag}\n"
        formatted_response += "\n**Precautions to Take**:\n"
        for measure in mock_data['prevention_measures']:
            formatted_response += f"- {measure}\n"
        formatted_response += f"\n**Learn More**: {mock_data['educational_info']}"

        # Always add authority contacts information for potential scams too
        formatted_response += "\n\n**Report to Indian Authorities if Suspicious**:\n"

        # Use authority contacts from mock data if available, otherwise use default contacts
        if mock_data.get('authority_contacts'):
            formatted_response += "If you believe this is a scam, you can report it to these relevant authorities:\n"
            for authority in mock_data['authority_contacts'][:3]:  # Limit to top 3 for readability
                formatted_response += f"- **{authority['name']}**: {authority['description']}. Contact: {authority['contact']}\n"
        else:
            # Default authority contacts
            formatted_response += "- **National Cyber Crime Reporting Portal**: Report all types of cyber crimes. Visit cybercrime.gov.in or call 1930\n"
            formatted_response += "- **CERT-In (Indian Computer Emergency Response Team)**: Report phishing and cyber security incidents. Contact: incident@cert-in.org.in\n"
            formatted_response += "- **RBI Sachet Portal**: Report financial frauds related to banking. Visit sachet.rbi.org.in\n"

        formatted_response += "\nFor more reporting options, visit cybercrime.gov.in or call 1930."

    else:
        formatted_response = f"✅ **LIKELY LEGITIMATE**: This message doesn't appear to be a scam.\n\n"

        # Explanation of why the message was classified as legitimate
        formatted_response += f"**How This Was Identified as Legitimate**:\n"
        formatted_response += f"This message doesn't contain patterns typically associated with known scam types. "
        formatted_response += f"Our system analyzed the content and found no significant red flags or suspicious elements.\n\n"

        # Add more detailed explanation
        formatted_response += "Our detection system uses multiple techniques to identify scams:\n"
        formatted_response += "1. **Pattern Matching**: We look for specific phrases, keywords, and sentence structures commonly found in scams\n"
        formatted_response += "2. **Linguistic Analysis**: We analyze the tone, urgency, and emotional manipulation tactics used in scam messages\n"
        formatted_response += "3. **Content Evaluation**: We check for requests for personal information, money, or suspicious links\n"
        formatted_response += "4. **Context Assessment**: We evaluate whether the message makes sense in normal communication contexts\n\n"
        formatted_response += "This message did not trigger our detection algorithms because it lacks the characteristic patterns and red flags we typically see in fraudulent communications.\n\n"

        formatted_response += f"**Analysis**: {mock_data['explanation']}\n\n"
        formatted_response += "**Still, always remember these safety tips**:\n"
        for measure in mock_data['prevention_measures']:
            formatted_response += f"- {measure}\n"

        # Add general information about reporting suspicious messages
        formatted_response += "\n**If you ever encounter suspicious messages, report them to**:\n"
        formatted_response += "- National Cyber Crime Reporting Portal: cybercrime.gov.in or call 1930\n"
        formatted_response += "- Your bank or the organization being impersonated\n"
        formatted_response += "- Local police cyber cell\n"

    # Add language information to the response
    language_detected = {
        'code': lang_info['language_code'],
        'name': lang_info['language_name'],
        'confidence': lang_info['confidence'],
        'method': lang_info['method']
    }

    # Add multi-language analysis to the response
    if multi_lang_analysis['scam_types']:
        mock_data['multi_language_analysis'] = {
            'detected_language': language_detected,
            'scam_types': multi_lang_analysis['scam_types'],
            'overall_confidence': multi_lang_analysis['overall_confidence']
        }

    # Create a response object
    response_obj = {
        'response': formatted_response,
        'structured_data': mock_data,
        'language': language_detected,
        'multi_language_analysis': multi_lang_analysis
    }

    # Add authority contacts to the response if available
    if mock_data.get('authority_contacts'):
        response_obj['authority_contacts'] = mock_data['authority_contacts']

    return jsonify(response_obj)

def use_traditional_model_or_mock(message, message_lower, model_result):
    """Fallback to traditional model or provide basic response"""
    # Get language information
    lang_info = detect_language(message)
    multi_lang_analysis = analyze_multilingual(message)

    language_detected = {
        'code': lang_info['language_code'],
        'name': lang_info['language_name'],
        'confidence': lang_info['confidence'],
        'method': lang_info['method']
    }

    if model_result == "Scam":
        # Try to find in explanations_df
        row = explanations_df[
            explanations_df["message"].str.contains(message_lower[:30], na=False, case=False)
        ]
        if not row.empty:
            reason = row["reason for scam"].iloc[0]  # Using iloc instead of iat
            action = row["action to take"].iloc[0]   # Using iloc instead of iat
            resp_text = f"🚨 Scam detected: {reason} → {action}\n\n(Note: Enhanced analysis unavailable)"
        else:
            # Generic scam response
            resp_text = f"🚨 Scam detected: This message contains suspicious elements typical of scams. → Do not respond and consider reporting it.\n\n(Note: Enhanced analysis unavailable)"
    else:
        resp_text = "✅ No scam detected. It looks legitimate.\n\n(Note: Enhanced analysis unavailable)"

    return jsonify(
        response=resp_text,
        language=language_detected,
        multi_language_analysis=multi_lang_analysis
    )

# -----------------------------------------------------------------------------
# 3) Start the server
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
