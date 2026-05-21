import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import './index.css'
import { FaLinkedinIn } from "react-icons/fa";

const StickyBar = () => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle window resize and initial mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      // Reset phone number visibility when switching from mobile to desktop
      if (window.innerWidth > 768) {
        setShowPhoneNumber(false)
      }
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handlePhoneClick = (event) => {
    // On mobile: toggle to show phone number
    if (isMobile && !showPhoneNumber) {
      event.preventDefault()
      setShowPhoneNumber(true)
    }
    // If phone number is already visible, let the default tel: link behavior proceed (call)
  }

  const handleEmailClick = (event) => {
    // On mobile: if phone is showing, toggle back to email
    if (isMobile && showPhoneNumber) {
      event.preventDefault()
      setShowPhoneNumber(false)
    }
    // Otherwise, let the default email link behavior proceed
  }

  return (
    <div className="sticky_bar_container">
      <div className={`sticky_bar-content ${!isMobile ? 'container' : ''}`}>
        <div className={`sticky_bar-contact ${showPhoneNumber ? 'show-phone' : ''}`}>
          <a>
            <FaEnvelope />
          </a>
          <a
            // href="tel:061-111-786-853"
            className="sticky_bar-link sticky_bar-phone-link"

          >
            <FaPhone />
            <span className="sticky_bar-phone-number">
            
            </span>
          </a>
        </div>


        <div className="sticky_bar-social">
          <a >
            <FaInstagram />
          </a>
          <a>
            <FaFacebookF />
          </a>
          <a>
            <FaYoutube />
          </a>
          <a>
            <FaLinkedinIn />
          </a>
          
        </div>
        <div className="sticky_bar-international">
          <a
          >
             Donate Globally
          </a>
        </div> 
      </div>
    </div>
  )
}

export default StickyBar