'use client';

import { motion } from 'framer-motion';
import { FiLayout, FiCpu, FiServer, FiCloud, FiDatabase } from 'react-icons/fi';
import KineticText from '@/components/ui/KineticText';

const CARDS = [
    {
        key: 'frontend',
        cat: 'Frontend',
        icon: FiLayout,
        glow: 'rgba(79,142,247,0.18)',
        accent: 'text-primary',
        span: 'md:col-span-5 md:row-span-1',
        skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
        key: 'ai',
        cat: 'AI / ML',
        icon: FiCpu,
        glow: 'rgba(16,185,129,0.2)',
        accent: 'text-success',
        span: 'md:col-span-7 md:row-span-2',
        big: true,
        skills: [
            'OpenAI API', 'Claude API', 'LangChain', 'LlamaIndex', 'RAG Pipelines',
            'Pinecone', 'Weaviate', 'ChromaDB', 'LLM Fine-tuning', 'Hugging Face',
            'Prompt Engineering', 'AI Agents', 'Voice AI', 'Computer Vision',
            'Embeddings', 'Semantic Search', 'Function Calling', 'Multimodal AI',
            'AI Chatbots',
        ],
    },
    {
        key: 'backend',
        cat: 'Backend',
        icon: FiServer,
        glow: 'rgba(124,58,237,0.2)',
        accent: 'text-secondary-light',
        span: 'md:col-span-5',
        skills: ['Laravel', 'Node.js', 'Express', 'Python', 'REST API', 'GraphQL'],
    },
    {
        key: 'devops',
        cat: 'DevOps',
        icon: FiCloud,
        glow: 'rgba(201,169,110,0.2)',
        accent: 'text-gold',
        span: 'md:col-span-4',
        skills: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'CI/CD'],
    },
    {
        key: 'database',
        cat: 'Database',
        icon: FiDatabase,
        glow: 'rgba(244,114,182,0.18)',
        accent: 'text-pink-400',
        span: 'md:col-span-3',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
    },
];

function Card({ card, index }) {
    const Icon = card.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ boxShadow: `0 0 50px ${card.glow}` }}
            className={`chroma glass rounded-2xl p-6 flex flex-col group ${card.span}`}
        >
            <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                    {card.cat}
                </span>
                <motion.span
                    className={`text-2xl ${card.accent}`}
                    whileHover={{ rotate: 20, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <Icon />
                </motion.span>
            </div>

            <h3 className={`font-heading font-bold mb-5 ${card.big ? 'text-3xl' : 'text-2xl'} text-ink`}>
                {card.cat}
            </h3>

            <div className="flex flex-wrap gap-2 mt-auto">
                {card.skills.map((s) => (
                    <span
                        key={s}
                        className="px-3 py-1.5 rounded-lg text-[13px] text-muted bg-white/5 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:text-ink hover:border-white/20"
                    >
                        {s}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="section-pad bg-surface/30 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-14 text-center">
                    <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">/ Toolkit</span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl mt-3">
                        <KineticText text="THE STACK I" /> <KineticText text="WIELD" className="text-gradient" />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-4 sm:gap-5">
                    {CARDS.map((c, i) => (
                        <Card key={c.key} card={c} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
