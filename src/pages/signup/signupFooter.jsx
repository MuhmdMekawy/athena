import React, { useContext } from 'react'
import i18next from 'i18next';
import '../../styles/css/signup/signupFooter.css'
import { AppContext } from '../../contexts/AppContext';

function SignupFooter(props) {
  const {lang} = useContext(AppContext)
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          "text" : "All Rights Reserved - Copyright © 2023 Athena Students Gate",
        }
      }, 
      ar: {
        translation: {
          "text" : "جميع الحقوق محفوظة - حقوق الطبع والنشر © 2023 بوابة أثينا للطلاب" ,
        }
      }
    }
  });
  return (
    <React.Fragment>
      <div className="signup-footer">
        <h6><div className='icon'><img src={props.img} alt="signup icon" loading='lazy' /></div>{i18next.t("text" , {lng : `${lang}`})}</h6>
      </div>
    </React.Fragment>
  )
}

export default SignupFooter
