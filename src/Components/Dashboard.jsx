import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ email, token}) {
  const navigate = useNavigate();

  const [selectedOptionProduct] = useState('');

  const handleSelectionChange = (event) => {

  navigate(`/${event.target.value}`)

  }

  const handleLogout = () => {
    localStorage.setItem('email', ''); 
    localStorage.setItem('token', ''); 
    navigate('/login');
  };

  return (
    <div>
    <nav className="home-container">
      <div className='header'>
        <div className='welcome'>
          <h1>PizzaKo</h1>
          <h4 className="username">Hi! {email}</h4>
        </div>
      </div>
      <div className='nav-links'>
        <select id="product-dropdown" value={selectedOptionProduct} onChange={handleSelectionChange}>
          <option value="">Products</option>
          <option value="products">Display Products</option>
          <option value="products/add">Add Products</option>
        </select>
        <select id="order-dropdown" value={selectedOptionProduct} onChange={handleSelectionChange}>
          <option value="">Orders</option>
          <option value="orders">Display Orders</option>
        </select>
        {selectedOptionProduct && <p>Selected option: {selectedOptionProduct}</p>}
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
    </div>
  );
}

export default Dashboard;
