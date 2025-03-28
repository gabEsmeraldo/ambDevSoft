import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

interface InputSectionProps {
  number1: number;
  number2: number;
  setNumber1: (num: number) => void;
  setNumber2: (num: number) => void;
  onCalculate: () => void;
  isLoading: boolean;
}

export default function InputSection({
  number1,
  number2,
  setNumber1,
  setNumber2,
  onCalculate,
  isLoading
}: InputSectionProps) {
  const handleNumber1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNumber1(value);
    }
  };

  const handleNumber2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNumber2(value);
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-primary-dark pb-2 border-b border-muted">
        Insira os números
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="number1" className="block text-muted-foreground font-medium">
            Primeiro número:
          </Label>
          <div className="relative">
            <Input
              type="number"
              id="number1"
              min="1"
              value={number1}
              onChange={handleNumber1Change}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="number2" className="block text-muted-foreground font-medium">
            Segundo número:
          </Label>
          <div className="relative">
            <Input
              type="number"
              id="number2"
              min="1"
              value={number2}
              onChange={handleNumber2Change}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button 
          onClick={onCalculate}
          disabled={isLoading || number1 <= 0 || number2 <= 0}
          className="px-6 py-2 shadow-md"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calcular MDC
        </Button>
      </div>
    </section>
  );
}
