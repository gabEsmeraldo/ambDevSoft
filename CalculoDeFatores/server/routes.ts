import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // GCD calculation API route
  app.get("/api/calculate", (req, res) => {
    try {
      const num1 = parseInt(req.query.num1 as string);
      const num2 = parseInt(req.query.num2 as string);
      
      // Validate input
      if (isNaN(num1) || isNaN(num2) || num1 <= 0 || num2 <= 0) {
        return res.status(400).json({ 
          message: "Both inputs must be positive integers" 
        });
      }
      
      // Step 1: Find prime factorization with steps
      const factorization1 = findPrimeFactorsWithSteps(num1);
      const factorization2 = findPrimeFactorsWithSteps(num2);
      
      // Step 2: Find common factors with minimal exponents
      const commonFactors = findCommonFactors(
        factorization1.primeFactorization, 
        factorization2.primeFactorization
      );
      
      // Step 3: Calculate GCD from common factors
      const gcd = calculateGCDFromCommonFactors(commonFactors);
      
      // Step 4: Mark common factors in the steps
      markCommonFactorsInSteps(
        factorization1.steps,
        factorization2.steps,
        Object.keys(commonFactors).map(Number)
      );
      
      // Step 5: Find all common divisors of both numbers
      const allCommonFactors = findAllCommonDivisors(num1, num2);
      
      res.json({
        gcd,
        factorization1,
        factorization2,
        commonFactors: Object.entries(commonFactors).map(([factor, exponent]) => ({
          factor: parseInt(factor),
          exponent
        })),
        allCommonFactors
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Error calculating GCD", 
        error: (error as Error).message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Prime factorization with steps
function findPrimeFactorsWithSteps(num: number) {
  const steps: Array<{ divisor: number; quotient: number; isCommon: boolean }> = [];
  const primeFactorization: Record<number, number> = {};
  
  let current = num;
  let divisor = 2;
  
  while (current > 1) {
    if (current % divisor === 0) {
      steps.push({ divisor, quotient: current / divisor, isCommon: false });
      current = current / divisor;
      
      // Count occurrences for prime factorization
      primeFactorization[divisor] = (primeFactorization[divisor] || 0) + 1;
    } else {
      divisor++;
    }
  }
  
  return { steps, primeFactorization };
}

// Find common factors with their minimal exponents
function findCommonFactors(
  factors1: Record<number, number>,
  factors2: Record<number, number>
): Record<number, number> {
  const commonFactors: Record<number, number> = {};
  
  for (const [factor, exponent1] of Object.entries(factors1)) {
    const exponent2 = factors2[factor];
    
    if (exponent2) {
      // Take the minimum exponent for common factors
      commonFactors[factor] = Math.min(exponent1, exponent2);
    }
  }
  
  return commonFactors;
}

// Calculate GCD from common factors
function calculateGCDFromCommonFactors(commonFactors: Record<number, number>): number {
  if (Object.keys(commonFactors).length === 0) {
    return 1; // No common factors other than 1
  }
  
  let gcd = 1;
  
  for (const [factor, exponent] of Object.entries(commonFactors)) {
    gcd *= Math.pow(Number(factor), exponent);
  }
  
  return gcd;
}

// Mark common factors in steps
function markCommonFactorsInSteps(
  steps1: Array<{ divisor: number; quotient: number; isCommon: boolean }>,
  steps2: Array<{ divisor: number; quotient: number; isCommon: boolean }>,
  commonFactors: number[]
) {
  // Track how many of each common factor we've seen
  const factorCount1: Record<number, number> = {};
  const factorCount2: Record<number, number> = {};
  const commonFactorCounts: Record<number, number> = {};
  
  // Initialize counts
  for (const factor of commonFactors) {
    factorCount1[factor] = 0;
    factorCount2[factor] = 0;
    
    // Count how many common factors in the final GCD
    commonFactorCounts[factor] = 0;
    for (const step of steps1) {
      if (step.divisor === factor) {
        commonFactorCounts[factor]++;
      }
    }
    
    // Take minimum of occurrences in both factorizations
    for (const step of steps2) {
      if (step.divisor === factor) {
        commonFactorCounts[factor] = Math.min(
          commonFactorCounts[factor],
          factorCount2[factor] + 1
        );
      }
    }
  }
  
  // Mark common factors in steps1
  for (const step of steps1) {
    if (commonFactors.includes(step.divisor)) {
      factorCount1[step.divisor]++;
      if (factorCount1[step.divisor] <= commonFactorCounts[step.divisor]) {
        step.isCommon = true;
      }
    }
  }
  
  // Mark common factors in steps2
  for (const step of steps2) {
    if (commonFactors.includes(step.divisor)) {
      factorCount2[step.divisor]++;
      if (factorCount2[step.divisor] <= commonFactorCounts[step.divisor]) {
        step.isCommon = true;
      }
    }
  }
}

// Find all common divisors
function findAllCommonDivisors(num1: number, num2: number): number[] {
  const gcd = calculateGCD(num1, num2);
  return findAllDivisors(gcd);
}

// Calculate GCD using Euclidean algorithm
function calculateGCD(a: number, b: number): number {
  if (b === 0) {
    return a;
  }
  return calculateGCD(b, a % b);
}

// Find all divisors of a number
function findAllDivisors(num: number): number[] {
  const divisors: number[] = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}
