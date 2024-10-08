import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct({ setToken }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (optional, add checks as needed)
    if (!name || !price || !image) {
      alert('Please fill in all required fields (name, price, and image).');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('productImage', image);

      const response = await fetch('http://localhost:3000/products/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/products');
      } else {
        console.error('Error:', data.message);
        // Handle specific error messages here (optional)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle general errors here (e.g., display an error message to the user)
    }
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImage(file);
    };

    reader.readAsDataURL(file); // Optionally preview the image (add logic to display)
  };

  return (
    <div className="add-product-container">
      <header className="headerBtn">
        <a href="/dashboard">Back</a>
      </header>
      <div className="add-container">
        <h2 className="add-title">Add Product</h2>
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
              required // Add required attribute for validation
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
              required // Add required attribute for validation
            />
          </div>
          <div className="form-group">
            <label className="add-imageLabel" htmlFor="image">
              Product Image:
            </label>
            <input
              className="add-imageInput"
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              required
            />
          </div>
          <button className="add-button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;