import { SITE_URL } from '@/lib/site';

/** Single-page site: the anchors are not separate URLs, so only "/" is listed. */
export default function sitemap() {
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];
}
