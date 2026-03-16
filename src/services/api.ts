const BASE_URL = 'http://localhost:3000';

// --- Types ---
export interface Booking {
  id: number;
  name: string;
  phone: string;
  address: string;
  carType: string;
  date: string;
  service: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  name: string;
  phone: string;
  address: string;
  carType: string;
  date: string;
  service: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string | null;
    role: string;
  };
}

// --- Helpers ---
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
};

// --- Auth API ---
export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },
};

// --- Bookings API ---
export const bookingsApi = {
  create: async (payload: CreateBookingPayload): Promise<Booking> => {
    const res = await fetch(`${BASE_URL}/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  getAll: async (): Promise<Booking[]> => {
    const res = await fetch(`${BASE_URL}/booking`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  updateStatus: async (id: number, status: Booking['status']): Promise<Booking> => {
    const res = await fetch(`${BASE_URL}/booking/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/booking/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },
};
