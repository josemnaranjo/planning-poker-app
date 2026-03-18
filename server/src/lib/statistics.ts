import type { Vote, RoundStats } from '../types/index.js';

const toNumbers = (votes: Vote[]): number[] =>
  votes
    .filter(v => v.value !== null && v.value !== '?' && v.value !== '☕')
    .map(v => Number(v.value))
    .filter(n => !isNaN(n));

const computeAverage = (nums: number[]): number => {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

const computeMode = (votes: Vote[]): string[] => {
  const freq = new Map<string, number>();
  votes
    .filter(v => v.value !== null)
    .forEach(v => {
      const val = v.value as string;
      freq.set(val, (freq.get(val) ?? 0) + 1);
    });
  if (freq.size === 0) return [];
  const max = Math.max(...freq.values());
  return [...freq.entries()].filter(([, f]) => f === max).map(([v]) => v);
};

const computeMedian = (nums: number[]): number => {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

export const computeStats = (votes: Vote[]): RoundStats => {
  const nums = toNumbers(votes);
  const average = computeAverage(nums);
  const mode = computeMode(votes);
  const minimum = nums.length > 0 ? Math.min(...nums) : 0;
  const maximum = nums.length > 0 ? Math.max(...nums) : 0;
  const median = computeMedian(nums);

  const stdDev =
    nums.length > 0
      ? Math.sqrt(
          nums.reduce((acc, n) => acc + Math.pow(n - average, 2), 0) / nums.length
        )
      : 0;
  const cv = average !== 0 ? stdDev / average : 0;
  const hasHighDispersion = cv > 0.5 || maximum - minimum > median;

  return { average, mode, minimum, maximum, hasHighDispersion };
};
