import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import examlogo from '../../images/Group 507.png'
import examlogo1 from '../../images/Group 507 (1).png'
import { Navigation, Pagination, Scrollbar, Autoplay ,A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import avatar from '../../images/info.png'
import teacher from '../../images/اينشتاين.png'
import moment from 'moment'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import athenahand from '../../images/Layer 2.png'
import { Link } from 'react-router-dom'
import GirlRun from '../../images/Group.png'
import '../../styles/css/Exam/exam.css'
import SignupFooter from '../signup/signupFooter';
import FooterIcon from '../../images/arcticons_canvasstudent.svg'
import { AppContext } from '../../contexts/AppContext';
import SliderMonthYear from '../../components/SliderMonthYear';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useAuth } from '../../contexts/AuthContext';

function ExamHome() {
  const [data, setData] = useState(null)
  const [courseId, setCourseId] = useState(null)
  const [dateSelected, setDateSelected] = useState(null)
  const [examState , setExamState] = useState(null)
  const { direction , lang , getCookie , server , setLoading , errors ,setErrors} = useContext(AppContext)
  const { accessToken } = useAuth();


  const fetchFilteredData = async () => {
    await axios.get(`${server}/api/student/exams/filter?DateTime=${dateSelected}&CourseId=${courseId}`, {
      headers: {
        Authorization : `Bearer ${accessToken}`
      }
    }).then((res) => {
      setData(res.data)
      console.log(res.data)
    }).catch((error) => {
      console.log(error.message)
    })
  }
  
  const fetchAllData = async () => {
    setLoading(true)
    await axios.get(`${server}/api/student/exams`, {
      headers: {
        Authorization : `Bearer ${accessToken}`
      }
    }).then((res) => {
      setLoading(false)
      // console.log(res.data)
      setData(res.data)
      setDateSelected('2023-08-09T19:31:41.379Z')
      // setDateSelected(data.filterRange.startDate)
    }).catch((error) => {
      setLoading(false)
      // console.log(error.message)
    })
  }

  
  useEffect(() => {
    fetchAllData()
    if (window.localStorage.getItem('theme') === "dark") {
      document.documentElement.style.setProperty('--background-corrected-exam', '#4ea7ff21');
    }

    if (lang === "ar") {
      document.documentElement.style.setProperty('--positionImg-right-image', 'unset');
      document.documentElement.style.setProperty('--positionImg-left-image', '0');
    } else {
      document.documentElement.style.setProperty('--positionImg-left-image', 'unset');
      document.documentElement.style.setProperty('--positionImg-right-image', '0');
    }
  }, [lang])
  
  // console.log(dateSelected)
  function formatDateToDayMonth(date) {
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }
  let formattedDate;
  if (dateSelected !== null) {
    formattedDate = formatDateToDayMonth(new Date(dateSelected));
  }  

  const handleCourse = (course) => {
    setCourseId(course)
    fetchFilteredData()
  }
  const handleAllExams = () => {
    setExamState(null)
    fetchAllData()
  }
  const handleExam = (exam) => {
    if (exam.state === 'Active') {
      window.location.assign(`/answer-board/${exam.id}`)
    }
    if (exam.state === 'Upcoming') {
      window.location.assign(`/upcoming-exam/${exam.id}`)
    }
    if (exam.state === 'Correcting') {
      window.location.assign(`/under-review-exam/${exam.id}`)
    }
    if (exam.state === 'Finished') {
      window.location.assign(`/exam-results/${exam.id}`)
    }
  }
  return (
    <>
    { data !== null ? 
      <>
        <Navbar showhomeNavbarBtn={true}/>
        <div className="exam-homepage" style={{direction : direction}}>
          <div className="container">
            <div className="content">
              <div className="head-exam">
                <div className="text">
                  <h1>{lang === 'ar' ? 'إمتحناتي' : 'My Exams'}</h1>
                  <img src={examlogo1} alt="examlogo" loading='lazy'/>
                  {/* <div className="exam-logo">
                    <img src={examlogo} alt="examlogo" loading='lazy' />
                    <span>Digital Exam Form</span>
                  </div> */}
                </div>
                <div className="input">
                  <input type="text" id='search for exam' placeholder={lang === 'ar' ? 'هل تبحث عن إمتحان مُحدد؟' :'Looking for a specific Exam ?'} />
                  <label htmlFor="search for exam" style={lang === 'ar' ? {right : '10px'} : {}}>
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.0208 18.0833H19.0004L18.6388 17.7346C19.9483 16.2156 20.6681 14.2764 20.6667 12.2708C20.6667 10.6103 20.1743 8.98705 19.2517 7.60636C18.3292 6.22567 17.0179 5.14956 15.4838 4.5141C13.9496 3.87864 12.2615 3.71237 10.6329 4.03633C9.00426 4.36028 7.50826 5.15991 6.33409 6.33409C5.15991 7.50826 4.36028 9.00426 4.03633 10.6329C3.71237 12.2615 3.87864 13.9496 4.5141 15.4838C5.14956 17.0179 6.22567 18.3292 7.60636 19.2517C8.98705 20.1743 10.6103 20.6667 12.2708 20.6667C14.3504 20.6667 16.2621 19.9046 17.7346 18.6388L18.0833 19.0004V20.0208L24.5417 26.4663L26.4663 24.5417L20.0208 18.0833ZM12.2708 18.0833C9.05459 18.0833 6.45834 15.4871 6.45834 12.2708C6.45834 9.05459 9.05459 6.45834 12.2708 6.45834C15.4871 6.45834 18.0833 9.05459 18.0833 12.2708C18.0833 15.4871 15.4871 18.0833 12.2708 18.0833Z" fill="url(#paint0_linear_4954_2618)"/>
                    <defs>
                    <linearGradient id="paint0_linear_4954_2618" x1="3.875" y1="15.1706" x2="26.4661" y2="15.2278" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#33F3FF"/>
                    <stop offset="0.494792" stopColor="#8987FF"/>
                    <stop offset="1" stopColor="#B843FF"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </label>
                </div>
              </div>
              <hr />
              <div className="exams-slider" style={{direction : 'ltr'}}>
                <Swiper
                  // ref={sliderRef}
                  loop={ true}
                  modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                  spaceBetween={15}
                  slidesPerView={6}
                  autoplay={{
                    running: true,
                    waitForTransition1: 500
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween:8
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween:8
                    },
                    991: {
                      slidesPerView: 5,
                      spaceBetween:15
                    },
                  }}
                  navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                  }}
                >
                    <SwiperSlide><a href='#' className="slide" onClick={()=>handleAllExams()}><div className="slide-tab all-exams">All Exams</div></a></SwiperSlide>
                    {data.courses!== [] ? data.courses.map((p => (
                      <SwiperSlide><div className="slide" key={p.id} onClick={()=>handleCourse(p.id)}><div className="slide-tab Arabic">{p.name}</div></div></SwiperSlide>
                    ))) : null}
                    {/* <SwiperSlide><div className="slide"><div className="slide-tab Geography">Geography</div></div></SwiperSlide>
                  <SwiperSlide><div className="slide"><div className="slide-tab Germany">German</div></div></SwiperSlide>
                  <SwiperSlide><div className="slide"><div className="slide-tab Physics">Physics</div></div></SwiperSlide>
                    <SwiperSlide><div className="slide"><div className="slide-tab Biology">Biology</div></div></SwiperSlide>*/}
                </Swiper>
                <button className="prev"><span>&gt;</span></button>
                  <button className="next"><span>&lt;</span></button>
              </div>
              <div className="examsComing">
                <div className="exams-header">
                  <h1>{lang === 'ar' ? 'قائمة الإمتحانات' : 'My Exams List'}</h1>
                  <div className="cont">
                    <div className="tabs">
                      <div className="tab active" onClick={()=>setExamState('Active')}><h5>{lang === 'ar' ? 'الحديث' : 'Active'}</h5></div>
                      <div className="tab corrected" onClick={()=>setExamState('Finished')}><h5>{lang === 'ar' ? 'المُصحح' : 'Corrected'}</h5></div>
                      <div className="tab review" onClick={()=>setExamState('Correcting')}><h5>{lang === 'ar' ? 'تحت المراجعه' : 'Under Review'}</h5></div>
                      <div className="tab upcoming" onClick={()=>setExamState('Upcoming')}><h5>{lang === 'ar' ? 'القادم' : 'Upcoming'}</h5></div>
                    </div>
                    <div className="date-slider">
                    <Swiper
                      // ref={sliderRef}
                      loop={ true}
                      modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                      spaceBetween={15}
                      slidesPerView={1}
                      autoplay={{
                        running: false,
                        waitForTransition1: 500
                      }}
                      breakpoints={{
                        320: {
                          slidesPerView: 2,
                          spaceBetween:8
                        },
                        768: {
                          slidesPerView: 4,
                          spaceBetween:8
                        },
                        991: {
                          slidesPerView: 5,
                          spaceBetween:15
                        },
                      }}
                      navigation={{
                        prevEl: '.prev',
                        nextEl: '.next',
                      }}
                    >
                    <SwiperSlide><div className="slide"><div className="slide-tab">{formattedDate}</div></div></SwiperSlide>
                        </Swiper>
                        {/*-------------------------------------متمسحهمش محتاجينهم بعدين -----------------------*/}
                      {/* <button className="prevDate" onClick={()=>{setDateSelected(dateSelected === data.filterDate.startDate ? data.filterDate.endDate : data.filterDate.startDate)}}>{lang === "en" ? <span>&gt;</span> : <span>&lt;</span>}</button>
                      <button className="nextDate"  onClick={()=>{setDateSelected(dateSelected === data.filterDate.startDate ? data.filterDate.endDate : data.filterDate.startDate)}}>{lang === "ar" ? <span>&gt;</span> : <span>&lt;</span>}</button> */}
                    </div>
                  </div>
                </div>
                    {data.exams !== [] && data.exams.length !== 0 ?
                  <div className="allExams">
                      {examState === null ?
                        data.exams.map((p) => {
                          <div key={p.id} className={`exam  ${p.state}`} onClick={()=>handleExam(p)}>
                          <div className="content">
                            <div className="cont">
                              <div className="text">
                                <h3>{p.name}</h3>
                                <div className="icon">
                                    {/* <img src={upcomingCircle} alt="upcoming node" loading='lazy' /> */}
                                  <div className="circle"></div>
                                  <div className="status">
                                    <h4>{p.state}</h4>
                                  </div>
                                </div>
                                <div className="teacher">
                                  <div className="img">
                                    <img src={p.teacherImage} alt="teacherImage" loading='lazy'/>
                                  </div>
                                  <div className="name">
                                    <h5>{lang === 'ar' ? 'المدرس' : 'Exam Author'}</h5>
                                    <h6>{p.teacherName}</h6>
                                  </div>
                                </div>
                              </div>
                              <div className="image">
                                <img src={teacher} alt="teacher icon" />
                              </div>
                            </div>
                          </div>
                        </div>
                        })
                        :
                        data.exams.filter(f=>f.state === examState).map((p) => {
                          <div key={p.id} className={`exam  ${p.state}`} onClick={()=>handleExam(p)}>
                          <div className="content">
                            <div className="cont">
                              <div className="text">
                                <h3>{p.name}</h3>
                                <div className="icon">
                                    {/* <img src={upcomingCircle} alt="upcoming node" loading='lazy' /> */}
                                  <div className="circle"></div>
                                  <div className="status">
                                    <h4>{p.state}</h4>
                                  </div>
                                </div>
                                <div className="teacher">
                                  <div className="img">
                                    <img src={p.teacherImage} alt="teacherImage" loading='lazy'/>
                                  </div>
                                  <div className="name">
                                    <h5>{lang === 'ar' ? 'المدرس' : 'Exam Author'}</h5>
                                    <h6>{p.teacherName}</h6>
                                  </div>
                                </div>
                              </div>
                              <div className="image">
                                <img src={teacher} alt="teacher icon" />
                              </div>
                            </div>
                          </div>
                        </div>
                        })}
                  </div>
                      : 
                      <div className="notfoundExams"><h4>{lang === 'ar' ? 'لايوجد امتحانات فالوقت الحالي' : 'There is no Exams in this Time'}</h4></div>
                    }
                </div>
                {data.exams !== [] && data.exams.length !== 0 ?
                  <div className="pagination">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item"><a className="page-link prev-item" href="#">&lt;</a></li>
                        <li className="page-item"><a className="page-link active" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item"><a className="page-link" href="#">6</a></li>
                        <li className="page-item"><a className="page-link" href="#">7</a></li>
                        <li className="page-item"><a className="page-link next-item" href="#">Next</a></li>
                      </ul>
                    </nav>
                  </div>
                  : null}
              <div className="athena-hands">
                <div className="card">
                  <div className="icon">
                    <img src={athenahand} alt="icon" loading='lazy' />
                  </div>
                  <div className="text">
                    <h4>{lang === 'ar' ? 'آيادي آثينا' : 'Athena Hands'}</h4>
                    <h5>{lang === 'ar' ? 'جولة من الأسئلة رفيعة المستوى جرب نموذج MCQ الرقمي الخاص بنا' : 'A round of high-level questions Try our digital MCQ form'}</h5>
                    <button className='submitBtn special'>{lang === 'ar' ? 'كفك 👋' : ' Discover'}</button>
                  </div>
                </div>
              </div>
              {/* <div className="myexam-results-bar">
                <h1>{lang === 'ar' ? 'نتائج امتحناتي' : 'My Exam Results'}</h1>
                <div className="images">
                  <Link to='#' className="image"><img src={avatar} alt="teacher photo" loading='lazy'/></Link>
                  <Link to='#' className="image"><img src={avatar} alt="teacher photo" loading='lazy'/></Link>
                  <Link to='#' className="image"><img src={avatar} alt="teacher photo" loading='lazy'/></Link>
                  <Link to='#' className="image"><img src={avatar} alt="teacher photo" loading='lazy'/></Link>
                  <Link to='#' className="image"><img src={avatar} alt="teacher photo" loading='lazy'/></Link>
                  <Link to='#' className="image"><img src={avatar} alt="teacher photo" loading='lazy'/></Link>
                  <Link to='#' className="image"><img src={avatar} alt="teacher photo" loading='lazy'/></Link>
                  <Link to='#' className="image"><img src={avatar} alt="teacher photo" loading='lazy'/></Link>
                </div>
              </div> 
              <div className="pointEarned-bar">
                <h1>{lang === 'ar' ? 'النقاط المكتسبه' : 'Points Earned'}</h1>
                <div className="points">
                  <div className="cont">
                    <div className="icon green-icon">
                      <svg className='green' width="100" height="50" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5966 1.51304C22.3556 1.30136 22.0404 1.19394 21.7203 1.21438C21.4002 1.23481 21.1012 1.38142 20.8891 1.62203L18.6245 4.22567L17.8616 3.36586C17.648 3.12498 17.3475 2.97881 17.0261 2.9595C16.7048 2.9402 16.3889 3.04934 16.148 3.26293C15.9072 3.47651 15.761 3.77703 15.7417 4.09839C15.7224 4.41974 15.8315 4.7356 16.0451 4.97648L17.7284 6.86563C17.843 6.9926 17.9832 7.09386 18.1397 7.16274C18.2962 7.23162 18.4656 7.26656 18.6366 7.26526C18.8065 7.26334 18.9741 7.22568 19.1285 7.15475C19.2829 7.08381 19.4206 6.98118 19.5328 6.85352L22.6935 3.22054C22.9066 2.98107 23.0161 2.66685 22.998 2.34677C22.9798 2.02668 22.8355 1.72686 22.5966 1.51304Z" fill="none"/>
                        <path d="M8.47422 9.68795C9.43227 9.68795 10.3688 9.40385 11.1654 8.87159C11.962 8.33933 12.5828 7.5828 12.9495 6.69768C13.3161 5.81256 13.412 4.8386 13.2251 3.89896C13.0382 2.95932 12.5769 2.09621 11.8994 1.41877C11.222 0.741327 10.3589 0.279984 9.41923 0.0930778C8.4796 -0.093828 7.50563 0.0020988 6.62051 0.368728C5.73539 0.735357 4.97887 1.35622 4.44661 2.15281C3.91434 2.9494 3.63025 3.88593 3.63025 4.84398C3.63025 6.12868 4.14059 7.36076 5.04902 8.26918C5.95744 9.1776 7.18952 9.68795 8.47422 9.68795Z" fill="none"/>
                        <path d="M15.7429 21.7993C16.0641 21.7993 16.3721 21.6717 16.5992 21.4446C16.8263 21.2175 16.9539 20.9095 16.9539 20.5883C16.9539 18.3401 16.0608 16.1839 14.4711 14.5942C12.8813 13.0044 10.7252 12.1113 8.47695 12.1113C6.22872 12.1113 4.07258 13.0044 2.48284 14.5942C0.893105 16.1839 3.35012e-08 18.3401 0 20.5883C0 20.9095 0.127586 21.2175 0.354692 21.4446C0.581797 21.6717 0.889818 21.7993 1.21099 21.7993" fill="none"/>
                      </svg>
  
                    </div>
                      <h3>2502 {lang === 'ar' ? 'نقطه' : 'Points'}</h3>
                  </div>
                  <div className="cont">
                    <div className="icon yellow-icon">
                        <svg className='yellow' width="100" height="50" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.40418 9.60853C9.35437 9.60853 10.2832 9.32677 11.0733 8.79887C11.8633 8.27097 12.4791 7.52064 12.8427 6.64278C13.2064 5.76491 13.3015 4.79894 13.1161 3.867C12.9308 2.93507 12.4732 2.07903 11.8013 1.40714C11.1294 0.73525 10.2734 0.277688 9.34144 0.0923147C8.40951 -0.0930588 7.44353 0.0020816 6.56567 0.365705C5.6878 0.729328 4.93748 1.3451 4.40958 2.13516C3.88168 2.92522 3.59991 3.85407 3.59991 4.80427C3.59991 6.07844 4.10608 7.30042 5.00705 8.2014C5.90803 9.10237 7.13001 9.60853 8.40418 9.60853Z" />
                          <path d="M15.6139 21.6222C15.9324 21.6222 16.2379 21.4957 16.4631 21.2704C16.6884 21.0452 16.8149 20.7397 16.8149 20.4211C16.8149 18.1913 15.9291 16.0529 14.3524 14.4762C12.7757 12.8995 10.6373 12.0137 8.40746 12.0137C6.17767 12.0137 4.03919 12.8995 2.46249 14.4762C0.885784 16.0529 3.32266e-08 18.1913 0 20.4211C0 20.7397 0.12654 21.0452 0.351784 21.2704C0.577028 21.4957 0.882524 21.6222 1.20107 21.6222" />
                          <path d="M21.3271 7.16947C21.2668 7.16971 21.2073 7.15548 21.1536 7.12797L19.2296 6.12069L17.3056 7.12797C17.2431 7.16082 17.1726 7.17549 17.1022 7.1703C17.0318 7.16511 16.9643 7.14028 16.9073 7.09862C16.8503 7.05696 16.8062 7.00015 16.7799 6.93465C16.7536 6.86914 16.7462 6.79758 16.7585 6.72808L17.1358 4.60411L15.5815 3.09507C15.533 3.04668 15.4986 2.986 15.482 2.91953C15.4654 2.85307 15.4671 2.78333 15.4872 2.71781C15.509 2.65077 15.5493 2.59119 15.6033 2.54584C15.6573 2.5005 15.7229 2.4712 15.7927 2.46128L17.9431 2.14815L18.89 0.212816C18.9209 0.149032 18.9692 0.0952399 19.0292 0.0576013C19.0893 0.0199627 19.1587 0 19.2296 0C19.3004 0 19.3699 0.0199627 19.4299 0.0576013C19.49 0.0952399 19.5382 0.149032 19.5691 0.212816L20.5273 2.14438L22.6777 2.45751C22.7475 2.46743 22.8132 2.49673 22.8672 2.54207C22.9212 2.58742 22.9614 2.64699 22.9833 2.71404C23.0033 2.77956 23.0051 2.8493 22.9885 2.91576C22.9719 2.98222 22.9375 3.04291 22.889 3.0913L21.3347 4.60034L21.7119 6.7243C21.7254 6.79503 21.7184 6.86814 21.6916 6.93498C21.6649 7.00183 21.6196 7.05963 21.561 7.10156C21.4927 7.14944 21.4105 7.17332 21.3271 7.16947Z" />
                        </svg>
                    </div>
                      <h3>2502 Points</h3>
                  </div>
                  <div className="cont">
                    <div className="icon red-icon">
                      <svg className='red' width="100" height="50" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.7025 5.45249L22.6091 4.56794C22.8513 4.33173 22.9873 4.01137 22.9873 3.67733C22.9873 3.34328 22.8513 3.02292 22.6091 2.78672C22.367 2.55051 22.0387 2.41781 21.6963 2.41781C21.3538 2.41781 21.0255 2.55051 20.7834 2.78672L19.8767 3.63492L18.97 2.75036C18.7229 2.51416 18.3898 2.38338 18.0439 2.38678C17.698 2.39019 17.3677 2.52751 17.1256 2.76854C16.8834 3.00956 16.7494 3.33455 16.7529 3.672C16.7564 4.00946 16.8971 4.33173 17.1442 4.56794L18.0509 5.45249L17.1442 6.33705C16.9021 6.57325 16.766 6.89361 16.766 7.22766C16.766 7.5617 16.9021 7.88206 17.1442 8.11827C17.3863 8.35447 17.7147 8.48717 18.0571 8.48717C18.3995 8.48717 18.7279 8.35447 18.97 8.11827L19.8767 7.27007L20.7834 8.15462C21.0304 8.39083 21.3635 8.52161 21.7094 8.5182C22.0553 8.51479 22.3857 8.37747 22.6278 8.13645C22.8699 7.89542 23.0039 7.57043 23.0005 7.23298C22.997 6.89553 22.8562 6.57325 22.6091 6.33705L21.7025 5.45249Z"/>
    <path d="M8.69464 9.69372C9.67725 9.69372 10.6378 9.40946 11.4548 8.87688C12.2718 8.3443 12.9086 7.58732 13.2846 6.70168C13.6606 5.81603 13.759 4.84149 13.5673 3.90129C13.3756 2.96109 12.9025 2.09746 12.2077 1.41961C11.5128 0.741769 10.6276 0.28015 9.66388 0.0931332C8.70016 -0.0938839 7.70123 0.00210005 6.79342 0.368947C5.88561 0.735795 5.10969 1.35703 4.56378 2.15409C4.01788 2.95115 3.7265 3.88824 3.7265 4.84686C3.7265 6.13233 4.24993 7.36515 5.18164 8.27411C6.11334 9.18307 7.37701 9.69372 8.69464 9.69372Z"/>
    <path d="M16.1465 21.8041C16.4759 21.8041 16.7918 21.6764 17.0247 21.4492C17.2577 21.2219 17.3885 20.9137 17.3885 20.5924C17.3885 18.3428 16.4725 16.1854 14.842 14.5947C13.2115 13.004 11.0001 12.1104 8.69426 12.1104C6.3884 12.1104 4.17698 13.004 2.54649 14.5947C0.916 16.1854 3.436e-08 18.3428 0 20.5924C0 20.9137 0.130857 21.2219 0.363784 21.4492C0.596712 21.6764 0.912629 21.8041 1.24204 21.8041H16.1465Z"/>
                      </svg>
                    </div>
                      <h3>2502 Points</h3>
                  </div>
                </div>
                <div className="degree">
                  <div className="icon">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2797_10982" maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="16">
                    <path d="M7.75 14.8699C11.478 14.8699 14.5 11.7651 14.5 7.93493C14.5 4.10477 11.478 1 7.75 1C4.02198 1 1 4.10477 1 7.93493C1 11.7651 4.02198 14.8699 7.75 14.8699Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.0376 9.66915V6.20168L6.0626 7.24192L7.7501 4.8147L9.4376 7.24192L11.4626 6.20168V9.66915H4.0376Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    </mask>
                    <g mask="url(#mask0_2797_10982)">
                    <path d="M-0.350098 -0.385986H15.8499V16.2579H-0.350098V-0.385986Z" fill="#E8F3FF"/>
                    </g>
                    </svg>
                    </div>
                  <h4>#25</h4>
                </div>
              </div>
              <div className="weekly-exams">
                <div className="left">
                  <h1>{lang === 'ar' ? 'نتائج امتحناتي الأسبوعية' : 'Weekly Exams Results'}</h1>
                  <hr />
                  <table className="table  table-bordered  table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">
                          <SliderMonthYear />
                        </th>
                        <th scope="col">First Week</th>
                        <th scope="col">Second Week</th>
                        <th scope="col">Third Week</th>
                        <th scope="col">Fourth Week</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">My Final Grades</th>
                        <td>60 / 59</td>
                        <td>60 / 55</td>
                        <td>60 / 50</td>
                        <td>60 / 45</td>
                      </tr>
                      <tr>
                        <th scope="row">Percentage %</th>
                        <td>99 %</td>
                        <td>95 %</td>
                        <td>85 %</td>
                        <td>75 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="right">
                  <div className="text">
                    <h4>{lang === 'ar' ? 'أسرع' : 'Hurry Up'}</h4>
                    <h5>{lang === 'ar' ? 'إمتحان جديد' : 'New Exam'}</h5>
                    <p>{lang === 'ar' ? 'متاح لمدة 60 دقيقة' : 'Available For 60 Minutes'}</p>
                    <a href='/answer-board/1'><button className="submitBtn special">{lang === 'ar' ? 'لوحة الإجابه' : 'Answer Board'}</button></a>
                  </div>
                  <div className="image"><img src={GirlRun} alt="girl run photo" loading='lazy'/></div>
                </div>
              </div>
              <div className="monthly-exams">
                <div className="left">
                  <h1>{lang === 'ar' ? 'نتائج الإمتحانات الشهرية' : 'Monthly Exams Results'}</h1>
                  <hr />
                  <table className="table  table-bordered  table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">
                          <div className="date-slider" >
                            <Swiper
                              ref={sliderRef}
                              loop={ true}
                              modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                              spaceBetween={15}
                              slidesPerView={1}
                              autoplay={{
                                running: false,
                                waitForTransition1: 500
                              }}
                              breakpoints={{
                                320: {
                                  slidesPerView: 2,
                                  spaceBetween:8
                                },
                                768: {
                                  slidesPerView: 4,
                                  spaceBetween:8
                                },
                                991: {
                                  slidesPerView: 5,
                                  spaceBetween:15
                                },
                              }}
                              navigation={{
                                prevEl: '.prev',
                                nextEl: '.next',
                              }}
                            >
                              <SwiperSlide><div className="slide"><div className="slide-tab">{currYearNum}/{nextYearNum}</div></div></SwiperSlide>
                            </Swiper>
                              <button className="prevDate" onClick={()=>handleNextYears()}>{lang === "en" ? <span>&gt;</span> : <span>&lt;</span>}</button>
                              <button className="nextDate"  onClick={()=>handlePrevYears()}>{lang === "ar" ? <span>&gt;</span> : <span>&lt;</span>}</button>
                          </div>
                        </th>
                        <th scope="col">January</th>
                        <th scope="col">February</th>
                        <th scope="col">March</th>
                        <th scope="col">April</th>
                        <th scope="col">May</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">My Final Grades</th>
                        <td>60 / 59</td>
                        <td>60 / 55</td>
                        <td>60 / 50</td>
                        <td>60 / 45</td>
                        <td>60 / 50</td>
                      </tr>
                      <tr>
                        <th scope="row">Percentage %</th>
                        <td>99 %</td>
                        <td>95 %</td>
                        <td>85 %</td>
                        <td>75 %</td>
                        <td>85 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
              <SignupFooter img={FooterIcon} />
            </div>
          </div>
        </div>
      </>
    : <Loading />}
      </>
  )
}

export default ExamHome
