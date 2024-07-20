import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import avatar from '../../images/info.png'
import athenahand from '../../images/Layer 2.png'
import NextClasses from '../../components/NextClasses'
import '../../styles/css/athena Home/athenaHomePage.css'
import UpcomingExams from '../../components/UpcomingExams'
import ExploreTeachers from '../../components/ExploreTeachers'
import Wisdom from '../../components/Wisdom'
import Footer from '../../components/Footer'
import { AppContext } from '../../contexts/AppContext'
import axios from 'axios'
import Loading from '../../components/Loading'
import { StudentContext } from '../../contexts/stdContext'
import i18next from 'i18next'
import { useAuth } from '../../contexts/AuthContext'

function AthenaHome() {
  const { direction, server, getCookie, loading, setLoading, errors, setErrors, lang } =
    useContext(AppContext)
  const { studentData } = useContext(StudentContext)
  const { accessToken } = useAuth()
  const [exploreTeachers, setExploreTeachers] = useState()
  const [nextClassesData, setNextClassesData] = useState(null)
  const [upcomingExamsData, setUpcomingExamsData] = useState()

  useEffect(() => {
    // console.log(accessToken)
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = getCookie('token')
        const refreshToken = getCookie('refreshToken')
        if (!token && !refreshToken) {
          throw new Error('Token not found')
        }

        await axios
          .get(`${server}/api/student/home`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setErrors('')
            setExploreTeachers(response.data.exploreTeachers)
            setNextClassesData(response.data.nextClasses)
            setUpcomingExamsData(response.data.upcommingExams)
            setLoading(false)
          })
      } catch (error) {
        setLoading(false)
        if (error.response && error.response.status === 401) {
          // setErrors('You have to login again')
        } else {
          setErrors(error.message)
          // console.log(error);
        }
      }
    }

    fetchData()

    if (window.localStorage.getItem('theme') === 'light') {
      document.documentElement.style.setProperty(
        '--athenahome-image-boxShadow',
        '5px 5px 22px 1px rgba(78, 167, 255, 0.3)',
      )
      document.documentElement.style.setProperty(
        '--athenahome-elemnts-background',
        'rgba(242, 249, 255, 0.2)',
      )
      document.documentElement.style.setProperty('--athenahome-code-background', '#fff')
      document.documentElement.style.setProperty('--athenahome-themes-text', '#4EA7FF')
    } else {
      document.documentElement.style.setProperty('--athenahome-image-boxShadow', 'initial')
      document.documentElement.style.setProperty('--athenahome-elemnts-background', '#002E5A')
      document.documentElement.style.setProperty('--athenahome-code-background', '#001C37')
      document.documentElement.style.setProperty('--athenahome-themes-text', '#fff')
    }
  }, [window.localStorage.getItem('theme')])

  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          h1: 'Good Morning',
          soon: 'Soon',
          code: 'Your Code',
          'athena-hands': 'Athena Hands',
          'athena-p': 'A round of high-level questions Try our digital MCQ form',
          'athena-btn': 'Discover',
        },
      },
      ar: {
        translation: {
          h1: 'صباح الخير',
          soon: 'قريباً',
          code: 'الكود الخاص بك',
          'athena-hands': 'آيادي أثينا',
          'athena-p': 'جولة من الأسئلة رفيعة المستوى جرب نموذج MCQ الرقمي الخاص بنا',
          'athena-btn': 'كفك 👋',
        },
      },
    },
  })
  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : errors ? (
        <div className="alert alert-danger">{errors}</div>
      ) : (
        <div className="athena-homepage" style={{ direction: direction }}>
          <Navbar showhomeNavbarBtn={true} />
          <div className="container">
            <div className="content">
              <div className="first-sec">
                <h1>
                  {i18next.t('h1', { lng: lang })},
                  {studentData !== null ? studentData.firstName : null}
                </h1>
                <div className="cont">
                  <div className="image">
                    <img
                      src={
                        studentData !== null && studentData.image !== ''
                          ? `${server}/${studentData.image}`
                          : avatar
                      }
                      alt="avatart img"
                      loading="lazy"
                    />
                  </div>
                  <div className="student-tabs">
                    <div className="tab1">
                      <div className="numb">
                        <div className="icon">
                          <svg viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask
                              id="mask0_2797_10982"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="15"
                              height="16"
                            >
                              <path
                                d="M7.75 14.8699C11.478 14.8699 14.5 11.7651 14.5 7.93493C14.5 4.10477 11.478 1 7.75 1C4.02198 1 1 4.10477 1 7.93493C1 11.7651 4.02198 14.8699 7.75 14.8699Z"
                                fill="white"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4.0376 9.66915V6.20168L6.0626 7.24192L7.7501 4.8147L9.4376 7.24192L11.4626 6.20168V9.66915H4.0376Z"
                                fill="black"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </mask>
                            <g mask="url(#mask0_2797_10982)">
                              <path
                                d="M-0.350098 -0.385986H15.8499V16.2579H-0.350098V-0.385986Z"
                                fill="#E8F3FF"
                              />
                            </g>
                          </svg>
                        </div>
                        <p>#25</p>
                      </div>
                      <h3 className="text">{i18next.t('soon', { lng: lang })}</h3>
                    </div>
                    <div className="tab2">
                      <span>{i18next.t('code', { lng: lang })}</span>
                      <div className="code">
                        <p>{studentData !== null ? studentData.code : null}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="icon">
                      <img src={athenahand} alt="icon" loading="lazy" />
                    </div>
                    <div className="text">
                      <h4>{i18next.t('athena-hands', { lng: lang })}</h4>
                      <h5>{i18next.t('athena-p', { lng: lang })}</h5>
                      <a href="/exam-homepage">
                        <button className="submitBtn special">
                          {i18next.t('athena-btn', { lng: lang })}
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <NextClasses classes={nextClassesData} />
              <UpcomingExams exams={upcomingExamsData} />
              <ExploreTeachers teachers={exploreTeachers} />
              <Wisdom />
              <Footer />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default AthenaHome
