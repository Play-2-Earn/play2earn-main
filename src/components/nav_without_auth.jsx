import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
import default_user_logo from "../../public/assets/user.png"
import "./css/without_auth.css"
// importing connecting wallet component that will return connect button and status of the wallet
// the component will be included in the drop down menu
import ConnectWalletButton from './ConnectWalletButton';
import axios from "axios";

const WithoutAuth = ({userLogOut}) => {
    const handleLogin = async (e) => {
        alert("you have successfully logged out")
        userLogOut()
        localStorage.removeItem('token');
    }

    localStorage.removeItem('token');
    
    
    const [isItemsVisible, setItemsVisible] = useState(false);
    const toggleItems = () => {
        setItemsVisible(prevState => !prevState);
    };
    return (
        <>
            <div className="dropdownmenu">
                <button onClick={toggleItems} className="dropdown"> <img className="nav_user_logo" src={default_user_logo} alt="userLogo" /></button>
                {isItemsVisible ? (
                    <> <ul className="dropdu">
                        <li className="dropwallet"> <ConnectWalletButton /></li>
                        <li className="dropitms">Userdashbord</li>
                        <li className="dropitms" onClick={() => handleLogin()}>Logout</li>
                    </ul>
                    </>
                ) : (null)}

            </div>
        </>

    );
}

export default WithoutAuth;
