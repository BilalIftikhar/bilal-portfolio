/** Tiny dependency-free className joiner. */
export function cn(...inputs) {
    return inputs
        .flat(Infinity)
        .filter((x) => typeof x === 'string' && x.length > 0)
        .join(' ');
}
