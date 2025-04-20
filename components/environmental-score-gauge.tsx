"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface EnvironmentalScoreGaugeProps {
  score: number
  maxScore: number
}

export default function EnvironmentalScoreGauge({ score, maxScore }: EnvironmentalScoreGaugeProps) {
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
        {/* Outer ring */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#E6F7E6"
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
            stroke="#58C358"
            strokeWidth="4"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (percentage / 100) * 301.59}
            initial={{ strokeDashoffset: 301.59 }}
            animate={{ strokeDashoffset: 301.59 - (percentage / 100) * 301.59 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Leaf background */}
          <path
            d="M50,10 C20,10 10,40 10,70 C40,100 80,80 90,50 C90,20 80,10 50,10 Z"
            fill="#E6F7E6"
            stroke="#C2EAC2"
            strokeWidth="2"
          />

          {/* Leaf veins - background */}
          <path d="M50,10 C50,40 50,70 50,90" fill="none" stroke="#C2EAC2" strokeWidth="2" />
          <path d="M50,30 C40,40 30,50 20,60" fill="none" stroke="#C2EAC2" strokeWidth="2" />
          <path d="M50,30 C60,40 70,50 80,60" fill="none" stroke="#C2EAC2" strokeWidth="2" />
          <path d="M50,50 C40,55 30,60 20,70" fill="none" stroke="#C2EAC2" strokeWidth="2" />
          <path d="M50,50 C60,55 70,60 80,70" fill="none" stroke="#C2EAC2" strokeWidth="2" />

          {/* Leaf fill based on score */}
          <clipPath id="score-clip">
            <motion.rect
              x="0"
              y={100}
              width="100"
              height="100"
              initial={{ y: 100 }}
              animate={{ y: 100 - percentage }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </clipPath>
          <path
            d="M50,10 C20,10 10,40 10,70 C40,100 80,80 90,50 C90,20 80,10 50,10 Z"
            fill="#58C358"
            clipPath="url(#score-clip)"
          />

          {/* Leaf veins - foreground */}
          <g clipPath="url(#score-clip)">
            <path d="M50,10 C50,40 50,70 50,90" fill="none" stroke="#3EA63E" strokeWidth="2" />
            <path d="M50,30 C40,40 30,50 20,60" fill="none" stroke="#3EA63E" strokeWidth="2" />
            <path d="M50,30 C60,40 70,50 80,60" fill="none" stroke="#3EA63E" strokeWidth="2" />
            <path d="M50,50 C40,55 30,60 20,70" fill="none" stroke="#3EA63E" strokeWidth="2" />
            <path d="M50,50 C60,55 70,60 80,70" fill="none" stroke="#3EA63E" strokeWidth="2" />
          </g>
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="bg-white bg-opacity-80 rounded-full px-4 py-2 shadow-md"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="text-5xl font-extrabold text-green-600">{animatedScore}</span>
            <span className="text-lg font-medium text-gray-500">/{maxScore}</span>
          </motion.div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="text-sm font-bold text-green-600 uppercase tracking-wide">
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
