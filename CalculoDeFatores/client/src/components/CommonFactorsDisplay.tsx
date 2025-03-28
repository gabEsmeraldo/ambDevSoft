import React from 'react';

interface CommonFactorsDisplayProps {
  commonFactors: Array<{ factor: number; exponent: number }>;
  gcd: number;
}

export default function CommonFactorsDisplay({ commonFactors, gcd }: CommonFactorsDisplayProps) {
  // Format the MDC calculation formula
  const formatMdcFormula = () => {
    const factors = commonFactors.map(
      ({ factor, exponent }) => `${factor}<sup>${exponent}</sup>`
    );
    
    const multiplications = commonFactors.map(
      ({ factor, exponent }) => Math.pow(factor, exponent)
    );
    
    if (factors.length === 0) return 'MDC = 1';
    
    let formula = `MDC = ${factors.join(' × ')}`;
    
    if (multiplications.length > 1) {
      formula += ` = ${multiplications.join(' × ')}`;
    }
    
    formula += ` = ${gcd}`;
    
    return formula;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3 text-primary-dark">Fatores comuns</h3>
      
      <div className="bg-white p-4 rounded-md shadow-sm border border-neutral">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {commonFactors.map(({ factor, exponent }, index) => (
            <div key={index} className="factor-box px-3 py-2 border border-yellow-400 bg-yellow-50 rounded-md shadow-sm text-center">
              <div className="font-medium">{factor}</div>
              <div className="text-xs text-neutral-dark">expoente: {exponent}</div>
            </div>
          ))}
          
          {commonFactors.length === 0 && (
            <div className="text-muted-foreground">Não há fatores primos comuns além do 1</div>
          )}
        </div>
        
        <div className="text-center">
          <div className="my-2 p-2 inline-block bg-neutral-light rounded-md">
            <span 
              className="font-medium" 
              dangerouslySetInnerHTML={{ __html: formatMdcFormula() }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
