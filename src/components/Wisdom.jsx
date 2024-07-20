import React, { useContext, useEffect } from 'react'
import '../styles/css/wisdom/wisdom.css'
import i18next from 'i18next'
import { AppContext } from '../contexts/AppContext';

function Wisdom() {
  const {lang , direction}= useContext(AppContext)
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          "h1": "“ The science of today is the technology of tomorrow. ”",
          "h6-1": "From ",
          "b" : " Athena Wisdom ",
          "h6-2": " coming soon",
        }
      }, 
      ar: {
        translation: {
          "h1": "” ولما رأيتُ الجهلَ في الناسِ فاشياً تجاهلْتُ حتى ظُنَّ أنّيَ جاهل “",
          "h6-1": " ",
          "b" : "” حكمة أثينا “",
          "h6-2": " قريباً  ",
        }
      }
    }
  });
  // ------------------------css root variables------------------------------------
  useEffect(() => {
    if (window.localStorage.getItem("theme") === "light") {
      document.documentElement.style.setProperty('--color-h1-wisdom', '#4EA7FF');
      document.documentElement.style.setProperty('--color-h6-wisdom', '#002E5A');
    } else {
      document.documentElement.style.setProperty('--color-h1-wisdom', '#fff');
      document.documentElement.style.setProperty('--color-h6-wisdom', '#fff');
    }
  } , [window.localStorage.getItem("theme")])
  return (
    <>
      <div className="athena-wisdom" style={{direction : direction}}>
        <h1>{i18next.t("h1" , {lng : lang})}</h1>
        <h6>{i18next.t("h6-1" , {lng : lang})}<b>{i18next.t("b" , {lng : lang})}</b>{i18next.t("h6-2" , {lng : lang})}</h6>
      </div>
    </>
  )
}

export default Wisdom
