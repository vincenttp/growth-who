"use client";
import InputFormCard from "./components/InputFormCard";
import GrowthResult from "./components/GrowthResult";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formDetail, setFormDetail] = useState<{ name?: string; gender?: string; age?: string; weight?: string; height?: string }>({});
  const [showForm, setShowForm] = useState(true);

  // Placeholder calculation logic
  function handleCalculate(form: any) {
    // Example: simple z-score calculation
    setFormDetail({ name: form.name, gender: form.gender, age: form.age, weight: form.weight, height: form.height });
    setShowForm(false);
  }

  function handleNewData() {
    setShowForm(true);
    setFormDetail({});
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <main className="flex-grow flex flex-col items-center w-full px-2 md:px-8 py-6 md:py-12">
        {showForm ? (
          <InputFormCard handleCalculate={handleCalculate} />
        ) : (
          <GrowthResult
            name={formDetail.name}
            gender={formDetail.gender}
            age={formDetail.age}
            weight={formDetail.weight}
            height={formDetail.height}
            onNewData={handleNewData}
          />
        )}
      </main>
      <footer className="w-full bg-white border-t border-zinc-200 py-6 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Logo Puskesmas Sabbangparu"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="font-bold text-zinc-700 text-lg">Puskesmas Sabbangparu</span>
        </div>
      </footer>
    </div>
  );
}
