import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct({ setToken }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Create a FormData object to send form data including the image
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image); // Append the image file to the FormData object

      const response = await fetch('http://localhost:3000/products/', {
        method: 'POST',
        body: formData, // Use FormData instead of JSON.stringify
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className='add-container'>
      <h2 className='add-title'>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='add-nameLabel' htmlFor="name">Product Name</label>
          <input className='add-nameInput' placeholder="Enter product name..." type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className='add-priceLabel' htmlFor="price">Price</label>
          <input className='add-priceInput' placeholder="Enter price" type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label className='add-imageLabel' htmlFor="image">Product Image</label>
          <input className='add-imageInput' type="file" id="image" name="image" onChange={handleImageChange} />
        </div>
        <button className='add-button' type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
