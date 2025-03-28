import AppHeader from '@/components/AppHeader';
import InputSection from '@/components/InputSection';
import ResultsSection from '@/components/ResultsSection';
import ExplanationSection from '@/components/ExplanationSection';
import AppFooter from '@/components/AppFooter';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

type CalculationResults = {
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
};

export default function Home() {
  const [number1, setNumber1] = useState<number>(40);
  const [number2, setNumber2] = useState<number>(60);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const { data: results, isLoading, refetch } = useQuery<CalculationResults>({
    queryKey: [`/api/calculate?num1=${number1}&num2=${number2}`],
    enabled: isCalculating,
  });

  const handleCalculate = async () => {
    setIsCalculating(true);
    await refetch();
  };

  const shouldShowResults = useMemo(() => {
    return !isLoading && isCalculating && results !== undefined;
  }, [isLoading, isCalculating, results]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <InputSection 
            number1={number1}
            number2={number2}
            setNumber1={setNumber1}
            setNumber2={setNumber2}
            onCalculate={handleCalculate}
            isLoading={isLoading}
          />
          
          {shouldShowResults && results && (
            <ResultsSection 
              number1={number1}
              number2={number2}
              gcd={results.gcd} 
              factorization1={results.factorization1}
              factorization2={results.factorization2}
              commonFactors={results.commonFactors}
              allCommonFactors={results.allCommonFactors}
            />
          )}
          
          {/* Mantemos o componente ExplanationSection, mas já o alteramos para mostrar
              apenas o exemplo de cálculo, sem explicações sobre o que é MDC */}
          <ExplanationSection />
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
}
