import { useState } from "react";
import { ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CodeDisplayProps {
  code: string;
}

export default function CodeDisplay({ code }: CodeDisplayProps) {
  const [isCodeVisible, setIsCodeVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-medium">Algorithm Implementation</h3>
        <button
          className="text-xs text-primary hover:text-primary/90"
          onClick={toggleCodeVisibility}
        >
          {isCodeVisible ? "Hide Code" : "Show Code"}
        </button>
      </div>

      {isCodeVisible && (
        <div
          className="relative"
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
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
          <pre className="language-javascript overflow-x-auto border rounded-md p-4 bg-gray-50">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
