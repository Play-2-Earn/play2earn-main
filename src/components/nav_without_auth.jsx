import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
import default_user_logo from "/assets/user.png";
import "./css/without_auth.css";
// importing connecting wallet component that will return connect button and status of the wallet
// the component will be included in the drop down menu
import ConnectWalletButton from "./ConnectWalletButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WithoutAuth = ({ userLogOut }) => {

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    // e.preventDefault();

    try {
      const API_BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5002"
          : "https://4rzf4x59sk.execute-api.eu-north-1.amazonaws.com/dev";

      const apiUrl = `${API_BASE_URL}`;

      const logoutReq = await axios.post(`${apiUrl}/api/users/logout`);
      console.log(logoutReq.data);
      if (logoutReq.data == "success") {
        alert("You are successfully logged out");
        userLogOut();
      }
    } catch (error) {
      console.log("An internal servere error happned", error);
    }
  };

  const handleProPlayerClick = () => {
    navigate("/cv-home");
  };

  // localStorage.removeItem('token');

  const [isItemsVisible, setItemsVisible] = useState(false);
  const toggleItems = () => {
    setItemsVisible((prevState) => !prevState);
  };
  return (
    <>
      <div className="dropdownmenu">
        <button onClick={toggleItems} className="dropdown">
          {" "}
          <img
            className="nav_user_logo"
            src={default_user_logo}
            alt="userLogo"
          />
        </button>
        {isItemsVisible ? (
          <>
            {" "}
            <ul className="dropdu">
              <li className="dropwallet">
                {" "}
                <ConnectWalletButton />
              </li>
              <li className="dropitms" onClick={() => handleProPlayerClick()}>Pro Player</li>
              <li className="dropitms"> User dashboard</li>
              <li className="dropitms" onClick={() => handleLogout()}>
                Logout
              </li>
            </ul>
          </>
        ) : null}
      </div>
    </>
  );
};

export default WithoutAuth;
