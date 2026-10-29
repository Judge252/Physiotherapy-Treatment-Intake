(function initMedicalFormSchema(root, factory) {
    const schema = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = schema;
    } else {
        root.MEDICAL_FORM_SCHEMA = schema;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function createSchema() {
    'use strict';

    const sections = [
    {
        "id": "patient-details",
        "title": "פרטי המטופל",
        "fields": [
            {
                "key": "patientName",
                "label": "שם המטופל",
                "type": "text",
                "required": true,
                "maxLength": 120,
                "wide": false
            },
            {
                "key": "patientPhone",
                "label": "טלפון",
                "type": "text",
                "required": true,
                "maxLength": 24,
                "direction": "ltr",
                "validation": "phone",
                "wide": false
            },
            {
                "key": "address",
                "label": "כתובת",
                "type": "text",
                "maxLength": 240,
                "wide": false
            },
            {
                "key": "patientId",
                "label": "ת.ז",
                "type": "text",
                "maxLength": 20,
                "direction": "ltr",
                "validation": "identity",
                "wide": false
            },
            {
                "key": "age",
                "label": "גיל",
                "type": "number",
                "min": 0,
                "max": 130,
                "wide": false
            },
            {
                "key": "gender",
                "label": "מין",
                "type": "enum",
                "values": [
                    "זכר",
                    "נקבה",
                    "אחר"
                ],
                "maxLength": 20,
                "wide": false
            }
        ]
    },
    {
        "id": "medical-history",
        "title": "סיבת הפניה והיסטוריה רפואית",
        "fields": [
            {
                "key": "referralReason",
                "label": "סיבת הפניה/תלונות",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true
            },
            {
                "key": "examinedByDoctor",
                "label": "האם המטופל נבדק ע\"י רופא",
                "type": "enum",
                "values": [
                    "כן",
                    "לא"
                ],
                "maxLength": 120,
                "wide": false
            },
            {
                "key": "doctorSpecialty",
                "label": "התמחות",
                "type": "enum",
                "values": [
                    "רופא משפחה",
                    "אורתופד",
                    "נוירולוג",
                    "אא\"ג",
                    "פה ולסת",
                    "אחר"
                ],
                "maxLength": 120,
                "wide": false
            },
            {
                "key": "doctorDiagnosis",
                "label": "אבחנת רופא",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true
            },
            {
                "key": "backgroundDiseases",
                "label": "מחלות רקע והיסטוריה רפואית",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true
            },
            {
                "key": "regularMedications",
                "label": "תרופות קבועות",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true
            }
        ]
    },
    {
        "id": "tests-and-lifestyle",
        "title": "בדיקות ואורח חיים",
        "fields": [
            {
                "key": "specialTests",
                "label": "בדיקות מיוחדות",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true,
                "help": "האם המטופל עבר לאחרונה בדיקות כמו רנטגן, CT, MRI..."
            },
            {
                "key": "imagingResults",
                "label": "תוצאות בדיקה והדמיה",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true
            },
            {
                "key": "bloodTests",
                "label": "בדיקות דם",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true,
                "help": "האם עשה לאחרונה בדיקות דם, האם היו חסרים או משהו חריג"
            },
            {
                "key": "occupationActivity",
                "label": "עיסוק – רמת הפעילות הגופנית",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true,
                "help": "במה הוא עובד? האם הוא פעיל גופנית? מתאמן? נא לפרט."
            },
            {
                "key": "nutritionHabits",
                "label": "הרגלי תזונה",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true,
                "help": "האם המטופל נמצא בדיאטה מסוימת? אלרגיה? נמנע מאוכל מסוים? נא לפרט."
            }
        ]
    },
    {
        "id": "physical-examination",
        "title": "בדיקה פיזיקאלית",
        "fields": [
            {
                "key": "examinationType",
                "label": "בדיקה פיזיקאלית",
                "type": "enum",
                "values": [
                    "אורתופדית",
                    "נוירולוגית",
                    "אחר"
                ],
                "maxLength": 120,
                "wide": false
            },
            {
                "key": "physicalExamination",
                "label": "ממצאי בדיקה פיזיקאלית",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true
            },
            {
                "key": "vasPainScore",
                "label": "כאב - לפי VAS",
                "type": "number",
                "min": 0,
                "max": 10,
                "wide": false
            }
        ]
    },
    {
        "id": "clinical-conclusion",
        "title": "סיכום בדיקה ותכנית טיפול",
        "fields": [
            {
                "key": "consultationSummary",
                "label": "סיכום בדיקה וייעוץ",
                "type": "textarea",
                "maxLength": 4000,
                "wide": true
            },
            {
                "key": "diagnosis",
                "label": "אבחנה פיזיותרפיסט",
                "type": "textarea",
                "maxLength": 3000,
                "wide": true
            },
            {
                "key": "treatmentPlan",
                "label": "תכנית טיפול והמלצות",
                "type": "textarea",
                "maxLength": 4000,
                "wide": true
            }
        ]
    },
    {
        "id": "physiotherapist-details",
        "title": "פרטי הפיזיותרפיסט",
        "fields": [
            {
                "key": "physiotherapistName",
                "label": "שם הפיזיותרפיסט",
                "type": "text",
                "maxLength": 120,
                "wide": false
            },
            {
                "key": "licenseNumber",
                "label": "מספר רישיון",
                "type": "text",
                "maxLength": 60,
                "direction": "ltr",
                "wide": false
            },
            {
                "key": "physiotherapistSignature",
                "label": "חתימה",
                "type": "text",
                "maxLength": 120,
                "wide": false
            },
            {
                "key": "examinationDate",
                "label": "תאריך",
                "type": "date",
                "maxLength": 10,
                "direction": "ltr",
                "wide": false
            }
        ]
    }
];

    const fields = sections.flatMap((section) => section.fields);
    const fieldMap = Object.fromEntries(fields.map((field) => [field.key, field]));

    return Object.freeze({
        version: 1,
        sections: Object.freeze(sections),
        fields: Object.freeze(fields),
        fieldMap: Object.freeze(fieldMap),
    });
});
