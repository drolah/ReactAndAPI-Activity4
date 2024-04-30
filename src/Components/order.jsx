import React, { useState, useEffect } from 'react';
import Card from './orderCard'

function Orders(token) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/orders/',{
        headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    })
      .then(response => response.json())
      .then(data => {
        setOrder(data.orders);
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
    <div className="orders">
          {order.map(orders => (
            <Card
              key={orders._id}
              id={orders._id}
              product={orders.product}
              quantity={orders.quantity}
            />
          ))}
        </div>
        </div>
  );
}

export default Orders;
