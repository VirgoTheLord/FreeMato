import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "./context/StoreContext"; // Adjust path as needed
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import bgvideo from "./assets/frontend_assets/background1.mp4";
import Loader from "./components/Loader/Loader";

const App = () => {
  const { loading, progress, error } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);
  const [entered, setEntered] = useState(false);

  // Load entered state from localStorage
  useEffect(() => {
    const storedEntered = localStorage.getItem("entered");
    if (storedEntered === "true") {
      setEntered(true);
    }
  }, []);

  const handleContinue = () => {
    localStorage.setItem("entered", "true");
    setEntered(true);
  };

  // Debug StoreContext values
  useEffect(() => {
    console.log("[App] Context State:", { loading, progress, error });
  }, [loading, progress, error]);

  // Fallback: Simulate progress if invalid
  useEffect(() => {
    if (loading && (typeof progress !== "number" || isNaN(progress))) {
      console.log("[App] Progress invalid, simulating incremental progress");
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 500); // Simulate 5-second load
      return () => clearInterval(interval);
    }
  }, [loading, progress]);

  if ((loading && localStorage.getItem("entered") !== "true") || !entered) {
    return (
      <Loader
        progress={progress}
        loading={loading}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <>
      <video autoPlay muted loop playsInline className="background-video">
        <source src={bgvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>

      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
