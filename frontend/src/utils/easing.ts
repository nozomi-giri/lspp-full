/** Cubic ease-out, used to animate the YourRole stat ring counters. */
export function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}
