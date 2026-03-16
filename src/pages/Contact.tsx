import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="page-header">
        <h1 className="gradient-text">Contact Us</h1>
        <p>Get in touch for inquiries, custom packages, or feedback.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info glass-panel">
          <h2>Direct Contact</h2>
          
          <div className="info-item">
            <div className="info-icon"><Phone size={24} /></div>
            <div>
              <h3>Phone</h3>
              <p>+91 90575 52930</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon"><MessageCircle size={24} /></div>
            <div>
              <h3>WhatsApp</h3>
              <p><a href="https://wa.me/919057552930" className="whatsapp-link" target="_blank" rel="noopener noreferrer">Chat with us</a></p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon"><Mail size={24} /></div>
            <div>
              <h3>Email</h3>
              <p><a href="mailto:rahulsingh905789@gmail.com" className="email-link">rahulsingh905789@gmail.com</a></p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon"><MapPin size={24} /></div>
            <div>
              <h3>Address</h3>
              <p>Shanti Nagar, Jaipur 302006</p>
            </div>
          </div>
        </div>

        <div className="contact-map glass-panel">
          {/* Placeholder for map */}
          <div className="map-placeholder">
            <MapPin size={48} className="logo-icon mb-4" />
            <p>Interactive Map Will Load Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
