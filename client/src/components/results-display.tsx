import { useState } from "react";
import { ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ResultsDisplayProps {
  result: any;
  executionTime: number | null;
}

export default function ResultsDisplay({
  result,
  executionTime,
}: ResultsDisplayProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const formattedResult = JSON.stringify(result, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedResult);
    toast({
      title: "Copied to clipboard",
      description: "Result has been copied to your clipboard",
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-medium">Result</h3>
        {executionTime !== null && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              Execution time: <span className="font-mono">{executionTime.toFixed(2)}ms</span>
            </span>
          </div>
        )}
      </div>

      <div
        className="result-container relative bg-gray-50 border rounded-md overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-2 right-2">
          <Button
            onClick={copyToClipboard}
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <ClipboardCopy className="h-4 w-4" />
            <span className="sr-only">Copy result</span>
          </Button>
        </div>
        <pre
          id="result-display"
          className="p-4 overflow-x-auto font-mono text-sm"
        >
          <code className="language-javascript">{formattedResult}</code>
        </pre>
      </div>
    </div>
  );
}
