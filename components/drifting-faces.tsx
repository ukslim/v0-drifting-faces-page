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
        variant: Math.floor(Math.random() * 1000000),
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

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function FaceIcon({ variant, size }: { variant: number; size: number }) {
  const eyeVariants = [
    // Normal eyes
    <g key="eye1">
      <circle cx="35" cy="40" r="5" fill="oklch(0.25 0.08 280)" />
      <circle cx="65" cy="40" r="5" fill="oklch(0.25 0.08 280)" />
    </g>,
    // Large eyes
    <g key="eye2">
      <circle cx="35" cy="38" r="6" fill="oklch(0.25 0.08 280)" />
      <circle cx="65" cy="38" r="6" fill="oklch(0.25 0.08 280)" />
    </g>,
    // Winking
    <g key="eye3">
      <path d="M 28 40 L 42 40" stroke="oklch(0.25 0.08 280)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="65" cy="40" r="5" fill="oklch(0.25 0.08 280)" />
    </g>,
    // Sleepy eyes
    <g key="eye4">
      <path d="M 28 42 L 42 42" stroke="oklch(0.25 0.08 280)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 58 42 L 72 42" stroke="oklch(0.25 0.08 280)" strokeWidth="3" strokeLinecap="round" />
    </g>,
    // Small eyes
    <g key="eye5">
      <circle cx="35" cy="40" r="4" fill="oklch(0.25 0.08 280)" />
      <circle cx="65" cy="40" r="4" fill="oklch(0.25 0.08 280)" />
    </g>,
    // Dot eyes
    <g key="eye6">
      <circle cx="35" cy="40" r="3" fill="oklch(0.25 0.08 280)" />
      <circle cx="65" cy="40" r="3" fill="oklch(0.25 0.08 280)" />
    </g>,
  ]

  const mouthVariants = [
    // Happy smile
    <path
      key="m1"
      d="M 30 60 Q 50 75 70 60"
      stroke="oklch(0.25 0.08 280)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />,
    // Big smile
    <path
      key="m2"
      d="M 35 62 Q 50 70 65 62"
      stroke="oklch(0.25 0.08 280)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />,
    // Surprised O
    <circle key="m3" cx="50" cy="65" r="8" fill="oklch(0.25 0.08 280)" />,
    // Small O
    <ellipse key="m4" cx="50" cy="65" rx="12" ry="6" fill="oklch(0.25 0.08 280)" />,
    // Straight line
    <path key="m5" d="M 40 62 L 60 62" stroke="oklch(0.25 0.08 280)" strokeWidth="3" strokeLinecap="round" />,
    // Slight smile
    <path
      key="m6"
      d="M 38 63 Q 50 68 62 63"
      stroke="oklch(0.25 0.08 280)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />,
  ]

  const eyeIndex = Math.floor(seededRandom(variant) * eyeVariants.length)
  const mouthIndex = Math.floor(seededRandom(variant + 1) * mouthVariants.length)
  const hasThinkingDots = seededRandom(variant + 2) < 0.2 // 20% chance (1 in 5)

  // Pick random face color
  const faceColors = [
    "oklch(0.85 0.08 280)",
    "oklch(0.88 0.06 220)",
    "oklch(0.90 0.04 250)",
    "oklch(0.82 0.05 260)",
    "oklch(0.86 0.07 240)",
  ]
  const colorIndex = Math.floor(seededRandom(variant + 3) * faceColors.length)

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full opacity-60">
      <circle cx="50" cy="50" r="45" fill={faceColors[colorIndex]} />
      {eyeVariants[eyeIndex]}
      {mouthVariants[mouthIndex]}
      {hasThinkingDots && (
        <>
          <circle cx="72" cy="30" r="3" fill="oklch(0.70 0.06 260)" opacity="0.6" />
          <circle cx="78" cy="22" r="4" fill="oklch(0.70 0.06 260)" opacity="0.4" />
        </>
      )}
    </svg>
  )
}
