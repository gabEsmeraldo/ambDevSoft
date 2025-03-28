import React from "react";

interface FactorizationDisplayProps {
  number1: number;
  number2: number;
  factorization1: {
    steps: Array<{ divisor: number; quotient: number; isCommon: boolean }>;
    primeFactorization: Record<number, number>;
  };
  factorization2: {
    steps: Array<{ divisor: number; quotient: number; isCommon: boolean }>;
    primeFactorization: Record<number, number>;
  };
}

export default function FactorizationDisplay({
  number1,
  number2,
  factorization1,
  factorization2,
}: FactorizationDisplayProps) {
  // Format prime factorization as readable text (e.g., "2^3 × 5^1")
  const formatFactorization = (factors: Record<number, number>) => {
    return Object.entries(factors)
      .map(([factor, exponent]) => `${factor}<sup>${exponent}</sup>`)
      .join(" × ");
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3 text-primary-dark">
        Fatoração em números primos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-md shadow-sm border border-neutral">
          <h4 className="font-medium mb-2 pb-1 border-b border-neutral">
            Número: {number1}
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-1">Divisor</th>
                  <th className="px-2 py-1">Quociente</th>
                </tr>
              </thead>
              <tbody>
                {factorization1.steps.map((step, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1">
                      <div
                        className={`factor-box inline-block min-w-[30px] px-2 py-1 border rounded-md ${
                          step.isCommon ? "bg-yellow-50 border-yellow-400" : ""
                        }`}
                      >
                        {step.divisor}
                      </div>
                    </td>
                    <td className="px-2 py-1">{step.quotient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-center">
            <p className="text-sm">
              Fatoração:{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: formatFactorization(factorization1.primeFactorization),
                }}
              ></span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm border border-neutral">
          <h4 className="font-medium mb-2 pb-1 border-b border-neutral">
            Número: {number2}
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-1">Divisor</th>
                  <th className="px-2 py-1">Quociente</th>
                </tr>
              </thead>
              <tbody>
                {factorization2.steps.map((step, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1">
                      <div
                        className={`factor-box inline-block min-w-[30px] px-2 py-1 border rounded-md ${
                          step.isCommon ? "bg-yellow-50 border-yellow-400" : ""
                        }`}
                      >
                        {step.divisor}
                      </div>
                    </td>
                    <td className="px-2 py-1">{step.quotient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-center">
            <p className="text-sm">
              Fatoração:{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: formatFactorization(factorization2.primeFactorization),
                }}
              ></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
