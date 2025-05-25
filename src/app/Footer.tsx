import React, { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const handleLinkClick = (type) => {
    let content = '';
    switch (type) {
      case 'about':
        content = 'At Hack4Health, we are dedicated to providing compassionate and comprehensive care to our community. Our mission is to empower individuals to live healthier, happier lives through personalized treatments, patient-centered communication, and a commitment to cutting-edge medical advancements. With a team of experienced and dedicated healthcare professionals, we are committed to providing the highest quality care while fostering a supportive and understanding environment for every patient."';
        break;
      case 'privacy':
        content = 'Your privacy is important to us. Our website is committed to protecting the privacy of your personal and health information. We collect information like names, email addresses, and potentially sensitive health data when you use our services. This information is used to provide you with requested services, improve your experience, and comply with legal obligations. We are committed to maintaining the confidentiality and security of your data, adhering to HIPAA and other applicable privacy laws. You have the right to access, correct, or delete your data, as well as the right to opt-out of certain data uses. For more details, please review our full privacy policy.".';
        break;
      case 'terms':
        content = 'By accessing or using this website, you agree to be bound by these Terms. Our website is intended for informational purposes only and does not constitute medical advice. We are committed to protecting your privacy and ensuring the security of your personal information, including your Protected Health Information (PHI). You agree that your use of this website is at your own risk, and we are not liable for any damages that may arise from your use of the website. We reserve the right to update these Terms at any time, so please review them periodically';
        break;
      case 'faqs':
        content = 'By accessing or using this website, you agree to be bound by these Terms. Our website is intended for informational purposes only and does not constitute medical advice. We are committed to protecting your privacy and ensuring the security of your personal information, including your Protected Health Information (PHI). You agree that your use of this website is at your own risk, and we are not liable for any damages that may arise from your use of the website. We reserve the right to update these Terms at any time, so please review them periodically.';
        break;
      default:
        content = '';
    }
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogContent('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.logoSection}>
          <img src="/hack4logo.png" alt="HealthCare Logo" className={styles.logo} />
          <p>Care for Life - Your Trusted Health Partner</p>
        </div>

        <div className={styles.linkSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><button onClick={() => handleLinkClick('about')} className={styles.linkButton}>About Us</button></li>
            <li><a href="#">Services</a></li>
          </ul>
        </div>

        <div className={styles.linkSection}>
          <h4>Information</h4>
          <ul>
            <li><button onClick={() => handleLinkClick('privacy')} className={styles.linkButton}>Privacy Policy</button></li>
            <li><button onClick={() => handleLinkClick('terms')} className={styles.linkButton}>Terms & Conditions</button></li>
            <li><button onClick={() => handleLinkClick('faqs')} className={styles.linkButton}>FAQs</button></li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h4>Contact Us</h4>
          <p>Email: support@hack4health.com</p>
          <p>Phone: +91122443210</p>
          <p>Emergency: 102/108</p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>© {new Date().getFullYear()} Hack4Health All rights reserved.</p>
        <p>Powered by CureCoders</p>
      </div>

      {isDialogOpen && (
        <div className={styles.dialogOverlay} onClick={closeDialog}>
          <div className={styles.dialogBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeDialog}>×</button>
            <p>{dialogContent}</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;