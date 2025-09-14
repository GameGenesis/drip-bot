"use client"

import { useEffect, useState } from "react"
import { Card } from "./ui/card"

interface RatingDisplayProps {
  aiRating: number
  categories: {
    coordination: number
    color: number
    fit: number
    style: number
  }
}

export function RatingDisplay({ aiRating, categories }: RatingDisplayProps) {
  const [animatedRating, setAnimatedRating] = useState(0)
  const [animatedCategories, setAnimatedCategories] = useState({
    coordination: 0,
    color: 0,
    fit: 0,
    style: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedRating(aiRating)
      setAnimatedCategories(categories)
    }, 300)
    return () => clearTimeout(timer)
  }, [aiRating, categories])

  const getRatingEmoji = (score: number) => {
    if (score <= 2) return "💀"
    if (score <= 4) return "😬"
    if (score <= 6) return "😐"
    if (score <= 8) return "😊"
    return "🔥"
  }

  const getRatingText = (score: number) => {
    if (score <= 2) return "Needs Major Work"
    if (score <= 4) return "Room for Improvement"
    if (score <= 6) return "Decent Fit"
    if (score <= 8) return "Great Look"
    return "Fire Outfit!"
  }

  const ProgressBar = ({ value, max = 10 }: { value: number; max?: number }) => {
    const percentage = (value / max) * 100
    const getBarColor = (score: number) => {
      if (score <= 2) return "#9ca3af" // grey for low scores
      if (score >= 9) return "#f97316" // full orange for high scores
      // Interpolate between grey and orange for middle scores
      const ratio = (score - 2) / 7 // normalize to 0-1 range
      const greyR = 156,
        greyG = 163,
        greyB = 175
      const orangeR = 249,
        orangeG = 115,
        orangeB = 22
      const r = Math.round(greyR + (orangeR - greyR) * ratio)
      const g = Math.round(greyG + (orangeG - greyG) * ratio)
      const b = Math.round(greyB + (orangeB - greyB) * ratio)
      return `rgb(${r}, ${g}, ${b})`
    }

    return (
      <div className="relative w-full h-6 bg-gray-200 rounded-xl overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out rounded-xl"
          style={{
            width: `${percentage}%`,
            backgroundColor: getBarColor(value),
          }}
        />
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm">💀</div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">🔥</div>
      </div>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* AI Rating Section */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Drip Bot Analysis</h2>
            <p className="text-muted-foreground">AI analysis of your outfit coordination and style</p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <span className="text-6xl" role="img" aria-label="rating emoji">
              {getRatingEmoji(animatedRating)}
            </span>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">{animatedRating}/10</div>
              <div className="text-lg font-medium text-accent">{getRatingText(animatedRating)}</div>
            </div>
          </div>

          <div className="px-8">
            <ProgressBar value={animatedRating} />
          </div>
        </div>

        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold text-center">Detailed Breakdown</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Outfit Coordination</span>
                <span className="text-sm font-bold text-accent">{animatedCategories.coordination}/10</span>
              </div>
              <ProgressBar value={animatedCategories.coordination} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Color Harmony</span>
                <span className="text-sm font-bold text-accent">{animatedCategories.color}/10</span>
              </div>
              <ProgressBar value={animatedCategories.color} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Fit Quality</span>
                <span className="text-sm font-bold text-accent">{animatedCategories.fit}/10</span>
              </div>
              <ProgressBar value={animatedCategories.fit} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Style Appropriateness</span>
                <span className="text-sm font-bold text-accent">{animatedCategories.style}/10</span>
              </div>
              <ProgressBar value={animatedCategories.style} />
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Drip Bot analyzes your outfit across multiple dimensions to provide comprehensive style feedback.
          </p>
        </div>
      </div>
    </Card>
  )
}
