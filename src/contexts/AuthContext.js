import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const getCookie = (name) => {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
  
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  
    return null;
  }

  const [accessToken, setAccessToken] = useState(getCookie('token'));
  
  // You can add functions here to set or clear tokens and expiry times
  
  const contextValue = {
    accessToken,
    setAccessToken,
  };
  // console.log(accessToken)
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
