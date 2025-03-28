import { Calculator } from 'lucide-react';

export default function ExplanationSection() {
  return (
    <section className="mt-8 bg-white p-6 rounded-lg border border-neutral shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary-dark flex items-center">
        <Calculator className="mr-2 h-5 w-5" />
        Exemplo de Cálculo
      </h2>
      
      <div className="space-y-4 text-neutral-dark">        
        <div className="p-4 border-l-4 border-primary-light bg-blue-50 rounded-r-md">
          <p className="italic">Exemplo: Para 40 = 2³ × 5¹ e 60 = 2² × 3¹ × 5¹</p>
          <p>Fatores comuns: 2 (menor expoente: 2) e 5 (expoente: 1)</p>
          <p className="font-medium">MDC = 2² × 5¹ = 4 × 5 = 20</p>
        </div>
      </div>
    </section>
  );
}
