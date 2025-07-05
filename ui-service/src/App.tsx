import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';



import { useAuth } from './context/AuthContext';
import SellerDashboard from './pages/SellerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import SignupNew from './pages/Signup';
import LoginNew from './pages/LoginNew';
import Navbar from './components/NavBar';
import ProductDetail from './pages/ProductDetail';
import ManageProducts from './pages/ManageProducts';


function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/signup" element={<SignupNew />} />
        <Route path="/login" element={<LoginNew />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/manage-products" element={<ManageProducts />} />
      </Routes>
    </>
  );
}



    // <Routes>
    //     <Route path="/login" element={<LoginNew />} />
    //     <Route path="/signup" element={<SignupNew />} />

    //     {user?.role === 'SELLER' && (
    //       <Route path="/dashboard" element={<SellerDashboard />} />
    //     )}
    //     {user?.role === 'CUSTOMER' && (
    //       <Route path="/dashboard" element={<CustomerDashboard />} />
    //     )}

    //     <Route path="*" element={<Navigate to="/login" />} />
    //   </Routes>

export default App