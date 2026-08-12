'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiSearch, FiGitMerge, FiMic, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import Tilt3D from '@/components/ui/Tilt3D';

const NODES = [
    { x: 80, y: 90 }, { x: 80, y: 230 }, { x: 80, y: 370 },
    { x: 300, y: 60 }, { x: 300, y: 180 }, { x: 300, y: 300 }, { x: 300, y: 420 },
    { x: 520, y: 120 }, { x: 520, y: 260 }, { x: 520, y: 400 },
    { x: 740, y: 90 }, { x: 740, y: 230 }, { x: 740, y: 370 },
];
const LINKS = [
    [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
    [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9],
    [7, 10], [7, 11], [8, 11], [9, 11], [9, 12],
];

const CARDS = [
    // Deliberately version-free: naming a specific model release dates the
    // page the moment the next one ships.
    { icon: FiCpu, title: 'LLM Integration', desc: 'OpenAI, Anthropic and Google models wired into production with streaming, tool-calling and cost control.', tags: ['OpenAI', 'Claude', 'Gemini'] },
    { icon: FiSearch, title: 'RAG Systems', desc: 'Custom retrieval pipelines — smart chunking, hybrid search and reranking for grounded answers.', tags: ['Chunking', 'Rerank', 'Vector DB'] },
    { icon: FiGitMerge, title: 'AI Agents', desc: 'Autonomous multi-step workflows with planning, tool use, and memory that actually finish the job.', tags: ['Planning', 'Tools', 'Memory'] },
    { icon: FiMic, title: 'Voice AI', desc: 'Real-time speech pipelines — Whisper transcription and ElevenLabs synthesis with low latency.', tags: ['Whisper', 'ElevenLabs', 'STT/TTS'] },
    { icon: FiMessageSquare, title: 'Enterprise Bots', desc: 'Multi-turn chatbots with long-term memory, context windows and clean human handoff.', tags: ['Memory', 'Context', 'Handoff'] },
    { icon: FiTrendingUp, title: 'Evals & Fine-tune', desc: 'Custom datasets, fine-tuning and evaluation frameworks so quality is measured, not guessed.', tags: ['Datasets', 'Eval', 'RLHF'] },
];

export default function AIExpertise() {
    return (
        <section id="ai" className="section-pad bg-surface relative overflow-hidden">
            {/* Neural network background */}
            <svg
                className="absolute inset-0 w-full h-full opacity-50"
                viewBox="0 0 820 480"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="nl" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4F8EF7" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
                {/* Rendered unconditionally so server and client markup agree;
                    the global prefers-reduced-motion rule neutralises the CSS
                    animation on .neural-line. */}
                {LINKS.map(([a, b], i) => (
                    <line
                        key={i}
                        x1={NODES[a].x} y1={NODES[a].y}
                        x2={NODES[b].x} y2={NODES[b].y}
                        stroke="url(#nl)"
                        strokeWidth="1"
                        className="neural-line"
                        style={{ animationDelay: `${(i % 6) * 0.4}s` }}
                    />
                ))}
                {NODES.map((n, i) => (
                    <circle key={i} cx={n.x} cy={n.y} r="4" fill={i % 3 === 0 ? '#10B981' : '#4F8EF7'}>
                        <animate
                            attributeName="opacity"
                            values="0.4;1;0.4"
                            dur="3s"
                            begin={`${(i % 5) * 0.5}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}
            </svg>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">/ Specialization</span>
                    <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl mt-3 leading-none">
                        BUILDING WITH{' '}
                        <span className="text-success animate-ai-glow">AI</span>
                    </h2>
                    <p className="text-muted mt-5 max-w-2xl mx-auto">
                        Not demos — systems running in production, with the evals, cost controls
                        and failure handling that keeps them there.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1200 }}>
                    {CARDS.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <motion.div
                                key={c.title}
                                initial={{ opacity: 0, rotateY: 90 }}
                                whileInView={{ opacity: 1, rotateY: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <Tilt3D
                                    as="article"
                                    max={11}
                                    scale={1.03}
                                    perspective={1000}
                                    className="chroma glass-strong rounded-2xl p-7 h-full group hover:shadow-[0_0_50px_rgba(16,185,129,0.18)]"
                                >
                                    <Tilt3D.Layer depth={40}>
                                        <span className="relative inline-grid place-items-center w-14 h-14 rounded-xl bg-success/10 text-success text-2xl mb-5 transition-transform duration-300 group-hover:scale-110">
                                            <span className="absolute inset-0 rounded-xl bg-success/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <Icon className="relative" />
                                        </span>
                                    </Tilt3D.Layer>
                                    <Tilt3D.Layer depth={24}>
                                        <h3 className="font-heading font-bold text-xl text-ink mb-2">
                                            {c.title}
                                        </h3>
                                        <p className="text-muted text-sm leading-relaxed mb-5">{c.desc}</p>
                                    </Tilt3D.Layer>
                                    <div className="flex flex-wrap gap-2">
                                        {c.tags.map((t) => (
                                            <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-muted border border-white/5">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </Tilt3D>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
