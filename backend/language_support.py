"""
Language support module for ScamGPT
Provides language detection and multi-language scam pattern matching
"""

import re
import string
from collections import defaultdict
import langdetect
from langdetect import DetectorFactory
import transliterate

# Set seed for consistent language detection
DetectorFactory.seed = 0

# Supported languages
SUPPORTED_LANGUAGES = {
    'en': 'English',
    'hi': 'Hindi',
    'bn': 'Bengali',
    'ta': 'Tamil',
    'te': 'Telugu',
    'mr': 'Marathi',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'pa': 'Punjabi'
}

# Common scam patterns in different languages
SCAM_PATTERNS = {
    'en': {
        'kyc_fraud': [
            'kyc', 'expired', 'account block', 'verify account', 'kyc update',
            'document verification', 'bank kyc', 'suspend account'
        ],
        'upi_scam': [
            'receive money scan', 'upi verification', 'payment failed', 
            'scan qr receive', 'phonepay cashback', 'gpay reward', 'upi refund'
        ],
        'otp_fraud': [
            'share otp', 'verify otp', 'confirm transaction', 'security code',
            'verification code', 'bank otp', 'cancel transaction otp'
        ],
        'job_scam': [
            'job offer', 'registration fee', 'training fee', 'work home',
            'salary advance', 'job deposit', 'employment fee'
        ],
        'lottery_scam': [
            'won lottery', 'prize winner', 'claim reward', 'lucky winner',
            'cash prize', 'winning notification', 'award money'
        ]
    },
    'hi': {
        'kyc_fraud': [
            'केवाईसी', 'अपडेट', 'खाता बंद', 'सत्यापन', 'दस्तावेज़', 
            'बैंक केवाईसी', 'खाता निलंबित', 'जानकारी अपडेट'
        ],
        'upi_scam': [
            'क्यूआर स्कैन', 'पैसे प्राप्त', 'यूपीआई वेरिफिकेशन', 'कैशबैक',
            'फोनपे रिवार्ड', 'गूगल पे बोनस', 'पेमेंट फेल'
        ],
        'otp_fraud': [
            'ओटीपी शेयर', 'ओटीपी बताएं', 'वेरिफिकेशन कोड', 'सुरक्षा कोड',
            'ट्रांजैक्शन कोड', 'बैंक ओटीपी', 'रद्द करने के लिए ओटीपी'
        ],
        'job_scam': [
            'नौकरी ऑफर', 'रजिस्ट्रेशन फीस', 'ट्रेनिंग फीस', 'घर से काम',
            'सैलरी एडवांस', 'जॉब डिपॉजिट', 'प्रशिक्षण शुल्क'
        ],
        'lottery_scam': [
            'लॉटरी जीती', 'इनाम जीता', 'पुरस्कार दावा', 'भाग्यशाली विजेता',
            'कैश प्राइज', 'जीत की सूचना', 'पुरस्कार राशि'
        ]
    },
    'bn': {
        'kyc_fraud': [
            'কেওয়াইসি', 'আপডেট', 'অ্যাকাউন্ট ব্লক', 'যাচাই', 'নথি',
            'ব্যাংক কেওয়াইসি', 'অ্যাকাউন্ট স্থগিত', 'তথ্য আপডেট'
        ],
        'upi_scam': [
            'কিউআর স্ক্যান', 'টাকা পাওয়া', 'ইউপিআই ভেরিফিকেশন', 'ক্যাশব্যাক',
            'ফোনপে রিওয়ার্ড', 'গুগল পে বোনাস', 'পেমেন্ট ফেইল'
        ],
        # Add more Bengali patterns for other scam types
    },
    'ta': {
        'kyc_fraud': [
            'கேஒய்சி', 'புதுப்பிப்பு', 'கணக்கு முடக்கம்', 'சரிபார்ப்பு', 'ஆவணங்கள்',
            'வங்கி கேஒய்சி', 'கணக்கு நிறுத்தி வைக்கப்பட்டது', 'தகவல் புதுப்பிப்பு'
        ],
        # Add more Tamil patterns for other scam types
    }
    # Add more languages as needed
}

# Transliteration patterns (common scam terms written in Latin script)
TRANSLITERATION_PATTERNS = {
    'hi': {
        'kyc_fraud': [
            'kyc update', 'khata band', 'account block', 'jaankari update',
            'bank kyc', 'document verification', 'kyc expired'
        ],
        'upi_scam': [
            'qr scan', 'paise prapt', 'upi verification', 'cashback',
            'phonepe reward', 'google pay bonus', 'payment fail'
        ],
        # Add more transliterated Hindi patterns
    },
    'bn': {
        'kyc_fraud': [
            'kyc update', 'account block', 'jachhai', 'nothi',
            'bank kyc', 'account sthogito', 'tothyo update'
        ],
        # Add more transliterated Bengali patterns
    }
    # Add more languages as needed
}

def detect_language(text):
    """
    Detect the language of the input text
    Returns language code and confidence
    """
    try:
        # First try langdetect
        lang_code = langdetect.detect(text)
        
        # If detected language is supported, return it
        if lang_code in SUPPORTED_LANGUAGES:
            return {
                'language_code': lang_code,
                'language_name': SUPPORTED_LANGUAGES[lang_code],
                'confidence': 0.8,  # Approximate confidence
                'method': 'detection'
            }
        
        # If not supported, check for transliterated text
        for lang_code, patterns in TRANSLITERATION_PATTERNS.items():
            for scam_type, pattern_list in patterns.items():
                for pattern in pattern_list:
                    if pattern.lower() in text.lower():
                        return {
                            'language_code': lang_code,
                            'language_name': SUPPORTED_LANGUAGES[lang_code],
                            'confidence': 0.6,  # Lower confidence for transliteration detection
                            'method': 'transliteration'
                        }
        
        # Default to English if no other language detected
        return {
            'language_code': 'en',
            'language_name': 'English',
            'confidence': 0.5,  # Low confidence default
            'method': 'default'
        }
    except:
        # Default to English on error
        return {
            'language_code': 'en',
            'language_name': 'English',
            'confidence': 0.3,  # Very low confidence
            'method': 'error_fallback'
        }

def analyze_multilingual(text):
    """
    Analyze text for scam patterns in multiple languages
    Returns detected scam types and confidence scores
    """
    # Detect language
    lang_info = detect_language(text)
    lang_code = lang_info['language_code']
    
    # Normalize text
    text_lower = text.lower()
    
    # Initialize results
    results = {
        'language': lang_info,
        'scam_types': [],
        'matched_patterns': [],
        'overall_confidence': 0.0
    }
    
    # Check patterns in detected language
    if lang_code in SCAM_PATTERNS:
        patterns = SCAM_PATTERNS[lang_code]
        
        # Check each scam type
        for scam_type, pattern_list in patterns.items():
            matches = []
            for pattern in pattern_list:
                if pattern.lower() in text_lower:
                    matches.append(pattern)
            
            # Calculate confidence based on number of matches
            if matches:
                confidence = min(0.9, len(matches) / len(pattern_list) * 0.8 + 0.2)
                results['scam_types'].append({
                    'type': scam_type,
                    'confidence': confidence,
                    'matched_patterns': matches
                })
                results['matched_patterns'].extend(matches)
    
    # Check for transliterated patterns if applicable
    if lang_code != 'en' and lang_info['method'] == 'transliteration':
        if lang_code in TRANSLITERATION_PATTERNS:
            transliterated_patterns = TRANSLITERATION_PATTERNS[lang_code]
            
            # Check each scam type
            for scam_type, pattern_list in transliterated_patterns.items():
                matches = []
                for pattern in pattern_list:
                    if pattern.lower() in text_lower:
                        matches.append(pattern)
                
                # Calculate confidence based on number of matches
                if matches:
                    confidence = min(0.8, len(matches) / len(pattern_list) * 0.7 + 0.1)  # Slightly lower confidence
                    
                    # Check if this scam type already exists
                    existing = next((item for item in results['scam_types'] if item['type'] == scam_type), None)
                    if existing:
                        # Update existing entry if confidence is higher
                        if confidence > existing['confidence']:
                            existing['confidence'] = confidence
                            existing['matched_patterns'].extend(matches)
                    else:
                        # Add new scam type
                        results['scam_types'].append({
                            'type': scam_type,
                            'confidence': confidence,
                            'matched_patterns': matches
                        })
                    results['matched_patterns'].extend(matches)
    
    # Also check English patterns as fallback for all languages
    if lang_code != 'en':
        english_patterns = SCAM_PATTERNS['en']
        
        # Check each scam type
        for scam_type, pattern_list in english_patterns.items():
            matches = []
            for pattern in pattern_list:
                if pattern.lower() in text_lower:
                    matches.append(pattern)
            
            # Calculate confidence based on number of matches (lower for English fallback)
            if matches:
                confidence = min(0.7, len(matches) / len(pattern_list) * 0.6 + 0.1)
                
                # Check if this scam type already exists
                existing = next((item for item in results['scam_types'] if item['type'] == scam_type), None)
                if existing:
                    # Update existing entry if confidence is higher
                    if confidence > existing['confidence']:
                        existing['confidence'] = confidence
                        existing['matched_patterns'].extend(matches)
                else:
                    # Add new scam type
                    results['scam_types'].append({
                        'type': scam_type,
                        'confidence': confidence,
                        'matched_patterns': matches
                    })
                results['matched_patterns'].extend(matches)
    
    # Sort scam types by confidence
    results['scam_types'] = sorted(results['scam_types'], key=lambda x: x['confidence'], reverse=True)
    
    # Calculate overall confidence
    if results['scam_types']:
        results['overall_confidence'] = results['scam_types'][0]['confidence']
        results['primary_scam_type'] = results['scam_types'][0]['type']
    else:
        results['overall_confidence'] = 0.0
        results['primary_scam_type'] = None
    
    return results

def get_localized_response(lang_code, scam_type):
    """
    Get localized response templates for different languages
    """
    responses = {
        'en': {
            'scam_detected': "🚨 SCAM DETECTED: This appears to be a {scam_type} scam.",
            'confidence': "Confidence: {confidence}%",
            'explanation': "Explanation: {explanation}",
            'red_flags': "Red Flags:",
            'prevention': "How to Protect Yourself:",
            'learn_more': "Learn More: {info}"
        },
        'hi': {
            'scam_detected': "🚨 धोखाधड़ी का पता चला: यह एक {scam_type} स्कैम प्रतीत होता है।",
            'confidence': "विश्वास स्तर: {confidence}%",
            'explanation': "व्याख्या: {explanation}",
            'red_flags': "संदिग्ध संकेत:",
            'prevention': "अपनी सुरक्षा कैसे करें:",
            'learn_more': "अधिक जानकारी: {info}"
        },
        'bn': {
            'scam_detected': "🚨 প্রতারণা সনাক্ত হয়েছে: এটি একটি {scam_type} স্ক্যাম বলে মনে হচ্ছে।",
            'confidence': "আত্মবিশ্বাস: {confidence}%",
            'explanation': "ব্যাখ্যা: {explanation}",
            'red_flags': "সতর্কতা সংকেত:",
            'prevention': "নিজেকে কীভাবে রক্ষা করবেন:",
            'learn_more': "আরও জানুন: {info}"
        }
        # Add more languages as needed
    }
    
    # Default to English if language not supported
    if lang_code not in responses:
        return responses['en']
    
    return responses[lang_code]

# Test function
def test_language_detection():
    test_texts = [
        "Your account will be blocked. Please update your KYC immediately.",
        "आपका खाता ब्लॉक हो जाएगा। कृपया अपना केवाईसी तुरंत अपडेट करें।",
        "Aapka khata block ho jayega. Kripya apna KYC turant update karen.",
        "আপনার অ্যাকাউন্ট ব্লক হয়ে যাবে। অনুগ্রহ করে আপনার কেওয়াইসি অবিলম্বে আপডেট করুন।",
        "உங்கள் கணக்கு முடக்கப்படும். உங்கள் கேஒய்சி உடனடியாக புதுப்பிக்கவும்."
    ]
    
    for text in test_texts:
        lang_info = detect_language(text)
        print(f"Text: {text}")
        print(f"Detected: {lang_info['language_name']} ({lang_info['language_code']}) - Method: {lang_info['method']}")
        print("-" * 50)

if __name__ == "__main__":
    test_language_detection()
