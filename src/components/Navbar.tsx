import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/services', name: 'Services' },
    { path: '/pricing', name: 'Pricing' },
    { path: '/contact', name: 'Contact' },
  ];

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Droplet className="logo-icon" size={28} />
          <span className="logo-text gradient-text">AquaWash Mobile</span>
        </Link>
        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {navLinks.map((link) => (
            <li className="nav-item" key={link.name}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'nav-links active-link' : 'nav-links'}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="nav-item nav-btn">
            <Link to="/booking" className="btn-primary" onClick={() => setIsOpen(false)}>
              Book Now
            </Link>
          </li>
          <li className="nav-item nav-admin-link">
            <Link
              to="/admin"
              className="nav-links admin-link"
              onClick={() => setIsOpen(false)}
              title="Admin Portal"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
