import { useState } from "react";
import { InputBox } from "./components/InputBox";
import { ResultCard } from "./components/ResultCard";
import { ChartSection } from "./components/ChartSection";
import { HistoryPanel } from "./components/HistoryPanel";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Sparkles } from "lucide-react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter a tweet to analyze.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://ml-backend-sentiment-analysis.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to analyze sentiment. Please try again later.");
      }

      const data = await res.json();
      
      const newEntry = { ...data, text };
      setResult(newEntry);
      setHistory((prev) => [newEntry, ...prev]);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-2/3 h-2/3 rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-2/3 h-2/3 rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-start relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 text-blue-400 rounded-2xl mb-4 border border-blue-500/20 shadow-lg shadow-blue-500/5">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
            Tweet Sentiment Analyzer
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Harness the power of machine learning to instantly detect the sentiment behind any tweet or text snippet.
          </p>
        </div>

        {/* Input Form */}
        <InputBox 
          text={text} 
          setText={setText} 
          onSubmit={handleSubmit} 
          loading={loading} 
        />

        {/* Error Alert */}
        {error && (
          <div className="w-full max-w-2xl mt-6 animate-fade-in">
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Results Container */}
        {result && !error && (
          <div className="w-full flex flex-col items-center mt-12 gap-8 w-full max-w-5xl">
            <ResultCard result={result} />
            <ChartSection result={result} />
          </div>
        )}

        {/* History Area */}
        <HistoryPanel history={history} />
        
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm bg-black/40 border-t border-white/5 relative z-10 backdrop-blur-md">
        <p>Built for production using Patience , Hardwork and Love By Ayan Mukhopadhyay❤️.</p>
      </footer>
    </div>
  );
}