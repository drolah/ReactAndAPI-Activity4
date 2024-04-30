import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderCard({ id, product, quantity }) {
  const [qty, setQty] = useState('')
  const [float, setFloat] = useState(false);


  const handleFloat = () => {
    setFloat(!float);
    setQty(quantity)
  };

  const handleUpdate = (e) => {
  fetch(`http://localhost:3000/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      quantity: qty
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
    setFloat(false); // Close the modal after successful order
    window.location.reload();
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


  const handleDelete = () => {
    fetch(`http://localhost:3000/orders/${id}`, {
      method: 'DELETE',
        headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
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


  return (
    <div className="product-card">
      <div className="images">
        <img className="image2" src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="delete" onClick={handleDelete} />
        <img className="image2" src="https://cdn-icons-png.flaticon.com/128/14919/14919136.png" alt="update" onClick={handleFloat} />

        
        {float && (
        <div className="modal-container">
  <div onClick={handleFloat} className="overlay"></div>
  <div className="order-modal">
    <img className="image" src={`http://localhost:3000/${product.productImage}`} alt={product.name} />
    <h2>Order: {product.name}</h2>
    <p>Price: ${product.price}</p>
    <div className="input-group">
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        defaultValue="1"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
    </div>
    <div className="btn-group">
      {/* Pass a function reference to onClick */}
      <button className="order-btn" onClick={() => handleUpdate(qty)}>
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
      <img className="image" src={`http://localhost:3000/${product.productImage}`} alt={product.name} />
      <div className="product-details">
        <h4>{product.name}</h4>
        <div>
          <h5>Price each: ${product.price}</h5>
        </div>
        <div>
            <h5>Quantity: ${quantity}</h5>
        </div>
        <h5>Total: ${product.price * quantity}</h5>
      </div>
    </div>
  );
}

export default OrderCard;
