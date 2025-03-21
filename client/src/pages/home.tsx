import { useState } from "react";
import AlgorithmCard from "@/components/algorithm-card";
import AlgorithmRunner from "@/components/algorithm-runner";
import { algorithms } from "@/lib/algorithms";

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Algorithm Playground</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {!selectedAlgorithm ? (
          <section id="algorithm-selection" className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Choose an Algorithm</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(algorithms).map(([key, algorithm]) => (
                <AlgorithmCard
                  key={key}
                  algorithmKey={key}
                  title={algorithm.title}
                  description={algorithm.description}
                  category={algorithm.category}
                  example={algorithm.example}
                  onSelect={() => setSelectedAlgorithm(key)}
                />
              ))}
            </div>
          </section>
        ) : (
          <AlgorithmRunner
            algorithmKey={selectedAlgorithm}
            algorithm={algorithms[selectedAlgorithm]}
            onBack={() => setSelectedAlgorithm(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 max-w-7xl text-center text-gray-500 text-sm">
          <p>Algorithm Playground &copy; {new Date().getFullYear()} | A toolkit for testing and understanding algorithms</p>
        </div>
      </footer>
    </div>
  );
}
