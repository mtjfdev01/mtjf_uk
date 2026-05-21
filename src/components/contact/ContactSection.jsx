import ContactGuide from './ContactGuide'
import ContactForm from './ContactForm'
import './ContactSection.css'

const ContactSection = () => {
  return (
    <section className="contact-section container py-64">
      <div className="contact-card">
        <ContactGuide />
        <ContactForm />
      </div>
    </section>
  )
}

export default ContactSection

