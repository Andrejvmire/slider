export function pointInPercents(part: number, from: [number, number]): number {
    return (part - from[0]) * 100 / from.reduce((p, c) => c - p);
}