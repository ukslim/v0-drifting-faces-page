"use client"

import { useEffect, useState } from "react"

interface Face {
  id: number
  top: number
  duration: number
  delay: number
  size: number
  direction: "left" | "right"
  variant: number
}

export function DriftingFaces({ isPoopMode = false }: { isPoopMode?: boolean }) {
  const [faces, setFaces] = useState<Face[]>([])

  useEffect(() => {
    // Generate random faces
    const generatedFaces: Face[] = Array.from({ length: 12 }, (_, i) => {
      const direction = Math.random() > 0.5 ? "left" : "right"
      const duration = 15 + Math.random() * 25 // 15-40 seconds
      // This gives each face an initial velocity matching their position
      const randomProgress = Math.random() // 0 to 1 along the animation cycle
      const delay = -randomProgress * duration // Negative delay starts animation mid-cycle

      return {
        id: i,
        top: Math.random() * 100,
        duration,
        delay,
        size: 60 + Math.random() * 80, // 60-140px
        direction,
        variant: Math.floor(Math.random() * 5), // 5 face variants
      }
    })
    setFaces(generatedFaces)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {faces.map((face) => (
        <div
          key={face.id}
          className="absolute"
          style={{
            top: `${face.top}%`,
            width: `${face.size}px`,
            height: `${face.size}px`,
            animation: `drift-${face.direction} ${face.duration}s linear ${face.delay}s infinite`,
          }}
        >
          {isPoopMode ? (
            <div
              className="flex h-full w-full items-center justify-center opacity-60"
              style={{ fontSize: `${face.size}px` }}
            >
              💩
            </div>
          ) : (
            <FaceIcon variant={face.variant} size={face.size} />
          )}
        </div>
      ))}
    </div>
  )
}

function FaceIcon({ variant, size }: { variant: number; size: number }) {
  const faceVariants = [
    // Happy face
    <svg key="happy" viewBox="0 0 100 100" className="h-full w-full opacity-60">
      <circle cx="50" cy="50" r="45" fill="oklch(0.85 0.08 280)" />
      <circle cx="35" cy="40" r="5" fill="oklch(0.25 0.08 280)" />
      <circle cx="65" cy="40" r="5" fill="oklch(0.25 0.08 280)" />
      <path d="M 30 60 Q 50 75 70 60" stroke="oklch(0.25 0.08 280)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>,
    // Surprised face
    <svg key="surprised" viewBox="0 0 100 100" className="h-full w-full opacity-60">
      <circle cx="50" cy="50" r="45" fill="oklch(0.88 0.06 220)" />
      <circle cx="35" cy="38" r="6" fill="oklch(0.25 0.08 280)" />
      <circle cx="65" cy="38" r="6" fill="oklch(0.25 0.08 280)" />
      <circle cx="50" cy="65" r="8" fill="oklch(0.25 0.08 280)" />
    </svg>,
    // Winking face
    <svg key="winking" viewBox="0 0 100 100" className="h-full w-full opacity-60">
      <circle cx="50" cy="50" r="45" fill="oklch(0.90 0.04 250)" />
      <path d="M 28 40 L 42 40" stroke="oklch(0.25 0.08 280)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="65" cy="40" r="5" fill="oklch(0.25 0.08 280)" />
      <path d="M 35 62 Q 50 70 65 62" stroke="oklch(0.25 0.08 280)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>,
    // Sleepy face
    <svg key="sleepy" viewBox="0 0 100 100" className="h-full w-full opacity-60">
      <circle cx="50" cy="50" r="45" fill="oklch(0.82 0.05 260)" />
      <path d="M 28 42 L 42 42" stroke="oklch(0.25 0.08 280)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 58 42 L 72 42" stroke="oklch(0.25 0.08 280)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="50" cy="65" rx="12" ry="6" fill="oklch(0.25 0.08 280)" />
    </svg>,
    // Thinking face
    <svg key="thinking" viewBox="0 0 100 100" className="h-full w-full opacity-60">
      <circle cx="50" cy="50" r="45" fill="oklch(0.86 0.07 240)" />
      <circle cx="35" cy="40" r="4" fill="oklch(0.25 0.08 280)" />
      <circle cx="65" cy="40" r="4" fill="oklch(0.25 0.08 280)" />
      <path d="M 40 62 L 60 62" stroke="oklch(0.25 0.08 280)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="72" cy="30" r="3" fill="oklch(0.70 0.06 260)" opacity="0.6" />
      <circle cx="78" cy="22" r="4" fill="oklch(0.70 0.06 260)" opacity="0.4" />
    </svg>,
  ]

  return faceVariants[variant % faceVariants.length]
}
