import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async () => {
    const res = await api.post('/auth/login', { email, password });
    login(res.data.token);
    nav('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
