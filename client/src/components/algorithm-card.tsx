import { Card, CardContent } from "@/components/ui/card";

interface AlgorithmCardProps {
  algorithmKey: string;
  title: string;
  description: string;
  category: {
    name: string;
    color: string;
  };
  example: string;
  onSelect: () => void;
}

export default function AlgorithmCard({
  algorithmKey,
  title,
  description,
  category,
  example,
  onSelect,
}: AlgorithmCardProps) {
  // Map color names to Tailwind classes
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800",
    purple: "bg-purple-100 text-purple-800",
    green: "bg-green-100 text-green-800",
  };

  const colorClass = colorMap[category.color] || "bg-gray-100 text-gray-800";

  return (
    <Card
      data-algorithm={algorithmKey}
      className="group cursor-pointer border transition duration-200 hover:translate-y-[-4px] hover:shadow-md hover:border-primary"
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
          <span
            className={`text-xs font-mono ${colorClass} px-2 py-1 rounded`}
          >
            {category.name}
          </span>
        </div>
        <div className="mt-4 text-xs font-mono bg-gray-100 p-2 rounded">
          <code>{example}</code>
        </div>
      </CardContent>
    </Card>
  );
}
