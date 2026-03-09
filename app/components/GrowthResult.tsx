interface GrowthResultProps {
  status: string;
  zScore: number | null;
  onNewData?: () => void;
}

export default function GrowthResult({ status, zScore, onNewData }: GrowthResultProps) {
  if (!status && zScore === null) return null;
  return (
    <section className="bg-blue-50 rounded-lg shadow-md p-6 w-full max-w-md mx-auto mb-8 flex flex-col items-center">
      <h4 className="text-lg font-semibold text-blue-600 mb-2">Growth Result</h4>
      <div className="text-xl font-bold mb-2">
        Status: <span className={
          status === "Normal" ? "text-green-600" : status === "Underweight" ? "text-yellow-600" : status === "Overweight" ? "text-red-600" : "text-zinc-700"
        }>{status}</span>
      </div>
      <div className="text-base text-zinc-700">
        Z-score: <span className="font-mono text-blue-700">{zScore !== null ? zScore.toFixed(2) : "-"}</span>
      </div>
      {onNewData && (
        <button
          className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors mx-auto mt-4"
          onClick={onNewData}
        >
          Data Baru
        </button>
      )}
    </section>
  );
}
