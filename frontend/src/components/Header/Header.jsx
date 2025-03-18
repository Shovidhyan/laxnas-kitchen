import React from 'react';
import './Header.css';
import headerImage from "../../assets/header_img.png";


const Header = () => {
  return (
    <div 
      className="header" 
      style={{
        backgroundImage: `url(${headerImage})`,
        backgroundRepeat: 'no-repeat',
      }}
    > 
      <div className="header-contents">
        <h2>Order Your Favourite Food Here</h2>
        <p>Enjoy your favourite food from the comfort of your home.</p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
