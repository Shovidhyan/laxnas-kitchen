import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const showPopup = (message, success) => {
    setPopup({ show: true, message, success });
    setTimeout(() => {
      setPopup({ show: false, message: "", success: false });
      if (success) {
        setOrderPlaced(true); // Move to the orderPlaced section after the popup
        setCartItems({}); // Clear the basket after the order is placed
      }
    }, 3000); // Hide the popup after 3 seconds
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        await axios.post(url + "/api/notify-owner", { orderData });
        showPopup("Order Placed Successfully!", true); // Show success popup
      } else {
        showPopup("Order Placed Successfully!", true); // Show failure popup
      }
    } catch (error) {
      showPopup("Error placing order. Please try again.", false); // Show error popup
    }
  };

  return (
    <div>
      {orderPlaced ? (
        <div className="order-success">
          <h2>Order Placed Successfully!</h2>
          <p>We will contact you soon regarding your order.</p>
        </div>
      ) : (

        
        <form onSubmit={placeOrder} className="place-order">
          <div className="place-order-left">
            <h2><i>"No Delivery – Pick Up Fresh from the Shop!" </i></h2>
            <br /><br />
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First Name"
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email address"
            />
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder="Street"
            />
            <div className="multi-fields">
              <input
                required
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                type="text"
                placeholder="City"
              />
              <input
                required
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                type="text"
                placeholder="State"
              />
            </div>
            <div className="multi-fields">
              <input
                required
                name="zip"
                onChange={onChangeHandler}
                value={data.zip}
                type="text"
                placeholder="Zip code"
              />
              <input
                required
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                type="text"
                placeholder="Country"
              />
            </div>
            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              placeholder="Phone"
            />
          </div>
          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Sub Total</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <button type="submit">Place Order</button>
            </div>
          </div>
        </form>

        
      )}

      {/* Popup for order status */}
      {popup.show && (
        <div className={`popup ${popup.success ? "success" : "error"}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;