import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import Analytics from "./Analytics";
import TaskManagement from "./TaskManagement";
import UserManagement from "./UserManagement";
import TaskTransactions from "./TaskTransactions";
import UpdateAdminAccount from "./UpdateAdminAccount";
import ResetPassword from "./ResetPassword";
import "./CSS/AdminDashboard.css";

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("analytics");
  const [adminAccount, setAdminAccount] = useState({
    username: "admin",
    email: "admin@example.com",
    profilePic: null,
  });
  const [isEditingAdminAccount, setIsEditingAdminAccount] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleUpdateAdminAccount = (updatedAccount) => {
    setAdminAccount({ ...adminAccount, ...updatedAccount });
    setIsEditingAdminAccount(false);
  };

  const handleResetPassword = (newPassword) => {
    console.log("Password reset to:", newPassword);
    setIsResettingPassword(false);
  };

  const handleLogout = () => {
    console.log("Admin logged out");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className={`dashboard flex flex-col md:flex-row h-screen ${sidebarOpen ? "sidebar-open" : ""}`}>
      <TopBar
        adminAccount={adminAccount}
        setIsEditingAdminAccount={setIsEditingAdminAccount}
        setIsResettingPassword={setIsResettingPassword}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex flex-col md:flex-row flex-grow">
        <Sidebar
          setCurrentPage={setCurrentPage}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          currentPage={currentPage}
          ref={sidebarRef}
          className="w-full md:w-1/4 lg:w-1/5 bg-gray-800"
        />
        <main className={`admin-content flex-grow p-4 ${sidebarOpen ? "sidebar-open" : ""}`}>
          {currentPage === "analytics" && <Analytics />}
          {currentPage === "task-management" && <TaskManagement />}
          {currentPage === "user-management" && <UserManagement />}
          {currentPage === "task-transactions" && <TaskTransactions />}
        </main>
      </div>
      {isEditingAdminAccount && (
        <UpdateAdminAccount
          adminAccount={adminAccount}
          handleUpdateAdminAccount={handleUpdateAdminAccount}
          setIsEditingAdminAccount={setIsEditingAdminAccount}
        />
      )}
      {isResettingPassword && (
        <ResetPassword
          handleResetPassword={handleResetPassword}
          setIsResettingPassword={setIsResettingPassword}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
