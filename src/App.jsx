import { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://ml-backend-sentiment-analysis.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();

      setResult(data);
      setHistory((prev) => [data, ...prev]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const chartData = result && {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: [result.score, 1 - result.score],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10">

      <h1 className="text-4xl font-bold text-center mb-6">
        Sentiment Analyzer
      </h1>

      {/* Input */}
      <div className="flex flex-col items-center gap-4">
        <textarea
          className="w-2/3 p-4 rounded-xl text-black"
          placeholder="Enter your tweet..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Analyze
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-4 animate-pulse">Analyzing...</p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-10 text-center animate-fade-in">
          <h2
            className={`text-2xl font-bold ${
              result.sentiment === "Positive"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {result.sentiment}
          </h2>

          <p>Confidence: {result.confidence}</p>

          <div className="flex justify-center gap-10 mt-6">
            <div className="w-60">
              <Pie data={chartData} />
            </div>
            <div className="w-72">
              <Bar data={chartData} />
            </div>
          </div>
        </div>
      )}

      {/* History */}
      <div className="mt-12">
        <h3 className="text-xl mb-4">History</h3>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-gray-700 p-3 rounded-lg flex justify-between"
            >
              <span>{item.input}</span>
              <span
                className={
                  item.sentiment === "Positive"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {item.sentiment}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}