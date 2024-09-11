<<<<<<< HEAD
import React, { createContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  //   const userLoginStatusDone = () => {
  //     setUserLoginStatus(true)
  //   }

  //   const userLogOut = () => {
  //     setUserLoginStatus(false)
  //   }

  return (
    <AuthContext.Provider value={{ userLoginStatus, setUserLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
=======
import React, { createContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  //   const userLoginStatusDone = () => {
  //     setUserLoginStatus(true)
  //   }

  //   const userLogOut = () => {
  //     setUserLoginStatus(false)
  //   }

  return (
    <AuthContext.Provider value={{ userLoginStatus, setUserLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
>>>>>>> 1270daa (cv + recent  games integration)
