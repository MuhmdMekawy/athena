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
import { StudentContext } from '../../contexts/stdContext'
import { useAuth } from '../../contexts/AuthContext'



function StdContacts() {
  const [email, setEmail] = useState('')
  const [phone  , setPhone] = useState('')
  const [homePhone, setHomePhone] = useState('')
  const [controlInput , setControlInput] = useState(true)
  const {lang , direction , server , getCookie , deleteCookie ,loading , setLoading , errors , setErrors} = useContext(AppContext)
  const {studentData} = useContext(StudentContext)
  const { accessToken } = useAuth();

  const updateData = async () => {
      await axios.put(`${server}/api/student/account/contactdetails`, {
        email : email,
        phoneNumber: phone,
        homePhone : homePhone
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
  useEffect(() => {
    const fetchStdData = async () => {
      setLoading(true)
      await axios.get(`${server}/api/student/account`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setLoading(false)
        setEmail(res.data.email)
        setPhone(res.data.phoneNumber)
        setHomePhone(res.data.homePhone)
      })
    }
    fetchStdData()
    if (window.localStorage.getItem('theme') === 'dark') {
      document.documentElement.style.setProperty('--input-background', 'transparent')
      document.documentElement.style.setProperty('--path-svg', '#667787')
    }
  }, [window.localStorage.getItem('theme')])
  const styleInputs = controlInput === false ? 'repeat( 1 , 1fr)'  : 'repeat( 2 , 1fr)'
  const gapInputs = controlInput === false ? '20px'  : '44px'
  return (
    <React.Fragment>
    { errors !== '' ? <div className="alert alert-danger">{errors}</div> :
      loading === true ?
        <Loading />
          : 
          <>
            <Navbar showhomeNavbarBtn={true}/>
            <div className="student-homepage personal-details parent-details" style={{direction : direction}}>
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
                        <span>{lang === 'ar' ? 'بيانات الاتصال' : "Contact Details"}</span>
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
                    <div className="personal-content"  style={{gridTemplateColumns : styleInputs}}>
                      <div className="left-inputs" style={{gap : gapInputs}}>
                        <div className="input">
                          <label htmlFor="Email Address">{lang === 'ar' ? 'البريد الإلكتروني' : "Email Address"}</label>
                          <input disabled={controlInput} type="text" id='Email Address' value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
                        </div>
                        <div className="input">
                          <label htmlFor="Home Phone Number">{lang === 'ar' ? 'رقم هاتف المنزل' : "Home Phone Number"}</label>
                          <input disabled={controlInput} type="text" id='Home Phone Number' value={homePhone} onChange={(e)=>setHomePhone(e.currentTarget.value)}/>
                        </div>
                      </div>
                      <div className="left-inputs" style={{gap : gapInputs}}>
                        <div className="input">
                          <label htmlFor="Phone Number">{lang === 'ar' ? 'رقم الهاتف' : "Phone Number"}</label>
                          <input disabled={controlInput} type="text" id='Phone Number' value={phone} onChange={(e)=>setPhone(e.currentTarget.value)}/>
                        </div>
                      </div>
                    </div>
                    {controlInput === true ?
                      <> 
                        <p>
                          {lang === 'ar' ? 'يجب أن تكون جميع بياناتك صحيحة ومطابقة لسجلك المدني' : 'All your data must be correct and identical to your civil registry.'}<br />
                          {lang === 'ar' ? 'ستتم مراجعة بياناتك ومطابقتها مع السجلات الحكومية.' : 'Your data will be reviewed and matched with government records.'}<br />
                          {lang === 'ar' ? 'سيتم حظر الطالب الذي يستخدم بيانات مزيفة لمدة 10 أيام..' : 'Student who using fake data will be banned you for 10 days.'}<br />
                          {lang === 'ar' ? 'اجعل منصة أثينا مكانا حقيقيا ومفيدا...' : 'Make Athena Community a true and useful place.'}<br />
                        </p>
                        <h6><Link to=''>{lang === 'ar' ? 'سياسة الخصوصية' :'Privacy Policy'}</Link>{lang === 'ar' ? 'و' :'and'}  <Link to=''>{lang === 'ar' ? ' شروط الخدمة' :'Terms of Service'}</Link></h6>
                      </>
                      :
                      <button className='submitBtn special' onClick={()=>updateData()}>{lang === 'ar' ? 'تأكيد' :'Confirm'}</button>
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

export default StdContacts
