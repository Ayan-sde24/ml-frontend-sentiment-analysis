import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { History, CheckCircle2, XCircle } from 'lucide-react'

export function HistoryPanel({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mt-10 animate-slide-up z-10 relative" style={{ animationDelay: '0.2s' }}>
      <Card className="glass-panel border-white/5 bg-gray-900/50 backdrop-blur-xl">
        <CardHeader className="border-b border-white/10 pb-4">
          <CardTitle className=" flex items-center gap-2 text-gray-200">
            <History className="w-5 h-5 text-blue-400" />
            Prediction History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-72 w-full rouned-b-lg p-4">
            <div className="flex flex-col gap-3">
              {history.map((item, idx) => {
                const isPositive = item.sentiment === 'Positive';
                const Icon = isPositive ? CheckCircle2 : XCircle;
                const textColor = isPositive ? 'text-green-400' : 'text-red-400';
                const bgColor = isPositive ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20';

                return (
                  <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:bg-black/60 transition-colors gap-4">
                    <p className="text-gray-300 text-sm italic truncate max-w-xl">
                      "{item.text || item.input}"
                    </p>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${bgColor} ${textColor} shrink-0`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">{item.sentiment}</span>
                      <span className="text-xs opacity-75ml-1">
                        ({(item.score * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
