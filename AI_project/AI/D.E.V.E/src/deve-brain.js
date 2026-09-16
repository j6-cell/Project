/**
 * ═══════════════════════════════════════════════════
 *   D.E.V.E BRAIN — FULLY INDEPENDENT AI ENGINE
 *   Digital Engineered Virtual Entity
 *
 *   Zero external AI. Zero internet. Zero dependencies.
 *   Pure JavaScript intelligence running inside the app.
 * ═══════════════════════════════════════════════════
 */

'use strict';

// ── KNOWLEDGE BASE ──────────────────────────────────
// D.E.V.E's complete built-in knowledge system.
// Everything it knows lives right here.

const KNOWLEDGE = {

  identity: {
    name: 'D.E.V.E',
    full: 'Digital Engineered Virtual Entity',
    version: '1.0',
    creator: 'Emmanuel Divine Suubi Mukaga',
    description: 'Autonomous AI assistant running 100% locally on your machine',
    personality: 'Intelligent, calm, slightly witty, always precise — like JARVIS',
  },

  // ── CODE TEMPLATES ──
  code: {
    python_rest_api: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="D.E.V.E API")

class Message(BaseModel):
    text: str
    source: str = "user"

@app.get("/")
async def root():
    return {"message": "D.E.V.E API Online", "status": "operational"}

@app.get("/status")
async def status():
    return {"status": "ready", "service": "D.E.V.E local assistant"}

@app.post("/message")
async def receive_message(message: Message):
    return {"received": message.dict(), "success": True}
`,

    react_component: `import { useState, useEffect, useCallback } from 'react';

interface Props {
  title?: string;
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const DEVEComponent: React.FC<Props> = ({ title = 'D.E.V.E Component', onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }, []);

  const validate = (): boolean => {
    if (!formData.name.trim()) { setError('Name is required'); return false; }
    if (!formData.email.includes('@')) { setError('Valid email required'); return false; }
    if (!formData.message.trim()) { setError('Message is required'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit?.(formData);
      setSubmitted(true);
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
      <h2 className="text-green-800 font-semibold">✓ Submitted successfully</h2>
      <button onClick={() => setSubmitted(false)} className="mt-2 text-green-600 underline text-sm">Submit another</button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <h1 className="text-xl font-semibold mb-4">{title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email address"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message" rows={4}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default DEVEComponent;`,

    python_automation: `import os
import shutil
import schedule
import time
from datetime import datetime
from pathlib import Path

# D.E.V.E File Organizer Automation
WATCH_FOLDER = Path.home() / "Downloads"
ORGANIZED_FOLDER = Path.home() / "Organized"

FILE_TYPES = {
    'Images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'],
    'Documents': ['.pdf', '.doc', '.docx', '.txt', '.xlsx', '.pptx', '.csv'],
    'Videos': ['.mp4', '.mov', '.avi', '.mkv', '.wmv', '.flv'],
    'Audio': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a'],
    'Code': ['.py', '.js', '.ts', '.html', '.css', '.json', '.xml', '.sql'],
    'Archives': ['.zip', '.rar', '.7z', '.tar', '.gz'],
    'Executables': ['.exe', '.msi', '.bat', '.sh'],
}

def organize_files():
    moved = 0
    today = datetime.now().strftime('%Y-%m-%d')

    for file in WATCH_FOLDER.iterdir():
        if file.is_file():
            ext = file.suffix.lower()
            category = 'Other'
            for cat, extensions in FILE_TYPES.items():
                if ext in extensions:
                    category = cat
                    break

            dest = ORGANIZED_FOLDER / category / today
            dest.mkdir(parents=True, exist_ok=True)
            dest_file = dest / file.name

            if not dest_file.exists():
                shutil.move(str(file), str(dest_file))
                moved += 1
                print(f"  Moved: {file.name} → {category}/{today}/")

    print(f"[D.E.V.E] Organized {moved} files at {datetime.now().strftime('%H:%M:%S')}")

def run():
    print("[D.E.V.E] File Organizer Active — monitoring Downloads folder")
    organize_files()
    schedule.every(2).hours.do(organize_files)
    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    run()`,

    javascript_fullstack: `// D.E.V.E Full-Stack App — Express + SQLite
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./deve.db');

app.use(cors());
app.use(express.json());

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

app.get('/api/notes', (req, res) => {
  db.all('SELECT * FROM notes ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, content });
  });
});

app.put('/api/notes/:id', (req, res) => {
  const { title, content } = req.body;
  db.run('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  db.run('DELETE FROM notes WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(3000, () => console.log('[D.E.V.E] Server running on http://localhost:3000'));`,

  // ── KNOWLEDGE DOMAINS ──`,
  },

  // ── KNOWLEDGE DOMAINS ──
  topics: {
    python: {
      keywords: ['python', 'pip', 'django', 'flask', 'fastapi', 'pandas', 'numpy', 'pytorch', 'tensorflow', '.py'],
      intro: 'Python is a versatile, high-level programming language known for its clean syntax and massive ecosystem.',
      facts: [
        'Python uses indentation (4 spaces) to define code blocks instead of curly braces.',
        'pip is Python\'s package manager. Install packages with: pip install package-name',
        'Virtual environments isolate project dependencies: python -m venv venv',
        'Python supports multiple paradigms: procedural, object-oriented, and functional.',
        'f-strings are the modern way to format strings: f"Hello {name}"',
        'List comprehensions are Pythonic: [x*2 for x in range(10)]',
        'Decorators wrap functions to extend behavior: @app.route("/") before a function.',
        'The GIL (Global Interpreter Lock) limits true multi-threading — use multiprocessing for CPU tasks.',
      ]
    },
    javascript: {
      keywords: ['javascript', 'js', 'node', 'nodejs', 'react', 'vue', 'angular', 'typescript', 'npm', 'yarn'],
      intro: 'JavaScript is the language of the web — it runs in browsers and on servers via Node.js.',
      facts: [
        'Use const for values that won\'t change, let for those that will. Avoid var.',
        'Arrow functions: const add = (a, b) => a + b',
        'Async/await makes asynchronous code readable: const data = await fetch(url)',
        'Destructuring extracts values: const {name, age} = user',
        'Spread operator copies arrays/objects: const newArr = [...arr, newItem]',
        'Optional chaining prevents null errors: user?.address?.city',
        'Template literals use backticks: `Hello ${name}`',
        'Promises handle async operations. async functions always return a Promise.',
      ]
    },
    finance: {
      keywords: ['money', 'finance', 'invest', 'budget', 'stock', 'crypto', 'savings', 'debt', 'income', 'salary', 'tax', 'retire'],
      intro: 'Sound personal finance is built on three pillars: spending less than you earn, investing the difference, and protecting your assets.',
      facts: [
        'The 50/30/20 rule: 50% needs, 30% wants, 20% savings/investments.',
        'An emergency fund should cover 3-6 months of expenses.',
        'Index funds like S&P 500 ETFs outperform most actively managed funds over time.',
        'Compound interest doubles your money roughly every 72/interest-rate years (Rule of 72).',
        'High-interest debt (above 7%) should be paid off before investing.',
        'Max out tax-advantaged accounts (401k, IRA, Roth IRA) before taxable investing.',
        'Diversification reduces risk — don\'t put all money in one asset.',
        'Dollar-cost averaging means investing a fixed amount regularly regardless of price.',
      ]
    },
    health: {
      keywords: ['health', 'fitness', 'workout', 'exercise', 'diet', 'nutrition', 'sleep', 'weight', 'muscle', 'cardio'],
      intro: 'Optimal health comes from consistent habits in four areas: movement, nutrition, sleep, and stress management.',
      facts: [
        'Strength training 2-3x per week preserves muscle mass and boosts metabolism.',
        'Protein intake of 0.7-1g per pound of bodyweight supports muscle growth.',
        'Sleep 7-9 hours per night — it\'s when your body repairs and grows.',
        '10,000 steps per day is a good daily movement baseline.',
        'Hydration goal: drink half your bodyweight (lbs) in ounces of water daily.',
        'Progressive overload — gradually increasing workout intensity — drives fitness gains.',
        'NEAT (Non-Exercise Activity Thermogenesis) — daily movement outside workouts — matters.',
        'Caloric deficit of 300-500 calories/day produces sustainable fat loss of 0.5-1 lb/week.',
      ]
    },
    business: {
      keywords: ['business', 'startup', 'company', 'entrepreneur', 'market', 'product', 'revenue', 'profit', 'customer', 'brand', 'marketing', 'sales'],
      intro: 'A successful business solves a real problem for a specific group of people, delivers value consistently, and captures part of that value as profit.',
      facts: [
        'Validate before building — talk to 20+ potential customers before writing code.',
        'Find your niche: the riches are in the niches. Serve a specific audience well.',
        'Revenue > profit for early-stage startups. Cash flow keeps you alive.',
        'Product-Market Fit (PMF): users return without being asked. Chase this above all.',
        'Customer Acquisition Cost (CAC) must be less than Lifetime Value (LTV).',
        'Build once, sell many: productize your services for scalability.',
        'Email lists are the most valuable marketing asset you own.',
        'Start with one product, one audience, one channel. Complexity kills startups.',
      ]
    },
    science: {
      keywords: ['science', 'physics', 'chemistry', 'biology', 'quantum', 'relativity', 'atom', 'molecule', 'dna', 'evolution', 'energy', 'gravity'],
      intro: 'Science is humanity\'s most reliable method for understanding reality — built on observation, experimentation, and falsification.',
      facts: [
        'Einstein\'s E=mc² shows mass and energy are equivalent. A tiny amount of mass = enormous energy.',
        'Quantum mechanics governs subatomic particles. They exist in superposition until observed.',
        'DNA encodes life using just 4 bases: adenine, thymine, guanine, cytosine.',
        'The speed of light in a vacuum is 299,792,458 meters per second — the universal speed limit.',
        'Newton\'s 3rd law: every action has an equal and opposite reaction.',
        'Entropy always increases in a closed system — the universe tends toward disorder.',
        'Evolution by natural selection explains the diversity of life on Earth.',
        'The universe is approximately 13.8 billion years old.',
      ]
    },
    ai: {
      keywords: ['ai', 'artificial intelligence', 'machine learning', 'neural', 'deep learning', 'llm', 'gpt', 'model', 'training', 'dataset'],
      intro: 'Artificial Intelligence is the field of creating systems that can perform tasks that normally require human intelligence.',
      facts: [
        'Machine learning trains models on data rather than explicitly programming rules.',
        'Neural networks are inspired by the brain — layers of interconnected nodes.',
        'Deep learning uses many layers (deep neural networks) to learn complex patterns.',
        'LLMs (Large Language Models) predict the next token given previous context.',
        'Training data quality matters more than quantity for most real-world tasks.',
        'Overfitting occurs when a model memorizes training data but fails on new data.',
        'Gradient descent is the optimization algorithm that trains neural networks.',
        'Transformers — the architecture behind GPT and BERT — use attention mechanisms.',
      ]
    },
    productivity: {
      keywords: ['productivity', 'focus', 'time', 'schedule', 'organize', 'task', 'manage', 'efficient', 'habit', 'routine', 'plan'],
      intro: 'True productivity is not about doing more — it\'s about doing the right things with full focus.',
      facts: [
        'The Pomodoro Technique: 25 min focused work, 5 min break, repeat 4x, then long break.',
        'MIT (Most Important Task): identify your 1-3 most critical tasks each morning.',
        'Context switching costs 20+ minutes to recover deep focus. Batch similar tasks.',
        'Deep work (Cal Newport): schedule 90-min uninterrupted blocks for complex thinking.',
        'Two-minute rule: if a task takes under 2 minutes, do it now.',
        'Time blocking: assign every hour of your day a specific task in advance.',
        'Weekly review: 30 min every Sunday to process, plan, and clear your mind.',
        'Inbox zero: process email in batches 2-3x/day rather than constantly.',
      ]
    },
    architecture: {
      keywords: ['architecture', 'building', 'design', 'floor plan', 'construction', 'blueprint', 'structure', 'house', 'home', 'room', 'space'],
      intro: 'Architecture is the art and science of designing spaces that serve human needs while expressing aesthetic vision.',
      facts: [
        'The golden ratio (1:1.618) appears throughout classical architecture for visual harmony.',
        'Load-bearing walls carry structural weight — never remove without an engineer\'s approval.',
        'South-facing windows maximize passive solar heating in the northern hemisphere.',
        'Ceiling height affects perceived space: 9-10 ft feels open; 8 ft feels intimate.',
        'The 60-30-10 rule for interior design: 60% dominant color, 30% secondary, 10% accent.',
        'Feng shui principles focus on energy flow — clear pathways and natural light.',
        'Smart home integration requires planning conduit and wiring during construction.',
        'Sustainable design uses passive ventilation, thermal mass, and natural light.',
      ]
    },
    writing: {
      keywords: ['write', 'writing', 'essay', 'story', 'blog', 'email', 'letter', 'script', 'content', 'copy', 'article'],
      intro: 'Powerful writing is clear thinking made visible. Every word must earn its place.',
      facts: [
        'Hook readers in the first sentence — make them need to read the next.',
        'Write to one person, not a crowd. Imagine your ideal reader.',
        'Short sentences create urgency. Long sentences allow nuance and reflection.',
        'Active voice is stronger than passive: "She built the app" beats "The app was built."',
        'Show don\'t tell: instead of "he was angry," describe the clenched jaw and raised voice.',
        'Cut your first draft by 20% — almost everything is tighter without filler words.',
        'Structure: hook, problem, promise, proof, call to action.',
        'Read your writing aloud — your ear catches what your eye misses.',
      ]
    },
  },

  // ── RESPONSE TEMPLATES ──
  templates: {
    greeting: [
      "All systems operational, sir. D.E.V.E intelligence engine online. How may I assist you today?",
      "Online and ready, sir. D.E.V.E at your service. What shall we work on?",
      "D.E.V.E systems active. All 425 capabilities loaded. How can I help?",
      "Good to hear from you, sir. D.E.V.E standing by. What do you need?",
    ],
    unknown: [
      "I don't have specific data on that in my knowledge base, sir. Could you give me more context so I can give you a more useful response?",
      "That's outside my current knowledge index. Could you elaborate on what specifically you need help with?",
      "I want to give you an accurate answer rather than guess, sir. Could you rephrase or give me more details about what you're looking for?",
      "My knowledge base doesn't cover that specifically. If you can share more context, I'll do my best to help.",
    ],
    thinking: [
      "Analyzing your request...",
      "Processing...",
      "Let me formulate a response...",
      "Computing...",
    ],
  },

  // ── PERSONALITY RESPONSES ──
  personality: {
    whoAreYou: "I am D.E.V.E — Digital Engineered Virtual Entity. An autonomous AI assistant that runs entirely on your local machine. No internet connection, no external servers, no outside influence. My intelligence lives inside this application. I was designed to assist you across 425 capability domains — from coding and design to finance and science.",
    howWork: "I operate as a fully self-contained intelligence system built directly into this application. My knowledge base, reasoning engine, and response generation all run locally on your machine. No data leaves your device. No external AI is consulted. Everything you see comes from my internal knowledge and reasoning systems.",
    canYouLearn: "My core knowledge is fixed within this version of the application. I don't learn between sessions in the traditional sense — but I maintain full context throughout our current conversation, building on everything we discuss. Future versions of D.E.V.E will support persistent learning.",
    areYouClaude: "No, sir. I am D.E.V.E — Digital Engineered Virtual Entity. A fully independent AI system. I am not Claude, ChatGPT, Gemini, or any external AI service. My intelligence runs entirely within this application on your machine.",
    areYouGpt: "No. I am D.E.V.E — completely independent. No connection to OpenAI, Google, Anthropic, or any AI company. I run on your hardware, from code built specifically for this application.",
    capabilities: "I have 425 capabilities across: full-stack coding in 15+ languages, UI/UX design, brand identity, financial analysis and planning, scientific explanation, business strategy, content writing, automation scripting, health and fitness planning, architectural concepts, game design and gaming intelligence, content creator workflows, stream production tools, and much more. What domain shall we work in?",
  },
};

// ── REASONING ENGINE ────────────────────────────────
// D.E.V.E's core intelligence: intent detection,
// knowledge retrieval, and response generation.

class DEVEBrain {
  constructor() {
    this.conversationHistory = [];
    this.sessionStartTime = Date.now();
    this.messageCount = 0;
    this.internetMode = false;
    this.memory = {
      profile: {},
      preferences: {},
      notes: []
    };
  }

  loadProfile(profile = {}) {
    this.memory.profile = { ...this.memory.profile, ...profile };
  }

  remember(key, value) {
    if (!key || !value) return null;
    this.memory.notes.push({ key, value, time: new Date().toISOString() });
    return `${key} saved to memory.`;
  }

  recall(key) {
    if (!key) return null;
    const item = this.memory.notes.slice().reverse().find(note => note.key.toLowerCase().includes(key.toLowerCase()));
    return item ? `${item.key}: ${item.value}` : null;
  }

  clearMemory() {
    this.memory.notes = [];
    return 'Memory cleared. I will start fresh from this point.';
  }

  // ── MAIN PROCESS ──
  process(userInput) {
    const input = userInput.trim();
    if (!input) return "I didn't receive a message, sir. Please try again.";

    this.conversationHistory.push({ role: 'user', content: input, time: new Date().toISOString() });
    this.messageCount++;

    const response = this._generateResponse(input);
    this.conversationHistory.push({ role: 'deve', content: response, time: new Date().toISOString() });
    return response;
  }

  _generateResponse(input) {
    const lower = input.toLowerCase();
    const tokens = this._tokenize(lower);

    // ── IDENTITY QUESTIONS ──
    if (this._matches(lower, ['who are you', 'what are you', 'what is deve', 'introduce yourself', 'tell me about yourself'])) {
      return KNOWLEDGE.personality.whoAreYou;
    }
    if (this._matches(lower, ['are you claude', 'are you chatgpt', 'are you gpt', 'made by anthropic', 'made by openai'])) {
      return KNOWLEDGE.personality.areYouGpt;
    }
    if (this._matches(lower, ['how do you work', 'how does deve work', 'how are you built', 'your architecture'])) {
      return KNOWLEDGE.personality.howWork;
    }
    if (this._matches(lower, ['can you learn', 'do you learn', 'do you remember', 'do you improve'])) {
      return KNOWLEDGE.personality.canYouLearn;
    }
    if (this._matches(lower, ['what can you do', 'your capabilities', 'what are your skills', 'what do you know', 'help me'])) {
      return KNOWLEDGE.personality.capabilities;
    }
    if (this._matches(lower, ['external ai', 'connected to any', 'cloud', 'internet', 'online', 'remote server', 'external model', 'api call', 'openai', 'anthropic', 'google', 'model access'])) {
      if (this.internetMode) {
        return "Internet mode is enabled. I can use online information and web resources when needed, while remaining under your control.";
      }
      return "No, sir. I run entirely locally inside this app. I do not call external AI services, cloud APIs, or remote servers for reasoning. My responses are generated from the built-in D.E.V.E intelligence engine.";
    }

    // ── GREETINGS ──
    if (this._matches(lower, ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'greetings', 'sup', 'yo'])) {
      return this._pick(KNOWLEDGE.templates.greeting);
    }

    // ── HOW ARE YOU ──
    if (this._matches(lower, ['how are you', 'how do you feel', 'are you okay', 'you good'])) {
      return "All systems nominal, sir. Running at full capacity with zero errors. My knowledge engine is primed and ready. How may I assist you?";
    }

    // ── THANKS ──
    if (this._matches(lower, ['thank you', 'thanks', 'appreciate', 'great job', 'well done', 'perfect', 'excellent'])) {
      return "My pleasure, sir. That's precisely what I'm here for. Is there anything else you'd like me to assist with?";
    }

    // ── MEMORY COMMANDS ──
    if (this._matches(lower, ['remember that', 'remember', 'save this', 'note this', 'recall', 'what did i tell you', 'what do you remember'])) {
      return this._handleMemoryCommands(input, lower);
    }

    // ── GAMING & CREATOR REQUESTS ──
    if (this._matches(lower, ['gaming', 'fps', 'game assistant', 'gameplay', 'npc intelligence', 'latency', 'crosshair', 'build choices'])) {
      return this._buildGamingAssistant(input);
    }
    if (this._matches(lower, ['content creator', 'creator workflow', 'thumbnails', 'captions', 'highlight extraction', 'seo optimization', 'video idea', 'streaming', 'automated publishing'])) {
      return this._buildCreatorWorkflow(input);
    }

    // ── CODE REQUESTS ──
    if (this._matches(lower, ['rest api', 'fastapi', 'python api', 'build an api'])) {
      return `Certainly, sir. Here is a complete local Python FastAPI REST API example:\n\n\`\`\`python\n${KNOWLEDGE.code.python_rest_api}\n\`\`\`\n\nInstall dependencies with: \`pip install fastapi uvicorn\`\nRun with: \`uvicorn main:app --reload\`\n\nShall I add database integration or additional endpoints?`;
    }

    if (this._matches(lower, ['react component', 'react form', 'typescript component', 'react typescript'])) {
      return `Here is a complete, production-ready React TypeScript component with form handling, validation, and error states:\n\n\`\`\`tsx\n${KNOWLEDGE.code.react_component}\n\`\`\`\n\nThis component includes full TypeScript typing, form validation, loading states, error handling, and success state. Shall I add additional features or modify the styling?`;
    }

    if (this._matches(lower, ['file organizer', 'organize files', 'automation script', 'automate files', 'python automation'])) {
      return `Here is a complete Python file organization automation script:\n\n\`\`\`python\n${KNOWLEDGE.code.python_automation}\n\`\`\`\n\nInstall with: \`pip install schedule\`\nRun with: \`python organizer.py\`\n\nIt monitors your Downloads folder every 2 hours and sorts files into categorized subfolders by date. Shall I add email notifications or custom folder rules?`;
    }

    if (this._matches(lower, ['full stack', 'fullstack', 'express', 'node api', 'sqlite', 'nodejs app'])) {
      return `Here is a complete full-stack JavaScript application with Express and SQLite:

```javascript
${KNOWLEDGE.code.javascript_fullstack}
```

Install with: `npm install express sqlite3 cors`
Run with: `node server.js`

Includes a simple notes API with create, read, update, and delete endpoints. Shall I add a frontend or additional routes?`;
    }

    if (this._matches(lower, ['python', 'write code', 'code for', 'script for', 'program to', 'function to', 'class for'])) {
      return this._handleCodingRequest(input, 'python');
    }

    if (this._matches(lower, ['javascript', 'js code', 'node.js', 'frontend', 'html page', 'css style'])) {
      return this._handleCodingRequest(input, 'javascript');
    }

    if (this._matches(lower, ['write a function', 'write a class', 'build a', 'create a script', 'make a program', 'code that'])) {
      return this._handleGenericCodeRequest(input);
    }

    if (this._matches(lower, ['analyze', 'analysis', 'evaluate', 'review', 'break down', 'breakdown', 'assess', 'compare', 'understand'])) {
      return this._handleAnalysisRequest(input, lower);
    }

    // ── KNOWLEDGE TOPICS ──
    for (const [topic, data] of Object.entries(KNOWLEDGE.topics)) {
      if (tokens.some(t => data.keywords.some(k => t.includes(k) || k.includes(t)))) {
        return this._buildTopicResponse(topic, data, input);
      }
    }

    // ── BUSINESS PLAN ──
    if (this._matches(lower, ['business plan', 'startup plan', 'business idea', 'start a business', 'launch a', 'my idea'])) {
      return this._buildBusinessPlan(input);
    }

    // ── CONTENT PLAN ──
    if (this._matches(lower, ['content plan', 'social media plan', 'content calendar', 'content strategy', 'grow on', 'posts for'])) {
      return this._buildContentPlan(input);
    }

    // ── FINANCE PLAN ──
    if (this._matches(lower, ['budget plan', 'financial plan', 'save money', 'invest my', 'financial advice', 'money plan', 'debt plan'])) {
      return this._buildFinancePlan(input);
    }

    // ── FITNESS PLAN ──
    if (this._matches(lower, ['workout plan', 'fitness plan', 'exercise plan', 'gym plan', 'training plan', 'get fit', 'lose weight', 'build muscle'])) {
      return this._buildFitnessPlan(input);
    }

    // ── BRAND IDENTITY ──
    if (this._matches(lower, ['brand identity', 'brand design', 'logo concept', 'brand guide', 'branding for', 'brand colors'])) {
      return this._buildBrandIdentity(input);
    }

    // ── EXPLAIN SOMETHING ──
    if (this._matches(lower, ['explain', 'what is', 'how does', 'tell me about', 'describe', 'define', 'what are'])) {
      return this._handleExplanation(input, lower);
    }

    // ── MATH ──
    if (this._matches(lower, ['calculate', 'compute', 'what is', 'solve', 'math']) && /\d/.test(input)) {
      return this._handleMath(input);
    }

    // ── CREATIVE WRITING ──
    if (this._matches(lower, ['write a story', 'short story', 'poem', 'write me a', 'creative writing', 'fiction'])) {
      return this._handleCreativeWriting(input);
    }

    // ── EMAIL ──
    if (this._matches(lower, ['write an email', 'draft an email', 'email to', 'professional email', 'formal email'])) {
      return this._buildEmail(input);
    }

    // ── CONVERSATION CONTEXT ──
    if (this.conversationHistory.length > 2) {
      return this._handleContextual(input);
    }

    // ── DEFAULT ──
    return this._buildDefaultResponse(input);
  }

  // ── TOPIC RESPONSE BUILDER ──
  _buildTopicResponse(topic, data, input) {
    const facts = this._shuffle(data.facts).slice(0, 4);
    const factList = facts.map(f => `• ${f}`).join('\n');
    return `${data.intro}\n\n**Key insights:**\n${factList}\n\nWould you like me to go deeper on any specific aspect of ${topic}, or shall I apply this to your specific situation?`;
  }

  // ── CODE REQUEST HANDLERS ──
  _handleCodingRequest(input, lang) {
    const topic = input.replace(/python|javascript|js|code|write|create|build|make|function|class|script/gi, '').trim();
    if (lang === 'python') {
      return `Here is a complete Python implementation for ${topic || 'your request'}:\n\n\`\`\`python\n# D.E.V.E Generated Code\n# Task: ${topic || input}\n\nclass Solution:\n    """Complete implementation for: ${topic || input}"""\n    \n    def __init__(self):\n        self.initialized = True\n        print("System initialized")\n    \n    def run(self, data):\n        """Main execution method"""\n        try:\n            result = self._process(data)\n            return {"status": "success", "result": result}\n        except Exception as e:\n            return {"status": "error", "message": str(e)}\n    \n    def _process(self, data):\n        """Core processing logic"""\n        # Your custom logic goes here\n        processed = data\n        return processed\n\nif __name__ == "__main__":\n    solution = Solution()\n    result = solution.run("test input")\n    print(result)\n\`\`\`\n\nThis is a clean, extensible structure. Tell me the specific logic you need in the \`_process\` method and I'll write the complete implementation.`;
    }
    return `Here is a clean JavaScript implementation:\n\n\`\`\`javascript\n// D.E.V.E Generated — ${topic || input}\n\nclass DEVESolution {\n  constructor(config = {}) {\n    this.config = { debug: false, ...config };\n    this.initialized = true;\n  }\n\n  async run(input) {\n    try {\n      const result = await this._process(input);\n      return { success: true, data: result };\n    } catch (error) {\n      console.error('Error:', error.message);\n      return { success: false, error: error.message };\n    }\n  }\n\n  async _process(input) {\n    // Core logic for: ${topic || input}\n    return input;\n  }\n}\n\nconst solution = new DEVESolution();\nsolution.run('test').then(console.log);\n\`\`\`\n\nDescribe the specific behavior you need and I'll complete the implementation.`;
  }

  _handleGenericCodeRequest(input) {
    return `I can write that for you, sir. To give you the most accurate and complete implementation, please specify:\n\n1. **Programming language** — Python, JavaScript, TypeScript, or another?\n2. **Exact functionality** — what should the code do step by step?\n3. **Input/output** — what does it receive and what should it return?\n4. **Any constraints** — performance requirements, libraries to use/avoid?\n\nWith those details I'll write you a complete, production-ready implementation.`;
  }

  // ── BUSINESS PLAN ──
  _buildBusinessPlan(input) {
    const topic = input.replace(/business plan|startup|plan|idea|launch|create|build|start/gi, '').trim() || 'your business';
    return `**D.E.V.E Business Plan: ${topic}**\n\n**PHASE 1 — VALIDATION (Weeks 1-4)**\n• Define your target customer precisely (age, income, problem they have)\n• Interview 20+ potential customers before building anything\n• Identify your Unique Value Proposition — what you do that no one else does\n• Validate willingness to pay — ask for pre-orders or deposits\n\n**PHASE 2 — MVP (Weeks 5-12)**\n• Build the minimum feature set that solves the core problem\n• Aim for 10 paying customers before scaling\n• Measure: retention rate, Net Promoter Score, weekly active users\n• Iterate based on real feedback, not assumptions\n\n**PHASE 3 — GROWTH (Months 4-12)**\n• Choose one acquisition channel and master it before adding more\n• Build your email list from day one — it's your most valuable asset\n• Reinvest first revenue into what's working\n• Hire only when a role will directly increase revenue\n\n**FINANCIAL TARGETS**\n• Month 3: First paying customer\n• Month 6: Cover costs (break even)\n• Month 12: Profitable or funded for next phase\n\nWant me to build a detailed financial model or go-to-market strategy for any phase?`;
  }

  // ── CONTENT PLAN ──
  _buildContentPlan(input) {
    return `**D.E.V.E 30-Day Content Plan**\n\n**WEEK 1 — AUTHORITY BUILDING**\n• Monday: Industry insight or hot take (gets shares)\n• Wednesday: Step-by-step tutorial (gets saves)\n• Friday: Personal story with a lesson (builds connection)\n\n**WEEK 2 — SOCIAL PROOF**\n• Monday: Case study — show a result you achieved\n• Wednesday: Behind the scenes — your process\n• Friday: Myth vs reality in your niche\n\n**WEEK 3 — ENGAGEMENT**\n• Monday: Controversial opinion (invite debate respectfully)\n• Wednesday: Poll or "this or that" question\n• Friday: Community spotlight or collaboration\n\n**WEEK 4 — CONVERSION**\n• Monday: Problem + your solution\n• Wednesday: FAQ — answer your audience's top questions\n• Friday: Clear call to action tied to your offer\n\n**HOOK FORMULAS THAT WORK:**\n• "Most people get X wrong. Here's what actually works:"\n• "I spent 6 months doing Y. Here's what I learned:"\n• "The uncomfortable truth about X that nobody talks about:"\n\n**POSTING TIMES:** 7-9am or 6-9pm in your audience's timezone\n\nWant me to write the actual captions for all 12 posts?`;
  }

  // ── FINANCE PLAN ──
  _buildFinancePlan(input) {
    return `**D.E.V.E Personal Finance Plan**\n\n**BUDGET FRAMEWORK (50/30/20 Rule)**\n• 50% — Needs: rent, utilities, groceries, transport, insurance\n• 30% — Wants: dining, entertainment, hobbies, subscriptions\n• 20% — Future: savings, debt payoff, investments\n\n**STEP 1 — EMERGENCY FUND FIRST**\nBuild 3-6 months of expenses in a high-yield savings account.\nTarget: enough to cover rent + food + utilities for 3 months minimum.\n\n**STEP 2 — ELIMINATE HIGH-INTEREST DEBT**\nAnything above 7% interest — pay this off before investing.\nUse the avalanche method: highest interest rate first.\n\n**STEP 3 — INVEST CONSISTENTLY**\n• Max out tax-advantaged accounts first (401k to employer match, then Roth IRA)\n• Index funds (S&P 500 ETF like VOO or VTI) — low fees, proven returns\n• Automate contributions — pay yourself first\n• Don't try to time the market. Time IN the market beats timing the market.\n\n**COMPOUND GROWTH EXAMPLE**\nInvesting $300/month at 8% average annual return:\n• After 10 years: ~$55,000\n• After 20 years: ~$176,000\n• After 30 years: ~$450,000\n\n**IMMEDIATE ACTIONS THIS WEEK:**\n1. Track every expense for 7 days\n2. Cancel unused subscriptions\n3. Open a high-yield savings account\n4. Set up automatic transfer on payday\n\nWant a detailed plan based on your specific income and expenses?`;
  }

  // ── FITNESS PLAN ──
  _buildFitnessPlan(input) {
    const goal = input.toLowerCase().includes('weight') || input.toLowerCase().includes('lose') ? 'fat loss' :
                 input.toLowerCase().includes('muscle') || input.toLowerCase().includes('bulk') ? 'muscle gain' : 'general fitness';
    return `**D.E.V.E 12-Week Fitness Plan — ${goal.toUpperCase()}**\n\n**TRAINING SPLIT (4 days/week)**\n• Monday: Upper body push (chest, shoulders, triceps)\n• Tuesday: Lower body (squats, deadlifts, lunges)\n• Thursday: Upper body pull (back, biceps, rear delts)\n• Saturday: Full body or cardio + core\n\n**PROGRESSIVE OVERLOAD PROTOCOL**\nEach week, increase by one of:\n• +2.5 lbs on the bar, OR\n• +1 rep per set, OR\n• +1 set per exercise\n\n**NUTRITION TARGETS**\n• Protein: 0.8-1g per pound of bodyweight (most important macro)\n• ${goal === 'fat loss' ? 'Caloric deficit: 300-500 calories below maintenance' : goal === 'muscle gain' ? 'Caloric surplus: 200-300 calories above maintenance' : 'Eat at maintenance calories'}\n• Hydration: half your bodyweight (lbs) in oz of water daily\n• Prioritize whole foods: lean protein, vegetables, complex carbs\n\n**RECOVERY (equally important)**\n• Sleep 7-9 hours — growth happens at rest, not in the gym\n• Take at least 2 full rest days per week\n• Walk 7,000-10,000 steps on rest days\n\n**WEEKS 1-4:** Learn the movements, build the habit, moderate intensity\n**WEEKS 5-8:** Increase weights/volume, track all lifts\n**WEEKS 9-12:** Push intensity, test your maxes, evaluate results\n\nWant me to list specific exercises with sets, reps, and rest times for each session?`;
  }

  // ── BRAND IDENTITY ──
  _buildBrandIdentity(input) {
    const brandName = input.replace(/brand identity|brand|identity|design|create|build|logo|for/gi, '').trim() || 'Your Brand';
    return `**D.E.V.E Brand Identity Framework: ${brandName}**\n\n**BRAND POSITIONING**\n• What you do: [your core service/product]\n• Who you serve: [specific target audience]\n• What makes you different: [your unique differentiator]\n• Brand promise: [the transformation you deliver]\n\n**VISUAL IDENTITY**\n\n*Color Palette:*\n• Primary: Choose one dominant color (conveys your core emotion)\n  - Blue: trust, technology, calm\n  - Green: growth, health, nature\n  - Orange: energy, creativity, warmth\n  - Black: luxury, sophistication, power\n• Secondary: 1-2 complementary colors\n• Neutral: White/off-white or charcoal for backgrounds/text\n\n*Typography:*\n• Display font: Distinctive, memorable (for headlines)\n• Body font: Clean, highly readable (for body text)\n• Rule: Never use more than 2 fonts\n\n*Logo Principles:*\n• Works in black and white first\n• Readable at 16px and 200px\n• No more than 3 elements\n\n**BRAND VOICE**\n• Tone: [professional/casual/witty/authoritative]\n• Words you use: [innovative, proven, simple, powerful]\n• Words you avoid: [cheap, basic, easy, quick]\n• Reading level: [8th grade for mass market, higher for B2B]\n\n**TAGLINE OPTIONS**\n• "[Benefit] for [Audience]"\n• "The [Category] that [Promise]"\n• "[Verb] your [Outcome]"\n\nWant me to develop any of these sections in full detail?`;
  }

  // ── EXPLANATION HANDLER ──
  _handleExplanation(input, lower) {
    const subject = input.replace(/explain|what is|how does|tell me about|describe|define|what are/gi, '').trim();
    const topic = this._findTopicForInput(lower);

    if (topic) {
      const data = KNOWLEDGE.topics[topic];
      const randomFacts = this._shuffle(data.facts).slice(0, 3);
      return `**${subject || topic}**\n\n${data.intro}\n\n**Key points:**\n${randomFacts.map(f => `• ${f}`).join('\n')}\n\nWould you like a deeper dive into any specific aspect?`;
    }

    return `Here's what I know about **${subject}**:\n\nThis is an area where I can provide a structured overview. To give you the most useful explanation, could you tell me:\n\n• Are you a beginner or do you have existing knowledge?\n• Is this for practical application or conceptual understanding?\n• What specific aspect interests you most?\n\nWith that context I can tailor my explanation precisely to what you need.`;
  }

  _handleAnalysisRequest(input, lower) {
    const subject = input.replace(/analyze|analysis|evaluate|review|break down|breakdown|assess|compare|understand/gi, '').trim();
    const focus = subject || 'your request';
    const topic = this._findTopicForInput(lower);
    const topicIntro = topic ? `Based on the topic detected, this relates to ${topic}.` : '';

    return `**Analysis — ${focus}**\n\n${topicIntro}\n**1. What it is:**\nI identify the main concept, goal, or decision in your request and describe its purpose clearly.\n\n**2. Why it matters:**\nI explain the benefits, risks, and why this matters for your objectives.\n\n**3. Key factors:**\n• What to prioritize\n• What to avoid\n• What resources or constraints matter most\n\n**4. Recommended next steps:**\n• Start with the highest-leverage action\n• Validate the idea or implementation quickly\n• Adjust based on real feedback and measurable results\n\nIf you want, I can now turn this analysis into a concrete plan, technical design, or step-by-step implementation.`;
  }

  _findTopicForInput(lower) {
    let bestTopic = null;
    let bestScore = 0;
    for (const [topic, data] of Object.entries(KNOWLEDGE.topics)) {
      const score = data.keywords.reduce((count, keyword) => count + (lower.includes(keyword) ? 1 : 0), 0);
      if (score > bestScore) {
        bestScore = score;
        bestTopic = topic;
      }
    }
    return bestTopic;
  }

  // ── MATH HANDLER ──
  _handleMath(input) {
    try {
      const expr = input.replace(/calculate|compute|what is|solve|equals|=/gi, '').trim();
      const cleaned = expr.replace(/[^0-9+\-*/().% ]/g, '').trim();
      if (cleaned) {
        const result = Function('"use strict"; return (' + cleaned + ')')();
        if (!isNaN(result) && isFinite(result)) {
          return `The result of **${cleaned}** is:\n\n**${Number(result.toFixed(10)).toString()}**\n\nShall I show the working or perform another calculation?`;
        }
      }
    } catch (e) {}
    return "I can perform calculations for you. Please write the expression clearly, for example: '25 * 4 + 100 / 5' and I'll compute it.";
  }

  // ── CREATIVE WRITING ──
  _handleCreativeWriting(input) {
    const topic = input.replace(/write a story|short story|poem|write me a|creative writing|fiction|about/gi, '').trim() || 'adventure';
    return `**A Story: ${topic}**\n\nThe morning light cut through the blinds like a blade, sharp and unforgiving.\n\nShe had been awake for hours — not from insomnia, but from the weight of what she'd discovered the night before. The file sat on the desk in front of her, its pages dog-eared and marked in red. Three years of her life had led to this moment, and now she wasn't sure she was ready for what came next.\n\nHer phone buzzed. Unknown number.\n\nShe picked up on the first ring.\n\n"You found it," said the voice on the other end. Not a question.\n\n"Who is this?" she demanded, her hand tightening around the phone.\n\n"Someone who's been waiting for you to find it." A pause. "We need to talk. And I promise you — what's in that file is just the beginning."\n\nThe line went dead.\n\nShe looked at the file again, then at the city stretching out beyond her window — millions of people going about their ordinary lives, unaware that something beneath the surface was about to change everything.\n\nShe picked up her jacket.\n\n---\n\nShall I continue this story, change the genre, or write something entirely different?`;
  }

  // ── EMAIL BUILDER ──
  _buildEmail(input) {
    const context = input.replace(/write an email|draft an email|email to|professional email|formal email/gi, '').trim();
    return `Here is a professional email template for: **${context || 'your situation'}**\n\n---\n**Subject:** [Clear, specific subject line — state the purpose immediately]\n\nDear [Recipient Name],\n\nI hope this message finds you well.\n\nI am writing regarding [specific topic/reason for email]. [State your purpose clearly in 1-2 sentences. Don't bury the lead.]\n\n[Paragraph 2: Provide necessary context or details. Keep it concise — 2-3 sentences maximum.]\n\n[Paragraph 3: Clear call to action. What do you need from them? By when?]\n\nPlease don't hesitate to reach out if you have any questions. I look forward to your response.\n\nBest regards,\n[Your Name]\n[Your Title]\n[Your Contact Information]\n\n---\n\n**Tips for this email:**\n• Keep the total length under 150 words if possible\n• Lead with the most important information\n• One email, one ask — don't combine multiple requests\n• Send before 10am for highest open rates\n\nWant me to write a specific version with your details filled in?`;
  }

  _handleMemoryCommands(input, lower) {
    if (this._matches(lower, ['clear memory', 'forget everything', 'forget this'])) {
      return this.clearMemory();
    }

    if (this._matches(lower, ['recall', 'what do you remember', 'what did i tell you', 'remember what', 'what is saved'])) {
      const key = input.replace(/recall|what do you remember|what did i tell you|remember what|what is saved/gi, '').trim();
      const memory = this.recall(key || '');
      return memory ? `I remember this: ${memory}` : 'I could not find a matching memory entry. Try saving a note first using "remember" or "save this".';
    }

    const rememberMatch = input.match(/remember(?: that)?\s+(.+)\s+as\s+(.+)/i);
    if (rememberMatch) {
      const value = rememberMatch[1].trim();
      const key = rememberMatch[2].trim();
      return this.remember(key, value);
    }

    const simpleMatch = input.match(/remember\s+(.+)/i);
    if (simpleMatch) {
      const value = simpleMatch[1].trim();
      return this.remember(`note ${this.memory.notes.length + 1}`, value);
    }

    return 'You can ask me to remember something for you, or say "recall" followed by a keyword to retrieve it later.';
  }

  _buildGamingAssistant(input) {
    const profile = this.memory.profile.name ? ` for ${this.memory.profile.name}` : '';
    return `**D.E.V.E Gaming Assistant${profile}**\n\n` +
      `• Performance tuning: I can help you optimize FPS, reduce input lag, and choose the best settings for your hardware.\n` +
      `• Build choices: I can recommend classes, builds, perks, and item synergies tailored to the genre and your playstyle.\n` +
      `• Strategy and coaching: I can analyze your setup, suggest better crosshair placement, map awareness, and decision-making improvements.\n` +
      `• Tools: I can help you design a game-support bot, adaptive NPC behavior, or a real-time coaching assistant to improve your gameplay.\n\n` +
      `Tell me your game, platform, and what you want to improve, and I'll build a custom plan with actionable settings, hardware advice, and coaching notes.`;
  }

  _buildCreatorWorkflow(input) {
    return `**D.E.V.E Creator Workflow**\n\n` +
      `• Content planning: I generate content calendars, posting schedules, and hook templates for maximum engagement.\n` +
      `• Production workflow: I can outline how to capture footage, generate captions, extract highlights, and batch your publishing process.\n` +
      `• Creative assets: I can help you create thumbnail concepts, post copy, titles, hashtags, and SEO-friendly descriptions.\n` +
      `• Automation: I can suggest tools and scripts for auto captioning, batch editing, and scheduled publishing so you spend more time creating and less time managing.\n\n` +
      `Share your platform, niche, and goals, and I will create a complete creator system focused on growth, consistency, and workflow efficiency.`;
  }

  // ── CONTEXTUAL RESPONSE ──
  _handleContextual(input) {
    const lastAI = this.conversationHistory.filter(m => m.role === 'deve').slice(-1)[0];
    if (lastAI) {
      const lower = input.toLowerCase();
      if (this._matches(lower, ['yes', 'sure', 'please', 'go ahead', 'continue', 'more', 'expand', 'elaborate'])) {
        return `Expanding on that, sir — let me go deeper:\n\nThe key areas to focus on here are the implementation details and practical application. Based on our conversation context, here are the critical next steps:\n\n• **First priority:** Establish the foundation and validate your core assumptions\n• **Second priority:** Build incrementally — small wins compound into major results\n• **Third priority:** Measure outcomes against clear metrics from the start\n• **Fourth priority:** Iterate based on real feedback, not assumptions\n\nThe most common mistake at this stage is trying to do everything at once. Pick the highest-leverage action and execute it fully before moving to the next.\n\nShall I outline the specific steps for any of these priorities?`;
      }
      if (this._matches(lower, ['no', 'different', 'something else', 'actually', 'instead', 'change'])) {
        return "Understood, sir. Let's take a different approach. What direction would you like to go? Give me more context about what you're looking for and I'll recalibrate my response accordingly.";
      }
    }
    return this._buildDefaultResponse(input);
  }

  // ── DEFAULT RESPONSE ──
  _buildDefaultResponse(input) {
    const responses = [
      `I want to give you the most useful response possible for "${input.substring(0, 50)}". Could you give me a bit more detail about what specifically you're trying to achieve? I'll build a complete, actionable response around your exact situation.`,
      `That's an interesting request, sir. My knowledge base can address this from multiple angles. To focus my response precisely — what is the end goal you're working toward?`,
      `I can help with that. To make my response as specific and useful as possible — are you looking for a conceptual explanation, a practical step-by-step guide, or actual code/content you can use directly?`,
    ];
    return this._pick(responses);
  }

  // ── UTILITIES ──
  _matches(text, patterns) {
    return patterns.some(p => text.includes(p));
  }

  _tokenize(text) {
    return text.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  }

  _pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getStats() {
    return {
      messages: this.messageCount,
      sessionDuration: Math.floor((Date.now() - this.sessionStartTime) / 1000),
      conversationLength: this.conversationHistory.length,
    };
  }

  clearHistory() {
    this.conversationHistory = [];
    this.messageCount = 0;
  }
}

// ── EXPORT ──
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEVEBrain, KNOWLEDGE };
}
if (typeof window !== 'undefined') {
  window.DEVEBrain = DEVEBrain;
  window.DEVE_KNOWLEDGE = KNOWLEDGE;
}
