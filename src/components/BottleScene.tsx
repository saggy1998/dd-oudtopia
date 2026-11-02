import { useRef, useEffect } from 'react'

interface BottleSceneProps {
  activeVideo: string
}

export default function BottleScene({ activeVideo }: BottleSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {
        // Autoplay fallback if browser blocks
      })
    }
  }, [activeVideo])

  return (
    <div className="bottle-video-container">
      <video
        ref={videoRef}
        src={activeVideo}
        autoPlay
        loop
        muted
        playsInline
        className="bottle-video"
      />
    </div>
  )
}
