import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state
  const [progress, setProgress] = useState(0); // Track fetch progress
  const [error, setError] = useState(null); // Track errors
  const url = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
      setProgress(50); // 50% progress after food list fetch
    } catch (error) {
      console.error("Error fetching food list:", error);
      setError("Failed to load food list.");
      throw error;
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      const cartData = response.data.cartData || {};
      const cleanedCart = {};
      for (const itemId in cartData) {
        if (cartData[itemId] > 0) {
          cleanedCart[itemId] = cartData[itemId];
        }
      }
      setCartItems(cleanedCart);
      setProgress(100); // 100% progress after cart fetch
    } catch (error) {
      console.error("Error loading cart data:", error);
      setError("Failed to load cart data.");
      throw error;
    }
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setProgress(0);
      setError(null);
      try {
        await fetchFoodList();
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"));
        } else {
          setProgress(100); // No cart fetch needed if no token
        }
        // Enforce minimum loader display time (1.5s)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData,
    loading,
    progress,
    error,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
