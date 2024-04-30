import React, { useState, useEffect } from 'react';
import Card from './productCard'

function Products(token) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/products/',{
        headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    })
      .then(response => response.json())
      .then(data => {
        setProduct(data.products);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };


  return (
    <div>
      <header className="headerBtn">  
          <a href ="/dashboard" >Back</a>
      </header>
    <div className="products">
          {product.map(products => (
            <Card
              key={products.id}
              id={products.id}
              name={products.name}
              productImage={products.productImage}
              price={products.price}
            />
          ))}
        </div>
        </div>
  );
}

export default Products;
