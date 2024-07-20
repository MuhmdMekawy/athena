import React, { useContext } from 'react'
import StudentInfo from './StudentInfo'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loading from '../../components/Loading'
import openEye from "../../images/Vector (2).svg";
import closeEye from '../../images/Vector (3).svg'
import { StudentContext } from '../../contexts/stdContext'
import { useAuth } from '../../contexts/AuthContext'


function StdSettings() {
  const [username, setUsername] = useState('')
  const [oldPassword  , setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passDelete, setPassDelete] = useState('')
  const [oldPassInputState, setOldPassInputState] = useState("password")
  const [newPassInputState, setNewPassInputState] = useState("password")
  const [passConfirmState, setPassConfirmState] = useState("password")
  const [showDeletePopup , setShowDeletePopup] = useState(false)
  const [controlInput, setControlInput] = useState(true)
  const {accessToken} = useAuth()
  const { server , getCookie , deleteCookie ,loading , setLoading , errors , setErrors , theme , handleTheme , lang , handleLanguage , direction} = useContext(AppContext)
    
  const updateData = async () => {
    const token = getCookie('token')
    if (!token && !getCookie('refreshToken')) {
      throw new Error ('token not found')
    } else {
      if (newPassword.length < 8) {
        Swal.fire({
          icon: 'error',
          text : 'password should be greater than 8 characters'
        })
      } else if (newPassword !== confirmPassword) {
        Swal.fire({
          icon: 'error',
          text : 'Please check your passwords again'
        })
      } else {
        setLoading(true)
        await axios.put(`${server}api/student/account/accountsettings`, {
          oldPassword : oldPassword,
          newPassword: newPassword,
          confirmPassword : confirmPassword
        }, {
          headers: {
            Authorization : `Bearer ${accessToken}`
          }
        }).then(() => {
          setLoading(false)
          setErrors('')
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            position : 'top-right'
          })
          setControlInput(true)
          // window.location.reload()
        }).catch(error => {
          setLoading(false)
          setErrors(error.message)
        })
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await axios.get(`${server}/api/student/account`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setLoading(false)
        setUsername(res.data.userName)
      })
    }
    fetchData()
    if (lang === 'ar') {
      document.documentElement.style.setProperty('--eye-icon-right-position', 'unset')
      document.documentElement.style.setProperty('--eye-icon-left-position', '-15px')
    }
    if (window.localStorage.getItem('theme') === 'dark') {
      document.documentElement.style.setProperty('--input-background', 'transparent')
      document.documentElement.style.setProperty('--path-svg', '#667787')
    }
  }, [window.localStorage.getItem('theme')])

  const gapInputs = controlInput === false ? '20px' : '44px'
  const backgroundThemesButton = window.localStorage.getItem("theme") === "light" ? "white" : "linear-gradient(264.31deg, #1C8EFF 0%, #6DB7FF 95.46%)"
  const EyeIconTransform = lang === "ar" ? "translateX(32px)" : "translateX(-32px)"
  const pageStyleWithPopup = showDeletePopup === true ? 'blur(5px)' : 'initial'


  return (
    <React.Fragment>
    { errors !== '' ? <div className="alert alert-danger">{errors}</div> :
      loading === true ?
        <Loading />
          : 
          <>
              {showDeletePopup === true && (
                <div className="delete-Acc-popup" style={{direction : direction}}>
                  <div className="head-popup">
                  <h1>{lang === 'ar' ? 'التحقق': 'Verification'}</h1>
                    <button className="close-icon" onClick={()=>setShowDeletePopup(false)}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M28.68 0H11.34C4.56 0 0 4.76 0 11.84V28.18C0 35.24 4.56 40 11.34 40H28.68C35.46 40 40 35.24 40 28.18V11.84C40 4.76 35.46 0 28.68 0Z" fill="#E8F3FF"/>
                        <path d="M26.0316 23.541L22.4736 19.985L26.0296 16.429C26.7136 15.747 26.7136 14.637 26.0296 13.955C25.3456 13.267 24.2396 13.269 23.5556 13.953L19.9976 17.509L16.4396 13.949C15.7556 13.265 14.6476 13.269 13.9636 13.949C13.2816 14.633 13.2816 15.743 13.9636 16.425L17.5236 19.985L13.9716 23.535C13.2876 24.219 13.2876 25.329 13.9716 26.009C14.3136 26.353 14.7596 26.523 15.2076 26.523C15.6576 26.523 16.1036 26.353 16.4456 26.011L19.9976 22.459L23.5576 26.017C23.8996 26.359 24.3456 26.529 24.7936 26.529C25.2416 26.529 25.6896 26.357 26.0316 26.017C26.7156 25.333 26.7156 24.225 26.0316 23.541Z" fill="#E8F3FF"/>
                      </svg>
                    </button>
                  </div>
                  <div className="body-content">
                  <p>{lang === 'ar' ? 'التحقق!' : 'Verification!'} <br />
                  {lang === 'ar' ? 'ستفقد جميع بياناتك عندما تحذف حسابك نهائيًا': 'you will lose all your data when you permanently delete your account'}</p>
                    <div className="input">
                      <label htmlFor="Password">{lang === 'ar' ? 'كلمة المرور': 'Password'}</label>
                      <input type="password" id='Password' value={passDelete} onChange={(e)=>setPassDelete(e.currentTarget.value)}/>
                    </div>
                    <button className='deleteAccount'>{lang === 'ar' ? 'تأكيد الحذف': 'Confirm Deletion'}</button>
                  </div>
                </div>
              )}
            <div className="student-homepage personal-details parent-details settings-control" style={{ direction: direction , filter : pageStyleWithPopup}}>
            <Navbar showhomeNavbarBtn={true}/>
              <div className="container">
                <div className="head-exam">
                  <div className="text">
                    <h1>{lang === 'ar' ? 'التحكم في الحساب' : "Account Control"}</h1>
                  </div>
                  <div className="gradient-text backHome">
                    <button onClick={()=>window.location.assign('/athena-homepage')}>{lang === 'ar' ? 'العودة إلى الرئيسية' : "Back To Home"}</button>
                  </div>
                </div>
                <div className="content">
                  <div className="account-control ">
                    <div className="header">
                      <h1>
                        <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.6978 33.5599L29.36 32.9691L26.5761 28.0763C25.9012 26.8111 24.3829 26.4733 23.1172 27.1483L19.8272 29.0042C17.2122 30.5224 12.9094 27.9921 10.2102 23.3521C7.59522 18.7122 7.51041 13.7351 10.1261 12.2163L13.3319 10.3604C14.597 9.68547 14.9349 8.16722 14.2599 6.90153L11.307 1.75559L10.9698 1.25011C10.379 0.0691035 8.7766 -0.352874 7.59571 0.322124L4.30569 2.17804C1.52182 3.78102 0.0877052 7.0709 0.00349617 11.12C-0.0806511 15.6751 1.35339 21.159 4.39035 26.4735C7.51151 31.7883 11.5612 35.8374 15.5261 37.9464C19.1533 39.8865 22.697 40.2242 25.3962 38.7055L28.6862 36.8496C29.8661 36.1746 30.3727 34.8248 29.6978 33.5595L29.6978 33.5599Z" />
                        </svg>
                        <span>{lang === 'ar' ? 'إعدادات الحساب' : "Account Settings"}</span>
                      </h1>
                      <div className="links">
                        <Link to='/student-homepage' className="arrow-back">
                          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.4" d="M21 42C9.4185 42 0 32.5794 0 21C0 9.4206 9.4185 0 21 0C32.5794 0 42 9.4206 42 21C42 32.5794 32.5794 42 21 42Z"/>
                          <path d="M24.0293 29.8645C23.6282 29.8645 23.225 29.7112 22.9184 29.4046L15.5957 22.1176C15.2996 21.8215 15.1337 21.4204 15.1337 21.0004C15.1337 20.5825 15.2996 20.1814 15.5957 19.8853L22.9184 12.5941C23.5337 11.9809 24.5291 11.9809 25.1444 12.5983C25.7576 13.2157 25.7555 14.2132 25.1402 14.8264L18.9389 21.0004L25.1402 27.1744C25.7555 27.7876 25.7576 28.783 25.1444 29.4004C24.8378 29.7112 24.4325 29.8645 24.0293 29.8645Z"/>
                          </svg>
                        </Link>
                        {controlInput === false ? 
                          <button  onClick={()=>setControlInput(true)}>
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 42C9.4185 42 0 32.5794 0 21C0 9.4206 9.4185 0 21 0C32.5794 0 42 9.4206 42 21C42 32.5794 32.5794 42 21 42Z" fill="#4EA7FF"/>
                              <path className='dark-editIcon' d="M28.3646 17.0607L25.8095 14.5056C25.476 14.1924 25.039 14.0127 24.5817 14.0006C24.1243 13.9886 23.6785 14.1451 23.329 14.4404L14.9364 22.833C14.635 23.1369 14.4473 23.5353 14.4049 23.9613L14.0039 27.8499C13.9914 27.9865 14.0091 28.1241 14.0558 28.2531C14.1026 28.382 14.1772 28.4991 14.2743 28.5959C14.3615 28.6823 14.4648 28.7507 14.5784 28.7971C14.692 28.8435 14.8137 28.867 14.9364 28.8663H15.0204L18.9089 28.512C19.3349 28.4695 19.7333 28.2818 20.0373 27.9804L28.4299 19.5878C28.7556 19.2437 28.9316 18.7845 28.9194 18.3108C28.9072 17.8371 28.7077 17.3876 28.3646 17.0607ZM18.7411 26.6469L15.9435 26.908L16.1953 24.1105L21.464 18.9071L23.9818 21.4249L18.7411 26.6469ZM25.194 20.1753L22.6949 17.6762L24.5133 15.8112L27.0591 18.3569L25.194 20.1753Z" fill="#fff"/>
                            </svg>
                          </button>
                          :
                        <button onClick={()=>setControlInput(false)}>
                          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path  opacity="0.4" d="M21 42C9.4185 42 0 32.5794 0 21C0 9.4206 9.4185 0 21 0C32.5794 0 42 9.4206 42 21C42 32.5794 32.5794 42 21 42Z" />
                          <path  d="M28.3646 17.0607L25.8095 14.5056C25.476 14.1924 25.039 14.0127 24.5817 14.0006C24.1243 13.9886 23.6785 14.1451 23.329 14.4404L14.9364 22.833C14.635 23.1369 14.4473 23.5353 14.4049 23.9613L14.0039 27.8499C13.9914 27.9865 14.0091 28.1241 14.0558 28.2531C14.1026 28.382 14.1772 28.4991 14.2743 28.5959C14.3615 28.6823 14.4648 28.7507 14.5784 28.7971C14.692 28.8435 14.8137 28.867 14.9364 28.8663H15.0204L18.9089 28.512C19.3349 28.4695 19.7333 28.2818 20.0373 27.9804L28.4299 19.5878C28.7556 19.2437 28.9316 18.7845 28.9194 18.3108C28.9072 17.8371 28.7077 17.3876 28.3646 17.0607ZM18.7411 26.6469L15.9435 26.908L16.1953 24.1105L21.464 18.9071L23.9818 21.4249L18.7411 26.6469ZM25.194 20.1753L22.6949 17.6762L24.5133 15.8112L27.0591 18.3569L25.194 20.1753Z" />
                          </svg>
                        </button>
                      }
                      </div>
                    </div>
                    <div className="personal-content">
                      <div className="left-inputs" style={{gap : gapInputs}}>
                        <div className="input">
                          <label htmlFor="Username">{lang === 'ar' ? 'أسم المستخدم' : "Username"}</label>
                          <input disabled={true} type="text" id='Username' value={username} onChange={(e)=>setUsername(e.currentTarget.value)}/>
                        </div>
                      </div>
                        <div className="control-theme-lang">
                          <h3>{lang === 'ar' ? 'اللغات والمظهر' : "Languages & Appearance"}</h3>
                          <div className="buttons">
                            <div className="language-control">
                              <select name="" id="" onChange={(e) => handleLanguage(e.currentTarget.value)}>
                                {lang === "ar" ? <option >اللغة</option> : <option>Language</option>}
                                <option value="ar">العريبة</option>
                                <option value="en">English</option>
                              </select>
                              </div>
                            <div className="theme-control" style={{background : backgroundThemesButton}}>
                              {theme === "light" ?
                                  <button className='lightBtn' style={{transform : "translate(0 , 1px)" }} onClick={()=>handleTheme("light")}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#4EA7FF"/>
                                    <path d="M10 13.1818C9.1197 13.1818 8.36942 12.8715 7.74918 12.2508C7.12852 11.6306 6.81818 10.8803 6.81818 10C6.81818 9.1197 7.12852 8.36921 7.74918 7.74855C8.36942 7.1283 9.1197 6.81818 10 6.81818C10.8803 6.81818 11.6308 7.1283 12.2515 7.74855C12.8717 8.36921 13.1818 9.1197 13.1818 10C13.1818 10.8803 12.8717 11.6306 12.2515 12.2508C11.6308 12.8715 10.8803 13.1818 10 13.1818ZM3.63636 10.6364C3.45606 10.6364 3.30503 10.5753 3.18327 10.4531C3.06109 10.3313 3 10.1803 3 10C3 9.8197 3.06109 9.66845 3.18327 9.54627C3.30503 9.42451 3.45606 9.36364 3.63636 9.36364H4.90909C5.08939 9.36364 5.24064 9.42451 5.36282 9.54627C5.48458 9.66845 5.54545 9.8197 5.54545 10C5.54545 10.1803 5.48458 10.3313 5.36282 10.4531C5.24064 10.5753 5.08939 10.6364 4.90909 10.6364H3.63636ZM15.0909 10.6364C14.9106 10.6364 14.7596 10.5753 14.6378 10.4531C14.5156 10.3313 14.4545 10.1803 14.4545 10C14.4545 9.8197 14.5156 9.66845 14.6378 9.54627C14.7596 9.42451 14.9106 9.36364 15.0909 9.36364H16.3636C16.5439 9.36364 16.695 9.42451 16.8167 9.54627C16.9389 9.66845 17 9.8197 17 10C17 10.1803 16.9389 10.3313 16.8167 10.4531C16.695 10.5753 16.5439 10.6364 16.3636 10.6364H15.0909ZM10 5.54545C9.8197 5.54545 9.66867 5.48436 9.54691 5.36218C9.42473 5.24042 9.36364 5.08939 9.36364 4.90909V3.63636C9.36364 3.45606 9.42473 3.30482 9.54691 3.18264C9.66867 3.06088 9.8197 3 10 3C10.1803 3 10.3315 3.06088 10.4537 3.18264C10.5755 3.30482 10.6364 3.45606 10.6364 3.63636V4.90909C10.6364 5.08939 10.5755 5.24042 10.4537 5.36218C10.3315 5.48436 10.1803 5.54545 10 5.54545ZM10 17C9.8197 17 9.66867 16.9389 9.54691 16.8167C9.42473 16.695 9.36364 16.5439 9.36364 16.3636V15.0909C9.36364 14.9106 9.42473 14.7596 9.54691 14.6378C9.66867 14.5156 9.8197 14.4545 10 14.4545C10.1803 14.4545 10.3315 14.5156 10.4537 14.6378C10.5755 14.7596 10.6364 14.9106 10.6364 15.0909V16.3636C10.6364 16.5439 10.5755 16.695 10.4537 16.8167C10.3315 16.9389 10.1803 17 10 17ZM5.95909 6.85L5.275 6.18182C5.14773 6.06515 5.08664 5.91667 5.09173 5.73636C5.09724 5.55606 5.15833 5.40227 5.275 5.275C5.40227 5.14773 5.55606 5.08409 5.73636 5.08409C5.91667 5.08409 6.06515 5.14773 6.18182 5.275L6.85 5.95909C6.96667 6.08636 7.025 6.23485 7.025 6.40455C7.025 6.57424 6.96667 6.72273 6.85 6.85C6.73333 6.97727 6.58761 7.03815 6.41282 7.03264C6.23761 7.02755 6.08636 6.96667 5.95909 6.85ZM13.8182 14.725L13.15 14.0409C13.0333 13.9136 12.975 13.7626 12.975 13.5878C12.975 13.4126 13.0333 13.2667 13.15 13.15C13.2667 13.0227 13.4126 12.9618 13.5878 12.9674C13.7626 12.9725 13.9136 13.0333 14.0409 13.15L14.725 13.8182C14.8523 13.9348 14.9134 14.0833 14.9083 14.2636C14.9028 14.4439 14.8417 14.5977 14.725 14.725C14.5977 14.8523 14.4439 14.9159 14.2636 14.9159C14.0833 14.9159 13.9348 14.8523 13.8182 14.725ZM13.15 6.85C13.0227 6.73333 12.9618 6.58739 12.9674 6.41218C12.9725 6.23739 13.0333 6.08636 13.15 5.95909L13.8182 5.275C13.9348 5.14773 14.0833 5.08664 14.2636 5.09173C14.4439 5.09724 14.5977 5.15833 14.725 5.275C14.8523 5.40227 14.9159 5.55606 14.9159 5.73636C14.9159 5.91667 14.8523 6.06515 14.725 6.18182L14.0409 6.85C13.9136 6.96667 13.7652 7.025 13.5955 7.025C13.4258 7.025 13.2773 6.96667 13.15 6.85ZM5.275 14.725C5.14773 14.5977 5.08409 14.4439 5.08409 14.2636C5.08409 14.0833 5.14773 13.9348 5.275 13.8182L5.95909 13.15C6.08636 13.0333 6.23761 12.975 6.41282 12.975C6.58761 12.975 6.73333 13.0333 6.85 13.15C6.97727 13.2667 7.03836 13.4126 7.03327 13.5878C7.02776 13.7626 6.96667 13.9136 6.85 14.0409L6.18182 14.725C6.06515 14.8523 5.91667 14.9132 5.73636 14.9076C5.55606 14.9025 5.40227 14.8417 5.275 14.725Z" fill="white"/>
                                    </svg>
                                  </button>
                                :
                                <button className='darkBtn' style={{transform : 'translate(-23px , 0)' }} onClick={()=>handleTheme("dark")}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                  <g filter="url(#filter0_d_4723_5621)">
                                  <circle cx="15" cy="15" r="10" fill="white"/>
                                  <path d="M15 21C13.3333 21 11.9167 20.4167 10.75 19.25C9.58333 18.0833 9 16.6667 9 15C9 13.3333 9.58333 11.9167 10.75 10.75C11.9167 9.58333 13.3333 9 15 9C15.1556 9 15.3084 9.00556 15.4587 9.01667C15.6084 9.02778 15.7556 9.04444 15.9 9.06667C15.4444 9.38889 15.0807 9.80822 14.8087 10.3247C14.5362 10.8416 14.4 11.4 14.4 12C14.4 13 14.75 13.85 15.45 14.55C16.15 15.25 17 15.6 18 15.6C18.6111 15.6 19.1722 15.4638 19.6833 15.1913C20.1944 14.9193 20.6111 14.5556 20.9333 14.1C20.9556 14.2444 20.9722 14.3916 20.9833 14.5413C20.9944 14.6916 21 14.8444 21 15C21 16.6667 20.4167 18.0833 19.25 19.25C18.0833 20.4167 16.6667 21 15 21Z" />
                                  </g>
                                  <defs>
                                  <filter id="filter0_d_4723_5621" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                  <feOffset/>
                                  <feGaussianBlur stdDeviation="2.5"/>
                                  <feComposite in2="hardAlpha" operator="out"/>
                                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.178837 0 0 0 0 0.354167 0 0 0 0.25 0"/>
                                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4723_5621"/>
                                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4723_5621" result="shape"/>
                                  </filter>
                                  </defs>
                                  </svg>
                                </button>
                              } 
                            </div>
                          </div>
                        </div>
                    </div>
                    {controlInput === true ?
                      <>
                        <div className="pass-buttons">
                          <button className='updatePass' onClick={()=>setControlInput(false)}>{lang === 'ar' ? 'تحديث كلمة المرور' : "Update Password"}</button>
                          <button className='deleteAccount' onClick={()=>setShowDeletePopup(true)}>{lang === 'ar' ? 'حذف الحساب' : "Delete Account"}</button>
                        </div>
                        <h6><Link to=''>{lang === 'ar' ? ' سياسه الخصوصيه' : "Privacy Policy"}</Link>{lang === 'ar' ? ' و ' : " and "} <Link to=''>{lang === 'ar' ? 'شروط الخدمه' : "terms of services"}</Link></h6>
                      </>
                      :
                      <>
                        <div className="passwords">
                          <div className="input">
                            <label htmlFor="oldPassword">{lang === 'ar' ? 'كلمة المرور القديمة' : "Old Password"}</label>
                            <input disabled={controlInput} placeholder={lang === 'ar' ? 'كلمة المرور القديمة' : "Old Password"} type={oldPassInputState} id='oldPassword' value={oldPassword} onChange={(e) => setOldPassword(e.currentTarget.value)} />
                            {oldPassInputState === "password" ?
                              <img style={{transform: EyeIconTransform}} onClick={()=>setOldPassInputState("text")} src={closeEye} alt="openEyeIcon" loading='lazy' />
                            :
                              <img style={{transform: EyeIconTransform}} onClick={()=>setOldPassInputState("password")} src={openEye} alt="closeEyeIcon" loading='lazy' />
                            }
                          </div>
                          <div className="newPasswords" style={{gap : gapInputs}}>
                            <div className="input">
                              <label htmlFor="newPassword">{lang === 'ar' ? 'تعيين كلمة مرور جديدة' : "Set New Password"}</label>
                              <input disabled={controlInput} placeholder={lang === 'ar' ? 'تعيين كلمة مرور جديدة' : "Set New Password"} type={newPassInputState} id='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.currentTarget.value)} />
                              {newPassInputState === "password" ?
                                <img style={{transform: EyeIconTransform}} onClick={()=>setNewPassInputState("text")} src={closeEye} alt="openEyeIcon" loading='lazy' />
                              :
                                <img style={{transform: EyeIconTransform}} onClick={()=>setNewPassInputState("password")} src={openEye} alt="closeEyeIcon" loading='lazy' />
                              }
                            </div>
                            <div className="input">
                              <label htmlFor="confirm pass">{lang === 'ar' ? 'تأكيد كلمة المرور' : "Confirm password"}</label>
                              <input disabled={controlInput} placeholder={lang === 'ar' ? 'تأكيد كلمة المرور' : "Confirm password"} type={passConfirmState} id='confirm pass' value={confirmPassword} onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                              {passConfirmState === "password" ?
                                <img style={{transform: EyeIconTransform}} onClick={()=>setPassConfirmState("text")} src={closeEye} alt="openEyeIcon" loading='lazy' />
                              :
                                <img style={{transform: EyeIconTransform}} onClick={()=>setPassConfirmState("password")} src={openEye} alt="closeEyeIcon" loading='lazy' />
                              }
                            </div>
                          </div>
                        </div>
                        <button className='submitBtn special' onClick={() => updateData()}>{lang === 'ar' ? 'تأكيد' : "Confirm"}</button>
                      </>
                    }
                  </div>
                  <StudentInfo />
                </div>
              </div>
            </div>
            <Footer />
          </>
        }
    </React.Fragment>
  )
}

export default StdSettings
