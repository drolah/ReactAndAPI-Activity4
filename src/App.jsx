import React, { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/login.jsx';
import SignUp from './Components/create.jsx';
import Home from './Components/Dashboard.jsx';
import ProductsList from './Components/product.jsx';
import Orders from './Components/order.jsx';
import AddProduct from './Components/addProduct.jsx';


function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');

  const handleSetToken = (token, email) => {
    setToken(token);
    setEmail(email);
  };

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="/Dashboard" /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login setToken={handleSetToken} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home email={email} token={token} />} />
            <Route path="/products" element={<ProductsList />} /> 
            <Route path="/add" element={<AddProduct />} /> 
            <Route path="/orders" element={<Orders />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
