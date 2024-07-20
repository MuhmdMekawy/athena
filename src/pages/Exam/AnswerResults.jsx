import React, { useContext, useEffect, useState } from 'react'
import avatar from '../../images/info.png'
import ClockCountdown from '../../images/ClockCountdown.png'
import star from '../../images/Vector.png'
import dotsImg from '../../images/Group 439.png'
import tabsIcon from '../../images/Group 634.png'
import backActiveQues from '../../images/Rectangle 574.png'
import correctBorder from '../../images/correctBorder.png'
import wrongBorder from '../../images/wrongBorder.png'
import QuesImg from '../../images/quesImg.png'
import i18next from 'i18next'
import AnswerboardFooter from './AnswerBoardFooter'
import successIcon from '../../images/successIcon.png'
import successWhiteIcon from '../../images/successWhiteIcon.png'
import SuccessImg from '../../images/successBack.png'
import distinctiveIcon from '../../images/distinctiveIcon.png'
import distictiveWhiteIcon from '../../images/distictiveWhiteIcon.png'
import distinctiveImg from '../../images/distinctiveImg.png'
import failedIcon from '../../images/failedIcon.png'
import failedWhiteIcon from '../../images/failedWhiteIcon.png'
import failedImg from '../../images/failedImg.png'
import { Navigation, Pagination, Scrollbar, Autoplay ,A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import '../../styles/css/Exam/answerboard.css'
import axios from 'axios'
import { AppContext } from '../../contexts/AppContext'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function AnswerBoard() {
  const [showQuesNavigate ,setShowQuesNavigate] = useState(true)
  const [showPopUp, setShowPopUp] = useState(window.sessionStorage.getItem('showPopUp')|| true)
  const [resultStatus, setResultStatus] = useState('successed')
  // const [questionStatus, setQuestionStatus] = useState('correct')
  const [quesId , setQuesId]= useState(null)
  const { server } = useContext(AppContext)
  const { accessToken } = useAuth()
  const [data ,setData] = useState(null)
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
  const show = showQuesNavigate === false ? "none" : "flex"
  const showPopUpStyle = showPopUp === 'true' ? "none" : "flex"
  const BodyDisplayStyle = showPopUp === 'true' ? "initial" : "blur(4px)" 
  const {id} = useParams()
  const handleShowPopUp = () => {
    window.sessionStorage.setItem('showPopUp', true)
    setShowPopUp(window.sessionStorage.getItem('showPopUp'))
    // console.log(showPopUpStyle)
  }
  // console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${server}/api/student/exams/result?id=${id}`, {
        headers: {
          Authorization : `Bearer ${accessToken}`
        }
      }).then((res) => {
        setData(res.data)
        setResultStatus(data?.examResult.status.toLowerCase())
      }).catch((error) => {
        // if (error?.message === 'Request failed with status code 400') {
        //   window.location.assign('/athena-homepage')
        // }
      })
    }
    fetchData()
  } , [])
  return (
    <React.Fragment>
      <div className={'answer-result ' + resultStatus} >
        <div className="top-head-exam">
          <div className="container">
            <div className="content">
              <div className="left">
              <h1>{data?.name}</h1>
              <h2 className='biology'>{data?.course}</h2>
              <div className="teacher">
                <div className="image"><img src={data?.teacherImage || avatar} alt="teacher image" loading='lazy' /></div>
                  <div className="text">
                    <h3>Exam Author</h3>
                    <h4>{data?.teacher}</h4>
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
        {resultStatus === 'successed' ?
            <div className="popup-answerboard successed" style={{display : showPopUpStyle}}>
              <div className="text">
                <h1>Successed <span><img src={successIcon} alt="successed" loading='lazy'/></span></h1>
                <h4>{data?.examResult.studentDegree} / {data?.examResult.examDegree} | {data?.percentage}%</h4>
                <button onClick={()=>handleShowPopUp()} className="submitBtn special">Your Answers</button>
              </div>
              <div className="image">
                <img src={SuccessImg} alt="success Image" loading='lazy'/>
              </div>
            </div>
            : resultStatus === 'distinctive' ?
              <div className="popup-answerboard distinctive" style={{display : showPopUpStyle}}>
                <div className="text">
                <h1>Distinctive <span><img src={distinctiveIcon} alt="distinctive" loading='lazy'/></span></h1>
                <h4>{data?.examResult.studentDegree} / {data?.examResult.examDegree} | {data?.percentage}%</h4>
                <button onClick={()=>handleShowPopUp()} className="submitBtn special">Your Answers</button>
                </div>
                <div className="image"><img src={distinctiveImg} alt="distinictive Image" loading='lazy'/></div>
              </div>
              : 
              <div className="popup-answerboard failed" style={{display : showPopUpStyle}}>
                <div className="text">
                <h1>Failed <span><img src={failedIcon} alt="failed" loading='lazy'/></span></h1>
                <h4>{data?.examResult.studentDegree} / {data?.examResult.examDegree} | {data?.percentage}%</h4>
                <button onClick={()=>handleShowPopUp()} className="submitBtn special">Your Answers</button>
                </div>
                <div className="image"><img src={failedImg} alt="failed Image" loading='lazy'/></div>
              </div>
        }
        <div className="answer-sheet" style={{filter : BodyDisplayStyle}}>
          <div className="container">
            <div className="cont">
              <div className="left">
                <div className="head-question">
                  <div className="head-ques-with-degree"><h1>{data?.sections.filter(f=>f.id === quesId).name}</h1><span>{data?.sections.filter(f=>f.id === quesId).degree}</span></div>
                  {data?.sections.filter(f=>f.id === quesId).paragraph ?<> <h3>The Question Paragraph:</h3>
                    <p>{data?.sections.filter(f => f.id === quesId).paragraph}</p></> : null}
                  {data?.sections.filter(f => f.id === quesId).images.map((sectionImage) => (
                    <div className="section-images">
                      <img key={sectionImage.id} src={`${server}/${sectionImage}`} alt="image" loading='lazy'/>
                      {/* <img src={QuesImg} alt="image" loading='lazy'/> */}
                    </div>
                  ))}
                </div>
                {data?.sections.filter(f=>f.id === quesId).questions.map((question) => (
                  <>
                    <div className="choices">
                      {question.type === 'MCQ' ? 
                        <>
                          <div className="head-ques-with-degree correct"><h4>{question.name}</h4><span>{question.degree}</span></div>
                          {data?.sections.filter(f => f.id === quesId).questions.images.map((questionImage) => (
                            <div className="section-images">
                              <img key={questionImage.id} src={`${server}/${questionImage}`} alt="image" loading='lazy'/>
                              {/* <img src={QuesImg} alt="image" loading='lazy'/> */}
                            </div>
                          ))}
                          {/* choice answers */}
                          {question.choices.map(((choice) => (
                            <div className={`choice ${choice.isRightChoice ===true && choice.id === question.studentAnswer ? 'correct' : 'wrong'}`}>
                              <input name='first-ques' hidden type="radio" disabled id='Variation' value='Variation'/>
                              <div className="icon-check">
                                <div className="ques-text">
                                  <div className="circle"></div>
                                  <label htmlFor='Extinction' className='answer'><span className='alpha-ans'>C-</span>
                                    {choice.name !== '' ? <span className='word-ans'>{choice.name}</span> : <span><img src={`${server}/${choice.image}`} alt="image" loading='lazy' /></span>}
                                  </label>
                                </div>
                                {choice.name !== '' && choice.image !== '' ? <div className="ques-image"><img src={`${server}/${choice.image}`} alt="image" loading='lazy'/></div> : null}
                              </div>
                            </div>
                          )))}
                          <hr />
                      {/* <div className="choice correct">
                        <input name='first-ques' hidden type="radio" disabled id='Mutation' value='Mutation'/>
                        <div className="icon-check">
                          <div className="ques-text">
                            <div className="circle"></div>
                            <label  htmlFor='Mutation' className='answer'><span className='alpha-ans'>B-</span><span className='word-ans'>Mutation</span></label>
                          </div>
                          <div className="ques-image"><img src={QuesImg} alt="image" loading='lazy'/></div>
                        </div>
                      </div>
                      <div className="choice ">
                        <input name='first-ques' hidden type="radio" disabled id='Extinction' value='Extinction'/>
                        <div className="icon-check">
                          <div className="ques-text">
                            <div className="circle"></div>
                            <label  htmlFor='Extinction' className='answer'><span className='alpha-ans'>C-</span><span className='word-ans'>Extinction</span></label>
                          </div>
                          <div className="ques-image"><img src={QuesImg} alt="image" loading='lazy'/></div>
                        </div>
                      </div>
                      <div className="choice  wrong">
                        <input name='first-ques' hidden type="radio" disabled id='Adaptation' value='Adaptation'/>
                        <div className="icon-check">
                          <div className="ques-text">
                            <div className="circle"></div>
                              <label  htmlFor='Extinction' className='answer'><span className='alpha-ans'>C-</span><span className='word-ans'><img src={QuesImg} alt="image" loading='lazy'/></span></label>
                          </div>
                          <div className="ques-image"><img src={QuesImg} alt="image" loading='lazy'/></div>
                        </div>
                      </div> */}
                        </> : question.type === 'Written' ?
                          <>
                            <div className="choices">
                              <h4>{question.name}</h4>
                              <div className="Area-for-text">
                                <label htmlFor="Area-for-text">The Answer Field</label>
                                <textarea disabled name="Area-for-text" dir='auto' id="Area-for-text" placeholder='Put your full answer here ...' value={question.studentAnswer}></textarea>
                              </div>
                            </div>
                            <hr />
                          </>
                          : null
                          // <>
                          //   <div className="choices withImg">
                          //     <div className="head-ques-with-degree wrong"><h4>{question.name}</h4><span>{question.degree}</span></div>
                          //     <div className="content-ques">
                          //       <div className="text">
                          //       {question.choices.map(((choice) => (
                          //         <div className={`choice ${choice.isRightChoice ===true && choice.id === question.studentAnswer ? 'correct' : 'wrong'}`}>
                          //           <input name='first-ques' hidden type="radio" disabled id='Variation' value='Variation'/>
                          //           <div className="icon-check">
                          //             <div className="ques-text">
                          //               <div className="circle"></div>
                          //               <label htmlFor='Extinction' className='answer'><span className='alpha-ans'>C-</span>
                          //                 {choice.name !== '' ? <span className='word-ans'>{choice.name}</span> : <span><img src={`${server}/${choice.image}`} alt="image" loading='lazy' /></span>}
                          //               </label>
                          //             </div>
                          //             {choice.name !== '' && choice.image !== '' ? <div className="ques-image"><img src={`${server}/${choice.image}`} alt="image" loading='lazy' /></div> : null}
                          //           </div>
                          //         </div>
                          //       )))}
                          //         {/* <div className="choice  wrong">
                          //           <input name='second-ques' hidden type="radio" disabled id='Phenotypic change' value='Phenotypic change'/>
                          //           <div className="icon-check">
                          //             <div className="ques-text">
                          //               <div className="circle"></div>
                          //                 <label  htmlFor='Extinction' className='answer'><span className='alpha-ans'>C-</span><span className='word-ans'>سؤال .... <img src={''} alt="" loading='lazy'/></span></label>
                          //             </div>
                          //             <div className="ques-image"><img src={QuesImg} alt="image" loading='lazy'/></div>
                          //           </div>
                          //         </div>
                          //         <div className="choice  ">
                          //           <input name='second-ques' hidden type="radio" disabled id='Discontinuous genetic variation' value='Discontinuous genetic variation'/>
                          //           <div className="icon-check">
                          //             <div className="ques-text">
                          //               <div className="circle"></div>
                          //                 <label  htmlFor='Extinction' className='answer'><span className='alpha-ans'>C-</span><span className='word-ans'>سؤال .... <img src={''} alt="" loading='lazy'/></span></label>
                          //             </div>
                          //             <div className="ques-image"><img src={QuesImg} alt="image" loading='lazy'/></div>
                          //           </div>
                          //         </div>
                          //         <div className="choice  correct">
                          //           <input name='second-ques' hidden type="radio" disabled id='Change due to Hybridisation' value='Change due to Hybridisation'/>
                          //           <div className="icon-check">
                          //             <div className="ques-text">
                          //               <div className="circle"></div>
                          //                 <label  htmlFor='Extinction' className='answer'><span className='alpha-ans'>C-</span><span className='word-ans'>سؤال .... <img src={''} alt="" loading='lazy'/></span></label>
                          //             </div>
                          //             <div className="ques-image"><img src={QuesImg} alt="image" loading='lazy'/></div>
                          //           </div>
                          //         </div> */}
                          //       </div>
                          //       {/* <div className="img">
                          //         <img src={`${server}/${question.image}`} alt="question-Img" loading='lazy'/>
                          //       </div> */}
                          //     </div>
                          //   </div>
                          //   <hr />
                          // </>
                      }
                    </div>
                    <hr />
                  </>
                ))}
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
                <div className={"month-exams " + resultStatus}>
                  <h1>Exam Result <span>{resultStatus === "successed" ? 
                    <img src={successWhiteIcon} alt="successed" loading='lazy'/>
                  : resultStatus === 'failed'   
                    ? <img src={failedWhiteIcon} alt="failed" loading='lazy'/>
                  : <img src={distictiveWhiteIcon} alt="distinctive" loading='lazy' />}</span></h1>
                  <div className="con">
                    <h4>Final Degree</h4>
                    <p>{data?.examDegree || 100}</p>
                  </div>
                  <div className="con">
                    <h4>Your Degree</h4>
                    <p>{data?.studentDegree || 100}</p>
                  </div>
                  <div className="con">
                    <h4>Percentage %</h4>
                    <p>{data?.percentage || 100}%</p>
                  </div>
                  <div className="con">
                    <h4>Your Status</h4>
                    <p>{data?.status || 'Successed'}</p>
                  </div>
                  <button className='menu' onClick={()=>setShowQuesNavigate(!showQuesNavigate)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg></button>
                </div>
                <div className="ques-naviagte board">
                  {data?.sections.map((p => (
                    <div key={p.id} onClick={()=>setQuesId(p.id)} className={"question-tab " + `${p.degree === p.questions.studentDegree ? 'correct' : "wrong"}` + `${quesId === p.id ? 'active' : ''}`} style={{display : show}}>
                      <h3>First Question</h3>
                      {p.degree === p.questions.studentDegree ? 
                        <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                      :
                        <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                      }
                      <div className="options">
                        <div className="deg"><p>Degree</p> <span>{p.degree}</span></div>
                      </div>
                    </div>
                  )))}
                  {/* <div className={"question-tab " + "wrong" } style={{display : show}}>
                    <h3>Second Question</h3>
                    {questionStatus === 'correct' ? 
                      <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                    : questionStatus === 'wrong' ?
                      <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                    :
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                    }
                    <div className="options">
                      <div className="deg"><p>Degree</p> <span>25</span></div>
                    </div>
                  </div>
                  <div className="question-tab " style={{display : show}}>
                    <h3>Third Question</h3>
                    {questionStatus === 'correct' ? 
                      <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                    : questionStatus === 'wrong' ?
                      <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                    :
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                    }
                    <div className="options">
                      <div className="deg"><p>Degree</p> <span>25</span></div>
                    </div>
                  </div>
                  <div className="question-tab "  style={{display : show}}>
                    <h3>Fourth Question</h3>
                    <div className="options">
                      <div className="deg"><p>Degree</p> <span>25</span></div>
                    </div>
                  </div>
                  <div className="question-tab " style={{display : show}}>
                    <h3>Fifth Question</h3>
                    {questionStatus === 'correct' ? 
                      <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                    : questionStatus === 'wrong' ?
                      <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                    :
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                    }
                    <div className="options">
                      <div className="deg"><p>Degree</p> <span>25</span></div>
                    </div>
                  </div>
                  <div className="question-tab " style={{display : show}}>
                    <h3>Six Question</h3>
                    {questionStatus === 'correct' ? 
                      <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                    : questionStatus === 'wrong' ?
                      <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                    :
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                    }
                    <div className="options">
                      <div className="deg"><p>Degree</p> <span>25</span></div>
                    </div>
                  </div>
                  <div className="question-tab wrong"  style={{display : show}}>
                    <h3>Seven Question</h3>
                    {questionStatus === 'correct' ? 
                      <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                    : questionStatus === 'wrong' ?
                      <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                    :
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                    }
                    <div className="options">
                      <div className="deg"><p>Degree</p> <span>25</span></div>
                    </div>
                  </div>
                  <div className="question-tab " style={{display : show}}>
                    <h3>Eight Question </h3>
                    {questionStatus === 'correct' ? 
                      <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                    : questionStatus === 'wrong' ?
                      <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                    :
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                    }
                    <div className="options">
                      <div className="deg"><p>Degree</p> <span>25</span></div>
                    </div>
                  </div>
                  <div className="question-tab "  style={{display : show}}>
                    <h3>Ninth Question</h3>
                    {questionStatus === 'correct' ? 
                      <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                    : questionStatus === 'wrong' ?
                      <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                    :
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                    }
                    <div className="options">
                      <div className="deg"><p>Degree</p> <span>25</span></div>
                    </div>
                  </div>
                  <div className="question-tab" style={{display : show}}>
                    <h3>Tenth Question</h3>
                    {questionStatus === 'correct' ? 
                      <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                    : questionStatus === 'wrong' ?
                      <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                    :
                      <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                    }
                    <div className="options">
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
                    {data?.sections.map((p => (
                      <SwiperSlide>
                      <div key={p.id} onClick={()=>setQuesId(p.id)} className={"question-tab " + `${p.degree === p.questions.studentDegree ? 'correct' : "wrong"}` + `${quesId === p.id ? 'active' : ''}`} style={{display : show}}>
                        <h3>First Question</h3>
                        {p.degree === p.questions.studentDegree ? 
                          <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                        :
                          <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                        }
                        <div className="options">
                          <div className="deg"><p>Degree</p> <span>{p.degree}</span></div>
                        </div>
                      </div>
                      </SwiperSlide>
                    )))}
                    {/* <SwiperSlide>
                      <div className={"question-tab " + "wrong" } style={{display : show}}>
                        <h3>Second Question</h3>
                        {questionStatus === 'correct' ? 
                          <img className='backActiveQues' src={correctBorder} alt="backActiveQues" loading='lazy'/>
                        : questionStatus === 'wrong' ?
                          <img className='backActiveQues' src={wrongBorder} alt="backActiveQues" loading='lazy'/>
                        :
                          <img className='backActiveQues' src={backActiveQues} alt="backActiveQues" loading='lazy'/>
                        }
                        <div className="options">
                          <div className="deg"><p>Degree</p> <span>25</span></div>
                        </div>
                      </div>
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
            </div>
            {/* <div className="athena-wisdom" style={{direction : direction}}>
              <h1>{i18next.t("h1" , {lng : lang})}</h1>
              <h6>{i18next.t("h6-1" , {lng : lang})}<b>{i18next.t("b" , {lng : lang})}</b>{i18next.t("h6-2" , {lng : lang})}</h6>
            </div> */}
          <AnswerboardFooter  />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AnswerBoard
