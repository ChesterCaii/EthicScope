"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface EthicalScoreGaugeProps {
  score: number
  maxScore: number
}

export default function EthicalScoreGauge({ score, maxScore }: EthicalScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const percentage = (score / maxScore) * 100

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
      <div className="relative w-48 h-48">
        {/* Stylized sun gauge */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#FFF8E6"
            strokeWidth="4"
            strokeDasharray="301.59"
            strokeDashoffset="0"
          />

          {/* Progress ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#FFCC1A"
            strokeWidth="4"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (percentage / 100) * 301.59}
            initial={{ strokeDashoffset: 301.59 }}
            animate={{ strokeDashoffset: 301.59 - (percentage / 100) * 301.59 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Sun background circle */}
          <circle cx="50" cy="50" r="40" fill="#FFF8E6" stroke="#FFEDB3" strokeWidth="2" />

          {/* Sun rays - background */}
          {[...Array(12)].map((_, i) => (
            <line
              key={`ray-bg-${i}`}
              x1="50"
              y1="50"
              x2={50 + 55 * Math.cos((i * 30 * Math.PI) / 180)}
              y2={50 + 55 * Math.sin((i * 30 * Math.PI) / 180)}
              stroke="#FFEDB3"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}

          {/* Sun rays - foreground (based on score) */}
          {[...Array(12)].map((_, i) => {
            const rayPercentage = (i + 1) / 12
            return rayPercentage <= percentage / 100 ? (
              <motion.line
                key={`ray-fg-${i}`}
                x1="50"
                y1="50"
                x2={50 + 55 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={50 + 55 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="#FFCC1A"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              />
            ) : null
          })}

          {/* Sun inner circle - progress */}
          <circle cx="50" cy="50" r="30" fill="#FFE180" stroke="#FFCC1A" strokeWidth="2" />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="text-5xl font-extrabold text-orange-500">{animatedScore}</span>
              <span className="text-lg font-medium text-gray-500">/{maxScore}</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="text-sm font-bold text-orange-500 uppercase tracking-wide">
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
