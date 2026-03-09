"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartSection({ data }: { data: any }) {
  // Sample placeholder chart data
  const chartData = {
    labels: ["0", "6", "12", "18", "24", "30", "36"],
    datasets: [
      {
        label: "Child Height (cm)",
        data: data?.height || [50, 60, 70, 80, 90, 95, 100],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.1)",
        tension: 0.4,
      },
      {
        label: "WHO Standard",
        data: [49, 58, 67, 76, 85, 92, 98],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.1)",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "WHO Growth Chart (Height vs Age in Months)" },
    },
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl mx-auto mb-8">
      <h4 className="text-lg font-semibold text-blue-600 mb-4">Growth Chart</h4>
      <div className="w-full h-64">
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
}