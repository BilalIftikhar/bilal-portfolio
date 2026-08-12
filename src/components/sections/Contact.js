'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiUpwork, SiWhatsapp } from 'react-icons/si';
import KineticText from '@/components/ui/KineticText';
import MagneticButton from '@/components/ui/MagneticButton';
import { PERSON, SOCIAL_LINKS } from '@/lib/site';

const EMAIL = PERSON.email;
const WHATSAPP = PERSON.whatsapp;

const SOCIALS = [
    { icon: FiGithub, label: 'GitHub', href: SOCIAL_LINKS.github },
    { icon: FiLinkedin, label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
    { icon: SiUpwork, label: 'Upwork', href: SOCIAL_LINKS.upwork },
    { icon: FiMail, label: 'Email', href: `mailto:${EMAIL}` },
];

function validate({ name, email, message }) {
    const errs = {};
    if (!name.trim() || name.trim().length < 2) errs.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    if (!message.trim() || message.trim().length < 10)
        errs.message = 'Please add at least a sentence about your project';
    return errs;
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [state, setState] = useState('idle'); // idle | loading | success | error

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        const errs = validate(form);
        setErrors(errs);
        if (Object.keys(errs).length) return;

        // Open WhatsApp chat to Bilal with the message pre-filled
        const text = `Hi Bilal, I'm ${form.name} (${form.email}).\n\n${form.message}`;
        window.open(
            `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
            '_blank',
            'noopener,noreferrer'
        );
        setState('success');
        setForm({ name: '', email: '', message: '' });
    };

    const field =
        'w-full px-4 py-3 bg-white/5 border rounded-xl text-ink placeholder-muted/60 focus:outline-none transition-colors';

    return (
        <section id="contact" className="section-pad bg-night relative overflow-hidden min-h-screen flex items-center">
            {/* Drifting blobs */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="mesh-blob animate-mesh-1" style={{ width: 480, height: 480, top: '-10%', right: '-6%', background: 'radial-gradient(circle, #4F8EF7, transparent 70%)' }} />
                <div className="mesh-blob animate-mesh-2" style={{ width: 420, height: 420, bottom: '-12%', left: '-4%', background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
            </div>

            <div className="max-w-5xl mx-auto relative z-10 w-full text-center">
                <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">/ Get in touch</span>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl mt-3 leading-none">
                    <span className="sr-only">Let&apos;s build something great</span>
                    <span aria-hidden="true">
                        <KineticText text="LET'S BUILD" /> <br />
                        <KineticText text="SOMETHING GREAT" className="text-gradient" />
                    </span>
                </h2>
                <p className="text-muted mt-5 max-w-xl mx-auto mb-12">
                    Available for freelance projects, full-time roles and AI consulting. Tell me
                    what you&apos;re building and what&apos;s in the way.
                </p>

                <div className="glass-strong chroma rounded-3xl p-8 sm:p-10 text-left max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {state === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <svg width="72" height="72" viewBox="0 0 52 52" className="mx-auto mb-5">
                                    <circle cx="26" cy="26" r="24" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.4" />
                                    <motion.path
                                        d="M14 27 l8 8 l16 -18"
                                        fill="none"
                                        stroke="#10B981"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    />
                                </svg>
                                <h3 className="font-heading font-bold text-2xl text-ink">
                                    Opening WhatsApp…
                                </h3>
                                <p className="text-muted mt-2">
                                    Your message is pre-filled — hit send there and I&apos;ll usually
                                    reply within a day. If the tab didn&apos;t open, email me at{' '}
                                    <a href={`mailto:${EMAIL}`} className="text-gold underline">
                                        {EMAIL}
                                    </a>
                                    .
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={onSubmit}
                                noValidate
                                className="space-y-5"
                            >
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm text-muted mb-1.5">Name</label>
                                        <input
                                            id="name" name="name" value={form.name} onChange={onChange}
                                            className={`${field} ${errors.name ? 'border-red-500/60' : 'border-white/10 focus:border-primary'}`}
                                            placeholder="Jane Doe"
                                        />
                                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm text-muted mb-1.5">Email</label>
                                        <input
                                            id="email" name="email" type="email" value={form.email} onChange={onChange}
                                            className={`${field} ${errors.email ? 'border-red-500/60' : 'border-white/10 focus:border-primary'}`}
                                            placeholder="jane@company.com"
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm text-muted mb-1.5">Message</label>
                                    <textarea
                                        id="message" name="message" rows={4} value={form.message} onChange={onChange}
                                        className={`${field} resize-none ${errors.message ? 'border-red-500/60' : 'border-white/10 focus:border-primary'}`}
                                        placeholder="Tell me about your project…"
                                    />
                                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <MagneticButton type="submit" variant="gold" className="w-full justify-center">
                                    <SiWhatsapp /> SEND VIA WHATSAPP
                                </MagneticButton>
                                <p className="text-muted/80 text-xs text-center">
                                    Opens WhatsApp with your message ready to send — nothing is
                                    submitted from this page.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                {/* Or email directly */}
                <div className="mt-12">
                    <p className="text-muted text-sm mb-2">or say hello at</p>
                    <a
                        href={`mailto:${EMAIL}`}
                        data-cursor="text"
                        className="group relative inline-block font-display text-2xl sm:text-4xl text-ink"
                    >
                        {EMAIL}
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                    </a>
                </div>

                <div className="flex justify-center gap-4 mt-10">
                    {SOCIALS.map(({ icon: Icon, label, href }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            aria-label={label}
                            whileHover={{ rotate: 360, scale: 1.15, color: '#C9A96E' }}
                            transition={{ type: 'spring', stiffness: 250, damping: 12 }}
                            className="w-12 h-12 grid place-items-center rounded-xl glass text-muted text-xl"
                        >
                            <Icon />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
