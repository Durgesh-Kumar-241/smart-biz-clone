import { Routes, Route, Navigate } from 'react-router-dom';

import Signup from './pages/Signup';

import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import SellerDashboard from './pages/SellerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';


function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {user?.role === 'SELLER' && (
        <Route path="/dashboard" element={<SellerDashboard />} />
      )}
      {user?.role === 'CUSTOMER' && (
        <Route path="/dashboard" element={<CustomerDashboard />} />
      )}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App