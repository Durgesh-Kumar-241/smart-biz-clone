import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import { Button } from '@/components/ui/button';


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
      <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      </div>
    </div>
  );
};

export default Login;
