/**
 * Single source of truth for identity, stats and SEO.
 * Anything that appears in more than one place (prose, stat counters,
 * structured data, OG tags) should be derived from here so the numbers
 * can never drift apart.
 */

export const SITE_URL = 'https://bilaliftikhar.com';

export const PERSON = {
    name: 'Muhammad Bilal Iftikhar',
    shortName: 'Bilal Iftikhar',
    jobTitle: 'Senior Software Engineer & AI Integration Specialist',
    email: 'bilaliftikhar431@gmail.com',
    whatsapp: '923247203309',
    location: 'Lahore, Pakistan',
    country: 'PK',
};

export const SOCIAL_LINKS = {
    github: 'https://github.com/mbilaliftikhar',
    linkedin: 'https://www.linkedin.com/in/mbilaliftikhar/',
    upwork: 'https://www.upwork.com/freelancers/~012e9b9487fa4f8fce',
};

/** Career started in 2020 — years of experience stay correct on their own. */
export const CAREER_START_YEAR = 2020;

export const yearsOfExperience = () =>
    Math.max(1, new Date().getFullYear() - CAREER_START_YEAR);

export const STATS = {
    years: yearsOfExperience(),
    projects: 50,
    clients: 20,
};

export const TAGLINE =
    'I build AI-powered products end to end — LLM features, retrieval pipelines and agents, shipped as fast, reliable software.';
