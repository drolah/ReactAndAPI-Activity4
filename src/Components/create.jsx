import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [token, setTokens] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}}`
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
      navigate('/dashboard'); // Navigate to the dashboard after successful signup
      localStorage.setItem('token', data.token)
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <div className='signup-container'>
      <h2 className='signup-title'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='signup-emailLabel' htmlFor="email">Email</label>
          <input className='signup-emailInput' placeholder="Enter your email..." type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className='signup-passwordLabel' htmlFor="password">Password</label>
          <input className='signup-passwordInput' placeholder="Enter your password..." type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='signup-button' type="submit">Sign Up</button>
      </form>
      <h6>
        Already have an account? <a href="/login">Login</a>
      </h6>
    </div>
  );
}

export default Create;
