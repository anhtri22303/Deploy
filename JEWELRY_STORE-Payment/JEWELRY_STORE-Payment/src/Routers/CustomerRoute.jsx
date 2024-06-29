import React from "react";
import { Navbar } from "../component/Navbar/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../component/Home/Home";
import JewelryDetail from "../component/Jewelry/JewelryDetail";
import Cart from "../component/Cart/Cart";
import Profile from "../component/Profile/Profile";
import BuyBack from "../component/BuyBack/BuyBack";
import StockGold from "../component/StockGold/StockGold"; // Import the StockGold component
import LoginForm from "../component/Auth/LoginForm";
import RegisterForm from "../component/Auth/RegisterForm";
import Guarantee from "../component/Guarantee/Guarantee";
import { PayMentSuccess } from "../PaymentSuccess/PayMentSuccess";
import ValuationA  from "../component/BuyBack/ValuationA";
import Footer from "../component/Footer/Footer";
import Buy from "../component/BuyBack/Buy";
import Exchange from "../component/BuyBack/Exchange";
export default function CustomerRoute() {
  return (
    <div>
      <ul>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
        <li>
          <Link to={"/register"}>Register</Link>
        </li>
      </ul>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/area/:title/:id" element={<JewelryDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
        <Route path="/buyback" element={<BuyBack />} />
        <Route path="/valuation/in" element={<ValuationA/>} />
        <Route path="/stockgold" element={<StockGold />} />
        <Route path="/guarantee" element={<Guarantee />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/payment/success/:id" element={<PayMentSuccess />} />
 {/* Route for StockGold component */}
      </Routes>
      <Footer/>
    </div>
  );
}
