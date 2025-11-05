"use client"

import { useState } from "react"
import { DriftingFaces } from "@/components/drifting-faces"
import { CloudBackground } from "@/components/cloud-background"

export default function Home() {
  const [isPoopMode, setIsPoopMode] = useState(false)

  return (
    <main className="relative min-h-screen overflow-hidden">
      <CloudBackground />
      <DriftingFaces isPoopMode={isPoopMode} />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-balance font-sans text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Drifting{" "}
            <span
              onClick={() => setIsPoopMode(!isPoopMode)}
              className="cursor-pointer transition-colors hover:text-primary"
            >
              {isPoopMode ? "Faeces" : "Faces"}
            </span>
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground md:text-xl">
            Watch the {isPoopMode ? "faeces" : "faces"} float by
          </p>
        </div>
      </div>
    </main>
  )
}
