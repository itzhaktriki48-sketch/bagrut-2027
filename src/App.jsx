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

const STORAGE_KEY = 'bagrut_2027_master_state_v1';

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
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
  return d.toISOString().slice(0, 10);
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
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
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
  const [summaries, setSummaries] = useState([
    {
      id: 'sum-1',
      subjectId: 'bible',
      topicTitle: 'אמצעים אמנותיים ומוטיבים מנחים',
      type: 'סיכום קצר',
      content: 'מילה מנחה חוזרת ומאירה נקודת מפנה או רעיון מרכזי בטקסט המקראי. יש לבסס כל טענה בציטוט והסבר.',
      flashcards: [{ q: 'מהי מילה מנחה?', a: 'מילה או שורש החוזרים בסיפור כדי להדגיש רעיון או התפתחות.' }],
      createdAt: getTodayISO()
    }
  ]);

  const [reviewQueue, setReviewQueue] = useState([
    {
      id: 'rev-1',
      subjectId: 'hebrew',
      topicTitle: 'משפט פשוט, מורכב ומאוחה',
      dueDate: getTodayISO(),
      intervalLabel: 'יום אחרי הלמידה',
      reason: 'חיזוק הבסיס התחבירי',
      completed: false
    }
  ]);

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

  const fileInputRef = useRef(null);

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
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`; } return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`; };  const handleStartTimer = () => { setNowTick(Date.now()); setTimerState((prev) => ({ running: true, startedAtMs: Date.now(), accumulatedMs: prev.accumulatedMs })); };  const handlePauseTimer = () => { const now = Date.now(); const delta = timerState.startedAtMs ? Math.max(0, now - timerState.startedAtMs) : 0; setTimerState({ running: false, startedAtMs: null, accumulatedMs: timerState.accumulatedMs + delta }); };  const handleResetTimer = () => { setTimerState({ running: false, startedAtMs: null, accumulatedMs: 0 }); setPomodoroBreak(false); };  const handleFinishTimer = () => { const now = Date.now(); const totalMs = timerState.accumulatedMs + (timerState.running && timerState.startedAtMs ? Math.max(0, now - timerState.startedAtMs) : 0); const minutesRecorded = Math.max(1, Math.round(totalMs / 60000)); setTimerState({ running: false, startedAtMs: null, accumulatedMs: 0 }); setCompletedSessionDurationMin(minutesRecorded); setPostSessionForm({ whatLearned: '', whatUnderstood: '', whatNotUnderstood: '', needsReview: false, nextTask: '' }); setShowPostSessionModal(true); };  const handleSavePostSession = (e) => { e.preventDefault(); const today = getTodayISO(); const subj = subjects.find((s) => s.id === timerSubjectId); const topicLabel = timerTopic.trim() \vert{}\vert{} subj?.nextTask \vert{}\vert{} 'למידה כללית';  const newSession = { id: 'sess-' + Date.now(), date: today, subjectId: timerSubjectId, chapter: timerChapter \vert{}\vert{} 'כללי', topic: topicLabel, durationMinutes: completedSessionDurationMin, whatLearned: postSessionForm.whatLearned \vert{}\vert{} 'לא צוין', whatUnderstood: postSessionForm.whatUnderstood \vert{}\vert{} 'לא צוין', whatNotUnderstood: postSessionForm.whatNotUnderstood \vert{}\vert{} 'לא צוין', needsReview: postSessionForm.needsReview, nextTask: postSessionForm.nextTask \vert{}\vert{} 'המשך לפי התוכנית הגמישה' };  setSessions((prev) => [newSession, ...prev]);  setSubjects((prev) => prev.map((s) => { if (s.id !== timerSubjectId) return s; const addedLearned = Math.min(100 - s.learnedMaterialPct, Math.max(1, Math.round(completedSessionDurationMin / 15))); const addedReadiness = Math.min(100 - s.readinessPct, Math.max(1, Math.round(completedSessionDurationMin / 20))); return { ...s, totalMinutes: s.totalMinutes + completedSessionDurationMin, learnedMaterialPct: Math.min(100, s.learnedMaterialPct + addedLearned), readinessPct: Math.min(100, s.readinessPct + addedReadiness), nextTask: postSessionForm.nextTask.trim() \vert{}\vert{} s.nextTask }; }) );  if (postSessionForm.needsReview) { setReviewQueue((prev) => [ { id: 'rev-' + Date.now(), subjectId: timerSubjectId, topicTitle: topicLabel, dueDate: addDaysISO(today, 1), intervalLabel: 'יום אחרי הלמידה', reason: postSessionForm.whatNotUnderstood \vert{}\vert{} 'סומן לחזרה בסיום סשן', completed: false }, { id: 'rev-' + (Date.now() + 1), subjectId: timerSubjectId, topicTitle: topicLabel, dueDate: addDaysISO(today, 3), intervalLabel: 'לאחר שלושה ימים', reason: 'חזרה מרווחת', completed: false }, { id: 'rev-' + (Date.now() + 2), subjectId: timerSubjectId, topicTitle: topicLabel, dueDate: addDaysISO(today, 7), intervalLabel: 'לאחר שבוע', reason: 'חיזוק זיכרון לטווח ארוך', completed: false }, ...prev ]); }  setShowPostSessionModal(false); setFocusMode(false); showNotice(`נשמר סשן של ${completedSessionDurationMin} דקות ביומן הלמידה ובתור החזרות.`);
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
  const handleSendAiMessage = (e) => {
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
      : `טרם הועלו קבצים ייעודיים עבור ${subj.name} למאגר — ניתן להעלות סיכום או דף עבודה בלשונית "חומרי לימוד" כדי שאתעדף אותו.`;  const assistantReply = { role: 'assistant', text: `[מצב: ${aiMode} | מקצוע: ${subj.name}]\n${sourceNote}\n\nלגבי שאלתך ("${questionText}"):\n1. נתחיל בהגדרה ברורה ונקודתית של המושג.\n2. נפרק את הנושא לצעד ראשון שמתאים לרמת הידע הנוכחית שלך (${subj.knowledgeLevel}).\n3. נבדוק יחד דוגמה ק
