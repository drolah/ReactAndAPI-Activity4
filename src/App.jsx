import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/login.jsx';
import SignUp from './Components/create.jsx';
import Home from './Components/Dashboard.jsx';
import ProductsList from './Components/product.jsx';
import Orders from './Components/order.jsx';
import AddProduct from './Components/addProduct.jsx';
import UpdateProduct from './Components/updateProduct.jsx';


function App() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  };

  useEffect(() => {
    // Check for existing email in localStorage on component mount
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const isAuthenticated = () => token !== ''; // Check for token to determine authentication

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login setToken={handleSetToken} />} />
            <Route path="/signup" element={<SignUp setToken={handleSetToken}/>} />
            <Route
              path="/dashboard"
              element={isAuthenticated() ? <Home email={email} token={token} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/products"
              element={isAuthenticated() ? <ProductsList /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/products/add"
              element={isAuthenticated() ? <AddProduct /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/products/update/:id"
              element={isAuthenticated() ? <UpdateProduct /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/orders"
              element={isAuthenticated() ? <Orders /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/orders/update/:id"
              element={isAuthenticated() ? <Orders /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;