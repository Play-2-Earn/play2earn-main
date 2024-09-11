// import { options } from "backend/routes/authRoutes";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ConnectWalletButton from "./ConnectWalletButton";

const DropdownAfterAuth = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <DropdownButton className="dropdown" title="User">
        <ConnectWalletButton />
        
        <Dropdown.Item className="dropdown-item" href="#/action-1">
          User Dashboard
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item" href="#/action-3">
          Logout
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default DropdownAfterAuth;
