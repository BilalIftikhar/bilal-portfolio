import { PERSON, SITE_URL, SOCIAL_LINKS, STATS } from '@/lib/site';

/**
 * JSON-LD for the site. Person + WebSite + ProfilePage is the combination
 * Google uses to build a knowledge panel for an individual, and it is what
 * lets "Muhammad Bilal Iftikhar" resolve to this site rather than to the
 * social profiles alone.
 */
export default function StructuredData() {
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': `${SITE_URL}/#person`,
                name: PERSON.name,
                alternateName: PERSON.shortName,
                url: SITE_URL,
                image: `${SITE_URL}/profile.png`,
                email: `mailto:${PERSON.email}`,
                jobTitle: PERSON.jobTitle,
                description:
                    'Senior software engineer specialising in AI integration — LLM features, RAG pipelines and autonomous agents — alongside modern full-stack web development.',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Lahore',
                    addressCountry: PERSON.country,
                },
                sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.upwork],
                knowsAbout: [
                    'Artificial Intelligence',
                    'Large Language Models',
                    'Retrieval-Augmented Generation',
                    'AI Agents',
                    'Prompt Engineering',
                    'Vector Databases',
                    'Next.js',
                    'React',
                    'Node.js',
                    'Laravel',
                    'Python',
                    'PostgreSQL',
                    'AWS',
                ],
                worksFor: {
                    '@type': 'Organization',
                    name: 'Vocuit · AV Leads',
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: `${PERSON.name} — Portfolio`,
                inLanguage: 'en',
                publisher: { '@id': `${SITE_URL}/#person` },
            },
            {
                '@type': 'ProfilePage',
                '@id': `${SITE_URL}/#profilepage`,
                url: SITE_URL,
                name: `${PERSON.name} — ${PERSON.jobTitle}`,
                isPartOf: { '@id': `${SITE_URL}/#website` },
                about: { '@id': `${SITE_URL}/#person` },
                mainEntity: { '@id': `${SITE_URL}/#person` },
            },
            {
                '@type': 'Service',
                '@id': `${SITE_URL}/#service`,
                name: 'AI integration & full-stack product engineering',
                provider: { '@id': `${SITE_URL}/#person` },
                areaServed: 'Worldwide',
                description: `AI integration and full-stack development: LLM features, RAG systems, AI agents and production web applications. ${STATS.projects}+ projects delivered.`,
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            // Content is a static object built above — no user input reaches it.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}
