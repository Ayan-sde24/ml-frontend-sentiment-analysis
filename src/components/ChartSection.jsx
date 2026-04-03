import React from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function ChartSection({ result }) {
  if (!result) return null;

  const score = result.score || 0;
  const negativeScore = 1 - score;
  
  const isPositive = result.sentiment === 'Positive';

  const chartData = {
    labels: ['Positive', 'Negative'],
    datasets: [
      {
        label: 'Probability',
        data: [score, negativeScore],
        backgroundColor: [
          'rgba(74, 222, 128, 0.8)', // green-400
          'rgba(248, 113, 113, 0.8)', // red-400
        ],
        borderColor: [
          'rgba(74, 222, 128, 1)',
          'rgba(248, 113, 113, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Sentiment Score'],
    datasets: [
      {
        label: 'Score',
        data: [score],
        backgroundColor: isPositive ? 'rgba(74, 222, 128, 0.8)' : 'rgba(248, 113, 113, 0.8)',
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  const barOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 1,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      },
      y: {
        grid: { display: false },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      }
    },
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up z-10 relative mt-6" style={{ animationDelay: '0.1s' }}>
      <Card className="glass-panel border-white/5 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-gray-300 text-center text-sm uppercase tracking-wider font-semibold">Probability Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-6 h-64">
          <div className="w-full h-full flex justify-center">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel border-white/5 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-gray-300 text-center text-sm uppercase tracking-wider font-semibold">Score Magnitude</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-6 h-64">
          <div className="w-full h-full">
            <Bar data={barData} options={barOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
