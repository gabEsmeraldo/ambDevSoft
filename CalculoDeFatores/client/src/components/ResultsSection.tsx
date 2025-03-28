import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import FactorizationDisplay from "./FactorizationDisplay";
import CommonFactorsDisplay from "./CommonFactorsDisplay";
import AllFactorsDisplay from "./AllFactorsDisplay";

interface ResultsSectionProps {
  number1: number;
  number2: number;
  gcd: number;
  factorization1: {
    steps: Array<{ divisor: number; quotient: number; isCommon: boolean }>;
    primeFactorization: Record<number, number>;
  };
  factorization2: {
    steps: Array<{ divisor: number; quotient: number; isCommon: boolean }>;
    primeFactorization: Record<number, number>;
  };
  commonFactors: Array<{ factor: number; exponent: number }>;
  allCommonFactors: number[];
}

export default function ResultsSection({
  number1,
  number2,
  gcd,
  factorization1,
  factorization2,
  commonFactors,
  allCommonFactors
}: ResultsSectionProps) {
  return (
    <section className="bg-neutral-light p-6 rounded-lg border border-neutral">
      <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center">
        <Info className="mr-2 h-5 w-5" />
        Resultado do MDC
      </h2>
      
      <div className="mb-6 p-4 bg-white rounded-md shadow-sm">
        <div className="text-center">
          <p className="text-lg mb-2">
            O MDC de <span className="font-bold text-primary-dark">{number1}</span> e{" "}
            <span className="font-bold text-primary-dark">{number2}</span> é:
          </p>
          <div className="text-4xl font-bold text-accent py-2">{gcd}</div>
        </div>
      </div>
      
      <FactorizationDisplay 
        number1={number1}
        number2={number2}
        factorization1={factorization1}
        factorization2={factorization2}
      />
      
      <CommonFactorsDisplay 
        commonFactors={commonFactors}
        gcd={gcd}
      />
      
      <AllFactorsDisplay 
        allCommonFactors={allCommonFactors}
      />
    </section>
  );
}
