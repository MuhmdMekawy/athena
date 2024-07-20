import React, { createContext, useState , useEffect } from 'react';
import i18next from 'i18next';


export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(window.localStorage.getItem('lang') || 'en');
  const [theme, setTheme] = useState(window.localStorage.getItem('theme'));
  const [loading , setLoading] = useState(null)
  const [errors, setErrors] = useState('');
  const [direction, setDirection] = useState('')




  //handle Theme
  const handleTheme = (theme) => {
    window.localStorage.setItem("theme", theme)
    window.location.reload()
    if (theme === "dark") {
      setTheme("light")
      window.localStorage.setItem("theme", "light")
    } else{
      setTheme("dark")
      window.localStorage.setItem("theme", "dark")
    }
  }

  
  // handle Language
  const handleLanguage = (lang) => {
    if (lang !== window.localStorage.getItem('lang')) {
      window.localStorage.setItem("lang", lang)
      setLang(lang)
      window.location.reload()
      if (lang === "ar") {
        document.documentElement.style.setProperty('body-font-family', 'Baloo Bhaijaan 2');
      }else{
        document.documentElement.style.setProperty('body-font-family', 'Comfortaa');
      }
    }
  }

  //control direction base on lang
  useEffect(() => {
    i18next.init({
      lng: lang || 'en',
      resources: {
        en: {
          translation: {
            dir: 'ltr',
          },
        },
        ar: {
          translation: {
            dir: 'rtl',
          },
        },
      },
    });
    setDirection((i18next.t('dir', { lng: `${lang}` })))
  }, [lang]);

  

  //server
  const server = 'https://athenaapi.azurewebsites.net'


  //set value in cookies
  const setCookie =(name , value, expiryDate)=> {
    var cookieValue = `${name}=` + encodeURIComponent(value) + '; expires=' + expiryDate;
  
    document.cookie = cookieValue;
  }



  // get value from cookie
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


  // remove value from cookie
  const deleteCookie =(name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }



  // handle logout
  const handleLogOut = () => {
    deleteCookie("token");
    deleteCookie("refreshToken");
    window.location.reload()
  } 


  const contextValue = {
    direction,
    lang,
    theme,
    handleTheme,
    loading,
    setLoading,
    errors,
    setErrors,
    setCookie,
    getCookie,
    deleteCookie,
    handleLanguage,
    handleLogOut,
    server,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
