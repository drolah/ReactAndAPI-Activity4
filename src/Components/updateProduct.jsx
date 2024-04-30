import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:3000/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setName(data.product.name); // Assuming product name is stored in `name` property of the response
        setPrice(data.product.price); // Assuming product price is stored in `price` property of the response
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Please fill in all required fields (name and price).');
      return;
    }

    try {
      const formData = [
        { propName: "name", value: name },
        { propName: "price", value: price }
      ];

      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/products');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-product-container">
      <header className="headerBtn">
        <a href="/products">Back</a>
      </header>
      <div className="add-container">
        <h2 className="add-title">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="add-nameLabel" htmlFor="name">
              Product Name:
            </label>
            <input
              className="add-nameInput"
              placeholder="Enter product name..."
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="add-priceLabel" htmlFor="price">
              Price:
            </label>
            <input
              className="add-priceInput"
              placeholder="Enter price..."
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button className="add-button" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
