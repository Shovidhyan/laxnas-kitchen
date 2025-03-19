import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const { token } = useContext(StoreContext); // Access token from StoreContext
  const [category, setCategory] = useState("All");
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to control login popup visibility

  // Show the login popup after 5 seconds if the user is not logged in
  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [token]);

  return (
    <div>
      {showLoginPopup && <LoginPopup setShowLogin={setShowLoginPopup} />} {/* Render the login popup */}
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;