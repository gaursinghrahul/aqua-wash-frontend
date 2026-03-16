import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: "Basic Wash",
      price: "₹200 - ₹300",
      description: "Quick exterior clean using premium shampoo and microfiber drying.",
      features: ["Exterior pressure wash", "Foam bath", "Tyre dressing", "Window cleaning (exterior)"]
    },
    {
      title: "Interior Cleaning",
      price: "₹400 - ₹700",
      description: "Deep vacuuming and sanitization of your car's interior.",
      features: ["Deep vacuuming", "Dashboard polishing", "Seat stain removal", "Air vent sanitization", "Odor removal"]
    },
    {
      title: "Full Cleaning",
      price: "₹800 - ₹1200",
      description: "Our most popular package. Complete interior and exterior care.",
      features: ["Everything in Basic Wash", "Everything in Interior Cleaning", "Engine bay wipe down", "Trunk cleaning"]
    },
    {
      title: "Premium Detailing",
      price: "₹2000+",
      description: "The showroom finish. Polishing, waxing, and long-lasting protection.",
      features: ["Exterior clay bar treatment", "Machine polishing", "Ceramic sealant application", "Leather seat conditioning"]
    }
  ];

  return (
    <div className="services-page">
      <div className="page-header">
        <h1 className="gradient-text">Our Services</h1>
        <p>Premium car care packages tailored to your vehicle's needs.</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card glass-panel">
            <h2 className="service-title">{service.title}</h2>
            <div className="service-price">{service.price}</div>
            <p className="service-desc">{service.description}</p>
            
            <ul className="service-features">
              {service.features.map((feature, i) => (
                <li key={i}>
                  <Check size={18} className="check-icon" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link to="/booking" className="btn-secondary service-btn">
              Book This Service
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
