import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ email, token}) {
  const [getToken, setTokens] = useState('');
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const [selectedOptionProduct] = useState('');
  const [selectedOptionOrder] = useState('');

  const handleSelectionChange = (event) => {
    navigate(`/${event.target.value}`)
  
  };

  const handleLogout = () => {
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
          <option value="add">Add Products</option>
        </select>
        {selectedOptionProduct && <p>Selected option: {selectedOptionProduct}</p>}
        <select id="order-dropdown" value={selectedOptionOrder} onChange={handleSelectionChange}>
          <option value="">Orders</option>
          <option value="orders">Display Orders</option>
          <option value="add-order">Add Order</option>
        </select>
        {selectedOptionOrder && <p>Selected option: {selectedOptionOrder}</p>}
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
    </div>
  );
}

export default Dashboard;
