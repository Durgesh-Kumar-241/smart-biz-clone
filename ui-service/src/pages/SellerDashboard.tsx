import { useAuth } from '../context/AuthContext';

const SellerDashboard = () => {
    const { logout } = useAuth();
    return (
    <div>
      <h2>Seller dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
export default SellerDashboard;
