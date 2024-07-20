import React , { useContext, useEffect } from 'react'
import avatar from '../../images/info.png'
import { AppContext } from '../../contexts/AppContext'
import { StudentContext } from '../../contexts/stdContext'
import Loading from '../../components/Loading'

function StudentInfo() {
  const {lang , server, setErrors, deleteCookie, getCookie , setLoading} = useContext(AppContext)
  const { studentData} = useContext(StudentContext)


  useEffect(() => {
    const token = getCookie('token')
    if (!token && !getCookie('refreshToken')) {
      setErrors('token not found')
      deleteCookie('token')
      deleteCookie('userLoggedIn')
      // window.location.reload()
    }
    if (window.localStorage.getItem('theme') === 'dark') {
      document.documentElement.style.setProperty('--std-shadow', '0px 0px 5px 1px #4ea7ff30');
    }
  } , [window.localStorage.getItem('theme')])
  return (
    <>
      {studentData === null ? <Loading />:
        <div className="right">
          <div className="std-info">
            <div className="image gradient-border">
              <img src={`${studentData.image}` !== '' ? `${server}/${studentData.image}` : avatar} alt="student photo" loading='lazy'/>
            </div>
            <div className="text">
              <h1>{studentData.firstName} {studentData.lastName}</h1>
              <h3>{studentData.level}</h3>
              <h3>{studentData.classification}</h3>
            </div>
          </div>
          <div className="student-tabs">
            <div className="tab1">
              <div className="numb">
                <div className="icon">
                  <svg viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_2797_10982"  maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="16">
                  <path d="M7.75 14.8699C11.478 14.8699 14.5 11.7651 14.5 7.93493C14.5 4.10477 11.478 1 7.75 1C4.02198 1 1 4.10477 1 7.93493C1 11.7651 4.02198 14.8699 7.75 14.8699Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.0376 9.66915V6.20168L6.0626 7.24192L7.7501 4.8147L9.4376 7.24192L11.4626 6.20168V9.66915H4.0376Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                  </mask>
                  <g mask="url(#mask0_2797_10982)">
                  <path d="M-0.350098 -0.385986H15.8499V16.2579H-0.350098V-0.385986Z" fill="#E8F3FF"/>
                  </g>
                  </svg>
                </div>
                <p>#{studentData !== null ?parseInt(`${studentData.code}`.replace(/^#0+/, '')) : null}</p>
              </div>
              <h3 className="text">{lang === 'ar' ? 'قريباً' :'Coming Soon'}</h3>
            </div>
            <div className="tab2"><span>{lang === 'ar' ? 'الكود الخاص بك' :'Your ID Code'}</span><div className='code'><p>{studentData.code}</p></div></div>
            <h6>{lang === 'ar' ? 'شارك الكود الخاص بك مع معلميك الجدد' :'Share Your ID Code With Your New Teachers'}</h6>
          </div>
        </div>
      }
    </>
  )
}

export default StudentInfo
