"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GrowthChartProps {
  title: string;
  data: any[];
  userPoint: { x: number; y: number; label: string };
  xLabel: string;
  yLabel: string;
}

export default function GrowthChart({
  title,
  data,
  userPoint,
  xLabel,
  yLabel,
}: GrowthChartProps) {
  return (
    <div className="w-full h-80 my-6">
      <h5 className="text-center font-medium text-zinc-600 mb-2 text-sm">{title}</h5>
      <div className="w-full h-full relative">
        <Line
          data={{
            datasets: [
              {
                label: "+3 SD",
                data: data.map((d) => ({ x: d.x, y: d.sd3 })),
                borderColor: "#ef4444",
                borderWidth: 1,
                borderDash: [5, 5],
                pointRadius: 0,
                tension: 0.4,
              },
              {
                label: "+2 SD",
                data: data.map((d) => ({ x: d.x, y: d.sd2 })),
                borderColor: "#eab308",
                borderWidth: 1,
                pointRadius: 0,
                tension: 0.4,
              },
              {
                label: "Median (0)",
                data: data.map((d) => ({ x: d.x, y: d.sd0 })),
                borderColor: "#22c55e",
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
              },
              {
                label: "-2 SD",
                data: data.map((d) => ({ x: d.x, y: d.sd2n })),
                borderColor: "#eab308",
                borderWidth: 1,
                pointRadius: 0,
                tension: 0.4,
              },
              {
                label: "-3 SD",
                data: data.map((d) => ({ x: d.x, y: d.sd3n })),
                borderColor: "#ef4444",
                borderWidth: 1,
                borderDash: [5, 5],
                pointRadius: 0,
                tension: 0.4,
              },
              {
                label: "Anak Anda",
                data: [{ x: userPoint.x, y: userPoint.y }],
                backgroundColor: "#f97316",
                borderColor: "#f97316",
                pointRadius: 6,
                showLine: false,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "linear",
                title: {
                  display: true,
                  text: xLabel,
                },
                min: data[0]?.x,
                max: data[data.length - 1]?.x,
              },
              y: {
                title: {
                  display: true,
                  text: yLabel,
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  boxWidth: 8,
                },
              },
              tooltip: {
                callbacks: {
                  title: (items: any[]) => `${xLabel}: ${items[0].parsed.x}`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
