import { useRef, useEffect } from 'react'

export default function BottleScene() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay fallback if browser blocks
      })
    }
  }, [])

  return (
    <div className="bottle-video-container">
      <video
        ref={videoRef}
        src="/wedding_card.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="bottle-video"
      />
    </div>
  )
}
