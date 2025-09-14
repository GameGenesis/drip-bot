"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ExternalLink, ShoppingBag, Lightbulb } from "lucide-react"

interface Recommendation {
  name: string
  price: string
  store: string
  image: string
}

interface SuggestionsDisplayProps {
  suggestions: string[]
  recommendations: Recommendation[]
}

export function SuggestionsDisplay({ suggestions, recommendations }: SuggestionsDisplayProps) {
  return (
    <div className="space-y-6">

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="h-5 w-5 text-accent" />
          <h3 className="text-xl font-semibold">Style Suggestions</h3>
        </div>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-xs font-medium text-accent">
                {index + 1}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Recommended Items</h3>
          <Badge variant="secondary" className="ml-2">
            Nearby Stores
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-muted/20 relative">
                <img
                  src={"/placeholder.svg?height=200&width=200"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.store}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                  <Button size="sm" className="text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Recommendations are based on your location, budget preferences, and style analysis. Prices and availability
            may vary.
          </p>
        </div>
      </Card>
    </div>
  )
}
