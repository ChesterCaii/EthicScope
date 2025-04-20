"use client"

import { useEffect, useState } from "react"

interface ScoreGaugeProps {
  score: number
  maxScore: number
  color: "blue" | "green" | "orange"
}

export default function ScoreGauge({ score, maxScore, color }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  // Color mapping
  const colorMap = {
    blue: {
      primary: "text-blue-500",
      secondary: "text-blue-200",
      bg: "bg-blue-500",
    },
    green: {
      primary: "text-green-500",
      secondary: "text-green-200",
      bg: "bg-green-500",
    },
    orange: {
      primary: "text-orange-500",
      secondary: "text-orange-200",
      bg: "bg-orange-500",
    },
  }

  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 40 // 40 is the radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  useEffect(() => {
    // Animate the score counter
    const timer = setTimeout(() => {
      if (animatedScore < score) {
        setAnimatedScore((prev) => Math.min(prev + 1, score))
      }
    }, 20)

    return () => clearTimeout(timer)
  }, [animatedScore, score])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className={colorMap[color].secondary}
          />

          {/* Foreground circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={colorMap[color].primary}
            transform="rotate(-90 50 50)"
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className={`text-3xl font-bold ${colorMap[color].primary}`}>{animatedScore}</span>
            <span className="text-sm text-gray-500">/{maxScore}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-center">
        <div className={`text-sm font-medium ${colorMap[color].primary}`}>
          {percentage >= 80
            ? "Excellent"
            : percentage >= 60
              ? "Good"
              : percentage >= 40
                ? "Average"
                : "Needs Improvement"}
        </div>
      </div>
    </div>
  )
}
