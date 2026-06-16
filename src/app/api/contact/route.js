import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const message = String(body?.message || '').trim();

    if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
        return NextResponse.json({ error: 'Validation failed' }, { status: 422 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || 'bilaliftikhar431@gmail.com';

    // Without an API key (e.g. local/preview), accept gracefully so the UI
    // can still confirm. The client also has a mailto fallback.
    if (!apiKey) {
        console.warn('[contact] RESEND_API_KEY not set — message logged, not emailed.');
        return NextResponse.json({ ok: true, delivered: false });
    }

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
                to: [to],
                reply_to: email,
                subject: `New enquiry from ${name}`,
                text: `From: ${name} <${email}>\n\n${message}`,
            }),
        });

        if (!res.ok) {
            const detail = await res.text();
            console.error('[contact] Resend error:', detail);
            return NextResponse.json({ error: 'Email provider error' }, { status: 502 });
        }
        return NextResponse.json({ ok: true, delivered: true });
    } catch (err) {
        console.error('[contact] send failed:', err);
        return NextResponse.json({ error: 'Send failed' }, { status: 500 });
    }
}
