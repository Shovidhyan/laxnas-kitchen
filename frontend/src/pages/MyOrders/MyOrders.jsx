import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import parcelIcon from "../../assets/parcel_icon.png";
import axios from 'axios';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data || []);
      console.log("Orders fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className='error-message'>{error}</p>
      ) : data.length > 0 ? (
        <div className="container">
          {data.map((order, index) => (
            <div key={index} className="my-order-item">
              <img src={parcelIcon} alt="Parcel Icon" className="parcel-icon" />

               <p>{order.items.map((item,index)=>{
                if (index == order.items.length-1){
                  return item.name+" x "+item.quantity
                  
                }
                else{
                  return item.name+" x "+item.quantity+", "+" ,"
                }
               })}</p>

               <p>₹{order.amount}.00</p>
               <p>Items: {order.items.length}</p>
               <p><span>&#x25cf;</span><b>{order.status}</b></p>
               <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
