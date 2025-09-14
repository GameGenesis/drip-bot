"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (imageUrl: string | null) => void
  uploadedImage: string | null
}

export function ImageUpload({ onImageUpload, uploadedImage }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const imageFile = files.find((file) => file.type.startsWith("image/"))

      if (imageFile) {
        const reader = new FileReader()
        reader.onload = (e) => {
          onImageUpload(e.target?.result as string)
        }
        reader.readAsDataURL(imageFile)
      }
    },
    [onImageUpload],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onImageUpload(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    onImageUpload(null)
  }

  return (
    <div className="space-y-4">
      {!uploadedImage ? (
        <Card
          className={`border-2 border-dashed p-8 text-center transition-colors cursor-pointer ${
            isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Your Outfit Photo</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your full-body outfit photo here, or click to browse
          </p>
          <Button variant="outline">Choose File</Button>
          <input id="file-input" type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
        </Card>
      ) : (
        <div className="relative">
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt="Uploaded outfit"
            className="w-full h-64 object-cover rounded-lg"
          />
          <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={removeImage}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
