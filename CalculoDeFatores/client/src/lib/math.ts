/**
 * Find prime factorization of a number with step-by-step process
 */
export function findPrimeFactorsWithSteps(num: number): {
  steps: Array<{ divisor: number; quotient: number }>;
  primeFactorization: Record<number, number>;
} {
  const steps: Array<{ divisor: number; quotient: number }> = [];
  const primeFactors: Record<number, number> = {};
  
  let current = num;
  let divisor = 2;
  
  while (current > 1) {
    if (current % divisor === 0) {
      steps.push({ divisor, quotient: current / divisor });
      current = current / divisor;
      
      // Count occurrences for prime factorization
      primeFactors[divisor] = (primeFactors[divisor] || 0) + 1;
    } else {
      divisor++;
    }
  }
  
  return { steps, primeFactorization: primeFactors };
}

/**
 * Calculate GCD (MDC) of two numbers using the Euclidean algorithm
 */
export function calculateGCD(a: number, b: number): number {
  if (b === 0) {
    return a;
  }
  return calculateGCD(b, a % b);
}

/**
 * Find all divisors of a number
 */
export function findAllDivisors(num: number): number[] {
  const divisors: number[] = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}

/**
 * Find the common divisors of two numbers
 */
export function findCommonDivisors(num1: number, num2: number): number[] {
  const divisors1 = findAllDivisors(num1);
  const divisors2 = findAllDivisors(num2);
  
  return divisors1.filter(div => divisors2.includes(div)).sort((a, b) => a - b);
}

/**
 * Format prime factorization as a string (e.g., "2^3 × 5^1")
 */
export function formatPrimeFactorization(factors: Record<number, number>): string {
  return Object.entries(factors)
    .map(([factor, exponent]) => `${factor}<sup>${exponent}</sup>`)
    .join(' × ');
}
