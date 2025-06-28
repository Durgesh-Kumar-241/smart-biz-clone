import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, useAuth } from '../context/AuthContext';
import { signupUser } from '../api/auth';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const { login } = useAuth();
  const navigate = useNavigate();

  if(isUserLoggedIn()){
      navigate('/dashboard');
    }

  const handleSignup = async () => {
    try {
      const user = await signupUser(email, password, role);
      login(user);
      navigate('/dashboard');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="CUSTOMER">Customer</option>
        <option value="SELLER">Seller</option>
      </select>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
