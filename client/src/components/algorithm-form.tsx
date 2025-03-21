import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FormField {
  id: string;
  label: string;
  type: "number" | "text";
  placeholder: string;
  helperText?: string;
}

interface AlgorithmFormProps {
  formFields: FormField[];
  formInputs: Record<string, string>;
  onInputChange: (id: string, value: string) => void;
  onRun: () => void;
  onClear: () => void;
}

export default function AlgorithmForm({
  formFields,
  formInputs,
  onInputChange,
  onRun,
  onClear,
}: AlgorithmFormProps) {
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium mb-3">Input Parameters</h3>

      <div className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <Label htmlFor={field.id} className="mb-1">
              {field.label}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formInputs[field.id] || ""}
              onChange={(e) => onInputChange(field.id, e.target.value)}
              className="max-w-md"
            />
            {field.helperText && (
              <p className="text-gray-500 text-xs mt-1">{field.helperText}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex space-x-2">
        <Button onClick={onRun} className="bg-primary hover:bg-primary/90">
          Run Algorithm
        </Button>
        <Button
          onClick={onClear}
          variant="outline"
          className="border-gray-300 hover:bg-gray-100"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
