import React, { useState } from "react";
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

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  //frontend\src\assets\frontend_assets\background.mp4
  return (
    <>
      {/* Background video element */}
      <video autoPlay muted loop playsInline className="background-video">
        <source src={bgvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
