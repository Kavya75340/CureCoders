import React from 'react';
import styles from './Header.module.css';
import { FaInstagram, FaWhatsapp, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logoSection}>
          <img src="hack4logo.png" alt="Healthcare Logo" className={styles.logo} />
          <h1 className={styles.title}>Hack4Health</h1>
        </div>
        <div className={styles.topRight}>
          <a href="#login" className={styles.topButton}>Login</a>
          <a href="#signup" className={styles.topButton}>Sign Up</a>
        </div>
      </div>

      <nav className={styles.navBar}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <a href="#home">Home</a>
          </li>
          <li className={styles.navItem}>
            <a href="#about">About
              <span className={styles.tooltip}>We connect you with trusted healthcare services.</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#emergency">Emergency
              <span className={styles.tooltip}>Quick response for your health emergencies 24/7.</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#help">Help
              <span className={styles.tooltip}>Find FAQs, guides, and customer support here.</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#contact">Contact Us
              <span className={styles.tooltip}>Reach out anytime. We're here to listen!</span>
            </a>
          </li>
        </ul>

        {/* Social Media Icons on Navbar */}
        <div className={styles.socialIconsNav}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <FaInstagram />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <FaWhatsapp />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <FaTwitter />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;