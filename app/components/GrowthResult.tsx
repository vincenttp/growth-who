"use client";

import { useEffect, useState } from "react";
import { zScore, statusBBU, statusTBU, statusBBTB, valueFromZScore, LMS } from "@/lib/who";
import { wfaBoy, wfaGirl } from "@/lib/who-wfa";
import { hfaBoy, lfaBoy, hfaGirl, lfaGirl } from "@/lib/who-hfa";
import { wflBoy, wfhBoy, wflGirl, wfhGirl } from "@/lib/who-wfh";
import GrowthChart from "./GrowthChart";

interface GrowthResultProps {
  name?: string;
  gender?: string;
  age?: string | number;
  weight?: string | number;
  height?: string | number;
  onNewData?: () => void;
}

// Helper untuk generate data grafik
function generateChartData(
  table: any, // Tabel WHO (array/object)
  start: number,
  end: number,
  step: number = 1
) {
  const data = [];
  for (let i = start; i <= end; i += step) {
    const lms: LMS = table[i];
    if (lms) {
      data.push({
        x: i,
        sd3: valueFromZScore(3, lms),
        sd2: valueFromZScore(2, lms),
        sd0: valueFromZScore(0, lms),
        sd2n: valueFromZScore(-2, lms),
        sd3n: valueFromZScore(-3, lms),
      });
    }
  }
  return data;
}

export default function GrowthResult({
  name,
  gender,
  age,
  weight,
  height,
  onNewData,
}: GrowthResultProps) {

  const ageNum = Number(age);
  const weightNum = Number(weight);
  const heightNum = Number(height);

  const [zScores, setZScores] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {

    if (!gender || isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
      return;
    }

    const wfaTable = gender === "male" ? wfaBoy : wfaGirl;
    const hfaTable = ageNum < 24
        ? (gender === "male" ? lfaBoy : lfaGirl)
        : (gender === "male" ? hfaBoy : hfaGirl);
    const wfhTable =
      ageNum < 24
        ? (gender === "male" ? wflBoy : wflGirl)
        : (gender === "male" ? wfhBoy : wfhGirl);

    const wfaData = wfaTable[ageNum];
    const hfaData = hfaTable[ageNum];
    const wfhData = wfhTable[Math.round(heightNum)];

    const medianWeight = wfaData ? valueFromZScore(0, wfaData) : null;
    const medianHeight = hfaData ? valueFromZScore(0, hfaData) : null;
    const idealWeightForHeight = wfhData ? valueFromZScore(0, wfhData) : null;

    const result = {
      zwei: wfaData ? zScore(weightNum, wfaData) : null,
      zlen: hfaData ? zScore(heightNum, hfaData) : null,
      zwfl: wfhData ? zScore(weightNum, wfhData) : null,
      medianWeight,
      medianHeight,
      idealWeightForHeight,
    };

    // Generate Data Grafik
    const charts = {
      wfa: generateChartData(wfaTable, 0, 60, 1), // 0-60 bulan
      hfa: generateChartData(
        // Gabung tabel lfa (0-24) dan hfa (24-60) untuk visualisasi yang mulus jika diperlukan, 
        // tapi sederhana kita pakai tabel yang sesuai range umur
        ageNum < 24 ? (gender === "male" ? lfaBoy : lfaGirl) : (gender === "male" ? hfaBoy : hfaGirl),
        0, 60, 1
      ),
      wfl: generateChartData(
        wfhTable,
        ageNum < 24 ? 45 : 65,
        ageNum < 24 ? 110 : 120,
        1
      )
    };

    console.log("WHO RESULT:", result);

    setZScores(result);
    setChartData(charts);

  }, [gender, age, weight, height]);

  let wfa: number | null = null;
  let hfa: number | null = null;
  let wfl: number | null = null;

  if (zScores) {
    wfa = zScores.zwei ?? null;
    hfa = zScores.zlen ?? null;
    wfl = zScores.zwfl ?? null;
  }

  const wfaStatus = wfa !== null ? statusBBU(wfa) : null;
  const hfaStatus = hfa !== null ? statusTBU(hfa) : null;
  const wflStatus = wfl !== null ? statusBBTB(wfl) : null;

  if (!zScores) {
    return (
      <div className="text-center p-6 text-zinc-500">
        Memuat hasil perhitungan...
      </div>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow p-8 w-full max-w-lg mx-auto mb-8 border border-zinc-200">

      <h2 className="text-2xl font-semibold text-center mb-4 text-zinc-800">
        Hasil Perhitungan
      </h2>

      <div className="flex justify-between mb-2 text-zinc-700">
        <span>Nama Anak</span>
        <span className="font-semibold">{name || "-"}</span>
      </div>

      <div className="flex justify-between mb-2 text-zinc-700">
        <span>Jenis Kelamin</span>
        <span className="font-semibold">
          {gender === "male" ? "Laki-laki" : "Perempuan"}
        </span>
      </div>

      <div className="flex justify-between mb-2 text-zinc-700">
        <span>Usia</span>
        <span className="font-semibold">{ageNum} bulan</span>
      </div>

      <div className="flex justify-between mb-2 text-zinc-700">
        <span>Berat</span>
        <span className="font-semibold">{weightNum} kg</span>
      </div>

      <div className="flex justify-between mb-6 text-zinc-700">
        <span>Tinggi</span>
        <span className="font-semibold">{heightNum} cm</span>
      </div>

      {/* BB/U */}
      <div className="border rounded-lg p-4 mb-4 text-zinc-700">
        <h4 className="font-semibold mb-2">Berat Badan Menurut Umur</h4>

        <p>
          Z-score :
          <span className="ml-2 font-mono">
            {wfa !== null ? wfa.toFixed(2) : "-"}
          </span>
        </p>

        <p>
          Status :
          <span className={`ml-2 ${wfaStatus ? wfaStatus.color : "text-zinc-700"}`}>
            {wfaStatus ? wfaStatus.status : "-"}
          </span>
        </p>

        <p>
          Berat ideal (median) :
          <span className="ml-2 font-mono">
            {zScores.medianWeight !== null ? zScores.medianWeight.toFixed(1) + ' kg' : '-'}
          </span>
        </p>

        {wfaStatus && (
          <div className="mt-3 p-3 bg-zinc-50 border border-zinc-100 rounded-lg text-sm text-zinc-600">
            <span className="font-semibold text-zinc-700 block mb-1">Rekomendasi:</span>
            {wfaStatus.recommendation}
          </div>
        )}

        {chartData && (
          <GrowthChart
            title="Grafik BB/U (0-60 Bulan)"
            data={chartData.wfa}
            userPoint={{ x: ageNum, y: weightNum, label: "Anak Anda" }}
            xLabel="Umur (bulan)"
            yLabel="Berat (kg)"
          />
        )}
      </div>

      {/* TB/U */}
      <div className="border rounded-lg p-4 mb-4 text-zinc-700">
        <h4 className="font-semibold mb-2">Tinggi Badan Menurut Umur</h4>

        <p>
          Z-score :
          <span className="ml-2 font-mono">
            {hfa !== null ? hfa.toFixed(2) : "-"}
          </span>
        </p>

        <p>
          Status :
          <span className={`ml-2 ${hfaStatus ? hfaStatus.color : "text-zinc-700"}`}>
            {hfaStatus ? hfaStatus.status : "-"}
          </span>
        </p>

        <p>
          Tinggi ideal (median) :
          <span className="ml-2 font-mono">
            {zScores.medianHeight !== null ? zScores.medianHeight.toFixed(1) + ' cm' : '-'}
          </span>
        </p>

        {hfaStatus && (
          <div className="mt-3 p-3 bg-zinc-50 border border-zinc-100 rounded-lg text-sm text-zinc-600">
            <span className="font-semibold text-zinc-700 block mb-1">Rekomendasi:</span>
            {hfaStatus.recommendation}
          </div>
        )}

        {chartData && (
          <GrowthChart
            title="Grafik TB/U (0-60 Bulan)"
            data={chartData.hfa}
            userPoint={{ x: ageNum, y: heightNum, label: "Anak Anda" }}
            xLabel="Umur (bulan)"
            yLabel="Tinggi (cm)"
          />
        )}
      </div>

      {/* BB/TB */}
      <div className="border rounded-lg p-4 mb-4 text-zinc-700">
        <h4 className="font-semibold mb-2">
          Berat Badan Menurut Tinggi Badan
        </h4>

        <p>
          Z-score :
          <span className="ml-2 font-mono">
            {wfl !== null ? wfl.toFixed(2) : "-"}
          </span>
        </p>

        <p>
          Status :
          <span className={`ml-2 ${wflStatus ? wflStatus.color : "text-zinc-700"}`}>
            {wflStatus ? wflStatus.status : "-"}
          </span>
        </p>

        <p>
          Berat ideal untuk tinggi ini :
          <span className="ml-2 font-mono">
            {zScores.idealWeightForHeight !== null ? zScores.idealWeightForHeight.toFixed(1) + ' kg' : '-'}
          </span>
        </p>

        {wflStatus && (
          <div className="mt-3 p-3 bg-zinc-50 border border-zinc-100 rounded-lg text-sm text-zinc-600">
            <span className="font-semibold text-zinc-700 block mb-1">Rekomendasi:</span>
            {wflStatus.recommendation}
          </div>
        )}

        {chartData && (
          <GrowthChart
            title={`Grafik BB/${ageNum < 24 ? "PB" : "TB"}`}
            data={chartData.wfl}
            userPoint={{ x: heightNum, y: weightNum, label: "Anak Anda" }}
            xLabel="Tinggi/Panjang (cm)"
            yLabel="Berat (kg)"
          />
        )}
      </div>

      {onNewData && (
        <button
          onClick={onNewData}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg mt-4"
        >
          Data Baru
        </button>
      )}

    </section>
  );
}