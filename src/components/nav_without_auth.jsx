import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
import default_user_logo from "../../public/assets/user.png"
import "./css/without_auth.css"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// importing connecting wallet component that will return connect button and status of the wallet
// the component will be included in the drop down menu
import ConnectWalletButton from './ConnectWalletButton';


const WithoutAuth = ({ dropdownMenuLink }) => {
    return (
       <>
      
            <DropdownButton className="dropdown" title="User">
                <ConnectWalletButton /> 
                <Dropdown.Item className="dropdown-item" href="#/action-1">User Dashboard</Dropdown.Item>
                <Dropdown.Item className="dropdown-item" href="#/action-3">Logout</Dropdown.Item>
            </DropdownButton>
        </>
       
    );
}

export default WithoutAuth;
