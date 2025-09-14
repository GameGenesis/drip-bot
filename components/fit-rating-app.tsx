"use client"

import { useState } from "react"
import { ImageUpload } from "./image-upload"
import { TextInput } from "./text-input"
import { RatingDisplay } from "./rating-display"
import { SuggestionsDisplay } from "./suggestions-display"
import { Card } from "./ui/card"

interface FitAnalysis {
  rating: number
  suggestions: string[]
  recommendations: Array<{
    name: string
    price: string
    store: string
    image: string
  }>
  categories: {
    coordination: number
    color: number
    fit: number
    style: number
  }
}

export function FitRatingApp() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [eventText, setEventText] = useState("")
  const [analysis, setAnalysis] = useState<FitAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!uploadedImage) return

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-fit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedImage,
          eventText: eventText || "General style feedback",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze fit")
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Drip Bot</h1>
        <p className="text-muted-foreground text-lg">AI-powered style analysis for your fits</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Your Fit</h2>
          <ImageUpload onImageUpload={setUploadedImage} uploadedImage={uploadedImage} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Event Context <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
          </h2>
          <TextInput
            value={eventText}
            onChange={setEventText}
            onAnalyze={handleAnalyze}
            canAnalyze={!!uploadedImage}
            isAnalyzing={isAnalyzing}
          />
        </Card>
      </div>

      {analysis && (
        <div className="space-y-6">
          <RatingDisplay aiRating={analysis.rating} categories={analysis.categories} />
          <SuggestionsDisplay suggestions={analysis.suggestions} recommendations={analysis.recommendations} />
        </div>
      )}
    </div>
  )
}
