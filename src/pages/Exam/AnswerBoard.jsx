import React, { useEffect, useState } from 'react'
import avatar from '../../images/info.png'
import ClockCountdown from '../../images/ClockCountdown.png'
import star from '../../images/Vector.png'
import dotsImg from '../../images/Group 439.png'
import tabsIcon from '../../images/Group 634.png'
import backActiveQues from '../../images/Rectangle 574.png'
import QuesImg from '../../images/quesImg.png'
import i18next from 'i18next'
import AnswerboardFooter from './AnswerBoardFooter'
import successIcon from '../../images/successIcon.png'
import distinctiveIcon from '../../images/distinctiveIcon.png'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { Navigation, Pagination, Scrollbar, Autoplay ,A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import '../../styles/css/Exam/answerboard.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as signalR from '@microsoft/signalr';




function AnswerBoard() {
  const [examInfo, setExamInfo] = useState()
  const [sectionId, setSectionId] = useState()
  const [sectionData , setSectionData] = useState()
  const [showPopUp, setShowPopUp] = useState(window.sessionStorage.getItem('showPopUp') || 'true')
  const { lang , direction , server , getCookie , errors , setErrors} = useContext(AppContext)
  const {id} = useParams()
  // console.log(id)

  i18next.init({
    lng: 'en',
    // debug: true,
    resources: {
      en: {
        translation: {
          "h1": "“ Time is passing, should be finished ”",
          "h6-1": "From ",
          "b" : " Athena Wisdom ",
          "h6-2": " coming soon",
        }
      }, 
      ar: {
        translation: {
          "h1": "” ولما رأيتُ الجهلَ في الناسِ فاشياً تجاهلْتُ حتى ظُنَّ أنّيَ جاهل “",
          "h6-1": " ",
          "b" : "” حكمة أثينا “",
          "h6-2": " قريباً  ",
        }
      }
    }
  });

  const state = {
    exam: null,
    section: null,
    answeredSection: null,
    connection: new signalR.HubConnectionBuilder()
      .withUrl(`${server}/takeexam`) // URL to your SignalR hub
      .build(),
  };

  // useEffect(() => {
  //   const { connection } = this.state;

  //   const hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl(`${server}/takeexam`)
  //     .withAutomaticReconnect()
  //     .build()
    
  //   // Start the SignalR connection
  //   connection.start().catch(err => console.error(err));

  //   // Listen for ActiveExam events from the hub
  //   connection.on('ActiveExam', exam => {
  //     this.setState({ exam });
  //   });

  //   // Listen for ActiveSection events from the hub
  //   connection.on('ActiveSection', section => {
  //     this.setState({ section });
  //   });

  //   // Listen for AnswerSection events from the hub
  //   connection.on('AnswerSection', answeredSection => {
  //     this.setState({ answeredSection });
  //   });


  // // Trigger fetching of active exam by ID
  // const getActiveExamById = id => {
  //   const { connection } = this.state;
  //   connection.invoke('GetActiveExamById', id);
  // };

  // // Trigger fetching of active section by ID
  // const getActiveSectionById = sectionId => {
  //   const { connection } = this.state;
  //   connection.invoke('GetActiveSectionById', sectionId);
  // };

  // // Trigger answering a section
  // const answerSection = request => {
  //   const { connection } = this.state;
  //   connection.invoke('AnswerSectionById', request);
  // };

  // getActiveExamById(id)

  //   const fetchExamInfo = async() => {
  //     await axios.get(`${server}/api/student/exams/active/${id}`, {
  //       headers: {
  //         Authorization : `Bearer ${getCookie('token')}`
  //       }
  //     }).then((res) => {
  //       setExamInfo(res.data)
  //       setSectionId(res.data.sections[0])
  //     }).catch((error) => {
  //       if (error.message === 'Request failed with status code 404') {
  //         setErrors(lang === 'ar' ? 'حدث خطأ ما يرجي المحاوله لاحقاً' : 'something went wrong ,please try again')
  //       }
  //     })
  //   }
  //   // fetchExamInfo()

  //   const fetchSectionData = async () => {
  //     await axios.post(`${server}/api/student/exams/active/section/${sectionId}`, {
  //       headers: {
  //         Authorization : `Bearer ${getCookie('token')}`
  //       }
  //     }).then((res) => {
  //       setSectionData(res.data)
  //     }).catch((error) => {
  //       setErrors(lang === 'ar' ? 'حدث خطأ ما يرجي المحاوله لاحقاً' : 'something went wrong ,please try again')
  //     })
  //   }
  //   // fetchSectionData()

  //   // realtime 
    

  // },[ ])

  const showPopUpStyle = showPopUp === 'false' ? "none" : "flex"
  const BodyDisplayStyle = showPopUp === 'true' ? "blur(4px)" : "initial" 

  return (
    <React.Fragment>
      {/* {errors ? <div className="alert alert-danger">{errors}</div> : */}
        <div className="answer-board current">
          <div className="top-head-exam" style={{direction : direction}}>
            <div className="container">
              <div className="content">
                <div className="left">
                <h1>{examInfo?.name}</h1>
                <h2 className={examInfo?.course}>{examInfo?.course}</h2>
                <div className="teacher">
                  <div className="image"><img src={examInfo?.teacherImage || avatar} alt="teacher image" loading='lazy' /></div>
                    <div className="text">
                      <h3>{lang === 'ar' ? 'كاتب الإمتحان' : 'Exam Author'}</h3>
                      <h4>{examInfo?.teacherName}</h4>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="icon"><img src={ClockCountdown} alt="clock icon" loading='lazy' /></div>
                  <div className="timer">
                    <h5>02:30:40</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showPopUp === 'true' &&
          <div className="popup-answerboard current" style={{ display: showPopUpStyle , direction : direction}}>
            <div className="text">
              <h1>{lang === 'ar' ? 'امتحانك' : 'Your exam is '}<span>{lang === 'ar' ? ' نشط' : 'active'}</span>{lang === 'ar' ? ' الآن' : 'now'}</h1>
              <h3>{lang === 'ar' ? 'تمنياتي بالنجاح' : 'Hope you succeed'}</h3>
              <button onClick={() => setShowPopUp(window.sessionStorage.setItem('showPopUp' , false))} className="submitBtn special">{lang === 'ar' ? 'ابدأ الحل' : 'Start Answering'}</button>
            </div>
          </div> }
          <div className="answer-sheet"  style={{filter : BodyDisplayStyle}}>
            <div className="container">
              <div className="cont">
                <div className="left">
                  <div className="head-question">
                    <h1>Neanderthal Man: In Search of Lost Genomes</h1>
                    <h3>The Question Paragraph</h3>
                    <p>We learn that Neanderthal genes offer a unique window into the lives of our hominin relatives and may hold the key to unlocking the mystery of why humans survived while Neanderthals went extinct. Drawing on genetic and fossil clues, Pääbo explores what is known about the origin of modern humans and their relationship to the Neanderthals and describes the fierce debate surrounding the nature of the two species’ interactions. His findings have not only redrawn our family tree, but recast the fundamentals of human history—the biological beginnings of fully modern Homo sapiens, the direct ancestors of all people alive today.</p>
                  </div>
                  <div className="choices">
                    <h4>1- The force that initiates evolution is ?</h4>
                    <div className="choice">
                      <input name='first-ques' hidden type="radio" id='Variation' value='Variation'/>
                      <div className="icon-check">
                        <div className="circle"></div>
                        <label  htmlFor='Variation' className='answer'><span className='alpha-ans'>A-</span><span className='word-ans'>Variation</span></label>
                      </div>
                    </div>
                    <div className="choice">
                      <input name='first-ques' hidden type="radio" id='Mutation' value='Mutation'/>
                      <div className="icon-check">
                        <div className="circle"></div>
                        <label  htmlFor='Mutation' className='answer'><span className='alpha-ans'>B-</span><span className='word-ans'>Mutation</span></label>
                      </div>
                    </div>
                    <div className="choice">
                      <input name='first-ques' hidden type="radio" id='Extinction' value='Extinction'/>
                      <div className="icon-check">
                        <div className="circle"></div>
                        <label  htmlFor='Extinction' className='answer'><span className='alpha-ans'>C-</span><span className='word-ans'>Extinction</span></label>
                      </div>
                    </div>
                    <div className="choice">
                      <input name='first-ques' hidden type="radio" id='Adaptation' value='Adaptation'/>
                      <div className="icon-check">
                        <div className="circle"></div>
                        <label  htmlFor='Adaptation' className='answer'><span className='alpha-ans'>D-</span><span className='word-ans'>Adaptation</span></label>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="choices withImg">
                    <h4>2- Mutation may be described as ...</h4>
                    <div className="content-ques">
                      <div className="text">
                        <div className="choice">
                          <input name='second-ques' hidden type="radio" id='Continuous genetic variation' value='Continuous genetic variation'/>
                          <div className="icon-check">
                            <div className="circle"></div>
                            <label  htmlFor='Continuous genetic variation' className='answer'><span className='alpha-ans'>A-</span><span className='word-ans'>Continuous genetic variation</span></label>
                          </div>
                        </div>
                        <div className="choice">
                          <input name='second-ques' hidden type="radio" id='Phenotypic change' value='Phenotypic change'/>
                          <div className="icon-check">
                            <div className="circle"></div>
                            <label  htmlFor='Phenotypic change' className='answer'><span className='alpha-ans'>B-</span><span className='word-ans'>Phenotypic change</span></label>
                          </div>
                        </div>
                        <div className="choice">
                          <input name='second-ques' hidden type="radio" id='Discontinuous genetic variation' value='Discontinuous genetic variation'/>
                          <div className="icon-check">
                            <div className="circle"></div>
                            <label  htmlFor='Discontinuous genetic variation' className='answer'><span className='alpha-ans'>C-</span><span className='word-ans'>Discontinuous genetic variation</span></label>
                          </div>
                        </div>
                        <div className="choice">
                          <input name='second-ques' hidden type="radio" id='Change due to Hybridisation' value='Change due to Hybridisation'/>
                          <div className="icon-check">
                            <div className="circle"></div>
                            <label  htmlFor='Change due to Hybridisation' className='answer'><span className='alpha-ans'>D-</span><span className='word-ans'>Change due to Hybridisation</span></label>
                          </div>
                        </div>
                      </div>
                      <div className="img">
                        <img src={QuesImg} alt="question-Img" loading='lazy'/>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="choices">
                    <h4>3- Through your reading of the paragraph and your study of the book... <br /> *   How are modern humans and Neanderthals related ?</h4>
                    <div className="Area-for-text">
                      <label htmlFor="Area-for-text">The Answer Field</label>
                      <textarea name="Area-for-text" dir='auto' id="Area-for-text" placeholder='Put your full answer here ...'></textarea>
                    </div>
                  </div>
                  <div className="exam-pagination">
                    <div className="left-nums">
                      <p className="con correct">1</p>
                      <p className="con">2</p>
                      <p className="con wrong">3</p>
                      <p className="con">4</p>
                      <p className="con correct">5</p>
                      <p className="con">6</p>
                      <p className="con">7</p>
                      <p className="con">8</p>
                      <p className="con wrong">9</p>
                      <p className="con">10</p>
                    </div>
                    <button>Next</button>
                  </div>
                </div>
                <div className="right">
                  <div className="month-exams">
                    <h1 className='gradient-text'>Monthly Exam</h1>
                    <div className="con">
                      <h4>Exam Degree</h4>
                      <p>{examInfo?.finalDegree}</p>
                    </div>
                    <div className="con">
                      <h4>Time Duration</h4>
                      <p>{examInfo?.allowedTime}</p>
                    </div>
                    <div className="con">
                      <h4>Date Created</h4>
                      <p>{new Date(examInfo?.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "numeric", year: "numeric" })}</p>
                    </div>
                  </div>
                  <div className="ques-naviagte board" >
                    {examInfo?.sections.map((section) => (
                      <div className={"question-tab " + section.id === sectionId ? 'active' : ' '} key={section.id}>
                        <h3>{section.name}</h3>
                        <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                          <div className="options">
                            {section.isPrime === true ?
                              <div className="con"><img src={star} alt="star icon" loading='lazy' /></div>
                            :null}
                            {section.hasMCQ === true ?
                              <div className="con"><img src={dotsImg} alt="star icon" loading='lazy' /></div>
                            : null}
                            {section.hasWritten === true ?
                              <div className="con"><img src={tabsIcon} alt="star icon" loading='lazy'/></div>
                              :null
                            }
                            <div className="deg"><p>Degree</p> <span>{section.degree}</span></div>
                          </div>
                        </div>
                      ))}
                    {/* <div className="question-tab">
                      <h3>Second Question</h3>
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                      <div className="options">
                        <button className="con"><img src={star} alt="star icon" loading='lazy'/></button>
                        <button className="con"><img src={dotsImg} alt="star icon" loading='lazy'/></button>
                        <button className="con"><img src={tabsIcon} alt="star icon" loading='lazy'/></button>
                        <div className="deg"><p>Degree</p> <span>25</span></div>
                      </div>
                    </div> */}
                  </div>
                  <div className="ques-naviagte slider">
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={1}
                      effect={'fade'}
                      modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                      navigation={true}
                      pagination={{
                        clickable: true,
                      }}
                      // onSlideChange={() => console.log('slide change')}
                      // onSwiper={(swiper) => console.log(swiper)}
                    >
                      <SwiperSlide>
                        {examInfo?.sections.map((section) => (
                          <div className={"question-tab " + section.id === sectionId ? 'active' : ' '} key={section.id}>
                              <h3>{section.name}</h3>
                              <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                              <div className="options">
                                {section.isPrime === true ?
                                  <div className="con"><img src={star} alt="star icon" loading='lazy' /></div>
                                :null}
                                {section.hasMCQ === true ?
                                  <div className="con"><img src={dotsImg} alt="star icon" loading='lazy' /></div>
                                : null}
                                {section.hasWritten === true ?
                                  <div className="con"><img src={tabsIcon} alt="star icon" loading='lazy'/></div>
                                  :null
                                }
                                <div className="deg"><p>Degree</p> <span>{section.degree}</span></div>
                              </div>
                            </div>
                          ))}
                      </SwiperSlide>
                      {/* <SwiperSlide>
                        <div className="question-tab">
                          <h3>Second Question</h3>
                          <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                          <div className="options">
                            <button className="con"><img src={star} alt="star icon" loading='lazy'/></button>
                            <button className="con"><img src={dotsImg} alt="star icon" loading='lazy'/></button>
                            <button className="con"><img src={tabsIcon} alt="star icon" loading='lazy'/></button>
                            <div className="deg"><p>Degree</p> <span>25</span></div>
                          </div>
                        </div>
                      </SwiperSlide> */}
                    </Swiper>
                  </div>
                  <div className="end-exam">
                    <h5>Be sure of your answers</h5>
                    <button>Finished</button>
                  </div>
                </div>
              </div>
              <div className="athena-wisdom">
                <h1>{lang === 'ar' ? '" الوقت يمر ، يجب أن ينتهي "' : '“ Time is passing, should be finished ”'}</h1>
                <h6>{i18next.t("h6-1" , {lng : lang})}<b>{i18next.t("b" , {lng : lang})}</b>{i18next.t("h6-2" , {lng : lang})}</h6>
              </div>
            <AnswerboardFooter />
            </div>
          </div>
        </div>
      {/* } */}
    </React.Fragment>
  )
}

export default AnswerBoard
