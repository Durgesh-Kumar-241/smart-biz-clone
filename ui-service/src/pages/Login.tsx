import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  if(isUserLoggedIn()){
    navigate('/dashboard');
  }

  const handleLogin = async () => {
    try {
      const token = await loginUser(email, password);
      login(token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
