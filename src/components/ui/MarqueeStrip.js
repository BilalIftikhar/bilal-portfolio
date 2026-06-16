'use client';

const ROW_1 = ['NEXT.JS', 'LARAVEL', 'OPENAI', 'REACT', 'NODE.JS', 'PYTHON', 'AWS', 'LANGCHAIN'];
const ROW_2 = ['POSTGRESQL', 'TAILWIND', 'DOCKER', 'PINECONE', 'TYPESCRIPT', 'REDIS', 'CLAUDE', 'RAG'];

function Row({ items, direction }) {
    const seq = [...items, ...items, ...items, ...items];
    return (
        <div className="marquee-wrap overflow-hidden py-4 border-y border-white/5">
            <div className={`marquee ${direction === 'left' ? 'marquee-l' : 'marquee-r'}`}>
                {seq.map((item, i) => (
                    <span key={i} className="flex items-center shrink-0">
                        <span className="font-mono text-sm sm:text-base text-muted uppercase tracking-[0.25em] px-6">
                            {item}
                        </span>
                        <span className="text-gold rotate-45 inline-block w-1.5 h-1.5 bg-gold/80" aria-hidden="true" />
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function MarqueeStrip() {
    return (
        <section aria-label="Technology stack" className="bg-surface/40 relative z-10">
            <Row items={ROW_1} direction="left" />
            <Row items={ROW_2} direction="right" />
        </section>
    );
}
