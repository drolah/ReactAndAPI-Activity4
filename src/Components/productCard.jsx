import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ id, name, price, productImage }) {
  const navigate = useNavigate();
  const [float, setFloat] = useState(false);

  const handleFloat = () => {
    setFloat(!float);
  };

  const handleUpdate = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('price', price);
    navigate(`/products/update/${id}`);
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  

  const handleOrder = () => {
    // Fetch request to create an order
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: id,
        quantity: parseInt(document.getElementById('quantity').value)
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      navigate
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="product-card">
      <div className="images">
        <img className="image2" src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="delete" onClick={handleDelete} />
        <img className="image2" src="https://cdn-icons-png.flaticon.com/128/14919/14919136.png" alt="update" onClick={handleUpdate} />
      </div>
      <img className="image" src={`http://localhost:3000/${productImage}`} alt={name} />
      <div className="product-details">
        <h4>{name}</h4>
        <div>
          <h5>Price: ${price}</h5>
        </div>
        <button onClick={handleFloat} className="orderBtn">
          Order
        </button>
        {float && (
          <div className="modal-container">
            <div onClick={handleFloat} className="overlay"></div>
            <div className="order-modal">
              <h2>Order: {name}</h2>
              <p>Price: ${price}</p>
              <div className="input-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  defaultValue="1"
                />
              </div>
              <div className="btn-group">
                <button className="order-btn" onClick={handleOrder}>
                  Place Order
                </button>
                <button className="cancel-btn" onClick={handleFloat}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
