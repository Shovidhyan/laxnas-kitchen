import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

    <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Discover the authentic flavors of tradition at Laxna's Kitchen. From savory snacks to indulgent desserts, our dishes are crafted with love and care to bring you the best of culinary heritage. Taste the essence of home in every bite.</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
          <h2>LAXNA'S KITCHEN</h2>
          <ul>
             <li>Home</li>
             <li>About us</li>
             <li>Delivery</li>
             <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
              <li>+91 93610 77188</li>
              <li>laxnaskitchen@gmail.com</li>
          </ul>
        </div>
        
    </div>
    <hr />
    <p className="footer-copyright">Copyright 2025 © laxnaskitchen.com - All rights Reserved.</p> 
    </div>
  )
}

export default Footer