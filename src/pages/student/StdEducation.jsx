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



function StdEducation() {
  const [classification , setClassification] = useState(null)
  const [school , setSchool] = useState(null)
  const [studentLevel , setStudentLevel] = useState(null)
  const [scientificDivision, setScientificDivision] = useState(null)
  const [controlInput, setControlInput] = useState(true)
  const [level , setLevel] = useState()

  const { accessToken} = useAuth()
  const {lang , direction , server , getCookie , deleteCookie ,loading , setLoading , errors , setErrors} = useContext(AppContext)
  

  const updateData = async () => {
    await axios.put(`${server}/api/student/account/educationdetails`, {
      school : school,
      levelClassificationId: scientificDivision || level,
    }, {
      headers: {
        Authorization : `Bearer ${accessToken}`
      }
    }).then(() => {
      // setLoading(false)
      setErrors('')
      Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        position : 'top-right'
      })
      setControlInput(true)
      window.location.reload()
    }).catch(error => {
      setLoading(false)
      setErrors(error.message)
    })
    
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await axios.get(`${server}/api/dashboard/levels`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setLoading(false)
        setErrors('')
        setClassification(res.data)
        // console.log(res.data)
      }).catch((error) => {
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
    fetchData()
    const fetchStdData = async () => {
      setLoading(true)
      await axios.get(`${server}/api/student/account`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        // console.log(res.data)
        setLoading(false)
        setSchool(res.data.school)
        setLevel(res.data.levelClassificationId)
      })
    }
    fetchStdData()
    if (window.localStorage.getItem('theme') === 'dark') {
      document.documentElement.style.setProperty('--input-background', 'transparent')
      document.documentElement.style.setProperty('--path-svg', '#667787')
    }
  }, [window.localStorage.getItem('theme')])

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
                        <svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M34.5718 0.105175C34.2019 -0.0350584 33.7937 -0.0350584 33.4238 0.105175L0 12.6405L1.88445 13.3526L33.5492 25.1779C33.9188 25.3181 34.3274 25.3181 34.6972 25.1779L63.992 14.1766H63.9916C64.4138 14.0212 64.7537 13.6993 64.9318 13.286C65.1096 12.8723 65.1096 12.4043 64.9318 11.9911C64.7537 11.5774 64.4138 11.2555 63.9916 11.1L34.5718 0.105175Z" />
                          <path d="M14.6686 21.8969C14.4178 21.8051 14.1377 21.8418 13.919 21.9957C13.7006 22.1496 13.5713 22.4008 13.5733 22.668V32.1002C13.5733 36.2288 22.6633 39.5426 33.9968 39.5426C41.6668 39.5426 48.2761 38 51.8172 35.7648C53.4734 34.6957 54.447 33.398 54.447 32.101V22.5367C54.447 22.2683 54.3153 22.0175 54.0946 21.8652C53.8743 21.7129 53.5927 21.6785 53.3423 21.7738L34.2778 28.9084C34.0942 28.9787 33.8914 28.9787 33.7079 28.9084L14.6686 21.8969ZM67.0699 14.8233C66.7722 14.9194 66.557 15.1792 66.5175 15.4893L66.1058 18.7589L64.7035 28.6901C64.6699 28.9245 64.7398 29.162 64.8953 29.3405C65.0507 29.5194 65.2761 29.6213 65.5129 29.621H69.1857C69.4216 29.6206 69.6458 29.5178 69.8005 29.3397C69.9548 29.1616 70.0247 28.9252 69.9919 28.6916L68.1337 15.4823L68.1333 15.4819C68.1016 15.2425 67.9641 15.0296 67.7587 14.9022C67.5532 14.7749 67.3012 14.7463 67.0727 14.8249L67.0699 14.8233Z" />
                        </svg>
                        <span>{lang === 'ar' ? 'بيانات التعليم' : "Education Details"}</span>
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
                          <label htmlFor="School">{lang === 'ar' ? 'المدرسة' : "School"}</label>
                          <input type="text" id='School' disabled={controlInput} value={school} onChange={(e)=>setSchool(e.currentTarget.value)}/>
                        </div>
                        {studentLevel === null ? null :
                          <div className="input">
                            <label htmlFor="Scientific Division">{lang === 'ar' ? 'الشعبة العلمية' : "Scientific Division"}</label>
                            <select disabled={controlInput} onChange={(e) => setScientificDivision(e.currentTarget.value)}>
                              <option value="">{lang === 'ar' ? 'الشعبة العلمية' : "Scientific Division"}</option>
                              {classification !== null
                                ?
                                classification.filter(f => f.id === studentLevel)[0].classifications.map((p) => {
                                  return <option key={p.name} value={p.levelClassificationId} >{p.name}</option>
                                })
                                
                            :null  }
                            </select>
                            {/* <input type="text" id='Scientific Division' value={scientificDivision} onChange={(e)=>setScientificDivision(e.currentTarget.value)}/> */}
                          </div>
                        }
                      </div>
                      <div className="left-inputs">
                        <div className="input">
                          <label htmlFor="Study Level">{lang === 'ar' ? 'الصف الدراسي' : "Study Level"}</label>
                          <select  disabled={controlInput} name="studentLevel" id="studentLevel" onChange={(e) => setStudentLevel(e.currentTarget.value)}>
                            <option value="" >{lang === 'ar' ? 'الصف الدراسي' : "Study Level"}</option>
                            {classification !== null
                              ?
                              classification.map((p) => {
                                return <option key={p.id} value={p.id}>{p.name}</option>
                              })
                              
                              : null}
                          </select>
                          {/* <input type="text" id='Study Level' disabled={true} value={stdLevel} onChange={(e)=>setStdLevel(e.currentTarget.value)}/> */}
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

export default StdEducation
