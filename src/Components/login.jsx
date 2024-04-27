import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [token, setTokens] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token, email);
        setTokens(data.token);
        navigate('/dashboard');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='login-emailLabel' htmlFor="username">Username</label>
          <input className='login-emailInput' type="text" placeholder="Enter your email..." id="username" name="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className='login-passwordLabel' htmlFor="password">Password</label>
          <input className='login-passwordInput' type="password" placeholder="Enter your password..." id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button className='login-button' type="submit">Login</button>
        </div>
      </form>
      <h6 className="text">
        Dont have an account? <a className = "log" href="/signup">Sign Up</a>
      </h6>
    </div>
  );  
}

export default Login;