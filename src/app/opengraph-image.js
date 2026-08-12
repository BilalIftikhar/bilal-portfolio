import { ImageResponse } from 'next/og';
import { PERSON, STATS } from '@/lib/site';

export const alt = `${PERSON.name} — ${PERSON.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generated social card. The profile photo is a small square avatar, so using
 * it as the OG image produced a stretched, blurry preview — this renders a
 * proper 1200x630 card instead.
 */
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '72px 80px',
                    background:
                        'linear-gradient(135deg, #050510 0%, #0A0A1A 45%, #14103a 100%)',
                    color: '#F8FAFC',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        fontSize: 24,
                        letterSpacing: 6,
                        textTransform: 'uppercase',
                        color: '#C9A96E',
                    }}
                >
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            background: '#10B981',
                        }}
                    />
                    Available for work
                </div>

                <div
                    style={{
                        display: 'flex',
                        fontSize: 82,
                        fontWeight: 800,
                        lineHeight: 1.05,
                        marginTop: 28,
                    }}
                >
                    {PERSON.name}
                </div>

                <div
                    style={{
                        display: 'flex',
                        fontSize: 40,
                        color: '#7FB0FF',
                        marginTop: 16,
                    }}
                >
                    Senior Software Engineer &amp; AI Integration Specialist
                </div>

                <div
                    style={{
                        display: 'flex',
                        fontSize: 27,
                        color: '#94A3B8',
                        marginTop: 24,
                        maxWidth: 900,
                        lineHeight: 1.4,
                    }}
                >
                    LLM features, RAG pipelines and AI agents — shipped as fast, reliable
                    production software.
                </div>

                <div style={{ display: 'flex', gap: 48, marginTop: 44 }}>
                    {[
                        [`${STATS.years}+`, 'Years'],
                        [`${STATS.projects}+`, 'Projects'],
                        [`${STATS.clients}+`, 'Clients'],
                    ].map(([value, label]) => (
                        <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 52, fontWeight: 700, color: '#C9A96E' }}>
                                {value}
                            </div>
                            <div
                                style={{
                                    fontSize: 21,
                                    color: '#94A3B8',
                                    letterSpacing: 3,
                                    textTransform: 'uppercase',
                                }}
                            >
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        size
    );
}
