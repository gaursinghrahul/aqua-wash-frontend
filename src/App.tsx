import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import type { ReactNode } from 'react'
import Home from './pages/Home'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

/** Wraps public pages with the shared Navbar + Footer layout */
const PublicLayout = ({ children }: { children: ReactNode }) => (
  <div className="app-container">
    <Navbar />
    <main className="main-content">{children}</main>
    <Footer />
  </div>
)

/** Redirects to /admin login if the user is not an authenticated admin */
const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth()
  return isAdmin ? <>{children}</> : <Navigate to="/admin" replace />
}

function AppRoutes() {
  const { isAdmin } = useAuth()

  return (
    <Routes>
      {/* Public routes — wrapped in Navbar/Footer layout */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
      <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Admin routes — full-screen, no shared layout */}
      <Route
        path="/admin"
        element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />}
      />
      <Route
        path="/admin/dashboard"
        element={<AdminRoute><AdminDashboard /></AdminRoute>}
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
