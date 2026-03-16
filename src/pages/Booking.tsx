import { useState } from 'react';
import { bookingsApi, type CreateBookingPayload } from '../services/api';
import './Booking.css';

const initialFormState: CreateBookingPayload = {
  name: '',
  phone: '',
  address: '',
  carType: 'hatchback',
  date: '',
  service: 'basic',
};

const Booking = () => {
  const [form, setForm] = useState<CreateBookingPayload>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await bookingsApi.create(form);
      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="booking-page glass-panel booking-success">
        <div className="success-icon">✅</div>
        <h2 className="gradient-text">Booking Confirmed!</h2>
        <p>Thank you, <strong>{form.name}</strong>! We will contact you at <strong>{form.phone}</strong> shortly to confirm your slot.</p>
        <button className="btn-primary" onClick={() => { setIsSubmitted(false); setForm(initialFormState); }}>
          Book Another Wash
        </button>
      </div>
    );
  }

  // Get today's date for the min attribute on date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-page">
      <div className="page-header">
        <h1 className="gradient-text">Book a Service</h1>
        <p>Fill out the details below to schedule your doorstep car wash.</p>
      </div>

      <div className="booking-form-container glass-panel">
        {error && <div className="form-error">{error}</div>}
        <form className="booking-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text" id="name" name="name" required
              placeholder="John Doe" value={form.name} onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel" id="phone" name="phone" required
              placeholder="+91 90575 52930" value={form.phone} onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address / Apartment Name</label>
            <textarea
              id="address" name="address" required rows={3}
              placeholder="123, Shanti Nagar, Jaipur 302006"
              value={form.address} onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="carType">Car Type</label>
              <select id="carType" name="carType" required value={form.carType} onChange={handleChange}>
                <option value="hatchback">Hatchback</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury / Sports</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input
                type="date" id="date" name="date" required
                min={today} value={form.date} onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Type</label>
            <select id="service" name="service" required value={form.service} onChange={handleChange}>
              <option value="basic">Basic Wash</option>
              <option value="interior">Interior Cleaning</option>
              <option value="full">Full Cleaning</option>
              <option value="premium">Premium Detailing</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary form-submit"
            disabled={isSubmitting}
            id="booking-submit-btn"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
