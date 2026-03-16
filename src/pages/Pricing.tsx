import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  const plans = [
    {
      name: "Weekly Plan",
      price: "₹900",
      period: "/month",
      features: ["4 Washes per month", "Exterior wash", "Tyre cleaning", "Flexible scheduling"],
      popular: false
    },
    {
      name: "Alternate Day",
      price: "₹2,500",
      period: "/month",
      features: ["15 Washes per month", "Exterior wash", "1 Interior detailing per month", "Priority support"],
      popular: true
    },
    {
      name: "Daily Plan",
      price: "₹4,500",
      period: "/month",
      features: ["30 Washes per month", "Always spotless exterior", "2 Interior detailings per month", "Premium tire shine"],
      popular: false
    }
  ];

  return (
    <div className="pricing-page">
      <div className="page-header">
        <h1 className="gradient-text">Subscription Plans</h1>
        <p>Choose a plan that fits your schedule and keep your car spotless.</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card glass-panel ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            
            <h2 className="plan-name">{plan.name}</h2>
            <div className="plan-price-container">
              <span className="plan-price">{plan.price}</span>
              <span className="plan-period">{plan.period}</span>
            </div>
            
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <CheckCircle2 size={20} className="plan-check" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link to="/booking" className={`plan-btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
              Subscribe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
