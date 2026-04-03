import React from 'react'
import { Card, CardContent } from './ui/card'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export function ResultCard({ result }) {
  if (!result) return null;

  const isPositive = result.sentiment === 'Positive';
  const ColorIcon = isPositive ? CheckCircle2 : XCircle;
  const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
  const bgColorClass = isPositive ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20';
  
  // Format confidence to percentage if it's a decimal
  let formattedConfidence = result.confidence;
  if(typeof result.confidence === 'number' && result.confidence <= 1) {
    formattedConfidence = (result.confidence * 100).toFixed(1) + '%';
  } else if (typeof result.confidence === 'number') {
    formattedConfidence = result.confidence.toFixed(1) + '%';
  }

  return (
    <div className="w-full max-w-2xl animate-slide-up z-10 relative">
      <Card className={`glass-panel border overflow-hidden ${bgColorClass}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 ${colorClass}" />
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className={`p-4 rounded-full bg-black/20 mb-4 ${colorClass}`}>
            <ColorIcon className="w-12 h-12" />
          </div>
          <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-1">Sentiment</h2>
          <div className={`text-5xl font-extrabold tracking-tight mb-4 ${colorClass} drop-shadow-md`}>
            {result.sentiment}
          </div>
          <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full border border-white/5">
            <AlertCircle className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm font-medium">
              Confidence: <span className="text-white font-bold">{formattedConfidence}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
