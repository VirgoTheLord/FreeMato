import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { FaTimes, FaTrash } from "react-icons/fa";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const removeOrder = async (orderId) => {
    try {
      await axios.post(
        url + "/api/order/remove",
        { orderId },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error removing order:", error);
    }
  };

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    const orders = response.data.data;

    // Filter out orders with payment: false and remove them from the database
    const validOrders = [];
    for (const order of orders) {
      if (order.payment === false) {
        await removeOrder(order._id); // Remove from database
      } else {
        validOrders.push(order); // Keep orders with payment: true
      }
    }

    setData(validOrders); // Update state with valid orders only
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <span key={index}>
                        {item.name} <FaTimes className="quantity-icon" />{" "}
                        {item.quantity}
                      </span>
                    );
                  } else {
                    return (
                      <span key={index}>
                        {item.name} <FaTimes className="quantity-icon" />{" "}
                        {item.quantity},
                      </span>
                    );
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>●</span> <b>{order.status}</b>
              </p>
              <div className="order-actions">
                <button onClick={fetchOrders}>Track Order</button>
                <button
                  className="remove-button"
                  onClick={() => removeOrder(order._id)}
                  title="Remove Order"
                >
                  <FaTrash className="remove-icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
