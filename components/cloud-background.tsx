"use client"

import { useEffect, useRef } from "react"

interface Cloud {
  x: number
  y: number
  width: number
  height: number
  speed: number
  opacity: number
}

export function CloudBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Generate clouds
    const clouds: Cloud[] = []
    const cloudCount = 15

    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 80 + Math.random() * 120,
        height: 40 + Math.random() * 60,
        speed: 0.1 + Math.random() * 0.3,
        opacity: 0.3 + Math.random() * 0.4,
      })
    }

    // Draw a soft cloud shape
    const drawCloud = (cloud: Cloud) => {
      ctx.save()
      ctx.globalAlpha = cloud.opacity

      // Create gradient for soft edges
      const gradient = ctx.createRadialGradient(
        cloud.x + cloud.width / 2,
        cloud.y + cloud.height / 2,
        0,
        cloud.x + cloud.width / 2,
        cloud.y + cloud.height / 2,
        cloud.width / 1.5,
      )
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient

      // Draw multiple overlapping circles to create cloud shape
      const circles = [
        { x: 0, y: cloud.height * 0.4, r: cloud.width * 0.25 },
        { x: cloud.width * 0.25, y: 0, r: cloud.width * 0.3 },
        { x: cloud.width * 0.5, y: cloud.height * 0.2, r: cloud.width * 0.35 },
        { x: cloud.width * 0.7, y: 0, r: cloud.width * 0.28 },
        { x: cloud.width * 0.85, y: cloud.height * 0.3, r: cloud.width * 0.25 },
      ]

      circles.forEach((circle) => {
        ctx.beginPath()
        ctx.arc(cloud.x + circle.x, cloud.y + circle.y, circle.r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      // Clear with sky blue background
      ctx.fillStyle = "#87CEEB"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed

        // Wrap around when cloud goes off screen
        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width
          cloud.y = Math.random() * canvas.height
        }

        drawCloud(cloud)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden="true" />
}
