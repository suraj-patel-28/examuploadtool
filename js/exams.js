// Exam presets database - Verified from official notifications
const EXAMS = [
    {
        id: 'custom',
        name: '✏️ Custom',
        category: 'Custom',
        isCustom: true,
        photo: {
            dimensions: { width: 0, height: 0 },
            minSize: 0,
            maxSize: 0,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 0, height: 0 },
            minSize: 0,
            maxSize: 0,
            format: 'JPG'
        },
        documents: {
            minSize: 0,
            maxSize: 0,
            format: 'PDF'
        }
    },
    {
        id: 'gate',
        name: 'GATE',
        category: 'Engineering',
        photo: {
            dimensions: { width: 350, height: 455 }, // 200x260 to 530x690 - using mid-range
            minSize: 5,
            maxSize: 600,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 415, height: 130 }, // 250x80 to 580x180 - using mid-range
            minSize: 3,
            maxSize: 300,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'jee-main',
        name: 'JEE Main',
        category: 'Engineering',
        photo: {
            dimensions: { width: 413, height: 531 }, // 3.5cm x 4.5cm at 300 DPI
            minSize: 10,
            maxSize: 200,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 413, height: 177 }, // 3.5cm x 1.5cm at 300 DPI
            minSize: 10,
            maxSize: 100,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'neet',
        name: 'NEET UG',
        category: 'Medical',
        photo: {
            dimensions: { width: 413, height: 531 }, // Passport size 3.5x4.5cm
            minSize: 10,
            maxSize: 200,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 413, height: 177 },
            minSize: 4,
            maxSize: 30,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'upsc',
        name: 'UPSC (CSE/IES/NDA)',
        category: 'Government',
        photo: {
            dimensions: { width: 675, height: 675 }, // 350-1000px, using mid-high
            minSize: 20,
            maxSize: 300,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 675, height: 675 },
            minSize: 20,
            maxSize: 300,
            format: 'JPG'
        },
        documents: {
            minSize: 20,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'ssc-cgl',
        name: 'SSC CGL',
        category: 'Government',
        photo: {
            dimensions: { width: 413, height: 531 }, // 3.5cm x 4.5cm
            minSize: 20,
            maxSize: 50,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 472, height: 236 }, // 4cm x 2cm
            minSize: 10,
            maxSize: 20,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'ssc-gd',
        name: 'SSC GD',
        category: 'Government',
        photo: {
            dimensions: { width: 413, height: 531 },
            minSize: 20,
            maxSize: 50,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 472, height: 236 }, // 4cm x 2cm
            minSize: 10,
            maxSize: 20,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'ibps',
        name: 'IBPS PO/Clerk',
        category: 'Banking',
        photo: {
            dimensions: { width: 200, height: 230 },
            minSize: 20,
            maxSize: 50,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 140, height: 60 },
            minSize: 10,
            maxSize: 20,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'sbi',
        name: 'SBI PO/Clerk',
        category: 'Banking',
        photo: {
            dimensions: { width: 200, height: 230 },
            minSize: 20,
            maxSize: 50,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 140, height: 60 },
            minSize: 10,
            maxSize: 20,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'rbi',
        name: 'RBI Grade B',
        category: 'Banking',
        photo: {
            dimensions: { width: 200, height: 230 },
            minSize: 20,
            maxSize: 50,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 140, height: 60 },
            minSize: 10,
            maxSize: 20,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'cat',
        name: 'CAT',
        category: 'Management',
        photo: {
            dimensions: { width: 413, height: 531 }, // 35mm x 45mm
            minSize: 30,
            maxSize: 80,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 413, height: 944 }, // 35mm x 80mm
            minSize: 30,
            maxSize: 80,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'xat',
        name: 'XAT',
        category: 'Management',
        photo: {
            dimensions: { width: 200, height: 230 },
            minSize: 20,
            maxSize: 50,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 140, height: 60 },
            minSize: 10,
            maxSize: 20,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 1000,
            format: 'PDF'
        }
    },
    {
        id: 'cuet',
        name: 'CUET UG/PG',
        category: 'University',
        photo: {
            dimensions: { width: 200, height: 230 }, // 3.5cm x 4.5cm
            minSize: 10,
            maxSize: 200,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 140, height: 60 },
            minSize: 10,
            maxSize: 50,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'afcat',
        name: 'AFCAT',
        category: 'Defence',
        photo: {
            dimensions: { width: 200, height: 230 },
            minSize: 10,
            maxSize: 50,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 140, height: 60 },
            minSize: 10,
            maxSize: 50,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'ctet',
        name: 'CTET',
        category: 'Teaching',
        photo: {
            dimensions: { width: 413, height: 531 }, // 3.5cm x 4.5cm
            minSize: 10,
            maxSize: 100,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 413, height: 177 }, // 3.5cm x 1.5cm
            minSize: 3,
            maxSize: 30,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    },
    {
        id: 'state-psc',
        name: 'State PSC',
        category: 'Government',
        hasStateSelector: true, // Flag for state dropdown
        photo: {
            dimensions: { width: 413, height: 531 },
            minSize: 20,
            maxSize: 50,
            format: 'JPG'
        },
        signature: {
            dimensions: { width: 413, height: 177 },
            minSize: 10,
            maxSize: 20,
            format: 'JPG'
        },
        documents: {
            minSize: 50,
            maxSize: 300,
            format: 'PDF'
        }
    }
];

// State PSC specifications
const STATE_PSC_SPECS = {
    'uppsc': { name: 'UPPSC (UP)', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 30, dim: {w: 413, h: 177}} },
    'hpsc': { name: 'HPSC (Haryana)', photo: {min: 10, max: 100, dim: {w: 413, h: 531}}, signature: {min: 10, max: 50, dim: {w: 413, h: 177}} },
    'ukpsc': { name: 'UKPSC (Uttarakhand)', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 20, dim: {w: 413, h: 177}} },
    'mppsc': { name: 'MPPSC (MP)', photo: {min: 25, max: 200, dim: {w: 413, h: 531}}, signature: {min: 25, max: 200, dim: {w: 413, h: 177}} },
    'hppsc': { name: 'HPPSC (Himachal)', photo: {min: 10, max: 40, dim: {w: 110, h: 140}}, signature: {min: 10, max: 30, dim: {w: 110, h: 140}} },
    'jkpsc': { name: 'JKPSC (J&K)', photo: {min: 10, max: 20, dim: {w: 413, h: 531}}, signature: {min: 10, max: 20, dim: {w: 413, h: 177}} },
    'ppsc': { name: 'PPSC (Punjab)', photo: {min: 10, max: 40, dim: {w: 413, h: 531}}, signature: {min: 10, max: 40, dim: {w: 413, h: 177}} },
    'mpsc-mh': { name: 'MPSC (Maharashtra)', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 20, dim: {w: 413, h: 177}} },
    'gpsc': { name: 'GPSC (Gujarat)', photo: {min: 10, max: 15, dim: {w: 130, h: 180}}, signature: {min: 10, max: 15, dim: {w: 130, h: 180}} },
    'rpsc': { name: 'RPSC (Rajasthan)', photo: {min: 20, max: 50, dim: {w: 240, h: 320}}, signature: {min: 20, max: 50, dim: {w: 280, h: 80}} },
    'kpsc-kerala': { name: 'KPSC (Kerala)', photo: {min: 20, max: 30, dim: {w: 413, h: 531}}, signature: {min: 20, max: 30, dim: {w: 413, h: 177}} },
    'kpsc-karnataka': { name: 'KPSC (Karnataka)', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 20, dim: {w: 413, h: 177}} },
    'tnpsc': { name: 'TNPSC (Tamil Nadu)', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 20, dim: {w: 413, h: 177}} },
    'appsc-ap': { name: 'APPSC (Andhra Pradesh)', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 30, dim: {w: 413, h: 177}} },
    'appsc-arunachal': { name: 'APPSC (Arunachal)', photo: {min: 50, max: 100, dim: {w: 200, h: 250}}, signature: {min: 20, max: 50, dim: {w: 140, h: 60}} },
    'tspsc': { name: 'TSPSC (Telangana)', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 30, dim: {w: 413, h: 177}} },
    'goa-psc': { name: 'Goa PSC', photo: {min: 10, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 20, dim: {w: 413, h: 177}} },
    'bpsc': { name: 'BPSC (Bihar)', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 20, dim: {w: 413, h: 177}} },
    'jpsc': { name: 'JPSC (Jharkhand)', photo: {min: 15, max: 25, dim: {w: 413, h: 531}}, signature: {min: 10, max: 15, dim: {w: 413, h: 177}} },
    'wbpsc': { name: 'WBPSC (West Bengal)', photo: {min: 20, max: 100, dim: {w: 160, h: 213}}, signature: {min: 10, max: 20, dim: {w: 160, h: 80}} },
    'opsc': { name: 'OPSC (Odisha)', photo: {min: 20, max: 100, dim: {w: 413, h: 531}}, signature: {min: 20, max: 100, dim: {w: 413, h: 177}} },
    'apsc': { name: 'APSC (Assam)', photo: {min: 20, max: 50, dim: {w: 200, h: 250}}, signature: {min: 10, max: 20, dim: {w: 140, h: 60}} },
    'cgpsc': { name: 'CGPSC (Chhattisgarh)', photo: {min: 30, max: 100, dim: {w: 275, h: 354}}, signature: {min: 20, max: 50, dim: {w: 275, h: 118}} },
    'mpsc-manipur': { name: 'MPSC (Manipur)', photo: {min: 20, max: 50, dim: {w: 140, h: 177}}, signature: {min: 10, max: 20, dim: {w: 140, h: 80}} },
    'mpsc-mizoram': { name: 'MPSC (Mizoram)', photo: {min: 20, max: 10000, dim: {w: 130, h: 200}}, signature: {min: 10, max: 75, dim: {w: 177, h: 98}} },
    'meghalaya-psc': { name: 'Meghalaya PSC', photo: {min: 20, max: 50, dim: {w: 150, h: 200}}, signature: {min: 20, max: 50, dim: {w: 150, h: 100}} },
    'npsc': { name: 'NPSC (Nagaland)', photo: {min: 20, max: 100, dim: {w: 200, h: 240}}, signature: {min: 20, max: 100, dim: {w: 200, h: 100}} },
    'tpsc': { name: 'TPSC (Tripura)', photo: {min: 20, max: 100, dim: {w: 200, h: 250}}, signature: {min: 10, max: 50, dim: {w: 200, h: 100}} },
    'spsc': { name: 'SPSC (Sikkim)', photo: {min: 10, max: 50, dim: {w: 150, h: 200}}, signature: {min: 5, max: 30, dim: {w: 150, h: 100}} },
    'generic': { name: 'Generic State PSC', photo: {min: 20, max: 50, dim: {w: 413, h: 531}}, signature: {min: 10, max: 20, dim: {w: 413, h: 177}} }
};

const CATEGORY_COLORS = {
    'Custom': '#3b82f6',
    'Engineering': '#3b82f6',
    'Medical': '#10b981',
    'Government': '#f59e0b',
    'Banking': '#8b5cf6',
    'Management': '#ec4899',
    'University': '#06b6d4',
    'Defence': '#ef4444',
    'Teaching': '#14b8a6'
};
