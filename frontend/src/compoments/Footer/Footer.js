import React from "react";
import playStore from "./playstore.png";
import appStore from "./Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1> DELHI PUBLIC SCHOOL</h1>
        <p>School slogans are used to unify students and faculty around a common mission or goal.

</p>

        <p>Copyrights 2023 &copy; us</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com">Instagram</a>
        <a href="https://www.instagram.com/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
