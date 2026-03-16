import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Premium</span> Doorstep Car Wash Services
          </h1>
          <p className="hero-subtitle">
            Save time and keep your vehicle pristine. We bring professional car cleaning straight to your apartment, office, or anywhere you need us.
          </p>
          <div className="hero-actions">
            <Link to="/booking" className="btn-primary hero-btn">
              Book a Wash Now <ArrowRight size={20} />
            </Link>
            <Link to="/services" className="btn-secondary hero-btn">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose AquaWash?</h2>
          <p>We deliver an unparalleled experience right to your parking spot.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Clock size={32} /></div>
            <h3>Save Time</h3>
            <p>No waiting in line. Schedule an appointment, and we arrive precisely on time.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Shield size={32} /></div>
            <h3>Trusted Professionals</h3>
            <p>Our detailers are trained, equipped with top-tier chemicals, and background-checked.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Star size={32} /></div>
            <h3>Premium Quality</h3>
            <p>From microfiber cloths to ceramic coatings, we ensure a showroom finish every time.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content glass-panel">
          <h2>Ready for a spotless vehicle?</h2>
          <p>Join our Monthly Subscription today for stable routines and discounted rates.</p>
          <Link to="/pricing" className="btn-primary cta-btn">
            View Pricing Plans
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
