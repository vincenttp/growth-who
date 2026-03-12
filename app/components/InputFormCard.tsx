"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface InputFormCardProps {
  handleCalculate: (form: any) => void;
}

export default function InputFormCard({ handleCalculate }: InputFormCardProps) {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
  });
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleGender(gender: string) {
    setForm({ ...form, gender });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.gender) {
      alert("Silakan pilih jenis kelamin anak.");
      return;
    }
    handleCalculate(form);
    // Optionally, you can keep the router.push if you want to redirect after submit
    // router.push(`/result?status=${status}&zScore=${zScore !== null ? zScore : 0}`);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 w-full max-w-lg mx-auto mb-8 flex flex-col gap-6 border border-zinc-200"
      >
        <h2 className="text-2xl font-semibold text-center mb-2 text-zinc-800">Kalkulator Perhitungan</h2>
        <h3 className="text-xl text-center mb-2 text-orange-600 font-medium">Status Perkembangan Gizi Anak</h3>
        <div className="text-center text-lg mb-4 text-zinc-700">Anak Anda :</div>
        <div className="flex justify-center gap-12 mb-4">
          <div className="flex flex-col items-center">
            <button
              type="button"
              className={`rounded-full border-2 ${form.gender === "male" ? "border-orange-500" : "border-transparent"} bg-transparent focus:outline-none mb-2`}
              onClick={() => handleGender("male")}
              aria-label="Laki-laki"
            >
              <Image src="/boy.png" alt="Laki-laki" width={100} height={100} />
            </button>
            <span className="text-sm mt-1 text-zinc-700">Laki-laki</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              className={`rounded-full border-2 ${form.gender === "female" ? "border-orange-500" : "border-transparent"} bg-transparent focus:outline-none mb-2`}
              onClick={() => handleGender("female")}
              aria-label="Perempuan"
            >
              <Image src="/girl.png" alt="Perempuan" width={100} height={100} />
            </button>
            <span className="text-sm mt-1 text-zinc-700">Perempuan</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-zinc-700">Nama Anak</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
              placeholder="Masukkan nama anak"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-1 text-zinc-700">Usia Anak (0-60 bulan)</label>
            <div className="flex gap-1">
              <input
                name="age"
                type="number"
                min="0"
                max="60"
                value={form.age}
                onChange={handleChange}
                className="w-20 border border-zinc-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-center text-black appearance-none"
                required
              />
              <span className="bg-orange-500 text-white rounded px-2 py-1 text-sm font-semibold">Bulan</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-1 text-zinc-700">Berat Badan Anak</label>
            <div className="flex gap-1">
              <input
                name="weight"
                type="number"
                step="0.01"
                value={form.weight}
                onChange={handleChange}
                className="w-20 border border-zinc-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-center text-black appearance-none"
                required
              />
              <span className="bg-orange-500 text-white rounded px-2 py-1 text-sm font-semibold">Kg</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-1 text-zinc-700">Tinggi Badan Anak</label>
            <div className="flex gap-1">
              <input
                name="height"
                type="number"
                step="0.1"
                value={form.height}
                onChange={handleChange}
                className="w-20 border border-zinc-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-center text-black appearance-none"
                required
              />
              <span className="bg-orange-500 text-white rounded px-2 py-1 text-sm font-semibold">Cm</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2 mb-4 text-center font-semibold">
          <span className="font-bold">Note:</span> Jika anak Anda belum bisa berdiri, pengukuran dilakukan dengan cara berbaring.
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors flex items-center justify-center mx-auto text-lg w-40"
        >
          Hitung
        </button>
      </form>
      <div className="text-center text-zinc-400 text-sm mb-8" style={{ marginTop: '-1.5rem' }}>
        By Vanesa Tangketasik
      </div>
    </>
  );
}