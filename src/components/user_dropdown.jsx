// import { options } from "backend/routes/authRoutes";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ConnectWalletButton from './ConnectWalletButton';

const DropdownAfterAuth = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
        //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        //         <div className="bg-white backdrop-blur-lg rounded-[20px] shadow-lg p-6 max-w-sm w-full border border-gray-300">
        //             <div className="flex justify-between items-center mb-4">
        //                 <h2 className="text-xl font-bold">Login</h2>
        //                 <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        //             </div>
        //         </div>
        //     </div>

        <>
            <DropdownButton className="dropdown" title="User">
                <ConnectWalletButton />
                <Dropdown.Item className="dropdown-item" href="#/action-1">User Dashboard</Dropdown.Item>
                <Dropdown.Item className="dropdown-item" href="#/action-3">Logout</Dropdown.Item>
            </DropdownButton>
        </>
        // <>
        //     <option value="">
        //         <select name="first" id="">first</select>
        //         <select name="second" id="">second</select>
        //         <select name="third" id="">third</select>
        //     </option>
        // </>
    )


}

export default DropdownAfterAuth;