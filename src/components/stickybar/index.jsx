import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import './index.css'
import { FaLinkedinIn } from "react-icons/fa";

const StickyBar = () => {
  const [isMobile, setIsMobile] = useState(false)

  // Handle window resize and initial mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="sticky_bar_container">
      <div className={`sticky_bar-content ${!isMobile ? 'container' : ''}`}>
        <div className="sticky_bar-contact">
          <a href="mailto:info@mtjfoundation.org" aria-label="Email">
            <FaEnvelope />
          </a>
          <a
            href="tel:061111786853"
            className="sticky_bar-link sticky_bar-phone-link"
            aria-label="Phone"
          >
            <FaPhone />
            <span className="sticky_bar-phone-number">
            
            </span>
          </a>
        </div>


        <div className="sticky_bar-social">
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          
        </div>
        <div className="sticky_bar-international">
          <a href="#" aria-label="Donate globally">
             Donate Globally
          </a>
        </div> 
      </div>
    </div>
  )
}

export default StickyBar
