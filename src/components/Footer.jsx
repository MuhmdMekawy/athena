import React, { useContext } from 'react'
import i18next from 'i18next';
import '../styles/css/footer/footer.css'
import { AppContext } from '../contexts/AppContext';



function Footer() {
  const {lang } = useContext(AppContext)
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          "rights" : "All Rights Reserved - Copyright © 2023 Athena Students Gate"
        }
      }, 
      ar: {
        translation: {
          "rights" : "جميع الحقوق محفوظة - حقوق الطبع والنشر © 2023 بوابة أثينا للطلاب",
        }
      }
    }
  });
  return (
    <React.Fragment>
      <div className="footer">
        <div className="container">
          <div className="content">
            <small>{i18next.t('rights' , {lng : `${lang}`})}</small>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Footer
