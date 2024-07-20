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
import maleIcon from '../../images/Component 197.png'
import femaleIcon from '../../images/Component 198.png'
import { useAuth } from '../../contexts/AuthContext'

function StdPersonalDetails() {
  const { studentData } = useContext(StudentContext)
  const [fullName , setFullName] = useState()
  const [gender , setGender] = useState()
  const [birthday , setBirthday] = useState()
  const [address, setAddress] = useState()
  // const [formattedBirthday ,setFormattedBirthday] = useState()
  const [controlInput , setControlInput] = useState(true)
  const { server , lang , direction , getCookie , deleteCookie ,loading , setLoading , errors , setErrors} = useContext(AppContext)
  const {accessToken} = useAuth()

  const updateData = async () => {
    const token = getCookie('token')
    if (!token && !getCookie('refreshToken')) {
      throw new Error ('token not found')
    } else {
      setLoading(true)
      await axios.put(`${server}/api/student/account/personaldetails`, {
        firstName : fullName.split(' ')[0] ,
        middleName : fullName.split(' ')[1],
        lastName: fullName.split(' ')[2] || '',
        gender: gender,
        address: address,
        birthDay : new Date(birthday).toISOString() 
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
        // if (error.response.statusText === 'Unauthorized') {
        //   setTimeout(() => {
        //     deleteCookie('token')
        //     deleteCookie('userLoggedIn')
        //     window.location.reload()
        //   } , 500)
        // }
      })
      
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
        setFullName(`${res.data.firstName} ${res.data.middleName} ${res.data.lastName}`)
        setAddress(res.data.address)
        setGender(res.data.gender)
        const originalDate = new Date(res.data.birthDay);
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, "0"); 
        const day = String(originalDate.getDate()).padStart(2, "0");
        const formattedDateString = `${year}-${month}-${day}`;
        setBirthday(formattedDateString)
      })
    }
    fetchData()

    if (window.localStorage.getItem('theme') === 'dark') {
      document.documentElement.style.setProperty('--input-background', 'transparent')
      document.documentElement.style.setProperty('--path-svg', '#667787')
    }
  }, [window.localStorage.getItem('theme')])

  // console.log(gender)

  const inputDateType = controlInput === true ? 'text' : 'date'
  return (
    <React.Fragment>
    { errors !== '' ? <div className="alert alert-danger">{errors}</div> :
      loading === true ?
        <Loading />
          : 
          <>
            <Navbar showhomeNavbarBtn={true}/>
            <div className="student-homepage personal-details" style={{direction : direction}}>
              <div className="container">
                <div className="head-exam">
                  <div className="text">
                    <h1>{lang === 'ar' ? 'إعدادات الحساب' : 'Account Control'}</h1>
                  </div>
                  <div className="gradient-text backHome">
                    <button onClick={()=>window.location.assign('/athena-homepage')}>{lang === 'ar' ? 'العودة إلى الرئيسية' : 'Back To Home'}</button>
                  </div>
                </div>
                <div className="content">
                  <div className="account-control ">
                    <div className="header">
                      <h1>
                        <svg width="35" height="42" viewBox="0 0 35 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.1785 20.752C26.3354 24.0153 22.1655 26.0904 17.5122 26.0904C12.8527 26.0904 8.67651 24.0171 5.82903 20.7556C2.26236 23.9591 0 28.5857 0 33.7397V36.8139C0 39.4456 2.1643 41.5851 4.79605 41.5851H30.2288C32.8605 41.5851 35 39.4449 35 36.8139V33.7397C35 28.5841 32.7429 23.9557 29.1799 20.7522L29.1785 20.752Z" />
                          <path d="M17.5062 21.1764C23.3352 21.1764 28.0824 16.4295 28.0824 10.5762C28.0824 4.74718 23.3355 0 17.5062 0C11.653 0 6.90601 4.74695 6.90601 10.5762C6.90601 16.4295 11.653 21.1764 17.5062 21.1764Z" />
                        </svg>
                        <span>{lang === 'ar' ?'البيانات الشخصية' :'Personal Details'}</span>
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
                    {studentData === null ? setLoading(true) :
                      <div className="personal-content">
                        <div className="left-inputs">
                          <div className="input">
                            <label htmlFor="full-name">{lang === 'ar' ?'الاسم بالكامل' :'Full Name'}</label>
                            <input disabled={controlInput} type="text" id='full-name' value={fullName} onChange={(e)=>setFullName(e.currentTarget.value)}/>
                          </div>
                          <div className="input">
                            <label htmlFor="birthday">{lang === 'ar' ?'تاريخ الميلاد' :'Date of Birth'}</label>
                            <input disabled={controlInput} type={inputDateType} id='birthday' value={birthday} onChange={(e)=>setBirthday(e.currentTarget.value)}/>
                          </div>
                        </div>
                        <div className="left-inputs">
                          <div className="input">
                            <label htmlFor="gender">{lang === 'ar' ? 'الجنس' : 'Gender'}</label>
                            {controlInput === true && (
                              <input disabled={true} type="text" id='gender' value={gender} onChange={(e)=>setGender(e.target.value)}/>
                            )}
                            {controlInput === false && (
                              <div className="genders">
                                <input dir='auto' checked={gender === 'male' ? true : false} required  onChange={(e)=>setGender(e.target.value)} hidden type="radio" id='male' name='gender' value="male"/>
                                <label  htmlFor="male">
                                  <img src={maleIcon} alt="male Icon" loading='lazy' />
                                </label>
                                  <input dir='auto' checked={gender === 'female' ? true : false} required onChange={(e)=>setGender(e.target.value)} hidden type="radio" id='female' name='gender' value="female"/>
                                <label htmlFor="female">
                                  <img src={femaleIcon} alt="female Icon" loading='lazy' />
                                </label>
                              </div>
                            )}
                          </div>
                          <div className="input">
                            <label htmlFor="address">{lang === 'ar' ?'العنوان بالكامل' :'Full Address'}</label>
                            <input disabled={controlInput} type="text" id='address' value={address} onChange={(e)=>setAddress(e.currentTarget.value)}/>
                          </div>
                        </div>
                      </div>
                    }
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

export default StdPersonalDetails
