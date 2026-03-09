import GrowthResult from "../components/GrowthResult";

export default function ResultPage({ searchParams }: { searchParams: { status: string; zScore: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <main className="flex flex-col items-center w-full px-2 md:px-8 py-6 md:py-12">
        <GrowthResult status={searchParams.status as any} zScore={parseFloat(searchParams.zScore)} />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors flex items-center justify-center mx-auto text-lg w-40 mt-6"
          onClick={() => window.location.href = "/"}
        >
          Data Baru
        </button>
      </main>
    </div>
  );
}
