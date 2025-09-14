"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Sparkles, Loader2 } from "lucide-react"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onAnalyze: () => void
  canAnalyze: boolean
  isAnalyzing: boolean
}

export function TextInput({ value, onChange, onAnalyze, canAnalyze, isAnalyzing }: TextInputProps) {
  const [focused, setFocused] = useState(false)

  const examplePrompts = [
    "Business meeting",
    "Casual date night",
    "Job interview",
    "Wedding guest",
    "Weekend brunch",
    "Night out",
  ]

  const handleExampleClick = (example: string) => {
    onChange(example)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="event-description" className="text-sm font-medium">
          What's the occasion? <span className="text-muted-foreground font-normal">(helps with context)</span>
        </Label>
        <Textarea
          id="event-description"
          placeholder="Leave blank for general style feedback, or describe the event/vibe you're going for..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`min-h-[100px] resize-none transition-all ${focused ? "ring-2 ring-accent/20" : ""}`}
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Quick examples:</p>
        <div className="grid grid-cols-2 gap-2">
          {examplePrompts.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-8 justify-start text-left bg-transparent hover:bg-accent/10"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </Button>
          ))}
        </div>
      </div>

      <Button
        onClick={onAnalyze}
        disabled={!canAnalyze || isAnalyzing}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        size="lg"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Your Drip...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Analyze My Drip
          </>
        )}
      </Button>

      {!canAnalyze && (
        <p className="text-sm text-muted-foreground text-center">
          Upload an image to get started - event description is optional!
        </p>
      )}
    </div>
  )
}
