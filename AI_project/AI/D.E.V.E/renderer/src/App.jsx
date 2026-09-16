import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';

const navItems = [
  { id: 'chat', label: 'Chat', icon: '⌘' },
  { id: 'voice', label: 'Voice', icon: '🎙' },
  { id: 'tasks', label: 'Ops', icon: '⧉' },
  { id: 'stats', label: 'Grid', icon: '▧' },
];

const commands = [
  { title: 'AI Game Assistant', label: 'Adaptive coaching, build advice, in-match strategies.' },
  { title: 'Creator Workflow', label: 'Auto-publish, clips, thumbnails, SEO prompts.' },
  { title: 'Internet Search', label: 'Fetch current trends, news, and live insights.' },
  { title: 'System Audit', label: 'Run a premium intelligence status review.' },
];

const sidebarVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -24 },
};

const orbStates = {
  idle: { scale: 1, opacity: 1 },
  listening: { scale: 1.05, opacity: 1 },
  processing: { scale: 0.98, opacity: 0.92 },
  speaking: { scale: 1.1, opacity: 1 },
};

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [orbState, setOrbState] = useState('idle');
  const [expanded, setExpanded] = useState('AI Game Assistant');
  const [input, setInput] = useState('');

  const activeCommand = useMemo(() => commands.find((item) => item.title === expanded), [expanded]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-deve-bg text-deve-text">
      <div className="pointer-events-none absolute inset-0 bg-slate-950/30 bg-[length:40px_40px] bg-scanlines opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,204,0.18),_transparent_40%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-[1720px] flex-col gap-6 px-4 py-6 lg:flex-row lg:items-start lg:px-8">
        <motion.aside className="z-10 flex w-full flex-row gap-2 rounded-3xl bg-white/5 p-3 backdrop-blur-2xl shadow-panel md:w-24 md:flex-col"
          initial="closed"
          animate="open"
          variants={sidebarVariants}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className={`group relative flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-lg transition ${
                activeTab === item.id ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_32px_rgba(0,255,204,0.18)]' : 'hover:border-cyan-300/40 hover:bg-white/10'
              }`}
            >
              <span className="text-cyan-300">{item.icon}</span>
              <AnimatePresence>
                {activeTab === item.id && (
                  <motion.span
                    layoutId="nav-tooltip"
                    className="absolute left-full top-1/2 -translate-y-1/2 rounded-full bg-slate-950/90 px-3 py-1 text-xs text-slate-100 shadow-glow"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.aside>

        <main className="z-10 flex flex-1 flex-col gap-6 lg:basis-3/5">
          <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">D.E.V.E Neural Interface</p>
                <h1 className="text-4xl font-semibold tracking-tight text-white">AI Command Nexus</h1>
                <p className="max-w-2xl text-sm text-slate-300">A responsive, intelligent control surface with real-time feedback, voice activation, and holographic flow.</p>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-slate-950/70 px-4 py-3 text-sm text-slate-200 shadow-[0_0_24px_rgba(0,255,204,0.08)]">
                <span className="inline-flex h-3 w-3 rounded-full bg-cyan-400 shadow-glow" />
                SYSTEM ONLINE
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.25fr_0.85fr]">
              <div className="relative flex items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.44)]">
                <div className="absolute inset-0 animate-[pulse_20s_linear_infinite] bg-[radial-gradient(circle,_rgba(0,255,204,0.1),transparent_45%)]" />
                <motion.div
                  layout
                  animate={orbState}
                  variants={orbStates}
                  className="relative flex h-[360px] w-[360px] items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 shadow-[0_0_70px_rgba(0,255,204,0.14)]"
                >
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,255,204,0.1),transparent_55%)]" />
                  <div className="absolute inset-8 rounded-full border border-cyan-400/25 blur-xl" />
                  <div className="absolute inset-16 rounded-full border border-cyan-300/10" />
                  <motion.div
                    animate={{ rotate: orbState === 'processing' ? 360 : 0 }}
                    transition={{ duration: orbState === 'processing' ? 6 : 0, ease: 'linear', repeat: Infinity }}
                    className="absolute inset-24 rounded-full border border-cyan-200/25"
                  />
                  <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-slate-950/40 shadow-[0_0_40px_rgba(0,255,204,0.18)] backdrop-blur-xl">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300/20 to-slate-950/80 ring-1 ring-cyan-300/10">
                      <span className="text-5xl">🎙️</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-panel">
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Current State</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    {['idle', 'listening', 'processing', 'speaking'].map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => setOrbState(state)}
                        className={`rounded-2xl border px-4 py-2 text-xs uppercase transition ${
                          orbState === state ? 'border-cyan-400 bg-cyan-500/10 text-cyan-200' : 'border-white/10 text-slate-300 hover:border-cyan-300/40 hover:text-white'
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-panel">
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Live telemetry</p>
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-200">Network: <span className="text-cyan-300">Online</span></div>
                    <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-200">Memory: <span className="text-cyan-300">23 active threads</span></div>
                    <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-200">Response load: <span className="text-cyan-300">0.18s</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/75">Command Terminal</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Speak with D.E.V.E</h2>
              </div>
              <div className="rounded-3xl bg-slate-950/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">ready</div>
            </div>
            <div className="grid gap-4">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your command, ask for data, or trigger a workflow..."
                className="h-40 w-full rounded-[1.5rem] border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-300/15"
              />
              <button
                type="button"
                onClick={() => {
                  setOrbState('processing');
                  setTimeout(() => setOrbState('speaking'), 300);
                }}
                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold tracking-[0.15em] text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,255,204,0.25)] active:scale-[0.98]"
              >
                Send command
              </button>
            </div>
          </section>
        </main>

        <aside className="z-10 hidden w-full max-w-[380px] flex-col gap-4 lg:flex">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Command Library</p>
            <div className="mt-4 space-y-3">
              {commands.map((item) => (
                <motion.button
                  key={item.title}
                  type="button"
                  onClick={() => setExpanded(item.title)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group w-full rounded-3xl border px-4 py-4 text-left transition ${
                    expanded === item.title ? 'border-cyan-400/60 bg-cyan-500/10' : 'border-white/10 bg-slate-950/70 hover:border-cyan-300/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950/90 text-cyan-300 shadow-[0_0_24px_rgba(0,255,204,0.12)]">
                      ▶
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeCommand && (
              <motion.div
                key={activeCommand.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-panel backdrop-blur-2xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Expanded preview</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{activeCommand.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{activeCommand.label}</p>
                <div className="mt-5 grid gap-3 text-xs text-slate-400">
                  <div className="rounded-3xl bg-slate-900/60 p-3">Category: Intelligent workflow</div>
                  <div className="rounded-3xl bg-slate-900/60 p-3">Response: cinematic, premium, holographic</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}

export default App;
