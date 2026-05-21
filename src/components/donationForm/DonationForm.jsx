import { useState } from 'react'
import './DonationForm.css'

const DonationForm = ({
  formId,
  title = 'Contact Us',
  layout = 'vertical',
  className = '',
  onSubmit = (data) => console.log('Contact form submitted:', data),
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      return
    }

    if (formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      setErrorMessage('Please enter a valid phone number')
      return
    }

    if (!formData.subject.trim()) {
      setErrorMessage('Please enter a subject')
      return
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please write a message')
      return
    }

    onSubmit({ ...formData })
    setSuccessMessage('Your message has been sent successfully!')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div
      id={formId}
      className={`donation-form donation-form--${layout} contact-us-form ${className} mt-32 mb-32`}
    >
      <div className="donation-form-card">
        <h3 className="donation-form-title h2">{title}</h3>

        <form onSubmit={handleSubmit} className="donation-form-body">
          {errorMessage && (
            <div className="donation-form-error">{errorMessage}</div>
          )}
          {successMessage && (
            <div
              className="donation-form-error"
              style={{ backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' }}
            >
              {successMessage}
            </div>
          )}

          {/* Row 1 — Name · Email · Phone */}
          <div className="donation-form-row">
            <div className="donation-form-group">
              <label className="donation-form-label">Name</label>
              <input
                type="text"
                className="donation-form-input"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="donation-form-group">
              <label className="donation-form-label">Email</label>
              <input
                type="email"
                className="donation-form-input"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="donation-form-group">
              <label className="donation-form-label">Phone</label>
              <input
                type="tel"
                className="donation-form-input"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Row 2 — Subject · Message · Submit */}
          <div className="donation-form-row mt-24">
            <div className="donation-form-group">
              <label className="donation-form-label">Subject</label>
              <input
                type="text"
                className="donation-form-input"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
              />
            </div>

            <div className="donation-form-group" style={{ flex: 2 }}>
              <label className="donation-form-label">Message</label>
              <textarea
                className="donation-form-input"
                placeholder="Write a Message"
                value={formData.message}
                rows={1}
                style={{ resize: 'none', height: '44px', overflow: 'hidden' }}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
              />
            </div>

            <div className="donation-form-group">
              <label className="donation-form-label">&nbsp;</label>
              <button
                type="submit"
                className="donation-form-submit btn--alert btn-donate-animated"
                style={{ width: '100%', minWidth: 'auto' }}
              >
                <span className="glow-border"></span>
                <span className="btn-donate-content text-center">
                  <span>Submit Message</span>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonationForm