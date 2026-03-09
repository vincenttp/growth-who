
"use client";
import InputFormCard from "./components/InputFormCard";
import GrowthResult from "./components/GrowthResult";
import ChartSection from "./components/ChartSection";
import { useState } from "react";

export default function Home() {
  const [growthResult, setGrowthResult] = useState<{ status: string; zScore: number | null }>({ status: "", zScore: null });
  const [chartData, setChartData] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);
    const [showForm, setShowForm] = useState(true);

  // Placeholder calculation logic
  function handleCalculate(form: any) {
    // Example: simple z-score calculation
    const zScore = form.weight && form.height ? (parseFloat(form.weight) - 10) / 2 : null;
    let status = "Normal";
    if (zScore !== null) {
      if (zScore < -2) status = "Underweight";
      else if (zScore > 2) status = "Overweight";
    }
      setGrowthResult({ status, zScore });
      setChartData({ height: [50, 60, 70, 80, 90, 95, parseFloat(form.height)] });
      setShowChart(true);
      setShowForm(false);
  }
  
    function handleNewData() {
      setShowForm(true);
      setShowChart(false);
      setGrowthResult({ status: "", zScore: null });
      setChartData(null);
    }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <main className="flex flex-col items-center w-full px-2 md:px-8 py-6 md:py-12">
          {showForm ? (
            <InputFormCard handleCalculate={handleCalculate} />
          ) : (
            <GrowthResult status={growthResult.status as any} zScore={growthResult.zScore} onNewData={handleNewData} />
          )}
          {showChart && <ChartSection data={chartData} />}
      </main>
    </div>
  );
}
