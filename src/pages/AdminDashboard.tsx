import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { bookingsApi, type Booking } from '../services/api';
import './AdminDashboard.css';

const SERVICE_LABELS: Record<string, string> = {
  basic: 'Basic Wash',
  interior: 'Interior Cleaning',
  full: 'Full Cleaning',
  premium: 'Premium Detailing',
};

const CAR_LABELS: Record<string, string> = {
  hatchback: 'Hatchback',
  sedan: 'Sedan',
  suv: 'SUV',
  luxury: 'Luxury / Sports',
};

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  PENDING:   { label: 'Pending',   className: 'status-pending'   },
  CONFIRMED: { label: 'Confirmed', className: 'status-confirmed' },
  COMPLETED: { label: 'Completed', className: 'status-completed' },
  CANCELLED: { label: 'Cancelled', className: 'status-cancelled' },
};

type StatusFilter = 'ALL' | Booking['status'];

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>('ALL');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setError(null);
      const data = await bookingsApi.getAll();
      setBookings(data);
    } catch {
      setError('Failed to load bookings. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    fetchBookings();
  }, [isAdmin, navigate, fetchBookings]);

  const handleStatusChange = async (id: number, status: Booking['status']) => {
    setUpdatingId(id);
    try {
      const updated = await bookingsApi.updateStatus(id, status);
      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    } catch {
      setError('Failed to update status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Delete booking for "${name}"? This cannot be undone.`)) return;
    setUpdatingId(id);
    try {
      await bookingsApi.delete(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError('Failed to delete booking.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const filtered = filter === 'ALL' ? bookings : bookings.filter((b) => b.status === filter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'PENDING').length,
    confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
    completed: bookings.filter((b) => b.status === 'COMPLETED').length,
    cancelled: bookings.filter((b) => b.status === 'CANCELLED').length,
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header glass-panel">
        <div className="header-left">
          <span className="header-logo">💧</span>
          <div>
            <h1 className="gradient-text">AquaWash Admin</h1>
            <p>Welcome back, {user?.name || user?.email}</p>
          </div>
        </div>
        <div className="header-right">
          <button className="btn-refresh" onClick={fetchBookings} title="Refresh bookings">
            🔄 Refresh
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="stats-row">
        {[
          { label: 'Total',     value: stats.total,     icon: '📋', cls: '' },
          { label: 'Pending',   value: stats.pending,   icon: '⏳', cls: 'stat-pending' },
          { label: 'Confirmed', value: stats.confirmed, icon: '✅', cls: 'stat-confirmed' },
          { label: 'Completed', value: stats.completed, icon: '🏆', cls: 'stat-completed' },
          { label: 'Cancelled', value: stats.cancelled, icon: '❌', cls: 'stat-cancelled' },
        ].map((s) => (
          <div key={s.label} className={`stat-card glass-panel ${s.cls}`}>
            <span className="stat-icon">{s.icon}</span>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {(['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as StatusFilter[]).map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'ALL' ? 'All Bookings' : f.charAt(0) + f.slice(1).toLowerCase()}
            {f !== 'ALL' && (
              <span className="filter-count">
                {bookings.filter((b) => b.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <div className="dashboard-error">{error}</div>}

      {/* Table */}
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading bookings...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state glass-panel">
          <span className="empty-icon">🚗</span>
          <p>No {filter !== 'ALL' ? filter.toLowerCase() : ''} bookings found.</p>
        </div>
      ) : (
        <div className="bookings-table-wrapper glass-panel">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Car</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const sc = STATUS_CONFIG[b.status];
                const isUpdating = updatingId === b.id;
                return (
                  <tr key={b.id} className={isUpdating ? 'row-updating' : ''}>
                    <td className="col-id">#{b.id}</td>
                    <td className="col-customer">
                      <div className="customer-name">{b.name}</div>
                      <div className="customer-phone">{b.phone}</div>
                      <div className="customer-address">{b.address}</div>
                    </td>
                    <td>{SERVICE_LABELS[b.service] || b.service}</td>
                    <td>{CAR_LABELS[b.carType] || b.carType}</td>
                    <td>{new Date(b.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>
                      <span className={`status-badge ${sc.className}`}>{sc.label}</span>
                    </td>
                    <td className="col-actions">
                      <div className="action-buttons">
                        {b.status === 'PENDING' && (
                          <button
                            className="action-btn confirm"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(b.id, 'CONFIRMED')}
                          >
                            Confirm
                          </button>
                        )}
                        {b.status === 'CONFIRMED' && (
                          <button
                            className="action-btn complete"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(b.id, 'COMPLETED')}
                          >
                            Complete
                          </button>
                        )}
                        {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
                          <button
                            className="action-btn cancel"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(b.id, 'CANCELLED')}
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          className="action-btn delete"
                          disabled={isUpdating}
                          onClick={() => handleDelete(b.id, b.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
