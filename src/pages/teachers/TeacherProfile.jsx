import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../../styles/css/teachers/teacherprofile.css'
import imageBackground from '../../images/imageBackground.png'
import avatar from '../../images/info.png'
import FixedRating from '../../components/FixedRating'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import Loading from '../../components/Loading'
import { useAuth } from '../../contexts/AuthContext'


function TeacherProfile() {
  const [loveTeacher, setLoveTeacher] = useState(false)
  const [teacherData, setTeacherData] = useState(null)
  const [birthdayDate , setBirthdayDate] = useState()
  const {lang , server , direction , getCookie , loading , setLoading, errors ,setErrors} = useContext(AppContext)
  let  params  = useParams();
  const{accessToken} = useAuth()
    const dateObject = new Date(birthdayDate);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Adding 1 since months are zero-indexed
    const day = dateObject.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie('token');
        if (!token && !getCookie('refreshToken')) {
          throw new Error('Token not found');
        }
      setLoading(true)
      await axios.get(`${server}/api/student/teachers/explore/${params.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => {
        setLoading(false)
        setTeacherData(res.data)
        setBirthdayDate(res.data.details.birthDay)
        // console.log(res.data)
      }).catch((error) => {
        setLoading(false)
        setErrors(error.message)
      })
    }
    fetchData()
    if (lang === 'ar') {
      document.documentElement.style.setProperty('--right-half-star' , '0')
      document.documentElement.style.setProperty('--left-half-star' , 'unset')
    }
    if (window.localStorage.getItem('theme') === "dark") {
      document.documentElement.style.setProperty('--tab-boxShadow' , 'transparent')
      document.documentElement.style.setProperty('--tab-background', 'transparent')

    }
  } , [window.localStorage.getItem('theme')])
  // console.log(teacherData)

  return (
    <React.Fragment>
      {errors !== '' ? 
        <div className="alert alert-danger">{errors}</div>
        :
        loading === true ?
          <Loading />
          :
          teacherData !== null ?
          <div className="teacherprofileComponent" style={{direction : direction}}>
            <Navbar showhomeNavbarBtn={true} />
            <div className="teacher-profile">
              <div className="big-background">
                <img src={imageBackground} alt="teacher background image" loading='lazy'/>
                <div className="teacher-buttons">
                  <button className='heart' onClick={()=>setLoveTeacher(!loveTeacher)}>
                    {loveTeacher === true ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                      </svg>
                    }
                  </button>
                    <button className='ask-ques'>{lang === 'ar' ? 'أسأل سؤال' : 'Ask Question'}</button>
                </div>
              </div>
              <div className="container">
                <div className="content">
                  <div className="teacher-info">
                    <div className="image gradient-border">
                      <img src={`${server}/${teacherData.details.image}`} alt="teacher image" loading='lazy'/>
                    </div>
                    <div className="text">
                      <h1 className='gradient-text'>{teacherData.details.name}</h1>
                      <div className="cont">
                        <div className="subject">{teacherData.details.course}</div>
                        <span></span>
                        <div className="rating">
                          <h3>Rating : Rating : 12754 Vote</h3>
                          <div className="stars">
                          <FixedRating rating={4.5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="teacher-details">
                    <div className="time-table-teacher">
                      <div className="special-head">
                          <h3 className='gradient-text'>{lang === 'ar' ? 'الجدول المدرسي' : 'Time Table'}</h3>
                      </div>
                        <h4>{lang === 'ar' ? 'أيام الحضور' : 'Days of Attendance'}</h4>
                        <div className="dates">
                          <div className="date">
                            <div className="teacher-tab">Saturday</div>
                            <div className="teacher-tab">07:00 AM</div>
                          </div>
                          <div className="date">
                            <div className="teacher-tab">Saturday</div>
                            <div className="teacher-tab">07:00 AM</div>
                          </div>
                          <div className="date">
                            <div className="teacher-tab">Saturday</div>
                            <div className="teacher-tab">07:00 AM</div>
                          </div>
                        </div>
                        <h4>{lang === 'ar' ? 'مجموعتي' : 'My Group'}</h4>
                        <div className="submitBtn special">{lang === 'ar' ? 'مجموعة هوكينج' : 'Hawking Group'}</div>
                    </div>
                    <div className="details-of-teacher">
                      <div className="special-head">
                        <h3 className='gradient-text'>{lang === 'ar' ? 'تفاصيل المدرس' : 'Teacher Details'}</h3>
                      </div>
                      <div className="content">
                        <div className="left">
                          <div className="cont">
                            <h4>{lang === 'ar' ? 'تاريخ الميلاد' : 'Born'}</h4>
                            <div className="teacher-tab">{formattedDate}</div>
                          </div>
                          <div className="cont">
                            <h4>{lang === 'ar' ? 'الجنسية' : 'Nationality'}</h4>
                            <div className="teacher-tab">{teacherData.details.nationality}</div>
                          </div>
                          <div className="cont">
                            <h4>{lang === 'ar' ? 'التعليم' : 'Education'}</h4>
                            <div className="teacher-tab">{teacherData.details.education}</div>
                          </div>
                        </div>
                        <div className="right">
                          <div className="cont">
                              <h4>{lang === 'ar' ? 'المقرات' : 'Headquarters'}</h4>
                              {teacherData.headquartersDetails !== undefined ?
                                teacherData.headquartersDetails.map((p) => (
                                  <div className="teacher-tab" key={p.id}>{p.city } , {p.region } , {p.street}</div>
                                ))
                                : 
                                null
                            }
                          </div>
                          <div className="cont">
                            <h4>{lang === 'ar' ? 'المدرسة' : 'School'}</h4>
                            <div className="teacher-tab">{teacherData.details.school}</div>
                          </div>
                          <div className="cont">
                            <h4>{lang === 'ar' ? 'طرق التدريس' : 'Teaching Types'}</h4>
                            <div className="teacher-tab">{teacherData.details.teachingTypes}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="teacher-contacts">
                      <div className="special-head">
                        <h3 className='gradient-text'>{lang === 'ar' ? 'طرق التواصل' : 'Contacts'}</h3>
                      </div>
                      <div className="content">
                        <div className="left">
                          <h4>{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</h4>
                          <div className="teacher-tab">{teacherData.contactDetails.phone}</div>
                          <h4>{lang === 'ar' ? 'البريد الالكتروني' : 'Email Address'}</h4>
                          <div className="teacher-tab">{teacherData.contactDetails.email}</div>
                          <div className="social-links">
                            <a href={teacherData.contactDetails.facebook} target='_blank'>
                              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M29 14.5C29 6.496 22.504 0 14.5 0C6.496 0 0 6.496 0 14.5C0 21.518 4.988 27.3615 11.6 28.71V18.85H8.7V14.5H11.6V10.875C11.6 8.0765 13.8765 5.8 16.675 5.8H20.3V10.15H17.4C16.6025 10.15 15.95 10.8025 15.95 11.6V14.5H20.3V18.85H15.95V28.9275C23.2725 28.2025 29 22.0255 29 14.5Z"/>
                              </svg>
                            </a>
                            <a href={teacherData.contactDetails.twitter} target='_blank'>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.5 0C6.49263 0 0 6.49263 0 14.5C0 22.5074 6.49263 29 14.5 29C22.5074 29 29 22.5074 29 14.5C29 6.49263 22.5074 0 14.5 0ZM21.4684 10.93C21.4781 11.0821 21.4781 11.2407 21.4781 11.3961C21.4781 16.1474 17.8596 21.6205 11.2472 21.6205C9.20815 21.6205 7.31797 21.0282 5.72556 20.0087C6.01685 20.0411 6.2952 20.054 6.59297 20.054C8.276 20.054 9.8231 19.4844 11.0562 18.5199C9.47679 18.4875 8.14978 17.4518 7.69665 16.0277C8.25011 16.1086 8.74855 16.1086 9.31819 15.9629C8.50492 15.7977 7.77393 15.356 7.24941 14.7129C6.72488 14.0698 6.43919 13.2649 6.44085 12.435V12.3897C6.91663 12.6584 7.47656 12.8234 8.06239 12.8461C7.56991 12.5179 7.16604 12.0732 6.88657 11.5515C6.60709 11.0299 6.46067 10.4473 6.46027 9.85547C6.46027 9.18549 6.63505 8.57377 6.949 8.04297C7.85169 9.15421 8.97812 10.0631 10.2551 10.7105C11.532 11.3579 12.9309 11.7293 14.3608 11.8007C13.8527 9.35703 15.6781 7.37946 17.8725 7.37946C18.9083 7.37946 19.8404 7.81317 20.4974 8.51228C21.3098 8.36016 22.0866 8.05591 22.7792 7.6481C22.5106 8.47991 21.9474 9.18225 21.1998 9.62567C21.9248 9.54799 22.6239 9.34732 23.2712 9.06574C22.7825 9.78426 22.1708 10.4219 21.4684 10.93Z" />
                              </svg>
                            </a>
                            <a href={teacherData.contactDetails.youtube} target='_blank'>
                              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.9212 14.2478L13.5288 12.6648C13.2328 12.5274 12.9896 12.6815 12.9896 13.0092V15.9908C12.9896 16.3185 13.2328 16.4726 13.5288 16.3352L16.9197 14.7522C17.2172 14.6133 17.2172 14.3867 16.9212 14.2478ZM14.5 0C6.49177 0 0 6.49177 0 14.5C0 22.5082 6.49177 29 14.5 29C22.5082 29 29 22.5082 29 14.5C29 6.49177 22.5082 0 14.5 0ZM14.5 20.3906C7.07781 20.3906 6.94792 19.7215 6.94792 14.5C6.94792 9.27849 7.07781 8.60937 14.5 8.60937C21.9222 8.60937 22.0521 9.27849 22.0521 14.5C22.0521 19.7215 21.9222 20.3906 14.5 20.3906Z" />
                              </svg>
                            </a>
                            <a href={teacherData.contactDetails.website} target='_blank'>
                              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.822 17.4C20.938 16.443 21.025 15.486 21.025 14.5C21.025 13.514 20.938 12.557 20.822 11.6H25.723C25.955 12.528 26.1 13.4995 26.1 14.5C26.1 15.5005 25.955 16.472 25.723 17.4M18.2555 25.462C19.1255 23.8525 19.7925 22.1125 20.2565 20.3H24.534C23.1292 22.719 20.9005 24.5514 18.2555 25.462ZM17.893 17.4H11.107C10.962 16.443 10.875 15.486 10.875 14.5C10.875 13.514 10.962 12.5425 11.107 11.6H17.893C18.0235 12.5425 18.125 13.514 18.125 14.5C18.125 15.486 18.0235 16.443 17.893 17.4ZM14.5 26.042C13.2965 24.302 12.325 22.3735 11.7305 20.3H17.2695C16.675 22.3735 15.7035 24.302 14.5 26.042ZM8.7 8.7H4.466C5.85634 6.27446 8.08345 4.43916 10.73 3.538C9.86 5.1475 9.2075 6.8875 8.7 8.7ZM4.466 20.3H8.7C9.2075 22.1125 9.86 23.8525 10.73 25.462C8.089 24.5509 5.86503 22.7182 4.466 20.3ZM3.277 17.4C3.045 16.472 2.9 15.5005 2.9 14.5C2.9 13.4995 3.045 12.528 3.277 11.6H8.178C8.062 12.557 7.975 13.514 7.975 14.5C7.975 15.486 8.062 16.443 8.178 17.4M14.5 2.9435C15.7035 4.6835 16.675 6.6265 17.2695 8.7H11.7305C12.325 6.6265 13.2965 4.6835 14.5 2.9435ZM24.534 8.7H20.2565C19.8027 6.90411 19.1307 5.17055 18.2555 3.538C20.9235 4.4515 23.142 6.293 24.534 8.7ZM14.5 0C6.4815 0 0 6.525 0 14.5C0 18.3456 1.52767 22.0338 4.24695 24.753C5.5934 26.0995 7.19187 27.1676 8.95109 27.8963C10.7103 28.6249 12.5958 29 14.5 29C18.3456 29 22.0338 27.4723 24.753 24.753C27.4723 22.0338 29 18.3456 29 14.5C29 12.5958 28.6249 10.7103 27.8963 8.95109C27.1676 7.19187 26.0995 5.5934 24.753 4.24695C23.4066 2.9005 21.8081 1.83244 20.0489 1.10375C18.2897 0.375054 16.4042 0 14.5 0Z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            : null
      }
    </React.Fragment>
  )
}

export default TeacherProfile
