import React, { useContext , useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import img from '../../images/Group 427 1.png'
import Footer from '../../components/Footer'
import i18next from 'i18next'
import '../../styles/css/login/login.-RestPass-ConfirmCode.css'
import '../../styles/css/navbar/navbar.css'
import { AppContext } from '../../contexts/AppContext'
import Loading from '../../components/Loading'
import axios from 'axios'
import Joi from 'joi-browser'
import { useAuth } from '../../contexts/AuthContext'
function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  // const [userLoggedIn, setUserLoggedIn] = useState();
  const [ checked ,setChecked] = useState(false)
  const { server, lang, direction, setCookie, loading, setLoading, errors, setErrors } = useContext(AppContext)


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
          "Joinus" : "Join us now",
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
  
  var loginSchema = {
    username: Joi.string().required().label('Username or Email'),
    password: Joi.string().required(),
  }

    // handle Login
  const handleLogin = async (event) => {
    setLoading(true)
    event.preventDefault()
      try {
        await Joi.validate({ username: emailInput.toString(), password: passInput.toString() }, loginSchema , {abortEarly : false}, (err, value) => {
          if (!err) {
            // setUserLoggedIn(true)
            setErrors("")
            setLoading(true)
            axios.post(`${server}/api/auth/tokens`, {
              email: emailInput.toString(),
              password: passInput.toString()
            }).then((res) => {
              setLoading(false)
              if (!res.data.token && !res.data.refreshToken) {
                return setErrors("this email isn't authorized")
              } else {
                setCookie('token', res.data.token, res.data.tokenExpiryTime)
                // console.log(res.data.token)
                if (checked) {
                  setCookie('refreshToken', res.data.refreshToken, res.data.refreshTokenExpiryTime)
                }
                window.location.assign('/athena-homepage')
              }
            }).catch((error) => {
              setLoading(false)
              setErrors(lang === 'ar' ? 'حدث خطأ ما يرجي المحاوله لاحقا' : 'someThing went wrong , please try again')
            })
          } else {
            event.preventDefault()
            const errors = {};
            err.details.forEach(error => {
              errors[error.path[0]] = error.message
            })
            setErrors(errors)
            setLoading(false)
          }
        });
      } catch (error) {
        
      }
    }
    // console.log('accessToken')
    // console.log(accessToken)
  
  
  return (
    <React.Fragment>
      {loading === true && (
        <Loading />
      )}
    <div className="login" style={{ direction: direction }}>
      <Navbar
        showhomeNavbarBtn={false}
        showThemeLangBtns={true}
      />
      <div className="container">
        <div className="conten">
          <div className="text">
            {errors.name && (
              <div className="alert alert-danger auth">
                {errors.name === 'AxiosError' ? 'something went wrong please try again': errors.message}
              </div>
            )}
            <h1>{i18next.t("h1" , {lng : lang})}</h1>
            <h4>{i18next.t("h4" , {lng : lang})}</h4>
            <form action="">
              <div className="input">
                <label htmlFor="user">{i18next.t("NameLabel" , {lng : lang})}</label>
                <input id='user' type="text" value={emailInput} placeholder={i18next.t("NameLabelPlaceholder", { lng: lang })} onChange={(e) => setEmailInput(e.target.value)} required autoFocus />
                {errors.username && (
                  <div className="alert alert-danger">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="input">
                <label htmlFor="password">{i18next.t("passLabel" , {lng : lang})}</label>
                <input id='password' type="password" value={passInput} placeholder={i18next.t("passLabelPlaceholder", { lng: lang })} onChange={(p) => setPassInput(p.target.value)} required />
                {errors.password && (
                  <div className="alert alert-danger">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="remembercheckbox">
                <div className="content">
                  <div className="left">
                    <input type="checkbox" onClick={(e) => setChecked(e.target.checked)} id='remember'/>
                      <label htmlFor="remember">{i18next.t("Rememberlabel", { lng: lang })}</label>
                    {/* <label htmlFor="remember">{i18next.t("Rememberlabel", { lng: lang })}</label> */}
                  </div>
                  <div className="right">
                    <Link to='/sendresetcode' >{i18next.t("forgotpass" , {lng : lang})}</Link>
                  </div>
                </div>
              </div>
              <button aria-label="submitBtn" onClick={(event)=>handleLogin(event)} className="submitBtn special">{i18next.t("btn" , {lng : lang})}</button>
              <p>{i18next.t("donthaveAcc" , {lng : lang})} <span><Link to='/home'>{i18next.t("Joinus" , {lng : lang})}</Link></span></p>
            </form>
          </div>
          <div className="image">
            <img src={img} alt="students" loading='lazy'/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </React.Fragment>
  )
}

export default Login
