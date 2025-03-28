import { Calculator } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center">
          <Calculator className="mr-2 h-6 w-6" />
          Calculadora MDC
        </h1>
        <span className="text-sm md:text-base">Máximo Divisor Comum</span>
      </div>
    </header>
  );
}
