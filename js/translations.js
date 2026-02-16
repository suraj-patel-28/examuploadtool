// Translation system for English and Hindi
const TRANSLATIONS = {
    en: {
        // Header
        tagline: "Resize photos, signatures & PDF documents for Indian exam requirements",
        
        // Home page
        selectExam: "Select Your Exam",
        searchPlaceholder: "🔍 Search exam name...",
        whyUse: "Why Use This Tool?",
        pdfDocuments: "PDF Documents Too",
        pdfDesc: "Compress Aadhaar, certificates, ID proofs",
        instantProcessing: "Instant Processing",
        instantDesc: "No upload to server - works in your browser",
        examPresets: "Exam-Specific Presets",
        presetsDesc: "Auto-apply official size requirements",
        mobileFriendly: "Mobile Friendly",
        mobileDesc: "Works perfectly on phones & tablets",
        private: "100% Private",
        privateDesc: "Your files never leave your device",
        popularExams: "Popular Exams",
        
        // Tool page
        backLink: "← Back",
        selectDocType: "1. Select Document Type",
        photo: "📷 Photo",
        signature: "✍️ Signature",
        documents: "📄 Documents",
        requirements: "📋 Requirements",
        selectState: "Select State:",
        selectDocumentType: "Select Document Type:",
        editRequirements: "✏️ Edit Requirements",
        doneEditing: "✓ Done Editing",
        uploadFile: "2. Upload File",
        clickOrDrag: "Click or drag file here",
        jpgSupported: "JPG, JPEG, PNG supported",
        pdfSupported: "PDF supported",
        compressNow: "⚡ Compress Now",
        cancel: "✕ Cancel",
        previewDownload: "Preview & Download",
        original: "Original",
        compressed: "Compressed",
        meetsRequirements: "✅ Meets Requirements",
        sizeAdjustment: "⚠️ Size may need adjustment",
        downloadCompressed: "⬇️ Download Compressed File",
        uploadAnother: "🔄 Upload Another",
        uploadToSee: "Upload an image to see preview",
        downloaded: "✓ Downloaded",
        
        // Requirements labels
        document: "Document:",
        fileType: "File Type:",
        fileSize: "File Size:",
        dimensions: "Dimensions:",
        format: "Format:",
        notSet: "Not set - Click Edit",
        
        // Custom editor
        dimensionsLabel: "Dimensions (Width × Height in pixels):",
        fileSizeRange: "File Size Range (KB):",
        width: "Width",
        height: "Height",
        min: "Min",
        max: "Max",
        to: "to",
        
        // Categories
        custom: "Custom",
        engineering: "Engineering",
        medical: "Medical",
        government: "Government",
        banking: "Banking",
        management: "Management",
        university: "University",
        defence: "Defence",
        teaching: "Teaching",
        
        // Document types
        aadhaar: "Aadhaar Card",
        pan: "PAN Card",
        passport: "Passport",
        category: "Category Certificate",
        pwd: "PwD Certificate",
        income: "Income Certificate",
        class10: "Class 10 Certificate",
        class12: "Class 12 Certificate",
        degree: "Degree Certificate",
        pdfDocument: "PDF Document",
        
        // Messages
        compressing: "⚡ Compressing...",
        selectDocumentsTab: "Please select \"Documents\" tab for PDF files.",
        uploadPdfForDocs: "Please upload PDF files for documents, or switch to Photo/Signature tab.",
        unsupportedFile: "Unsupported file type. Please upload JPG, PNG, or PDF.",
        setCustomFirst: "Please set custom requirements first by clicking the Edit button.",
        validationError: "Please enter valid values:\\n- Dimensions: 50-2000px\\n- Min size: 1+ KB\\n- Max must be greater than Min",
        validationErrorDocs: "Please enter valid values for documents:\\n- Min size: 1+ KB\\n- Max must be greater than Min",
        
        // Footer
        footer: "All requirements verified from official sources.",
        aboutUs: "ℹ️ About Us",
        
        // About Us page
        aboutUsTitle: "About Us",
        aboutHeading: "About ExamUploadTool",
        aboutPara1: "ExamUploadTool is a free, 100% client-side image and PDF compression tool designed specifically for Indian government exam applications. We understand the challenges students face when preparing documents for various competitive exams, and our mission is to make this process simple, fast, and secure.",
        ourMission: "Our Mission",
        missionText: "To provide students across India with a reliable, privacy-focused tool that helps them meet exact photo, signature, and document requirements for competitive exams without any technical hassle or privacy concerns.",
        whyTrust: "Why Trust Us?",
        trust1: "🔒 100% Privacy: All processing happens in your browser. Your files never leave your device.",
        trust2: "⚡ Instant Results: No server uploads, no waiting. Compress files in seconds.",
        trust3: "✅ Official Requirements: All exam presets verified from official sources.",
        trust4: "📱 Works Everywhere: Desktop, mobile, tablet - works on all devices.",
        trust5: "💯 Completely Free: No hidden charges, no subscriptions, no ads interfering with your work.",
        contact: "Contact Us",
        contactText: "Have questions or suggestions? We'd love to hear from you! Reach out to us for any queries or feedback.",
        backToHome: "← Back to Home"
    },
    hi: {
        // Header
        tagline: "भारतीय परीक्षाओं के लिए मुफ्त कंप्रेसर",
        
        // Home page
        selectExam: "अपनी परीक्षा चुनें",
        searchPlaceholder: "🔍 परीक्षा का नाम खोजें...",
        whyUse: "इस टूल का उपयोग क्यों करें?",
        pdfDocuments: "PDF दस्तावेज़ भी",
        pdfDesc: "आधार, प्रमाणपत्र, आईडी प्रूफ को संपीड़ित करें",
        instantProcessing: "तत्काल प्रसंस्करण",
        instantDesc: "सर्वर पर अपलोड नहीं - आपके ब्राउज़र में काम करता है",
        examPresets: "परीक्षा-विशिष्ट प्रीसेट",
        presetsDesc: "आधिकारिक आकार आवश्यकताओं को स्वतः लागू करें",
        mobileFriendly: "मोबाइल फ्रेंडली",
        mobileDesc: "फोन और टैबलेट पर पूरी तरह से काम करता है",
        private: "100% निजी",
        privateDesc: "आपकी फाइलें कभी आपके डिवाइस से बाहर नहीं जातीं",
        popularExams: "लोकप्रिय परीक्षाएं",
        
        // Tool page
        backLink: "← वापस",
        selectDocType: "1. दस्तावेज़ प्रकार चुनें",
        photo: "📷 फोटो",
        signature: "✍️ हस्ताक्षर",
        documents: "📄 दस्तावेज़",
        requirements: "📋 आवश्यकताएं",
        selectState: "राज्य चुनें:",
        selectDocumentType: "दस्तावेज़ प्रकार चुनें:",
        editRequirements: "✏️ आवश्यकताएं संपादित करें",
        doneEditing: "✓ संपादन पूर्ण",
        uploadFile: "2. फाइल अपलोड करें",
        clickOrDrag: "यहां क्लिक करें या फाइल खींचें",
        jpgSupported: "JPG, JPEG, PNG समर्थित",
        pdfSupported: "PDF समर्थित",
        compressNow: "⚡ अभी संपीड़ित करें",
        cancel: "✕ रद्द करें",
        previewDownload: "पूर्वावलोकन और डाउनलोड",
        original: "मूल",
        compressed: "संपीड़ित",
        meetsRequirements: "✅ आवश्यकताओं को पूरा करता है",
        sizeAdjustment: "⚠️ आकार समायोजन की आवश्यकता हो सकती है",
        downloadCompressed: "⬇️ संपीड़ित फाइल डाउनलोड करें",
        uploadAnother: "🔄 एक और अपलोड करें",
        uploadToSee: "पूर्वावलोकन देखने के लिए एक छवि अपलोड करें",
        downloaded: "✓ डाउनलोड हो गया",
        
        // Requirements labels
        document: "दस्तावेज़:",
        fileType: "फाइल प्रकार:",
        fileSize: "फाइल आकार:",
        dimensions: "आयाम:",
        format: "प्रारूप:",
        notSet: "सेट नहीं - संपादित करें पर क्लिक करें",
        
        // Custom editor
        dimensionsLabel: "आयाम (चौड़ाई × ऊंचाई पिक्सेल में):",
        fileSizeRange: "फाइल आकार सीमा (KB):",
        width: "चौड़ाई",
        height: "ऊंचाई",
        min: "न्यूनतम",
        max: "अधिकतम",
        to: "से",
        
        // Categories
        custom: "कस्टम",
        engineering: "इंजीनियरिंग",
        medical: "चिकित्सा",
        government: "सरकारी",
        banking: "बैंकिंग",
        management: "प्रबंधन",
        university: "विश्वविद्यालय",
        defence: "रक्षा",
        teaching: "शिक्षण",
        
        // Document types
        aadhaar: "आधार कार्ड",
        pan: "पैन कार्ड",
        passport: "पासपोर्ट",
        category: "श्रेणी प्रमाणपत्र",
        pwd: "दिव्यांग प्रमाणपत्र",
        income: "आय प्रमाणपत्र",
        class10: "कक्षा 10 प्रमाणपत्र",
        class12: "कक्षा 12 प्रमाणपत्र",
        degree: "डिग्री प्रमाणपत्र",
        pdfDocument: "PDF दस्तावेज़",
        
        // Messages
        compressing: "⚡ संपीड़ित हो रहा है...",
        selectDocumentsTab: "कृपया PDF फाइलों के लिए \"दस्तावेज़\" टैब चुनें।",
        uploadPdfForDocs: "कृपया दस्तावेज़ों के लिए PDF फाइलें अपलोड करें, या फोटो/हस्ताक्षर टैब पर स्विच करें।",
        unsupportedFile: "असमर्थित फाइल प्रकार। कृपया JPG, PNG, या PDF अपलोड करें।",
        setCustomFirst: "कृपया पहले संपादित करें बटन पर क्लिक करके कस्टम आवश्यकताएं सेट करें।",
        validationError: "कृपया मान्य मान दर्ज करें:\\n- आयाम: 50-2000px\\n- न्यूनतम आकार: 1+ KB\\n- अधिकतम न्यूनतम से अधिक होना चाहिए",
        validationErrorDocs: "कृपया दस्तावेज़ों के लिए मान्य मान दर्ज करें:\\n- न्यूनतम आकार: 1+ KB\\n- अधिकतम न्यूनतम से अधिक होना चाहिए",
        
        // Footer
        footer: "सभी आवश्यकताएं आधिकारिक स्रोतों से सत्यापित।",
        aboutUs: "ℹ️ हमारे बारे में",
        
        // About Us page
        aboutUsTitle: "हमारे बारे में",
        aboutHeading: "ExamUploadTool के बारे में",
        aboutPara1: "ExamUploadTool एक मुफ्त, 100% क्लाइंट-साइड छवि और PDF संपीड़न टूल है जो विशेष रूप से भारतीय सरकारी परीक्षा आवेदनों के लिए डिज़ाइन किया गया है। हम उन चुनौतियों को समझते हैं जिनका छात्र विभिन्न प्रतियोगी परीक्षाओं के लिए दस्तावेज़ तैयार करते समय सामना करते हैं, और हमारा उद्देश्य इस प्रक्रिया को सरल, तेज़ और सुरक्षित बनाना है।",
        ourMission: "हमारा उद्देश्य",
        missionText: "पूरे भारत में छात्रों को एक विश्वसनीय, गोपनीयता-केंद्रित टूल प्रदान करना जो उन्हें बिना किसी तकनीकी परेशानी या गोपनीयता चिंताओं के प्रतियोगी परीक्षाओं के लिए सटीक फोटो, हस्ताक्षर और दस्तावेज़ आवश्यकताओं को पूरा करने में मदद करे।",
        whyTrust: "हम पर विश्वास क्यों करें?",
        trust1: "🔒 100% गोपनीयता: सभी प्रसंस्करण आपके ब्राउज़र में होता है। आपकी फाइलें कभी आपके डिवाइस से बाहर नहीं जातीं।",
        trust2: "⚡ तत्काल परिणाम: कोई सर्वर अपलोड नहीं, कोई प्रतीक्षा नहीं। सेकंडों में फाइलें संपीड़ित करें।",
        trust3: "✅ आधिकारिक आवश्यकताएं: सभी परीक्षा प्रीसेट आधिकारिक स्रोतों से सत्यापित।",
        trust4: "📱 हर जगह काम करता है: डेस्कटॉप, मोबाइल, टैबलेट - सभी डिवाइसों पर काम करता है।",
        trust5: "💯 पूरी तरह मुफ्त: कोई छिपा शुल्क नहीं, कोई सदस्यता नहीं, आपके काम में कोई विज्ञापन हस्तक्षेप नहीं।",
        contact: "हमसे संपर्क करें",
        contactText: "कोई प्रश्न या सुझाव है? हम आपसे सुनना पसंद करेंगे! किसी भी प्रश्न या फीडबैक के लिए हमसे संपर्क करें।",
        backToHome: "← होम पर वापस"
    }
};

// Language manager
let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    updatePageLanguage();
}

function getTranslation(key) {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS.en[key] || key;
}

function updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (el.tagName === 'INPUT' && el.placeholder) {
            el.placeholder = translation;
        } else {
            el.textContent = translation;
        }
    });
    
    // Re-render exam cards on home page
    if (typeof renderExams === 'function' && typeof EXAMS !== 'undefined') {
        renderExams(EXAMS);
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    currentLang = savedLang;
    
    const toggle = document.getElementById('langToggle');
    if (toggle) {
        toggle.checked = savedLang === 'hi';
    }
    
    updatePageLanguage();
});
