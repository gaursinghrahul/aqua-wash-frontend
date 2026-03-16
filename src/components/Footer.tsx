import { Droplet, Instagram, Facebook, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Droplet className="logo-icon" size={24} />
            <span className="logo-text">AquaWash Mobile</span>
          </div>
          <p className="footer-desc">
            Premium doorstep car wash services saving you time and giving your vehicle the care it deserves.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <h3>Services</h3>
          <ul>
            <li><a href="/services">Basic Wash</a></li>
            <li><a href="/services">Interior Cleaning</a></li>
            <li><a href="/services">Premium Detailing</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h3>Contact Us</h3>
          <ul>
            <li className="footer-contact-item">📍 Shanti Nagar, Jaipur</li>
            <li className="footer-contact-item">📞 +91 90575 52930</li>
            <li className="footer-contact-item">✉️ rahulsingh905789@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AquaWash Mobile. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
