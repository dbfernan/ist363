import { useState, useEffect, useRef } from 'react'

const images = [
  { src: '/media/image1.jpg', alt: 'David playing tennis' },
  { src: '/media/image2.jpg', alt: 'David playing tennis' },
  { src: '/media/image3.jpg', alt: 'David playing tennis' },
  { src: '/media/image4.jpg', alt: 'David with USTA trophy' },
  { src: '/media/image5.jpg', alt: 'David at US Open 2015' },
  { src: '/media/image6.jpg', alt: 'David on court' },
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const goTo = (n) => {
    setCurrent((n + images.length) % images.length)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 4000)
    return () => clearInterval(timerRef.current)
  }, [current])

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl border-2 border-lilac shadow-sm">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="w-full shrink-0 object-cover aspect-[3/4]"
          />
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-plum/70 hover:bg-plum text-white rounded-full w-8 h-8 flex items-center justify-center transition"
        aria-label="Previous image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-plum/70 hover:bg-plum text-white rounded-full w-8 h-8 flex items-center justify-center transition"
        aria-label="Next image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}
