import React from 'react';
import './css/Referrals.css';
import { FaUserFriends } from 'react-icons/fa';
import { FaBitcoin } from 'react-icons/fa';
import { FaClipboard } from 'react-icons/fa';
import referralsIcon from '/assets/icon2.png';
import hands from "/assets/hands.png"
import cards from "/assets/cards.png"
import check from "/assets/check.png"
import Header from './header';
import Footer from './footer';
const ReferralsPage = () => {
  const referralCode = "abgYOLOcghtkdo";

  return (
    <>
      <Header />
      <div className="referrals-container">
        <main>
          <div className="content-container">
            {/* Referrals Box */}
            <div className="referrals-box">
              <img src={referralsIcon} alt="Referrals Icon" className="referrals-icon" />
              <span>Referrals</span>
            </div>
            <h1 className='reff_h1 text-2xl'>Earn a 10% Lifetime Bonus by referring to your friends!</h1>
            <div className="instructions">
              <h4 >Instructions to follow:</h4>
              <ol>
                <li className=' text-black '><span className="number-circle">1</span>Share Your Referral Code with Friends.</li>
                <li className=' text-black '><span className="number-circle">2</span>Invite Friends to Sign Up: They Receive a 10% Bonus on Their First Completed Task.</li>
                <li className=' text-black '><span className="number-circle">3</span>You Will Earn a 10% Bonus for Every Task Your Friends Complete!</li>
              </ol>
            </div>
            <div className="referral-code-container">

              <div className="referral-code-container">
                <h4>Your Referral Code</h4>
                <div className="code-box">
                  <span>{referralCode}</span>
                </div>
                <button className="copy-button refrall_btn" onClick={() => navigator.clipboard.writeText(referralCode)}>
                  <FaClipboard /> Copy
                </button>
              </div>
            </div>
            <h3 className="bonus-text reff_h3">Have a Bonus code from your friend?</h3>



            <div className="summary-illustrations-container">
              <div className="summary-container">
                <h4>Your Summary</h4>
                <div className="summary">
                  <div className="summary-item">
                    <span>Referred Friends:</span>
                    <FaUserFriends size={32} color='blue' />
                    <span>-2</span>
                  </div>
                  <div className="summary-item">
                    <span>Bonus Earned:</span>
                    <FaBitcoin size={32} color='blue' />
                    <span>0</span>
                  </div>
                </div>
              </div>

              <div className="illustrations">
                <img className="illustration-center" src={hands} alt="Hands exchanging" />
                <img className="cards-image" src={cards} alt="cards" />
                <img className="checklist-image" src={check} alt="Checklist" />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ReferralsPage;
