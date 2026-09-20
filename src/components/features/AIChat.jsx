import { useEffect, useRef, useState } from 'react';
import { IconSend, IconSparkle, IconX } from '@/components/ui/Icon';
import { AI_SUGGESTIONS } from '@/data/aiSuggestions';
import { MOVIES } from '@/data/movies';
import { getMovieImage } from '@/data/images';
import { scoreMovieForQuery } from '@/utils/scoreMovie';

export function AIChat({ onOpen, onAtmosphere }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hi, I'm CineVibe AI. Tell me a mood, a feeling, or what you're in the mood to watch — I'll find your next obsession.",
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      const ranked = [...MOVIES]
        .map((m) => ({ m, s: scoreMovieForQuery(m, q) }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 3)
        .filter((x) => x.s > 0);
      const picks = ranked.length
        ? ranked.map((r) => r.m)
        : [MOVIES[Math.floor(Math.random() * MOVIES.length)]];
      setMessages((m) => [
        ...m,
        {
          role: 'ai',
          text: ranked.length
            ? `Here's what fits "${q}":`
            : 'I don\u2019t have an exact match, but this might surprise you:',
          picks,
        },
      ]);
      setThinking(false);
      if (picks[0]) onAtmosphere({ c1: picks[0].c1, c2: picks[0].c2 });
    }, 850);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed z-40 bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        style={{ background: 'linear-gradient(135deg, var(--violet), #4a2fd9)' }}
        aria-label="Toggle AI chat"
      >
        {open ? <IconX className="text-white" size={20} /> : <IconSparkle className="text-white" size={20} />}
      </button>

      {open && (
        <div
          className="fixed z-40 bottom-24 right-6 w-[92vw] max-w-sm h-[70vh] max-h-[560px] glass rounded-2xl flex flex-col overflow-hidden animate-fade-slide"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
        >
          <div className="p-4 border-b border-[var(--glass-border)] flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--violet), #4a2fd9)' }}
            >
              <IconSparkle size={14} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                CineVibe AI
              </div>
              <div className="text-[11px] text-[var(--text-faint)]">
                Mood-aware recommendations
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'ai' ? '' : 'flex justify-end'}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'ai' ? 'bg-white/10' : 'bg-[var(--violet)] text-white'
                  }`}
                  style={{ color: m.role === 'ai' ? 'var(--text)' : '#fff' }}
                >
                  {m.text}
                </div>
                {m.picks && (
                  <div className="mt-2 space-y-2 w-full">
                    {m.picks.map((p) => (
                      <button
                        key={p.id}
                        onClick={(e) => onOpen(p, e)}
                        className="w-full text-left rounded-xl overflow-hidden flex items-center gap-3 p-2 border border-[var(--glass-border)] hover:border-[var(--violet)] transition"
                        style={{ background: `linear-gradient(120deg, ${p.c1}33, transparent)` }}
                      >
                        <div
                          className="w-10 h-14 rounded-lg shrink-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `linear-gradient(150deg, ${p.c1}55, ${p.c2}99), url(${getMovieImage(p)})`,
                          }}
                        />
                        <div>
                          <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                            {p.title}
                          </div>
                          <div className="text-[11px] text-[var(--text-faint)]">
                            {p.year} · {p.genres[0]} · ★ {p.score}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <div className="text-xs text-[var(--text-faint)] shimmer-text w-fit">
                Reading the room…
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[var(--glass-border)]">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {AI_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] border border-white/14 bg-white/5 px-2 py-1 rounded-full hover:text-[var(--violet)] transition"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Tell me your mood…"
                className="flex-1 bg-white/5 border border-[var(--glass-border)] rounded-full px-4 py-2.5 text-sm placeholder:text-[var(--text-faint)] outline-none focus:border-[var(--violet)] transition-colors"
                style={{ color: 'var(--text)' }}
              />
              <button
                onClick={() => send()}
                className="w-9 h-9 rounded-full bg-[var(--text)] text-[var(--ink)] flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                aria-label="Send message"
              >
                <IconSend size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}