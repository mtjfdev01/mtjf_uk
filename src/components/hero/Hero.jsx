import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import change_hero_qurbani from '../../assets/img/hero/change_hero_qurbani.webp'
import hero_qurbani_mobile from '../../assets/img/hero/hero_qurbani_mobile.webp'
import change_hero_health from '../../assets/img/hero/change_hero_health.webp'
import hero_health_mobile from '../../assets/img/hero/hero_health_mobile.webp'
import './hero.css'

const HERO_IMAGES = [
  { desktop: change_hero_qurbani, mobile: hero_qurbani_mobile },
  { desktop: change_hero_health, mobile: hero_health_mobile },
]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 10000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
  }

  const currentImage = HERO_IMAGES[currentIndex]

  return (
    <div>
     

      {currentImage.link ? (
        <>
          <Link to={currentImage.link} className='banner_img d-none md:d-block' key={`desktop-${currentIndex}`}>
            <img src={currentImage.desktop} alt="hero background" style={{width:"100%" , height:"auto"}} />
          </Link>
          <div className='banner_img--mobile sm:d-block md:d-none' key={`mobile-${currentIndex}`}>
            <Link to={currentImage.link} className='banner_img'>
              <img src={currentImage.mobile} alt="hero background" style={{width:"100%"}} />  
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className='banner_img d-none md:d-block' key={`desktop-${currentIndex}`}>
            <img src={currentImage.desktop} alt="hero background" style={{width:"100%" , height:"auto"}} />
          </div>
          <div className='banner_img--mobile sm:d-block md:d-none' key={`mobile-${currentIndex}`} >
            <img src={currentImage.mobile} alt="hero background" style={{width:"100%"}} />
          </div>
        </>
      )}

      <div className="hero-nav-container">
        <button
          type="button"
          className="slider-nav-btn slider-nav-prev hero-nav-btn"
          onClick={handlePrev}
          aria-label="Previous"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          type="button"
          className="slider-nav-btn slider-nav-next hero-nav-btn"
          onClick={handleNext}
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Hero