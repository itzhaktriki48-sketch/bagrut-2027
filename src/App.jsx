import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  BookOpen,
  FolderOpen,
  Bot,
  PenTool,
  Timer,
  FileText,
  BarChart3,
  ClipboardCheck,
  Settings,
  Play,
  Pause,
  Square,
  RotateCcw,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  Volume2,
  StopCircle,
  Download,
  Upload,
  Trash2,
  Edit3,
  Search,
  ChevronLeft,
  ChevronRight,
  Award,
  Layers,
  Bell,
  Focus,
  ShieldCheck,
  RefreshCw,
  Check,
  X,
  BookMarked,
  GraduationCap,
  HelpCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend
} from 'recharts';

// --- נתוני פתיחה של 7 מקצועות הבגרות (2027) ---
const INITIAL_SUBJECTS = [
  {
    id: 'dinim',
    name: 'דינים',
    examDate: '2027-05-09',
    color: '#8b5cf6',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    barColor: '#8b5cf6',
    knowledgeLevel: 'בינונית',
    existingMaterialPct: 10,
    learnedMaterialPct: 0,
    masteryPct: 15,
    readinessPct: 12,
    totalMinutes: 0,
    missingMaterial: 'חסר חומר הלימוד של השנה — צריך להשיג את החומר.',
    missingGotIt: false,
    missingFromWho: '',
    missingDate: '',
    missingNotes: '',
    nextTask: 'להשיג את חומר הלימוד של השנה בדינים',
    chapters: [
      {
        id: 'din-ch1',
        title: 'פרק 1: מושגי יסוד ומקורות המשפט',
        topics: [
          {
            id: 'din-t1',
            title: 'מבוא לדינים והיררכיית הנורמות',
            subtopic: 'חוק, תקנה ונוהג',
            status: 'טרם התחלתי',
            summary: '',
            notes: '',
            minutesSpent: 0,
            practiceScore: null
          }
        ]
      }
    ]
  },
  {
    id: 'hebrew',
    name: 'עברית',
    examDate: '2027-05-17',
    color: '#0ea5e9',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    barColor: '#0ea5e9',
    knowledgeLevel: 'בינונית',
    existingMaterialPct: 60,
    learnedMaterialPct: 15,
    masteryPct: 25,
    readinessPct: 22,
    totalMinutes: 0,
    missingMaterial: 'כ-40% מהחומר חסר — יש להשלים את החומר החסר.',
    missingGotIt: false,
    missingFromWho: '',
    missingDate: '',
    missingNotes: '',
    nextTask: 'למפות את 40% החומר החסר ולהתחיל ללמוד',
    chapters: [
      {
        id: 'heb-ch1',
        title: 'פרק 1: תחביר ושחבור',
        topics: [
          {
            id: 'heb-t1',
            title: 'משפט פשוט, מורכב ומאוחה',
            subtopic: 'תפקידי מילים ודרכי חיבור',
            status: 'בלמידה',
            summary: '',
            notes: '',
            minutesSpent: 0,
            practiceScore: null
          }
        ]
      }
    ]
  },
  {
    id: 'bible',
    name: 'תנ״ך',
    examDate: '2027-05-20',
    color: '#d97706',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    barColor: '#d97706',
    knowledgeLevel: 'טובה יחסית',
    existingMaterialPct: 90,
    learnedMaterialPct: 35,
    masteryPct: 50,
    readinessPct: 45,
    totalMinutes: 0,
    missingMaterial: 'כ-10% מהחומר חסר.',
    missingGotIt: false,
    missingFromWho: '',
    missingDate: '',
    missingNotes: '',
    nextTask: 'להשלים את 10% החומר שחסר ולתרגל שאלות פרקים',
    chapters: [
      {
        id: 'bib-ch1',
        title: 'פרק 1: סיפורי ראשית ומלוכה',
        topics: [
          {
            id: 'bib-t1',
            title: 'אמצעים אמנותיים ומוטיבים מנחים',
            subtopic: 'ניתוח טקסט מקראי',
            status: 'דורש תרגול',
            summary: '',
            notes: '',
            minutesSpent: 0,
            practiceScore: null
          }
        ]
      }
    ]
  },
  {
    id: 'math',
    name: 'מתמטיקה',
    examDate: '2027-05-26',
    color: '#e11d48',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    barColor: '#e11d48',
    knowledgeLevel: 'בינונית',
    existingMaterialPct: 0,
    learnedMaterialPct: 0,
    masteryPct: 10,
    readinessPct: 8,
    totalMinutes: 0,
    missingMaterial: 'אין ספר וחומר לימוד של השנה — יש להשיג חומר.',
    missingGotIt: false,
    missingFromWho: '',
    missingDate: '',
    missingNotes: '',
    nextTask: 'להשיג ספר וחומר לימוד של השנה במתמטיקה',
    chapters: [
      {
        id: 'mth-ch1',
        title: 'פרק 1: אלגברה, פונקציות וחדו״א',
        topics: [
          {
            id: 'mth-t1',
            title: 'חקירת פונקציות ומשוואות',
            subtopic: 'תחום הגדרה, נקודות קיצון ותרגול טכני',
            status: 'טרם התחלתי',
            summary: '',
            notes: '',
            minutesSpent: 0,
            practiceScore: null
          }
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'אנגלית',
    examDate: '2027-06-01',
    color: '#10b981',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    barColor: '#10b981',
    knowledgeLevel: 'בינונית',
    existingMaterialPct: 0,
    learnedMaterialPct: 0,
    masteryPct: 20,
    readinessPct: 15,
    totalMinutes: 0,
    missingMaterial: 'אין עדיין חומר לימוד של השנה — יש להשיג חומר.',
    missingGotIt: false,
    missingFromWho: '',
    missingDate: '',
    missingNotes: '',
    nextTask: 'להשיג חומר לימוד לשנת הלימודים באנגלית',
    chapters: [
      {
        id: 'eng-ch1',
        title: 'פרק 1: הבנת הנקרא, אוצר מילים וכתיבה',
        topics: [
          {
            id: 'eng-t1',
            title: 'Reading Comprehension & Connectors',
            subtopic: 'מילות קישור ואסטרטגיות קריאה',
            status: 'טרם התחלתי',
            summary: '',
            notes: '',
            minutesSpent: 0,
            practiceScore: null
          }
        ]
      }
    ]
  },
  {
    id: 'literature',
    name: 'ספרות',
    examDate: '2027-06-17',
    color: '#f59e0b',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    barColor: '#f59e0b',
    knowledgeLevel: 'בינונית',
    existingMaterialPct: 35,
    learnedMaterialPct: 10,
    masteryPct: 20,
    readinessPct: 18,
    totalMinutes: 0,
    missingMaterial: 'קיים חומר חלקי — צריך להשלים חומר עם חבר/ה לכיתה.',
    missingGotIt: false,
    missingFromWho: 'חבר/ה לכיתה',
    missingDate: '',
    missingNotes: '',
    nextTask: 'לתאם השלמת חומר בספרות עם חבר/ה לכיתה',
    chapters: [
      {
        id: 'lit-ch1',
        title: 'פרק 1: שירה, סיפור קצר ודרמה',
        topics: [
          {
            id: 'lit-t1',
            title: 'ניתוח דמויות, קונפליקט ומוטיב מרכזי',
            subtopic: 'מבנה אנליטי לשאלת בגרות',
            status: 'טרם התחלתי',
            summary: '',
            notes: '',
            minutesSpent: 0,
            practiceScore: null
          }
        ]
      }
    ]
  },
  {
    id: 'civics',
    name: 'אזרחות',
    examDate: '2027-06-24',
    color: '#6366f1',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    barColor: '#6366f1',
    knowledgeLevel: 'בינונית',
    existingMaterialPct: 50,
    learnedMaterialPct: 15,
    masteryPct: 25,
    readinessPct: 20,
    totalMinutes: 0,
    missingMaterial: 'קיימים כ-50% מחומרים משנים קודמות — צריך להשלים את החומר העדכני של כיתה י״ב.',
    missingGotIt: false,
    missingFromWho: '',
    missingDate: '',
    missingNotes: '',
    nextTask: 'להשלים חומר עדכני של כיתה י״ב באזרחות',
    chapters: [
      {
        id: 'civ-ch1',
        title: 'פרק 1: עקרונות הדמוקרטיה והמשטר בישראל',
        topics: [
          {
            id: 'civ-t1',
            title: 'עקרון שלטון החוק, הפרדת רשויות וזכויות אדם',
            subtopic: 'יישום על אירועים אקטואליים',
            status: 'בלמידה',
            summary: '',
            notes: '',
            minutesSpent: 0,
            practiceScore: null
          }
        ]
      }
    ]
  }
];

const SEED_EXISTING = { dinim: 0, hebrew: 60, bible: 90, math: 0, english: 0, literature: null, civics: 50 };
const SEED_SUBJECTS = INITIAL_SUBJECTS.map((x) => ({ ...x, existingMaterialPct: SEED_EXISTING[x.id], learnedMaterialPct: 0, masteryPct: 0, readinessPct: 0, chapters: [] }));
const pctTxt = (v) => (v === null || v === undefined ? 'לא הוזן' : v + '%');
function Progress({ value, color }) {
  return (
    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
      <div className="h-full rounded-full" style={{ width: (value || 0) + '%', background: color }} />
    </div>
  );
}
function Section({ title, children }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-4">
      <h3 className="font-bold mb-2">{title}</h3>
      {children}
    </section>
  );
}

const TOPIC_STATUSES = [
  'טרם התחלתי',
  'בלמידה',
  'הסתיים',
  'דורש חזרה',
  'דורש תרגול',
  'שולטת בחומר',
  'מוכן לבחינה'
];

const TASK_STATUSES = ['פתוחה', 'הושלם', 'חלקי', 'לא בוצע', 'נדחה'];

const HEBREW_DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const INITIAL_WEEKLY_PLAN = {
  0: [{ id: 'wp-1', subjectId: 'math', minutes: 90, note: 'לימוד ערב גמיש (אחרי 16:30)' }],
  1: [{ id: 'wp-2', subjectId: 'english', minutes: 90, note: 'לימוד ערב גמיש (אחרי 16:30)' }],
  2: [{ id: 'wp-3', subjectId: 'hebrew', minutes: 90, note: 'לימוד ערב גמיש (אחרי 16:30)' }],
  3: [{ id: 'wp-4', subjectId: 'bible', minutes: 90, note: 'לימוד ערב גמיש (אחרי 16:30)' }],
  4: [
    { id: 'wp-5', subjectId: 'math', minutes: 45, note: 'חלוקת ערב חמישי' },
    { id: 'wp-6', subjectId: 'dinim', minutes: 45, note: 'חלוקת ערב חמישי' }
  ],
  5: [{ id: 'wp-7', subjectId: 'civics', minutes: 30, note: 'עד 30 דקות — אזרחות וספרות לסירוגין' }],
  6: [] // שבת — מנוחה מוחלטת
};

const LONG_TERM_STAGES = [
  {
    period: 'סוף נובמבר–דצמבר 2026',
    title: 'איסוף חומר, השלמת חוסרים ואבחון רמות',
    bullets: ['איסוף חומר בכל המקצועות', 'השלמת חוסרים', 'אבחון רמות', 'בניית הרגלי למידה גמישים']
  },
  {
    period: 'ינואר–פברואר 2027',
    title: 'בניית בסיס והתקדמות שיטתית',
    bullets: ['בניית בסיס', 'לימוד פרקים', 'התקדמות שיטתית בכל 7 המקצועות']
  },
  {
    period: 'מרץ 2027',
    title: 'השלמת רוב החומר החדש ותחילת חזרות',
    bullets: ['השלמת רוב החומר החדש', 'זיהוי נושאים חלשים', 'תחילת חזרות מרווחות']
  },
  {
    period: 'אפריל 2027',
    title: 'חזרות, תרגול ומבחנים לדוגמה',
    bullets: ['חזרות שיטתיות', 'תרגול שאלות', 'מבחנים לדוגמה']
  },
  {
    period: 'מאי–יוני 2027',
    title: 'מיקוד כרונולוגי בבחינות ושימור שאר המקצועות',
    bullets: ['התמקדות בבחינה הקרובה לפי סדר התאריכים', 'תרגול ממוקד וחזרות', 'שימור הידע במקצועות הבאים']
  }
];

const SAMPLE_PRACTICE_BANK = [
  {
    id: 'q1',
    subjectId: 'bible',
    topic: 'אמצעים אמנותיים ומוטיבים מנחים',
    type: 'שאלה אמריקאית',
    isOfficialExam: false,
    question: 'מהי המטרה המרכזית של חזרה על מילה או ביטוי מנחה בסיפור מקראי?',
    options: [
      'להדגיש רעיון, קשר בין אירועים או תפנית בעלילה',
      'להאריך את הטקסט ללא משמעות תוכנית',
      'להחליף את הצורך בהבנת הקשר היסטורי'
    ],
    correctAnswer: 'להדגיש רעיון, קשר בין אירועים או תפנית בעלילה',
    explanation: 'מילה מנחה בסיפור המקראי מכוונת את הקורא למוקד הרעיוני או לתמורה שמתרחשת בדמויות ובמצב.'
  },
  {
    id: 'q2',
    subjectId: 'civics',
    topic: 'עקרון שלטון החוק, הפרדת רשויות וזכויות אדם',
    type: 'נכון ולא נכון',
    isOfficialExam: false,
    question: 'הפרדת רשויות נועדה לרכז את כל הסמכויות בידי גוף אחד כדי לייעל החלטות.',
    options: ['נכון', 'לא נכון'],
    correctAnswer: 'לא נכון',
    explanation: 'להפך: הפרדת רשויות (מחוקקת, מבצעת ושופטת) נועדה למנוע ריכוז כוח מוחלט ולאפשר פיקוח ואיזון הדדי.'
  },
  {
    id: 'q3',
    subjectId: 'hebrew',
    topic: 'משפט פשוט, מורכב ומאוחה',
    type: 'השלמת משפטים',
    isOfficialExam: false,
    question: 'משפט המחובר באמצעות מילות חיבור מחברות (כגון: ו-, אך, אבל, או) נקרא משפט _______.',
    options: ['מאוחה', 'מורכב', 'פשוט עם תמורה'],
    correctAnswer: 'מאוחה',
    explanation: 'משפט מאוחה מורכב משני איברים עצמאיים או יותר המחוברים במילת חיבור מחברת.'
  }
];

const NAV = [
  ['dashboard', 'בית', LayoutDashboard], ['calendar', 'לוח שנה', CalendarIcon], ['subjects', 'המקצועות שלי', BookOpen], ['files', 'חומרי לימוד', FolderOpen],
  ['ai', 'המורה הפרטי', Bot], ['practice', 'תרגול', PenTool], ['timer', 'טיימר', Timer], ['summaries', 'סיכומים', FileText],
  ['stats', 'סטטיסטיקות', BarChart3], ['weekly', 'סיכום שבועי', ClipboardCheck], ['settings', 'הגדרות', Settings]
];

const STORAGE_KEY = 'bagrut_2027_master_state_v1';

function isoLocal(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function getTodayISO() {
  return isoLocal(new Date());
}

function daysUntilDate(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

function formatHebrewDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('he-IL', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function addDaysISO(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return isoLocal(d);
}

export default function App() {
  // --- מצב משתמשת וענן ---
  const [userProfile, setUserProfile] = useState({
    name: 'תלמידת כיתה י״ב',
    email: 'student.2027@bagrut-cloud.local',
    cloudConnected: false,
    supabaseUrl: '',
    supabaseAnonKey: '',
    aiEndpoint: '',
    aiModel: 'gemini-2.5-flash',
    lastSyncedAt: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
    routineNote: 'עבודה א׳–ה׳ 08:00–16:30 | קימה 07:00 | שינה 22:30–23:00 | למידה גמישה בערב | שישי עד 30 דק׳ | שבת מנוחה'
  });

  // --- נתוני המערכת המרכזיים ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subjects, setSubjects] = useState(SEED_SUBJECTS);
  const [selectedSubjectId, setSelectedSubjectId] = useState('dinim');
  const [weeklyTargetHours, setWeeklyTargetHours] = useState(8);
  const [weeklyPlan, setWeeklyPlan] = useState(INITIAL_WEEKLY_PLAN);

  const [tasks, setTasks] = useState([
    {
      id: 't-101',
      subjectId: 'math',
      title: 'להשיג ספר וחומר לימוד לשנה במתמטיקה',
      date: getTodayISO(),
      timeSlot: 'ערב (גמיש)',
      durationMinutes: 45,
      status: 'פתוחה'
    },
    {
      id: 't-102',
      subjectId: 'dinim',
      title: 'להשיג את חומר הלימוד של השנה בדינים',
      date: getTodayISO(),
      timeSlot: 'ערב (גמיש)',
      durationMinutes: 45,
      status: 'פתוחה'
    },
    {
      id: 't-103',
      subjectId: 'literature',
      title: 'להשלים חומר בספרות עם חבר/ה לכיתה',
      date: addDaysISO(getTodayISO(), 1),
      timeSlot: 'ערב (גמיש)',
      durationMinutes: 30,
      status: 'פתוחה'
    }
  ]);

  const [sessions, setSessions] = useState([]);
  const [files, setFiles] = useState([]);
  const [summaries, setSummaries] = useState([]);

  const [reviewQueue, setReviewQueue] = useState([]);

  const [practiceResults, setPracticeResults] = useState([]);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [reminders, setReminders] = useState([
    { id: 'rem-1', type: 'תזכורת ללמידה', time: '19:30', enabled: true, note: 'זמן לימוד ערב גמיש (עד 90 דק׳)' },
    { id: 'rem-2', type: 'תזכורת להשלמת חומר', time: '17:30', enabled: true, note: 'בדיקת חומרים חסרים במקצועות' },
    { id: 'rem-3', type: 'תזכורת לחזרה', time: '20:00', enabled: true, note: 'חזרה מרווחת על נושאים שנקבעו' },
    { id: 'rem-4', type: 'תזכורת לבחינה', time: '09:00', enabled: true, note: 'ספירה לאחור למועדי הבגרות 2027' },
    { id: 'rem-5', type: 'תזכורת לסיכום שבועי', time: '11:00', enabled: true, note: 'סיכום שבועי והערכת קצב (יום שישי)' }
  ]);

  // --- טיימר מבוסס חותמות זמן אמיתיות (Timestamp-based) ---
  const [timerSubjectId, setTimerSubjectId] = useState('math');
  const [timerChapter, setTimerChapter] = useState('');
  const [timerTopic, setTimerTopic] = useState('');
  const [timerGoalMinutes, setTimerGoalMinutes] = useState(45); // 25, 45, 60, 90, 0 (שעון עצר)
  const [pomodoroMode, setPomodoroMode] = useState(false);
  const [pomodoroBreak, setPomodoroBreak] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [timerState, setTimerState] = useState({
    running: false,
    startedAtMs: null,
    accumulatedMs: 0
  });
  const [nowTick, setNowTick] = useState(Date.now());
  const [showPostSessionModal, setShowPostSessionModal] = useState(false);
  const [completedSessionDurationMin, setCompletedSessionDurationMin] = useState(0);
  const [postSessionForm, setPostSessionForm] = useState({
    whatLearned: '',
    whatUnderstood: '',
    whatNotUnderstood: '',
    needsReview: false,
    nextTask: ''
  });

  // --- מורה פרטי AI והאזנה לשיעורים ---
  const [aiSubjectId, setAiSubjectId] = useState('dinim');
  const [aiMode, setAiMode] = useState('לימוד');
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: 'שלום! אני המורה הפרטי שלך לבגרויות 2027. אני מתעדף קודם כל את החומרים שהעלית למערכת, מציין בבירור כאשר חסר חומר רשמי, ומסביר שלב אחר שלב לפי הקצב שלך. במה נתחיל היום?'
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [audioSubjectId, setAudioSubjectId] = useState('bible');
  const [audioTopic, setAudioTopic] = useState('אמצעים אמנותיים ומוטיבים מנחים');
  const [audioLength, setAudioLength] = useState('קצר (כ-3 דקות)');
  const [audioLevel, setAudioLevel] = useState('ברור ומודרך');
  const [audioRate, setAudioRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [generatedAudioScript, setGeneratedAudioScript] = useState('');

  // --- תרגול ---
  const [practiceSubjectFilter, setPracticeSubjectFilter] = useState('all');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submittedAnswerFeedback, setSubmittedAnswerFeedback] = useState(null);
  const [difficultQuestionIds, setDifficultQuestionIds] = useState([]);

  // --- לוח שנה, משימות, קבצים ודוח שבועי ---
  const [calendarView, setCalendarView] = useState('שבועי');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubjectId, setNewTaskSubjectId] = useState('math');
  const [newTaskDate, setNewTaskDate] = useState(getTodayISO());
  const [newTaskDuration, setNewTaskDuration] = useState(45);
  const [fileSearch, setFileSearch] = useState('');
  const [fileSubjectFilter, setFileSubjectFilter] = useState('all');
  const [weeklyReflection, setWeeklyReflection] = useState({
    feeling: '',
    hardest: '',
    succeeded: '',
    improve: ''
  });
  const [statusBanner, setStatusBanner] = useState(null);

  const [newChapter, setNewChapter] = useState('');
  const [newTopic, setNewTopic] = useState({});
  const [newSummary, setNewSummary] = useState({ subjectId: 'math', topicTitle: '', content: '' });
  const fileInputRef = useRef(null);
  const loadedRef = useRef(false);
  const sessionStart = useRef(Date.now());

  const showNotice = (msg) => {
    setStatusBanner(msg);
    setTimeout(() => {
      setStatusBanner((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // --- טעינה ושמירה אוטומטית ב-LocalStorage (ומסונכרנת לענן כשמוגדר) ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.subjects) setSubjects(parsed.subjects);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.sessions) setSessions(parsed.sessions);
        if (parsed.files) setFiles(parsed.files);
        if (parsed.summaries) setSummaries(parsed.summaries);
        if (parsed.reviewQueue) setReviewQueue(parsed.reviewQueue);
        if (parsed.practiceResults) setPracticeResults(parsed.practiceResults);
        if (parsed.wrongQuestions) setWrongQuestions(parsed.wrongQuestions);
        if (parsed.weeklyReports) setWeeklyReports(parsed.weeklyReports);
        if (parsed.weeklyTargetHours) setWeeklyTargetHours(parsed.weeklyTargetHours);
        if (parsed.weeklyPlan) setWeeklyPlan(parsed.weeklyPlan);
        if (parsed.reminders) setReminders(parsed.reminders);
        if (parsed.userProfile) setUserProfile((prev) => ({ ...prev, ...parsed.userProfile }));
        if (parsed.timerState) setTimerState(parsed.timerState);
        if (parsed.timerSubjectId) setTimerSubjectId(parsed.timerSubjectId);
        if (parsed.timerTopic) setTimerTopic(parsed.timerTopic);
        if (parsed.timerGoalMinutes !== undefined) setTimerGoalMinutes(parsed.timerGoalMinutes);
      }
    } catch (e) {
      console.error('שגיאה בטעינת נתונים מקומיים:', e);
    }
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      const payload = {
        subjects,
        tasks,
        sessions,
        files,
        summaries,
        reviewQueue,
        practiceResults,
        wrongQuestions,
        weeklyReports,
        weeklyTargetHours,
        weeklyPlan,
        reminders,
        userProfile,
        timerState,
        timerSubjectId,
        timerTopic,
        timerGoalMinutes
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setUserProfile((prev) => ({
        ...prev,
        lastSyncedAt: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      }));
    } catch (e) {
      console.error('שגיאה בשמירת נתונים:', e);
    }
  }, [
    subjects,
    tasks,
    sessions,
    files,
    summaries,
    reviewQueue,
    practiceResults,
    wrongQuestions,
    weeklyReports,
    weeklyTargetHours,
    weeklyPlan,
    reminders,
    userProfile.name,
    userProfile.email,
    userProfile.cloudConnected,
    userProfile.supabaseUrl,
    timerState,
    timerSubjectId,
    timerTopic,
    timerGoalMinutes
  ]);

  useEffect(() => {
    loadedRef.current = true;
  }, []);

  // --- שעון חותמת זמן אמיתי לטיימר ---
  useEffect(() => {
    if (!timerState.running) return;
    const interval = setInterval(() => {
      setNowTick(Date.now());
    }, 500);
    return () => clearInterval(interval);
  }, [timerState.running]);

  const elapsedMs = useMemo(() => {
    const activeDelta = timerState.running && timerState.startedAtMs ? Math.max(0, nowTick - timerState.startedAtMs) : 0;
    return timerState.accumulatedMs + activeDelta;
  }, [timerState, nowTick]);

  const elapsedSeconds = Math.floor(elapsedMs / 1000);

  const displayedTimerSeconds = useMemo(() => {
    if (pomodoroMode) {
      const blockSec = (pomodoroBreak ? 5 : 25) * 60;
      return Math.max(0, blockSec - elapsedSeconds);
    }
    if (timerGoalMinutes > 0) {
      return Math.max(0, timerGoalMinutes * 60 - elapsedSeconds);
    }
    return elapsedSeconds;
  }, [pomodoroMode, pomodoroBreak, timerGoalMinutes, elapsedSeconds]);

  const formatTimerClock = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // --- חישובים וסטטיסטיקות ---
  const todayISO = getTodayISO();

  const todayMinutes = useMemo(() => {
    return sessions.filter((s) => s.date === todayISO).reduce((acc, s) => acc + s.durationMinutes, 0);
  }, [sessions, todayISO]);

  const weekMinutes = useMemo(() => {
    const weekAgoISO = addDaysISO(todayISO, -7);
    return sessions.filter((s) => s.date >= weekAgoISO).reduce((acc, s) => acc + s.durationMinutes, 0);
  }, [sessions, todayISO]);

  const monthMinutes = useMemo(() => {
    const monthPrefix = todayISO.slice(0, 7);
    return sessions.filter((s) => s.date.startsWith(monthPrefix)).reduce((acc, s) => acc + s.durationMinutes, 0);
  }, [sessions, todayISO]);

  const sortedByExam = useMemo(() => {
    return [...subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate));
  }, [subjects]);

  const nearestExam = sortedByExam[0];
  const nearestExamDays = nearestExam ? daysUntilDate(nearestExam.examDate) : 0;

  const openTasks = useMemo(() => tasks.filter((t) => t.status !== 'הושלם'), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((t) => t.status === 'הושלם'), [tasks]);
  const overdueTasks = useMemo(
    () => tasks.filter((t) => t.status !== 'הושלם' && t.date < todayISO),
    [tasks, todayISO]
  );
  const todayTasks = useMemo(() => tasks.filter((t) => t.date === todayISO), [tasks, todayISO]);

  const overallProgressPct = useMemo(() => {
    if (!subjects.length) return 0;
    const sum = subjects.reduce((acc, s) => acc + s.learnedMaterialPct, 0);
    return Math.round(sum / subjects.length);
  }, [subjects]);

  const smartRecommendation = useMemo(() => {
    const missingSubjects = subjects.filter((s) => !s.missingGotIt && s.existingMaterialPct < 50);
    if (overdueTasks.length > 0) {
      return `יש ${overdueTasks.length} משימות פתוחות מתאריכים קודמים. המערכת אינה מעמיסה כפול — אפשר לבחור משימה אחת רגועה לערב ולסמן בקצב שלך.`; } if (missingSubjects.length > 0) { const names = missingSubjects.map((s) => s.name).join(', '); return `מומלץ להקדיש חלק מהשבוע להשגת חומר לימוד חסר במקצועות: ${names}, תוך שמירה על מיקוד בבחינות הקרובות.`;
    }
    return `הבחינה הקרובה ביותר היא ב${nearestExam?.name} (${nearestExamDays} ימים). מומלץ לשלב תרגול שאלות עם חזרה מרווחת.`;
  }, [subjects, overdueTasks, nearestExam, nearestExamDays]);

  // --- ניהול משימות (ללא יצירת משימות בשבת) ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const dayIdx = new Date(newTaskDate + 'T00:00:00').getDay();
    if (dayIdx === 6) {
      showNotice('שבת היא יום מנוחה מוחלט — לא ניתן ליצור משימות בשבת.');
      return;
    }
    const created = {
      id: 'task-' + Date.now(),
      subjectId: newTaskSubjectId,
      title: newTaskTitle.trim(),
      date: newTaskDate,
      timeSlot: 'ערב (גמיש)',
      durationMinutes: Number(newTaskDuration) || 45,
      status: 'פתוחה'
    };
    setTasks((prev) => [created, ...prev]);
    setNewTaskTitle('');
    showNotice('המשימה נוספה ללוח השנה.');
  };

  const updateTask = (taskId, patch) => {
    if (patch.date) {
      const dayIdx = new Date(patch.date + 'T00:00:00').getDay();
      if (dayIdx === 6) {
        showNotice('שבת היא יום מנוחה מוחלט — לא ניתן להעביר משימה לשבת.');
        return;
      }
    }
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, ...patch } : t)));
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showNotice('המשימה נמחקה.');
  };

  // --- הערכה מחודשת שבועית ללא ענישה כפולה ---
  const handleReevaluateWeeklyPlan = () => {
    const updatedPlan = { ...weeklyPlan };
    // עדיפות למקצועות שהבחינה שלהם קרובה יותר או שיש חומר חסר
    const prioritySubjects = [...subjects].sort((a, b) => {
      const aMissing = !a.missingGotIt && a.existingMaterialPct < 40 ? -30 : 0;
      const bMissing = !b.missingGotIt && b.existingMaterialPct < 40 ? -30 : 0;
      return daysUntilDate(a.examDate) + aMissing - (daysUntilDate(b.examDate) + bMissing);
    });

    const topSubj = prioritySubjects[0]?.id || 'math';
    const secondSubj = prioritySubjects[1]?.id || 'hebrew';

    updatedPlan[0] = [{ id: 'wp-re-1', subjectId: topSubj, minutes: 90, note: 'מותאם קצב וסדר בחינות (ללא העמסה כפולה)' }];
    updatedPlan[1] = [{ id: 'wp-re-2', subjectId: secondSubj, minutes: 90, note: 'מותאם התקדמות ונושאים לחזרה' }];
    updatedPlan[5] = [{ id: 'wp-re-5', subjectId: 'literature', minutes: 30, note: 'עד 30 דקות — אזרחות וספרות לסירוגין' }];
    updatedPlan[6] = []; // שבת מנוחה מוחלטת

    setWeeklyPlan(updatedPlan);
    showNotice('התוכנית השבועית הוערכה מחדש לפי סדר הבחינות, קצב ההתקדמות והחומרים החסרים.');
  };

  // --- פרקים ונושאים ---
  const addChapterToSubject = (subjectId, chapterTitle) => {
    if (!chapterTitle.trim()) return;
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              chapters: [
                ...s.chapters,
                { id: 'ch-' + Date.now(), title: chapterTitle.trim(), topics: [] }
              ]
            }
          : s
      )
    );
    showNotice('פרק חדש נוסף למקצוע.');
  };

  const addTopicToChapter = (subjectId, chapterId, topicTitle, subtopic = '') => {
    if (!topicTitle.trim()) return;
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          chapters: s.chapters.map((ch) =>
            ch.id === chapterId
              ? {
                  ...ch,
                  topics: [
                    ...ch.topics,
                    {
                      id: 'top-' + Date.now(),
                      title: topicTitle.trim(),
                      subtopic: subtopic.trim(),
                      status: 'טרם התחלתי',
                      summary: '',
                      notes: '',
                      minutesSpent: 0,
                      practiceScore: null
                    }
                  ]
                }
              : ch
          )
        };
      })
    );
    showNotice('נושא חדש נוסף לפרק.');
  };

  const updateTopicInSubject = (subjectId, chapterId, topicId, patch) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          chapters: s.chapters.map((ch) =>
            ch.id === chapterId
              ? {
                  ...ch,
                  topics: ch.topics.map((tp) => (tp.id === topicId ? { ...tp, ...patch } : tp))
                }
              : ch
          )
        };
      })
    );
  };

  // --- העלאת קבצים וניהול מאגר ---
  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files || []);
    if (!uploaded.length) return;
    const subj = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
    const firstChapter = subj?.chapters?.[0]?.title || 'פרק כללי';

    const mapped = uploaded.map((f) => ({
      id: 'file-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      name: f.name,
      sizeKb: Math.max(1, Math.round(f.size / 1024)),
      type: f.type || 'קובץ לימוד',
      subjectId: subj.id,
      chapter: firstChapter,
      notes: '',
      uploadedAt: todayISO,
      dataUrl: URL.createObjectURL(f)
    }));

    setFiles((prev) => [...mapped, ...prev]);
    showNotice(`הועלו ${mapped.length} קבצים למאגר ושויכו ל${subj.name}.`);
  };

  // --- מורה פרטי AI (מתעדף קבצים שהועלו ומציין מידע חסר) ---
  const handleSendAiMessage = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const questionText = aiInput.trim();
    const subj = subjects.find((s) => s.id === aiSubjectId);
    const uploadedForSubject = files.filter((f) => f.subjectId === aiSubjectId);

    const userMsg = { role: 'user', text: questionText };
    const hasUploaded = uploadedForSubject.length > 0;
    const missingWarning =
      !subj.missingGotIt && subj.existingMaterialPct < 50
        ? `\n\n⚠️ שים לב (שקיפות מידע): במקצוע ${subj.name} מצוין כרגע חוסר בחומר הלימוד (${subj.missingMaterial}). איני ממציא חומר רשמי שחסר.`
        : '';

    const sourceNote = hasUploaded
      ? `הסתמכתי קודם כל על הקבצים שהעלית ב${subj.name} (${uploadedForSubject.map((f) => f.name).join(', ')}).`
      : `טרם הועלו קבצים ייעודיים עבור ${subj.name} למאגר — ניתן להעלות סיכום או דף עבודה בלשונית "חומרי לימוד" כדי שאתעדף אותו.`;  const sa = subj(aiSubjectId);
  const hasEndpoint = userProfile.aiEndpoint && userProfile.aiEndpoint.trim();
  let reply = `[מצב: ${aiMode} | ${sa.name}] ${sourceNote}${missingWarning}`;
  if (hasEndpoint) {
    try {
      const res = await fetch(userProfile.aiEndpoint.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: sa.name, mode: aiMode, level: sa.knowledgeLevel, question: questionText, uploadedFiles: uploadedForSubject.map((f) => f.name) })
      });
      if (!res.ok) throw new Error('שגיאת שרת ' + res.status);
      const data = await res.json();
      reply += '\n\n' + (data.text || 'התקבלה תשובה ריקה מהשרת.');
    } catch (err) {
      reply += '\n\nלא הצלחתי להתחבר למורה ה-AI: ' + err.message;
    }
  } else {
    reply += '\n\nהמורה ה-AI עדיין לא מחובר לספק. יש להגדיר כתובת שרת מאובטח בהגדרות. השאלה שלך: "' + questionText + '"';
  }
  setAiMessages((prev) => [...prev, userMsg, { role: 'assistant', text: reply }]);
  setAiInput('');
  };

  const subj = (id) => subjects.find((x) => x.id === id) || subjects[0];
  const updateSubject = (id, patch) => setSubjects((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const askConfirm = (msg) => window.confirm(msg);

  // --- טיימר ---
  const startTimer = () => setTimerState({ running: true, startedAtMs: Date.now(), accumulatedMs: timerState.accumulatedMs });
  const pauseTimer = () => setTimerState({ running: false, startedAtMs: null, accumulatedMs: elapsedMs });
  const resetTimer = () => setTimerState({ running: false, startedAtMs: null, accumulatedMs: 0 });
  const endTimer = () => {
    setCompletedSessionDurationMin(Math.max(1, Math.round(elapsedMs / 60000)));
    pauseTimer();
    setShowPostSessionModal(true);
  };
  const saveSession = () => {
    const id = 'ses-' + Date.now();
    setSessions((prev) => [{ id, subjectId: timerSubjectId, chapter: timerChapter, topic: timerTopic, date: todayISO, durationMinutes: completedSessionDurationMin, ...postSessionForm }, ...prev]);
    updateSubject(timerSubjectId, { totalMinutes: subj(timerSubjectId).totalMinutes + completedSessionDurationMin });
    if (postSessionForm.needsReview) {
      setReviewQueue((prev) => [{ id: 'rev-' + Date.now(), subjectId: timerSubjectId, topicTitle: timerTopic || 'ללא נושא', dueDate: addDaysISO(todayISO, 1), intervalLabel: 'יום אחרי הלמידה', reason: 'סומן בסיום סשן', completed: false }, ...prev]);
    }
    setPostSessionForm({ whatLearned: '', whatUnderstood: '', whatNotUnderstood: '', needsReview: false, nextTask: '' });
    setShowPostSessionModal(false);
    resetTimer();
    showNotice('הסשן נשמר.');
  };

  // --- תרגול ---
  const bank = SAMPLE_PRACTICE_BANK.filter((q) => practiceSubjectFilter === 'all' || q.subjectId === practiceSubjectFilter);
  const curQ = bank[currentQuestionIdx % Math.max(1, bank.length)];
  const submitAnswer = () => {
    if (!curQ || !selectedAnswer) return;
    const correct = selectedAnswer === curQ.correctAnswer;
    setSubmittedAnswerFeedback({ correct });
    setPracticeResults((prev) => [{ id: 'pr-' + Date.now(), questionId: curQ.id, subjectId: curQ.subjectId, correct, date: todayISO }, ...prev]);
    if (!correct) setWrongQuestions((prev) => (prev.includes(curQ.id) ? prev : [...prev, curQ.id]));
  };

  const nextWorkday = (dateStr, n) => {
    let d = addDaysISO(dateStr, n);
    if (new Date(d + 'T00:00:00').getDay() === 6) d = addDaysISO(d, 1);
    return d;
  };

  const taskRow = (t) => (
    <div key={t.id} className="flex flex-wrap items-center gap-2 border-t border-slate-100 py-2 first:border-0">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: subj(t.subjectId).color }} />
      <span className={'font-medium ' + (t.status === 'הושלם' ? 'line-through opacity-60' : '')}>{subj(t.subjectId).name}: {t.title}</span>
      <span className="text-xs text-slate-500">{t.date} · {t.durationMinutes} דק׳</span>
      <span className="flex gap-1 flex-wrap mr-auto">
        <select value={t.status} onChange={(e) => updateTask(t.id, { status: e.target.value })} className="border rounded-lg px-2 py-1 text-sm">{TASK_STATUSES.map((x) => <option key={x}>{x}</option>)}</select>
        <button className="text-sm px-2 py-1 rounded-lg bg-slate-100" onClick={() => updateTask(t.id, { date: nextWorkday(t.date, 1), status: 'פתוחה' })}>דחה</button>
        <button className="text-sm px-2 py-1 rounded-lg bg-slate-100" onClick={() => updateTask(t.id, { date: nextWorkday(t.date, 7), status: 'פתוחה' })}>לשבוע הבא</button>
        <button className="text-sm px-2 py-1 rounded-lg bg-rose-50 text-rose-700" onClick={() => askConfirm('למחוק את המשימה?') && deleteTask(t.id)}>מחק</button>
      </span>
    </div>
  );
  const none = <p className="text-sm text-slate-500">אין פריטים.</p>;
  const weekStart = addDaysISO(todayISO, -new Date(todayISO + 'T00:00:00').getDay());
  const last7 = [6, 5, 4, 3, 2, 1, 0].map((n) => { const d = addDaysISO(todayISO, -n); return { day: d.slice(5), דקות: sessions.filter((x) => x.date === d).reduce((a, x) => a + x.durationMinutes, 0) }; });
  const cls = 'border rounded-xl px-3 py-2 bg-white';
  const btn = 'px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium';
  const sel = subjects.find((x) => x.id === selectedSubjectId) || subjects[0];
  const dueReviews = reviewQueue.filter((r) => !r.completed && r.dueDate <= todayISO);

  const views = {
    dashboard: () => (
      <div className="space-y-4">
        <div><h2 className="text-2xl font-bold">שלום, {userProfile.name}</h2><p className="text-slate-500">{formatHebrewDate(todayISO)}</p></div>
        <button onClick={() => setActiveTab('timer')} className="w-full rounded-2xl bg-indigo-600 text-white py-4 text-xl font-bold">מתחילים ללמוד</button>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[['הבחינה הקרובה', nearestExam.name + ' · ' + nearestExamDays + ' ימים'], ['דקות לימוד היום', todayMinutes], ['שעות השבוע', (weekMinutes / 60).toFixed(1) + ' מתוך ' + weeklyTargetHours], ['משימות פתוחות / הושלמו', openTasks.length + ' / ' + completedTasks.length]].map(([k, v]) => (
            <div key={k} className="bg-white rounded-2xl border p-3"><div className="text-xs text-slate-500">{k}</div><div className="font-bold text-lg">{v}</div></div>
          ))}
        </div>
        <div className="bg-indigo-50 rounded-2xl p-3 text-sm">{smartRecommendation}</div>
        <Section title="משימות להיום">{todayTasks.length ? todayTasks.map(taskRow) : none}</Section>
        {overdueTasks.length > 0 && <Section title="משימות באיחור">{overdueTasks.map(taskRow)}</Section>}
        <Section title="הגיע הזמן לחזור על החומר">{dueReviews.length ? dueReviews.map((r) => (
          <div key={r.id} className="flex items-center gap-2 py-1"><span>{subj(r.subjectId).name}: {r.topicTitle}</span><button className="mr-auto text-sm px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700" onClick={() => setReviewQueue((p) => p.map((x) => (x.id === r.id ? { ...x, completed: true } : x)))}>בוצע</button></div>
        )) : none}</Section>
        <Section title="המקצועות">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{subjects.map((x) => (
            <button key={x.id} onClick={() => { setSelectedSubjectId(x.id); setActiveTab('subjects'); }} className="text-right rounded-xl border p-3 bg-white">
              <div className="font-bold" style={{ color: x.color }}>{x.name}</div>
              <div className="text-xs text-slate-500 mb-1">{daysUntilDate(x.examDate)} ימים</div>
              <Progress value={x.learnedMaterialPct} color={x.color} /><div className="text-xs mt-1">נלמד {x.learnedMaterialPct}%</div>
            </button>))}</div>
        </Section>
      </div>
    ),
    calendar: () => (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">{['שבועי', 'חודשי', 'משימות', 'בחינות'].map((v) => <button key={v} onClick={() => setCalendarView(v)} className={'px-3 py-1.5 rounded-xl ' + (calendarView === v ? 'bg-indigo-600 text-white' : 'bg-white border')}>{v}</button>)}<button className="px-3 py-1.5 rounded-xl bg-white border" onClick={handleReevaluateWeeklyPlan}>הערכה מחודשת של התוכנית</button></div>
        <form onSubmit={handleAddTask} className="bg-white rounded-2xl border p-3 flex flex-wrap gap-2">
          <input className={cls + ' flex-1 min-w-40'} placeholder="משימה חדשה" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
          <select className={cls} value={newTaskSubjectId} onChange={(e) => setNewTaskSubjectId(e.target.value)}>{subjects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
          <input type="date" className={cls} value={newTaskDate} onChange={(e) => setNewTaskDate(e.target.value)} />
          <input type="number" min="5" className={cls + ' w-24'} value={newTaskDuration} onChange={(e) => setNewTaskDuration(e.target.value)} />
          <button className={btn}>הוסף</button>
        </form>
        {calendarView === 'שבועי' && [0, 1, 2, 3, 4, 5, 6].map((i) => { const d = addDaysISO(weekStart, i); const dt = tasks.filter((t) => t.date === d); return (
          <Section key={d} title={'יום ' + HEBREW_DAYS[i] + ' · ' + d + (d === todayISO ? ' · היום' : '')}>
            {i === 6 ? <p className="text-sm text-slate-500">שבת — יום מנוחה</p> : <>
              {(weeklyPlan[i] || []).map((p) => <p key={p.id} className="text-sm text-slate-600">תוכנית: {subj(p.subjectId).name} · {p.minutes} דק׳ ({p.note})</p>)}
              {dt.map(taskRow)}</>}
          </Section>); })}
        {calendarView === 'חודשי' && <Section title={'משימות החודש ' + todayISO.slice(0, 7)}>{tasks.filter((t) => t.date.startsWith(todayISO.slice(0, 7))).sort((a, b) => a.date.localeCompare(b.date)).map(taskRow)}</Section>}
        {calendarView === 'משימות' && <Section title="כל המשימות">{tasks.length ? [...tasks].sort((a, b) => a.date.localeCompare(b.date)).map(taskRow) : none}</Section>}
        {calendarView === 'בחינות' && <Section title="מועדי הבחינות">{sortedByExam.map((x) => <p key={x.id} className="py-1"><b style={{ color: x.color }}>{x.name}</b> · {formatHebrewDate(x.examDate)} · עוד {daysUntilDate(x.examDate)} ימים</p>)}</Section>}
      </div>
    ),
    subjects: () => {
      const readiness = Math.round((sel.learnedMaterialPct + sel.masteryPct) / 2);
      const nums = [['existingMaterialPct', 'חומר שקיים'], ['learnedMaterialPct', 'חומר שנלמד'], ['masteryPct', 'שליטה בחומר (הערכה עצמית)']];
      return (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">{subjects.map((x) => <button key={x.id} onClick={() => setSelectedSubjectId(x.id)} className={'px-3 py-1.5 rounded-xl border ' + (x.id === sel.id ? 'text-white' : 'bg-white')} style={x.id === sel.id ? { background: x.color } : {}}>{x.name}</button>)}</div>
          <Section title={sel.name + ' · בחינה בעוד ' + daysUntilDate(sel.examDate) + ' ימים'}>
            <label className="text-sm">תאריך הבחינה (נתון פתיחה, ניתן לעריכה) <input type="date" className={cls + ' mr-2'} value={sel.examDate} onChange={(e) => updateSubject(sel.id, { examDate: e.target.value })} /></label>
            <p className="text-sm text-slate-500 mt-2">שעות לימוד שהושקעו: {(sel.totalMinutes / 60).toFixed(1)} · רמת ידע: {sel.knowledgeLevel}</p>
          </Section>
          <Section title="ארבעה מדדים נפרדים">
            {nums.map(([k, l]) => (
              <div key={k} className="mb-2"><div className="flex justify-between text-sm"><span>{l}</span><b>{pctTxt(sel[k])}</b></div>
                <input type="range" min="0" max="100" className="w-full" value={sel[k] ?? 0} onChange={(e) => updateSubject(sel.id, { [k]: Number(e.target.value) })} /></div>))}
            <div className="bg-indigo-50 rounded-xl p-2 text-sm">מוכנות משוערת: <b>{readiness}%</b> (הערכה לפי נלמד ושליטה בלבד, לא ציון רשמי ולא הבטחה להצלחה)</div>
          </Section>
          <Section title="החומר שחסר לי">
            <p className="text-sm mb-2">{sel.missingMaterial}</p>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sel.missingGotIt} onChange={(e) => updateSubject(sel.id, { missingGotIt: e.target.checked, missingDate: e.target.checked ? todayISO : '' })} /> החומר הושג {sel.missingDate && '(' + sel.missingDate + ')'}</label>
            <input className={cls + ' w-full mt-2'} placeholder="מי אמור להעביר את החומר" value={sel.missingFromWho} onChange={(e) => updateSubject(sel.id, { missingFromWho: e.target.value })} />
            <textarea className={cls + ' w-full mt-2'} placeholder="הערות" value={sel.missingNotes} onChange={(e) => updateSubject(sel.id, { missingNotes: e.target.value })} />
          </Section>
          <Section title="פרקים ונושאים">
            {sel.chapters.length === 0 && <p className="text-sm text-slate-500">עוד לא הוגדרו פרקים. הוסיפי פרק ראשון לפי התוכנית של בית הספר.</p>}
            {sel.chapters.map((ch) => (
              <div key={ch.id} className="mb-3"><b>{ch.title}</b>
                <Progress value={ch.topics.length ? Math.round(ch.topics.filter((t) => ['הסתיים', 'שולטת בחומר', 'מוכן לבחינה'].includes(t.status)).length / ch.topics.length * 100) : 0} color={sel.color} />
                {ch.topics.map((tp) => (<div key={tp.id} className="flex items-center gap-2 py-1 text-sm"><span>{tp.title}</span>
                  <select className="border rounded-lg px-2 py-1 mr-auto" value={tp.status} onChange={(e) => updateTopicInSubject(sel.id, ch.id, tp.id, { status: e.target.value })}>{TOPIC_STATUSES.map((x) => <option key={x}>{x}</option>)}</select></div>))}
                <div className="flex gap-2 mt-1"><input className={cls + ' flex-1'} placeholder="נושא חדש" value={newTopic[ch.id] || ''} onChange={(e) => setNewTopic({ ...newTopic, [ch.id]: e.target.value })} />
                  <button className={btn} onClick={() => { addTopicToChapter(sel.id, ch.id, newTopic[ch.id] || ''); setNewTopic({ ...newTopic, [ch.id]: '' }); }}>הוסף</button></div>
              </div>))}
            <div className="flex gap-2"><input className={cls + ' flex-1'} placeholder="פרק חדש" value={newChapter} onChange={(e) => setNewChapter(e.target.value)} /><button className={btn} onClick={() => { addChapterToSubject(sel.id, newChapter); setNewChapter(''); }}>הוסף פרק</button></div>
          </Section>
          <button className={btn} onClick={() => { setTimerSubjectId(sel.id); setActiveTab('timer'); }}>ללמוד את הנושא הבא</button>
        </div>
      );
    },
    files: () => {
      const list = files.filter((f) => (fileSubjectFilter === 'all' || f.subjectId === fileSubjectFilter) && f.name.includes(fileSearch));
      return (
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-2xl p-3 text-sm">שימי לב: בגרסה הנוכחית הקובץ זמין לצפייה רק עד לרענון הדף. שמירה קבועה בענן דורשת חיבור ל-Supabase Storage.</div>
          <div className="flex gap-2 flex-wrap">
            <select className={cls} value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)}>{subjects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
            <button className={btn} onClick={() => fileInputRef.current && fileInputRef.current.click()}>העלאת קבצים למקצוע</button>
            <input className={cls} placeholder="חיפוש" value={fileSearch} onChange={(e) => setFileSearch(e.target.value)} />
            <select className={cls} value={fileSubjectFilter} onChange={(e) => setFileSubjectFilter(e.target.value)}><option value="all">כל המקצועות</option>{subjects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
          </div>
          <Section title="מאגר חומרי הלימוד">{list.length ? list.map((f) => { const live = Number(f.id.split('-')[1]) >= sessionStart.current; return (
            <div key={f.id} className="flex flex-wrap items-center gap-2 border-t py-2 first:border-0 text-sm"><b>{f.name}</b><span className="text-slate-500">{subj(f.subjectId).name} · {f.sizeKb} KB</span>
              <span className="mr-auto flex gap-1">{live ? <a className="px-2 py-1 rounded-lg bg-slate-100" href={f.dataUrl} target="_blank" rel="noreferrer" download={f.name}>צפייה / הורדה</a> : <span className="text-slate-400">לא זמין אחרי רענון</span>}
                <button className="px-2 py-1 rounded-lg bg-slate-100" onClick={() => { const n = window.prompt('שם חדש', f.name); if (n) setFiles((p) => p.map((x) => (x.id === f.id ? { ...x, name: n } : x))); }}>שנה שם</button>
                <button className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700" onClick={() => askConfirm('למחוק את הקובץ?') && setFiles((p) => p.filter((x) => x.id !== f.id))}>מחק</button></span></div>); }) : none}</Section>
        </div>
      );
    },
    ai: () => (
      <div className="space-y-3">
        <div className="flex gap-2 flex-wrap"><select className={cls} value={aiSubjectId} onChange={(e) => setAiSubjectId(e.target.value)}>{subjects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
          <select className={cls} value={aiMode} onChange={(e) => setAiMode(e.target.value)}>{['לימוד', 'שאלות', 'תרגול', 'בדיקה', 'סיכום', 'הכנה לבחינה', 'חזרה'].map((m) => <option key={m}>{m}</option>)}</select></div>
        <div className="space-y-2">{aiMessages.map((m, i) => <div key={i} className={'rounded-2xl p-3 whitespace-pre-wrap text-sm ' + (m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border')}>{m.text}</div>)}</div>
        <form onSubmit={handleSendAiMessage} className="flex gap-2"><input className={cls + ' flex-1'} placeholder="שאלי את המורה" value={aiInput} onChange={(e) => setAiInput(e.target.value)} /><button className={btn}>שלח</button></form>
      </div>
    ),
    practice: () => (
      <div className="space-y-3">
        <select className={cls} value={practiceSubjectFilter} onChange={(e) => { setPracticeSubjectFilter(e.target.value); setCurrentQuestionIdx(0); setSelectedAnswer(''); setSubmittedAnswerFeedback(null); }}><option value="all">כל המקצועות</option>{subjects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
        {curQ ? (
          <Section title={subj(curQ.subjectId).name + ' · ' + curQ.type}>
            <p className="text-xs text-amber-700 mb-2">שאלת דוגמה שנוצרה על ידי AI. אינה שאלה רשמית מבחינה קודמת.</p>
            <p className="font-medium mb-2">{curQ.question}</p>
            {curQ.options.map((o) => <button key={o} disabled={!!submittedAnswerFeedback} onClick={() => setSelectedAnswer(o)} className={'block w-full text-right rounded-xl border px-3 py-2 mb-2 ' + (selectedAnswer === o ? 'border-indigo-600 bg-indigo-50' : 'bg-white')}>{o}</button>)}
            {!submittedAnswerFeedback ? <button className={btn} onClick={submitAnswer}>בדיקה</button> : (
              <div className="space-y-2"><div className={'rounded-xl p-2 text-sm ' + (submittedAnswerFeedback.correct ? 'bg-emerald-50' : 'bg-rose-50')}>{submittedAnswerFeedback.correct ? 'נכון.' : 'לא נכון. התשובה: ' + curQ.correctAnswer}<br />{curQ.explanation}</div>
                <button className={btn} onClick={() => { setCurrentQuestionIdx((i) => i + 1); setSelectedAnswer(''); setSubmittedAnswerFeedback(null); }}>השאלה הבאה</button></div>)}
          </Section>) : <p className="text-sm text-slate-500">אין שאלות במקצוע הזה במאגר.</p>}
        <Section title="היסטוריה">
          <p className="text-sm">{practiceResults.length} תשובות · {practiceResults.length ? Math.round(practiceResults.filter((r) => r.correct).length / practiceResults.length * 100) : 0}% נכונות · {wrongQuestions.length} שאלות בחזרה</p>
        </Section>
      </div>
    ),
    timer: () => (
      <div className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          <select className={cls} value={timerSubjectId} onChange={(e) => setTimerSubjectId(e.target.value)}>{subjects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
          <input className={cls} placeholder="פרק" value={timerChapter} onChange={(e) => setTimerChapter(e.target.value)} />
          <input className={cls} placeholder="נושא" value={timerTopic} onChange={(e) => setTimerTopic(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">{[25, 45, 60, 90, 0].map((m) => <button key={m} onClick={() => { setTimerGoalMinutes(m); setPomodoroMode(false); }} className={'px-3 py-1.5 rounded-xl border ' + (!pomodoroMode && timerGoalMinutes === m ? 'bg-indigo-600 text-white' : 'bg-white')}>{m ? m + ' דק׳' : 'זמן חופשי'}</button>)}
          <button onClick={() => setPomodoroMode(!pomodoroMode)} className={'px-3 py-1.5 rounded-xl border ' + (pomodoroMode ? 'bg-indigo-600 text-white' : 'bg-white')}>פומודורו 25/5</button></div>
        <div className="text-center text-6xl font-bold tabular-nums py-6 bg-white rounded-2xl border" dir="ltr">{formatTimerClock(displayedTimerSeconds)}</div>
        {pomodoroMode && displayedTimerSeconds === 0 && <div className="bg-amber-50 rounded-xl p-2 text-sm">הסתיים הבלוק. {pomodoroBreak ? 'חזרה ללימוד.' : 'זמן להפסקה של 5 דקות.'} <button className="underline" onClick={() => { setPomodoroBreak(!pomodoroBreak); resetTimer(); }}>המשך לבלוק הבא</button></div>}
        <div className="flex gap-2 justify-center">{timerState.running ? <button className={btn} onClick={pauseTimer}>השהיה</button> : <button className={btn} onClick={startTimer}>{timerState.accumulatedMs ? 'המשך' : 'התחל'}</button>}
          <button className="px-4 py-2 rounded-xl bg-white border" onClick={endTimer} disabled={!elapsedMs}>סיום ושמירה</button>
          <button className="px-4 py-2 rounded-xl bg-white border" onClick={() => askConfirm('לאפס בלי לשמור?') && resetTimer()}>איפוס</button></div>
        <p className="text-xs text-center text-slate-500">הזמן מחושב לפי חותמות זמן ולכן נשמר גם אחרי רענון.</p>
        <Section title="היסטוריית סשנים">{sessions.length ? sessions.slice(0, 10).map((x) => <p key={x.id} className="text-sm py-1">{x.date} · {subj(x.subjectId).name} · {x.topic || 'ללא נושא'} · {x.durationMinutes} דק׳</p>) : none}</Section>
        {showPostSessionModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"><div className="bg-white rounded-2xl p-4 w-full max-w-md space-y-2">
            <h3 className="font-bold">סיכום הסשן · {completedSessionDurationMin} דק׳</h3>
            {[['whatLearned', 'מה למדתי?'], ['whatUnderstood', 'מה הבנתי?'], ['whatNotUnderstood', 'מה לא הבנתי?'], ['nextTask', 'מה המשימה הבאה?']].map(([k, l]) => <textarea key={k} className={cls + ' w-full'} placeholder={l} value={postSessionForm[k]} onChange={(e) => setPostSessionForm({ ...postSessionForm, [k]: e.target.value })} />)}
            <label className="flex gap-2 text-sm"><input type="checkbox" checked={postSessionForm.needsReview} onChange={(e) => setPostSessionForm({ ...postSessionForm, needsReview: e.target.checked })} /> צריך לחזור על הנושא</label>
            <button className={btn} onClick={saveSession}>שמירה</button></div></div>)}
      </div>
    ),
    summaries: () => (
      <div className="space-y-3">
        <Section title="סיכום חדש (נכתב ידנית)">
          <div className="space-y-2"><select className={cls} value={newSummary.subjectId} onChange={(e) => setNewSummary({ ...newSummary, subjectId: e.target.value })}>{subjects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
            <input className={cls + ' w-full'} placeholder="נושא" value={newSummary.topicTitle} onChange={(e) => setNewSummary({ ...newSummary, topicTitle: e.target.value })} />
            <textarea className={cls + ' w-full min-h-24'} placeholder="הסיכום" value={newSummary.content} onChange={(e) => setNewSummary({ ...newSummary, content: e.target.value })} />
            <button className={btn} onClick={() => { if (!newSummary.content.trim()) return; setSummaries((p) => [{ id: 'sum-' + Date.now(), ...newSummary, type: 'סיכום שלי', flashcards: [], createdAt: todayISO }, ...p]); setNewSummary({ ...newSummary, topicTitle: '', content: '' }); }}>שמירה</button></div>
        </Section>
        {summaries.map((x) => <Section key={x.id} title={subj(x.subjectId).name + ' · ' + x.topicTitle}><p className="text-sm whitespace-pre-wrap">{x.content}</p><button className="text-sm text-rose-700 mt-2" onClick={() => askConfirm('למחוק את הסיכום?') && setSummaries((p) => p.filter((y) => y.id !== x.id))}>מחק</button></Section>)}
      </div>
    ),
    stats: () => (
      <div className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[['דקות היום', todayMinutes], ['שעות 7 ימים', (weekMinutes / 60).toFixed(1)], ['שעות החודש', (monthMinutes / 60).toFixed(1)], ['ימי לימוד', new Set(sessions.map((x) => x.date)).size]].map(([k, v]) => <div key={k} className="bg-white rounded-2xl border p-3"><div className="text-xs text-slate-500">{k}</div><div className="font-bold text-lg">{v}</div></div>)}</div>
        <Section title="דקות לימוד ב-7 הימים האחרונים"><div style={{ height: 220 }} dir="ltr"><ResponsiveContainer width="100%" height="100%"><BarChart data={last7}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="דקות" fill="#4f46e5" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></Section>
        <Section title="שעות לפי מקצוע">{subjects.map((x) => <div key={x.id} className="mb-2"><div className="flex justify-between text-sm"><span>{x.name}</span><span>{(x.totalMinutes / 60).toFixed(1)} ש׳</span></div><Progress value={Math.min(100, x.totalMinutes / 6)} color={x.color} /></div>)}</Section>
      </div>
    ),
    weekly: () => (
      <div className="space-y-3">
        <Section title="השבוע"><p>למדת {(weekMinutes / 60).toFixed(1)} שעות מתוך יעד של {weeklyTargetHours}. {weekMinutes >= weeklyTargetHours * 60 ? 'היעד הושג.' : 'היעד עדיין לא הושג.'}</p><p className="text-sm text-slate-500">משימות שלא הושלמו: {openTasks.length}</p></Section>
        <Section title="אזור אישי">{[['feeling', 'איך הרגשתי השבוע?'], ['hardest', 'מה היה לי קשה?'], ['succeeded', 'במה הצלחתי?'], ['improve', 'מה אני רוצה לשפר?']].map(([k, l]) => <textarea key={k} className={cls + ' w-full mb-2'} placeholder={l} value={weeklyReflection[k]} onChange={(e) => setWeeklyReflection({ ...weeklyReflection, [k]: e.target.value })} />)}
          <div className="flex gap-2"><button className={btn} onClick={() => { setWeeklyReports((p) => [{ id: 'wr-' + Date.now(), weekStart, minutes: weekMinutes, target: weeklyTargetHours * 60, reflection: weeklyReflection }, ...p]); setWeeklyReflection({ feeling: '', hardest: '', succeeded: '', improve: '' }); showNotice('הדוח נשמר.'); }}>שמירת דוח שבועי</button><button className="px-4 py-2 rounded-xl bg-white border" onClick={handleReevaluateWeeklyPlan}>תוכנית חדשה לשבוע</button></div></Section>
        <Section title="דוחות שמורים">{weeklyReports.length ? weeklyReports.map((r) => <p key={r.id} className="text-sm py-1">שבוע מ-{r.weekStart}: {(r.minutes / 60).toFixed(1)} מתוך {(r.target / 60).toFixed(1)} שעות</p>) : none}</Section>
      </div>
    ),
    settings: () => (
      <div className="space-y-3">
        <Section title="פרופיל ויעד"><div className="flex gap-2 flex-wrap"><input className={cls} value={userProfile.name} onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })} />
          <label className="text-sm">יעד שבועי (שעות) <input type="number" min="1" className={cls + ' w-20 mr-1'} value={weeklyTargetHours} onChange={(e) => setWeeklyTargetHours(Number(e.target.value) || 1)} /></label></div></Section>
        <Section title="תזכורות">{reminders.map((r) => <div key={r.id} className="flex items-center gap-2 py-1 text-sm"><input type="checkbox" checked={r.enabled} onChange={(e) => setReminders((p) => p.map((x) => (x.id === r.id ? { ...x, enabled: e.target.checked } : x)))} /><span>{r.type}</span><input type="time" className="border rounded-lg px-2 mr-auto" value={r.time} onChange={(e) => setReminders((p) => p.map((x) => (x.id === r.id ? { ...x, time: e.target.value } : x)))} /></div>)}
          <button className="px-3 py-1.5 rounded-xl bg-white border mt-2" onClick={() => ('Notification' in window ? Notification.requestPermission().then((r) => showNotice('הרשאת התראות: ' + r)) : showNotice('הדפדפן לא תומך בהתראות.'))}>אישור התראות בדפדפן</button>
          <p className="text-xs text-slate-500 mt-1">התזכורות נשמרות כהגדרות. שליחה בפועל כשהאפליקציה סגורה דורשת שירות Push בשרת.</p></Section>
        <Section title="חיבורים"><p className="text-sm text-slate-500 mb-2">ענן (Supabase): לא מחובר. הנתונים נשמרים בדפדפן הזה בלבד.</p>
          <input className={cls + ' w-full'} placeholder="כתובת שרת מאובטח למורה ה-AI (Netlify Function)" value={userProfile.aiEndpoint} onChange={(e) => setUserProfile({ ...userProfile, aiEndpoint: e.target.value })} /></Section>
      </div>
    )
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <header className="sticky top-0 z-40 bg-white border-b" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-5xl mx-auto px-3 py-2 font-bold">מערכת לימודים חכמה · בגרויות 2027</div>
        <nav className="max-w-5xl mx-auto flex gap-1 overflow-x-auto px-2 pb-2">
          {NAV.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setActiveTab(id)} className={'flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-xl text-sm ' + (activeTab === id ? 'bg-indigo-600 text-white' : 'bg-slate-100')}><Icon size={16} />{label}</button>
          ))}
        </nav>
      </header>
      {statusBanner && <div className="max-w-5xl mx-auto mt-2 mx-3 bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-sm">{statusBanner}</div>}
      <main className="max-w-5xl mx-auto p-3 pb-24">{views[activeTab]()}</main>
    </div>
  );
}
