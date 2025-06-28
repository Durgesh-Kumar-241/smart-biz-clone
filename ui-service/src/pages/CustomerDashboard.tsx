import { useAuth } from '../context/AuthContext';

const CustomerDashboard = () => {
const { logout } = useAuth();
    return (
    <div>
      <h2>Customer dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};


export default CustomerDashboard;