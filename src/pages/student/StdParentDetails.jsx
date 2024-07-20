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
import { useAuth } from '../../contexts/AuthContext'



function StdParentDetails() {
  const [parentName , setParentName] = useState('')
  const [parentJob , setParentJob] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [controlInput , setControlInput] = useState(true)
  
  const {lang,direction , server , getCookie ,deleteCookie, loading , setLoading , errors , setErrors} = useContext(AppContext)
  const { accessToken} = useAuth()
  

  const updateData = async () => {
    const token = getCookie('token')
    if (!token && !getCookie('refreshToken')) {
      throw new Error ('token not found')
    } else {
      // setLoading(true)
      await axios.put(`${server}/api/student/account/parentdetails`, {
        parentName : parentName,
        parentJob: parentJob,
        parentPhone: parentPhone,
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
          timer: 1000,
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
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await axios.get(`${server}/api/student/account`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setLoading(false)
        setParentName(res.data.parentName)
        setParentJob(res.data.parentJob)
        setParentPhone(res.data.parentPhone)
      })
    }
    fetchData()
    if (window.localStorage.getItem('theme') === 'dark') {
      document.documentElement.style.setProperty('--input-background', 'transparent')
      document.documentElement.style.setProperty('--path-svg', '#667787')
    }
  } , [window.localStorage.getItem('theme')])
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
                        <svg width="50" height="36" viewBox="0 0 50 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.7414 3.89275C12.7414 6.04279 10.9983 7.78578 8.84832 7.78578C6.69837 7.78578 4.95557 6.0427 4.95557 3.89275C4.95557 1.74271 6.69828 0 8.84832 0C10.9984 0 12.7414 1.74271 12.7414 3.89275Z"/>
  <path d="M13.7935 10.7335C13.1095 9.47088 11.8471 8.73438 10.4266 8.73438H7.21757C5.79708 8.73438 4.53469 9.52333 3.85071 10.7335L0.220708 17.5726C-0.252674 18.4144 0.0629143 19.4664 0.904716 19.8874C1.16783 20.0452 1.43094 20.0977 1.69367 20.0977C2.32485 20.0977 2.90355 19.7821 3.2191 19.2034L5.37609 15.1525L3.69285 32.9338C3.58753 34.0387 4.37685 35.0379 5.4814 35.1433H5.69167C6.74372 35.1433 7.58553 34.3543 7.69084 33.3019L8.79578 21.8335L9.90072 33.3019C10.006 34.3539 10.9004 35.1433 11.8999 35.1433H12.1102C13.2151 35.038 14.0565 34.0384 13.8987 32.9338L12.1627 15.1525L14.3197 19.2034C14.7931 20.0452 15.7927 20.3608 16.6345 19.8874C17.4763 19.414 17.7918 18.4144 17.3185 17.5726L13.7935 10.7335Z"/>
  <path d="M45.0421 3.89275C45.0421 6.04279 43.2994 7.78578 41.1494 7.78578C38.9993 7.78578 37.2563 6.0427 37.2563 3.89275C37.2563 1.74271 38.9994 0 41.1494 0C43.2993 0 45.0421 1.74271 45.0421 3.89275Z"/>
  <path d="M49.776 17.5726L46.146 10.7335C45.462 9.47088 44.1996 8.73438 42.7792 8.73438H39.5701C38.1496 8.73438 36.8872 9.52333 36.2032 10.7335L32.5732 17.5726C32.0999 18.4144 32.4155 19.4665 33.2573 19.8874C34.0991 20.3608 35.1511 20.0452 35.5721 19.2034L37.834 14.9947L37.5709 17.6251C37.5184 18.2038 37.3606 18.7824 37.0447 19.3087L34.2565 24.4116C33.7302 25.3059 34.4143 26.4633 35.4663 26.4633H36.7815L36.1504 32.9339C36.045 33.986 36.8344 34.9331 37.8864 35.038H38.0967C39.0963 35.038 39.9381 34.3015 40.043 33.302L40.727 26.4629H41.7791L42.4631 33.302C42.5684 34.3016 43.4099 35.038 44.4095 35.038H44.6198C45.6718 34.9327 46.4612 33.986 46.3558 32.9339L45.7246 26.4633H47.0398C48.0918 26.4633 48.7234 25.3584 48.2497 24.4116L45.4091 19.3087C45.146 18.7825 44.9357 18.2038 44.8828 17.6251L44.6197 14.9947L46.8817 19.2034C47.1972 19.7821 47.7759 20.0977 48.4071 20.0977C48.6702 20.0977 48.9858 20.0452 49.196 19.8874C49.9336 19.4665 50.2492 18.4144 49.7758 17.5726H49.776Z"/>
  <path d="M28.3656 10.8376C28.3656 12.697 26.8581 14.2044 24.9987 14.2044C23.1393 14.2044 21.6318 12.697 21.6318 10.8376C21.6318 8.97819 23.1393 7.4707 24.9987 7.4707C26.8581 7.4707 28.3656 8.97819 28.3656 10.8376Z"/>
  <path d="M28.7854 16.4668C28.2591 15.5201 27.3124 14.9414 26.2075 14.9414H23.7874C22.6824 14.9414 21.7357 15.5201 21.2095 16.4668L18.4213 21.675C18.0529 22.3062 18.316 23.0955 18.9476 23.4636C19.1578 23.5689 19.3685 23.6214 19.5787 23.6214C20.0521 23.6214 20.5255 23.3583 20.7361 22.9374L22.3668 19.8337L21.0516 33.4063C20.9463 34.2481 21.5779 34.9846 22.4193 35.09H22.5771C23.3661 35.09 24.0501 34.5113 24.1026 33.6695L24.9976 24.9366L25.8394 33.722C25.8918 34.5109 26.5759 35.1425 27.3648 35.1425H27.5226C28.3644 35.0372 28.9956 34.3007 28.8903 33.4589L27.6279 19.8862L29.2586 22.9899C29.6271 23.6211 30.416 23.8842 31.0472 23.5161C31.6784 23.1477 31.9415 22.3588 31.5734 21.7276L28.7854 16.4668Z"/>
                        </svg>
                        <span>{lang === 'ar' ? 'بيانات ولي الأمر' : "Parents Details"}</span>
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
                      <div className="left-inputs">
                        <div className="input">
                          <label htmlFor="parent-name">{lang === 'ar' ? 'أسم ولي الأمر' : "Parent's Name"}</label>
                          <input disabled={controlInput} type="text" id='parent-name' value={parentName} onChange={(e)=>setParentName(e.currentTarget.value)}/>
                        </div>
                        <div className="input">
                          <label htmlFor="parent-phone">{lang === 'ar' ? 'رقم هاتف ولي الأمر' : "Parent's Phone Number"}</label>
                          <input disabled={controlInput} type="text" id='parent-phone' value={parentPhone} onChange={(e)=>setParentPhone(e.currentTarget.value)}/>
                        </div>
                      </div>
                      <div className="left-inputs">
                        <div className="input">
                          <label htmlFor="parent-job">{lang === 'ar' ? 'وظيفة ولي الأمر' : "Parent's Job"}</label>
                          <input disabled={controlInput} type="text" id='parent-job' value={parentJob} onChange={(e)=>setParentJob(e.currentTarget.value)}/>
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

export default StdParentDetails
