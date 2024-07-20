import React from 'react'
import i18next from 'i18next'
import { Link } from 'react-router-dom'
function SignInHomePage(props) {
  
  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          "h1" : "Welcome Back",
          "h4" : "Please enter your account details",
          "NameLabel" : "Username or Email",
          "NameLabelPlaceholder" : "What's your Username or Email ?",
          "passLabel" : "Password",
          "passLabelPlaceholder" : "What's your Password ?",
          "Rememberlabel" : "Remember me",
          "forgotpass" : "Forgot my password",
          "btn" : "Login",
          "donthaveAcc" : "Don't have an account ?",
          "Joinus" : "Join Us",
        }
      }, 
      ar: {
        translation: {
          "h1" : "مرحباً بك مرة أخرى",
          "h4" : "الرجاء إدخال تفاصيل حسابك",
          "NameLabel" : "أسم المستخدم أو البريد الإلكتروني",
          "NameLabelPlaceholder" : "ما هو أسم المستخدم أو البريد الإلكتروني الخاص بك ؟",
          "passLabel" : "الرقم السري",
          "passLabelPlaceholder" : "ما هو الرقم السري الخاص بك ؟",
          "Rememberlabel" : "تذكرني",
          "forgotpass" : "نسيت الرقم السري الخاص بي",
          "btn" : "تسجيل الدخول",
          "donthaveAcc" : "ليس لديك حساب",
          "Joinus" : "إنضم إلينا الأن",
        }
      }
    }
  });
  const handleSubmit = (event) => {
    event.preventDefault()
    window.location.assign('/sendresetcode')
  }
  return (
    <React.Fragment>
      <div className="text">
        <h1>{i18next.t("h1" , {lng : props.lang})}</h1>
        <h4>{i18next.t("h4" , {lng : props.lang})}</h4>
        <form action="">
          <div className="input">
            <label htmlFor="user">{i18next.t("NameLabel" , {lng : props.lang})}</label>
            <input id='user' type="text" placeholder={i18next.t("NameLabelPlaceholder" , {lng : props.lang})} required autoFocus/>
          </div>
          <div className="input">
            <label htmlFor="password">{i18next.t("passLabel" , {lng : props.lang})}</label>
            <input id='password' type="password" placeholder={i18next.t("passLabelPlaceholder" , {lng : props.lang})} required />
          </div>
          <div className="remembercheckbox">
            <div className="left">
              <input type="checkbox" id='remember' />
              <label htmlFor="remember">{i18next.t("Rememberlabel" , {lng : props.lang})}</label>
            </div>
            <div className="right">
              <Link to='' >{i18next.t("forgotpass" , {lng : props.lang})}</Link>
            </div>
          </div>
          <button type='submit' aria-label="submitBtn" onClick={(event)=>handleSubmit(event)} className="submitBtn special">{i18next.t("btn" , {lng : props.lang})}</button>
          <p>{i18next.t("donthaveAcc" , {lng : props.lang})} <span><Link to='/'>{i18next.t("Joinus" , {lng : props.lang})}</Link></span></p>
        </form>
      </div>
    </React.Fragment>
  )
}

export default SignInHomePage
