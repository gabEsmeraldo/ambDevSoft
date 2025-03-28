import React from 'react';

interface AllFactorsDisplayProps {
  allCommonFactors: number[];
}

export default function AllFactorsDisplay({ allCommonFactors }: AllFactorsDisplayProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 text-primary-dark">Lista de todos os divisores comuns</h3>
      
      <div className="bg-white p-4 rounded-md shadow-sm border border-neutral">
        <div className="flex flex-wrap gap-2 justify-center">
          {allCommonFactors.map((factor, index) => (
            <div key={index} className="bg-neutral-light px-3 py-1 rounded-md border border-neutral">
              {factor}
            </div>
          ))}
          
          {allCommonFactors.length === 0 && (
            <div className="text-muted-foreground">Não há divisores comuns além do 1</div>
          )}
        </div>
      </div>
    </div>
  );
}
