import { useState } from "react";
import { Algorithm } from "@/lib/algorithms";
import AlgorithmForm from "@/components/algorithm-form";
import ResultsDisplay from "@/components/results-display";
import CodeDisplay from "@/components/code-display";
import { useToast } from "@/hooks/use-toast";

interface AlgorithmRunnerProps {
  algorithmKey: string;
  algorithm: Algorithm;
  onBack: () => void;
}

export default function AlgorithmRunner({
  algorithmKey,
  algorithm,
  onBack,
}: AlgorithmRunnerProps) {
  const [result, setResult] = useState<any | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleInputChange = (id: string, value: string) => {
    setFormInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleClearInputs = () => {
    setFormInputs({});
    setResult(null);
  };

  const handleRunAlgorithm = () => {
    try {
      const startTime = performance.now();
      const result = algorithm.execute(formInputs);
      const endTime = performance.now();
      
      setResult(result);
      setExecutionTime(endTime - startTime);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Algorithm Info Bar */}
      <div className="bg-gray-50 border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Algorithm: <span className="text-primary">{algorithm.title}</span>
          </h2>
          <p className="text-gray-600 text-sm">{algorithm.description}</p>
        </div>
        <button
          onClick={onBack}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          ← Back to algorithms
        </button>
      </div>

      <div className="p-6">
        {/* Input Form */}
        <AlgorithmForm
          formFields={algorithm.formFields}
          formInputs={formInputs}
          onInputChange={handleInputChange}
          onRun={handleRunAlgorithm}
          onClear={handleClearInputs}
        />

        {/* Results Display */}
        {result !== null && (
          <ResultsDisplay result={result} executionTime={executionTime} />
        )}

        {/* Code Display */}
        <CodeDisplay code={algorithm.code} />
      </div>
    </div>
  );
}
